export type JiraData = {
  domain: string;
  project: string;
  email: string;
  token: string;
};

export type ApiResponse = {
  data: unknown;
  error: unknown;
};

export type LocalJiraData = {
  internal: JiraData;
  enternal: JiraData;
};
