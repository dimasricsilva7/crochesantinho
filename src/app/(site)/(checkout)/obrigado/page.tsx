import { redirect } from "next/navigation";

/**
 * Página de retorno /obrigado: encaminha para a página do pedido, que confirma o pagamento
 * (PIX), libera o acesso à coleção e oferece o upsell. Aceita ?pedido=NUMERO&t=TOKEN.
 */
export default async function ObrigadoPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const pedido = typeof sp.pedido === "string" ? sp.pedido : typeof sp.numero === "string" ? sp.numero : "";
  const token = typeof sp.t === "string" ? sp.t : typeof sp.token === "string" ? sp.token : "";
  if (pedido) redirect(`/pedido/${encodeURIComponent(pedido)}${token ? `?t=${encodeURIComponent(token)}` : ""}`);
  redirect("/");
}
