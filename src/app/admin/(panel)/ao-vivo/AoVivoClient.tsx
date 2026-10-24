"use client";

import { useEffect, useState } from "react";

type Row = { label: string; n: number };
type Data = { online: number; pages: Row[]; sources: Row[]; devices: Row[]; at: string };

function Panel({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{title}</p>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-slate-400">—</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-slate-700">{r.label}</span>
              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-700">{r.n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AoVivoClient() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/online", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const json = (await res.json()) as Data;
        if (active) {
          setData(json);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      }
    };
    load();
    const t = setInterval(load, 8000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <div>
          <p className="text-3xl font-extrabold tabular-nums text-slate-900">{data?.online ?? "—"}</p>
          <p className="text-sm text-slate-500">online agora</p>
        </div>
        {error && <span className="ml-auto text-xs text-amber-600">Falha ao atualizar — tentando de novo…</span>}
        {data && !error && <span className="ml-auto text-xs text-slate-400">atualizado {new Date(data.at).toLocaleTimeString("pt-BR")}</span>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Em qual página" rows={data?.pages ?? []} />
        <Panel title="Origem" rows={data?.sources ?? []} />
        <Panel title="Dispositivo" rows={data?.devices ?? []} />
      </div>
    </div>
  );
}
