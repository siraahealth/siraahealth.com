export class FrontendService {
  public apiUrl;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  }

  /**
   * Sends a booking request to the internal Next.js API route.
   */
  public async createBooking(data: any): Promise<any> {
    try {
      const apiUrl = `${this.apiUrl}/api/internal/bookings`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      return await res.json();
    } catch (error) {
      console.error("FrontendService.createBooking Error:", error);
      throw error;
    }
  }
}
