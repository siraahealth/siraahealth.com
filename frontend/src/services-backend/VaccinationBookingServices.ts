import { BaseBackendService } from "./BaseService";

export interface VaccinationBookingData {
  parent_name: string;
  phone_number: string;
  child_age?: string;
}

export class VaccinationBookingBackendService extends BaseBackendService {
  /**
   * Creates a new vaccination booking in Strapi.
   */
  public static async createVaccinationBooking(data: VaccinationBookingData) {
    try {
      const strapiPayload = {
        data: {
          parent_name: data.parent_name,
          phone_number: data.phone_number,
          child_age: data.child_age,
        },
      };

      const res = await this.fetchStrapi("/api/vaccination-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strapiPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Vaccination Booking Error:", errorData);
        throw new Error("Failed to create vaccination booking in Strapi");
      }

      return await res.json();
    } catch (err) {
      console.error(
        "VaccinationBookingBackendService.createVaccinationBooking Error:",
        err,
      );
      throw err;
    }
  }
}
