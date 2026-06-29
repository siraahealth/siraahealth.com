import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "ABA Therapy for Children with Autism in Gurgaon | Siraa Health",
  description: "Evidence-based ABA therapy for children with autism in Gurgaon. Building communication, independence and social skills. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["aba-therapy-gurgaon"]} />;
}
