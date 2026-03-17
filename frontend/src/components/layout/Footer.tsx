import React from "react";
import { MapPin, PhoneCall } from "lucide-react";
import { formattedPhoneNumber } from "@/utils/contant";
import Link from "next/link";
import { ScrollButton } from "@/components/core/ScrollButton";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/assets/siraa-logo.png"
                alt="Siraa Health"
                className="w-16 h-16 object-contain bg-white rounded-lg p-2"
              />
              <span className="font-display font-black text-2xl tracking-tight">
                Siraa <span className="text-primary">Health</span>
              </span>
            </div>
            <p className="text-white/60 font-medium leading-relaxed">
              Gurgaon's dedicated pediatric neurodevelopment clinic focusing on
              holistic child growth through evidence-based therapies.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-white/70 font-medium">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/vaccination"
                  className="hover:text-primary transition-colors"
                >
                  Vaccination
                </Link>
              </li>
              <li>
                <Link
                  href="/development"
                  className="hover:text-primary transition-colors"
                >
                  Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/70 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  Golf Course Road,
                  <br />
                  Gurgaon, Haryana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0" />
                <span>{formattedPhoneNumber}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl mb-6">
              Clinic Hours
            </h4>
            <ul className="space-y-3 text-white/70 font-medium">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mon - Sat:</span> <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Sunday:</span>{" "}
                <span className="text-primary font-bold">Closed</span>
              </li>
            </ul>
            <ScrollButton
              sectionId="booking-form"
              href="/development"
              className="mt-6 block w-full py-3 rounded-xl font-bold bg-primary hover:bg-primary/90 transition-colors text-center text-white"
            >
              Schedule Visit
            </ScrollButton>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm font-medium">
            <p>© 2026 Siraa Health. All Rights Reserved</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/medical-disclaimer" className="hover:text-white">
                Medical Disclaimer
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wide">
              Disclaimer:
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              The result and experience may vary from patient to patient. By
              submitting the form, you agree to receive important updates and
              marketing communication.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
