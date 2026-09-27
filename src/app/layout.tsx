import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const SITE_URL = "https://duplaconsultores.pt";
const TITLE = "Dupla Consultores – Estratégia, Marketing e Design 360º | Sandra Regala & Hélder Santos";
const DESCRIPTION =
  "Somos uma dupla estratégica e criativa especializada em Marketing, Design e Transformação Digital. Reposicionamos marcas, criamos identidades fortes e alinhamos equipas e comunicação. Trabalhe com a Sandra, o Hélder ou connosco em conjunto — sem pacotes fechados, sem complicações.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s – Dupla" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Dupla",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/img/helder-sandra.webp", alt: "Helder Santos e Sandra Regala, Dupla Consultores" }],
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
