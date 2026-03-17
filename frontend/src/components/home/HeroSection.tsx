"use client";

import {
  ShieldCheck,
  ClipboardList,
  UserRound,
  Brain,
  ChevronRight,
  Search,
  Globe,
  Clock,
} from "lucide-react";
import Image from "next/image";
import type { PageContent } from "@/lib/page-contents";
import Link from "next/link";

export function HeroSection({ content }: { content: PageContent | null }) {
  return (
    <section className="flex flex-col lg:flex-row  elative overflow-hidden bg-[#F8F9FA] pt-8 pb-12 lg:pt-12 lg:pb-20 min-h-[600px] items-center">
      {/* Background patterns could be added here */}

      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 relative z-10 space-y-8">
            <div className="lg:w-full">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-black leading-[1.2] text-foreground mb-6">
                Protect Your Child from{" "}
                <span className="text-primary block">Preventable Diseases</span>
                and Track Their{" "}
                <span className="text-primary">Development </span>
                with Experts
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-medium mb-6 max-w-xl">
                Vaccinations, pediatric care, and early milestone screening —
                all in one trusted clinic.
              </p>
            </div>

            {/* Features Row */}
            <div className="bg-white rounded-[2.5rem] lg:w-[110%] p-4 lg:p-6 shadow-sm border border-border/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-y-4 md:gap-y-0 mb-12">
              <div className="flex">
                <div className="flex flex-col items-center text-center space-y-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary/80">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      Safe & Painless
                    </h4>
                    <p className="text-[14px] text-muted-foreground font-medium">
                      Vaccinations
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-24 bg-border/60 mx-4"></div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center text-center space-y-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600/80">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      Milestone
                    </h4>
                    <p className="text-[14px] text-primary font-bold decoration-primary decoration-2 underline-offset-[8px] underline">
                      Tracking
                    </p>
                  </div>
                </div>

                <div className="hidden md:block w-px h-24 bg-border/60 mx-4"></div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center text-center space-y-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary/80">
                    <UserRound className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      Expert
                    </h4>
                    <p className="text-[14px] text-muted-foreground font-medium">
                      Pediatric Care
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-24 bg-border/60 mx-4"></div>
              </div>

              <div className="flex">
                <div className="flex flex-col items-center text-center space-y-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600/80">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      Early Screening for
                    </h4>
                    <p className="text-[14px] text-muted-foreground font-medium">
                      Speech & Learning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:w-[140%]">
              <Link
                href="/vaccination"
                className="px-8 py-4 rounded-full font-bold bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-all group lg:flex-1"
              >
                Book Vaccination Appointment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/development"
                className="px-8 py-4 rounded-full font-bold bg-white text-foreground border border-border flex items-center justify-center gap-2 hover:border-primary/30 transition-all group lg:flex-1"
              >
                Check Development Milestones
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Stats Bar */}
            <div className="flex flex-wrap items-center lg:w-[120%] justify-start gap-x-10 gap-y-6">
              <div className="flex items-center gap-3">
                <div className="text-emerald-500/80">
                  <Globe className="lg:w-8 lg:h-8 w-6 h-6" />
                </div>
                <div>
                  <p className="lg:text-[30px] text-[20px] font-bold text-[#1A1A1A]">
                    500+
                  </p>
                  <p className="lg:text-[20px] text-[15px] text-muted-foreground font-medium">
                    Families Trust Us
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-border/40"></div>

              <div className="flex items-center gap-3">
                <div className="text-teal-500/80">
                  <Clock className="lg:w-8 lg:h-8 w-6 h-6" />
                </div>
                <div>
                  <p className="lg:text-[30px] text-[20px] font-bold text-[#1A1A1A]">
                    95%
                  </p>
                  <p className="lg:text-[20px] text-[15px] text-muted-foreground font-medium">
                    On-Time Vaccinations
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-border/40"></div>

              <div className="flex items-center gap-3">
                <div className="text-orange-500/80">
                  <Search className="lg:w-8 lg:h-8 w-6 h-6" />
                </div>
                <div>
                  <p className="lg:text-[30px] text-[20px] font-bold text-[#1A1A1A]">
                    Early Detection
                  </p>
                  <p className="lg:text-[20px] text-[15px] text-muted-foreground font-medium">
                    Saves Precious Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Container - Absolute on desktop */}
      <div className="lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full mt-12 lg:mt-0 z-0 px-4 lg:px-0 aspect-[4/3] md:aspect-video lg:aspect-auto">
        <svg
          className="absolute inset-0 w-0 h-0"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
              <path d="M0.35,0 C0.65,0 0.9,0.1 0.98,0.4 C1.05,0.7 0.92,0.95 0.65,0.99 C0.38,1.03 0.05,0.85 0.02,0.6 C-0.01,0.35 0.1,0 0.35,0 Z" />
            </clipPath>
          </defs>
        </svg>

        <div
          className="relative overflow-hidden shadow-2xl bg-white/70 h-full"
          style={{
            clipPath: "url(#hero-blob)",
            WebkitClipPath: "url(#hero-blob)",
          }}
        >
          {content?.image ? (
            <Image
              src={content.image}
              alt="Doctor with child"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full aspect-[4/3] lg:aspect-auto bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Hero Image</p>
            </div>
          )}

          {/* White Overlay Border */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none border-[12px] border-white/20"
            style={{
              clipPath: "url(#hero-blob)",
              WebkitClipPath: "url(#hero-blob)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
