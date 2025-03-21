import React from "react";
import JiraTaskLink from "./jira-task-link";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  jiraKey?: string;
};

const JiraForm = ({ handleSubmit, jiraKey }: Props) => {
  const handleClear = () => {
    const form = document.getElementById("jira-form") as HTMLFormElement;
    form.reset();
  };

  return (
    <form
      id="jira-form"
      onSubmit={handleSubmit}
      className="flex items-center justify-between px-6 py-2 border-b-2"
    >
      <div className="flex gap-2 items-center ">
        <label htmlFor="key" className="block text-sm font-medium text-sky-600">
          Key
        </label>
        <input
          type="text"
          name="key"
          id="key"
          defaultValue={jiraKey}
          className="block border border-sky-200 p-2 rounded-md  text-sky-600 w-30"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          Update Key
        </button>
        <button
          type="button"
          onClick={handleClear}
          className=" p-1 rounded-full hover:bg-gray-200 flex items-center cursor-pointer"
          title="Clear Key"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {jiraKey && <JiraTaskLink jiraKey={jiraKey} />}
     
    </form>
  );
};

export default JiraForm;
