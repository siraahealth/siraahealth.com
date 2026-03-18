import { CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";

export function SymptomsSection() {
  return (
    <section className="py-12 lg:py-20 bg-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Signs Your Child May Need Support
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Early intervention can make a lifetime of difference.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-black/5 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
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
                  className="flex items-center gap-4 py-3 md:p-4 border-b border-border/40 md:border-0 last:border-0 md:rounded-xl md:hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-400/10 border-2 border-yellow-400/20 text-yellow-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-foreground/90 text-[15px] md:text-base">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ScrollButton
                sectionId="booking-form"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-lg bg-[#E8F0FE] text-[#3B82F6] hover:bg-primary/10 transition-all border border-primary/5"
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
