"use client";
import React from "react";

export default function Navbar() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/siraa-logo.png"
            alt="Siraa Health"
            className="w-16 h-16 object-contain"
          />
          <span className="font-display font-black text-2xl tracking-tight text-foreground hidden sm:inline">
            Siraa <span className="text-primary">Health</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {phoneNumber && (
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Call Us Today
              </span>
              <a
                href={`tel:${phoneNumber}`}
                className="font-display font-bold text-primary text-lg"
              >
                {phoneNumber}
              </a>
            </div>
          )}
          <a
            href="#booking-form"
            className="px-5 py-2.5 rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-yellow-400 transition-colors hidden sm:block"
          >
            Book Assessment
          </a>
        </div>
      </div>
    </header>
  );
}
