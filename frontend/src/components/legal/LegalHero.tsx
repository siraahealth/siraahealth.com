"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface LegalHeroProps {
  title: string;
  subtitle?: string;
}

export function LegalHero({ title, subtitle }: LegalHeroProps) {
  return (
    <section className="relative pt-24 pb-8 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-accent/40 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-0"></div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-[5%] w-48 h-48 bg-secondary/5 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-primary/10 text-primary mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mt-6">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
