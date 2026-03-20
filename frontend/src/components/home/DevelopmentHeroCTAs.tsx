"use client";

import { ArrowDown, ClipboardList } from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";
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
        <span className="flex-1">Book Development Assessment</span>
        <ArrowDown className="w-5 h-5 animate-bounce flex-0" />
      </ScrollButton>
      <ScrollButton
        sectionId="quiz-section"
        onTrack={() =>
          pushEvent("development_hero_cta_click", { cta: "start_quiz" })
        }
        className="px-8 py-4 rounded-full font-bold text-lg bg-white text-foreground border-2 border-border hover:border-primary/30 hover:bg-accent/50 transition-all text-center flex items-center justify-center gap-2"
      >
        <ClipboardList className="w-5 h-5 text-primary flex-0" />
        <span className="flex-1">
          Check your child&apos;s development in 60 seconds
        </span>
      </ScrollButton>
    </div>
  );
}
