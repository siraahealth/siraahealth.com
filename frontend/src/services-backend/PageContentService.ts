import { BaseBackendService } from "./BaseService";
import type { PageContent } from "@/lib/page-contents";

export class PageContentBackendService extends BaseBackendService {
  public static async getPageContent(
    page: string,
    section: string,
  ): Promise<PageContent | null> {
    try {
      const res = await this.fetchStrapi(
        `/api/page-contents?filters[page][$eq]=${page}&filters[section][$eq]=${section}&populate[image][fields][0]=url&populate[icon][fields][0]=url`,
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Vaccination Booking Error:", errorData);
        throw new Error("Failed to create vaccination booking in Strapi");
      }

      const { data } = await res.json();

      const doc = data[0];

      return {
        id: doc.id,
        title: doc.title,
        tag_line: doc.tag_line,
        section: doc.section,
        page: doc.page,
        image: doc.image.url ? this.STRAPI_URL + doc.image.url : undefined,
        icon: doc.icon.url ? this.STRAPI_URL + doc.icon.url : undefined,
      };
    } catch (err) {
      console.error("Failed to fetch page contents from Strapi", err);
      throw err;
    }
  }
}
