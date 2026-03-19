"use client";

import { ScrollButton } from "@/components/core/ScrollButton";
import { pushEvent } from "@/utils/gtm";

/**
 * Client island — only the "Book Appointment" CTA in the vaccination footer section.
 * The parent VaccinationFooterCTA stays a server component for SEO.
 */
export function VaccinationBookButton() {
  return (
    <ScrollButton
      sectionId="vaccination-form"
      onTrack={() => pushEvent("vaccination_footer_cta_click")}
      className="px-10 py-5 rounded-full font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl shadow-blue-900/20 text-xl"
    >
      Book Appointment
    </ScrollButton>
  );
}
