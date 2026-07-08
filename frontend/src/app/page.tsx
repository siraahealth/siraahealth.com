import type { Metadata } from "next";
import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import ParentStories from "@/components/home/ParentStories";
import { VaccinationBackendService } from "@/services-backend/VaccinationService";
import { ConditionsSection } from "@/components/home/ConditionsSection";
import { PediatricServicesSection } from "@/components/home/PediatricServicesSection";
import { LeadFormSection } from "@/components/home/LeadFormSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";

export const metadata: Metadata = {
  title: "Child Development & Vaccination Clinic in Gurgaon | Siraa Health",
  description:
    "Gurgaon's trusted centre for child vaccinations, developmental screening, and therapy. Expert care for autism, speech delay, ADHD, GDD and more. Book a free assessment today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Child Development & Vaccination Clinic in Gurgaon | Siraa Health",
    description:
      "Gurgaon's trusted centre for child vaccinations, developmental screening, and therapy. Expert care for autism, speech delay, ADHD, GDD and more.",
    url: "/",
    images: ["/assets/siraa-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Child Development & Vaccination Clinic in Gurgaon | Siraa Health",
    description:
      "Gurgaon's trusted centre for child vaccinations, developmental screening, and therapy. Expert care for autism, speech delay, ADHD, GDD and more.",
    images: ["/assets/siraa-logo.png"],
  },
};

export default async function Home() {
  const [stats, doctors, heroContent] = await Promise.all([
    VaccinationBackendService.getStats().catch(() => null),
    DoctorBackendService.getDoctors().catch(() => []),
    PageContentBackendService.getPageContent("home", "hero").catch(() => null),
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I worry about speech delay?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your child isn't babbling by 12 months, pointing by 12 months, or saying any meaningful words by 18 months, an assessment is recommended. Early intervention yields the best results.",
        },
      },
      {
        "@type": "Question",
        name: "At what age should therapy start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Therapy can start as early as 12-18 months. Neural plasticity is highest in early years, making early intervention highly effective.",
        },
      },
      {
        "@type": "Question",
        name: "How long does therapy take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Duration varies based on the child's specific needs, diagnosis, and progress. After the initial assessment, our specialists will provide a timeline and structured plan.",
        },
      },
      {
        "@type": "Question",
        name: "Do parents attend the sessions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Parent involvement is crucial. We encourage parents to observe and learn techniques to continue supporting their child's development at home.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        {/* 1. Hero — vaccinations + development CTAs */}
        <HeroSection content={heroContent} stats={stats} />

        {/* 2a. Pediatric OPD Services */}
        <PediatricServicesSection />

        {/* 2b. Conditions — names the problems parents are searching for */}
        <ConditionsSection />

        {/* 3. Doctors — quote-led, small photo format */}
        <DoctorsSection doctors={doctors} />

        {/* 4. Parent stories — detailed testimonials */}
        <section className="py-12 lg:py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ParentStories />
          </div>
        </section>

        {/* 5. Lead form — free guidance call capture */}
        <LeadFormSection />

        {/* 6. Blog preview — 3 latest articles */}
        <BlogPreviewSection />

        {/* 7. FAQ */}
        <FAQSection />
      </main>
    </>
  );
}
