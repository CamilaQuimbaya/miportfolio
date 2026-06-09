#!/usr/bin/env python3
"""Genera una pista MÍSTICA / CELTA original (libre de derechos) -> public/music/lofi.wav
Espíritu tipo Zelda: arpa punteada (Karplus-Strong), melodía de ocarina con
vibrato, pad suave y eco. Modo Re dórico. Loop de 14.4s con cola envuelta.
"""
import math, wave, struct, random

SR = 44100
random.seed(11)

BEAT = 0.9                 # ~67 BPM (lento, soñador)
BAR = BEAT * 4
TOTAL = BAR * 4            # 4 compases
tail = int(1.6 * SR)       # cola para envolver el loop
total_n = int(TOTAL * SR)
master = [0.0] * (total_n + tail)

def add(buf, start):
    s = int(start)
    for i, v in enumerate(buf):
        j = s + i
        if 0 <= j < len(master):
            master[j] += v

# ---- Arpa: cuerda punteada (Karplus-Strong) ----
def harp(freq, dur, amp=0.5, decay=0.9965):
    N = max(2, int(SR / freq))
    buf = [random.uniform(-1, 1) for _ in range(N)]
    n = int(dur * SR)
    out = [0.0] * n
    idx = 0
    for i in range(n):
        out[i] = buf[idx]
        nxt = (idx + 1) % N
        buf[idx] = decay * 0.5 * (buf[idx] + buf[nxt])
        idx = nxt
    # pequeño fade-in para evitar clic
    a = int(0.004 * SR)
    for i in range(min(a, n)):
        out[i] *= i / a
    return [s * amp for s in out]

# ---- Ocarina / flauta: seno suave con vibrato y ADSR ----
def ocarina(freq, dur, amp=0.34):
    n = int(dur * SR)
    out = [0.0] * n
    atk, rel = 0.07, 0.28
    for i in range(n):
        t = i / SR
        vib = 1 + 0.007 * math.sin(2 * math.pi * 5.5 * t)
        s = math.sin(2 * math.pi * freq * vib * t)
        s += 0.18 * math.sin(2 * math.pi * 2 * freq * vib * t)  # aire
        env = 1.0
        if t < atk:
            env = t / atk
        if dur - t < rel:
            env = min(env, (dur - t) / rel)
        out[i] = s * env * amp
    return out

# ---- Pad: drone suave que respira ----
def pad(freq, dur, amp=0.06):
    n = int(dur * SR)
    out = [0.0] * n
    for i in range(n):
        t = i / SR
        win = 0.5 - 0.5 * math.cos(2 * math.pi * i / n)
        s = math.sin(2 * math.pi * freq * t) + 0.5 * math.sin(2 * math.pi * freq * 1.5 * t)
        out[i] = s * win * amp
    return out

# Progresión modal (Re dórico): Dm - C - G - Dm
chords = [
    (146.83, [293.66, 349.23, 440.00, 587.33]),  # Dm
    (130.81, [261.63, 329.63, 392.00, 523.25]),  # C
    (98.00,  [196.00, 246.94, 293.66, 392.00]),  # G
    (146.83, [293.66, 349.23, 440.00, 587.33]),  # Dm
]
pattern = [0, 1, 2, 3, 2, 1, 2, 3]   # arpegio fluido de arpa (corcheas)

for b, (root, tones) in enumerate(chords):
    bar_start = b * BAR
    add(pad(root, BAR), bar_start * SR)
    add(pad(root * 2, BAR, amp=0.04), bar_start * SR)
    for k, p in enumerate(pattern):
        t = bar_start + k * (BEAT / 2)
        add(harp(tones[p], 1.3, amp=0.42), t * SR)

# Melodía de ocarina (frase original pentatónica/dórica), beats:
melody = [
    (440.00, 1.5), (587.33, 1.0), (523.25, 0.5), (440.00, 1.0),
    (392.00, 1.5), (329.63, 1.5), (392.00, 1.0), (None, 1.0),
    (587.33, 2.0), (493.88, 1.0), (440.00, 1.0), (None, 1.0),
    (349.23, 1.5), (440.00, 0.5),
]
tcur = 0.0
for freq, beats in melody:
    dur = beats * BEAT
    if freq:
        add(ocarina(freq, dur * 0.96), tcur * SR)
    tcur += dur

# ---- Eco / delay (aire místico) ----
d = int(0.42 * SR)
fb = 0.33
for i in range(d, len(master)):
    master[i] += fb * master[i - d]

# ---- Envolver la cola al inicio -> loop sin costuras ----
for i in range(tail):
    master[i] += master[total_n + i]
master = master[:total_n]

# ---- Normalizar y escribir WAV 16-bit mono ----
peak = max(1e-6, max(abs(x) for x in master))
gain = 0.82 / peak
with wave.open("public/music/lofi.wav", "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    frames = bytearray()
    for x in master:
        v = max(-1.0, min(1.0, x * gain))
        frames += struct.pack("<h", int(v * 32767))
    w.writeframes(bytes(frames))

print("OK -> public/music/lofi.wav", f"({TOTAL:.1f}s, místico/celta)")
