"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Envoltura reutilizable: revela el contenido al hacer scroll.
 *  once:false -> la animación se repite cada vez que la sección entra en
 *  pantalla (más vivo y evita que se "pierda" con el modo estricto de React). */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.61, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
