import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Child Cannot Focus or Sit Still — ADHD Assessment in Gurgaon | Siraa Health",
  description: "Is your child constantly distracted or hyperactive? Get an expert ADHD assessment at Siraa Health, Gurgaon. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-cant-focus"]} />;
}
