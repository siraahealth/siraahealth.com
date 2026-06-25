"use client";
import { Fragment } from "react";

import {
  ShieldCheck,
  ClipboardList,
  UserRound,
  Brain,
  ChevronRight,
  Search,
  Globe,
  Clock,
  Syringe,
} from "lucide-react";
import Image from "next/image";
import type { PageContent } from "@/services-backend/PageContentService";
import Link from "next/link";
import { CountUp } from "../ui/CountUp";
import { VaccinationStatsData } from "@/services-backend/VaccinationService";
import { pushEvent } from "@/utils/gtm";

export function HeroSection({
  content,
  stats: dynamicStats,
}: {
  content: PageContent | null;
  stats: VaccinationStatsData | null;
}) {
  const statsToRender = [
    {
      label: "Families Trust Us",
      value:
        Number(dynamicStats?.parents_trust_siraa_health || 0) === 0
          ? "0"
          : `${dynamicStats?.parents_trust_siraa_health}+`,

      icon: Globe,
      color: "text-emerald-500/80",
      smallScreenLabel: "Families",
    },
    {
      label: "On-Time Vaccinations",
      value:
        Number(dynamicStats?.iap_immunisation_schedule || 0) === 0
          ? "0"
          : `${dynamicStats?.iap_immunisation_schedule}%`,

      icon: Clock,
      color: "text-teal-500/80",
      smallScreenLabel: "On-Time",
    },
    {
      value: "Early Detection",
      label: "Saves Precious Time",
      icon: Search,
      color: "text-orange-500/80",
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
    <section className="relative overflow-hidden bg-[#F8F9FA] pt-6 pb-10 lg:pt-16 lg:pb-24 lg:bg-[#F8F9FA] items-center">
      {/* 1. Global SVG Definition (only once) */}
      <svg
        className="absolute inset-0 w-0 h-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.65,0 C0.75,0 0.95,0.05 0.95,0.05 05,0.75 0.85,0.95 1,0.98 C0.25,1.05 0,0.95 0.15,0.65 C0,0.25 0.15,0.05 0.55,0 Z" />
          </clipPath>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="2" fill="#3B82F6" fillOpacity="0.35" />
          </pattern>
        </defs>
      </svg>

      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content Wrapper */}
          <div className="w-full lg:w-1/2 relative z-10 flex flex-col space-y-4 md:space-y-8">
            {/* 1. Header (Top on both) */}
            <div className="text-left">
              <h1 className="text-[28px] sm:text-[32px] md:text-5xl lg:text-5xl font-display font-black leading-[1.2] text-foreground mb-3">
                <p>They Grow Fast.</p>
                <p>
                  We Help Them <span className="text-primary">Grow Well.</span>
                </p>
              </h1>
              <p className="text-[15px] sm:text-base md:text-xl text-muted-foreground font-medium max-w-xl">
                Vaccinations, developmental screening, and milestone care, all
                in one trusted centre.
              </p>
            </div>

            {/* 2. Image (Middle on mobile, Right on desktop) */}
            <div className="lg:hidden w-full h-full max-md:max-h-[500px] max-lg:max-h-[600px] aspect-[4/3] relative mb-10">
              <HeroImageContent content={content} />
            </div>

            {/* 3. Features Row */}
            <div className="bg-white lg:bg-white rounded-[22px] lg:rounded-[2.5rem] xl:w-[110%] p-4 sm:p-6 lg:p-6 shadow-xl shadow-primary/10 lg:shadow-sm border border-border/40 flex justify-between items-center mb-6 lg:mb-12">
              <FeatureItem
                icon={ShieldCheck}
                title="Safe & Painless"
                desc="Vaccinations"
                color="bg-blue-50"
                iconColor="text-primary/80"
              />
              <div className="hidden md:block w-px h-16 bg-border/60 mx-4"></div>
              <FeatureItem
                icon={ClipboardList}
                title="Milestone"
                desc="Tracking"
                color="bg-orange-50"
                iconColor="text-orange-600/80"
              />
              <div className="hidden md:block w-px h-16 bg-border/60 mx-4"></div>
              <FeatureItem
                icon={UserRound}
                title="Expert"
                desc="Care"
                color="bg-blue-50"
                iconColor="text-primary/80"
              />
              <div className="hidden md:block w-px h-16 bg-border/60 mx-4"></div>
              <FeatureItem
                icon={Brain}
                title="Early Screening"
                desc="more"
                color="bg-purple-50"
                iconColor="text-purple-600/80"
              />
            </div>

            {/* 4. Trust Stats Bar */}
            <div className="flex flex-wrap items-center lg:w-[120%] justify-start gap-x-10 mb-3 lg:mb-0 order-4 px-2">
              {statsToRender.map((stat, index) => (
                <Fragment key={index}>
                  <div className="flex items-center gap-2 py-1.5 lg:p-0">
                    <div className={`${stat.color}`}>
                      <stat.icon className="w-4 h-4 lg:w-6 lg:h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 lg:block">
                      <p className="text-[16px] lg:text-[20px] font-bold text-[#1A1A1A]">
                        {renderValue(stat.value)}
                      </p>
                      <p className="text-[15px] lg:text-[20px] text-muted-foreground font-medium md:block hidden">
                        {stat.label}
                      </p>
                      <p className="text-[15px] lg:text-[20px] text-muted-foreground font-normal md:hidden block">
                        {stat.smallScreenLabel}
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* 5. CTA Buttons */}
            {/* Mobile CTA (slanted split bar) */}
            {/* Floating Mobile CTA (fixed bottom bar) */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-[60] p-4 bg-white/80 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]">
              <div className="flex w-full rounded-2xl overflow-hidden border border-border/60 shadow-xl shadow-primary/5 bg-white relative h-[72px] sm:h-[84px] mx-auto">
                <Link
                  href="/vaccinations/Thick-DelhiNCR"
                  onClick={() =>
                    pushEvent("hero_cta_click", {
                      cta: "vaccination",
                      device: "mobile",
                    })
                  }
                  className="absolute left-0 top-0 h-full w-[55%] bg-primary text-white font-black text-[12px] sm:text-[14px] leading-tight flex items-center z-10 pl-3 sm:pl-4 pr-10"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    zIndex: 10,
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Syringe className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 -rotate-180 text-white/90" />
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[14px] sm:text-[16px]">
                        Book a Vaccination Appointment
                      </span>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/milestones/Thick-DelhiNCR"
                  onClick={() =>
                    pushEvent("hero_cta_click", {
                      cta: "development_assessment",
                      device: "mobile",
                    })
                  }
                  className="absolute right-0 top-0 h-full w-[45%] bg-white text-foreground font-black text-[12px] sm:text-[14px] leading-tight flex items-center justify-end pr-3 sm:pr-4 pl-8"
                >
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="flex flex-col text-right leading-tight">
                      <span className="text-[14px] sm:text-[16px]">
                        Take a Development Assessment
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop CTA (refined) */}
            <div className="hidden md:flex flex-row gap-4 lg:w-[115%] order-5 z-20">
              <Link
                href="/vaccinations/Thick-DelhiNCR"
                onClick={() =>
                  pushEvent("hero_cta_click", {
                    cta: "vaccination",
                    device: "desktop",
                  })
                }
                className="px-8 py-5 rounded-full font-black bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-all group lg:flex-1 text-base shadow-lg shadow-primary/10"
              >
                <span>Book a Vaccination Appointment</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/milestones/Thick-DelhiNCR"
                onClick={() =>
                  pushEvent("hero_cta_click", {
                    cta: "development_assessment",
                    device: "desktop",
                  })
                }
                className="px-8 py-5 rounded-full font-black bg-white text-foreground border border-border flex items-center justify-center gap-2 hover:border-primary/30 transition-all group lg:flex-1 text-base shadow-md"
              >
                <span>Take a Developmental Assessment</span>
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Desktop Image Container (Positioned absolutely behind/side content) */}
          <div className="hidden lg:block lg:absolute lg:top-0 lg:right-[-120px] lg:w-[65%] lg:h-full z-0">
            <HeroImageContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  desc,
  color,
  iconColor,
}: {
  icon: any;
  title: string;
  desc: string;
  color: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-stretch relative mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 lg:space-y-4">
        <div
          className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-full ${color} flex items-center justify-center ${iconColor}`}
        >
          <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
        </div>
        <div>
          <h4 className="text-[13px] lg:text-[17px] font-bold text-[#1A1A1A] leading-tight">
            {title}
          </h4>
          <p className="text-[12px] lg:text-[14px] text-muted-foreground font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroImageContent({ content }: { content: PageContent | null }) {
  return (
    <div className="relative h-full w-full">
      {/* Decorative: Dotted grid pattern */}
      <div
        className="absolute -top-6 left-[5%] lg:left-[10%] w-20 h-20 lg:w-28 lg:h-28 z-20 mt-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Decorative: Circular arc ring */}
      <div
        className="absolute inset-0 z-20 pointer-events-none scale-95 lg:scale-110"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="300"
            cy="250"
            r="230"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeOpacity="0.2"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      <div
        className="relative overflow-hidden shadow-2xl bg-white/70 h-full w-full rounded-[2rem]"
        style={{
          clipPath: "url(#hero-blob)",
          WebkitClipPath: "url(#hero-blob)",
        }}
      >
        {content?.image ? (
          <div className="relative w-full h-full min-h-[300px] lg:min-h-0">
            <Image
              src="/assets/lead-child.png"
              alt="Doctor with child"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Hero Image</p>
          </div>
        )}
      </div>
    </div>
  );
}
