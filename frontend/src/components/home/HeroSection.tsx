"use client";

import React from "react";
import {
  ShieldCheck,
  ClipboardList,
  UserRound,
  Brain,
  ChevronRight,
  Users,
  Activity,
  Search,
} from "lucide-react";
import type { PageContent } from "@/lib/page-contents";

export function HeroSection({ content }: { content: PageContent | null }) {
  return (
    <section className="relative overflow-hidden bg-[#F8F9FA] pt-8 pb-12 lg:pt-12 lg:pb-20">
      {/* Background patterns could be added here */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
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
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border/50 grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Safe & Painless
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Vaccinations
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center mx-auto text-yellow-600">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Milestone</p>
                  <p className="text-[10px] text-muted-foreground font-medium underline">
                    Tracking
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mx-auto text-cyan-600">
                  <UserRound className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Expert</p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Pediatric Care
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto text-purple-600">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Early Screening for
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Speech & Learning
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#booking-form"
                className="px-8 py-4 rounded-full font-bold bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 transition-all group"
              >
                Book Vaccination Appointment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#milestones"
                className="px-8 py-4 rounded-full font-bold bg-white text-foreground border border-border flex items-center justify-center gap-2 hover:border-primary/30 transition-all group"
              >
                Check Development Milestones
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Stats Bar */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary/60" />
                <div>
                  <p className="text-sm font-bold text-foreground">500+</p>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    Families Trust Us
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="w-5 h-5 text-primary/60" />
                <div>
                  <p className="text-sm font-bold text-foreground">95%</p>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    On-Time Vaccinations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="w-5 h-5 text-primary/60" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Early Detection
                  </p>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    Saves Precious Time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative">
            <div className="relative rounded-l-[10rem] rounded-r-3xl overflow-hidden shadow-2xl">
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

              {/* Decorative elements from the image (like circles/dots) can be simulated here */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[12px] border-white/20 rounded-l-[10rem] rounded-r-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
