import { Baby, Heart, Syringe, Sparkles } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { VaccinationStatsData } from "@/services-backend/VaccinationService";

interface VaccinationStatsProps {
  stats: VaccinationStatsData;
}

export function VaccinationStats({
  stats: dynamicStats,
}: VaccinationStatsProps) {
  const statsToRender = [
    {
      label: "Babies Safely Vaccinated",
      value:
        Number(dynamicStats.babies_safely_vaccinated) === 0
          ? "0"
          : `${dynamicStats.babies_safely_vaccinated}+`,
      icon: Baby,
    },
    {
      label: "Parents Trust Siraa Health",
      value:
        Number(dynamicStats.parents_trust_siraa_health) === 0
          ? "0"
          : `${dynamicStats.parents_trust_siraa_health}+`,
      icon: Heart,
    },
    {
      label: "IAP Immunisation Schedule",
      value:
        Number(dynamicStats.iap_immunisation_schedule) === 0
          ? "0"
          : `${dynamicStats.iap_immunisation_schedule}%`,
      icon: Syringe,
    },
    {
      label: "Vaccination Process",
      value: "Painless",
      icon: Sparkles,
    },
  ];

  const renderValue = (value: string) => {
    const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    if (isNaN(numericPart)) {
      return value;
    }

    return <CountUp end={numericPart} suffix={suffix} />;
  };

  return (
    <section className="bg-blue-600 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsToRender.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-white text-center group"
            >
              <div className="mb-4 p-3 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors border border-white/10">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="text-3xl md:text-5xl font-display font-bold mb-2">
                {renderValue(stat.value)}
              </div>
              <div className="text-sm md:text-base font-medium text-blue-100 max-w-[150px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
