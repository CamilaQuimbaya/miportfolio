"use client";

import Image from "next/image";
import { useState } from "react";
import CatLogo from "./CatLogo";

/**
 * Muestra la foto de perfil (/profile.png) optimizada con next/image.
 * Si todavía no existe, cae elegantemente al gatito kawaii.
 * Para cambiarla: reemplaza  public/profile.png
 */
export default function Avatar({ className = "" }: { className?: string }) {
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
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/profile.png"
        alt="Camila Quimbaya"
        fill
        sizes="(max-width: 768px) 85vw, 400px"
        className="object-cover object-center"
        onError={() => setError(true)}
      />
    </div>
  );
}
