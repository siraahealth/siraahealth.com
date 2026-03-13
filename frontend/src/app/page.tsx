import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsSection } from "@/components/home/SymptomsSection";
import { CareJourneySection } from "@/components/home/CareJourneySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";

export default async function Home() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "home",
    "hero",
  );

  return (
    <main>
      <HeroSection content={heroContent} />
      <TrustSection />
      <SymptomsSection />
      <CareJourneySection />
      <ServicesSection />
      <DoctorsSection doctors={doctors} />

      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
