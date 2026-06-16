import type { MetadataRoute } from "next";

// Permite que los buscadores indexen todo y apunta al sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://camilaquimbaya.dev/sitemap.xml",
    host: "https://camilaquimbaya.dev",
  };
}
