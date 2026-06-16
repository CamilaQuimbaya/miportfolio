"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { useContent } from "@/lib/i18n";
import { useView } from "@/lib/view";
import { iconMap } from "./Icons";

export default function Hero() {
  const c = useContent();
  const { goTo } = useView();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax del contenido del hero al hacer scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-0 flex-1 items-center justify-center px-6 pb-16 pt-24"
    >
      <motion.div style={{ y, opacity, scale }} className="mx-auto max-w-4xl text-center">
        {/* Badge disponible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          <span className="text-white/80">{c.ui.available}</span>
        </motion.div>

        {/* Saludo pixel — animación letra por letra */}
        <motion.p
          aria-label={c.ui.greeting(profile.name)}
          className="mb-5 font-pixel text-xs text-neon-cyan glow-text"
        >
          {c.ui.greeting(profile.name).split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.035, duration: 0.3, ease: "easeOut" }}
              className="inline-block"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.p>

        {/* Título principal — rol primario claro y jerárquico */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient glow-text animate-gradient-x">{c.ui.heroTitle[0]}</span>
          <span className="text-white"> {c.ui.heroTitle[1]}</span>
        </motion.h1>

        {/* Roles de respaldo — no compiten con el titular */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-pixel text-[11px] uppercase tracking-[0.2em] text-white/70 sm:text-xs"
        >
          {c.ui.heroTitle[2]}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-7 max-w-xl text-lg text-white/70"
        >
          {c.ui.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => goTo("proyectos")}
            className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-7 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            {c.ui.viewProjects}
          </button>
          <button
            onClick={() => goTo("contacto")}
            className="rounded-xl glass px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {c.ui.contactMe}
          </button>
          <a
            href="/cv?print=1"
            target="_blank"
            className="rounded-xl glass px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {c.ui.downloadCV}
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl glass text-white/70 transition-all hover:scale-110 hover:text-neon-pink hover:shadow-glow"
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            );
          })}
        </motion.div>
      </motion.div>

    </section>
  );
}
