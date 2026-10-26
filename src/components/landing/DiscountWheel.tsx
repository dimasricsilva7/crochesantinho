"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/client/tracking";

const KEY = "fc_wheel_done";
export const DISCOUNT_EVENT = "fc-discount";

/** Segmentos da roleta (visual). A agulha sempre para no 50%. */
const SEGMENTS = ["5%", "15%", "10%", "25%", "20%", "50%"];
const WIN_INDEX = 5; // "50%"
const SEG_ANGLE = 360 / SEGMENTS.length;
const SEG_COLORS = ["#C79A3E", "#B65B3C", "#C79A3E", "#B65B3C", "#C79A3E", "#2E5A9C"];

export function hasWheelDiscount(): boolean {
  try {
    return localStorage.getItem(KEY) === "50";
  } catch {
    return false;
  }
}

export function DiscountWheel() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const shownRef = useRef(false);

  // Estado inicial a partir do localStorage
  useEffect(() => {
    const already = hasWheelDiscount();
    setDone(already);
    setRevealed(already);
  }, []);

  const openOnce = useCallback(() => {
    if (shownRef.current || hasWheelDiscount()) return;
    shownRef.current = true;
    setOpen(true);
    track("wheel_open");
  }, []);

  // Gatilho: ~12s OU ao chegar perto da seção de oferta (o que vier primeiro), uma vez por visitante.
  useEffect(() => {
    if (done) return;
    const t = setTimeout(openOnce, 12000);
    const offer = document.getElementById("oferta");
    let io: IntersectionObserver | null = null;
    if (offer && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) openOnce();
        },
        { rootMargin: "0px 0px -40% 0px" }
      );
      io.observe(offer);
    }
    return () => {
      clearTimeout(t);
      io?.disconnect();
    };
  }, [done, openOnce]);

  const applyDiscount = useCallback(() => {
    try {
      localStorage.setItem(KEY, "50");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(DISCOUNT_EVENT));
    setDone(true);
    setRevealed(true);
  }, []);

  const spin = useCallback(() => {
    if (spinning || revealed) return;
    setSpinning(true);
    track("wheel_spin");
    // Para com a agulha (topo) apontando o segmento vencedor (50%).
    const target = 360 * 6 + (360 - (WIN_INDEX * SEG_ANGLE + SEG_ANGLE / 2));
    setAngle(target);
    setTimeout(() => {
      setSpinning(false);
      setRevealed(true);
      applyDiscount();
      track("wheel_win", { props: { discount: 50 } });
    }, 4200);
  }, [spinning, revealed, applyDiscount]);

  const goToOffer = () => {
    setOpen(false);
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Botão flutuante enquanto não girou */}
      {!done && !open && (
        <button
          type="button"
          onClick={() => {
            shownRef.current = true;
            setOpen(true);
          }}
          className="fixed bottom-24 right-3 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-white shadow-lift animate-pulse lg:bottom-6"
          aria-label="Abrir roleta de desconto"
        >
          🎁 Meu desconto
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4" role="dialog" aria-modal="true" aria-label="Roleta de desconto">
          <div className="relative w-full max-w-sm rounded-[1.75rem] bg-surface p-6 text-center shadow-lift">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5" aria-label="Fechar">✕</button>

            {!revealed ? (
              <>
                <h3 className="font-display text-2xl font-semibold text-ink">Gire e ganhe seu desconto</h3>
                <p className="mt-1 text-sm text-muted">Toque no centro para girar a roleta.</p>
                <div className="relative mx-auto mt-5 h-64 w-64">
                  {/* Agulha */}
                  <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2" aria-hidden="true">
                    <div className="h-0 w-0 border-x-[12px] border-t-[20px] border-x-transparent border-t-ink" />
                  </div>
                  {/* Roda */}
                  <div
                    className="h-64 w-64 rounded-full border-[6px] border-ink shadow-lift"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transition: spinning ? "transform 4s cubic-bezier(0.17,0.67,0.21,0.99)" : "none",
                      background: `conic-gradient(${SEGMENTS.map((_, i) => `${SEG_COLORS[i]} ${i * SEG_ANGLE}deg ${(i + 1) * SEG_ANGLE}deg`).join(",")})`,
                    }}
                  >
                    {SEGMENTS.map((s, i) => (
                      <span
                        key={i}
                        className="absolute left-1/2 top-1/2 origin-left text-sm font-extrabold text-white"
                        style={{ transform: `rotate(${i * SEG_ANGLE + SEG_ANGLE / 2}deg) translateX(38px)` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {/* Botão central */}
                  <button
                    onClick={spin}
                    disabled={spinning}
                    className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-ink bg-secondary text-xs font-extrabold uppercase text-ink shadow-lg disabled:opacity-70"
                  >
                    {spinning ? "…" : "Girar"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl">🎉</div>
                <h3 className="mt-3 font-display text-3xl font-semibold text-ink">Você ganhou 50% OFF!</h3>
                <p className="mt-2 text-base text-muted">O desconto já foi aplicado nos pacotes. Aproveite antes de sair da página.</p>
                <button onClick={goToOffer} className="btn-primary mt-6 w-full">Ver meu preço com desconto</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
