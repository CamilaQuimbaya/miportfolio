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
