"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PHONE_NUMBER } from "@/utils/contant";
import { useUTMs } from "@/components/landing/LandingComponents";

const CONCERN_OPTIONS = [
  { value: "sick_child", label: "My child is unwell today" },
  { value: "routine_checkup", label: "Routine checkup / vaccination" },
  { value: "development_behaviour", label: "Development or behaviour concern" },
  { value: "other", label: "Something else" },
];

const URGENCY_OPTIONS = [
  { value: "urgent_today", label: "Need to be seen today" },
  { value: "this_week", label: "This week is fine" },
  { value: "no_rush", label: "Just exploring / no rush" },
];

export function WhatsAppLeadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [concern, setConcern] = useState<{ value: string; label: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const utms = useUTMs();

  async function handleUrgencySelect(urgency: { value: string; label: string }) {
    if (loading || !concern) return;
    setLoading(true);

    const page = typeof window !== "undefined" ? window.location.pathname : "";

    let referenceCode = "";
    try {
      const res = await fetch("/api/whatsapp-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concern: concern.label,
          urgency: urgency.label,
          page,
          source: "whatsapp_widget",
          ...utms,
        }),
      });
      const data = await res.json();
      referenceCode = data.referenceCode || "";
    } catch {
      // Non-blocking — still let the person reach WhatsApp even if this fails.
    }

    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        form_name: "whatsapp_pre_chat",
        concern: concern.label,
        urgency: urgency.label,
        reference_code: referenceCode,
      });
    }

    const messageParts = [
      "Hi, ",
      concern.label.charAt(0).toLowerCase() + concern.label.slice(1),
      urgency.value === "urgent_today" ? " and need to be seen today." : ".",
      referenceCode ? ` (Ref: ${referenceCode})` : "",
    ];
    const message = encodeURIComponent(messageParts.join(""));
    const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${message}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setLoading(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              What brings you here today?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This helps us respond faster on WhatsApp.
            </p>
            <div className="flex flex-col gap-2">
              {CONCERN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setConcern(opt);
                    setStep(2);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl border border-border text-[14px] font-medium hover:border-primary hover:bg-primary/5 transition-all"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              How urgent is it?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              One more tap and we&apos;ll open WhatsApp.
            </p>
            <div className="flex flex-col gap-2">
              {URGENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  disabled={loading}
                  onClick={() => handleUrgencySelect(opt)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-border text-[14px] font-medium hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50"
                >
                  {loading ? "Opening WhatsApp..." : opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-3 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
