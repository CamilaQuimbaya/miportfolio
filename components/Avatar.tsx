"use client";

import Image from "next/image";
import { useState } from "react";
import CatLogo from "./CatLogo";

/**
 * Muestra la foto de perfil (/profile.webp) optimizada con next/image.
 * Si todavía no existe, cae elegantemente al gatito kawaii.
 * Para cambiarla: reemplaza  public/profile.webp
 */
export default function Avatar({
  className = "",
  src = "/profile.webp",
  contain = false,
}: {
  className?: string;
  src?: string;
  contain?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`grid place-items-center bg-gradient-to-br from-neon-pink/30 via-neon-purple/30 to-neon-cyan/30 ${className}`}
      >
        <CatLogo className="h-3/4 w-3/4" />
      </div>
    );
  }

  return (
    <div className={`relative ${contain ? "" : "overflow-hidden"} ${className}`}>
      <Image
        src={src}
        alt="Camila Quimbaya"
        fill
        sizes="(max-width: 768px) 85vw, 400px"
        className={contain ? "object-contain object-bottom" : "object-cover object-center"}
        style={
          contain
            ? {
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 62%, transparent 96%)",
                maskImage:
                  "linear-gradient(to bottom, #000 62%, transparent 96%)",
              }
            : undefined
        }
        onError={() => setError(true)}
      />
    </div>
  );
}
