import { LandingTracker, StickyMobileCTA } from "@/components/landing/client";
import { DiscountWheel } from "@/components/landing/DiscountWheel";
import { Autora, Colecao, Conteudo, Destino, Fechamento, FaqList, Garantia, Hero, Livro, Narrative, Oferta, Pecas, Reviews, VideoSection, type Sec } from "@/components/landing/croche";
import { SymbolRow } from "@/components/landing/icons";
import type { PackageCard } from "@/components/landing/PricingCards";
import { LP_FAQ, LP_PACKAGES, LP_SECTIONS } from "@/content/lp";
import { getPublicCatalog } from "@/server/catalog";
import { getApprovedReviews, getFaqs, getLandingSections, loadLandingSectionsDirect, safeLoad, type SectionData } from "@/server/landing";
import { getSettings } from "@/server/settings";

export const dynamic = "force-dynamic";

const REF = "https://ateliedonovelo.online/croche/assets";
const str = (c: Record<string, unknown>, k: string) => (typeof c?.[k] === "string" ? (c[k] as string) : "");

/** Conteúdo de uma seção: banco (se ativo) tem prioridade; senão, a copy do briefing. */
function merge(key: string, rows: SectionData[]): Sec {
  const fallback = LP_SECTIONS.find((s) => s.key === key);
  const row = rows.find((r) => r.key === key && r.active);
  const fCfg = (fallback?.config ?? {}) as Record<string, unknown>;
  const rCfg = (row?.config ?? {}) as Record<string, unknown>;
  return {
    title: row?.title ?? fallback?.title ?? "",
    subtitle: row?.subtitle ?? fallback?.subtitle ?? "",
    body: row?.body ?? fallback?.body ?? "",
    ctaLabel: row?.ctaLabel ?? fallback?.ctaLabel ?? "",
    ctaTarget: row?.ctaTarget ?? fallback?.ctaTarget ?? "#oferta",
    imageUrl: row?.imageUrl ?? null,
    videoUrl: row?.videoUrl ?? null,
    config: { ...fCfg, ...rCfg },
  };
}

export default async function LandingPage() {
  const [sections, catalog, faqsRaw, reviewsRaw, settings] = await Promise.all([
    safeLoad(getLandingSections, loadLandingSectionsDirect, []),
    getPublicCatalog().catch(() => []),
    safeLoad(getFaqs, async () => [], []),
    safeLoad(getApprovedReviews, async () => [], []),
    getSettings(),
  ]);

  const get = (key: string) => merge(key, sections);
  const faqs = faqsRaw.length ? faqsRaw.map((f) => ({ question: f.question, answer: f.answer })) : LP_FAQ;
  const reviews = reviewsRaw.map((r) => ({ id: r.id, name: r.name, text: r.text, photoUrl: r.photoUrl }));

  // Vídeo: só aparece se a seção estiver ativa E tiver URL (dono liga/desliga no admin).
  const videoRow = sections.find((s) => s.key === "video");
  const showVideo = Boolean(videoRow && videoRow.active && videoRow.videoUrl);

  // Pacotes: produto do banco (preço editável) + conteúdo da copy (features/bônus/imagem).
  const images: Record<string, string> = { "pacote-completo": `${REF}/pacote-completo.webp` };
  const toCard = (pk: (typeof LP_PACKAGES)[number]): PackageCard | null => {
    const p = catalog.find((c) => c.slug === pk.slug);
    if (!p) return null;
    return {
      slug: pk.slug,
      name: pk.name,
      tagline: pk.tagline,
      badge: (pk as { badge?: string }).badge,
      featured: Boolean((pk as { featured?: boolean }).featured),
      priceCents: p.priceCents,
      compareAtCents: p.listPriceCents && p.listPriceCents > p.priceCents ? p.listPriceCents : pk.compareAtCents,
      features: pk.features,
      bonuses: (pk as { bonuses?: string[] }).bonuses,
      excludes: (pk as { excludes?: string }).excludes,
      image: images[pk.slug],
      product: { id: p.id, name: p.name, sku: p.sku, priceCents: p.priceCents, category: p.category },
    };
  };
  const packages: PackageCard[] = LP_PACKAGES.map(toCard).filter((x): x is PackageCard => x !== null);

  return (
    <>
      <LandingTracker />
      <Hero sec={get("hero")} />
      <Narrative sec={get("dor")} id="dor" tone="rose" />
      {showVideo && <VideoSection sec={get("video")} url={videoRow!.videoUrl!} poster={str((videoRow!.config ?? {}) as Record<string, unknown>, "posterUrl")} />}
      <Conteudo sec={get("conteudo")} />
      <Pecas sec={get("pecas")} />
      <Livro sec={get("livro")} />
      <Destino sec={get("destino")} />
      <Colecao sec={get("colecao")} />
      <SymbolRow className="py-6" />
      <Narrative sec={get("diferencial")} id="diferencial" tone="soft" flip />
      <Reviews sec={get("reviews")} reviews={reviews} />
      <Autora sec={get("autora")} />
      <Oferta sec={get("oferta")} packages={packages} />
      <Garantia sec={get("garantia")} />
      <FaqList title={get("faq").title || "Perguntas frequentes"} faqs={faqs} />
      <Fechamento sec={get("fechamento")} />
      <DiscountWheel />
      <StickyMobileCTA label={settings.sticky_cta_label || "ESCOLHER MEU PACOTE"} />
    </>
  );
}
