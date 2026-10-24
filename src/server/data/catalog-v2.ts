/**
 * No-op. O catálogo deste projeto (produto único + bumps + upsell da Coleção Santinhas)
 * é semeado em prisma/seed.ts e editado pelo admin. Mantido só para preservar a assinatura
 * usada pela rota /api/cron/catalog-v2.
 */
import type { PrismaClient } from "@prisma/client";

export async function applyCatalogV2(_db: PrismaClient): Promise<{ skipped: true }> {
  return { skipped: true };
}
