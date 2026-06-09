"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaCode,
  FaServer,
  FaGraduationCap,
  FaPalette,
  FaLaptopCode,
} from "react-icons/fa6";

type Item = { role: string; company: string; period: string };

// Icono según el tipo de rol (se infiere del texto).
function iconFor(role: string): IconType {
  const r = role.toLowerCase();
  if (/teacher|profesor|docen/.test(r)) return FaGraduationCap;
  if (/design|diseñad|graphic|gráfic/.test(r)) return FaPalette;
  if (/backend/.test(r)) return FaServer;
  if (/lead|senior/.test(r)) return FaLaptopCode;
  return FaCode;
}

/** Timeline vertical con línea de gradiente, nodos con icono y entrada animada. */
export default function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* Línea vertical con gradiente */}
      <span className="absolute bottom-4 left-[15px] top-4 w-[2px] rounded-full bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan opacity-70" />

      <div className="space-y-4">
        {items.map((it, i) => {
          const Icon = iconFor(it.role);
          return (
            <motion.div
              key={`${it.role}-${i}`}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="group relative flex gap-3.5"
            >
              {/* Nodo con icono */}
              <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple shadow-glow transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-3.5 w-3.5 text-white" />
              </span>

              <div className="pt-0.5">
                <span className="font-pixel text-[8px] tracking-wide text-neon-cyan">
                  {it.period}
                </span>
                <p className="mt-0.5 font-display text-sm font-bold leading-tight text-white transition-colors group-hover:text-neon-pink">
                  {it.role}
                </p>
                <p className="text-xs text-white/55">{it.company}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
