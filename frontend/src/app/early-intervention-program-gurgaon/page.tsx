import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Early Intervention Program for Children in Gurgaon | Siraa Health",
  description: "Siraa Health supports children from 6 months with therapy, assessment and parent guidance. Book an early intervention assessment today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["early-intervention-program-gurgaon"]} />;
}
