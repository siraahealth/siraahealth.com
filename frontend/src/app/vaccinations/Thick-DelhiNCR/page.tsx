import type { Metadata } from "next";
import { VaccinationHero } from "@/components/vaccination/VaccinationHero";
import { VaccinationStats } from "@/components/vaccination/VaccinationStats";
import { VaccinationAdvantages } from "@/components/vaccination/VaccinationAdvantages";
import { VaccinationSchedule } from "@/components/vaccination/VaccinationSchedule";
import { VaccinationFooterCTA } from "@/components/vaccination/VaccinationFooterCTA";
import { VaccinationBackendService } from "@/services-backend/VaccinationService";

export const metadata: Metadata = {
  title: "Vaccination Services",
  description:
    "Protect your child with timely vaccinations at Siraa Health. Professional pediatric care and a stress-free experience.",
  alternates: {
    canonical: "/vaccinations/Thick-DelhiNCR",
  },
  openGraph: {
    title: "Vaccination Services",
    description:
      "Protect your child with timely vaccinations at Siraa Health. Professional pediatric care and a stress-free experience.",
    url: "/vaccinations/Thick-DelhiNCR",
    images: ["/assets/siraa-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Vaccination Services",
    description:
      "Protect your child with timely vaccinations at Siraa Health. Professional pediatric care and a stress-free experience.",
    images: ["/assets/siraa-logo.png"],
  },
};

export default async function VaccinationPage() {
  const stats = await VaccinationBackendService.getStats();

  return (
    <main>
      <VaccinationHero />
      {stats && <VaccinationStats stats={stats} />}
      <VaccinationAdvantages />
      <VaccinationSchedule />
      <VaccinationFooterCTA />
    </main>
  );
}
