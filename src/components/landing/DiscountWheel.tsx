"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/client/tracking";
import { IconFlower } from "./icons";

const KEY = "fc_wheel_done";
export const DISCOUNT_EVENT = "fc-discount";

// Segmentos (visual). A agulha SEMPRE para no 50%.
const SEGMENTS = ["5%", "15%", "10%", "20%", "25%", "50%"];
const WIN_INDEX = 5;
const SEG = 360 / SEGMENTS.length;
// rosa / azul / dourado alternados; 50% em dourado forte
const COLORS = ["#C98696", "#3A5A8C", "#C8A24C", "#C98696", "#3A5A8C", "#B88322"];

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

  useEffect(() => {
    if (done) return;
    const t = setTimeout(openOnce, 12000);
    const offer = document.getElementById("oferta");
    let io: IntersectionObserver | null = null;
    if (offer && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && openOnce(), { rootMargin: "0px 0px -40% 0px" });
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
    // Centro do setor vencedor (coords do conic, a partir do topo, horário)
    const winCenter = WIN_INDEX * SEG + SEG / 2;
    const target = 360 * 7 - winCenter; // agulha no topo cai no centro do 50%
    setAngle(target);
    setTimeout(() => {
      setSpinning(false);
      applyDiscount();
      track("wheel_win", { props: { discount: 50 } });
    }, 4600);
  }, [spinning, revealed, applyDiscount]);

  const goToOffer = () => {
    setOpen(false);
    document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
  };

  const conic = `conic-gradient(${SEGMENTS.map((_, i) => `${COLORS[i]} ${i * SEG}deg ${(i + 1) * SEG}deg`).join(",")})`;

  return (
    <>
      {!done && !open && (
        <button
          type="button"
          onClick={() => {
            shownRef.current = true;
            setOpen(true);
          }}
          className="group fixed bottom-24 right-3 z-40 flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-[#C96A5C] px-4 py-3 text-sm font-semibold text-white shadow-lift lg:bottom-6"
          aria-label="Abrir roleta de desconto"
        >
          <span className="grid h-6 w-6 animate-spin place-items-center rounded-full bg-white/20 [animation-duration:4s]"><IconFlower className="h-4 w-4" /></span>
          Seu desconto
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Roleta de desconto">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-bg shadow-lift">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-muted hover:bg-white" aria-label="Fechar">✕</button>

            {!revealed ? (
              <div className="bg-gradient-to-b from-rose to-bg px-6 pb-7 pt-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Oferta de boas-vindas</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Gire e ganhe seu desconto</h3>
                <p className="mt-1 text-sm text-muted">Toque no centro da roleta.</p>

                <div className="relative mx-auto mt-6 h-72 w-72">
                  {/* brilho */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" aria-hidden="true" />
                  {/* agulha (topo) */}
                  <div className="absolute left-1/2 top-[-10px] z-20 -translate-x-1/2 drop-shadow" aria-hidden="true">
                    <svg width="34" height="30" viewBox="0 0 34 30"><path d="M17 30 2 4a6 6 0 0 1 30 0L17 30Z" fill="#C8A24C" /><circle cx="17" cy="9" r="4" fill="#fff" /></svg>
                  </div>
                  {/* roda */}
                  <div
                    className="absolute inset-0 rounded-full shadow-lift ring-[10px] ring-white"
                    style={{ transform: `rotate(${angle}deg)`, transition: spinning ? "transform 4.5s cubic-bezier(0.15,0.75,0.12,1)" : "none", background: conic }}
                  >
                    {SEGMENTS.map((s, i) => (
                      <span
                        key={i}
                        className={`absolute left-1/2 top-1/2 origin-left font-bold text-white ${i === WIN_INDEX ? "text-lg" : "text-sm"}`}
                        style={{ transform: `rotate(${i * SEG + SEG / 2 - 90}deg) translateX(46px)` }}
                      >
                        {s}
                      </span>
                    ))}
                    {/* pino decorativo nas divisões */}
                    {SEGMENTS.map((_, i) => (
                      <span key={`p${i}`} className="absolute left-1/2 top-1/2 h-1.5 w-1.5 origin-left rounded-full bg-white/80" style={{ transform: `rotate(${i * SEG - 90}deg) translateX(132px)` }} aria-hidden="true" />
                    ))}
                  </div>
                  {/* hub central = botão girar */}
                  <button
                    onClick={spin}
                    disabled={spinning}
                    className="absolute left-1/2 top-1/2 z-10 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-secondary to-[#B88322] text-[13px] font-bold uppercase tracking-wide text-ink shadow-lg transition active:scale-95 disabled:opacity-80"
                  >
                    {spinning ? "…" : "Girar"}
                  </button>
                </div>
                <p className="mt-5 text-xs text-muted">Sem cadastro. O desconto vale só nesta visita.</p>
              </div>
            ) : (
              <div className="relative bg-gradient-to-b from-rose to-bg px-6 py-10 text-center">
                {/* confete */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="pointer-events-none absolute top-0 h-2 w-2 rounded-sm"
                    style={{ left: `${(i * 53) % 100}%`, background: COLORS[i % COLORS.length], animation: `fcfall 1.6s ${(i % 6) * 0.12}s ease-in forwards`, opacity: 0 }}
                    aria-hidden="true"
                  />
                ))}
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary"><IconFlower className="h-9 w-9" /></span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Parabéns</p>
                <h3 className="mt-1 font-display text-3xl font-semibold text-ink">Você ganhou 50% OFF</h3>
                <p className="mx-auto mt-2 max-w-xs text-base text-muted">O desconto já foi aplicado nos pacotes. Aproveite antes de sair da página.</p>
                <button onClick={goToOffer} className="btn-primary mt-6 w-full">Ver meu preço com desconto</button>
              </div>
            )}
          </div>
          <style>{`@keyframes fcfall{0%{opacity:1;transform:translateY(-10px) rotate(0)}100%{opacity:0;transform:translateY(340px) rotate(360deg)}}`}</style>
        </div>
      )}
    </>
  );
}
