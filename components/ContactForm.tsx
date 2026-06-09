"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";
import CatLogo from "./CatLogo";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const { contact } = useContent();
  const f = contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white placeholder-white/40 outline-none transition focus:border-neon-pink/60 focus:bg-white/[0.07]";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-green-400/30 bg-green-400/[0.08] px-6 py-8 text-center"
      >
        <div className="relative">
          {/* Estrellitas que estallan */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 text-neon-lilac"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos((i / 6) * Math.PI * 2) * 56,
                y: Math.sin((i / 6) * Math.PI * 2) * 56,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.04, ease: "easeOut" }}
            >
              ✦
            </motion.span>
          ))}

          {/* Gatito feliz que rebota al aparecer */}
          <motion.div
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 12 }}
          >
            <CatLogo happy className="h-24 w-24" />
          </motion.div>

          {/* Insignia de check */}
          <motion.span
            className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-green-400 ring-2 ring-ink"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 320, damping: 14 }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <motion.path
                d="M5 12 l4 4 L19 7"
                fill="none"
                stroke="#0a0612"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.66, duration: 0.3 }}
              />
            </svg>
          </motion.span>
        </div>

        <p className="font-display text-xl font-extrabold text-white">{f.thanks}</p>
        <p className="text-sm text-white/70">{f.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder={f.name}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder={f.email}
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        required
        rows={3}
        placeholder={f.message}
        className={`${inputClass} resize-none`}
      />

      {status === "error" && (
        <p className="text-sm text-neon-pink">{f.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3.5 font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.send}
      </button>
    </form>
  );
}
