import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Child Behaviour Problems — Behaviour Therapy for Children in Gurgaon | Siraa Health",
  description: "Tantrums, aggression, meltdowns — Siraa Health's behaviour therapists in Gurgaon help children and families. Book an assessment.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-behaviour-problems"]} />;
}
