#!/usr/bin/env python3
"""Pista ALEGRE y SUAVE / kawaii original (libre de derechos) -> public/music/lofi.wav
LARGA (~54s) y VARIADA para que se sienta como loop INFINITO:
- progresión de 24 compases (C G Am F Dm Em...)
- melodía algorítmica pentatónica (camina por la escala, nunca repite igual)
- marimba cálida + bajo redondo + pad suave + eco
- empalme sin costuras (crossfade equal-power con prolongación).
"""
import math, wave, struct, random

SR = 44100
PI = math.pi
BEAT = 0.56
BAR = BEAT * 4
random.seed(7)

# Progresión de 24 compases (familia de Do mayor)
LETTERS = "C G Am F  C G F G  Am F C G  Dm G C C  F G Am Am  F G C C".split()
CH = {
    "C":  (130.81, [261.63, 329.63, 392.00]),
    "G":  (98.00,  [246.94, 293.66, 392.00]),
    "Am": (110.00, [261.63, 329.63, 440.00]),
    "F":  (87.31,  [261.63, 349.23, 440.00]),
    "Dm": (146.83, [293.66, 349.23, 440.00]),
    "Em": (164.81, [246.94, 329.63, 392.00]),
}
prog = [CH[x] for x in LETTERS]
BARS = len(prog)
TOTAL = BAR * BARS
total_n = int(TOTAL * SR)

OVER = int((BAR + 0.8) * SR)          # prolongación para el empalme
buf_n = total_n + OVER
master = [0.0] * buf_n

def add(buf, start):
    s = int(start)
    for i, v in enumerate(buf):
        j = s + i
        if 0 <= j < buf_n:
            master[j] += v

def marimba(freq, dur, amp=0.32):
    n = int(dur * SR); out = [0.0] * n
    for i in range(n):
        t = i / SR
        env = math.exp(-3.0 * t)
        s = math.sin(2*PI*freq*t) + 0.22*math.sin(2*PI*2*freq*t)*math.exp(-6*t)
        out[i] = s * env * amp
    a = int(0.006 * SR)
    for i in range(min(a, n)): out[i] *= i / a
    return out

def bass(freq, dur, amp=0.26):
    n = int(dur * SR); out = [0.0] * n
    for i in range(n):
        t = i / SR
        env = min(1, t/0.012) * math.exp(-2.4 * t)
        out[i] = (math.sin(2*PI*freq*t) + 0.18*math.sin(2*PI*2*freq*t)) * env * amp
    return out

def pad(freq, dur, amp=0.05):
    n = int(dur * SR); out = [0.0] * n
    for i in range(n):
        t = i / SR
        win = 0.5 - 0.5*math.cos(2*PI*i/n)
        out[i] = (math.sin(2*PI*freq*t) + 0.5*math.sin(2*PI*freq*1.5*t)) * win * amp
    return out

def lead(freq, dur, amp=0.23):
    n = int(dur * SR); out = [0.0] * n
    atk, rel = 0.035, 0.13
    for i in range(n):
        t = i / SR
        vib = 1 + 0.004*math.sin(2*PI*5*t)
        s = math.sin(2*PI*freq*vib*t) + 0.10*math.sin(2*PI*2*freq*vib*t)
        env = 1.0
        if t < atk: env = t/atk
        if dur - t < rel: env = min(env, (dur-t)/rel)
        out[i] = s * env * amp
    return out

arp = [0, 1, 2, 1, 0, 1, 2, 1]

def render_bar(b, base):
    root, tones = prog[b]
    bs = base + b * BAR
    add(pad(root, BAR), bs * SR)
    for k, p in enumerate(arp):
        add(marimba(tones[p], 0.7), (bs + k*(BEAT/2)) * SR)
    for k in range(4):
        add(bass(root, 0.5), (bs + k*BEAT) * SR)

# Backing de los 24 compases + el compás 0 repetido como prolongación
for b in range(BARS):
    render_bar(b, 0)
render_bar(0, TOTAL)   # overhang para el crossfade

# ---- Melodía pentatónica algorítmica (camina por la escala, con variación) ----
SCALE = [392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]
PATTERNS = [[1,1,1,1], [1.5,0.5,1,1], [2,1,1], [1,1,2],
            [0.5,0.5,1,2], [1.5,1.5,1], [1,0.5,0.5,1,1], [2,2]]
total_beats = BARS * 4
beat_pos = 2 * 4      # entra en el compás 3
idx = 4
while beat_pos < total_beats - 1:
    if random.random() < 0.12:        # respiro de un compás
        beat_pos += 4
        continue
    for d in random.choice(PATTERNS):
        if beat_pos >= total_beats: break
        if random.random() < 0.12:    # silencio
            beat_pos += d; continue
        idx = max(0, min(len(SCALE)-1, idx + random.choice([-2,-1,-1,0,1,1,2])))
        add(lead(SCALE[idx], d * BEAT * 0.95), beat_pos * BEAT * SR)
        beat_pos += d

# Eco suave
d = int(0.30 * SR); fb = 0.24
for i in range(d, buf_n):
    master[i] += fb * master[i - d]

# ---- Empalme sin costuras (crossfade equal-power) ----
XF = int(0.35 * SR)
final = [0.0] * total_n
for i in range(total_n):
    if i < XF:
        w = i / XF
        final[i] = master[i]*math.sin(0.5*PI*w) + master[total_n+i]*math.cos(0.5*PI*w)
    else:
        final[i] = master[i]

peak = max(1e-6, max(abs(x) for x in final))
gain = 0.74 / peak
with wave.open("public/music/lofi.wav", "w") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    frames = bytearray()
    for x in final:
        v = max(-1.0, min(1.0, x * gain))
        frames += struct.pack("<h", int(v * 32767))
    w.writeframes(bytes(frames))

print("OK -> public/music/lofi.wav", f"({TOTAL:.0f}s, largo + loop infinito)")
