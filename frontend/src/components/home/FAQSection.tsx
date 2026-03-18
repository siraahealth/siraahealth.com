import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="py-12 lg:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              q: "When should I worry about speech delay?",
              a: "If your child isn't babbling by 12 months, pointing by 12 months, or saying any meaningful words by 18 months, an assessment is recommended. Early intervention yields the best results.",
            },
            {
              q: "At what age should therapy start?",
              a: "Therapy can start as early as 12-18 months. Neural plasticity is highest in early years, making early intervention highly effective.",
            },
            {
              q: "How long does therapy take?",
              a: "Duration varies based on the child's specific needs, diagnosis, and progress. After the initial assessment, our specialists will provide a timeline and structured plan.",
            },
            {
              q: "Do parents attend the sessions?",
              a: "Yes! Parent involvement is crucial. We encourage parents to observe and learn techniques to continue supporting their child's development at home.",
            },
          ].map((faq, i) => (
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
      </div>
    </section>
  );
}
