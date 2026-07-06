"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Micro-interacción kinética: el título se inclina siguiendo el cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 22 });
  const sy = useSpring(my, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative px-6 pb-16 pt-16 sm:pt-24 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:overflow-hidden"
    >
      {/* ===== Decoración de fondo (centrada tras la foto) ===== */}
      <motion.div
        style={{ opacity }}
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* Glow que respira — suave y armónico */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[88%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-pink/25 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[58%] top-[22%] h-52 w-52 rounded-full bg-neon-cyan/25 blur-[80px]"
        />
        {/* Anillos grandes girando — calmados y en capas */}
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-neon-pink/25" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-[spin_36s_linear_infinite_reverse] rounded-full border border-neon-cyan/15" />
        <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-white/[0.05]" />
      </motion.div>

      {/* ===== Foto centrada, protagonista (desktop) ===== */}
      <motion.div
        style={{ y: photoY, opacity }}
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[54%] max-w-[640px] -translate-x-1/2 lg:block"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src="/profile-hero.webp?v=7"
            alt={profile.name}
            fill
            priority
            sizes="640px"
            className="object-contain object-bottom drop-shadow-[0_10px_50px_rgba(255,79,216,0.28)]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 22%, #000 80%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 22%, #000 80%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ===== Viñeta de legibilidad (oscurece izq. y abajo tras el texto) ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(10,6,18,0.92) 0%, rgba(10,6,18,0.75) 30%, rgba(10,6,18,0) 55%), linear-gradient(to top, rgba(10,6,18,0.85) 0%, rgba(10,6,18,0) 40%)",
        }}
      />

      {/* ===== Textura de grano (profundidad editorial) ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[26] opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* ===== Meta-labels editoriales en esquinas (desktop) ===== */}
      <div
        aria-hidden
        className="absolute right-8 top-28 z-30 hidden text-right leading-tight lg:block"
      >
        <p className="font-pixel text-[8px] uppercase tracking-[0.35em] text-white/40">Portfolio</p>
        <p className="font-pixel text-[8px] uppercase tracking-[0.35em] text-neon-cyan/70">© 2026</p>
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 right-8 z-30 hidden items-center gap-2 lg:flex"
      >
        <span className="font-pixel text-[8px] uppercase tracking-[0.35em] text-white/40">
          scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-neon-cyan/80 to-transparent" />
      </div>

      {/* ===== Contenido superpuesto ===== */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto flex w-full min-w-0 flex-col items-center text-center sm:max-w-6xl lg:items-start lg:text-left"
      >
        {/* Foto en móvil — retrato protagonista */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-6 h-56 w-56 lg:hidden"
        >
          <div className="absolute -inset-2 rounded-full bg-neon-pink/25 blur-2xl" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-neon-pink/40" />
          <div className="absolute -inset-1 animate-[spin_22s_linear_infinite_reverse] rounded-full border border-neon-cyan/20" />
          <Image
            src="/profile-hero.webp?v=7"
            alt={profile.name}
            width={300}
            height={424}
            priority
            className="relative h-full w-full rounded-full object-cover object-top shadow-glow ring-2 ring-neon-pink/50"
          />
        </motion.div>

        {/* Estado: disponibilidad + ubicación real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex w-full flex-wrap items-center justify-center gap-2 lg:justify-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-white/80">{c.ui.available}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-2 text-sm text-white/70">
            <span className="text-neon-cyan">◉</span>
            {c.ui.location}
          </span>
        </motion.div>

        {/* Saludo pixel — animación letra por letra */}
        <motion.p
          aria-label={c.ui.greeting(profile.name)}
          className="mb-4 max-w-full break-words font-pixel text-[10px] text-neon-cyan glow-text sm:text-xs"
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

        {/* Título gigante — superpuesto a la foto */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-tight [transform-style:preserve-3d] sm:text-7xl lg:text-[7.5rem]"
        >
          <span className="block text-gradient glow-text animate-gradient-x">
            {c.ui.heroTitle[0]}
          </span>
          <span className="caret-blink block text-outline lg:ml-24">
            {c.ui.heroTitle[1]}
          </span>
        </motion.h1>

        {/* Roles como chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex w-full flex-wrap items-center justify-center gap-2 lg:justify-start"
        >
          {c.ui.heroTitle[2].split("·").map((role) => (
            <span
              key={role}
              className="rounded-full border border-neon-pink/30 bg-neon-pink/5 px-3 py-1 font-pixel text-[9px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm"
            >
              {role.trim()}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-6 w-full max-w-full text-[15px] leading-relaxed text-white/70 sm:w-auto sm:max-w-sm lg:mx-0"
        >
          {c.ui.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 lg:justify-start"
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

        {/* Tira de stats reales — riqueza editorial */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-9 flex w-full flex-wrap items-center justify-center gap-4 sm:gap-5 lg:justify-start"
        >
          {c.about.stats.slice(0, 3).map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-5">
              {i > 0 && <span className="h-8 w-px bg-white/10" />}
              <div className="text-center lg:text-left">
                <p className="text-gradient font-display text-2xl font-extrabold leading-none">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Socials — inline solo en móvil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex items-center justify-center gap-3 lg:hidden"
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

      {/* ===== Rail vertical de redes (desktop) ===== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <span className="h-14 w-px bg-gradient-to-b from-transparent to-neon-pink/50" />
        {profile.socials.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/50 transition-all hover:scale-125 hover:text-neon-pink hover:drop-shadow-[0_0_10px_rgba(255,79,216,0.7)]"
            >
              {Icon && <Icon className="h-5 w-5" />}
            </a>
          );
        })}
        <span className="mt-1 font-pixel text-[8px] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
          follow
        </span>
      </motion.div>
    </section>
  );
}
