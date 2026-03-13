import { BaseBackendService } from "./BaseService";
import type { Doctor } from "@/lib/doctors";

export class DoctorBackendService extends BaseBackendService {
  public static async getDoctors(): Promise<Doctor[]> {
    try {
      const res = await this.fetchStrapi(
        `/api/doctors?populate[image][fields][0]=url&pagination[limit]=50`,
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Vaccination Booking Error:", errorData);
        throw new Error("Failed to create vaccination booking in Strapi");
      }

      const { data } = await res.json();

      if (!data || data.length === 0) {
        return [];
      }

      return data.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        designation: doc.designation,
        experience: doc.experience,
        image: doc.image?.url
          ? `${this.STRAPI_URL}${doc.image?.url}`
          : undefined,
      }));
    } catch (err) {
      console.error("Failed to fetch doctors from Strapi", err);
      return [];
    }
  }
}
