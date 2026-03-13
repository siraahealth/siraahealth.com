import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { SymptomsSection } from "@/components/home/SymptomsSection";
import { CareJourneySection } from "@/components/home/CareJourneySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import type { PageContent } from "@/lib/page-contents";
import type { Doctor } from "@/lib/doctors";

interface HomePageProps {
  heroContent: PageContent | null;
  doctors: Doctor[];
}

export default function HomePage({ heroContent, doctors }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

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

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
