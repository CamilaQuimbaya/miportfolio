import { ImageResponse } from "next/og";

// Tarjeta que se muestra al compartir el link (WhatsApp, LinkedIn, X, etc.)
export const runtime = "edge";
export const alt = "Camila Quimbaya · Full Stack & UX/UI Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0612 0%, #2a1145 55%, #4a1259 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Estrellitas decorativas */}
        {[
          { t: 60, l: 1040, s: 48, c: "#ff8fe0", o: 0.9 },
          { t: 150, l: 1130, s: 26, c: "#22d3ee", o: 0.8 },
          { t: 300, l: 1075, s: 64, c: "#e0aaff", o: 0.7 },
          { t: 470, l: 1135, s: 34, c: "#ff4fd8", o: 0.85 },
          { t: 95, l: 770, s: 22, c: "#e0aaff", o: 0.7 },
          { t: 545, l: 940, s: 28, c: "#22d3ee", o: 0.65 },
          { t: 250, l: 1180, s: 18, c: "#ff8fe0", o: 0.6 },
          { t: 410, l: 70, s: 24, c: "#e0aaff", o: 0.5 },
        ].map((st, i) => (
          <svg
            key={i}
            width={st.s}
            height={st.s}
            viewBox="0 0 24 24"
            style={{ position: "absolute", top: st.t, left: st.l, opacity: st.o }}
          >
            <path
              d="M12 0 C12.6 8 16 11.4 24 12 C16 12.6 12.6 16 12 24 C11.4 16 8 12.6 0 12 C8 11.4 11.4 8 12 0 Z"
              fill={st.c}
            />
          </svg>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Gatito simplificado */}
          <svg width="120" height="120" viewBox="0 0 64 64">
            <path d="M16 24 L20 11 L31 20 Z" fill="#ff8fe0" />
            <path d="M48 24 L44 11 L33 20 Z" fill="#ff8fe0" />
            <circle cx="32" cy="35" r="17" fill="#ffd6f5" />
            <circle cx="22" cy="39" r="3" fill="#ff8fe0" />
            <circle cx="42" cy="39" r="3" fill="#ff8fe0" />
            <circle cx="26" cy="34" r="2.5" fill="#3b1d4e" />
            <circle cx="38" cy="34" r="2.5" fill="#3b1d4e" />
            <path
              d="M13 35 A19 19 0 0 1 51 35"
              stroke="#a855f7"
              strokeWidth="3"
              fill="none"
            />
            <rect x="9" y="32" width="7" height="11" rx="3.5" fill="#7c3aed" />
            <rect x="48" y="32" width="7" height="11" rx="3.5" fill="#7c3aed" />
          </svg>
          <div style={{ fontSize: 30, color: "#22d3ee" }}>camilaquimbaya.dev</div>
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            marginTop: 30,
            lineHeight: 1.05,
            background: "linear-gradient(90deg, #ff4fd8, #a855f7, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Camila Quimbaya
        </div>
        <div style={{ fontSize: 38, marginTop: 16, color: "#f5e9ff" }}>
          Full Stack · Tech Lead · UX/UI Designer
        </div>
        <div style={{ fontSize: 30, marginTop: 8, color: "#e0aaff" }}>
          + Profesora de programacion
        </div>
      </div>
    ),
    { ...size }
  );
}
