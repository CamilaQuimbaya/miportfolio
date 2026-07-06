"use client";

import { useLang } from "@/lib/i18n";

/**
 * Selector de idioma flotante — solo en móvil, donde el navbar está oculto.
 * En desktop el toggle vive dentro del Navbar.
 */
export default function MobileLangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="fixed right-4 top-4 z-50 flex items-center gap-0.5 rounded-xl glass-strong p-1 md:hidden"
    >
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
            lang === l
              ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow"
              : "text-white/65 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
