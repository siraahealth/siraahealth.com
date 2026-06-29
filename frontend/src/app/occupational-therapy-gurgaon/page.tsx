import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Occupational Therapy for Children in Gurgaon | Siraa Health",
  description: "Expert occupational therapy for children in Gurgaon. Sensory processing, fine motor skills, attention and independence. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["occupational-therapy-gurgaon"]} />;
}
