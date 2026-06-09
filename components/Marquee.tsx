"use client";

import { useContent } from "@/lib/i18n";

export default function Marquee() {
  const { marquee: items } = useContent();
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-6 font-display text-xl font-semibold text-white/40">
              {item}
            </span>
            <span className="text-neon-pink">✦</span>
          </div>
        ))}
      </div>
      {/* Fades laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
