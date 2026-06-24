"use client";

import { useState } from "react";
import { ChevronRight, CheckCircle2, Phone, Home } from "lucide-react";
import { ConditionData } from "@/lib/conditions-data";
import { pushEvent } from "@/utils/gtm";
import Link from "next/link";

const CONCERNS_MAP: Record<string, string> = {
  autism: "Autism Spectrum Disorder",
  "speech-delay": "Speech & Language Delay",
  adhd: "ADHD",
  "global-developmental-delay": "Global Developmental Delay",
  "cerebral-palsy": "Cerebral Palsy",
  "learning-disorders": "Learning Disorders",
  "down-syndrome": "Down Syndrome",
  "milestone-delays": "Milestone Delays",
};

const HERO_COLORS: Record<string, { bg: string; blob1: string; blob2: string }> = {
  autism:                      { bg: "bg-purple-50",  blob1: "bg-purple-100", blob2: "bg-violet-100" },
  "speech-delay":              { bg: "bg-blue-50",    blob1: "bg-blue-100",   blob2: "bg-sky-100"    },
  adhd:                        { bg: "bg-orange-50",  blob1: "bg-orange-100", blob2: "bg-amber-100"  },
  "global-developmental-delay":{ bg: "bg-teal-50",    blob1: "bg-teal-100",   blob2: "bg-emerald-100"},
  "cerebral-palsy":            { bg: "bg-rose-50",    blob1: "bg-rose-100",   blob2: "bg-pink-100"   },
  "learning-disorders":        { bg: "bg-amber-50",   blob1: "bg-amber-100",  blob2: "bg-yellow-100" },
  "down-syndrome":             { bg: "bg-pink-50",    blob1: "bg-pink-100",   blob2: "bg-fuchsia-100"},
  "milestone-delays":          { bg: "bg-emerald-50", blob1: "bg-emerald-100",blob2: "bg-green-100"  },
};

type FormState = "idle" | "loading" | "success" | "error";

function ConditionLeadForm({ conditionName, slug }: { conditionName: string; slug: string }) {
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    childAge: "",
    concern: CONCERNS_MAP[slug] || conditionName,
  });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    pushEvent("condition_lead_form_submit", { condition: slug });
    try {
      const res = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.parentName,
          phone: form.phone,
          child_age: form.childAge,
          concern: form.concern,
          source: `condition_page_${slug}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      setForm({ parentName: "", phone: "", childAge: "", concern: CONCERNS_MAP[slug] || conditionName });
    } catch {
      setState("error");
    }
  };

  const isValid = form.parentName.trim() && form.phone.trim().length >= 10;

  if (state === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">We'll be in touch shortly!</h3>
        <p className="text-muted-foreground text-[15px]">Our team will call you within a few hours to schedule your free guidance call.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-foreground/70">Your name</label>
          <input type="text" name="parentName" value={form.parentName} onChange={handleChange} placeholder="e.g. Priya Sharma" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-foreground/70">Phone number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-foreground/70">Child's age</label>
        <input type="text" name="childAge" value={form.childAge} onChange={handleChange} placeholder="e.g. 3 years 2 months" className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-foreground/70">Main concern</label>
        <input type="text" name="concern" value={form.concern} readOnly className="w-full px-4 py-3 rounded-xl border border-border text-[15px] bg-accent/30 text-foreground/70 cursor-not-allowed" />
      </div>
      {state === "error" && <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again or call us directly.</p>}
      <button type="submit" disabled={!isValid || state === "loading"} className="w-full py-4 rounded-xl bg-primary text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20">
        {state === "loading" ? "Sending..." : <>Get a free guidance call <ChevronRight className="w-5 h-5" /></>}
      </button>
      <p className="text-[12px] text-muted-foreground text-center">No spam. We'll only contact you about your child's care.</p>
    </form>
  );
}

export function ConditionPageClient({ condition }: { condition: ConditionData }) {
  const colors = HERO_COLORS[condition.slug] || HERO_COLORS["autism"];

  return (
    <main>
      <section className={`${colors.bg} py-12 lg:py-20 border-b border-border/40 relative overflow-hidden`}>
        <div className={`absolute -top-16 -right-16 w-64 h-64 ${colors.blob1} rounded-full opacity-60 pointer-events-none`} />
        <div className={`absolute -bottom-10 -left-10 w-44 h-44 ${colors.blob2} rounded-[40%_60%_50%_50%] opacity-50 pointer-events-none`} />
        <div className="absolute top-8 right-1/3 text-2xl opacity-30 pointer-events-none select-none" style={{ color: "#7C3AED" }}>⬡</div>
        <div className="absolute top-16 right-1/4 text-lg opacity-25 pointer-events-none select-none" style={{ color: "#F97316" }}>⬡</div>
        <div className="absolute bottom-8 right-20 text-xl opacity-20 pointer-events-none select-none" style={{ color: "#7C3AED" }}>⬡</div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <nav className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="w-3.5 h-3.5" />Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <Link href="/#conditions" className="hover:text-primary transition-colors">Conditions</Link>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
            <span className="text-foreground">{condition.name}</span>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{condition.heroEmoji}</span>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Conditions we support</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">{condition.name}</h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">{condition.tagline}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 lg:py-20">
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">What is {condition.name}?</h2>
            <p className="text-[16px] text-muted-foreground leading-relaxed mb-4 font-medium">{condition.whatIs}</p>
            {condition.whatIsExtra && <p className="text-[16px] text-muted-foreground leading-relaxed font-medium">{condition.whatIsExtra}</p>}
          </section>

          <section className="bg-[#FDFCF8] rounded-2xl p-6 sm:p-8 border border-[#F3F0EA] relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-50 rounded-full opacity-60 pointer-events-none" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 relative z-10">What parents often notice</h2>
            <ul className="space-y-3 relative z-10">
              {condition.parentsNotice.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[15px] text-foreground/80 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl relative z-10">
              <p className="text-[14px] text-amber-800 font-medium leading-relaxed">
                <strong>Important:</strong> If you recognise several of these signs in your child, it does not mean they definitely have {condition.name}. Only a professional assessment can provide clarity. The earlier you seek an evaluation, the better.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">How Siraa Health helps with {condition.name}</h2>
            <div className="space-y-4">
              {condition.howWeHelp.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-[#F3F0EA] bg-white hover:border-primary/20 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-orange-500 font-bold text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-foreground mb-1 font-display">{item.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-[40%_60%_50%_50%] pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-10 items-start relative z-10">
              <div className="lg:w-2/5 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-3">Free guidance call</p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight">Talk to {condition.expertLabel}</h2>
                <p className="text-white/80 text-[15px] leading-relaxed mb-6 font-medium">Book a free 15-minute call. Our specialist will understand your child's needs and guide you to the right next step — no commitment required.</p>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">Or call us directly</p>
                    <a href="tel:+919910731103" className="text-white/60 text-[13px] hover:text-white transition-colors">+91 99107 31103</a>
                  </div>
                </div>
              </div>
              <div className="lg:w-3/5 w-full bg-white rounded-xl p-6 shadow-xl shadow-black/10">
                <ConditionLeadForm conditionName={condition.name} slug={condition.slug} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
