import React from "react";
import { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Siraa Health",
  description:
    "Important medical disclosure information regarding the content provided by Siraa Health.",
};

export default function MedicalDisclaimerPage() {
  return (
    <main>
      <LegalHero title="Medical Disclaimer" />

      <LegalContent>
        <p>
          The information provided on the SiraaHealth website, blogs, social
          media, and marketing material is for informational and educational
          purposes only.
        </p>

        <p>It does not constitute medical advice.</p>

        <p>
          Browsing the website or interacting with digital content does not
          create a doctor-patient relationship.
        </p>

        <p>
          Medical advice is provided only after formal consultation with a
          registered medical practitioner.
        </p>

        <p>
          SiraaHealth does not guarantee treatment outcomes, immunity results,
          or vaccine reactions.
        </p>

        <p>
          Vaccines and medical treatments may carry risks and side effects.
          Individual responses vary.
        </p>

        <blockquote>
          <strong>For emergencies, immediately seek hospital care.</strong>
        </blockquote>

        <p>
          SiraaHealth complies with ethical standards set by the National
          Medical Commission and follows evidence-based pediatric practices
          including guidance from the Indian Academy of Pediatrics and the World
          Health Organization where applicable.
        </p>
      </LegalContent>
    </main>
  );
}
