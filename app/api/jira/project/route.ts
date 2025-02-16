export async function GET() {
  const data = { a: 1, b: 2, c: "this is project routes" };

  return Response.json(data);
}
