import { LandingTracker, StickyMobileCTA } from "@/components/landing/client";
import { Autora, Conteudo, Fechamento, FaqList, Hero, Narrative, Oferta, Reviews, type Sec } from "@/components/landing/croche";
import { LP_FAQ, LP_PRODUCT, LP_SECTIONS } from "@/content/lp";
import { getPublicCatalog } from "@/server/catalog";
import { getApprovedReviews, getFaqs, getLandingSections, loadLandingSectionsDirect, safeLoad, type SectionData } from "@/server/landing";
import { getSettings } from "@/server/settings";

export const dynamic = "force-dynamic";

/** Monta o conteúdo de uma seção: banco (se existir e ativo) tem prioridade; senão, a copy do briefing. */
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

  const product = catalog.find((p) => p.slug === LP_PRODUCT.slug) ?? null;
  const get = (key: string) => merge(key, sections);
  const faqs = faqsRaw.length ? faqsRaw.map((f) => ({ question: f.question, answer: f.answer })) : LP_FAQ;
  const reviews = reviewsRaw.map((r) => ({ id: r.id, name: r.name, text: r.text, photoUrl: r.photoUrl }));

  return (
    <>
      <LandingTracker />
      <Hero sec={get("hero")} />
      <Narrative sec={get("dor")} id="dor" tone="soft" />
      <Conteudo sec={get("conteudo")} />
      <Narrative sec={get("diferencial")} id="diferencial" tone="warm" />
      <Narrative sec={get("paraquem")} id="para-quem" />
      <Reviews sec={get("reviews")} reviews={reviews} />
      <Autora sec={get("autora")} />
      <Oferta sec={get("oferta")} product={product} />
      <Narrative sec={get("garantia")} id="garantia" tone="soft" seal />
      <FaqList title={get("faq").title || "Perguntas frequentes"} faqs={faqs} />
      <Fechamento sec={get("fechamento")} />
      <StickyMobileCTA label={settings.sticky_cta_label || "QUERO MINHAS SANTINHAS"} />
    </>
  );
}
