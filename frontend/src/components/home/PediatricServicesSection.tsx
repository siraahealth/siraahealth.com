import Link from "next/link";
import {
  Thermometer,
  Shield,
  Baby,
  Wind,
  TrendingUp,
  Flower2,
  Stethoscope,
  Moon,
  Apple,
  CalendarCheck,
} from "lucide-react";

const SERVICES = [
  {
    icon: Thermometer,
    label: "Fever & Sick Child",
    color: "bg-red-50 text-red-700 border-red-100",
    iconColor: "text-red-500",
    href: "/child-fever-treatment-gurgaon",
  },
  {
    icon: Shield,
    label: "Vaccination",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconColor: "text-blue-500",
    href: "/child-vaccination-gurgaon",
  },
  {
    icon: Baby,
    label: "Newborn Care",
    color: "bg-pink-50 text-pink-700 border-pink-100",
    iconColor: "text-pink-500",
    href: "/newborn-baby-doctor-gurgaon",
  },
  {
    icon: Wind,
    label: "Cough & Cold",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
    iconColor: "text-cyan-500",
    href: "/child-cough-cold-doctor-gurgaon",
  },
  {
    icon: TrendingUp,
    label: "Growth & Nutrition",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconColor: "text-emerald-500",
    href: "/child-growth-nutrition-gurgaon",
  },
  {
    icon: Flower2,
    label: "Allergy & Asthma",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconColor: "text-amber-500",
    href: "/child-asthma-allergy-gurgaon",
  },
  {
    icon: Stethoscope,
    label: "Well Baby Check-ups",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    iconColor: "text-violet-500",
    href: "/well-baby-checkup-gurgaon",
  },
  {
    icon: Moon,
    label: "Sleep Problems",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    iconColor: "text-indigo-500",
    href: "/child-sleep-problems-gurgaon",
  },
  {
    icon: Apple,
    label: "Digestive Health",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    iconColor: "text-orange-500",
    href: "/child-digestive-problems-gurgaon",
  },
  {
    icon: CalendarCheck,
    label: "Health Checkup Packages",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    iconColor: "text-teal-500",
    href: "/child-health-checkup-packages-gurgaon",
  },
];

export function PediatricServicesSection() {
  return (
    <section id="pediatric-services" className="py-12 lg:py-20 bg-[#F8F9FA] border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            General Pediatric Care
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            What brings you to the pediatrician today?
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            From fever and vaccination to growth concerns and sleep problems — expert pediatric care for children from birth to 16 years, all under one roof in Gurgaon.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={i}
                href={service.href}
                className={`flex flex-col items-start gap-3 p-4 sm:p-5 rounded-2xl border ${service.color} hover:shadow-md transition-all duration-200 group`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${service.iconColor} shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[14px] sm:text-[15px] leading-tight">
                    {service.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg text-foreground mb-1">
              Your child is unwell and needs to be seen today?
            </p>
            <p className="text-muted-foreground text-[15px]">
              We hold daily same-day slots for sick children. Call or WhatsApp us now.
            </p>
          </div>
          <Link
            href="/sick-child-opd-gurgaon"
            className="shrink-0 px-6 py-3 rounded-full bg-primary text-white font-bold text-[15px] hover:bg-primary/90 transition-all shadow-md shadow-primary/10 whitespace-nowrap"
          >
            Same-Day Appointment
          </Link>
        </div>

      </div>
    </section>
  );
}
