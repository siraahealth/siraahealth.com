import { NextResponse } from "next/server";
import { BookingBackendService } from "@/services-backend/BookingServices";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await BookingBackendService.createBooking(body);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Booking API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
