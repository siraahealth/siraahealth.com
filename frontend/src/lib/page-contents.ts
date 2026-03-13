import { fetchStrapi } from "./api";

export interface PageContent {
  id: number;
  title: string;
  tag_line?: string;
  section: string;
  page: string;
  image?: string;
  icon?: string;
}

export async function getPageContents(
  page: string,
  section: string,
): Promise<PageContent | null> {
  try {
    const res = await fetchStrapi(
      `/api/page-contents?filters[page][$eq]=${page}&filters[section][$eq]=${section}`,
    );

    if (!res.ok) {
      console.warn(
        `Strapi page-contents endpoint returned an error. Returning fallback data.`,
        res.status,
      );
      return getFallbackHero();
    }

    const { data } = await res.json();

    if (!data || data.length === 0) {
      return getFallbackHero();
    }

    const doc = data[0];

    return {
      id: doc.id,
      title: doc.title || doc.attributes?.title,
      tag_line: doc.tag_line || doc.attributes?.tag_line,
      section: doc.section || doc.attributes?.section,
      page: doc.page || doc.attributes?.page,
      image: doc.image || doc.attributes?.image,
    };
  } catch (err) {
    console.error("Failed to fetch page contents from Strapi", err);
    return getFallbackHero();
  }
}

function getFallbackHero(): PageContent {
  return {
    id: 1,
    title: "Worried About Your Child’s Speech or Development?",
    tag_line:
      "Early screening and evidence-based therapy for speech delay, autism, and developmental delays by Gurgaon's leading pediatric specialists.",
    section: "hero",
    page: "home",
  };
}
