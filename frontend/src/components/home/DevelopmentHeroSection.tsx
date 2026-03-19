import { Star } from "lucide-react";
import Image from "next/image";
import type { PageContent } from "@/services-backend/PageContentService";
import { DevelopmentHeroCTAs } from "@/components/home/DevelopmentHeroCTAs";

/**
 * Server component — h1, badge, p, and image are all SSR'd for SEO.
 * Interactive CTAs are delegated to the DevelopmentHeroCTAs client island.
 */
export default function DevelopmentHeroSection({
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
                Worried About Your Child&apos;s{" "}
                <span className="text-primary">Speech or Development?</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 font-medium max-w-xl">
              Early screening and evidence-based therapy for speech delay,
              autism, and developmental delays by Gurgaon&apos;s leading pediatric
              specialists.
            </p>

            {/* Client island — only the buttons are interactive/tracked */}
            <DevelopmentHeroCTAs />
          </div>

          <div className="relative animate-fade-in-up delay-200 lg:ml-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-[4/5] sm:aspect-square max-w-md mx-auto border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 w-full">
              {content?.image && (
                <Image
                  src={content.image}
                  alt="Indian pediatrician and child during consultation"
                  fill
                  className="object-cover !relative"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
