import JiraIcon from "./jira-icon";

type Props = {
  jiraKey: string;
};

const JiraTaskLink = ({ jiraKey }: Props) => {
  if (!jiraKey) return null;
  return (
    <a
      href={`https://jira.trans.eu/browse/${jiraKey}`}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-2 w-6 h-6 hover:scale-125 transition-all transform"
      title="Link to Jira"
    >
      <JiraIcon />
    </a>
  );
};

export default JiraTaskLink;
