"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Phone,
  MessageCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export function useUTMs() {
  const [utms, setUtms] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid"];
    const captured: Record<string, string> = {};
    keys.forEach((k) => { const v = params.get(k); if (v) captured[k] = v; });
    captured.landing_page = window.location.href;
    setUtms(captured);
  }, []);
  return utms;
}

export type FormState = "idle" | "loading" | "success" | "error";

export interface Step { num: string; title: string; desc: string; }
export interface Testimonial { name: string; location: string; child: string; text: string; rating?: number; }

export function LandingLeadForm({ source, defaultConcern = "Not sure yet", compact = false, ctaLabel = "Book a free assessment" }: { source: string; defaultConcern?: string; compact?: boolean; ctaLabel?: string; }) {
  const [form, setForm] = useState({ name: "", phone: "", concern: defaultConcern });
  const [state, setState] = useState<FormState>("idle");
  const utms = useUTMs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname: form.name, phone: form.phone, concern: form.concern, source, ...utms }),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch { setState("error"); }
  };

  if (state === "success") {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-foreground mb-2">We will call you shortly</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Our team will reach out within a few hours. If you need us sooner, call{" "}
          <a href="tel:+919910731103" className="text-primary font-semibold">+91 99107 31103</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {!compact && (
        <div className="mb-1">
          <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Free guidance call</div>
          <h3 className="font-display font-bold text-[18px] text-foreground leading-tight">Talk to a specialist today</h3>
          <p className="text-sm text-muted-foreground mt-1">No waiting list. We respond within a few hours.</p>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide">Your name</label>
        <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your full name" required className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide">Mobile number</label>
        <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" required className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-semibold text-foreground/70 uppercase tracking-wide">Main concern</label>
        <select value={form.concern} onChange={(e) => setForm((p) => ({ ...p, concern: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
          <option value="Speech &amp; Language Delay">Speech &amp; Language Delay</option>
          <option value="Autism Spectrum Disorder">Autism Spectrum Disorder</option>
          <option value="ADHD">ADHD</option>
          <option value="Global Developmental Delay">Global Developmental Delay</option>
          <option value="Cerebral Palsy">Cerebral Palsy</option>
          <option value="Learning Disorders">Learning Disorders</option>
          <option value="Down Syndrome">Down Syndrome</option>
          <option value="Milestone Delays">Milestone Delays</option>
          <option value="Behaviour Concerns">Behaviour Concerns</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      {state === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={state === "loading" || !form.name || !form.phone} className="w-full py-4 rounded-xl bg-primary text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20">
        {state === "loading" ? "Sending..." : <>{ctaLabel} <ChevronRight className="w-5 h-5" /></>}
      </button>
      <a href="https://wa.me/919910731103?text=Hi%2C%20I%20have%20a%20question%20about%20my%20child%27s%20development" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-all">
        <MessageCircle className="w-5 h-5" /> WhatsApp an expert instead
      </a>
      <p className="text-[11px] text-muted-foreground text-center leading-relaxed">No spam. Your details are shared only with our clinical team.</p>
    </form>
  );
}

export function TrustBar() {
  return (
    <div className="bg-primary/5 border-b border-primary/10 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[12px] text-foreground/70">
        {["4870 plus families trust us","IAP certified vaccinations","Evidence-based therapy","Golf Course Road, Gurgaon","Mon to Sat 9am to 7pm"].map((item) => (
          <span key={item} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function LandingBreadcrumb({ label }: { label: string }) {
  return (
    <nav className="bg-white border-b border-border/40 py-2.5 px-4 lg:px-8">
      <ol className="flex items-center gap-2 text-[13px] text-muted-foreground max-w-7xl mx-auto">
        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
        <li><ChevronRight className="w-3.5 h-3.5" /></li>
        <li className="text-foreground font-medium truncate max-w-[200px] lg:max-w-none">{label}</li>
      </ol>
    </nav>
  );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50 last:border-none">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between py-5 text-left gap-4" aria-expanded={open}>
        <span className="font-semibold text-[15px] text-foreground leading-snug">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5 text-[14px] text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-primary/20 hidden sm:block"></div>
      <div className="flex flex-col gap-5">
        {steps.map((step) => (
          <div key={step.num} className="flex items-start gap-5 relative">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-[13px] shadow-md shadow-primary/20 relative z-10">{step.num}</div>
            <div className="pt-1 pb-1">
              <div className="font-semibold text-[15px] text-foreground mb-0.5">{step.title}</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />))}
      </div>
      <p className="text-[14px] text-foreground leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[12px]">{t.name[0]}</div>
        <div>
          <div className="font-semibold text-[13px] text-foreground">{t.name}</div>
          <div className="text-[12px] text-muted-foreground">{t.child}, {t.location}</div>
        </div>
      </div>
    </div>
  );
}

export function DoctorQuote({ quote, name, title, initials }: { quote: string; name: string; title: string; initials: string; }) {
  return (
    <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5">
      <p className="text-[13px] text-foreground/80 leading-relaxed italic mb-3">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white text-[12px]">{initials}</div>
        <div>
          <div className="font-semibold text-[13px] text-foreground">{name}</div>
          <div className="text-[11px] text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block bg-orange-50 text-orange-600 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">{children}</div>
  );
}

export function InternalLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="p-6 rounded-2xl bg-[#FDFCF8] border border-border/40">
      <h3 className="font-display font-bold text-[18px] text-foreground mb-4">Related services at Siraa Health</h3>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors font-medium">
            <ArrowRight className="w-4 h-4 flex-shrink-0" />{link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LandingExitPopup({ source, defaultConcern }: { source: string; defaultConcern?: string; }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { if (!dismissed) setShow(true); }, 80000);
    return () => clearTimeout(timer);
  }, [dismissed]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="bg-primary px-6 pt-8 pb-6 relative text-center">
          <button onClick={() => { setShow(false); setDismissed(true); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all" aria-label="Close">
            <ChevronDown className="w-4 h-4 rotate-45" />
          </button>
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-display font-bold text-white mb-2">Still thinking?</h2>
          <p className="text-white/80 text-sm leading-relaxed">Our specialists are available today.<br />No pressure, no commitment.</p>
        </div>
        <div className="px-6 py-6">
          <LandingLeadForm source={source} defaultConcern={defaultConcern} compact ctaLabel="Talk to an expert for free" />
        </div>
      </div>
    </div>
  );
}
