"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import KawaiiIcon from "./KawaiiIcon";
import TechIcon from "./TechIcon";

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

                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between text-[13px]">
                        <span className="flex items-center gap-1.5 text-white/80">
                          <TechIcon name={skill.name} fallback={skill.emoji} className="text-base" />
                          {skill.name}
                        </span>
                        <span className="text-white/40">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: false, amount: 0.6 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-neon-pink to-neon-purple shadow-glow"
                        />
                      </div>
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
