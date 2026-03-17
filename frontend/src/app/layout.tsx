import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import NavbarSwitcher from "@/components/layout/NavbarSwitcher";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Footer from "@/components/layout/Footer";
import ScrollOnMount from "@/components/core/ScrollOnMount";

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
  title: "Siraa Health | Pediatric Therapy Clinic",
  description:
    "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background font-sans">
            <NavbarSwitcher />
            {children}
            <Footer />
            <FloatingWhatsApp />
            <ScrollOnMount />
          </div>
        </Providers>
      </body>
    </html>
  );
}
