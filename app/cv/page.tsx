"use client";

import Image from "next/image";
import { profile } from "@/lib/data";
import { useContent, useLang } from "@/lib/i18n";
import {
  FaEnvelope,
  FaWhatsapp,
  FaLocationDot,
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaDownload,
} from "react-icons/fa6";

export default function CVPage() {
  const c = useContent();
  const { lang, setLang } = useLang();
  const L = c.cv.labels;

  const ui = {
    en: { back: "← Back to site", print: "Save as PDF" },
    es: { back: "← Volver al sitio", print: "Guardar como PDF" },
  }[lang];

  const title =
    lang === "es"
      ? "Full Stack · Tech Lead · Diseñadora UX/UI · Profe de programación"
      : "Full Stack · Tech Lead · UX/UI Designer · Programming Teacher";

  const contacts = [
    { Icon: FaEnvelope, text: profile.email },
    { Icon: FaWhatsapp, text: profile.whatsapp.display },
    { Icon: FaLocationDot, text: c.ui.location },
    { Icon: FaGithub, text: "github.com/camilaquimbaya" },
    { Icon: FaLinkedin, text: "linkedin.com/in/camila-quimbaya" },
    { Icon: FaDiscord, text: "camilaquimbaya" },
  ];

  return (
    <div className="cv-screen min-h-screen bg-ink px-4 py-8">
      {/* Acciones (no se imprimen) */}
      <div className="mx-auto mb-6 flex max-w-[820px] items-center justify-between print:hidden">
        <a href="/" className="rounded-xl glass px-4 py-2 text-sm text-white/80 hover:text-white">
          {ui.back}
        </a>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-xl glass p-1">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  lang === l
                    ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow"
                    : "text-white/45 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            <FaDownload className="h-3.5 w-3.5" />
            {ui.print}
          </button>
        </div>
      </div>

      {/* ===== HOJA A4 ===== */}
      <article className="cv-paper mx-auto max-w-[820px] overflow-hidden rounded-2xl bg-white text-[#2d1b3d] shadow-2xl print:rounded-none print:shadow-none">
        {/* Encabezado oscuro tipo cyberpunk (como el fondo del sitio) */}
        <header
          className="relative flex items-center gap-5 overflow-hidden px-8 py-7 text-white"
          style={{
            background:
              "radial-gradient(circle at 88% 18%, rgba(255,79,216,0.28) 0%, transparent 45%), radial-gradient(circle at 12% 88%, rgba(34,211,238,0.22) 0%, transparent 42%), linear-gradient(125deg, #0a0612 0%, #1b0f33 48%, #120a1f 100%)",
          }}
        >
          <div className="relative h-[104px] w-[88px] shrink-0 overflow-hidden rounded-2xl ring-2 ring-neon-pink/70 shadow-[0_0_22px_rgba(255,79,216,0.5)]">
            <Image
              src="/profile.png"
              alt="Camila Quimbaya"
              width={88}
              height={104}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative">
            <h1 className="text-[30px] font-extrabold leading-tight text-white">{profile.name}</h1>
            <p className="mt-1.5 max-w-md text-[12.5px] font-medium leading-snug text-neon-lilac">{title}</p>
          </div>
        </header>

        {/* Cuerpo en dos columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.9fr]">
          {/* -------- Barra lateral -------- */}
          <aside className="cv-side bg-[#faf4ff] px-6 py-7">
            <Section title={L.contact}>
              <ul className="space-y-2 text-[11.5px] text-[#4a3a5a]">
                {contacts.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon className="h-3 w-3 shrink-0 text-[#a855f7]" />
                    <span className="break-all">{text}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={L.skills}>
              <div className="space-y-2.5">
                {c.skills.groups.map((g) => (
                  <div key={g.key}>
                    <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#a855f7]">
                      {g.title}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {g.skills.map((s) => (
                        <span
                          key={s.name}
                          className="rounded-md bg-[#f0e1fb] px-1.5 py-0.5 text-[10.5px] text-[#5a3a7a]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={L.languages}>
              <ul className="space-y-1 text-[11.5px] text-[#4a3a5a]">
                {c.cv.languages.map((lng) => (
                  <li key={lng}>• {lng}</li>
                ))}
              </ul>
            </Section>

            {c.cv.education.length > 0 && (
              <Section title={L.education}>
                <div className="space-y-2">
                  {c.cv.education.map((e, i) => (
                    <div key={i} className="cv-item">
                      <p className="text-[11.5px] font-bold leading-tight text-[#2d1b3d]">{e.title}</p>
                      <p className="text-[11px] text-[#a855f7]">{e.place}</p>
                      <p className="text-[10px] text-[#9a8aaa]">{e.period}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </aside>

          {/* -------- Columna principal -------- */}
          <main className="px-8 py-7">
            <Section title={L.profile}>
              <p className="text-[12.5px] leading-relaxed text-[#4a3a5a]">
                {c.about.paragraphs[0]} {c.about.paragraphs[1]}
              </p>
            </Section>

            <Section title={L.experience}>
              <div className="space-y-3.5">
                {c.cv.experience.map((job, i) => (
                  <div key={i} className="cv-item border-l-2 border-[#f0e1fb] pl-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13.5px] font-bold text-[#2d1b3d]">{job.role}</h3>
                      <span className="whitespace-nowrap text-[10.5px] font-medium text-[#9a8aaa]">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold text-[#a855f7]">{job.company}</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11.5px] leading-snug text-[#4a3a5a]">
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={L.projects}>
              <div className="space-y-2">
                {c.projects.items.map((p) => (
                  <div key={p.title} className="cv-item">
                    <p className="text-[12px] font-bold text-[#2d1b3d]">
                      {p.title}{" "}
                      <span className="font-normal text-[#9a8aaa]">· {p.tags.join(", ")}</span>
                    </p>
                    <p className="text-[11.5px] leading-snug text-[#4a3a5a]">{p.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          </main>
        </div>
      </article>

      {/* Estilos de impresión A4 */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          .cv-screen {
            background: #fff !important;
            padding: 0 !important;
          }
          .cv-paper {
            max-width: 100% !important;
          }
          .cv-side,
          header {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cv-item {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="mb-2 border-b border-[#eadcf5] pb-1 text-[11.5px] font-extrabold uppercase tracking-widest text-[#ff2d95]">
        {title}
      </h2>
      {children}
    </section>
  );
}
