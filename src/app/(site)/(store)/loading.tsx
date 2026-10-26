/** Carregando: visível (nunca parece página em branco) enquanto o servidor monta a página. */
export default function Loading() {
  return (
    <div className="container-page flex min-h-[100svh] flex-col items-center justify-center py-16 text-center" aria-busy="true" aria-live="polite">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="animate-pulse text-primary" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 10c4 2 10 2 14 0M4 14c5 2 11 2 16 0M8 4c2 5 2 11 0 16M16 4c-2 5-2 11 0 16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      </svg>
      <p className="mt-4 font-display text-xl font-semibold">Separando os novelos…</p>
      <p className="mt-1 text-sm text-muted">Só um instante.</p>
    </div>
  );
}
