/** Ícones e ornamentos SVG delicados (sem emoji). Usáveis em server e client components. */
import type { ReactElement } from "react";

type P = { className?: string };
const base = (className = "") => ({ className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const);

export function IconCheck({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconShield({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconLock({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconBolt({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

/** Flor delicada — usada como marcador/ornamento (substitui 🎁/✦). */
export function IconFlower({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.1" />
      <path d="M12 3c1.7 0 2.8 1.6 2.2 3.2M12 3c-1.7 0-2.8 1.6-2.2 3.2M21 12c0 1.7-1.6 2.8-3.2 2.2M21 12c0-1.7-1.6-2.8-3.2-2.2M12 21c-1.7 0-2.8-1.6-2.2-3.2M12 21c1.7 0 2.8-1.6 2.2-3.2M3 12c0-1.7 1.6-2.8 3.2-2.2M3 12c0 1.7 1.6 2.8 3.2 2.2" />
    </svg>
  );
}

/** Cruz devocional fina. */
export function IconCross({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 3v18M7 8h10" />
    </svg>
  );
}

/** Agulha de crochê — marca. */
export function IconHook({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 4v8a5 5 0 0 1-10 0" />
      <path d="M17 4c1.6 0 2.4 1.2 2.4 2.2 0 1-.8 1.8-1.8 1.8" />
    </svg>
  );
}

export function IconChart({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 9h16M4 14h16M9 4v16M14 4v16" opacity=".5" />
    </svg>
  );
}

export function IconBook({ className }: P) {
  return (
    <svg {...base(className)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-1.8-1.2-4-1.8-7-1.8V18c3 0 5.2.6 7 1.8 1.8-1.2 4-1.8 7-1.8V4.2c-3 0-5.2.6-7 1.8Z" />
      <path d="M12 6v13.8" />
    </svg>
  );
}

const ICONS: Record<string, (p: P) => ReactElement> = {
  check: IconCheck,
  shield: IconShield,
  lock: IconLock,
  bolt: IconBolt,
  flower: IconFlower,
  cross: IconCross,
  hook: IconHook,
  chart: IconChart,
  book: IconBook,
  grid: IconChart,
  palette: IconHook,
  heart: IconFlower,
  star: IconFlower,
  gift: IconFlower,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = ICONS[name] ?? IconFlower;
  return <C className={className} />;
}

/** Ornamento divisório com uma flor dourada no centro. */
export function Ornament({ className = "" }: P) {
  return (
    <div className={`ornament py-4 ${className}`} aria-hidden="true">
      <IconFlower className="h-5 w-5 text-secondary" />
    </div>
  );
}

/** Fileira de símbolos de crochê (legenda) como textura delicada entre seções. */
export function SymbolRow({ className = "" }: P) {
  return (
    <div className={`symbol-row ${className}`} aria-hidden="true">
      ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦ ✿ ∾ ✛ ◦
    </div>
  );
}
