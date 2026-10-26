import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

/** Imagem Open Graph padrão, usada quando Admin → Configurações → SEO não define uma imagem. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#FBF6EE", padding: 80, fontFamily: "serif" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#B65B3C", letterSpacing: 2 }}>Fé em Crochê</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#3C2E25", lineHeight: 1.08, marginTop: 20, maxWidth: 1000 }}>
          Faça as suas próprias santinhas de crochê.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#7A6E63", marginTop: 26 }}>
          O gráfico de cada peça e o passo a passo, em PDF · Acesso na hora via PIX
        </div>
      </div>
    ),
    { ...size, headers: { "Cache-Control": "public, max-age=86400" } }
  );
}
