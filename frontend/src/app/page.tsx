import { PageContentBackendService } from "@/services-backend/PageContentService";
import { DoctorBackendService } from "@/services-backend/DoctorService";
import HomePage from "./(home)/HomePage";

export default async function Home() {
  // Fetching directly from the backend services server-side
  const doctors = await DoctorBackendService.getDoctors();
  const heroContent = await PageContentBackendService.getPageContent(
    "home",
    "hero",
  );

  return <HomePage doctors={doctors} heroContent={heroContent} />;
}
