"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Doctor } from "@/services-backend/DoctorService";
import { useState } from "react";

interface DoctorsSectionProps {
  doctors: Doctor[];
}

const TRUST_BULLETS = [
  "Evidence-based therapies",
  "Top-quality specialists",
  "All expertise under one roof",
];

const DOCTOR_QUOTES: Record<string, string> = {
  "Dr. Ananya Sharma": "Speech is not just about words — it's about connection. Every session, we build both.",
  "Dr. Priya Patel": "Early intervention is the most powerful tool we have. The earlier we start, the more we can achieve together.",
  "Dr. Rahul Verma": "Every child has a unique path to growth. Our job is to find it, nurture it, and walk it with you.",
};

const DEFAULT_QUOTES = [
  "Children don't need perfect therapy — they need someone who believes in them. That's what we do every day.",
  "The smallest steps forward are still steps forward. We celebrate every one of them with your family.",
  "Our goal is simple: help your child do more, connect more, and enjoy life more.",
];

function getDoctorQuote(name: string, index: number): string {
  return DOCTOR_QUOTES[name] || DEFAULT_QUOTES[index % DEFAULT_QUOTES.length];
}

function HexDecor({ className, color }: { className: string; color: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 40 46" width="32" height="36" fill="none">
        <path d="M20 2L37 11.5V29.5L20 39L3 29.5V11.5L20 2Z" stroke={color} strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}

export function DoctorsSection({ doctors }: DoctorsSectionProps) {
  const [current, setCurrent] = useState(0);
  if (!doctors || doctors.length === 0) return null;
  const prev = () => setCurrent((c) => (c - 1 + doctors.length) % doctors.length);
  const next = () => setCurrent((c) => (c + 1) % doctors.length);
  const doc = doctors[current];
  const quote = getDoctorQuote(doc.name, current);

  return (
    <section id="doctors" className="py-12 lg:py-20 bg-white border-t border-border/40 relative overflow-hidden">
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-purple-50 rounded-[60%_40%_50%_50%] opacity-50 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-50 rounded-full opacity-60 pointer-events-none" />
      <HexDecor className="top-8 right-24 opacity-30" color="#7C3AED" />
      <HexDecor className="top-16 right-16 opacity-20" color="#F97316" />
      <HexDecor className="bottom-12 left-24 opacity-20" color="#2563EB" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 lg:mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">Our specialists</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Meet the experts behind your child's growth</h2>
        </div>
        <div className="bg-[#FDFCF8] rounded-3xl border border-[#F3F0EA] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 rounded-bl-[80%] opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-tr-[80%] opacity-50 pointer-events-none" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
            <div className="flex-1">
              <span className="text-[72px] leading-none text-orange-400 font-display font-bold block -mb-2 select-none">"</span>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-100 shrink-0 bg-orange-50">
                  {doc.image ? (
                    <Image src={doc.image} alt={doc.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-orange-400">{doc.name?.charAt(0) || "D"}</div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[15px] text-foreground leading-tight">{doc.name}</p>
                  <p className="text-sm text-muted-foreground font-medium">{doc.designation}</p>
                </div>
              </div>
              <p className="text-[22px] md:text-[26px] font-display font-bold text-foreground leading-snug mb-4">{quote}</p>
              {doc.experience && (
                <p className="text-[14px] text-muted-foreground font-medium">{doc.experience}+ years helping children and families in Gurgaon.</p>
              )}
            </div>
            <div className="lg:w-64 flex flex-col justify-center gap-4">
              {TRUST_BULLETS.map((bullet, j) => (
                <div key={j} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-[#F3F0EA] shadow-sm">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 shrink-0" />
                  <span className="text-[14px] text-foreground font-semibold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F3F0EA] relative z-10">
            <div className="flex gap-2">
              {doctors.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-200 ${i === current ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-border hover:bg-primary/40"}`} aria-label={`Go to doctor ${i + 1}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" aria-label="Previous doctor"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border bg-white flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm" aria-label="Next doctor"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
