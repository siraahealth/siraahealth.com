/**
 * `customAuth` middleware
 */
import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the route is an API route (using /api)
    if (ctx.request.url.startsWith("/api")) {
      const customToken = process.env.CMS_CUSTOM_TOKEN;

      if (!customToken) {
        ctx.status = 500;
        ctx.body = { error: "Server Configuration Error: CMS_CUSTOM_TOKEN is missing." };
        return;
      }

      let token =
        ctx.request.headers["x-custom-token"] ||
        ctx.request.headers["authorization"];

      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      if (token !== customToken) {
        ctx.status = 401;
        ctx.body = { error: "Unauthorized" };
        return;
      }
    }

    await next();
  };
};
