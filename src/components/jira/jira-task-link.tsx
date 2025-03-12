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
      className="ml-2 w-6 h-6"
      title="Link to Jira"
      style={{ transition: "transform 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <JiraIcon />
    </a>
  );
};

export default JiraTaskLink;
