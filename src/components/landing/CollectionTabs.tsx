"use client";

import { useState } from "react";
import Image from "next/image";

export type SaintCard = { n: number; name: string; title: string; attrs: string; img: string };

function Card({ s }: { s: SaintCard }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-surface shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-rose to-bg">
        <Image src={s.img} alt={s.name} fill sizes="(min-width:768px) 22vw, 45vw" className="object-contain p-2 transition duration-500 group-hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Receita {s.n}</span>
      </div>
      <div className="flex flex-1 flex-col p-3 text-center">
        <h4 className="font-display text-base font-semibold leading-tight text-ink">{s.name}</h4>
        {s.title && <p className="mt-0.5 font-display text-sm italic text-primary">{s.title}</p>}
        {s.attrs && <p className="mt-1.5 text-[12px] leading-snug text-muted">{s.attrs}</p>}
      </div>
    </article>
  );
}

export function CollectionTabs({ santas, santos }: { santas: SaintCard[]; santos: SaintCard[] }) {
  const [tab, setTab] = useState<"santas" | "santos">("santas");
  const list = tab === "santas" ? santas : santos;
  const Btn = ({ id, label, count }: { id: "santas" | "santos"; label: string; count: number }) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      aria-pressed={tab === id}
      className={`flex-1 rounded-full px-5 py-3 text-sm font-semibold transition sm:flex-none sm:px-8 ${
        tab === id ? "bg-gradient-to-br from-primary to-[#C96A5C] text-white shadow-soft" : "bg-surface text-ink ring-1 ring-line hover:bg-rose/50"
      }`}
    >
      {label} <span className={`ml-1 text-xs ${tab === id ? "text-white/80" : "text-muted"}`}>({count})</span>
    </button>
  );

  return (
    <div className="mt-8">
      <div className="mx-auto flex max-w-sm gap-2 rounded-full">
        <Btn id="santas" label="10 Santas" count={santas.length} />
        <Btn id="santos" label="10 Santos" count={santos.length} />
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {list.map((s) => (
          <li key={`${tab}-${s.n}`} className="animate-rise">
            <Card s={s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
