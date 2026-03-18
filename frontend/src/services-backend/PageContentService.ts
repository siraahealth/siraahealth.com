import { BaseBackendService } from "./BaseService";

export interface PageContent {
  id: number;
  section: string;
  page: string;
  image?: string;
}

export class PageContentBackendService extends BaseBackendService {
  public static async getPageContent(
    page: string,
    section: string,
  ): Promise<PageContent | null> {
    try {
      const res = await this.fetchStrapi(
        `/api/page-contents?filters[page][$eq]=${page}&filters[section][$eq]=${section}&populate[image][fields][0]=url`,
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Page Content Fetch Error:", errorData);
        throw new Error("Failed to fetch page content from Strapi");
      }

      const { data } = await res.json();

      const doc = data?.[0] || null;

      if (!doc) {
        return null;
      }

      return {
        id: doc?.id,
        section: doc?.section,
        page: doc?.page,
        image: doc?.image?.url ? this.STRAPI_URL + doc.image.url : undefined,
      };
    } catch (err) {
      console.error("Failed to fetch page contents from Strapi", err);
      throw err;
    }
  }
}
