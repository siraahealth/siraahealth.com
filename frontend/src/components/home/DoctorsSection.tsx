"use client";

import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Doctor } from "@/lib/doctors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export function DoctorsSection({ doctors }: DoctorsSectionProps) {
  return (
    <section id="doctors" className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Meet Our Child Specialists
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Gurgaon's top pediatric therapists dedicated to your child's growth.
          </p>
        </div>

        <div className="relative group px-4 sm:px-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {doctors.map((doc, i) => (
              <SwiperSlide key={i}>
                <div className="bg-accent/20 rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-square w-full overflow-hidden relative">
                    {doc.image && (
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6 text-center flex-grow flex flex-col justify-center">
                    <h3 className="text-xl font-bold font-display mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-3">
                      {doc.designation}
                    </p>
                    <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-bold text-muted-foreground border border-border mx-auto">
                      <Clock className="w-3 h-3" /> {doc.experience}+ Years
                      Experience
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #e2e8f0;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          width: 24px;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      `}</style>
    </section>
  );
}
