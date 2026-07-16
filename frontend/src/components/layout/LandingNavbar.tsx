"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { PHONE_NUMBER } from "@/utils/contant";
import Link from "next/link";
import Image from "next/image";
import { ScrollButton } from "../core/ScrollButton";
import { pushEvent } from "@/utils/gtm";
import { WhatsAppLeadModal } from "@/components/WhatsAppLeadModal";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border/50 h-20 transition-all duration-300">
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/siraa-logo.png"
            alt="Siraa Health"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          <span className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground">
            Siraa <span className="text-primary">Health</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="/vaccinations/Thick-DelhiNCR"
            onClick={() => pushEvent("navbar_cta_click", { cta: "vaccination", navbar: "landing" })}
            className="text-[15px] font-semibold text-gray-600 hover:text-[#3B82F6] transition-colors"
          >
            Vaccination
          </Link>
          <Link
            href="/milestones/Thick-DelhiNCR"
            onClick={() => pushEvent("navbar_cta_click", { cta: "development", navbar: "landing" })}
            className="text-[15px] font-semibold text-gray-600 hover:text-[#3B82F6] transition-colors"
          >
            Development
          </Link>
          <Link
            href="/blog"
            onClick={() => pushEvent("navbar_cta_click", { cta: "blog", navbar: "landing" })}
            className="text-[15px] font-semibold text-gray-600 hover:text-[#3B82F6] transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <ScrollButton
            sectionId="booking-form"
            href="/milestones/Thick-DelhiNCR"
            onTrack={() => pushEvent("navbar_cta_click", { cta: "book_appointment", navbar: "landing" })}
            className="px-8 py-3.5 rounded-full font-bold bg-[#3B82F6] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            Book Appointment
          </ScrollButton>
        </div>

        {/* Mobile WhatsApp & Menu Button */}
        <div className="flex items-center gap-2 md:hidden relative z-50">
          {PHONE_NUMBER && (
            <button
              type="button"
              onClick={() => {
                pushEvent("whatsapp_cta_click", { source: "landing_navbar" });
                setShowWaModal(true);
              }}
              className="p-2 rounded-full transition-colors bg-[#25D366] shadow-lg shadow-[#25D366]/30 border-0 cursor-pointer"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </button>
          )}
          <button
            onClick={() => {
              const opening = !isOpen;
              setIsOpen(opening);
              if (opening) pushEvent("mobile_menu_open", { navbar: "landing" });
            }}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden inset-0 bg-white transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="bg-white py-6">
          <div className="flex flex-col h-full px-6 gap-8">
            <Link
              href="/vaccinations/Thick-DelhiNCR"
              onClick={() => {
                setIsOpen(false);
                pushEvent("navbar_cta_click", { cta: "vaccination", navbar: "landing", source: "mobile_menu" });
              }}
              className="text-lg font-bold text-[#1A1A1A]"
            >
              Vaccination
            </Link>
            <Link
              href="/milestones/Thick-DelhiNCR"
              onClick={() => {
                setIsOpen(false);
                pushEvent("navbar_cta_click", { cta: "development", navbar: "landing", source: "mobile_menu" });
              }}
              className="text-lg font-bold text-[#1A1A1A]"
            >
              Development
            </Link>
            <Link
              href="/blog"
              onClick={() => {
                setIsOpen(false);
                pushEvent("navbar_cta_click", { cta: "blog", navbar: "landing", source: "mobile_menu" });
              }}
              className="text-lg font-bold text-[#1A1A1A]"
            >
              Blog
            </Link>

            <ScrollButton
              sectionId="booking-form"
              href="/milestones/Thick-DelhiNCR"
              onTrack={() => pushEvent("navbar_cta_click", { cta: "book_appointment", navbar: "landing", source: "mobile_menu" })}
              className="mt-4 block text-lg w-full text-center px-8 py-4 rounded-2xl font-bold bg-[#3B82F6] text-white shadow-xl shadow-blue-500/20"
            >
              Book Appointment
            </ScrollButton>
          </div>
        </div>
      </div>
      {showWaModal && <WhatsAppLeadModal onClose={() => setShowWaModal(false)} />}
    </header>
  );
}
