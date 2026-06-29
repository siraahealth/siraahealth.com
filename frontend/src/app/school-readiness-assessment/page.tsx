import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "School Readiness Assessment for Children in Gurgaon | Siraa Health",
  description: "Find out if your child is ready for school and what support they need before day one. Book at Siraa Health today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["school-readiness-assessment"]} />;
}
