import Link from "next/link";

/**
 * Selos de confiança + dados da empresa no checkout (produto digital).
 * Nome e CNPJ vêm de Admin → Configurações (company_name / company_document) — editáveis
 * para quando trocar o adquirente/gateway. E-mail vem de contact_email.
 */
export function TrustSeals({ cnpj, companyName, supportEmail }: { cnpj: string | null; companyName: string | null; supportEmail?: string | null }) {
  const seals = [
    { icon: "🔒", title: "Ambiente seguro", sub: "Conexão criptografada (SSL)" },
    { icon: "🛡️", title: "Dados protegidos", sub: "Usados só para o seu pedido" },
    { icon: "⚡", title: "Acesso na hora", sub: "PIX com confirmação imediata" },
  ];
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <ul className="grid grid-cols-3 gap-2 text-center">
        {seals.map((s) => (
          <li key={s.title} className="flex flex-col items-center gap-1 px-1">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/10 text-base">{s.icon}</span>
            <span className="text-[12px] font-extrabold leading-tight text-ink">{s.title}</span>
            <span className="hidden text-[11px] leading-tight text-muted sm:block">{s.sub}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-line pt-3 text-center">
        <p className="inline-flex items-center gap-1.5 text-sm font-bold text-success">AMBIENTE SEGURO <span aria-hidden="true">🔒</span></p>
        <p className="mt-0.5 text-[12px] text-muted">Conexão criptografada por HTTPS</p>
        <p className="mt-2 text-[12px] leading-snug text-muted">
          Este é um produto digital: você receberá por e-mail as receitas em PDF. Nada é enviado pelo correio.
        </p>
        {supportEmail && (
          <p className="mt-1 text-[12px]"><a href={`mailto:${supportEmail}`} className="font-semibold text-accent hover:underline">{supportEmail}</a></p>
        )}
      </div>

      <p className="mt-3 border-t border-line pt-3 text-center text-[11px] leading-snug text-muted">
        Ao comprar, declaro ciência de que a venda é feita pela empresa{" "}
        {companyName ? <b className="text-ink">{companyName}</b> : "responsável"}
        {cnpj ? <> de CNPJ <b className="text-ink">{cnpj}</b></> : ""}, e aceito os{" "}
        <Link href="/termos" className="underline hover:text-ink">Termos de Uso</Link>, a{" "}
        <Link href="/politica-de-privacidade" className="underline hover:text-ink">Política de Privacidade</Link> e a{" "}
        <Link href="/trocas-e-devolucoes" className="underline hover:text-ink">garantia de 7 dias</Link>.
      </p>
    </div>
  );
}
