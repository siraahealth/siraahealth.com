"use client";
// Landing client components v3 — matches behaviourtherapy/thick-DelhiNCR template exactly.
// Bottom drawer (mobile), 15s popup, desktop sticky form, 2 fields (name+phone),
// auto-submit on 10 digits, full thank-you page, HubSpot Forms API direct + /api backup.
import { useEffect, useRef, useState, useCallback } from "react";
import { LANDING_SITE } from "@/lib/landingSeo";

/* ── helpers ── */
const push = (event: string, data: Record<string, unknown> = {}) =>
  typeof window !== "undefined" &&
  ((window as any).dataLayer = (window as any).dataLayer || []).push({ event, ...data });

const getAttribution = (pagePath: string) => {
  try {
    const p = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"];
    const stored: Record<string, string> = JSON.parse(localStorage.getItem("siraa_attr") || "{}");
    keys.forEach((k) => { const v = p.get(k); if (v) stored[k] = v; });
    stored.first_landing_page = stored.first_landing_page || pagePath;
    stored.latest_landing_page = pagePath;
    localStorage.setItem("siraa_attr", JSON.stringify(stored));
    return stored;
  } catch { return {}; }
};

/* ── lead submission (mirrors behaviourtherapy submit flow) ── */
const submitLead = async (name: string, phone: string, formName: string, pagePath: string, serviceType: string) => {
  const digits = phone.replace(/\D/g, "");
  const attr = getAttribution(pagePath);

  // 1. /api/hubspot/contact backup (fire-and-forget)
  fetch("/api/hubspot/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname: name, phone, source: "landing_page", concern: serviceType }),
  }).catch(() => null);

  // 2. HubSpot Forms API direct (same portal + form as behaviourtherapy page)
  const hsPayload: Record<string, unknown> = {
    fields: [
      { name: "firstname", value: name },
      { name: "email", value: `${digits}@lead.siraahealth.com` },
      { name: "phone", value: phone },
    ],
    context: {
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      pageName: typeof document !== "undefined" ? document.title : "",
    },
  };
  try {
    const match = document.cookie.match(/hubspotutk=([^;]+)/);
    if (match) (hsPayload.context as Record<string, string>).hutk = match[1];
  } catch {}
  fetch("https://api.hsforms.com/submissions/v3/integration/submit/246180888/f7aef44d-b5e1-4225-96ba-96cf5a76f97c", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hsPayload),
  }).catch(() => null);

  // 3. /api/bookings (Strapi)
  fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone: digits, concern: serviceType, source: "landing_page", page: pagePath, form_name: formName, ...attr }),
  }).catch(() => null);

  // GTM event
  push("form_submit", { form_name: formName, service: serviceType, ...attr });
};

/* ── FAQ ── */
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
            <span aria-hidden="true" className="text-[#E8614A] text-xl transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-[#2d2d2d] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ── Reviews ── */
export function LandingReviews() {
  const reviews = [
    { text: "Our son was not saying a single word at 2.5. Within four months at Siraa he was putting two and three words together. The parent coaching made the biggest difference.", author: "Priya M. — Mother of a 3-year-old, DLF Phase 4" },
    { text: "We were told to wait and see. We did not, and I am so glad. The therapist identified exactly what was holding him back. Six months later he is chatting non-stop.", author: "Rahul K. — Father of a 2-year-old, Sohna Road" },
    { text: "What sets Siraa apart is that they treat you as a partner, not just a parent dropping off a child. Every session I left feeling more capable and less worried.", author: "Sneha T. — Mother of a 4-year-old, Sector 56" },
  ];
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.author} className="rounded-2xl bg-white border border-[#EDD8F0] p-5">
          <div className="text-[#FFC24B] mb-2">★★★★★</div>
          <blockquote className="text-[#2d2d2d] leading-relaxed italic">&ldquo;{r.text}&rdquo;</blockquote>
          <p className="mt-3 text-sm font-semibold text-[#1a1a1a]">{r.author}</p>
        </div>
      ))}
    </div>
  );
}

