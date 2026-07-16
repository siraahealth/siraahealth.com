"use client";
// Landing client v7 — behaviourtherapy-style hero (full-width image + text below), no blob, no doctor quote.
import { useEffect, useRef, useState, useCallback } from "react";
import { LANDING_SITE } from "@/lib/landingSeo";

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

/* ── Decorative SVGs ── */
export const Star = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.08] ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="#6B5B95">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);
export const Teddy = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.06] ${className}`} width="32" height="32" viewBox="0 0 32 32" fill="#6B5B95">
    <circle cx="10" cy="8" r="4"/><circle cx="22" cy="8" r="4"/><ellipse cx="16" cy="18" rx="10" ry="11"/><circle cx="12" cy="15" r="1.5" fill="#F5F0FC"/><circle cx="20" cy="15" r="1.5" fill="#F5F0FC"/><ellipse cx="16" cy="19" rx="2" ry="1.5" fill="#F5F0FC"/>
  </svg>
);
export const Rocket = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.07] ${className}`} width="28" height="28" viewBox="0 0 24 24" fill="#E8614A">
    <path d="M12 2c-1 4-4 8-7 10l3 3c2-3 6-6 10-7-1-3-3-5-6-6zm-5 14l-3 3 1 1 3-3-1-1zm2 2l-3 3 1 1 3-3-1-1z"/>
  </svg>
);
export const Ball = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.06] ${className}`} width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#2DBF6E" strokeWidth="1.5"/><path d="M3 10c3-3 7-3 14 0M10 1c-3 3-3 7 0 14" stroke="#2DBF6E" strokeWidth="1"/>
  </svg>
);
export const Chocolate = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.07] ${className}`} width="22" height="22" viewBox="0 0 22 22" fill="#8B6BAF">
    <rect x="2" y="6" width="18" height="14" rx="3"/><path d="M6 6V4a5 5 0 0 1 10 0v2" fill="none" stroke="#8B6BAF" strokeWidth="1.5"/>
  </svg>
);

/* ── Lead submission ── */
const submitLead = async (name: string, phone: string, formName: string, pagePath: string, serviceType: string) => {
  const digits = phone.replace(/\D/g, "");
  const attr = getAttribution(pagePath);
  fetch("/api/hubspot/contact", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname: name, phone, source: "landing_page", concern: serviceType }),
  }).catch(() => null);
  const hsPayload: Record<string, unknown> = {
    fields: [{ name: "firstname", value: name }, { name: "email", value: `${digits}@lead.siraahealth.com` }, { name: "phone", value: phone }],
    context: { pageUri: window.location.href, pageName: document.title },
  };
  try { const m = document.cookie.match(/hubspotutk=([^;]+)/); if (m) (hsPayload.context as Record<string, string>).hutk = m[1]; } catch {}
  fetch("https://api.hsforms.com/submissions/v3/integration/submit/246180888/f7aef44d-b5e1-4225-96ba-96cf5a76f97c", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hsPayload),
  }).catch(() => null);
  fetch("/api/bookings", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone: digits, concern: serviceType, source: "landing_page", page: pagePath, form_name: formName, ...attr }),
  }).catch(() => null);
  push("form_submit", { form_name: formName, service: serviceType, ...attr });
};

