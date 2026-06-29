import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Learning Difficulties Assessment for Children in Gurgaon | Siraa Health",
  description: "Expert learning difficulties assessments in Gurgaon covering dyslexia, dysgraphia and more. Book today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["learning-difficulties-assessment"]} />;
}
