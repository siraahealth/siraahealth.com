import { NextResponse } from "next/server";
import { VaccinationBookingBackendService } from "@/services-backend/VaccinationBookingServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data =
      await VaccinationBookingBackendService.createVaccinationBooking(body);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Vaccination Booking API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
