declare module "jira2md" {
  const j2m: {
    to_markdown: (jira: string) => string;
    to_jira: (markdown: string) => string;
  };
  export default j2m;
}