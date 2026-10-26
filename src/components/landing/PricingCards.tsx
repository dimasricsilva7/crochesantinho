"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AddToCartButton } from "./client";
import { DISCOUNT_EVENT, hasWheelDiscount } from "./DiscountWheel";
import { formatBRL } from "@/utils/format";

export type PackageCard = {
  slug: string;
  name: string;
  tagline: string;
  badge?: string;
  featured?: boolean;
  priceCents: number; // preço real (com desconto)
  compareAtCents: number; // âncora
  features: string[];
  bonuses?: string[];
  excludes?: string;
  image?: string;
  product: { id: string; name: string; sku: string; priceCents: number; category?: string };
};

function Price({ pkg, discounted }: { pkg: PackageCard; discounted: boolean }) {
  const main = discounted ? pkg.priceCents : pkg.compareAtCents;
  return (
    <div className="mt-4">
      {discounted ? (
        <>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base text-muted line-through">{formatBRL(pkg.compareAtCents)}</span>
            <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-bold text-success">-50%</span>
          </div>
          <p className="text-center font-display text-5xl font-semibold tracking-tight text-primary">{formatBRL(pkg.priceCents)}</p>
        </>
      ) : (
        <>
          <p className="text-center font-display text-5xl font-semibold tracking-tight text-ink">{formatBRL(main)}</p>
          <p className="mt-1 text-center text-sm font-semibold text-primary">🎁 Gire a roleta e pague {formatBRL(pkg.priceCents)}</p>
        </>
      )}
    </div>
  );
}

function Card({ pkg, discounted }: { pkg: PackageCard; discounted: boolean }) {
  const ref = { id: pkg.product.id, name: pkg.product.name, sku: pkg.product.sku, priceCents: pkg.product.priceCents, category: pkg.product.category };
  return (
    <article className={`relative flex h-full flex-col rounded-[1.5rem] bg-surface p-6 shadow-soft ${pkg.featured ? "border-[3px] border-secondary shadow-lift" : "border border-line"}`}>
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary px-4 py-1 text-xs font-bold text-ink shadow-soft">🎁 {pkg.badge}</span>
      )}
      <p className="font-display text-base italic text-muted">{pkg.tagline}</p>
      <h3 className="font-display text-2xl font-semibold text-ink">{pkg.name}</h3>
      {pkg.image && (
        <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-secondary/10">
          <Image src={pkg.image} alt={`${pkg.name} — material em PDF`} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
        </div>
      )}
      <ul className="mt-4 space-y-2 text-[15px]">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-success" aria-hidden="true">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {pkg.bonuses && pkg.bonuses.length > 0 && (
        <div className="mt-4 rounded-2xl bg-secondary/10 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-secondary">🎁 E de presente</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {pkg.bonuses.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-secondary" aria-hidden="true">✛</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {pkg.excludes && <p className="mt-4 rounded-xl bg-ink/[0.04] p-3 text-center text-xs text-muted">{pkg.excludes}</p>}
      <div className="mt-auto pt-4">
        <Price pkg={pkg} discounted={discounted} />
        <AddToCartButton product={ref} label={`Quero o ${pkg.name.replace("Pacote ", "")}`} element={`buy_${pkg.slug}`} className={`mt-4 w-full ${pkg.featured ? "btn-primary" : "btn-light"}`} kitSelect />
      </div>
    </article>
  );
}

export function PricingCards({ packages }: { packages: PackageCard[] }) {
  const [discounted, setDiscounted] = useState(false);
  useEffect(() => {
    const sync = () => setDiscounted(hasWheelDiscount());
    sync();
    window.addEventListener(DISCOUNT_EVENT, sync);
    return () => window.removeEventListener(DISCOUNT_EVENT, sync);
  }, []);

  return (
    <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2 md:items-stretch">
      {packages.map((p) => (
        <Card key={p.slug} pkg={p} discounted={discounted} />
      ))}
    </div>
  );
}
