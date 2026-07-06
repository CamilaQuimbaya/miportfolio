"use client";

import CatLogo from "./CatLogo";
import { useView } from "@/lib/view";

/**
 * Mini-logo del gatito flotante — solo en móvil, donde el navbar está oculto.
 * Conserva la marca (carita + fondo) y lleva a inicio al tocarlo.
 */
export default function MobileBrand() {
  const { goTo } = useView();

  return (
    <button
      onClick={() => goTo("inicio")}
      aria-label="Inicio"
      className="group fixed left-4 top-4 z-50 flex items-center gap-2 md:hidden"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 shadow-glow transition-transform group-hover:scale-110 group-hover:-rotate-6">
        <CatLogo className="h-8 w-8" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        camila<span className="text-neon-pink">.dev</span>
      </span>
    </button>
  );
}
