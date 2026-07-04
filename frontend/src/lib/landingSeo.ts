// Landing-page site constants + JSON-LD builders.
// Reads from your existing env where available.
import type { LandingPage } from "@/content/landingPages";

export const LANDING_SITE = {
  name: "Siraa Health",
  url: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://siraahealth.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+919910731103",
  whatsapp: (process.env.NEXT_PUBLIC_PHONE_NUMBER || "+919910731103").replace(/[^0-9]/g, ""),
  address: "Siraa Health, Sector 67, Gurgaon, Haryana",
  geo: { lat: 28.3841, lng: 77.0637 },
  hours: "Mon–Sat 9:00 AM – 7:00 PM · Sunday Closed",
  doctor: { name: "Dr. Priya Sharma", creds: "MBBS, MD (Pediatrics)", exp: "20+ years" }, // TODO: confirm
};

export const clinicSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: LANDING_SITE.name,
  url: LANDING_SITE.url,
  telephone: LANDING_SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 67",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: LANDING_SITE.geo.lat, longitude: LANDING_SITE.geo.lng },
  medicalSpecialty: "Pediatric",
  openingHours: "Mo-Sa 09:00-19:00",
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const medicalPageSchema = (page: LandingPage) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: page.seoTitle,
  url: LANDING_SITE.url + page.path,
  about: { "@type": "MedicalCondition", name: page.condition },
  lastReviewed: "2026-07-01",
  reviewedBy: { "@type": "Physician", name: LANDING_SITE.doctor.name, medicalSpecialty: "Pediatric" },
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".answer-block"] },
});

export const breadcrumbSchema = (page: LandingPage) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: LANDING_SITE.url },
    { "@type": "ListItem", position: 2, name: page.nav, item: LANDING_SITE.url + page.path },
  ],
});
