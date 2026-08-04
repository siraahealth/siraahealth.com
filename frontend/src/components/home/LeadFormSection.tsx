"use client";

import { useState } from "react";
import { ChevronRight, Phone } from "lucide-react";
import { usePhoneNumber } from "@/components/providers/PhoneNumberProvider";
import { pushEvent } from "@/utils/gtm";

const CONCERNS = [
  "Speech & Language Delay",
  "Autism Spectrum Disorder",
  "ADHD",
  "Global Developmental Delay",
  "Cerebral Palsy",
  "Learning Disorders",
  "Down Syndrome",
  "Milestone Delays",
  "Vaccination",
  "Not sure yet",
];

type FormState = "idle" | "loading" | "success" | "error";

export function LeadFormSection() {
  const { phoneNumber, formattedPhoneNumber } = usePhoneNumber();
  const [form, setForm] = useState({ parentName: "", phone: "", childAge: "", concern: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname: form.parentName, phone: form.phone, child_age: form.childAge, concern: form.concern, source: "homepage_lead_form" }),
      });
      if (!res.ok) throw new Error("Failed");
      pushEvent("lead_form_submit", { concern: form.concern });
      pushEvent("form_submit", { form_name: "homepage_lead_form", page_family: "homepage", concern: form.concern });
      setState("success");
      setForm({ parentName: "", phone: "", childAge: "", concern: "" });
    } catch {
      setState("error");
    }
  };

  const isValid = form.parentName.trim() && form.phone.trim().length >= 10 && form.concern;

  return (
    <section className="py-12 lg:py-20 bg-[#FDFCF8] border-t border-[#F3F0EA] relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-50 rounded-full opacity-50 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-50 rounded-[40%_60%_50%_50%] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="lg:w-1/2 flex flex-col items-start">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">Free guidance call</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              Not sure where to start?<br /><span className="text-primary">Let's talk.</span>
            </h2>
            <p className="text-[16px] text-muted-foreground font-medium leading-relaxed mb-8 max-w-md">
              Get a free 15-minute call with one of our specialists. We'll understand your child's needs and guide you to the right next step — no commitment required.
            </p>
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-amber-100 rounded-[40%_60%_55%_45%] scale-110 opacity-60" />
              <img
                src="/assets/lead-child.png"
                alt="Happy child with toys"
                style={{ width: "100%", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))", position: "relative", zIndex: 10 }}
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-[14px] text-foreground">Prefer to call directly?</p>
                <a href={`tel:${phoneNumber}`} className="text-[13px] text-muted-foreground hover:text-primary transition-colors font-medium">{formattedPhoneNumber}</a>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {state === "success" ? (
              <div className="bg-white rounded-2xl border border-[#F3F0EA] p-10 text-center shadow-sm">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">We'll call you shortly!</h3>
                <p className="text-muted-foreground text-[15px] font-medium">Our team will reach out within a few hours to schedule your free guidance call.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#F3F0EA] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10 pointer-events-none select-none">
                  <svg viewBox="0 0 40 46" width="48" height="56" fill="none">
                    <path d="M20 2L37 11.5V29.5L20 39L3 29.5V11.5L20 2Z" stroke="#7C3AED" strokeWidth="2.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-6">Book your free call</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-foreground/70">Your name</label>
                      <input type="text" name="parentName" value={form.parentName} onChange={handleChange} placeholder="e.g. Priya Sharma" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-[#FAFAF8] font-medium" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-foreground/70">Phone number</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-[#FAFAF8] font-medium" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-foreground/70">Child's age</label>
                    <input type="text" name="childAge" value={form.childAge} onChange={handleChange} placeholder="e.g. 2 years 4 months" className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-[#FAFAF8] font-medium" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-foreground/70">Main concern</label>
                    <select name="concern" value={form.concern} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-[#FAFAF8] text-foreground font-medium">
                      <option value="" disabled>Select your concern</option>
                      {CONCERNS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {state === "error" && <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again or call us directly.</p>}
                  <button type="submit" disabled={!isValid || state === "loading"} className="w-full py-4 rounded-xl bg-primary text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {state === "loading" ? "Sending..." : <>Get a free guidance call <ChevronRight className="w-5 h-5" /></>}
                  </button>
                  <p className="text-[12px] text-muted-foreground text-center font-medium">No spam. We'll only contact you about your child's care.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
