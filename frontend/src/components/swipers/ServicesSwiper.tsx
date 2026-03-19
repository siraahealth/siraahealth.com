"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  Smile,
  Puzzle,
  Brain,
  Users,
  Activity,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";

import "swiper/css";
import "swiper/css/pagination";
import { pushEvent } from "@/utils/gtm";

const iconMap = {
  Smile,
  Puzzle,
  Brain,
  Users,
  Activity,
  HeartHandshake,
};

export type ServiceSwiperItem = {
  title: string;
  desc: string;
  icon: keyof typeof iconMap;
  color: string;
  iconColor: string;
};

type ServicesSwiperProps = {
  services: ServiceSwiperItem[];
  className?: string;
};

export function ServicesSwiper({ services, className }: ServicesSwiperProps) {
  return (
    <div className={className}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={1.15}
        centeredSlides={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom-style-pagination",
        }}
        className="!overflow-visible"
      >
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-border/50 flex flex-col h-full">
                <div
                  className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-medium mb-6 flex-grow">
                  {service.desc}
                </p>
                <ScrollButton
                  sectionId="booking-form"
                  onTrack={() => pushEvent("service_book_click", { service: service.title, device: "mobile" })}
                  className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </ScrollButton>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-pagination swiper-pagination-custom-style-pagination" />
    </div>
  );
}
