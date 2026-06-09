import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta cyberpunk rosa + kawaii
        ink: "#0a0612",        // fondo profundo (morado-negro)
        ink2: "#120a1f",       // segundo plano
        neon: {
          pink: "#ff4fd8",     // rosa neón principal
          hot: "#ff2d95",      // rosa caliente
          purple: "#a855f7",   // morado
          violet: "#7c3aed",   // violeta profundo
          cyan: "#22d3ee",     // cian acento
          lilac: "#e0aaff",    // lila suave kawaii
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,79,216,0.45)",
        "glow-lg": "0 0 60px rgba(168,85,247,0.45)",
        glass: "0 8px 32px rgba(124,58,237,0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
