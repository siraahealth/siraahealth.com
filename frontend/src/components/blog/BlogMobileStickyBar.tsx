"use client";

import { useState } from "react";
import { WhatsAppLeadModal } from "@/components/WhatsAppLeadModal";
import { usePhoneNumber } from "@/components/providers/PhoneNumberProvider";
import { pushEvent } from "@/utils/gtm";

export default function BlogMobileStickyBar() {
  const { phoneNumber } = usePhoneNumber();
  const [showWaModal, setShowWaModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex gap-2 md:hidden z-50">
        <a href={`tel:${phoneNumber}`} className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg text-sm font-medium">Call Now</a>
        <button
          type="button"
          onClick={() => {
            pushEvent("whatsapp_cta_click", { source: "blog_mobile_bar" });
            setShowWaModal(true);
          }}
          className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg text-sm font-medium border-0 cursor-pointer"
        >
          WhatsApp
        </button>
        <a href="#lead-form" className="flex-1 bg-teal-600 text-white text-center py-3 rounded-lg text-sm font-medium">Book</a>
      </div>
      {showWaModal && <WhatsAppLeadModal onClose={() => setShowWaModal(false)} />}
    </>
  );
}