/* ── 2-field lead form (name + phone, auto-submit on 10 digits) ── */
function LeadForm({ formName, serviceType, pagePath, onSubmitted }: {
  formName: string; serviceType: string; pagePath: string; onSubmitted: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const submitted = useRef(false);

  const doSubmit = useCallback((n: string, p: string) => {
    if (submitted.current) return;
    const digits = p.replace(/\D/g, "");
    if (digits.length !== 10) return;
    submitted.current = true;
    submitLead(n || "", p, formName, pagePath, serviceType);
    onSubmitted();
  }, [formName, pagePath, serviceType, onSubmitted]);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
    setPhoneErr(digits.length > 0 && digits.length < 10 ? "Enter a 10-digit mobile number" : "");
    if (digits.length === 10) {
      e.target.style.borderColor = "#2DBF6E";
      setTimeout(() => doSubmit(name, digits), 400);
    } else {
      e.target.style.borderColor = "";
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) { alert("Please enter your name."); return; }
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) { setPhoneErr("Please enter a valid 10-digit mobile number."); return; }
    doSubmit(name, phone);
  };

  const field = "w-full rounded-xl border border-[#EDD8F0] bg-[#FDF0F0] px-4 py-3 focus:border-[#6B5B95] outline-none text-[#2d2d2d]";
  return (
    <div className="grid gap-4" onClick={() => push("form_start", { form_name: formName })}>
      <div className="grid gap-1">
        <label className="font-medium text-sm text-[#1a1a1a]">Parent&apos;s Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={field} />
      </div>
      <div className="grid gap-1">
        <label className="font-medium text-sm text-[#1a1a1a]">Mobile Number *</label>
        <input type="tel" inputMode="numeric" value={phone} onChange={handlePhone} maxLength={10}
          placeholder="10-digit mobile number" className={`${field} ${phoneErr ? "!border-[#E8614A]" : ""}`} />
        {phoneErr && <span className="text-xs text-[#E8614A]">{phoneErr}</span>}
      </div>
      <button onClick={handleSubmit}
        className="w-full rounded-full text-white font-semibold min-h-[48px] px-6 transition active:scale-[.98]"
        style={{ background: "linear-gradient(135deg, #2DBF6E, #22A05A)" }}>
        Talk to an Expert for Free
      </button>
      <p className="text-xs text-[#666666] text-center">Your details are confidential and only shared with our clinical team.</p>
      <div className="flex gap-3 text-xs text-[#666666] justify-center">
        <span>⏱ Response within 24 hours</span>
        <span>👨‍👩‍👧 4870+ families helped</span>
      </div>
    </div>
  );
}

/* ── Thank You page (replaces content) ── */
function ThankYou() {
  return (
    <div className="min-h-screen bg-[#F5F0FC] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-[#2DBF6E] text-white grid place-items-center text-4xl" aria-hidden="true">✓</div>
        <h1 className="text-3xl font-semibold text-[#1a1a1a] mb-3">Thank You!</h1>
        <p className="text-lg text-[#2d2d2d] mb-2">We have received your query.</p>
        <p className="text-[#666666]">Our expert will call you shortly. If you need to reach us sooner, call <strong className="text-[#1a1a1a]">{LANDING_SITE.phone}</strong> directly.</p>
        <p className="mt-8 text-sm font-semibold text-[#6B5B95]">Siraa Health</p>
      </div>
    </div>
  );
}

