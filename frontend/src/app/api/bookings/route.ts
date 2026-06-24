import { NextResponse } from "next/server";
import { BookingBackendService } from "@/services-backend/BookingServices";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await BookingBackendService.createBooking(body);

    // Also save to leads collection for unified tracking
    try {
      await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUSTOM_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            firstname: body.parent_name,
            phone: body.phone_number,
            child_age: body.child_age,
            concern: body.primary_concern || "Development Assessment",
            source: "milestones_page",
          },
        }),
      });
    } catch (leadErr) {
      console.error("Lead save error:", leadErr);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Booking API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
