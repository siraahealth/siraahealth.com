"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { pushEvent } from "@/utils/gtm";

type FormState = "idle" | "loading" | "success" | "error";

export function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState({ parentName: "", phone: "", concern: "" });
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 50000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = () => { setShow(false); setDismissed(true); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    pushEvent("popup_lead_submit", {});
    try {
      const res = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname: form.parentName, phone: form.phone, concern: form.concern, source: "exit_popup" }),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch { setState("error"); }
  };

  const isValid = form.parentName.trim() && form.phone.trim().length >= 10;
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="bg-primary px-6 pt-8 pb-6 relative text-center">
          <button onClick={dismiss} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-display font-bold text-white mb-2">Still thinking?</h2>
          <p className="text-white/80 text-sm leading-relaxed">Fill in your details and we are here to help.<br />Our expert will call you, no pressure, no commitment.</p>
        </div>
        <div className="px-6 py-6">
          {state === "success" ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-display font-bold text-foreground text-lg mb-1">We'll call you shortly!</p>
              <p className="text-muted-foreground text-sm">Our team will reach out within a few hours.</p>
              <button onClick={dismiss} className="mt-4 text-sm text-primary font-semibold">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-foreground/70">Parent's Name *</label>
                <input type="text" name="parentName" value={form.parentName} onChange={handleChange} placeholder="Your full name" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-foreground/70">Mobile Number *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-foreground/70">Main concern</label>
                <select name="concern" value={form.concern} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white">
                  <option value="">Select your concern</option>
                  <option>Speech & Language Delay</option>
                  <option>Autism Spectrum Disorder</option>
                  <option>ADHD</option>
                  <option>Global Developmental Delay</option>
                  <option>Cerebral Palsy</option>
                  <option>Learning Disorders</option>
                  <option>Down Syndrome</option>
                  <option>Milestone Delays</option>
                  <option>Vaccination</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              {state === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={!isValid || state === "loading"} className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 mt-2">
                {state === "loading" ? "Sending..." : <>Talk to an Expert for Free <ChevronRight className="w-4 h-4" /></>}
              </button>
              <button type="button" onClick={dismiss} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1">I will come back later</button>
              <p className="text-[11px] text-muted-foreground text-center">Your details are confidential and only shared with our clinical team.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
