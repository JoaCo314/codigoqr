import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const id = randomUUID();
  return Response.json({ path: `/visit/${id}` });
}
