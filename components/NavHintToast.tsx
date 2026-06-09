"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import CatLogo from "./CatLogo";

/** Notificación breve que sugiere usar el gatito para navegar.
 *  Aparece una vez por sesión y se desvanece sola. */
export default function NavHintToast() {
  const { ui } = useContent();
  const [show, setShow] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("cq_hint")) return;
    const t1 = window.setTimeout(() => setShow(true), 2400);
    const t2 = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("cq_hint", "1");
    }, 8000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("cq_hint", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-24 left-6 z-40 flex max-w-[270px] items-center gap-2.5 rounded-2xl glass-strong px-4 py-3 shadow-glow"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/5">
            <CatLogo className="h-6 w-6" />
          </span>
          <span className="text-[13px] leading-snug text-white/85">
            {isTouch ? ui.navHintMobile : ui.navHint}
          </span>
          <button
            onClick={close}
            aria-label="Cerrar"
            className="ml-1 shrink-0 text-white/35 transition-colors hover:text-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
