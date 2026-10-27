import Image from "next/image";
import { PricingCards, type PackageCard } from "./PricingCards";
import { CollectionTabs, type SaintCard } from "./CollectionTabs";
import { Icon, IconCheck, IconFlower, IconShield, Ornament } from "./icons";

export type Sec = {
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  ctaTarget: string;
  imageUrl: string | null;
  videoUrl: string | null;
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
  return <Ornament />;
}

/* ───────────────────────── HERO (azul mariano, com imagem) ───────────────────────── */
export function Hero({ sec }: { sec: Sec }) {
  const eyebrow = str(sec.config, "eyebrow");
  const trust = str(sec.config, "trust");
  const img = sec.imageUrl || str(sec.config, "image");
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-accent via-accent to-[#2a3f63] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1.4px)", backgroundSize: "22px 22px" }} aria-hidden="true" />
      <div className="container-page relative flex flex-col items-center py-12 text-center sm:py-16">
        {eyebrow && <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary"><IconFlower className="h-4 w-4" /> {eyebrow}</p>}
        {img && (
          <div className="mt-6 rotate-[-1.2deg] rounded-[1.4rem] border-[6px] border-white bg-white p-1 shadow-lift">
            <div className="relative h-48 w-80 overflow-hidden rounded-[1rem] sm:h-60 sm:w-[28rem]">
              <Image src={img} alt="Santinhas de crochê" fill sizes="(min-width:640px) 448px, 320px" className="object-cover" priority />
            </div>
          </div>
        )}
        <h1 className="mt-8 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.12] sm:text-4xl lg:text-[3.3rem]">{sec.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-white/85 sm:text-xl">{sec.subtitle}</p>
        <a href="#oferta" data-cta="hero_cta" className="btn-gold mt-7">{sec.ctaLabel}</a>
        {trust && <p className="mt-5 text-sm text-white/70">{trust}</p>}
      </div>
    </section>
  );
}

/* ───────────── Bloco narrativo (dor / diferencial) ───────────── */
export function Narrative({ sec, id, tone = "default", flip = false }: { sec: Sec; id?: string; tone?: "default" | "soft" | "rose"; flip?: boolean }) {
  const bg = tone === "soft" ? "bg-surface" : tone === "rose" ? "bg-gradient-to-b from-rose/60 to-bg" : "bg-bg";
  const img = sec.imageUrl || str(sec.config, "imageUrl");
  if (img) {
    return (
      <section id={id} className={`section ${bg}`}>
        <div className={`container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${flip ? "lg:[&>div:first-child]:order-2" : ""}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-line bg-rose/40 shadow-soft sm:aspect-[4/3] lg:aspect-[4/5]">
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
        <h2 className="h-section">{sec.title}</h2>
        <div className="lead mt-4 space-y-4 text-left sm:text-center"><Paras text={sec.body} /></div>
      </div>
    </section>
  );
}

/* ───────────── O que você recebe (3 cards) ───────────── */
export function Conteudo({ sec }: { sec: Sec }) {
  const items = arr<{ icon?: string; title: string; text: string }>(sec.config, "items");
  return (
    <section id="conteudo" className="section bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          <Ornament />
          {sec.subtitle && <p className="lead">{sec.subtitle}</p>}
        </div>
        {items.length > 0 && (
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {items.map((it, i) => (
              <li key={i} className="flex flex-col items-center rounded-[1.25rem] border border-line bg-gradient-to-b from-rose/40 to-surface p-6 text-center">
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Icon name={it.icon ?? "flower"} className="h-6 w-6" /></span>
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

/* ───────────── Folha das peças ───────────── */
export function Pecas({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "image");
  const pieces = arr<string>(sec.config, "pieces");
  return (
    <section id="pecas" className="section bg-bg">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft">
          {img && <Image src={img} alt="Folha das peças de uma santinha, com gráficos e cores" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-contain" />}
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

/* ───────────── Livro 150 páginas ───────────── */
export function Livro({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "image");
  const items = arr<{ icon?: string; title: string; text: string }>(sec.config, "items");
  return (
    <section id="livro" className="section bg-surface">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-rose/30 shadow-soft">
            {img && <Image src={img} alt="Páginas do livro de receitas completas" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />}
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
              <li key={i} className="rounded-[1.25rem] border border-line bg-bg p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent"><Icon name={it.icon ?? "flower"} className="h-5 w-5" /></span>
                <h3 className="mt-3 font-display text-lg font-semibold leading-tight">{it.title}</h3>
                <p className="mt-1 text-sm text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ───────────── Para quem você vai fazer ───────────── */
export function Destino({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "image");
  const cards = arr<{ label: string; quote: string; text: string }>(sec.config, "cards");
  return (
    <section id="destino" className="section bg-gradient-to-b from-rose/60 to-bg">
      <div className="container-page grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow">Para quem você vai fazer</p>
          <h2 className="h-section mt-2">{sec.title}</h2>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft">
            {img && <Image src={img} alt="Várias santinhas de crochê" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />}
          </div>
        </div>
        <ul className="space-y-4">
          {cards.map((c, i) => (
            <li key={i} className="rounded-[1.25rem] border border-line bg-surface p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-wide text-secondary">{c.label}</p>
              <p className="mt-1 font-display text-lg italic text-primary">{c.quote}</p>
              <p className="mt-1 text-base text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── A coleção (santas / santos) ───────────── */
export function Colecao({ sec }: { sec: Sec }) {
  const santas = arr<SaintCard>(sec.config, "santas");
  const santos = arr<SaintCard>(sec.config, "santos");
  return (
    <section id="colecao" className="section bg-bg">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          <Ornament />
          {sec.subtitle && <p className="lead">{sec.subtitle}</p>}
        </div>
        <CollectionTabs santas={santas} santos={santos} />
      </div>
    </section>
  );
}

/* ───────────── Vídeo (ativável no admin) ───────────── */
function videoEmbed(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return null;
}

export function VideoSection({ sec, url, poster }: { sec: Sec; url: string; poster?: string }) {
  const embed = videoEmbed(url);
  return (
    <section id="video" className="section bg-surface">
      <div className="container-page mx-auto max-w-3xl text-center">
        <h2 className="h-section">{sec.title}</h2>
        {sec.subtitle && <p className="lead mt-3">{sec.subtitle}</p>}
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-line bg-ink shadow-lift">
          <div className="relative aspect-video">
            {embed ? (
              <iframe src={embed} title={sec.title} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <video className="absolute inset-0 h-full w-full object-cover" src={url} poster={poster || undefined} controls playsInline preload="metadata" />
            )}
          </div>
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
        <Ornament />
        {hasReal ? (
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.id} className="rounded-[1.25rem] border border-line bg-bg p-6 shadow-soft">
                <p className="text-lg leading-relaxed text-ink">“{r.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full bg-rose">{r.photoUrl && <Image src={r.photoUrl} alt={r.name} fill sizes="44px" className="object-cover" />}</span>
                  <b className="text-base">{r.name}</b>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // TODO: dono — substituir por DEPOIMENTOS REAIS via Admin → Avaliações.
          <ul className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex flex-col rounded-[1.25rem] border border-dashed border-line bg-bg p-6 text-center">
                <span className="mx-auto h-12 w-12 rounded-full bg-rose" aria-hidden="true" />
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
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-rose bg-rose/40 shadow-soft">
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
    <section id="oferta" className="section bg-gradient-to-b from-bg via-rose/40 to-bg">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">{sec.title}</h2>
          <Ornament />
          {sec.subtitle && <p className="lead">{sec.subtitle}</p>}
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

/* ───────────── Garantia (selo forte, sem emoji) ───────────── */
export function Garantia({ sec }: { sec: Sec }) {
  return (
    <section id="garantia" className="section bg-surface">
      <div className="container-page">
        <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-[1.75rem] border border-secondary/30 bg-gradient-to-br from-bg to-rose/40 p-7 shadow-soft sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-12">
          {/* Selo */}
          <div className="mx-auto">
            <div className="relative grid h-36 w-36 place-items-center rounded-full border-[3px] border-dashed border-secondary text-center">
              <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-secondary to-[#B88322] text-white shadow-soft">
                <IconShield className="h-8 w-8" />
                <span className="mt-0.5 font-display text-2xl font-bold leading-none">7</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide">dias</span>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <p className="eyebrow">Garantia incondicional</p>
            <h2 className="mt-1 font-display text-[1.7rem] font-semibold leading-tight text-ink sm:text-3xl">{sec.title}</h2>
            <p className="lead mt-3">{sec.body}</p>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink lg:justify-start">
              <IconCheck className="h-4 w-4 text-success" /> Sem formulário · sem pergunta · reembolso no mesmo PIX
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
export function FaqList({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section id="faq" className="section bg-bg">
      <div className="container-page mx-auto max-w-2xl">
        <h2 className="h-section text-center">{title}</h2>
        <Ornament />
        <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-surface">
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

/* ───────────── Fechamento (com imagem) ───────────── */
export function Fechamento({ sec }: { sec: Sec }) {
  const img = sec.imageUrl || str(sec.config, "image");
  return (
    <section id="fechamento" className="section bg-gradient-to-b from-bg to-accent/[0.08]">
      <div className="container-page mx-auto max-w-4xl">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {img && (
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-rose/40 shadow-soft lg:order-1">
              <Image src={img} alt="Santinhas de crochê" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <h2 className="h-section">{sec.title}</h2>
            {sec.subtitle && <p className="lead mt-4">{sec.subtitle}</p>}
            <a href="#oferta" data-cta="final_cta" className="btn-primary mt-7 w-full sm:w-auto">{sec.ctaLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
