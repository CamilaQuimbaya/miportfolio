import type { MetadataRoute } from "next";

// Las URLs públicas del sitio. El portafolio es una sola página (navegación por
// vistas), así que la home + el CV cubren todo lo indexable.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://camilaquimbaya.dev";
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cv`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
