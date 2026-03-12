/**
 * `customAuth` middleware
 */
import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Check if the route is an API route (using /api)
    if (ctx.request.url.startsWith("/api")) {
      const customToken = process.env.CMS_CUSTOM_TOKEN;
      const allowedOrigin = process.env.ALLOWED_ORIGIN;
      const allowedReferral = process.env.ALLOWED_REFERRAL;

      // 1. Check Custom Token
      if (customToken) {
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

      // 2. Check Origin
      if (allowedOrigin) {
        const origin = ctx.request.headers["origin"];
        if (origin !== allowedOrigin) {
          ctx.status = 403;
          ctx.body = { error: "Forbidden: Origin not allowed" };
          return;
        }
      }

      // 3. Check Referral
      if (allowedReferral) {
        const referer = ctx.request.headers["referer"];
        if (!referer || !referer.startsWith(allowedReferral)) {
          ctx.status = 403;
          ctx.body = { error: "Forbidden: Referral not allowed" };
          return;
        }
      }
    }

    await next();
  };
};
