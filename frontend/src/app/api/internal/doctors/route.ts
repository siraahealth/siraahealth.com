import { NextResponse } from "next/server";
import { DoctorBackendService } from "@/services-backend/DoctorService";

export async function GET() {
  try {
    const doctors = await DoctorBackendService.getDoctors();
    return NextResponse.json({ data: doctors });
  } catch (error) {
    console.error("Error in /api/internal/doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
