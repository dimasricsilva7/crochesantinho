import Image from "next/image";
import { PricingCards, type PackageCard } from "./PricingCards";

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

function Paras({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p key={i} className={className}>{p}</p>
      ))}
    </>
  );
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="h-px w-10 bg-secondary/40" />
      <span className="text-secondary">✛</span>
      <span className="h-px w-10 bg-secondary/40" />
    </div>
  );
}

/* ───────────────────────── HERO (azul mariano, centralizado) ───────────────────────── */
export function Hero({ sec }: { sec: Sec }) {
  const eyebrow = str(sec.config, "eyebrow");
  const trust = str(sec.config, "trust");
  return (
    <section id="inicio" className="relative overflow-hidden bg-accent text-white">
      <div className="container-page flex flex-col items-center py-12 text-center sm:py-16">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>}
        <div className="relative mt-6 h-44 w-72 sm:h-56 sm:w-96">
          <Image src="/img/hero-santinhas.svg" alt="Santinhas de crochê" fill sizes="(min-width:640px) 384px, 288px" className="object-contain" priority />
        </div>
        <h1 className="mt-6 max-w-3xl font-display text-[2rem] font-semibold leading-[1.12] sm:text-4xl lg:text-5xl">{sec.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-white/85 sm:text-xl">{sec.subtitle}</p>
        <a href="#oferta" data-cta="hero_cta" className="btn mt-7 bg-secondary text-ink shadow-lift active:shadow-none">{sec.ctaLabel} →</a>
        {trust && <p className="mt-5 text-sm text-white/70">{trust}</p>}
      </div>
    </section>
  );
}

/* ───────────── Bloco narrativo (dor / diferencial / garantia) ───────────── */
export function Narrative({ sec, id, tone = "default", seal }: { sec: Sec; id?: string; tone?: "default" | "soft" | "warm"; seal?: boolean }) {
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
            <div className="lead mt-4 space-y-4"><Paras text={sec.body} /></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id={id} className={`section ${bg}`}>
      <div className="container-page mx-auto max-w-2xl text-center">
        {seal && <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-success/10 text-3xl" aria-hidden="true">🛡️</span>}
        <h2 className="h-section">{sec.title}</h2>
        <div className="lead mt-4 space-y-4 text-left sm:text-center"><Paras text={sec.body} /></div>
      </div>
    </section>
  );
}

/* ───────────── O que você recebe (3 cards) ───────────── */
const ITEM_ICON: Record<string, string> = { grid: "▦", palette: "🧶", check: "✓", gift: "🎁", heart: "♡", star: "✦" };

