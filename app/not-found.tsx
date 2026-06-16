"use client";

import Link from "next/link";
import CatLogo from "@/components/CatLogo";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-ink px-6 text-center">
      {/* Fondo */}
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-purple/20 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        <div className="animate-float">
          <CatLogo className="h-28 w-28 drop-shadow-[0_0_30px_rgba(255,79,216,0.5)]" />
        </div>

        <h1 className="mt-6 font-display text-7xl font-extrabold">
          <span className="text-gradient glow-text">404</span>
        </h1>
        <p className="mt-3 text-lg text-white/80">
          Esta página se perdió en el ciberespacio
        </p>
        <p className="text-sm text-white/65">This page got lost in cyberspace</p>

        <Link
          href="/"
          className="mt-8 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-7 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-105"
        >
          ← Volver al inicio
        </Link>

        <p className="mt-6 font-pixel text-[9px] tracking-widest text-neon-cyan">
          stay kawaii · keep coding
        </p>
      </div>
    </div>
  );
}
