/**
 * Seed idempotente da "Fé em Crochê — Santinhas de Crochê".
 * Cria o que não existe e NUNCA sobrescreve edições do admin. Copy em src/content/lp.ts.
 *
 * Reset de catálogo (quando o modelo muda): rode uma vez `npm run db:seed -- --reset-catalog`
 * para recriar produtos/bumps/upsell/seções/faq com o modelo novo.
 */
import "dotenv/config";
import { PrismaClient, type Prisma } from "@prisma/client";
import { LP_SECTIONS, LP_FAQ, LP_PACKAGES, LP_BUMP_PRODUCTS, LP_BUMPS, LP_UPSELL_PRODUCT, LP_UPSELL } from "../src/content/lp";

const db = new PrismaClient();
const RESET = process.argv.includes("--reset-catalog");

async function main() {
  const bySlug: Record<string, string> = {};

  // ───────────── Produtos: 2 pacotes + bumps + upsell ─────────────
  const packageProducts: Prisma.ProductCreateInput[] = LP_PACKAGES.map((p, i) => ({
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    category: "DIGITAL_MODELS",
    fulfillment: "DIGITAL",
    shortDescription: p.shortDescription,
    priceCents: p.priceCents,
    compareAtPriceCents: p.compareAtCents,
    featured: Boolean((p as { featured?: boolean }).featured),
    active: true,
    sortOrder: i + 1,
    seoTitle: `${p.name} — Santinhas de Crochê`,
    seoDescription: p.shortDescription,
  }));

  const extraProducts = [
    ...LP_BUMP_PRODUCTS.map((p, i) => ({ ...p, sortOrder: 10 + i })),
    { ...LP_UPSELL_PRODUCT, sortOrder: 20 },
  ];

  for (const p of [...packageProducts]) {
    const row = await db.product.upsert({
      where: { slug: p.slug as string },
      update: RESET ? { priceCents: p.priceCents, compareAtPriceCents: p.compareAtPriceCents, name: p.name, shortDescription: p.shortDescription, active: true, featured: p.featured } : {},
      create: p,
    });
    bySlug[p.slug as string] = row.id;
  }
  for (const p of extraProducts) {
    const row = await db.product.upsert({
      where: { slug: p.slug },
      update: RESET ? { priceCents: p.priceCents, name: p.name, active: true } : {},
      create: { slug: p.slug, sku: p.sku, name: p.name, category: "DIGITAL_MODELS", fulfillment: "DIGITAL", shortDescription: p.shortDescription, priceCents: p.priceCents, active: true, sortOrder: p.sortOrder },
    });
    bySlug[p.slug] = row.id;
  }

  // ───────────── Order bumps ─────────────
  if (RESET) await db.orderBump.deleteMany();
  if ((await db.orderBump.count()) === 0) {
    await db.orderBump.createMany({
      data: LP_BUMPS.map((b) => ({
        name: b.name,
        productId: bySlug[b.productSlug],
        title: b.title,
        description: b.description,
        benefit: b.benefit,
        imageUrl: b.imageUrl,
        priceCents: b.priceCents,
        sortOrder: b.sortOrder,
        active: true,
        triggerProductIds: b.triggerSlugs.map((s) => bySlug[s]).filter(Boolean),
      })),
    });
  }

  // ───────────── Upsell (pós-pagamento) ─────────────
  if (RESET) await db.upsell.deleteMany();
  if ((await db.upsell.count()) === 0) {
    await db.upsell.create({
      data: {
        name: LP_UPSELL.name,
        productId: bySlug[LP_UPSELL.productSlug],
        headline: LP_UPSELL.headline,
        title: LP_UPSELL.title,
        description: LP_UPSELL.description,
        priceCents: LP_UPSELL.priceCents,
        sortOrder: LP_UPSELL.sortOrder,
        active: true,
        triggerProductIds: [bySlug["pacote-basico"], bySlug["pacote-completo"]].filter(Boolean),
      },
    });
  }

  // ───────────── Landing page (CMS) ─────────────
  if (RESET) await db.landingSection.deleteMany();
  for (const [i, s] of LP_SECTIONS.entries()) {
    const data = {
      type: s.type,
      label: s.label,
      title: s.title ?? null,
      subtitle: s.subtitle ?? null,
      body: s.body ?? null,
      imageUrl: ((s.config?.imageUrl as string) || (s.config?.image as string)) ?? null,
      ctaLabel: s.ctaLabel ?? null,
      ctaTarget: s.ctaTarget ?? null,
      config: (s.config ?? {}) as Prisma.InputJsonValue,
      sortOrder: i + 1,
      active: true,
    };
    await db.landingSection.upsert({ where: { key: s.key }, update: RESET ? data : {}, create: { key: s.key, ...data } });
  }

  // ───────────── FAQ ─────────────
  if (RESET) await db.faq.deleteMany();
  if ((await db.faq.count()) === 0) {
    await db.faq.createMany({ data: LP_FAQ.map((f, i) => ({ question: f.question, answer: f.answer, active: true, sortOrder: i + 1 })) });
  }

  // ───────────── Modelos de mensagem ─────────────
  if ((await db.messageTemplate.count()) === 0) {
    await db.messageTemplate.createMany({
      data: [
        { channel: "WHATSAPP", name: "PIX pendente", body: "Oi, {primeiro_nome}! Aqui é da {loja}. Vi que o PIX das suas receitas ({valor}) ainda está pendente. Pra concluir e já receber o acesso, é só acessar: {link}. Qualquer dúvida, estou por aqui!" },
        { channel: "EMAIL", name: "PIX pendente", body: "Olá, {primeiro_nome}!\n\nO PIX do seu pedido {pedido} ({valor}) ainda está pendente. Para concluir e receber o acesso, acesse: {link}\n\nEquipe {loja}" },
      ],
    });
  }

  console.log(`Seed concluído (Santinhas de Crochê)${RESET ? " [reset-catalog]" : ""}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
