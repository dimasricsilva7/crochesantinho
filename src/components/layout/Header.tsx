"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/**
 * Landing de VENDAS pura: barra de marca mínima, SEM menu e SEM links de fuga.
 * Só o logo (volta ao topo) e um botão que leva à oferta.
 */
export function Header({ storeName, logoUrl, ctaLabel }: { storeName: string; logoUrl: string | null; ctaLabel: string; announcement?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled ? "border-b border-line bg-bg/90 backdrop-blur" : "bg-transparent"}`}>
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <a href="#inicio" className="inline-flex items-center" aria-label={`${storeName} — início`}>
          <Logo name={storeName} logoUrl={logoUrl} />
        </a>
        <a href="#oferta" data-cta="header_cta" className="inline-flex min-h-[44px] items-center rounded-full bg-primary px-4 text-sm font-bold text-white shadow-soft active:translate-y-[2px] sm:px-5">
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
