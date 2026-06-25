import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import NavbarSwitcher from "@/components/layout/NavbarSwitcher";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Footer from "@/components/layout/Footer";
import ScrollOnMount from "@/components/core/ScrollOnMount";
import { ExitPopup } from "@/components/ExitPopup";
import GTMScript from "@/components/analytics/GTMScript";
import GTMFrame from "@/components/analytics/GTMFrame";
import GTMRouteTracker from "@/components/analytics/GTMRouteTracker";

const baseUrl = new URL(
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
);
const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

const fontSans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontDisplay = Quicksand({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Siraa Health | Pediatric Therapy Clinic",
    template: "%s | Siraa Health",
  },
  description:
    "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Siraa Health | Pediatric Therapy Clinic",
    description:
      "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
    url: "/",
    siteName: "Siraa Health",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/siraa-logo.png",
        width: 512,
        height: 512,
        alt: "Siraa Health logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Siraa Health | Pediatric Therapy Clinic",
    description:
      "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
    images: ["/assets/siraa-logo.png"],
  },
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Siraa Health",
    url: baseUrl.toString(),
    logo: new URL("/assets/siraa-logo.png", baseUrl).toString(),
    telephone: phoneNumber,
    email: contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Golf course road",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/SiraaHealth",
      "https://www.facebook.com/people/Siraababy/61587920614614",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    openingHours: ["Mo-Sa 09:00-19:00"],
  };

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Siraa Health" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}
      >
        <GTMScript />
        <GTMFrame />
        <Suspense fallback={null}>
          <GTMRouteTracker />
        </Suspense>
        <Providers>
          <div className="min-h-screen bg-background font-sans">
            <NavbarSwitcher />
            {children}
            <Footer />
            <div className="hidden md:block">
              <FloatingWhatsApp />
            </div>
            <ScrollOnMount />
            <ExitPopup />
          </div>
        </Providers>
      </body>
    </html>
  );
}
