import { BaseBackendService } from "./BaseService";

export interface VaccinationStatsData {
  parents_trust_siraa_health: string;
  babies_safely_vaccinated: string;
  iap_immunisation_schedule: string;
}

export class VaccinationBackendService extends BaseBackendService {
  /**
   * Fetches vaccination stats from Strapi.
   */
  public static async getStats(): Promise<VaccinationStatsData | null> {
    try {
      const res = await this.fetchStrapi("/api/vaccination-count");

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Vaccination count fetch error:", errorData);
        throw new Error("Failed to fetch vaccination count");
      }

      const { data } = await res.json();

      if (!data) {
        return null;
      }
      return data;
    } catch (err) {
      console.error("VaccinationBackendService get stat Error:", err);
      return null;
    }
  }
}
