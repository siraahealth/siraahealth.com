import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConditionData, getAllConditionSlugs } from "@/lib/conditions-data";
import { ConditionPageClient } from "@/components/conditions/ConditionPageClient";

interface Props {
  params: Promise<{ condition: string }>;
}

export async function generateStaticParams() {
  return getAllConditionSlugs().map((slug) => ({ condition: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { condition: slug } = await params;
  const condition = getConditionData(slug);

  if (!condition) {
    return { title: "Condition Not Found | Siraa Health" };
  }

  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    alternates: {
      canonical: `/conditions/${slug}`,
    },
    openGraph: {
      title: condition.metaTitle,
      description: condition.metaDescription,
      url: `/conditions/${slug}`,
      images: ["/assets/siraa-logo.png"],
    },
    twitter: {
      card: "summary",
      title: condition.metaTitle,
      description: condition.metaDescription,
      images: ["/assets/siraa-logo.png"],
    },
  };
}

export default async function ConditionPage({ params }: Props) {
  const { condition: slug } = await params;
  const condition = getConditionData(slug);

  if (!condition) notFound();

  return <ConditionPageClient condition={condition} />;
}
