import { get } from "./api";

export class Jira {
  private api;
  private project;
  private header;
  constructor(domain: string, project: string, email: string, token: string) {
    this.project = project;
    this.api = `https://${domain}.atlassian.net/rest/api/3/`;
    this.header = {
      Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
        "base64",
      )}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  prepareApi = (endPoint: string): string => {
    return `${this.api}${endPoint}`;
  };

  getProject = async () => {
    return await get(this.prepareApi(`project/${this.project}`), this.header);
  };
}
