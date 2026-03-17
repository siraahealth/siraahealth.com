import type { Metadata } from "next";
import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import ParentSrories from "@/components/home/ParentStories";

export const metadata: Metadata = {
  title: "Pediatric Vaccination & Development Care",
  description:
    "Vaccinations, pediatric care, and early milestone screening in one trusted clinic. Book vaccination appointments or check development milestones.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pediatric Vaccination & Development Care",
    description:
      "Vaccinations, pediatric care, and early milestone screening in one trusted clinic. Book vaccination appointments or check development milestones.",
    url: "/",
    images: ["/assets/siraa-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Pediatric Vaccination & Development Care",
    description:
      "Vaccinations, pediatric care, and early milestone screening in one trusted clinic. Book vaccination appointments or check development milestones.",
    images: ["/assets/siraa-logo.png"],
  },
};

export default async function Home() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "home",
    "hero",
  );
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
        <HeroSection content={heroContent} />
        <DoctorsSection doctors={doctors} />
        <section className="py-20 lg:py-28 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ParentSrories />
          </div>
        </section>
        <FAQSection />
      </main>
    </>
  );
}
