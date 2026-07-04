"use client";
// Client-side landing components: FAQ (GTM-tracked), booking form, sticky mobile CTA.
// Uses arbitrary-value Tailwind classes so no tailwind.config changes are needed.
import { useEffect, useState } from "react";
import { LANDING_SITE } from "@/lib/landingSeo";

const push = (event: string, data: Record<string, unknown> = {}) =>
  typeof window !== "undefined" && ((window as any).dataLayer = (window as any).dataLayer || []).push({ event, ...data });

export function LandingFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="rounded-2xl bg-white border border-[#E8F1F1] shadow-sm p-5 group"
          onToggle={(e) => (e.target as HTMLDetailsElement).open && push("faq_expand", { question: f.q })}
        >
          <summary className="cursor-pointer list-none font-semibold text-[#0A5958] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-[#F26D5B] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-[#1E2A32]/85 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function LandingBookingForm({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const getAttribution = () => {
    try {
      const p = new URLSearchParams(window.location.search);
      const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
      const stored: Record<string, string> = JSON.parse(localStorage.getItem("siraa_attr") || "{}");
      keys.forEach((k) => { const v = p.get(k); if (v) stored[k] = v; });
      stored.landing_page = stored.landing_page || pagePath;
      localStorage.setItem("siraa_attr", JSON.stringify(stored));
      return stored;
    } catch { return {}; }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const attr = getAttribution();
    push("form_submit", { form: "landing_booking", service: serviceType, ...attr });
    try {
      // Primary: your existing booking API (Strapi-backed)
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.name, phone: fd.phone, childAge: fd.age, concern: fd.concern || serviceType,
          source: "landing_page", page: pagePath, ...attr,
        }),
      });
      // Secondary: HubSpot sync (fire-and-forget; endpoint already exists in your app)
      fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.name, phone: fd.phone, message: `${serviceType} — ${fd.concern || ""} (${pagePath})` }),
      }).catch(() => null);
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      // Fallback: WhatsApp handoff so no lead is ever lost
      const msg = `Booking request — ${serviceType}\nName: ${fd.name}\nPhone: ${fd.phone}\nChild's age: ${fd.age}\nConcern: ${fd.concern || "-"}`;
      window.open(`https://wa.me/${LANDING_SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
      setState("done");
    }
  };

  if (state === "done")
    return (
      <div className="rounded-2xl bg-white border border-[#0E7C7B]/30 p-8 text-center shadow-lg">
        <p className="text-2xl text-[#0A5958] font-semibold mb-2">Request received</p>
        <p>Our team will confirm your appointment shortly. For urgent concerns, call {LANDING_SITE.phone}.</p>
      </div>
    );

  const field = "w-full rounded-xl border border-[#E8F1F1] bg-[#FDF9F3] px-4 py-3 focus:border-[#0E7C7B] outline-none";
  return (
    <form onSubmit={submit} onFocus={() => push("form_start", { form: "landing_booking" })}
      className="rounded-2xl bg-white border border-[#E8F1F1] p-6 md:p-8 shadow-lg grid gap-4">
      <p className="text-2xl font-semibold text-[#0A5958]">Book {serviceType}</p>
      <label className="grid gap-1 font-medium text-sm">Parent&apos;s name
        <input name="name" required autoComplete="name" className={field} /></label>
      <label className="grid gap-1 font-medium text-sm">Phone number
        <input name="phone" type="tel" required autoComplete="tel" pattern="[0-9+ -]{10,}" className={field} /></label>
      <label className="grid gap-1 font-medium text-sm">Child&apos;s age
        <input name="age" required placeholder="e.g., 2 years" className={field} /></label>
      <label className="grid gap-1 font-medium text-sm">What&apos;s the concern? <span className="font-normal opacity-60">(optional)</span>
        <input name="concern" className={field} /></label>
      <button type="submit" disabled={state === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-[#F26D5B] hover:bg-[#D9503E] disabled:opacity-60 text-white font-semibold min-h-[48px] px-6 transition active:scale-[.98]">
        {state === "sending" ? "Sending…" : "Request Appointment"}
      </button>
      <p className="text-xs opacity-60">We confirm within clinic hours. {LANDING_SITE.hours}</p>
    </form>
  );
}

export function LandingStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-[#E8F1F1] p-3 flex gap-3 shadow-2xl">
      <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "sticky" })}
        className="flex-1 inline-flex items-center justify-center rounded-full border-2 border-[#0E7C7B] text-[#0A5958] font-semibold min-h-[44px] text-sm">
        📞 Call Now
      </a>
      <a href={`https://wa.me/${LANDING_SITE.whatsapp}`} target="_blank" rel="noopener"
        onClick={() => push("whatsapp_click", { location: "sticky" })}
        className="flex-1 inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-semibold min-h-[44px] text-sm">
        WhatsApp a Pediatrician
      </a>
    </div>
  );
}
