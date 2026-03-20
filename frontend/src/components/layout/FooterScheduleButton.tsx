"use client";

import { ScrollButton } from "@/components/core/ScrollButton";
import { pushEvent } from "@/utils/gtm";

/**
 * Client island — only the "Schedule Visit" scroll button in the footer.
 * The parent Footer stays a server component for SEO.
 */
export function FooterScheduleButton() {
  return (
    <ScrollButton
      sectionId="vaccination-form"
      href="/vaccinations/Thick-DelhiNCR"
      onTrack={() => pushEvent("footer_cta_click", { cta: "schedule_visit" })}
      className="mt-6 block w-full py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 transition-colors text-center text-white"
    >
      Schedule Visit
    </ScrollButton>
  );
}
