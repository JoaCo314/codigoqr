import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return new NextResponse("Código inválido", { status: 400 });
  }

  const code = Array.from({ length: 8 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789".charAt(
      Math.floor(Math.random() * 32)
    )
  ).join("");

  return NextResponse.json({ code });
}
