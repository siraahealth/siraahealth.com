"use client";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/utils/contant";
import { pushEvent } from "@/utils/gtm";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => pushEvent("whatsapp_cta_click", { source: "floating_button" })}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold font-display hidden sm:block">
        Chat With Specialist
      </span>

      {/* Pulse ping effect */}
      <span className="absolute right-0 top-0 -mt-1 -mr-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white/40"></span>
      </span>
    </a>
  );
}
