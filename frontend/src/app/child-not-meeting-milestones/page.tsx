import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";
import { PAGE_DATA } from "@/data/landing-pages";

export const metadata = {
  title: "Child Not Meeting Milestones — Developmental Assessment in Gurgaon | Siraa Health",
  description: "If your child is behind on walking, talking or learning, early action makes the biggest difference. Book at Siraa Health today.",
};

export default function Page() {
  return <LandingPageTemplate data={PAGE_DATA["child-not-meeting-milestones"]} />;
}
