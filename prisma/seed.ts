/**
 * Seed idempotente da "Fé em Crochê — Coleção Santinhas": cria o que não existe e NUNCA
 * sobrescreve edições do admin. Toda a copy vem de src/content/lp.ts (fonte única).
 *
 * Regra do projeto: nada comercial é inventado. Depoimentos e número de artesãs ficam como
 * // TODO no código/placeholders; a história da autora nasce com texto [A SER PREENCHIDO].
 */
import "dotenv/config";
import { PrismaClient, type Prisma } from "@prisma/client";
import { LP_SECTIONS, LP_FAQ, LP_PRODUCT, LP_BUMP_PRODUCTS, LP_BUMPS, LP_UPSELL_PRODUCT, LP_UPSELL } from "../src/content/lp";

const db = new PrismaClient();

type Comp = { type: string; label: string; quantity?: string; detail?: string; isBonus?: boolean };
const comps = (list: Comp[]) => list.map((c, i) => ({ id: `c${i + 1}`, quantity: null, detail: null, imageUrl: null, isBonus: false, ...c }));

async function main() {
  // ───────────── Produtos ─────────────
  const bySlug: Record<string, string> = {};

  const mainProduct = await db.product.upsert({
    where: { slug: LP_PRODUCT.slug },
    update: {},
    create: {
      slug: LP_PRODUCT.slug,
      sku: LP_PRODUCT.sku,
      name: LP_PRODUCT.name,
      category: "DIGITAL_MODELS",
      fulfillment: "DIGITAL",
      shortDescription: LP_PRODUCT.shortDescription,
      description: LP_PRODUCT.description,
      priceCents: LP_PRODUCT.priceCents,
      digitalDeliveryNote: LP_PRODUCT.digitalDeliveryNote,
      components: comps(LP_PRODUCT.components as Comp[]),
      featured: true,
      sortOrder: 1,
      seoTitle: "Coleção Santinhas em Crochê — gráficos em PDF",
      seoDescription: LP_PRODUCT.shortDescription,
    } satisfies Prisma.ProductCreateInput,
  });
  bySlug[LP_PRODUCT.slug] = mainProduct.id;

  // Produtos de bump/upsell (ativos para o checkout cotar; a LP não lista catálogo, então não aparecem soltos)
  const extraProducts = [...LP_BUMP_PRODUCTS, LP_UPSELL_PRODUCT];
  for (const [i, p] of extraProducts.entries()) {
    const row = await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        sku: p.sku,
        name: p.name,
        category: "DIGITAL_MODELS",
        fulfillment: "DIGITAL",
        shortDescription: p.shortDescription,
        priceCents: p.priceCents,
        digitalDeliveryNote: p.digitalDeliveryNote,
        active: true,
        sortOrder: 10 + i,
      },
    });
    bySlug[p.slug] = row.id;
  }

  // ───────────── Order bumps (checkout) ─────────────
  if ((await db.orderBump.count()) === 0) {
    await db.orderBump.createMany({
      data: LP_BUMPS.map((b) => ({
        name: b.name,
        productId: bySlug[b.productSlug],
        title: b.title,
        description: b.description,
        benefit: b.benefit,
        priceCents: b.priceCents,
        sortOrder: b.sortOrder,
        active: true,
        triggerProductIds: [bySlug[LP_PRODUCT.slug]],
      })),
    });
  }

  // ───────────── Upsell (pós-pagamento, 1 clique) ─────────────
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
        triggerProductIds: [bySlug[LP_PRODUCT.slug]],
      },
    });
  }

  // ───────────── Landing page (CMS) ─────────────
  for (const [i, s] of LP_SECTIONS.entries()) {
    const config = s.key === "oferta" ? { ...(s.config ?? {}), productId: bySlug[LP_PRODUCT.slug] } : s.config ?? {};
    await db.landingSection.upsert({
      where: { key: s.key },
      update: {},
      create: {
        key: s.key,
        type: s.type,
        label: s.label,
        title: s.title ?? null,
        subtitle: s.subtitle ?? null,
        body: s.body ?? null,
        imageUrl: (s.config?.imageUrl as string) ?? null,
        ctaLabel: s.ctaLabel ?? null,
        ctaTarget: s.ctaTarget ?? null,
        config: config as Prisma.InputJsonValue,
        sortOrder: i + 1,
        active: true,
      },
    });
  }

  // ───────────── FAQ ─────────────
  if ((await db.faq.count()) === 0) {
    await db.faq.createMany({
      data: LP_FAQ.map((f, i) => ({ question: f.question, answer: f.answer, active: true, sortOrder: i + 1 })),
    });
  }

  // ───────────── Modelos de mensagem (recuperação manual) ─────────────
  if ((await db.messageTemplate.count()) === 0) {
    await db.messageTemplate.createMany({
      data: [
        { channel: "WHATSAPP", name: "PIX pendente", body: "Oi, {primeiro_nome}! Aqui é da {loja}. Vi que o PIX da sua Coleção Santinhas ({valor}) ainda está pendente. Pra concluir e já receber o acesso, é só acessar: {link}. Qualquer dúvida, estou por aqui!" },
        { channel: "EMAIL", name: "PIX pendente", body: "Olá, {primeiro_nome}!\n\nO PIX do seu pedido {pedido} ({valor}) ainda está pendente. Para concluir e receber o acesso, acesse: {link}\n\nEquipe {loja}" },
      ],
    });
  }

  console.log("Seed concluído (Coleção Santinhas).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
