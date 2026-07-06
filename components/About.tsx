"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useContent } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Avatar from "./Avatar";
import Timeline from "./Timeline";

export default function About() {
  const { about, cv } = useContent();
  const fact = about.fact;

  return (
    <section id="sobre-mi" className="relative flex min-h-full items-center justify-center px-6 py-24">
      {/* Glows decorativos de fondo */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-purple/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-neon-pink/15 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <SectionHeading kicker={about.kicker} title={about.title} />

        <div className="grid items-start gap-9 md:grid-cols-[400px_1fr]">
          {/* IZQUIERDA: foto grande (suelta) + identidad + stats */}
          <Reveal>
            <div className="flex flex-col">
              <div className="relative mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center">
                {/* estrellitas flotantes */}
                <span className="absolute -left-4 -top-4 z-20 animate-twinkle text-2xl text-neon-lilac">✦</span>
                <span className="absolute -right-3 top-8 z-20 animate-twinkle text-lg text-neon-cyan" style={{ animationDelay: "0.6s" }}>✧</span>
                <span className="absolute -bottom-3 -left-3 z-20 animate-twinkle text-xl text-neon-pink" style={{ animationDelay: "1.1s" }}>♡</span>
                <span className="absolute -right-4 bottom-10 z-20 animate-twinkle text-sm text-neon-lilac" style={{ animationDelay: "1.6s" }}>✩</span>

                {/* Glow que respira */}
                <motion.div
                  aria-hidden
                  animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-6 rounded-full bg-neon-pink/30 blur-3xl"
                />
                <motion.div
                  aria-hidden
                  animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute right-6 top-8 h-28 w-28 rounded-full bg-neon-cyan/25 blur-2xl"
                />

                {/* Anillos neón girando */}
                <div aria-hidden className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-neon-pink/35" />
                <div aria-hidden className="absolute inset-5 animate-[spin_38s_linear_infinite_reverse] rounded-full border border-neon-cyan/25" />
                <div aria-hidden className="absolute -inset-3 animate-[spin_55s_linear_infinite] rounded-full border border-white/[0.06]" />

                {/* Foto cutout flotando */}
                <Avatar
                  src="/profile-about.webp"
                  contain
                  className="relative z-10 h-[94%] w-[94%] drop-shadow-[0_10px_35px_rgba(255,79,216,0.4)]"
                />

                {/* Stats superpuestos — tarjetas flotantes en las esquinas */}
                {about.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`absolute z-20 rounded-2xl glass-strong px-3 py-2 text-center shadow-glow ${
                      [
                        "-left-3 top-10 animate-float",
                        "-left-3 bottom-20 animate-float-slow",
                        "-right-3 top-10 animate-float-slow",
                        "-right-3 bottom-20 animate-float",
                      ][i]
                    }`}
                  >
                    <p className="text-gradient font-display text-xl font-extrabold leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[9px] uppercase leading-tight tracking-wide text-white/70">
                      {stat.label}
                    </p>
                  </div>
                ))}

                {/* Badge disponible */}
                <span className="absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full glass-strong px-3.5 py-1.5 text-xs text-green-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  {fact.availability}
                </span>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gradient font-display text-3xl font-extrabold leading-tight">
                  {profile.name}
                </p>
                <p className="text-sm text-neon-pink">{profile.alias}</p>
                <p className="mt-1 text-xs text-white/65">Full Stack · UX/UI · Teaching</p>
              </div>
            </div>
          </Reveal>

          {/* DERECHA: tarjeta con descripción + timeline */}
          <Reveal delay={0.1}>
            <div className="gradient-border relative overflow-hidden rounded-[2rem] glass-strong p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-neon-cyan/10 blur-3xl" />

              <div className="relative">
                {/* Bio con acento lateral */}
                <div className="space-y-2.5 border-l-2 border-neon-pink/40 pl-4">
                  {about.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-snug text-white/75">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Divisor */}
                <div className="my-5 flex items-center gap-3">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">
                    ✦ {cv.labels.experience}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-neon-purple/40 to-transparent" />
                </div>

                {/* Timeline */}
                <Timeline items={cv.experience} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
