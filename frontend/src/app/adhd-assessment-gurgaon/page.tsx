import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "ADHD Assessment for Children in Gurgaon | Siraa Health",
  description: "Thorough ADHD assessments in Gurgaon with written reports, school support letters and immediate therapy. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["adhd-assessment-gurgaon"]} />;
}
