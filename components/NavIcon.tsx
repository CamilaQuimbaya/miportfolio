"use client";

type Props = { name: string; className?: string };

/**
 * Iconos kawaii dibujados a mano para el menú radial del gatito.
 * Cohesionados con el gradiente neón rosa→morado del sitio.
 */
export default function NavIcon({ name, className }: Props) {
  const common = {
    viewBox: "0 0 48 48",
    className,
    fill: "none" as const,
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    // 🏠 INICIO — casita con corazón
    case "inicio":
      return (
        <svg {...common} role="img" aria-label="Inicio">
          <defs>
            <linearGradient id="niHome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fe0" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <path d="M6 24 L24 8 L42 24 Z" fill="url(#niHome)" stroke="#fff0fb" strokeWidth="1.3" strokeLinejoin="round" />
          <rect x="11" y="22" width="26" height="18" rx="3.5" fill="url(#niHome)" stroke="#fff0fb" strokeWidth="1.3" />
          <path d="M24 30c-1-1.6-3.5-1-3.5 .8 0 1.6 2 3 3.5 4.2 1.5-1.2 3.5-2.6 3.5-4.2 0-1.8-2.5-2.4-3.5-.8Z" fill="#ff2d95" />
          <circle cx="15" cy="33" r="1.4" fill="#ff8fe0" opacity="0.8" />
          <circle cx="33" cy="33" r="1.4" fill="#ff8fe0" opacity="0.8" />
        </svg>
      );

    // 🌸 SOBRE MÍ — avatar kawaii
    case "sobre-mi":
      return (
        <svg {...common} role="img" aria-label="Sobre mí">
          <defs>
            <linearGradient id="niMe" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fe0" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d="M9 41c0-8 6.7-12 15-12s15 4 15 12Z" fill="url(#niMe)" stroke="#fff0fb" strokeWidth="1.3" />
          <circle cx="24" cy="17" r="9" fill="#ffd6f5" stroke="#ff5fd2" strokeWidth="1.3" />
          <circle cx="20.5" cy="17" r="1.5" fill="#3b1d4e" />
          <circle cx="27.5" cy="17" r="1.5" fill="#3b1d4e" />
          <circle cx="17.5" cy="19.5" r="1.8" fill="#ff8fe0" opacity="0.75" />
          <circle cx="30.5" cy="19.5" r="1.8" fill="#ff8fe0" opacity="0.75" />
          <path d="M22 20.5c1 1 3 1 4 0" stroke="#c2418f" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* florecita */}
          <g fill="#ff2d95">
            <circle cx="33" cy="9" r="1.6" />
            <circle cx="36" cy="9" r="1.6" />
            <circle cx="34.5" cy="6.5" r="1.6" />
            <circle cx="34.5" cy="11.5" r="1.6" />
            <circle cx="34.5" cy="9" r="1.3" fill="#ffe66d" />
          </g>
        </svg>
      );

    // ⚡ SKILLS — rayo + chispa
    case "skills":
      return (
        <svg {...common} role="img" aria-label="Skills">
          <defs>
            <linearGradient id="niSkill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe66d" />
              <stop offset="100%" stopColor="#ff5fd2" />
            </linearGradient>
          </defs>
          <path
            d="M27 5 L13 27 H22 L20 43 L35 19 H25 Z"
            fill="url(#niSkill)"
            stroke="#fff0fb"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M37 7 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 Z" fill="#22d3ee" />
        </svg>
      );

    // 💼 PROYECTOS — carpeta con estrellita
    case "proyectos":
      return (
        <svg {...common} role="img" aria-label="Proyectos">
          <defs>
            <linearGradient id="niProj" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path d="M7 14 H18 L21 18 H41 V20 H7 Z" fill="#a855f7" />
          <rect x="7" y="18" width="34" height="22" rx="3.5" fill="url(#niProj)" stroke="#fff0fb" strokeWidth="1.3" />
          <path d="M24 24 l1.5 3.4 3.7 .4 -2.8 2.5 .8 3.6 -3.2 -1.9 -3.2 1.9 .8 -3.6 -2.8 -2.5 3.7 -.4 Z" fill="#fff0fb" />
        </svg>
      );

    // 💬 TESTIMONIOS — burbuja de diálogo con corazón
    case "testimonios":
      return (
        <svg {...common} role="img" aria-label="Testimonios">
          <defs>
            <linearGradient id="niTesti" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fe0" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <rect x="6" y="9" width="36" height="25" rx="7" fill="url(#niTesti)" stroke="#fff0fb" strokeWidth="1.3" />
          <path d="M15 33 L15 41 L25 33 Z" fill="url(#niTesti)" stroke="#fff0fb" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M24 16.5c-1.5-2.3-5-1.5-5 1.2 0 2.3 3 4.3 5 5.8 2-1.5 5-3.5 5-5.8 0-2.7-3.5-3.5-5-1.2Z" fill="#ff2d95" />
        </svg>
      );

    // 💌 CONTACTO — sobre con corazón
    case "contacto":
      return (
        <svg {...common} role="img" aria-label="Contacto">
          <defs>
            <linearGradient id="niMail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fe0" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <rect x="6" y="12" width="36" height="26" rx="4" fill="url(#niMail)" stroke="#fff0fb" strokeWidth="1.3" />
          <path d="M7 14 L24 27 L41 14" fill="none" stroke="#fff0fb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 30c-1.3-2-4.3-1.3-4.3 1 0 2 2.6 3.7 4.3 5 1.7-1.3 4.3-3 4.3-5 0-2.3-3-3-4.3-1Z" fill="#ff2d95" />
        </svg>
      );

    default:
      return null;
  }
}
