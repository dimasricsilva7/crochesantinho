import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Serve uma imagem guardada no banco (MediaAsset) enviada pelo admin. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await db.mediaAsset.findUnique({ where: { id } }).catch(() => null);
  if (!asset) return new NextResponse("Not found", { status: 404 });
  const body = new Uint8Array(asset.data);
  return new NextResponse(body, {
    headers: {
      "Content-Type": asset.mime,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
