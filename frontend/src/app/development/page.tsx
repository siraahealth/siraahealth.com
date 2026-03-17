import type { Metadata } from "next";
import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import DevelopmentHeroSection from "@/components/home/DevelopmentHeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsSection } from "@/components/home/SymptomsSection";
import { CareJourneySection } from "@/components/home/CareJourneySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { QuizSection } from "@/components/home/QuizSection";

export const metadata: Metadata = {
  title: "Child Development Assessment & Therapy",
  description:
    "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
  alternates: {
    canonical: "/development",
  },
  openGraph: {
    title: "Child Development Assessment & Therapy",
    description:
      "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
    url: "/development",
    images: ["/assets/siraa-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Child Development Assessment & Therapy",
    description:
      "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
    images: ["/assets/siraa-logo.png"],
  },
};

export default async function DevelopmentPage() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "development",
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
        <DevelopmentHeroSection content={heroContent} />
        <TrustSection />
        <SymptomsSection />
        <CareJourneySection />
        <ServicesSection />
        <DoctorsSection doctors={doctors} />
        <QuizSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
    </>
  );
}