/* ── FAQ ── */
export function LandingFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[#EDD8F0]">
      {faqs.map((f) => (
        <details key={f.q} className="py-5 group"
          onToggle={(e) => (e.target as HTMLDetailsElement).open && push("faq_expand", { question: f.q })}>
          <summary className="cursor-pointer list-none font-medium text-[#1a1a1a] text-lg flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="shrink-0 w-7 h-7 rounded-full bg-[#F5F0FC] text-[#6B5B95] grid place-items-center text-sm transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-[#2d2d2d] leading-relaxed pr-10">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ── Reviews ── */
export function LandingReviews() {
  const reviews = [
    { text: "Our son was not saying a single word at 2.5. Within four months at Siraa he was putting two and three words together. The parent coaching made the biggest difference.", author: "Priya M.", loc: "DLF Phase 4" },
    { text: "We were told to wait and see. We did not, and I am so glad. The therapist identified exactly what was holding him back. Six months later he is chatting non-stop.", author: "Rahul K.", loc: "Sohna Road" },
    { text: "What sets Siraa apart is that they treat you as a partner, not just a parent dropping off a child. Every session I left feeling more capable and less worried.", author: "Sneha T.", loc: "Sector 56" },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {reviews.map((r) => (
        <div key={r.author} className="relative bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(107,91,149,0.06)]">
          <div className="text-[#FFC24B] text-sm mb-3 tracking-wider">★★★★★</div>
          <p className="text-[#2d2d2d] leading-relaxed text-[15px]">&ldquo;{r.text}&rdquo;</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B5B95] to-[#8B6BAF] text-white text-sm font-semibold grid place-items-center">{r.author[0]}</div>
            <div><p className="font-semibold text-sm text-[#1a1a1a]">{r.author}</p><p className="text-xs text-[#666]">{r.loc}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 2-field form ── */
function LeadForm({ formName, serviceType, pagePath, onSubmitted, compact = false }: {
  formName: string; serviceType: string; pagePath: string; onSubmitted: () => void; compact?: boolean;
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
    setPhoneErr(digits.length > 0 && digits.length < 10 ? "Enter 10 digits" : "");
    if (digits.length === 10) {
      e.target.style.borderColor = "#2DBF6E";
      setTimeout(() => doSubmit(name, digits), 400);
    } else { e.target.style.borderColor = ""; }
  };

  const handleSubmit = () => {
    if (!name.trim()) { alert("Please enter your name."); return; }
    if (phone.replace(/\D/g, "").length !== 10) { setPhoneErr("Enter a valid 10-digit number."); return; }
    doSubmit(name, phone);
  };

  const inp = "w-full rounded-2xl border border-[#EDD8F0] bg-white px-4 py-3.5 focus:border-[#6B5B95] focus:ring-2 focus:ring-[#6B5B95]/10 outline-none text-[#2d2d2d] placeholder:text-[#aaa] transition";
  return (
    <div className="grid gap-3.5" onClick={() => push("form_start", { form_name: formName })}>
      <div><label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Parent&apos;s Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inp} /></div>
      <div><label className="block text-sm font-medium text-[#1a1a1a] mb-1.5">Mobile Number</label>
        <input type="tel" inputMode="numeric" value={phone} onChange={handlePhone} maxLength={10}
          placeholder="10-digit number" className={`${inp} ${phoneErr ? "!border-[#E8614A] !ring-[#E8614A]/10" : ""}`} />
        {phoneErr && <span className="text-xs text-[#E8614A] mt-1 block">{phoneErr}</span>}</div>
      <button onClick={handleSubmit}
        className="w-full rounded-2xl text-white font-semibold py-4 transition active:scale-[.98] shadow-lg shadow-[#2DBF6E]/20"
        style={{ background: "linear-gradient(135deg, #2DBF6E, #22A05A)" }}>
        Talk to an Expert for Free
      </button>
      {!compact && <div className="flex items-center justify-center gap-4 text-[11px] text-[#999]">
        <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 12 12" fill="#2DBF6E"><circle cx="6" cy="6" r="5" opacity=".2"/><path d="M4 6l2 2 3-3" stroke="#2DBF6E" fill="none" strokeWidth="1.2"/></svg>4870+ families</span>
        <span className="flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 12 12" fill="#2DBF6E"><circle cx="6" cy="6" r="5" opacity=".2"/><path d="M4 6l2 2 3-3" stroke="#2DBF6E" fill="none" strokeWidth="1.2"/></svg>Free consultation</span>
      </div>}
    </div>
  );
}

/* ── Thank you ── */
function ThankYou() {
  return (
    <div className="text-center py-10 px-6">
      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#2DBF6E] text-white grid place-items-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-2">Thank You!</h3>
      <p className="text-[#2d2d2d]">Our expert will call you shortly.</p>
      <p className="text-sm text-[#666] mt-2">Need to reach us sooner? Call <a href={`tel:${LANDING_SITE.phone}`} className="font-semibold text-[#6B5B95]">{LANDING_SITE.phone}</a></p>
    </div>
  );
}

/* ── Desktop fixed form (JS positioning, no doctor quote) ── */
export function DesktopStickyForm({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [done, setDone] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const update = () => {
      if (!placeholderRef.current || !formRef.current) return;
      const ph = placeholderRef.current.getBoundingClientRect();
      const topGap = 112;
      const pageBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const footerBuffer = 80;
      if (ph.top > topGap) {
        setStyle({ position: "absolute", top: 0, width: ph.width });
      } else if (pageBottom > footerBuffer) {
        setStyle({ position: "fixed", top: topGap, width: ph.width });
      } else {
        setStyle({ position: "absolute", bottom: footerBuffer, width: ph.width });
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <aside className="hidden lg:block relative" id="fa" ref={placeholderRef} style={{ minHeight: "100%" }}>
      <div ref={formRef} style={style} className="space-y-4 pr-5 pt-0">
        <div className="rounded-3xl bg-white overflow-hidden shadow-[0_4px_30px_rgba(107,91,149,0.1)] border border-[#EDD8F0]">
          <div className="px-6 py-5 text-white relative" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
            <span className="inline-block bg-white text-[#E8614A] font-bold text-[10px] rounded-full px-2.5 py-0.5 uppercase tracking-wider mb-2">Free</span>
            <h3 className="font-semibold text-xl leading-snug">Talk to an Expert<br/>for Free</h3>
          </div>
          <div className="p-5">
            {done ? <ThankYou /> : <LeadForm formName="desktop_sidebar" serviceType={serviceType} pagePath={pagePath} onSubmitted={() => setDone(true)} />}
          </div>
        </div>
        <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "sticky_desktop" })}
          className="flex items-center justify-center gap-2 rounded-2xl border border-[#EDD8F0] text-[#1a1a1a] font-medium py-3 hover:bg-[#F5F0FC] transition text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B5B95"><path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1z"/></svg>
          {LANDING_SITE.phone}
        </a>
      </div>
    </aside>
  );
}

/* ── Mobile inline form ── */
export function MobileBookSection({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="lg:hidden rounded-3xl bg-white overflow-hidden shadow-[0_4px_30px_rgba(107,91,149,0.1)]">
      <div className="px-6 py-5 text-white" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
        <span className="inline-block bg-white text-[#E8614A] font-bold text-[10px] rounded-full px-2.5 py-0.5 uppercase tracking-wider mb-2">Free</span>
        <h3 className="font-semibold text-xl">Talk to an Expert for Free</h3>
      </div>
      <div className="p-5">{done ? <ThankYou /> : <LeadForm formName="mobile_inline" serviceType={serviceType} pagePath={pagePath} onSubmitted={() => setDone(true)} />}</div>
    </div>
  );
}

/* ── Mobile bottom bar + drawer ── */
export function MobileCTABar({ serviceType, pagePath }: { serviceType: string; pagePath: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center h-14">
        <button onClick={() => { setDrawerOpen(true); push("cta_click", { cta: "mobile_bar" }); }}
          className="flex-1 h-full text-white font-semibold text-sm flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)", clipPath: "polygon(0 0, 90% 0, 75% 100%, 0 100%)" }}>
          <span className="pr-6">Free Expert Consultation</span>
        </button>
        <a href={`tel:${LANDING_SITE.phone}`} onClick={() => push("call_click", { location: "mobile_bar" })}
          className="flex-1 -ml-8 h-full inline-flex items-center justify-center bg-white text-[#1a1a1a] font-semibold text-sm">
          Call Now <span className="ml-1 text-[#2DBF6E]">›</span>
        </a>
      </div>
      {drawerOpen && <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setDrawerOpen(false)} />}
      <div className={`fixed bottom-0 inset-x-0 z-[61] lg:hidden bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 max-h-[85vh] overflow-y-auto ${drawerOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[#ddd]" /></div>
        {done ? <div className="p-6"><ThankYou /></div> : (
          <>
            <div className="mx-4 mb-4 px-5 py-4 rounded-2xl text-white text-center" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>
              <span className="inline-block bg-white text-[#E8614A] font-bold text-[10px] rounded-full px-2.5 py-0.5 uppercase tracking-wider mb-2">Free</span>
              <h3 className="font-semibold text-lg">Talk to an Expert for Free</h3>
            </div>
            <div className="px-5 pb-8">
              <LeadForm formName="mobile_drawer" serviceType={serviceType} pagePath={pagePath} compact
                onSubmitted={() => { setDone(true); setTimeout(() => setDrawerOpen(false), 2500); }} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
