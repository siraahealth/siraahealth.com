/**
 * Push a custom event to the GTM dataLayer.
 * All GTM tracking in this app should go through this helper.
 */
export function pushEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
