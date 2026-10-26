import { redirect } from "next/navigation";

// LP de vendas de pacote único de PDFs: não há página de produto avulsa. Tudo acontece na landing.
export default function ProdutoPage() {
  redirect("/#oferta");
}
