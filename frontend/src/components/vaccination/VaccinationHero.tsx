"use client";

import { CheckCircle2 } from "lucide-react";
import { VaccinationBookingForm } from "./VaccinationBookingForm";

export function VaccinationHero() {
  const benefits = [
    "Vaccines recommended by pediatric guidelines",
    "Safe and child-friendly vaccination process",
    "Experienced pediatric care",
    "Timely vaccination reminders for parents",
  ];

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden bg-gradient-to-tr from-white via-blue-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Trusted by 500+ Parents
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1] mb-6">
              Flu and respiratory infections are{" "}
              <span className="text-blue-600">increasing</span> around you.
            </h1>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-blue-600 mb-8 underline decoration-yellow-400 decoration-4 underline-offset-8">
              Is your child fully protected?
            </h2>

            <p className="text-lg text-muted-foreground font-medium mb-10 leading-relaxed max-w-xl border-t border-yellow-200 pt-6">
              Vaccinations protect babies from serious infections and help build
              strong immunity during the most vulnerable years of life.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-foreground font-semibold">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative lg:ml-auto mx-auto w-full items-center max-w-md scroll-mt-32"
            id="booking-form"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] blur-2xl opacity-30 select-none pointer-events-none"></div>
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10">
              <div className="h-2 bg-blue-600 w-full"></div>
              <VaccinationBookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
