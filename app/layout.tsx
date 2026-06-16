import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://camilaquimbaya.dev"),
  title: "Camila Quimbaya · Full Stack Developer ✦",
  description:
    "Portfolio of Camila Quimbaya — Full Stack Developer and Frontend Tech Lead. I build digital products end to end with React, Next.js, Angular, Node and C#; I also design UX/UI and teach people to code.",
  keywords: ["full stack developer", "tech lead", "frontend", "react", "next.js", "angular", "node.js", "typescript", "c#", "ux/ui", "portfolio"],
  authors: [{ name: "Camila Quimbaya" }],
  openGraph: {
    title: "Camila Quimbaya · Full Stack Developer ✦",
    description:
      "Full Stack Developer & Tech Lead. I build digital products end to end — from clean code to the product decisions behind them ✨",
    type: "website",
    url: "https://camilaquimbaya.dev",
    siteName: "Camila Quimbaya",
    locale: "en_US",
    alternateLocale: ["es_CO"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camila Quimbaya · Full Stack Developer ✦",
    description: "Full Stack Developer · Tech Lead · UX/UI 🌸",
  },
};

// Datos estructurados: le dicen a Google que esto es una persona/profesional.
// Mejora cómo apareces al buscar "Camila Quimbaya" y habilita resultados ricos.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Camila Quimbaya",
  url: "https://camilaquimbaya.dev",
  image: "https://camilaquimbaya.dev/profile.webp",
  jobTitle: "Full Stack Developer · Tech Lead",
  description:
    "Full Stack Developer and Frontend Tech Lead. I build digital products end to end with React, Next.js, Angular, Node and C#; I design UX/UI and teach people to code.",
  email: "mailto:camila111paco@gmail.com",
  knowsLanguage: ["Spanish", "English"],
  knowsAbout: [
    "React", "Next.js", "Angular", "TypeScript", "Node.js", "C#", ".NET",
    "UX/UI Design", "Technical Leadership", "Mentoring",
  ],
  sameAs: [
    "https://github.com/camilaquimbaya",
    "https://www.linkedin.com/in/camila-quimbaya/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${grotesk.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
