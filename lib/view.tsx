"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ViewId = "inicio" | "sobre-mi" | "skills" | "proyectos" | "contacto";

export const VIEW_ORDER: ViewId[] = [
  "inicio",
  "sobre-mi",
  "skills",
  "proyectos",
  "contacto",
];

type Ctx = {
  view: ViewId;
  goTo: (v: ViewId) => void;
  next: () => void;
  prev: () => void;
};

const ViewContext = createContext<Ctx | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewId>("inicio");

  const goTo = useCallback((v: ViewId) => {
    setView((cur) => (cur === v ? cur : v));
  }, []);

  const next = useCallback(() => {
    setView((cur) => {
      const i = VIEW_ORDER.indexOf(cur);
      return VIEW_ORDER[Math.min(i + 1, VIEW_ORDER.length - 1)];
    });
  }, []);

  const prev = useCallback(() => {
    setView((cur) => {
      const i = VIEW_ORDER.indexOf(cur);
      return VIEW_ORDER[Math.max(i - 1, 0)];
    });
  }, []);

  // Navegación con flechas del teclado (ignora si estás escribiendo)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <ViewContext.Provider value={{ view, goTo, next, prev }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView debe usarse dentro de <ViewProvider>");
  return ctx;
}
