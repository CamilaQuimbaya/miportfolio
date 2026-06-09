"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CatLogo from "./CatLogo";

const CHARS = ["✦", "✧", "★", "♡", "✩", "❀"];

/** Reproduce un "puf" mágico cada vez que cambia `trigger` (la vista activa). */
export default function WarpOverlay({ trigger }: { trigger: string }) {
  const [play, setPlay] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false; // no animar en la carga inicial
      return;
    }
    setPlay(true);
    const t = window.setTimeout(() => setPlay(false), 850);
    return () => window.clearTimeout(t);
  }, [trigger]);

  const N = 16;
  const sparkles = Array.from({ length: N }, (_, i) => ({
    angle: (i / N) * Math.PI * 2,
    char: CHARS[i % CHARS.length],
    dist: 200 + (i % 3) * 50,
  }));

  return (
    <AnimatePresence>
      {play && (
        <motion.div
          key={trigger}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-0 z-[55] grid place-items-center"
        >
          {/* Destello radial + blur */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.85, times: [0, 0.3, 1] }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,79,216,0.55), rgba(124,58,237,0.3) 38%, transparent 70%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Anillo que se expande */}
          <motion.div
            className="absolute rounded-full border-2 border-neon-lilac/70"
            initial={{ width: 40, height: 40, opacity: 0.8 }}
            animate={{ width: 520, height: 520, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Gatito puf */}
          <motion.div
            className="relative"
            initial={{ scale: 0.2, opacity: 0, rotate: -25 }}
            animate={{ scale: [0.2, 1.35, 1.7], opacity: [0, 1, 0], rotate: [-25, 0, 18] }}
            transition={{ duration: 0.85, times: [0, 0.45, 1], ease: "easeOut" }}
          >
            <CatLogo className="h-28 w-28 drop-shadow-[0_0_24px_rgba(255,79,216,0.6)]" />
          </motion.div>

          {/* Estrellitas que estallan desde el centro */}
          {sparkles.map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl text-neon-lilac"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(s.angle) * s.dist,
                y: Math.sin(s.angle) * s.dist,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.3],
              }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              {s.char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
