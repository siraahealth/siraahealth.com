export class QuizService {
  public static async submitQuiz(data: {
    parentName: string;
    parentNumber: string;
    childAge: string;
    symptoms: string[];
    concerns: string;
  }) {
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit quiz");
      }

      return await response.json();
    } catch (error) {
      console.error("QuizService submission error:", error);
      throw error;
    }
  }
}
