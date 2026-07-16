"use client";

import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import {
  formattedPhoneNumber,
  PHONE_NUMBER,
} from "@/utils/contant";
import Link from "next/link";
import Image from "next/image";
import { ScrollButton } from "../core/ScrollButton";
import { pushEvent } from "@/utils/gtm";
import { WhatsAppLeadModal } from "@/components/WhatsAppLeadModal";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm h-[81px] transition-all duration-300">
      <div className="container mx-auto h-20 flex items-center justify-between">
        <Link href="/" className="relative z-50">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/siraa-logo.png"
              alt="Siraa Health"
              width={64}
              height={64}
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <span className="font-display font-black text-xl md:text-2xl tracking-tight text-foreground">
              Siraa Health
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <span className="text-sm font-bold text-foreground transition-colors">
            Talk to a Specialist
          </span>

          {PHONE_NUMBER && (
            <div className="flex flex-col items-end border-r border-border/50 pr-8">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Call Us Today
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() =>
                  pushEvent("phone_call_click", {
                    source: "app_navbar_desktop",
                  })
                }
                className="font-display font-bold text-primary text-lg leading-tight"
              >
                {formattedPhoneNumber}
              </a>
            </div>
          )}

          <ScrollButton
            sectionId="booking-form"
            href="/milestones/Thick-DelhiNCR"
            onTrack={() =>
              pushEvent("navbar_cta_click", {
                cta: "book_appointment",
                navbar: "app",
              })
            }
            className="px-6 py-3 rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-yellow-400 transition-all hover:shadow-lg active:scale-95"
          >
            Book an appointment
          </ScrollButton>
        </div>

        {/* Mobile WhatsApp & Menu Button */}
        <div className="flex items-center gap-2 md:hidden relative z-50">
          {PHONE_NUMBER && (
            <button
              type="button"
              onClick={() => {
                pushEvent("whatsapp_cta_click", { source: "app_navbar" });
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
              if (opening) pushEvent("mobile_menu_open", { navbar: "app" });
            }}
            className="p-2 text-foreground hover:bg-black/5 rounded-xl transition-colors"
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
        <div className="flex flex-col h-full py-6 gap-6 bg-white">
          <div className="bg-white px-6">
            <div className="space-y-4">
              <span className="block text-2xl font-display font-bold text-foreground transition-colors border-b border-border/30 pb-4">
                Talk to a Specialist
              </span>
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
                    onClick={() =>
                      pushEvent("phone_call_click", {
                        source: "app_navbar_menu",
                      })
                    }
                    className="font-display font-bold text-primary text-2xl block"
                  >
                    {formattedPhoneNumber}
                  </a>
                </div>
              )}

              <ScrollButton
                sectionId="booking-form"
                href="/milestones/Thick-DelhiNCR"
                onTrack={() =>
                  pushEvent("navbar_cta_click", {
                    cta: "book_appointment",
                    navbar: "app",
                    source: "mobile_menu",
                  })
                }
                className="block w-full text-center px-8 py-4 rounded-2xl font-bold bg-secondary text-secondary-foreground text-xl shadow-xl shadow-secondary/20 hover:bg-yellow-400 active:scale-95 transition-all"
              >
                Book an appointment
              </ScrollButton>
            </div>
          </div>
        </div>
      </div>
      {showWaModal && <WhatsAppLeadModal onClose={() => setShowWaModal(false)} />}
    </header>
  );
}
