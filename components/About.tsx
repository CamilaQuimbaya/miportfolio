"use client";

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

        <div className="grid items-start gap-9 md:grid-cols-[340px_1fr]">
          {/* IZQUIERDA: foto grande (suelta) + identidad + stats */}
          <Reveal>
            <div className="flex flex-col">
              <div className="relative mx-auto w-full max-w-[340px]">
                {/* estrellitas flotantes */}
                <span className="absolute -left-4 -top-4 animate-twinkle text-2xl text-neon-lilac">✦</span>
                <span className="absolute -right-3 top-8 animate-twinkle text-lg text-neon-cyan" style={{ animationDelay: "0.6s" }}>✧</span>
                <span className="absolute -bottom-3 -left-3 animate-twinkle text-xl text-neon-pink" style={{ animationDelay: "1.1s" }}>♡</span>
                <span className="absolute -right-4 bottom-10 animate-twinkle text-sm text-neon-lilac" style={{ animationDelay: "1.6s" }}>✩</span>

                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-neon-pink via-neon-purple to-neon-cyan p-[3px] shadow-glow-lg">
                  <Avatar className="h-full w-full rounded-[1.55rem]" />
                  <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full glass-strong px-3.5 py-1.5 text-xs text-green-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    {fact.availability}
                  </span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <p className="text-gradient font-display text-3xl font-extrabold leading-tight">
                  {profile.name}
                </p>
                <p className="text-sm text-neon-pink">{profile.alias}</p>
                <p className="mt-1 text-xs text-white/50">Full Stack · UX/UI · Teaching</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {about.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center transition-colors hover:border-neon-pink/30"
                  >
                    <p className="text-gradient font-display text-2xl font-extrabold">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] leading-tight text-white/50">{stat.label}</p>
                  </div>
                ))}
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
