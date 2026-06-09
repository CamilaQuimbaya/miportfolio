"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CatLogo from "./CatLogo";

/** Pantalla de carga kawaii (se muestra una vez por sesión). */
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("cq_seen")) {
      setLoading(false);
      return;
    }
    sessionStorage.setItem("cq_seen", "1");
    const t = window.setTimeout(() => setLoading(false), 1600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-ink"
        >
          <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <CatLogo className="h-24 w-24 drop-shadow-[0_0_24px_rgba(255,79,216,0.5)]" />
            </motion.div>
            <p className="font-display text-xl font-bold tracking-tight text-white">
              camila<span className="text-neon-pink">.dev</span>
            </p>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full w-full rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan"
              />
            </div>
            <p className="font-pixel text-[9px] tracking-widest text-neon-cyan">loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
