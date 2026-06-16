"use client";

import { useContent } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import KawaiiIcon from "./KawaiiIcon";
import TechIcon from "./TechIcon";

// Estilo del chip según el nivel (sin porcentajes: o lo dominas, o no).
const LEVEL_STYLES: Record<string, string> = {
  core: "border-transparent bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow",
  solid: "border-white/15 bg-white/5 text-neon-cyan",
  familiar: "border-white/10 bg-transparent text-white/60",
};

export default function Skills() {
  const { skills } = useContent();
  return (
    <section id="skills" className="relative flex min-h-full items-center justify-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker={skills.kicker}
          title={skills.title}
          subtitle={skills.subtitle}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.1}>
              <div className="group gradient-border h-full rounded-3xl glass p-5 transition-transform duration-300 hover:-translate-y-2">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 p-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <KawaiiIcon name={group.key} className="h-full w-full" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{group.title}</h3>
                </div>

                <div className="space-y-1.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-2 rounded-xl px-1 py-1 text-[13px]"
                    >
                      <span className="flex items-center gap-1.5 text-white/80">
                        <TechIcon name={skill.name} fallback={skill.emoji} className="text-base" />
                        {skill.name}
                      </span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${LEVEL_STYLES[skill.level]}`}
                      >
                        {skills.levels[skill.level]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
