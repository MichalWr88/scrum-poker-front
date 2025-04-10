"use client";
import { useEffect, useState, useTransition } from "react";
import { Task } from "./models/jira-task";
import { updateTaskKey } from "./jira-server-actions";
import { socketService } from "@/src/services/socket/socket-service";
import { useSession } from "next-auth/react";
import JiraForm from "./jira-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import j2m from "jira2md";

const convertInsTags = (html?: string) => {
  return html?.replace(/<ins>/g, "+").replace(/<\/ins>/g, "+") || "";
};
const wrapWordsWithBold = (markdown: string) => {
  return markdown.replace(
    /<~(.*?)>/g,
    (match, p1) => `**<${p1.toUpperCase()}>**`
  );
};

const JiraTask = () => {
  const session = useSession();
  const user = session.data?.user;
  const [keyValue, setKeyValue] = useState("");
  const [taskData, setTaskData] = useState<Task | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!user || !keyValue) return;
    startTransition(async () => {
      if (taskData) return;
      const form = new FormData();
      form.append("key", keyValue);
      const result = await updateTaskKey(form);
      if ("error" in result) {
        // set error state so you can show a message, but don't cause a global error.
        setError(result.error);
      } else {
        setTaskData(result);
        socketService.emitFetchedNewTask(result);
      }
    });
  }, [keyValue, user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    socketService.emitPendingNewTask();
    startTransition(async () => {
      const result = await updateTaskKey(formData);
      if ("error" in result) {
        setError(result.error);
      } else {
        socketService.emitFetchedNewTask(result);
        setKeyValue(result.key);
        setTaskData(result);
        setError(null);
      }
    });
  }

  if (isPending) {
    return (
      <div className="font-bold text-4xl text-sky-700 w-90 h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!taskData) {
    return (
      <>
        <JiraForm handleSubmit={handleSubmit} />;
        {error && <div className="text-red-600 text-center p-4">{error}</div>}
      </>
    );
  }

  const {
    key,
    fields: { description, labels, summary, subtasks },
  } = taskData;
  const markdown = wrapWordsWithBold(
    convertInsTags(j2m.to_markdown(wrapWordsWithBold(description)))
  );

  return (
    <div className="bg-white rounded-lg shadow flex flex-col gap-4 py-4  h-full max-w-3xl">
      <JiraForm handleSubmit={handleSubmit} jiraKey={key} />
      {error && <div className="text-red-600 text-center p-4">{error}</div>}

      <div className="flex flex-col gap-2 px-6 overflow-auto">
        <div className="flex flex-col gap-2 px-6 overflow-auto">
          <div className="flex gap-2">
            {labels.map((label) => (
              <span
                key={label}
                className="bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded-md"
              >
                {label}
              </span>
            ))}
          </div>
          <div>
            <p className="text-sm bg-sky-600 uppercase font-bold text-center">
              Summary
            </p>
            <div className="font-medium text-blue-900">
              {/* <MDXRemote scope={{}}> */}
              <ReactMarkdown rehypePlugins={[remarkGfm]}>
                {summary}
              </ReactMarkdown>
            </div>
          </div>

          <div>
            <p className="text-sm bg-sky-600 uppercase font-bold text-center">
              Description
            </p>
            <div className="text-sm text-blue-900 p-1 font-mono markdown-wrapper">
              <ReactMarkdown rehypePlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>

          <div>
            <p className="text-sm bg-sky-600 uppercase font-bold text-center">
              Subtasks
            </p>
            <ol className="list-decimal list-inside  text-blue-900">
              {subtasks.map((subtask) => (
                <li key={subtask.key}>
                  <span className="font-medium">{subtask.fields.summary}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JiraTask;
