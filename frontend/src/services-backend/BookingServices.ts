import { BaseBackendService } from "./BaseService";

export interface BookingData {
  parent_name: string;
  phone_number: string;
  child_age?: string;
  primary_concern?: string;
  consent: boolean;
}

export class BookingBackendService extends BaseBackendService {
  /**
   * Creates a new booking in Strapi.
   */
  public static async createBooking(data: BookingData) {
    try {
      const strapiPayload = {
        data: {
          parent_name: data.parent_name,
          phone_number: data.phone_number,
          child_age: data.child_age,
          primary_concern: data.primary_concern,
          consent: data.consent,
        },
      };

      const res = await this.fetchStrapi("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strapiPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Booking Error:", errorData);
        throw new Error("Failed to create booking in Strapi");
      }

      return await res.json();
    } catch (err) {
      console.error("BookingBackendService.createBooking Error:", err);
      throw err;
    }
  }
}
