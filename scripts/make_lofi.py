#!/usr/bin/env python3
"""Genera una pista lofi/ambient original (libre de derechos) como WAV.
Progresion suave Cmaj7 - Am7 - Fmaj7 - G7, pads de seno cálidos,
ligero coro (detune), tremolo y un toque de 'aire' tipo vinilo.
Loop perfecto de 12s.
"""
import math, wave, struct, random

SR = 44100
CHORD_SEC = 3.0
random.seed(7)

# Acordes (frecuencias en Hz) y su raíz de sub-bajo
chords = [
    ([130.81, 164.81, 196.00, 246.94], 65.41),   # Cmaj7
    ([110.00, 130.81, 164.81, 196.00], 55.00),   # Am7
    ([87.31, 110.00, 130.81, 164.81], 43.65),    # Fmaj7
    ([98.00, 123.47, 146.83, 174.61], 49.00),    # G7
]

def osc(freq, t, detune=0.0):
    # seno + 2º armónico suave, con dos voces ligeramente desafinadas (coro)
    a = math.sin(2 * math.pi * freq * t)
    b = math.sin(2 * math.pi * freq * (1 + detune) * t)
    h = 0.25 * math.sin(2 * math.pi * 2 * freq * t)
    return (a + b) * 0.5 + h * 0.5

samples = []
n_per = int(SR * CHORD_SEC)
for notes, root in chords:
    for i in range(n_per):
        t = i / SR
        # ventana coseno alzado -> fade in/out suave (pad que respira, loop limpio)
        env = 0.5 - 0.5 * math.cos(2 * math.pi * i / n_per)
        env = env ** 0.6
        s = 0.0
        for f in notes:
            s += osc(f, t, detune=0.0016) * 0.10
        s += math.sin(2 * math.pi * root * t) * 0.13          # sub-bajo
        trem = 1.0 - 0.15 * (0.5 - 0.5 * math.cos(2 * math.pi * 5.0 * t))
        s *= env * trem
        s += (random.random() - 0.5) * 0.004                  # aire / vinilo
        samples.append(s)

# normaliza suave y escribe WAV 16-bit mono
peak = max(1e-6, max(abs(x) for x in samples))
gain = 0.82 / peak
with wave.open("public/music/lofi.wav", "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    frames = bytearray()
    for x in samples:
        v = max(-1.0, min(1.0, x * gain))
        frames += struct.pack("<h", int(v * 32767))
    w.writeframes(bytes(frames))

print("OK ->", "public/music/lofi.wav", f"({len(samples)/SR:.1f}s)")
