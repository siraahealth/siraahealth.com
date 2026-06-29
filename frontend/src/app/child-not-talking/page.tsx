import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "My Child is Not Talking — Speech Delay Help in Gurgaon | Siraa Health",
  description: "Is your child not talking at 2? Expert speech therapists in Gurgaon. Book a free assessment at Siraa Health today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-not-talking"]} />;
}
