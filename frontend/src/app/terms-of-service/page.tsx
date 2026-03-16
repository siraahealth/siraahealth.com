import React from "react";
import { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | Siraa Health",
  description:
    "Read the terms and conditions for using Siraa Health's website and services.",
};

export default function TermsOfServicePage() {
  return (
    <main>
      <LegalHero
        title="Terms & Conditions"
        subtitle="Last Updated: March 16, 2026"
      />

      <LegalContent>
        <p>
          By accessing the SiraaHealth website, you agree to these Terms &
          Conditions. If you do not agree, please do not use this website.
        </p>

        <h2>1. Nature of Services</h2>
        <p>SiraaHealth provides:</p>
        <ul>
          <li>Pediatric consultation services</li>
          <li>Vaccination facilitation</li>
          <li>Appointment booking services</li>
          <li>Informational health content</li>
        </ul>
        <p>SiraaHealth does not provide emergency services.</p>

        <h2>2. No Guarantee of Outcomes</h2>
        <p>Medical outcomes vary by individual. We do not guarantee:</p>
        <ul>
          <li>Cure</li>
          <li>100% immunity</li>
          <li>Zero side effects</li>
          <li>Specific treatment outcomes</li>
        </ul>

        <h2>3. Appointment & Cancellation Policy</h2>
        <ul>
          <li>Appointments must be booked in advance</li>
          <li>
            Cancellation must be made at least 24 hours prior (unless specified
            otherwise)
          </li>
          <li>Missed appointments may not be refunded</li>
          <li>
            Refunds, if applicable, are processed within 7-10 working days
          </li>
        </ul>
        <p>Separate Refund Policy may apply.</p>

        <h2>4. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, SiraaHealth shall not be
          liable for:
        </p>
        <ul>
          <li>Indirect or consequential damages</li>
          <li>Delays caused by third-party providers</li>
          <li>Outcomes resulting from incomplete medical history disclosure</li>
        </ul>

        <h2>5. User Responsibilities</h2>
        <p>Users agree to:</p>
        <ul>
          <li>Provide accurate medical information</li>
          <li>Follow medical advice responsibly</li>
          <li>Not misuse website content</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          All website content including text, logos, graphics, and design are
          property of SiraaHealth and may not be reproduced without permission.
        </p>

        <h2>7. Teleconsultation (If Applicable)</h2>
        <p>
          Teleconsultations comply with guidelines issued by the National
          Medical Commission. Prescriptions are issued only after appropriate
          evaluation.
        </p>

        <h2>8. Jurisdiction</h2>
        <p>
          These Terms shall be governed by the laws of India. Any disputes shall
          be subject to courts located in Gurgaon, Haryana.
        </p>

        <h2>9. Modification of Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of the website constitutes acceptance.
        </p>
      </LegalContent>
    </main>
  );
}
