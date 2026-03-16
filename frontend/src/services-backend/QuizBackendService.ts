import { BaseBackendService } from "./BaseService";

export interface QuizSubmissionData {
  parentName: string;
  parentNumber: string;
  childAge: string;
  symptoms: string[];
  concerns: string;
}

export class QuizBackendService extends BaseBackendService {
  public static async createSubmission(data: QuizSubmissionData): Promise<any> {
    try {
      const res = await this.fetchStrapi("/api/quiz-submissions", {
        method: "POST",
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Strapi Quiz Submission Error:", errorData);
        throw new Error("Failed to submit quiz to Strapi");
      }

      return await res.json();
    } catch (err) {
      console.error("Failed to create quiz submission in Strapi", err);
      throw err;
    }
  }
}
