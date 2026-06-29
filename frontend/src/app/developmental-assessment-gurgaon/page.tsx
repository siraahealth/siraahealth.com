import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Developmental Assessment for Children in Gurgaon | Siraa Health",
  description: "Comprehensive developmental assessments covering motor, speech, cognitive and social skills in one visit. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["developmental-assessment-gurgaon"]} />;
}
