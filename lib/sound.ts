"use client";

// Soniditos de interacción sintetizados con Web Audio (sin archivos).
// Se activan tras la primera interacción del usuario (política de autoplay).

let ctx: AudioContext | null = null;
let muted = false;

if (typeof window !== "undefined") {
  muted = localStorage.getItem("cq_muted") === "1";
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

type Tone = {
  freq: number;
  to?: number;
  type?: OscillatorType;
  start?: number;
  dur?: number;
  vol?: number;
};

function tone(c: AudioContext, { freq, to, type = "sine", start = 0, dur = 0.12, vol = 0.13 }: Tone) {
  const t0 = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.03);
}

export function playSound(name: string) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  switch (name) {
    case "open":
      tone(c, { freq: 520, to: 880, type: "triangle", dur: 0.14, vol: 0.12 });
      tone(c, { freq: 880, type: "sine", start: 0.07, dur: 0.12, vol: 0.07 });
      break;
    case "close":
      tone(c, { freq: 720, to: 340, type: "triangle", dur: 0.16, vol: 0.11 });
      break;
    case "warp":
      tone(c, { freq: 340, to: 1040, type: "sine", dur: 0.18, vol: 0.1 });
      tone(c, { freq: 1320, type: "sine", start: 0.1, dur: 0.1, vol: 0.06 });
      break;
    case "pop":
      tone(c, { freq: 660, to: 990, type: "triangle", dur: 0.09, vol: 0.12 });
      break;
    case "success":
      [523.25, 659.25, 783.99].forEach((f, i) =>
        tone(c, { freq: f, type: "triangle", start: i * 0.09, dur: 0.16, vol: 0.12 })
      );
      tone(c, { freq: 1046.5, type: "sine", start: 0.27, dur: 0.22, vol: 0.08 });
      break;
    default:
      tone(c, { freq: 600, dur: 0.08, vol: 0.1 });
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  if (typeof window !== "undefined") localStorage.setItem("cq_muted", m ? "1" : "0");
}
