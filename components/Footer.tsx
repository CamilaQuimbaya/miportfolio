"use client";

import { profile } from "@/lib/data";
import { useContent } from "@/lib/i18n";

export default function Footer() {
  const { footer } = useContent();
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-white/65 sm:flex-row">
        <p>
          © {profile.name} · {footer.made}
        </p>
        <p className="font-pixel text-[10px] text-white/65">{footer.tagline}</p>
      </div>
    </footer>
  );
}
