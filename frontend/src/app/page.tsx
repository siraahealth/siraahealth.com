import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import ParentSrories from "@/components/home/ParentStories";

export default async function Home() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "home",
    "hero",
  );

  console.log(heroContent);

  return (
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
  );
}
