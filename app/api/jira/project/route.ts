import { Jira } from "@/helper/jira";
import { JiraData } from "@/types/common";

export async function POST(request: Request) {
  const input = await request.json();
  const params: JiraData = input.params;
  const jira = new Jira(params);
  const project = await jira.getProject();

  return Response.json(project);
}
