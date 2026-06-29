import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Child Not Making Eye Contact — Autism Signs and Assessment in Gurgaon | Siraa Health",
  description: "A child avoiding eye contact can be an early sign of autism. Get a professional assessment at Siraa Health, Gurgaon. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-no-eye-contact"]} />;
}
