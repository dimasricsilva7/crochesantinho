import { redirect } from "next/navigation";

// LP de vendas de produto único: não há vitrine de loja. Qualquer acesso volta para a landing.
export default function LojaPage() {
  redirect("/");
}
