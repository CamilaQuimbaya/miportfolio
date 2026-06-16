"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useView } from "@/lib/view";
import Hero from "./Hero";
import Marquee from "./Marquee";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
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
  testimonios: Testimonials,
  contacto: Contacto,
};

export default function ViewStage() {
  const { view, next, prev } = useView();
  const Active = VIEWS[view] ?? Hero;
  const touch = useRef({ x: 0, y: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false); // evita avanzar varias vistas en un solo gesto

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

  // 🖱️ Fallback de scroll: que la rueda avance/retroceda de vista igual que las flechas.
  // Así un reclutador que hace scroll "normal" recorre el sitio sin descubrir el gatito.
  // Primero deja scrollear el contenido interno; solo cambia de vista en los extremos.
  const onWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    const down = e.deltaY > 12;
    const up = e.deltaY < -12;
    if ((down && atBottom) || (up && atTop)) {
      if (wheelLock.current) return;
      wheelLock.current = true;
      down ? next() : prev();
      window.setTimeout(() => (wheelLock.current = false), 700);
    }
  };

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          ref={scrollRef}
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
