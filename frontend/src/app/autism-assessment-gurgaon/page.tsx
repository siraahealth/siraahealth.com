import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Autism Assessment for Children in Gurgaon | Siraa Health",
  description: "Comprehensive autism assessments in Gurgaon with written reports, parent feedback and immediate therapy support. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["autism-assessment-gurgaon"]} />;
}
