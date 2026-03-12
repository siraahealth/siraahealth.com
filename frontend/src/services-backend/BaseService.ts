export class BaseBackendService {
  protected static readonly STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  protected static readonly CUSTOM_TOKEN =
    process.env.CUSTOM_TOKEN || "YOUR_TOKEN_HERE";
  protected static readonly FRONTEND_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  protected static async fetchStrapi(
    path: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const headers = new Headers(options.headers || {});

    // Set required security headers
    headers.set("Authorization", `Bearer ${this.CUSTOM_TOKEN}`);
    headers.set("origin", this.FRONTEND_URL);
    headers.set("referer", this.FRONTEND_URL);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${this.STRAPI_URL}${path}`, {
      ...options,
      headers,
    });

    return res;
  }
}
