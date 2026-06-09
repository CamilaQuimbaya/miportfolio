"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CHARS = ["✦", "✧", "★", "♡", "✩", "🌸", "⭐"];

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (!e.key) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === SEQ[idx]) {
        idx++;
        if (idx === SEQ.length) {
          idx = 0;
          setActive(true);
          window.setTimeout(() => setActive(false), 5000);
        }
      } else {
        idx = k === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const stars = Array.from({ length: 42 }, (_, i) => ({
    left: `${(i * 2.4) % 100}%`,
    delay: (i % 12) * 0.18,
    char: CHARS[i % CHARS.length],
    size: 12 + (i % 5) * 6,
    dur: 3 + (i % 5) * 0.5,
  }));

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[150] overflow-hidden">
          {stars.map((s, i) => (
            <motion.span
              key={i}
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: s.dur, delay: s.delay, ease: "linear" }}
              className="absolute text-neon-lilac"
              style={{ left: s.left, fontSize: s.size }}
            >
              {s.char}
            </motion.span>
          ))}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute left-1/2 top-24 -translate-x-1/2 rounded-full glass-strong px-5 py-3 font-pixel text-[10px] text-neon-pink shadow-glow"
          >
            ♡ kawaii mode unlocked ♡
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
