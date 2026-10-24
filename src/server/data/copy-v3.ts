/**
 * No-op. O conteúdo da landing deste projeto é semeado uma única vez em prisma/seed.ts
 * (textos devocionais da Coleção Santinhas) e editado pelo admin em /admin/landing.
 * Mantido apenas para preservar a assinatura usada por src/server/jobs.ts.
 */
import type { PrismaClient } from "@prisma/client";

export async function applyCopyV3(_db: PrismaClient): Promise<{ skipped: true }> {
  return { skipped: true };
}
