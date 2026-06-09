import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Press_Start_2P } from "next/font/google";
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
  title: "Camila Quimbaya · Full Stack & UX/UI Designer ✦",
  description:
    "Portafolio de Camila Quimbaya — Desarrolladora Full Stack, Diseñadora UX/UI y profe de programación. Cyberpunk rosa, kawaii y mucho código bonito.",
  keywords: ["full stack", "ux", "ui", "desarrolladora", "portafolio", "react", "next.js", "angular", "golang"],
  authors: [{ name: "Camila Quimbaya" }],
  openGraph: {
    title: "Camila Quimbaya · Full Stack & UX/UI Designer ✦",
    description:
      "Desarrolladora Full Stack, Diseñadora UX/UI y profe de programación. Cyberpunk rosa & kawaii ✨",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camila Quimbaya · Full Stack & UX/UI Designer ✦",
    description: "Full Stack Dev, UX/UI Designer & programming teacher 🌸",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${grotesk.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
