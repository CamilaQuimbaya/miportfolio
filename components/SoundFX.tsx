"use client";

import { useEffect, useRef } from "react";
import { useView } from "@/lib/view";
import { playSound } from "@/lib/sound";

/** Reproduce el sonido de "warp" cada vez que cambia la vista. */
export default function SoundFX() {
  const { view } = useView();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    playSound("warp");
  }, [view]);

  return null;
}
