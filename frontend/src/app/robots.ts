import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
