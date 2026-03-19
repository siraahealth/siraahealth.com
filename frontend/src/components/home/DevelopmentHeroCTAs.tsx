"use client";

import { ArrowDown, PhoneCall } from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";
import { PHONE_NUMBER } from "@/utils/contant";
import { pushEvent } from "@/utils/gtm";

/**
 * Client island — the two interactive CTAs in the Development hero section.
 * The parent DevelopmentHeroSection stays a server component so the h1, p,
 * and badge text are SSR'd for SEO.
 */
export function DevelopmentHeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <ScrollButton
        sectionId="booking-form"
        onTrack={() =>
          pushEvent("development_hero_cta_click", { cta: "book_assessment" })
        }
        className="px-8 py-4 rounded-full font-bold text-lg bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2"
      >
        Book Development Assessment
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </ScrollButton>
      {PHONE_NUMBER && (
        <a
          href={`tel:${PHONE_NUMBER}`}
          onClick={() =>
            pushEvent("phone_call_click", { source: "development_hero" })
          }
          className="px-8 py-4 rounded-full font-bold text-lg bg-white text-foreground border-2 border-border hover:border-primary/30 hover:bg-accent/50 transition-all text-center flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-5 h-5 text-primary" />
          Check your child&apos;s development in 60 seconds
        </a>
      )}
    </div>
  );
}
