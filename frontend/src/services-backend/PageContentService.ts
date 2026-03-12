import { BaseBackendService } from "./BaseService";
import type { PageContent } from "@/lib/page-contents";

export class PageContentBackendService extends BaseBackendService {
  public static async getPageContent(
    page: string,
    section: string,
  ): Promise<PageContent | null> {
    try {
      const res = await this.fetchStrapi(
        `/api/page-contents?filters[page][$eq]=${page}&filters[section][$eq]=${section}&populate=image`,
      );

      if (!res.ok) {
        throw new Error("failed to fetch page content.");
      }

      const { data } = await res.json();

      const doc = data[0];

      return {
        id: doc.id,
        title: doc.title,
        tag_line: doc.tag_line,
        section: doc.section,
        page: doc.page,
        image: this.STRAPI_URL + doc.image.url,
      };
    } catch (err) {
      console.error("Failed to fetch page contents from Strapi", err);
      throw err;
    }
  }
}
