import { VaccinationHero } from "@/components/vaccination/VaccinationHero";
import { VaccinationStats } from "@/components/vaccination/VaccinationStats";
import { VaccinationAdvantages } from "@/components/vaccination/VaccinationAdvantages";
import { VaccinationSchedule } from "@/components/vaccination/VaccinationSchedule";
import { VaccinationFooterCTA } from "@/components/vaccination/VaccinationFooterCTA";
import { VaccinationBackendService } from "@/services-backend/VaccinationService";

export const metadata = {
  title: "Vaccination Services | Siraa Health",
  description:
    "Protect your child with timely vaccinations at Siraa Health. Professional pediatric care and a stress-free experience.",
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