/* ── Desktop sticky form (right column) ── */
export function DesktopStickyForm({ serviceType, pagePath, advice }: { serviceType: string; pagePath: string; advice: string }) {
  const [done, setDone] = useState(false);
  if (done) return <aside className="hidden lg:block"><ThankYou /></aside>;
  return (
    <aside className="hidden lg:block" id="fa">
      <div className="sticky top-28 space-y-5">
        <div className="rounded-2xl bg-white border border-[#EDD8F0] overflow-hidden shadow-lg">
          <div className="px-6 py-4 text-white relative" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
            <span className="inline-block bg-white text-[#E8614A] font-bold text-xs rounded-full px-3 py-1 mr-2">FREE</span>
            <span className="font-semibold text-lg">Talk to an Expert<br />for Free</span>
          </div>
          <div className="p-6">
            <LeadForm formName="desktop_sidebar" serviceType={serviceType} pagePath={pagePath} onSubmitted={() => setDone(true)} />
          </div>
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

/* ── Mobile in-page form section ── */
export function MobileBookSection({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [done, setDone] = useState(false);
  if (done) return <div className="lg:hidden"><ThankYou /></div>;
  return (
    <div className="lg:hidden rounded-2xl bg-white border border-[#EDD8F0] overflow-hidden shadow-lg">
      <div className="px-6 py-4 text-white" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
        <span className="inline-block bg-white text-[#E8614A] font-bold text-xs rounded-full px-3 py-1 mr-2">FREE</span>
        <span className="font-semibold text-lg">Talk to an Expert for Free</span>
      </div>
      <div className="p-6">
        <LeadForm formName="mobile_inline" serviceType={serviceType} pagePath={pagePath} onSubmitted={() => setDone(true)} />
      </div>
    </div>
  );
}

/* ── Mobile bottom bar + bottom drawer ── */
export function MobileCTABar({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex items-center h-14">
        <button
          onClick={() => { setDrawerOpen(true); push("cta_click", { cta: "mobile_bar_book" }); }}
          className="flex-1 h-full text-white font-semibold text-sm flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)", clipPath: "polygon(0 0, 90% 0, 75% 100%, 0 100%)" }}
        >
          <span className="pr-6">Book a Free Consultation</span>
        </button>
        <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "mobile_bar" })}
          className="flex-1 -ml-8 h-full inline-flex items-center justify-center bg-white text-[#1a1a1a] font-semibold text-sm">
          Call Now <span aria-hidden="true" className="ml-1 text-[#2DBF6E]">›</span>
        </a>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Bottom drawer */}
      <div className={`fixed bottom-0 inset-x-0 z-[61] lg:hidden bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 max-h-[85vh] overflow-y-auto ${drawerOpen ? "translate-y-0" : "translate-y-full"}`}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#ccc]" />
        </div>
        {done ? (
          <div className="p-6"><ThankYou /></div>
        ) : (
          <>
            <div className="mx-4 mb-4 px-5 py-4 rounded-2xl text-white text-center" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
              <span className="inline-block bg-white text-[#E8614A] font-bold text-xs rounded-full px-3 py-1 mb-2">FREE</span>
              <h3 className="font-semibold text-lg">Talk to an Expert for Free</h3>
            </div>
            <div className="px-5 pb-8">
              <LeadForm formName="mobile_drawer" serviceType={serviceType} pagePath={pagePath}
                onSubmitted={() => { setDone(true); setTimeout(() => setDrawerOpen(false), 2500); }} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── 15-second popup (corner overlay, "Still thinking?") ── */
export function TimedPopup({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shown.current) { shown.current = true; setShow(true); push("popup_shown", { popup: "15sec" }); }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70]" onClick={(e) => { if (e.target === e.currentTarget) { setShow(false); push("popup_dismissed"); } }}>
      <div className="absolute bottom-20 lg:bottom-6 right-4 left-4 lg:left-auto lg:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {done ? (
          <div className="p-6"><ThankYou /></div>
        ) : (
          <>
            <div className="relative px-6 py-5 text-white text-center" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
              <button onClick={() => { setShow(false); push("popup_dismissed"); }}
                className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full bg-white/20 text-white text-lg" aria-label="Close">×</button>
              <p className="text-3xl mb-2">👋</p>
              <h3 className="font-semibold text-lg">Still thinking?</h3>
              <p className="text-sm text-white/90 mt-1">Fill in your details and we are here to help.<br />Our expert will call you, no pressure, no commitment.</p>
            </div>
            <div className="p-5">
              <LeadForm formName="popup_15sec" serviceType={serviceType} pagePath={pagePath} onSubmitted={() => setDone(true)} />
              <button onClick={() => { setShow(false); push("popup_dismissed"); }}
                className="w-full mt-3 text-sm text-[#666666] hover:text-[#1a1a1a] py-2">I will come back later</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Landing page wrapper (manages thank-you state for entire page) ── */
export function LandingPageWrapper({ children, serviceType, pagePath }: {
  children: React.ReactNode; serviceType: string; pagePath: string;
}) {
  return (
    <>
      {children}
      <MobileCTABar serviceType={serviceType} pagePath={pagePath} />
      <TimedPopup serviceType={serviceType} pagePath={pagePath} />
    </>
  );
}
