import { PageHeader } from "@/components/admin/ui";
import { AoVivoClient } from "./AoVivoClient";

export const metadata = { title: "Ao vivo" };

export default function AoVivoPage() {
  return (
    <div>
      <PageHeader title="Ao vivo" description="Quem está no site agora e em qual página. Atualiza a cada 8 segundos (online = visto nos últimos 15s)." />
      <AoVivoClient />
    </div>
  );
}
