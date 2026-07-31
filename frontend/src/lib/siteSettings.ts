const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

// Env var stays as the safety-net fallback: if Strapi is unreachable (or the
// Single Type hasn't been created/populated yet), the site still renders a
// working phone number instead of blank/broken UI.
const FALLBACK_PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+919319741273";

export interface SiteSettings {
  phoneNumber: string;
}

/**
 * Fetches site-wide settings (currently just the phone number) from Strapi's
 * "site-setting" Single Type. Cached/revalidated every 5 minutes so a change
 * in Strapi propagates to the live site quickly without hitting Strapi on
 * every single request.
 *
 * Used by every Server Component that needs the phone number (layout, the
 * 24-page and 15-page systems, blog, the two raw-HTML route handlers).
 * Client Components should use the usePhoneNumber() hook instead, which
 * reads the value passed down from the root layout via PhoneNumberProvider.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/site-setting`, {
      headers: { "X-Custom-Token": CUSTOM_TOKEN },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Strapi site-setting fetch failed: ${res.status}`);
    const json = await res.json();
    const phoneNumber = json?.data?.phone_number;
    if (!phoneNumber || typeof phoneNumber !== "string") {
      throw new Error("site-setting response missing phone_number");
    }
    return { phoneNumber };
  } catch (err) {
    console.error("[Siraa] getSiteSettings falling back to env var:", err);
    return { phoneNumber: FALLBACK_PHONE_NUMBER };
  }
}
