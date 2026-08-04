import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const url = new URL(strapiUrl);
const strapiOrigin = url.origin;
const isProd = process.env.NODE_ENV === "production";

function buildContentSecurityPolicy(): string {
  const devEval =
    process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

  const directives = [
    "default-src 'self'",
    [
      "img-src",
      "'self'",
      "data:",
      "blob:",
      strapiOrigin,
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://stats.g.doubleclick.net",
      "https://www.facebook.com",
      "https://www.facebook.net",
    ].join(" "),
    "font-src 'self' data: https://fonts.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://connect.facebook.net",
      "https://www.facebook.com",
      devEval.trim(),
    ]
      .filter(Boolean)
      .join(" "),
    "frame-src https://www.googletagmanager.com https://www.facebook.com https://staticxx.facebook.com",
    [
      "connect-src",
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://analytics.google.com",
      "https://stats.g.doubleclick.net",
      "https://www.facebook.com",
      "https://connect.facebook.net",
      "https://www.facebook.net",
      "https://graph.facebook.com",
      "https://api2.facebook.com",
      "https://pixel.facebook.com",
      "https://api.hsforms.com",
      "https://forms.hsforms.com",
      "https://js-na2.hsforms.net",
    ].join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  if (isProd) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy(),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
// CSP update Fri Jun 12 18:51:12 IST 2026
