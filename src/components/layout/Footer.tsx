import Link from "next/link";
import { CookiePreferencesLink } from "@/components/providers/CookieBanner";
import type { Settings } from "@/server/settings";

export function whatsappLink(number: string, text?: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const full = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${full}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** Rodapé de LP de vendas: só links legais + contato de suporte. Sem navegação/escape. */
export function Footer({ s }: { s: Settings }) {
  const wa = s.whatsapp ? whatsappLink(s.whatsapp) : null;
  const hasContact = wa || s.contact_email;

  return (
    <footer className="mt-auto border-t border-line bg-surface pb-28 pt-12 text-muted lg:pb-12">
      <div className="container-page">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="font-display text-xl font-semibold text-ink">{s.store_name}</span>
          {s.store_tagline && <p className="max-w-md text-sm text-muted">{s.store_tagline}</p>}
          <p className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <span aria-hidden="true">🔒</span> Pagamento 100% seguro via PIX · Garantia de 7 dias
          </p>

          <nav aria-label="Políticas" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/termos" className="hover:text-ink">Termos de uso</Link>
            <Link href="/politica-de-privacidade" className="hover:text-ink">Privacidade</Link>
            <Link href="/trocas-e-devolucoes" className="hover:text-ink">Reembolso e garantia</Link>
            <Link href="/cookies" className="hover:text-ink">Cookies</Link>
            <CookiePreferencesLink className="hover:text-ink" />
          </nav>

          {hasContact && (
            <p className="text-sm">
              Atendimento:{" "}
              {wa && (<><a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">WhatsApp</a>{s.contact_email ? " · " : ""}</>)}
              {s.contact_email && <a href={`mailto:${s.contact_email}`} className="font-semibold text-accent hover:underline">{s.contact_email}</a>}
            </p>
          )}
        </div>

        <div className="mt-8 border-t border-line pt-6 text-center text-xs text-muted/80">
          {s.footer_text && <p className="mb-2">{s.footer_text}</p>}
          <p>
            © {new Date().getFullYear()} {s.company_name || s.store_name}
            {s.company_document ? ` · CNPJ ${s.company_document}` : ""}
            {s.address ? ` · ${s.address}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
