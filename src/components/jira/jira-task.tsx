"use client";

import { useEffect, useState, useTransition } from "react";
import { Task } from "./models/jira-task";
import { updateTaskKey } from "./jira-server-actions";

import { socketService } from "@/services/socket/socket-service";
import JiraTaskLink from "./jira-task-link";

const JiraTask = ({ initialKey }: { initialKey: string }) => {
  const [keyValue, setKeyValue] = useState(initialKey);
  const [taskData, setTaskData] = useState<Task | undefined>();
  const [isPending, startTransition] = useTransition();
  // const router = useRouter();
  useEffect(() => {
    startTransition(async () => {
      if (taskData) return;
      const form = new FormData();
      form.append("key", keyValue);
      // Fetch the task data from the server.
      const updatedTask = await updateTaskKey(form);
      setTaskData(updatedTask);
      socketService.emitFetchedNewTask(updatedTask);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyValue]);

  useEffect(() => {
    socketService.onIsPendingNewTask(() => {
      console.log("Pending new task");
      startTransition(() => {
        setTaskData(undefined);
      });
    });
    socketService.onIsFetchedNewTask((task) => {
      console.log("Fetched new task", task);
      startTransition(() => {
        setTaskData(task);
      });
    });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    socketService.emitPendingNewTask();
    startTransition(async () => {
      // Call the server action. This returns the updated task data.
      const updatedTask = await updateTaskKey(formData);
      // Update local state with the new key and task data.
      if (updatedTask) {
        socketService.emitFetchedNewTask(updatedTask);
        setKeyValue(updatedTask.key);
        setTaskData(updatedTask);
      }
      // Optionally, you may trigger a refresh of the current route:
      // router.refresh();
    });
  }
  if (!taskData || isPending) {
    return (
      <div className="font-bold text-4xl text-sky-700 w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const {
    key,
    fields: { description, labels, summary, subtasks },
  } = taskData;
  return (
    <div className="bg-white rounded-lg shadow flex flex-col gap-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between px-6 py-2 border-b-2"
      >
        <div className="flex gap-2 items-center ">
          <label
            htmlFor="key"
            className="block text-sm font-medium text-sky-600"
          >
            Key
          </label>
          <input
            type="text"
            name="key"
            id="key"
            defaultValue={key}
            className="block border border-sky-200 p-2 rounded-md  text-sky-600 w-30"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            Update Key
          </button>
        </div>

        <JiraTaskLink jiraKey={key} />
      </form>
      <div className="flex flex-col gap-2 px-6">
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
          <p className="font-medium text-blue-900">{summary}</p>
        </div>

        <div>
          <p className="text-sm bg-sky-600 uppercase font-bold text-center">
            Description
          </p>
          <p className="text-sm text-blue-900 p-1 font-mono indent-2 whitespace-pre-line">
            {description}
          </p>
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
  );
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return (
  //       <div className="text-red-700 text-2xl">Error: {error.message}</div>
  //     );
  //   }
  //   return (
  //     <div className="text-red-700 text-2xl">Error: {error as string}</div>
  //   );
  // }
};

export default JiraTask;
