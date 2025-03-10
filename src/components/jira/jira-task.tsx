"use client";

import { useEffect, useState, useTransition } from "react";
import { Task } from "./models/jira-task";
import { updateTaskKey } from "./jira-server-actions";

const JiraTask = ({ initialKey }: { initialKey: string }) => {
  const [keyValue, setKeyValue] = useState(initialKey);
  const [taskData, setTaskData] = useState<Task | null>(null);
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
    });
  }, [keyValue]);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      // Call the server action. This returns the updated task data.
      const updatedTask = await updateTaskKey(formData);
      // Update local state with the new key and task data.
      setKeyValue(updatedTask.key);
      setTaskData(updatedTask);
      // Optionally, you may trigger a refresh of the current route:
      // router.refresh();
    });
  }
  if (!taskData || isPending) {
    return <div>Loading...</div>;
  }
  console.log("taskData", taskData);
  const {
    key,
    fields: { description, labels, summary, subtasks },
  } = taskData;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="p-4 border rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-sky-600">Key</p>
            <a
              href={`https://${key}`}
              className="font-bold text-blue-900 hover:underline block"
            >
              {key}
            </a>
          </div>
          {/* Form for updating the key */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <label
              htmlFor="key"
              className="block text-sm font-medium text-sky-600"
            >
              Edit Key
            </label>
            <input
              type="text"
              name="key"
              id="key"
              defaultValue={key}
              className="block border border-sky-200 p-2 rounded-md w-full text-sky-600"
            />
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Update Key
            </button>
          </form>
        </div>
        {/* <div className="flex items-center justify-between">
            <p className="text-sm text-sky-600">Key</p>
            <a
              href={`https:// ${key}`}
              className="font-bold text-blue-900 hover:underline block "
            >
              {key}
            </a>
          </div> */}
        <div>
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
          <p className="text-sm text-sky-600">Summary</p>
          <p className="font-medium text-blue-900">{summary}</p>
        </div>

        <div>
          <p className="text-sm text-sky-600">Description</p>
          <p className="text-sm text-blue-900">{description}</p>
        </div>

        <div>
          <p className="text-sm text-sky-600">Subtasks</p>
          {subtasks.map((subtask) => (
            <div key={subtask.key}>
              <p className="font-medium text-blue-900">
                {subtask.fields.summary}
              </p>
            </div>
          ))}
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
