import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    "",
    "/blog",
    "/milestones/Thick-DelhiNCR",
    "/vaccinations/Thick-DelhiNCR",
    "/privacy-policy",
    "/terms-of-service",
    "/medical-disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blogs?fields[0]=slug&fields[1]=updatedAt&status=published&pagination[pageSize]=100`,
      { headers: { Authorization: `Bearer ${CUSTOM_TOKEN}` }, cache: "no-store" }
    );
    if (!res.ok) return staticRoutes;
    const { data } = await res.json();
    const blogRoutes = (data || []).map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
    }));
    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
