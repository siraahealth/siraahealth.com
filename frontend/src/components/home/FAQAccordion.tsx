"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pushEvent } from "@/utils/gtm";

export type FAQItem = { q: string; a: string };

/**
 * Client island — interactive, trackable accordion.
 * The parent FAQSection renders as a server component; FAQ text is still SSR'd
 * by passing `faqs` as a plain serializable prop.
 */
export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const handleValueChange = (value: string) => {
    setOpenItem(value);
    if (value) {
      const index = parseInt(value.replace("item-", ""), 10);
      const question = faqs[index]?.q;
      if (question) pushEvent("faq_expanded", { question });
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      value={openItem}
      onValueChange={handleValueChange}
    >
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="bg-accent/30 border border-border px-6 rounded-2xl"
        >
          <AccordionTrigger className="text-left font-display font-bold text-lg hover:no-underline hover:text-primary py-6">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-medium text-base pb-6">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
