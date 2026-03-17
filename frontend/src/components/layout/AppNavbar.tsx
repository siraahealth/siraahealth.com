"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { formattedPhoneNumber, PHONE_NUMBER } from "@/utils/contant";
import Link from "next/link";
import { ScrollButton } from "../core/ScrollButton";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm h-[81px] transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="relative z-50">
          <div className="flex items-center gap-2">
            <img
              src="/assets/siraa-logo.png"
              alt="Siraa Health"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <span className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground">
              Siraa <span className="text-primary">Health</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ScrollButton
            sectionId="why-vaccinate"
            href="/vaccination"
            className="text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            Why Vaccinate
          </ScrollButton>

          {PHONE_NUMBER && (
            <div className="flex flex-col items-end border-r border-border/50 pr-8">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Call Us Today
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="font-display font-bold text-primary text-lg leading-tight"
              >
                {formattedPhoneNumber}
              </a>
            </div>
          )}

          <ScrollButton
            sectionId="booking-form"
            href="/development"
            className="px-6 py-3 rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-yellow-400 transition-all hover:shadow-lg active:scale-95"
          >
            Book Assessment
          </ScrollButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 p-2 text-foreground hover:bg-black/5 rounded-xl transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden inset-0 bg-white transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full py-6 gap-6 bg-white">
          <div className="bg-white px-6">
            <div className="space-y-4">
              <ScrollButton
                sectionId="why-vaccinate"
                href="/vaccination"
                className="block text-2xl font-display font-bold text-foreground hover:text-primary transition-colors border-b border-border/30 pb-4"
              >
                Why Vaccinate
              </ScrollButton>
            </div>

            <div className="mt-auto space-y-6">
              {PHONE_NUMBER && (
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-3 mb-1">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-primary/60">
                      Direct Support
                    </span>
                  </div>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="font-display font-bold text-primary text-2xl block"
                  >
                    {formattedPhoneNumber}
                  </a>
                </div>
              )}

              <ScrollButton
                sectionId="booking-form"
                href="/development"
                className="block w-full text-center px-8 py-4 rounded-2xl font-bold bg-secondary text-secondary-foreground text-xl shadow-xl shadow-secondary/20 hover:bg-yellow-400 active:scale-95 transition-all"
              >
                Book Assessment
              </ScrollButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
