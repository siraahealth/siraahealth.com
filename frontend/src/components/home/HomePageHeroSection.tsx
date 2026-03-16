import { ArrowDown, PhoneCall, Star } from "lucide-react";
import type { PageContent } from "@/lib/page-contents";
import { PHONE_NUMBER } from "@/utils/contant";

export default function HomePageHeroSection({
  content,
}: {
  content: PageContent | null;
}) {
  return (
    <section id="home" className="relative py-8 lg:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-accent/40 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-primary/10 text-primary font-bold text-sm mb-6">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              #1 Pediatric Therapy Clinic in Gurgaon
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.15] text-foreground mb-6 text-balance">
              <span>
                Worried About Your Child’s{" "}
                <span className="text-primary">Speech or Development?</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 font-medium max-w-xl">
              Early screening and evidence-based therapy for speech delay,
              autism, and developmental delays by Gurgaon's leading pediatric
              specialists.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#booking-form"
                className="px-8 py-4 rounded-full font-bold text-lg bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2"
              >
                Book Development Assessment
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>
              {PHONE_NUMBER && (
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="px-8 py-4 rounded-full font-bold text-lg bg-white text-foreground border-2 border-border hover:border-primary/30 hover:bg-accent/50 transition-all text-center flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-5 h-5 text-primary" />
                  Check your child's development in 60 seconds
                </a>
              )}
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200 lg:ml-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/5] sm:aspect-square max-w-md mx-auto border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {content?.image && (
                <img
                  src={content.image}
                  alt="Indian pediatrician and child during consultation"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Status Badge Overlay */}
              <div className="absolute bottom-6 px-6 w-full animate-fade-in-up delay-500">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    {content?.icon && (
                      <img
                        src={content.icon}
                        alt="Indian pediatrician and child during consultation"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-display font-bold text-sm">
                      {content?.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {content?.tag_line}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
