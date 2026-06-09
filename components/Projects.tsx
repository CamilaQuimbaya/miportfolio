"use client";

import { useRef, useState } from "react";
import { type Project } from "@/lib/data";
import { useContent } from "@/lib/i18n";
import { FaLock } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ExternalIcon, CodeIcon } from "./Icons";
import ProjectIcon from "./ProjectIcon";

function ProjectCard({
  project,
  index,
  enterpriseLabel,
  featured = false,
}: {
  project: Project;
  index: number;
  enterpriseLabel: string;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  // Tilt 3D según la posición del mouse
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateZ(0)`);
  };

  const reset = () => setTransform("");

  return (
    <Reveal
      delay={index * 0.06}
      className={featured ? "sm:col-span-2 lg:row-span-2" : ""}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ transform, transition: "transform 0.2s ease-out" }}
        className="group relative h-full"
      >
        <div className="gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl glass p-5">
          {/* Glow de fondo según el proyecto */}
          <div
            className={`absolute -right-10 -top-10 rounded-full bg-gradient-to-br ${project.gradient} blur-2xl opacity-60 transition-opacity group-hover:opacity-100 ${
              featured ? "h-56 w-56" : "h-40 w-40"
            }`}
          />

          <div className="relative flex h-full flex-col">
            <div className="mb-3 flex items-start justify-between gap-2">
              <span
                className={`grid place-items-center rounded-2xl bg-white/5 shadow-glow ${
                  featured ? "h-16 w-16" : "h-12 w-12"
                }`}
              >
                <ProjectIcon
                  name={project.icon}
                  color={project.iconColor}
                  className={featured ? "text-3xl" : "text-xl"}
                />
              </span>
              <div className="flex items-center gap-2">
                {project.enterprise && (
                  <span className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/60">
                    <FaLock className="h-2.5 w-2.5" />
                    {enterpriseLabel}
                  </span>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Código en GitHub"
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/60 transition hover:bg-white/15 hover:text-white"
                  >
                    <CodeIcon className="h-4 w-4" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver demo"
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/60 transition hover:bg-white/15 hover:text-white"
                  >
                    <ExternalIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <h3
              className={`font-display font-bold text-white transition-colors group-hover:text-neon-pink ${
                featured ? "text-2xl" : "text-lg"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`mt-2 text-sm leading-snug text-white/65 ${
                featured ? "" : "line-clamp-2"
              }`}
            >
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { projects } = useContent();
  return (
    <section id="proyectos" className="relative flex min-h-full items-center justify-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker={projects.kicker}
          title={projects.title}
          subtitle={projects.subtitle}
        />

        {/* Bento: el primero (Conecta) va destacado en grande */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[200px]">
          {projects.items.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              enterpriseLabel={projects.enterprise}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
