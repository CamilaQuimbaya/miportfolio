"use client";

import { testimonialsList } from "@/lib/data";
import { useContent } from "@/lib/i18n";
import { FaLinkedin } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section
      id="testimonios"
      className="relative flex min-h-full items-center justify-center px-6 py-24"
    >
      {/* Glows decorativos de fondo */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-pink/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker={testimonials.kicker}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonialsList.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.08}>
              <figure className="gradient-border relative flex h-full flex-col rounded-3xl glass p-6">
                {/* Comilla decorativa */}
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-neon-pink/40"
                >
                  &ldquo;
                </span>

                <blockquote className="-mt-2 flex-1 text-[15px] leading-relaxed text-white/80">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  {/* Avatar o inicial como fallback */}
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar}
                      alt=""
                      aria-hidden
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple font-display text-sm font-bold text-white">
                      {t.name.trim().charAt(0)}
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{t.name}</p>
                    <p className="truncate text-xs text-white/65">{t.role}</p>
                  </div>

                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn · ${t.name}`}
                      className="ml-auto shrink-0 text-white/55 transition hover:text-neon-cyan"
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
