import Link from "next/link";
import {
  Brain,
  MessageCircle,
  Zap,
  BookOpen,
  Activity,
  Heart,
  TrendingUp,
  Eye,
} from "lucide-react";

const CONDITIONS = [
  {
    icon: Brain,
    label: "Autism Spectrum Disorder",
    short: "Autism",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconColor: "text-purple-500",
    href: "/conditions/autism",
  },
  {
    icon: MessageCircle,
    label: "Speech & Language Delay",
    short: "Speech Delay",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconColor: "text-blue-500",
    href: "/conditions/speech-delay",
  },
  {
    icon: Zap,
    label: "ADHD",
    short: "ADHD",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    iconColor: "text-orange-500",
    href: "/conditions/adhd",
  },
  {
    icon: TrendingUp,
    label: "Global Developmental Delay",
    short: "GDD",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    iconColor: "text-teal-500",
    href: "/conditions/global-developmental-delay",
  },
  {
    icon: Activity,
    label: "Cerebral Palsy",
    short: "Cerebral Palsy",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    iconColor: "text-rose-500",
    href: "/conditions/cerebral-palsy",
  },
  {
    icon: BookOpen,
    label: "Learning Disorders",
    short: "Learning Disorders",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconColor: "text-amber-500",
    href: "/conditions/learning-disorders",
  },
  {
    icon: Heart,
    label: "Down Syndrome",
    short: "Down Syndrome",
    color: "bg-pink-50 text-pink-700 border-pink-100",
    iconColor: "text-pink-500",
    href: "/conditions/down-syndrome",
  },
  {
    icon: Eye,
    label: "Milestone Delays",
    short: "Milestone Delays",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconColor: "text-emerald-500",
    href: "/conditions/milestone-delays",
  },
];

export function ConditionsSection() {
  return (
    <section className="py-12 lg:py-20 bg-[#F8F9FA] border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
            Conditions we support
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Is your child showing signs of delay?
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            We provide early screening, assessment, and therapy for a wide range
            of developmental conditions — all under one roof in Gurgaon.
          </p>
        </div>

        {/* Conditions grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {CONDITIONS.map((condition, i) => {
            const Icon = condition.icon;
            return (
              <Link
                key={i}
                href={condition.href}
                className={`flex flex-col items-start gap-3 p-4 sm:p-5 rounded-2xl border ${condition.color} hover:shadow-md transition-all duration-200 group`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${condition.iconColor} shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[14px] sm:text-[15px] leading-tight">
                    {condition.label}
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
              Not sure what your child needs?
            </p>
            <p className="text-muted-foreground text-[15px]">
              Book a free 15-minute guidance call with our specialists.
            </p>
          </div>
          <Link
            href="/milestones/Thick-DelhiNCR"
            className="shrink-0 px-6 py-3 rounded-full bg-primary text-white font-bold text-[15px] hover:bg-primary/90 transition-all shadow-md shadow-primary/10 whitespace-nowrap"
          >
            Book a free assessment
          </Link>
        </div>

      </div>
    </section>
  );
}
