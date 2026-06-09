"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent, useLang } from "@/lib/i18n";
import { useView, type ViewId } from "@/lib/view";
import CatLogo from "./CatLogo";
import NavIcon from "./NavIcon";

export default function CatRadialNav() {
  const c = useContent();
  const { lang } = useLang();
  const { goTo } = useView();
  const [open, setOpen] = useState(false);

  const hint = lang === "es" ? "¿a dónde vamos?" : "where to?";

  // Cierra con la tecla Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    // href tipo "#sobre-mi" -> id de vista "sobre-mi"
    goTo(href.replace("#", "") as ViewId);
  };

  const items = c.nav;
  const N = items.length;
  const R = 150; // radio del círculo

  return (
    <>
      {/* Botón flotante (gatito navegador) */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            aria-label={lang === "es" ? "Abrir menú de navegación" : "Open navigation menu"}
            className="fixed bottom-6 left-6 z-50 grid h-16 w-16 place-items-center rounded-full glass-strong shadow-glow"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-neon-pink/20" />
            <CatLogo className="relative h-12 w-12" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay con menú radial */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 backdrop-blur-md"
          >
            {/* Contenedor central (no cierra al hacer clic dentro) */}
            <div
              className="relative grid h-[360px] w-[360px] place-items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gatito central */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative z-10 grid h-28 w-28 place-items-center rounded-full glass-strong shadow-glow-lg"
              >
                <CatLogo className="h-20 w-20" />
              </motion.div>

              {/* Texto hint */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-2 font-pixel text-[9px] text-neon-cyan glow-text"
              >
                ♡ {hint} ♡
              </motion.p>

              {/* Items en círculo */}
              {items.map((item, i) => {
                const angle = (-90 + (360 / N) * i) * (Math.PI / 180);
                const x = Math.cos(angle) * R;
                const y = Math.sin(angle) * R;
                return (
                  <motion.button
                    key={item.href}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x, y, scale: 1, opacity: 1 }}
                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.04 * i,
                    }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => go(item.href)}
                    className="absolute flex flex-col items-center gap-1"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl glass-strong p-2.5 shadow-glow transition-all hover:bg-white/15 hover:shadow-glow-lg">
                      <NavIcon name={item.href.replace("#", "")} className="h-full w-full" />
                    </span>
                    <span className="rounded-full bg-ink/60 px-2 py-0.5 text-xs font-medium text-white">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Pista para cerrar */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 text-sm text-white/50"
            >
              {lang === "es" ? "Esc o clic afuera para cerrar" : "Esc or click outside to close"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
