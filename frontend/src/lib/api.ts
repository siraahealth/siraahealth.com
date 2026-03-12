// Strapi API client

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const CUSTOM_TOKEN = process.env.NEXT_PUBLIC_CMS_CUSTOM_TOKEN || "YOUR_TOKEN_HERE";
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export async function fetchStrapi(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  
  // Set required security headers
  headers.set("x-custom-token", CUSTOM_TOKEN);
  headers.set("origin", FRONTEND_URL);
  
  // Browsers override Referer, but we can set it for server-side fetches.
  // For client fetches, browsers typically send Origin/Referer automatically.
  headers.set("referer", FRONTEND_URL);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers,
  });

  return res;
}
