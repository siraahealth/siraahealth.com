import { NextResponse } from "next/server";
import { QuizBackendService } from "@/services-backend/QuizBackendService";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await QuizBackendService.createSubmission(data);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Route Quiz Submission Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit quiz" },
      { status: 500 },
    );
  }
}
