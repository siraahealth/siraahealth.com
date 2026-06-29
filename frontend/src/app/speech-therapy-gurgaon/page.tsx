import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Speech Therapy for Children in Gurgaon | Siraa Health",
  description: "Expert speech and language therapists in Gurgaon helping children speak, connect and thrive. Book an assessment today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["speech-therapy-gurgaon"]} />;
}
