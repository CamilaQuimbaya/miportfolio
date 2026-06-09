"use client";

import { useEffect, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { isMuted, setMuted, playSound } from "@/lib/sound";

export default function SoundToggle() {
  const [muted, setM] = useState(false);

  useEffect(() => setM(isMuted()), []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setM(next);
    if (!next) playSound("pop"); // feedback al activarlos
  };

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Activar sonidos" : "Silenciar sonidos"}
      title={muted ? "Activar sonidos" : "Silenciar sonidos"}
      className="fixed bottom-24 right-6 z-50 grid h-12 w-12 place-items-center rounded-full glass-strong text-white/80 shadow-glow transition-transform hover:scale-110 hover:text-neon-pink"
    >
      {muted ? <FaVolumeXmark className="h-4 w-4" /> : <FaVolumeHigh className="h-4 w-4" />}
    </button>
  );
}
