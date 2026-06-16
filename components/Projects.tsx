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
  labels,
  featured = false,
}: {
  project: Project;
  index: number;
  labels: { enterprise: string; demo: string; code: string; openProject: string };
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  // Muestra la preview solo si hay ruta y la imagen carga bien. Si falta el
  // archivo (404) o falla, onError la apaga y la card vuelve a su gradiente.
  const [showImage, setShowImage] = useState(Boolean(project.image));

  // Link primario al que apunta TODA la card: demo en vivo si existe, si no el repo.
  // Los proyectos privados (enterprise) no tienen link → la card NO es clickeable.
  const primaryHref = project.link ?? project.repo;
  // "Código" se muestra como acción secundaria solo si hay demo Y repo. Si solo
  // hay repo, el repo ya es la acción primaria y no lo duplicamos.
  const hasSecondaryRepo = Boolean(project.link && project.repo);

  // Tilt 3D según la posición del mouse (solo desktop, y solo si la card abre algo:
  // no fingimos interacción donde no hay nada que consultar).
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !primaryHref || window.matchMedia("(pointer: coarse)").matches) return;
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
          {/* Preview real del proyecto (si existe en public/projects/) */}
          {showImage && project.image && (
            <>
              <img
                src={project.image}
                alt=""
                aria-hidden
                onError={() => setShowImage(false)}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Velo para mantener el texto legible sobre la captura */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/85 to-[#0a0612]/55" />
            </>
          )}

          {/* Glow de fondo según el proyecto (solo cuando no hay preview) */}
          {!showImage && (
            <div
              className={`absolute -right-10 -top-10 rounded-full bg-gradient-to-br ${project.gradient} blur-2xl opacity-60 transition-opacity group-hover:opacity-100 ${
                featured ? "h-56 w-56" : "h-40 w-40"
              }`}
            />
          )}

          {/* Stretched link: un solo patrón de interacción — toda la card abre el proyecto */}
          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${labels.openProject}: ${project.title}`}
              className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-pink"
            />
          )}

          <div className="pointer-events-none relative flex h-full flex-col">
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
              {project.enterprise && (
                <span className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/60">
                  <FaLock className="h-2.5 w-2.5" />
                  {labels.enterprise}
                </span>
              )}
            </div>

            <h3
              className={`font-display font-bold text-white transition-colors ${
                primaryHref ? "group-hover:text-neon-pink" : ""
              } ${featured ? "text-2xl" : "text-lg"}`}
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

            {/* Acción PRIMARIA grande y visible: mismo destino que toda la card.
                Va sobre el stretched link (z-20) para recibir el clic directo.
                Un solo patrón: el ojo ve el CTA, y el resto de la card abre lo mismo. */}
            {primaryHref && (
              <div className="pointer-events-auto relative z-20 mt-4 flex flex-col gap-2.5">
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                >
                  {project.link ? (
                    <>
                      <ExternalIcon className="h-4 w-4" />
                      {labels.demo}
                    </>
                  ) : (
                    <>
                      <CodeIcon className="h-4 w-4" />
                      {labels.code}
                    </>
                  )}
                </a>

                {/* Acción SECUNDARIA sutil: solo cuando hay demo Y repo */}
                {hasSecondaryRepo && project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-center text-xs font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    <CodeIcon className="h-3.5 w-3.5" />
                    {labels.code}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { projects } = useContent();
  // Orden: el destacado primero (card grande), luego el resto de consultables, y
  // los privados (enterprise) al final. Sort estable → conserva el orden original
  // dentro de cada grupo. El destacado se marca con `featured` en lib/data.ts.
  const rank = (p: Project) => (p.featured ? 0 : p.enterprise ? 2 : 1);
  const ordered = [...projects.items].sort((a, b) => rank(a) - rank(b));
  return (
    <section id="proyectos" className="relative flex min-h-full items-center justify-center px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker={projects.kicker}
          title={projects.title}
          subtitle={projects.subtitle}
        />

        {/* minmax(230px, auto): cada fila mide al menos 230px para mantener el
            ritmo del bento, pero CRECE si el contenido lo necesita — así el CTA
            grande nunca se recorta. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(230px,auto)]">
          {ordered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              labels={{
                enterprise: projects.enterprise,
                demo: projects.demo,
                code: projects.code,
                openProject: projects.openProject,
              }}
              featured={Boolean(project.featured)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