export function Conteudo({ sec }: { sec: Sec }) {
  const items = arr<{ icon?: string; title: string; text: string }>(sec.config, "items");
  return (
    <section id="conteudo" className="section bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        </div>
        {items.length > 0 && (
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {items.map((it, i) => (
              <li key={i} className="card flex flex-col items-center p-6 text-center">
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-2xl text-primary" aria-hidden="true">{ITEM_ICON[it.icon ?? ""] ?? "✦"}</span>
                <h3 className="font-display text-lg font-semibold leading-tight">{it.title}</h3>
                <p className="mt-2 text-base text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────── Folha das peças (gráficos) ───────────── */
export function Pecas({ sec }: { sec: Sec }) {
  const img = str(sec.config, "image");
  const pieces = arr<string>(sec.config, "pieces");
  return (
    <section id="pecas" className="section bg-bg">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface shadow-soft">
          <Image src={img || "/img/pecas-folha.svg"} alt="Folha das peças de uma santinha, com gráficos e cores" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-contain" />
        </div>
        <div>
          <h2 className="h-section">{sec.title}</h2>
          {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
          {pieces.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pieces.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-base">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Livro 150 páginas (Pacote Completo) ───────────── */
export function Livro({ sec }: { sec: Sec }) {
  const img = str(sec.config, "image");
  const items = arr<{ icon?: string; title: string; text: string }>(sec.config, "items");
  return (
    <section id="livro" className="section bg-surface">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-secondary/10 shadow-soft">
            <Image src={img || "/img/livro-paginas.svg"} alt="Páginas do livro de receitas completas" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-contain" />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">Pacote Completo · 150 páginas</span>
            <h2 className="h-section mt-3">{sec.title}</h2>
            {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
          </div>
        </div>
        {items.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <li key={i} className="card p-5">
                <span className="text-2xl" aria-hidden="true">{ITEM_ICON[it.icon ?? ""] ?? "✦"}</span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-tight">{it.title}</h3>
                <p className="mt-1 text-sm text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────── Para quem você vai fazer (destino certo) ───────────── */
export function Destino({ sec }: { sec: Sec }) {
  const img = str(sec.config, "image");
  const cards = arr<{ label: string; quote: string; text: string }>(sec.config, "cards");
  return (
    <section id="destino" className="section bg-secondary/[0.07]">
      <div className="container-page grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow">Para quem você vai fazer</p>
          <h2 className="h-section mt-2">{sec.title}</h2>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface shadow-soft">
            <Image src={img || "/img/colecao-santinhas.svg"} alt="Várias santinhas de crochê" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-contain" />
          </div>
        </div>
        <ul className="space-y-4">
          {cards.map((c, i) => (
            <li key={i} className="card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-secondary">{c.label}</p>
              <p className="mt-1 font-display text-lg italic text-ink">{c.quote}</p>
              <p className="mt-1 text-base text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── A coleção (20 desenhos) ───────────── */
export function Colecao({ sec }: { sec: Sec }) {
  const santas = arr<string>(sec.config, "santas");
  const santos = arr<string>(sec.config, "santos");
  const Group = ({ title, names }: { title: string; names: string[] }) => (
    <div className="card p-6">
      <h3 className="font-display text-xl font-semibold text-primary">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {names.map((n) => (
          <li key={n} className="rounded-full bg-bg px-3 py-1.5 text-sm font-medium ring-1 ring-line">{n}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <section id="colecao" className="section bg-bg">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Group title="10 Santas" names={santas} />
          <Group title="10 Santos" names={santos} />
        </div>
      </div>
    </section>
  );
}

/* ───────────── Prova social ───────────── */
type ReviewRow = { id: string; name: string; text: string; photoUrl: string | null };
export function Reviews({ sec, reviews }: { sec: Sec; reviews: ReviewRow[] }) {
  const hasReal = reviews.length > 0;
  return (
    <section id="depoimentos" className="section bg-surface">
      <div className="container-page">
        <h2 className="h-section text-center">{sec.title}</h2>
        <Divider />
        {hasReal ? (
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.id} className="card p-6">
                <p className="text-lg leading-relaxed text-ink">“{r.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full bg-secondary/20">{r.photoUrl && <Image src={r.photoUrl} alt={r.name} fill sizes="44px" className="object-cover" />}</span>
                  <b className="text-base">{r.name}</b>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // TODO: dono — substituir por DEPOIMENTOS REAIS via Admin → Avaliações.
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex flex-col rounded-card border border-dashed border-line bg-bg p-6 text-center">
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

/* ───────────── Autora ───────────── */
export function Autora({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "imageUrl");
  return (
    <section id="autora" className="section bg-bg">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="mx-auto w-full max-w-[280px]">
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-secondary/30 bg-secondary/10 shadow-soft">
            <Image src={img || "/img/autora.svg"} alt="A autora da coleção" fill sizes="280px" className="object-cover" />
          </div>
        </div>
        <div>
          <h2 className="h-section">{sec.title}</h2>
          <div className="lead mt-4 space-y-4"><Paras text={sec.body} /></div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Oferta (pacotes + roleta) ───────────── */
export function Oferta({ sec, packages }: { sec: Sec; packages: PackageCard[] }) {
  return (
    <section id="oferta" className="section bg-accent/[0.06]">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        </div>
        {packages.length > 0 ? (
          <PricingCards packages={packages} />
        ) : (
          <p className="mt-8 text-center text-muted">Pacotes indisponíveis no momento. Verifique o seed do catálogo.</p>
        )}
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
export function FaqList({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section id="faq" className="section bg-surface">
      <div className="container-page mx-auto max-w-2xl">
        <h2 className="h-section text-center">{title}</h2>
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-card border border-line bg-bg">
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

/* ───────────── Fechamento ───────────── */
export function Fechamento({ sec }: { sec: Sec }) {
  return (
    <section id="fechamento" className="section bg-gradient-to-b from-bg to-secondary/[0.12]">
      <div className="container-page mx-auto max-w-2xl text-center">
        <h2 className="h-section">{sec.title}</h2>
        {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
        <a href="#oferta" data-cta="final_cta" className="btn-primary mt-7 w-full sm:w-auto">{sec.ctaLabel}</a>
      </div>
    </section>
  );
}
