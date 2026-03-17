import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-03-17T12:18:49.812Z");
  const routes = [
    "",
    "/development",
    "/vaccination",
    "/privacy-policy",
    "/terms-of-service",
    "/medical-disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));
}
