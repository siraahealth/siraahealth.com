import { fetchStrapi } from "./api";

export interface PageContent {
  id: number;
  section: string;
  page: string;
  image?: string;
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
      return null;
    }

    const { data } = await res.json();

    if (!data || data.length === 0) {
      return null;
    }

    const doc = data[0];

    return {
      id: doc.id,
      section: doc.section || doc.attributes?.section,
      page: doc.page || doc.attributes?.page,
      image: doc.image || doc.attributes?.image,
    };
  } catch (err) {
    console.error("Failed to fetch page contents from Strapi", err);
    return null;
  }
}
