import Image from "next/image";
import { AddToCartButton, ViewTracker } from "./client";
import { formatBRL } from "@/utils/format";
import type { PublicProduct } from "@/types/catalog";

/** Conteúdo de uma seção, já mesclado (banco + fallback da copy). */
export type Sec = {
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  ctaTarget: string;
  imageUrl: string | null;
  config: Record<string, unknown>;
};

const str = (c: Record<string, unknown>, k: string) => (typeof c[k] === "string" ? (c[k] as string) : "");
const arr = <T,>(c: Record<string, unknown>, k: string): T[] => (Array.isArray(c[k]) ? (c[k] as T[]) : []);
const ref = (p: PublicProduct) => ({ id: p.id, name: p.name, sku: p.sku, priceCents: p.priceCents, category: p.category });

function Paras({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}

/** Divisória discreta com motivo dourado. */
export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="h-px w-10 bg-secondary/40" />
      <span className="text-secondary">✛</span>
      <span className="h-px w-10 bg-secondary/40" />
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
export function Hero({ sec }: { sec: Sec }) {
  const stats = arr<{ value: string; label: string }>(sec.config, "stats");
  const eyebrow = str(sec.config, "eyebrow");
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-bg to-secondary/[0.08]">
      <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div>
          {eyebrow && <p className="font-display text-base italic text-accent sm:text-lg">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-[2rem] font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-5xl">{sec.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/80 sm:text-xl">{sec.subtitle}</p>
          <a href="#oferta" data-cta="hero_cta" className="btn-primary mt-7 w-full sm:w-auto">
            {sec.ctaLabel}
          </a>
          {stats.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {stats.map((s, i) => (
                <li key={i} className="inline-flex items-center gap-1.5">
                  <span className="text-secondary">✛</span>
                  <span>
                    <b className="text-ink">{s.value}</b> <span className="text-muted">{s.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}

/** Mockup de celular + tablet em CSS envolvendo a capa. Troque o src por uma imagem final. */
function HeroMockup() {
  return (
    <div className="relative mx-auto flex max-w-md items-end justify-center gap-3 sm:gap-5">
      {/* Tablet */}
      <div className="relative w-[58%] rotate-[-4deg] rounded-[1.6rem] border-[6px] border-ink/85 bg-ink/85 shadow-lift">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem] bg-surface">
          <Image src="/img/hero-mockup.svg" alt="Páginas da coleção de santinhas em crochê no tablet" fill sizes="(min-width:1024px) 22vw, 50vw" className="object-cover" priority />
        </div>
      </div>
      {/* Celular, à frente */}
      <div className="relative -ml-10 w-[40%] translate-y-4 rotate-[5deg] rounded-[1.6rem] border-[6px] border-ink/85 bg-ink/85 shadow-lift">
        <span className="absolute left-1/2 top-1.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/40" aria-hidden="true" />
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.1rem] bg-surface">
          <Image src="/img/hero-mockup.svg" alt="" aria-hidden="true" fill sizes="(min-width:1024px) 16vw, 40vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Bloco narrativo (dor / diferencial / para quem / garantia) ───────────────────── */
export function Narrative({
  sec,
  id,
  tone = "default",
  seal,
}: {
  sec: Sec;
  id?: string;
  tone?: "default" | "soft" | "warm";
  seal?: boolean;
}) {
  const bg = tone === "soft" ? "bg-surface" : tone === "warm" ? "bg-accent/[0.06]" : "bg-bg";
  const img = sec.imageUrl || str(sec.config, "imageUrl");
  if (img) {
    return (
      <section id={id} className={`section ${bg}`}>
        <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-secondary/10 shadow-soft">
            <Image src={img} alt={sec.title} fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="h-section">{sec.title}</h2>
            <div className="lead mt-4 space-y-4">
              <Paras text={sec.body} />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id={id} className={`section ${bg}`}>
      <div className="container-page mx-auto max-w-2xl text-center">
        {seal && (
          <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-success/10 text-3xl" aria-hidden="true">
            🛡️
          </span>
        )}
        <h2 className="h-section">{sec.title}</h2>
        <div className="lead mt-4 space-y-4 text-left sm:text-center">
          <Paras text={sec.body} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── O que você recebe ───────────────────────── */
const ITEM_ICON: Record<string, string> = { grid: "▦", palette: "🧶", check: "✓", gift: "🎁", heart: "♡", star: "✦" };

export function Conteudo({ sec }: { sec: Sec }) {
  const items = arr<{ icon?: string; title: string; text: string }>(sec.config, "items");
  const gallery = arr<{ src: string; alt: string }>(sec.config, "gallery");
  return (
    <section id="conteudo-coleção" className="section bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        </div>
        {items.length > 0 && (
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {items.map((it, i) => (
              <li key={i} className="card flex flex-col items-center p-6 text-center">
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-2xl text-primary" aria-hidden="true">
                  {ITEM_ICON[it.icon ?? ""] ?? "✦"}
                </span>
                <h3 className="font-display text-lg font-semibold leading-tight">{it.title}</h3>
                <p className="mt-2 text-base text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        )}
        {gallery.length > 0 && (
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {gallery.map((g, i) => (
              <li key={i} className="relative aspect-square overflow-hidden rounded-card border border-line bg-secondary/10 shadow-soft">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:640px) 30vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Prova social (depoimentos reais) ───────────────────────── */
type ReviewRow = { id: string; name: string; text: string; photoUrl: string | null };

export function Reviews({ sec, reviews }: { sec: Sec; reviews: ReviewRow[] }) {
  // Exemplo de tom (NÃO exibir como real):
  // "Fiz a santinha pro batizado do meu neto e a igreja toda começou a encomendar." — [Nome], [Cidade]
  const hasReal = reviews.length > 0;
  return (
    <section id="depoimentos" className="section bg-bg">
      <div className="container-page">
        <h2 className="h-section text-center">{sec.title}</h2>
        <Divider />
        {hasReal ? (
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.id} className="card p-6">
                <p className="text-lg leading-relaxed text-ink">“{r.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full bg-secondary/20">
                    {r.photoUrl && <Image src={r.photoUrl} alt={r.name} fill sizes="44px" className="object-cover" />}
                  </span>
                  <b className="text-base">{r.name}</b>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // TODO: dono — substituir por DEPOIMENTOS REAIS (foto + nome + cidade + frase) via Admin → Avaliações.
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex flex-col rounded-card border border-dashed border-line bg-surface p-6 text-center">
                <span className="mx-auto h-12 w-12 rounded-full bg-secondary/15" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-muted">Espaço para depoimento real</p>
                <p className="mt-1 text-xs text-muted/70">Adicione em Admin → Avaliações: foto, nome, cidade e a frase da artesã.</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Autora ───────────────────────── */
export function Autora({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "imageUrl");
  return (
    <section id="autora" className="section bg-surface">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="mx-auto w-full max-w-[280px]">
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-secondary/30 bg-secondary/10 shadow-soft">
            {/* TODO: dono colocar foto real em /public/img/autora.svg */}
            <Image src={img || "/img/autora.svg"} alt="A autora da coleção" fill sizes="280px" className="object-cover" />
          </div>
        </div>
        <div>
          <h2 className="h-section">{sec.title}</h2>
          <div className="lead mt-4 space-y-4">
            <Paras text={sec.body} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Oferta ───────────────────────── */
export function Oferta({ sec, product }: { sec: Sec; product: PublicProduct | null }) {
  const bullets = arr<string>(sec.config, "bullets");
  const seals = arr<string>(sec.config, "seals");
  return (
    <section id="oferta" className="section bg-accent text-white">
      <div className="container-page">
        <h2 className="h-section text-center text-white">{sec.title}</h2>
        <div className="mx-auto mt-8 max-w-lg rounded-[1.75rem] bg-surface p-6 text-ink shadow-lift sm:p-8">
          {product ? (
            <ViewTracker
              event="product_view"
              productId={product.id}
              valueCents={product.priceCents}
              meta={{ sku: product.sku, name: product.name, priceCents: product.priceCents, category: product.category }}
            >
              <p className="text-center font-display text-xl font-semibold">{product.name}</p>
              <div className="mt-3 flex items-end justify-center gap-2">
                {product.listPriceCents && product.listPriceCents > product.priceCents && (
                  <span className="pb-1 text-lg text-muted line-through">{formatBRL(product.listPriceCents)}</span>
                )}
                <span className="font-display text-5xl font-semibold tracking-tight text-primary">{formatBRL(product.priceCents)}</span>
              </div>
              <p className="mt-1 text-center text-sm text-muted">{sec.subtitle}</p>
              {bullets.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-base">
                      <span className="mt-1 text-success" aria-hidden="true">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              <AddToCartButton product={ref(product)} label={sec.ctaLabel || "Quero a coleção agora"} element="offer_cta" className="btn-primary mt-6 w-full" kitSelect />
              {seals.length > 0 && (
                <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-muted">
                  {seals.map((s, i) => (
                    <li key={i} className="inline-flex items-center gap-1">
                      <span className="text-success" aria-hidden="true">●</span> {s}
                    </li>
                  ))}
                </ul>
              )}
            </ViewTracker>
          ) : (
            <p className="text-center text-muted">Produto indisponível no momento. Verifique o seed do catálogo.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
export function FaqList({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section id="faq" className="section bg-bg">
      <div className="container-page mx-auto max-w-2xl">
        <h2 className="h-section text-center">{title}</h2>
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {faqs.map((f, i) => (
            <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3 font-display text-lg font-semibold">
                {f.question}
                <span className="shrink-0 text-primary transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Fechamento ───────────────────────── */
export function Fechamento({ sec }: { sec: Sec }) {
  return (
    <section id="fechamento" className="section bg-gradient-to-b from-bg to-secondary/[0.1]">
      <div className="container-page mx-auto max-w-2xl text-center">
        <h2 className="h-section">{sec.title}</h2>
        {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        <a href="#oferta" data-cta="final_cta" className="btn-primary mt-7 w-full sm:w-auto">
          {sec.ctaLabel}
        </a>
      </div>
    </section>
  );
}
