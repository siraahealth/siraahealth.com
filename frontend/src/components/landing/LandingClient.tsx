"use client";
// Landing client components — Siraa brand palette (coral #E8614A / green #2DBF6E / purple #6B5B95 / lavender #F5F0FC)
// Mobile: diagonal CTA bar + popup modal. Desktop: sticky form column. Phone: 10-digit validation + one-time auto lead capture.
import { useEffect, useRef, useState } from "react";
import { LANDING_SITE } from "@/lib/landingSeo";

const push = (event: string, data: Record<string, unknown> = {}) =>
  typeof window !== "undefined" &&
  ((window as any).dataLayer = (window as any).dataLayer || []).push({ event, ...data });

const getAttribution = (pagePath: string) => {
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

/* ---------------- FAQ ---------------- */
export function LandingFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="rounded-2xl bg-[#FDF0F0] border border-[#EDD8F0] p-5 group"
          onToggle={(e) => (e.target as HTMLDetailsElement).open && push("faq_expand", { question: f.q })}
        >
          <summary className="cursor-pointer list-none font-semibold text-[#1a1a1a] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-[#E8614A] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-[#2d2d2d] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------------- Lead form (10-digit validation + auto-capture) ---------------- */
function LandingLeadForm({ serviceType, pagePath, onDone }: { serviceType: string; pagePath: string; onDone?: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const autoCaptured = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const sendLead = async (fd: Record<string, string>, auto = false) => {
    const attr = getAttribution(pagePath);
    push(auto ? "lead_auto_capture" : "form_submit", { form: "landing_booking", service: serviceType, ...attr });
    const payload = {
      name: fd.name || "", phone: fd.phone, childAge: fd.age || "", concern: fd.concern || serviceType,
      source: auto ? "landing_page_auto" : "landing_page", page: pagePath, ...attr,
    };
    const res = await fetch("/api/bookings", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    fetch("/api/hubspot/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: payload.name, phone: payload.phone, message: `${serviceType} — ${payload.concern} (${pagePath})${auto ? " [auto-captured]" : ""}` }),
    }).catch(() => null);
    return res.ok;
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
    setPhoneErr(digits.length > 0 && digits.length < 10 ? "Enter a 10-digit mobile number" : "");
    if (digits.length === 10 && !autoCaptured.current) {
      autoCaptured.current = true;
      const fd = Object.fromEntries(new FormData(formRef.current!)) as Record<string, string>;
      fd.phone = digits;
      sendLead(fd, true).catch(() => null);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone.length !== 10) { setPhoneErr("Enter a 10-digit mobile number"); return; }
    setState("sending");
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    fd.phone = phone;
    try {
      const ok = await sendLead(fd, false);
      if (!ok) throw new Error();
      setState("done");
    } catch {
      const msg = `Booking request — ${serviceType}\nName: ${fd.name}\nPhone: ${phone}\nChild's age: ${fd.age}\nConcern: ${fd.concern || "-"}`;
      window.open(`https://wa.me/${LANDING_SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
      setState("done");
    }
    if (onDone) setTimeout(onDone, 2500);
  };

  if (state === "done")
    return (
      <div className="rounded-2xl bg-white border border-[#EDD8F0] p-8 text-center">
        <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-[#2DBF6E] text-white grid place-items-center text-2xl" aria-hidden="true">✓</div>
        <p className="text-2xl text-[#1a1a1a] font-semibold mb-2">Request received</p>
        <p className="text-[#2d2d2d]">Our team will confirm your appointment shortly. For urgent concerns, call {LANDING_SITE.phone}.</p>
      </div>
    );

  const field = "w-full rounded-xl border border-[#EDD8F0] bg-[#FDF0F0] px-4 py-3 focus:border-[#6B5B95] outline-none text-[#2d2d2d]";
  return (
    <form ref={formRef} onSubmit={submit} onFocus={() => push("form_start", { form: "landing_booking" })} className="grid gap-4">
      <label className="grid gap-1 font-medium text-sm text-[#1a1a1a]">Parent&apos;s name
        <input name="name" required autoComplete="name" className={field} /></label>
      <label className="grid gap-1 font-medium text-sm text-[#1a1a1a]">Mobile number
        <input name="phone" type="tel" required inputMode="numeric" autoComplete="tel"
          value={phone} onChange={handlePhone} maxLength={10} placeholder="10-digit mobile number"
          aria-invalid={!!phoneErr} className={`${field} ${phoneErr ? "border-[#E8614A]" : ""}`} />
        {phoneErr && <span className="text-xs text-[#E8614A]">{phoneErr}</span>}
      </label>
      <label className="grid gap-1 font-medium text-sm text-[#1a1a1a]">Child&apos;s age
        <input name="age" required placeholder="e.g., 2 years" className={field} /></label>
      <label className="grid gap-1 font-medium text-sm text-[#1a1a1a]">What&apos;s the concern? <span className="font-normal text-[#666666]">(optional)</span>
        <input name="concern" className={field} /></label>
      <button type="submit" disabled={state === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-[#2DBF6E] hover:bg-[#22A05A] disabled:opacity-60 text-white font-semibold min-h-[48px] px-6 transition active:scale-[.98]">
        {state === "sending" ? "Sending…" : "Request Appointment"}
      </button>
      <p className="text-xs text-[#666666]">We confirm within clinic hours. {LANDING_SITE.hours}. By submitting, you agree to receive updates from Siraa Health.</p>
    </form>
  );
}

/* ---------------- Mobile in-page form section ---------------- */
export function MobileBookSection({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  return (
    <div className="lg:hidden rounded-2xl bg-white border border-[#EDD8F0] overflow-hidden shadow-lg">
      <div className="px-6 py-4 text-white font-semibold text-lg" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
        Book {serviceType}
      </div>
      <div className="p-6"><LandingLeadForm serviceType={serviceType} pagePath={pagePath} /></div>
    </div>
  );
}

/* ---------------- Desktop sticky column ---------------- */
export function DesktopStickyForm({ serviceType, pagePath, advice }: { serviceType: string; pagePath: string; advice: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-5">
        <div className="rounded-2xl bg-white border border-[#EDD8F0] overflow-hidden shadow-lg">
          <div className="px-6 py-4 text-white font-semibold text-lg" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
            Book {serviceType}
          </div>
          <div className="p-6"><LandingLeadForm serviceType={serviceType} pagePath={pagePath} /></div>
        </div>
        <figure className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #6B5B95, #8B6BAF)" }}>
          <blockquote className="leading-relaxed">&ldquo;{advice}&rdquo;</blockquote>
          <figcaption className="mt-3 text-white/70 text-sm">
            <span className="font-semibold text-white">{LANDING_SITE.doctor.name}</span> · {LANDING_SITE.doctor.creds}
          </figcaption>
        </figure>
        <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "sticky_desktop" })}
          className="block text-center rounded-full border-2 border-[#6B5B95] text-[#1a1a1a] font-semibold py-3 hover:bg-[#F5F0FC]">
          📞 {LANDING_SITE.phone}
        </a>
      </div>
    </aside>
  );
}

/* ---------------- Mobile CTA bar + popup modal ---------------- */
export function MobileCTABar({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex h-14">
        <button
          onClick={() => { setShowModal(true); push("cta_click", { cta: "mobile_bar_book" }); }}
          className="flex-1 text-white font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)", clipPath: "polygon(0 0, 90% 0, 75% 100%, 0 100%)" }}
        >
          <span className="block pr-6">Book Appointment</span>
        </button>
        <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "mobile_bar" })}
          className="flex-1 -ml-8 inline-flex items-center justify-center bg-white text-[#1a1a1a] font-semibold text-sm">
          Call Now <span aria-hidden="true" className="ml-1 text-[#2DBF6E]">›</span>
        </a>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Book appointment">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between px-5 py-4 text-white" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
              <p className="font-semibold">Book {serviceType}</p>
              <button onClick={() => setShowModal(false)} aria-label="Close" className="w-8 h-8 grid place-items-center rounded-full bg-white/20 text-white text-lg">×</button>
            </div>
            <div className="p-5">
              <LandingLeadForm serviceType={serviceType} pagePath={pagePath} onDone={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
