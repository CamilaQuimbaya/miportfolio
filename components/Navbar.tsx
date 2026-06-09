"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent, useLang } from "@/lib/i18n";
import { useView, type ViewId } from "@/lib/view";
import CatLogo from "./CatLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const c = useContent();
  const { lang, setLang } = useLang();
  const { view, goTo } = useView();

  const nav = (href: string) => {
    setOpen(false);
    goTo(href.replace("#", "") as ViewId);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-2xl glass-strong px-5 py-3 shadow-glass">
        <button onClick={() => nav("#inicio")} className="group flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 shadow-glow transition-transform group-hover:scale-110 group-hover:-rotate-6">
            <CatLogo className="h-8 w-8" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            camila<span className="text-neon-pink">.dev</span>
          </span>
        </button>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {c.nav.map((link) => {
            const active = view === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <button
                  onClick={() => nav(link.href)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-neon-pink"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Selector de idioma (toggle segmentado) */}
          <div className="flex items-center gap-0.5 rounded-xl glass p-1" role="group" aria-label="Idioma / Language">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  lang === l
                    ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow"
                    : "text-white/45 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => nav("#contacto")}
            className="hidden rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 md:inline-block"
          >
            {c.ui.cta}
          </button>

          {/* Botón móvil */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl glass md:hidden"
            aria-label="Menú"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 w-[92%] max-w-5xl rounded-2xl glass-strong p-3 md:hidden"
          >
            {c.nav.map((link) => (
              <button
                key={link.href}
                onClick={() => nav(link.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-white/80 transition hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
