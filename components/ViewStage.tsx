"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useView } from "@/lib/view";
import Hero from "./Hero";
import Marquee from "./Marquee";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import WarpOverlay from "./WarpOverlay";

// La vista de inicio = Hero + carrusel de tecnologías abajo
function Inicio() {
  return (
    <div className="flex h-full min-h-[100dvh] flex-col">
      <Hero />
      <Marquee />
    </div>
  );
}

// La vista de contacto incluye el footer al final
function Contacto() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}

const VIEWS: Record<string, () => JSX.Element> = {
  inicio: Inicio,
  "sobre-mi": About,
  skills: Skills,
  proyectos: Projects,
  contacto: Contacto,
};

export default function ViewStage() {
  const { view, next, prev } = useView();
  const Active = VIEWS[view] ?? Hero;
  const touch = useRef({ x: 0, y: 0 });

  // 📱 Swipe horizontal para cambiar de vista (móvil)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    // Solo swipe claramente horizontal (no interfiere con el scroll vertical)
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="h-full w-full overflow-y-auto overflow-x-hidden"
        >
          <Active />
        </motion.div>
      </AnimatePresence>

      <WarpOverlay trigger={view} />
    </main>
  );
}
