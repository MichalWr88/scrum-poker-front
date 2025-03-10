import { myServerProvider } from "@/services/my-server/my-server-provider";

const JiraTask = async () => {
  try {
    const {
      key,
      fields: { description, labels, summary, subtasks },
    } = await myServerProvider.getTaskById("AAA-2063");
    console.log();
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-sky-600">Key</p>
            <a
              href={`https:// ${key}`}
              className="font-bold text-blue-900 hover:underline block "
            >
              {key}
            </a>
          </div>
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
  } catch (error) {
    if (error instanceof Error) {
      return (
        <div className="text-red-700 text-2xl">Error: {error.message}</div>
      );
    }
    return (
      <div className="text-red-700 text-2xl">Error: {error as string}</div>
    );
  }
};

export default JiraTask;
