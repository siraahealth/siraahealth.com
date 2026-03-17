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
import type { PageContent } from "@/lib/page-contents";
import Link from "next/link";

export function HeroSection({ content }: { content: PageContent | null }) {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] pt-8 pb-12 lg:pt-12 lg:pb-20">
      {/* Background patterns could be added here */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-fit">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-black leading-[1.2] text-foreground mb-6">
              Protect Your Child from{" "}
              <span className="text-primary block">Preventable Diseases</span>
              and Track Their <span className="text-primary">Development </span>
              with Experts
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-medium mb-10 max-w-xl">
              Vaccinations, pediatric care, and early milestone screening — all
              in one trusted clinic.
            </p>

            {/* Features Row */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-y-8 mb-12">
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

              <div className="hidden md:block w-px h-24 bg-border/60 mx-4"></div>

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

              <div className="hidden md:block w-px h-24 bg-border/60 mx-4"></div>

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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/vaccination"
                className="px-8 py-4 rounded-full font-bold bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-all group"
              >
                Book Vaccination Appointment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/development"
                className="px-8 py-4 rounded-full font-bold bg-white text-foreground border border-border flex items-center justify-center gap-2 hover:border-primary/30 transition-all group"
              >
                Check Development Milestones
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-6 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="text-emerald-500/80">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#1A1A1A]">500+</p>
                  <p className="text-[13px] text-muted-foreground font-medium">
                    Families Trust Us
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-border/40"></div>

              <div className="flex items-center gap-3">
                <div className="text-teal-500/80">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#1A1A1A]">95%</p>
                  <p className="text-[13px] text-muted-foreground font-medium">
                    On-Time Vaccinations
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-border/40"></div>

              <div className="flex items-center gap-3">
                <div className="text-orange-500/80">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#1A1A1A]">
                    Early Detection
                  </p>
                  <p className="text-[13px] text-muted-foreground font-medium">
                    Saves Precious Time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative">
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
              className="relative z-10 overflow-hidden shadow-2xl bg-white/70"
              style={{
                clipPath: "url(#hero-blob)",
                WebkitClipPath: "url(#hero-blob)",
              }}
            >
              {content?.image ? (
                <img
                  src={content.image}
                  alt="Doctor with child"
                  className="w-full h-full object-cover aspect-[4/3] lg:aspect-[3/4]"
                />
              ) : (
                <div className="w-full h-full aspect-[4/3] lg:aspect-[3/4] bg-muted flex items-center justify-center">
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
        </div>
      </div>
    </section>
  );
}
