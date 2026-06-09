"use client";

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
  const { view } = useView();
  const Active = VIEWS[view] ?? Hero;

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
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
