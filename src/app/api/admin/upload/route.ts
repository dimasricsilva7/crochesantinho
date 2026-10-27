import { NextResponse, type NextRequest } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { isSameOrigin } from "@/lib/request";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4_000_000; // ~4 MB (limite prático do corpo serverless)
const ALLOWED = /^image\/(png|jpe?g|webp|gif|svg\+xml|avif)$/;

/**
 * Upload de imagem do admin guardado no BANCO (MediaAsset) e servido em /media/[id].
 * Não depende do Vercel Blob (que está indisponível no plano). Use para fotos de seções,
 * santas/santos, produtos, etc. Aceita imagens de até ~4 MB.
 */
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Origem inválida" }, { status: 403 });
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const fd = await req.formData().catch(() => null);
  const file = fd?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Arquivo não enviado." }, { status: 400 });
  const mime = file.type || "application/octet-stream";
  if (!ALLOWED.test(mime)) return NextResponse.json({ error: "Envie uma imagem (PNG, JPG, WEBP, GIF, SVG ou AVIF)." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Imagem muito grande (máx. 4 MB). Comprima e tente de novo." }, { status: 413 });
  const bytes = Buffer.from(await file.arrayBuffer());
  const asset = await db.mediaAsset.create({ data: { mime, data: bytes, name: file.name.slice(0, 120) || null } });
  return NextResponse.json({ url: `/media/${asset.id}` });
}
