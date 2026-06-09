"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getContent } from "./data";

export type Lang = "en" | "es";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 🌍 Inglés por defecto
  const [lang, setLangState] = useState<Lang>("en");

  // Al montar, recupera la preferencia guardada
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}

/** Devuelve el contenido del portafolio en el idioma activo. */
export function useContent() {
  const { lang } = useLang();
  return getContent(lang);
}
