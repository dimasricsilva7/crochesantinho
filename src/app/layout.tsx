import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteUrl } from "@/lib/env";
import { themeCss } from "@/lib/theme";
import { getSettings } from "@/server/settings";
import "./globals.css";

// Título em serifada quente (Fraunces), corpo em Inter. --font-pixel reaproveita a serifada (sem uso visual na LP).
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "900"], style: ["normal", "italic"], display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700", "800"], display: "swap" });
const pixel = Fraunces({ subsets: ["latin"], variable: "--font-pixel", weight: ["600"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const title = s.seo_title || s.store_name;
  const description = s.seo_description;
  const images = [s.og_image_url || "/og"];
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: title, template: `%s | ${s.store_name}` },
    description,
    applicationName: s.store_name,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "pt_BR", siteName: s.store_name, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
    icons: { icon: s.favicon_url || "/favicon.svg" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FBF6EE", viewportFit: "cover" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const css = themeCss(settings);
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${pixel.variable}`}>
      <head>{css && <style id="theme-tokens">{css}</style>}</head>
      <body>{children}</body>
    </html>
  );
}
