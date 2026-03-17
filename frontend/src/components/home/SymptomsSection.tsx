import { CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";

export function SymptomsSection() {
  return (
    <section className="py-20 lg:py-28 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Signs Your Child May Need Support
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Early intervention can make a lifetime of difference. Look out for
              these early signs in your child's development.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Not speaking words by 18 months",
                "Limited eye contact or social smiles",
                "Difficulty following simple instructions",
                "Delayed motor milestones (crawling, walking)",
                "Poor social interaction with peers",
                "Repetitive behaviors or intense tantrums",
              ].map((symptom, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="font-semibold text-foreground/90">{symptom}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <ScrollButton
                sectionId="booking-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                Get Your Child Screened Today <ArrowRight className="w-5 h-5" />
              </ScrollButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
