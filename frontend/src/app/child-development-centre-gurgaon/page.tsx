import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Child Development Centre in Gurgaon | Siraa Health",
  description: "Gurgaon's trusted child development centre. Vaccinations, assessment and therapy all under one roof. Book an appointment today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-development-centre-gurgaon"]} />;
}
