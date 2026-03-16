import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import HomePageHeroSection from "@/components/home/HomePageHeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsSection } from "@/components/home/SymptomsSection";
import { CareJourneySection } from "@/components/home/CareJourneySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default async function DevelopmentPage() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "development",
    "hero",
  );

  return (
    <main>
      <HomePageHeroSection content={heroContent} />
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
