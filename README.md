# 🌸 Portafolio · Camila

Portafolio personal de **desarrolladora full stack & diseñadora UX/UI**.
Estética **cyberpunk rosa + kawaii** con **glassmorphism**, neón morado/rosa,
estrellitas y efectos **parallax** al hacer scroll.

## ✨ Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (tema neón personalizado)
- **Framer Motion** (parallax, reveals, animaciones)

## 🚀 Cómo correrlo

```bash
npm install      # instala dependencias (solo la primera vez)
npm run dev      # http://localhost:3000
```

Para producción:

```bash
npm run build
npm start
```

## ✏️ Cómo personalizarlo

**Todo tu contenido vive en un solo archivo:** [`lib/data.ts`](./lib/data.ts)

Ahí editas:
- `profile` → tu nombre, alias, rol, email, redes sociales
- `about` → tu bio y las estadísticas
- `skillGroups` → tus habilidades y niveles (las barras se animan solas)
- `projects` → tus proyectos (título, descripción, tags, links, emoji)

## 🎨 Colores

Definidos en [`tailwind.config.ts`](./tailwind.config.ts) bajo `colors.neon`:
rosa neón, rosa caliente, morado, violeta, cian y lila kawaii.
Cámbialos ahí y se aplican en todo el sitio.

## 📁 Estructura

```
app/
  layout.tsx      → fuentes + metadata
  page.tsx        → ensambla todas las secciones
  globals.css     → tema glass, gradientes, utilidades
components/
  Background.tsx  → blobs parallax + rejilla + estrellitas
  Hero.tsx        → portada con parallax
  About.tsx       → sobre mí + stats
  Skills.tsx      → habilidades con barras animadas
  Projects.tsx    → tarjetas con tilt 3D
  Contact.tsx     → llamado a la acción
  ...
lib/
  data.ts         → ⭐ TU CONTENIDO AQUÍ
```

Hecho con ♡ y mucho café ☕
