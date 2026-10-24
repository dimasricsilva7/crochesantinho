import Image from "next/image";

/** Wordmark devocional. Se o admin enviar um logo, ele tem prioridade. */
export function Logo({ name, logoUrl, className = "" }: { name: string; logoUrl?: string | null; className?: string }) {
  if (logoUrl) {
    return (
      <span className={`relative block h-9 w-36 ${className}`}>
        <Image src={logoUrl} alt={name} fill sizes="144px" className="object-contain object-left" priority />
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-primary">
        {/* novelo de linha simples */}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 10c4 2 10 2 14 0M4 14c5 2 11 2 16 0M8 4c2 5 2 11 0 16M16 4c-2 5-2 11 0 16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      </svg>
      <span className="font-display text-xl font-semibold leading-none tracking-tight">{name}</span>
    </span>
  );
}
