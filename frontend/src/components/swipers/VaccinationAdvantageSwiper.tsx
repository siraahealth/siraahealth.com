"use client";

import type { ComponentType } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { VaccinationAdvantageData } from "../vaccination/VaccinationAdvantages";
import { CheckCircle, Heart, Shield, Users } from "lucide-react";

type VaccinationAdvantageSwiperProps = {
  advantages: VaccinationAdvantageData[];
  className?: string;
};

export function VaccinationAdvantageSwiper({
  advantages,
  className,
}: VaccinationAdvantageSwiperProps) {
  const iconMap = {
    Shield,
    Heart,
    Users,
    CheckCircle,
  };

  return (
    <div className={className}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={1.25}
        centeredSlides={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom-style-pagination",
        }}
        className="!overflow-visible"
      >
        {advantages.map((adv, index) => {
          const Icon = iconMap[adv.icon];
          return (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-[2.5rem] p-8 pb-16 border border-border h-full flex flex-col min-h-[320px] shadow-sm relative">
                <div className="mb-4 p-3 rounded-xl bg-blue-50 text-blue-600 w-fit">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-[#0F172A] leading-tight">
                  {adv.title}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed text-sm">
                  {adv.description}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-pagination swiper-pagination-custom-style-pagination" />
    </div>
  );
}
