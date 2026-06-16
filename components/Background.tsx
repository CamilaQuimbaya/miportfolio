"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  char: string;
};

const CHARS = ["✦", "✧", "★", "♡", "✩", "·"];

export default function Background() {
  const { scrollYProgress } = useScroll();

  // Parallax: cada capa se mueve a distinta velocidad
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  // "lite" = mobile (puntero grueso) o usuario que pide menos movimiento.
  // En ese caso bajamos partículas, blur y parallax: es lo que hacía lento el mobile.
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const isLite = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    ).matches;
    setLite(isLite);

    // Sin estrellitas en modo lite; menos cantidad en desktop.
    if (isLite) return;
    const arr: Sparkle[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 18,
      delay: Math.random() * 4,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
    }));
    setSparkles(arr);
  }, []);

  const blob = lite ? "blur-[70px]" : "blur-[120px]";
  const float1 = lite ? "" : "animate-float";
  const float2 = lite ? "" : "animate-float-slow";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base oscura con tinte morado */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_60%)]" />

      {/* Blobs neón con parallax (estáticos y con menos blur en modo lite) */}
      <motion.div
        style={lite ? undefined : { y: y1 }}
        className={`absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full bg-neon-pink/25 ${blob} ${float1}`}
      />
      <motion.div
        style={lite ? undefined : { y: y2 }}
        className={`absolute top-1/3 -right-28 h-[38rem] w-[38rem] rounded-full bg-neon-purple/25 ${blob} ${float2}`}
      />
      <motion.div
        style={lite ? undefined : { y: y3 }}
        className={`absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-neon-cyan/15 ${blob} ${float1}`}
      />

      {/* Rejilla cyberpunk */}
      <div className={`absolute inset-0 cyber-grid ${lite ? "opacity-40" : "opacity-70"}`} />

      {/* Estrellitas kawaii titilando */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute animate-twinkle text-neon-lilac/80 select-none"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          {s.char}
        </span>
      ))}

      {/* Viñeta inferior para legibilidad */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
