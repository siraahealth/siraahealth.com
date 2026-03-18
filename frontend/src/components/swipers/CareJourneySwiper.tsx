"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  Activity,
  Stethoscope,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const iconMap = {
  Activity,
  Stethoscope,
  HeartHandshake,
  CheckCircle2,
};

export type CareJourneyItem = {
  step: string;
  title: string;
  desc: string;
  icon: keyof typeof iconMap;
};

type CareJourneySwiperProps = {
  items: CareJourneyItem[];
  className?: string;
};

export function CareJourneySwiper({
  items,
  className,
}: CareJourneySwiperProps) {
  return (
    <div className={className}>
      <div className="swiper-pagination care-journey-pagination mb-6" />
      <div className="relative group px-4 sm:px-12">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.3}
          centeredSlides
          pagination={{ clickable: true, el: ".care-journey-pagination" }}
          className="care-journey-swiper !overflow-visible"
        >
          {items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <SwiperSlide key={i}>
                <div className="relative z-10 flex flex-col items-center text-center bg-white rounded-3xl p-8 border border-border shadow-lg shadow-black/5 h-full">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="bg-accent text-primary font-black w-8 h-8 rounded-full flex items-center justify-center mb-4 text-sm border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm px-4">
                    {item.desc}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <p className="text-center text-lg text-muted-foreground/80 mt-6 flex items-center justify-center gap-2">
        Swipe to see how it works <ArrowRight className="w-4 h-4" />
      </p>
    </div>
  );
}
