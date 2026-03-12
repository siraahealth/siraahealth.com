import type { Doctor } from "@/lib/doctors";
import type { PageContent } from "@/lib/page-contents";

export class FrontendService {
  public apiUrl;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  }
  /**
   * Fetches doctors from the internal Next.js API route.
   */
  public async getDoctors(): Promise<Doctor[]> {
    try {
      const apiUrl = `${this.apiUrl}/api/internal/doctors`;

      const res = await fetch(apiUrl, { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Failed to fetch doctors from internal API");
      }

      const json = await res.json();
      return json.data || [];
    } catch (error) {
      console.error("FrontendService.getDoctors Error:", error);
      return [];
    }
  }

  /**
   * Fetches page content from the internal Next.js API route.
   */
  public async getPageContent(
    page: string,
    section: string,
  ): Promise<PageContent | null> {
    try {
      const apiUrl = `${this.apiUrl}/api/internal/page-contents?page=${page}&section=${section}`;

      const res = await fetch(apiUrl, { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Failed to fetch page content from internal API");
      }

      const json = await res.json();
      return json.data || null;
    } catch (error) {
      console.error("FrontendService.getPageContent Error:", error);
      return null;
    }
  }
}
