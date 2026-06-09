"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

/**
 * Botón flotante de música lofi 🎧
 * Reproduce /music/lofi.mp3 (colócalo en public/music/).
 * Si el archivo no existe, el botón sigue visible y al hacer clic
 * muestra un mensajito indicando dónde poner la pista.
 */
export default function MusicPlayer() {
  const { music } = useContent();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/lofi.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    // Si no hay mp3, usa el .wav generado (la pista original incluida)
    audio.addEventListener("error", () => {
      if (!audio.src.endsWith("lofi.wav")) {
        audio.src = "/music/lofi.wav";
        audio.load();
      }
    });
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const flashHint = () => {
    setShowHint(true);
    window.setTimeout(() => setShowHint(false), 3500);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // Sin archivo o el navegador bloqueó: mostramos la pista de ayuda
      flashHint();
      setPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="max-w-[220px] rounded-2xl glass-strong px-4 py-2 text-right text-xs text-white/90 shadow-glow"
          >
            {music.hint}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={playing ? music.pause : music.play}
        title={playing ? music.pause : music.play}
        className="group flex items-center gap-2 rounded-full glass-strong px-4 py-3 shadow-glow transition-transform hover:scale-105"
      >
        <span className="text-lg">🎧</span>
        {/* Ecualizador animado */}
        <span className="flex h-4 items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full bg-gradient-to-t from-neon-pink to-neon-cyan ${
                playing ? "animate-eq" : "h-1"
              }`}
              style={playing ? { animationDelay: `${i * 0.15}s` } : undefined}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
