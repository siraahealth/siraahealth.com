"use client";

import { ArrowRight } from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";
import { pushEvent } from "@/utils/gtm";

/**
 * Client island — just the clickable "Book Consultation" button per service card.
 * The parent ServicesSection stays a server component for SEO.
 */
export function ServiceBookButton({ service }: { service: string }) {
  return (
    <ScrollButton
      sectionId="booking-form"
      onTrack={() =>
        pushEvent("service_book_click", { service, device: "desktop" })
      }
      className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
    >
      Book Consultation <ArrowRight className="w-4 h-4" />
    </ScrollButton>
  );
}
