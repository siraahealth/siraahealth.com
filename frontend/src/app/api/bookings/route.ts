// lead tracking enabled
import { NextResponse } from "next/server";
import { BookingBackendService } from "@/services-backend/BookingServices";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let data = null;
    try {
      data = await BookingBackendService.createBooking(body);
    } catch (bookingErr) {
      console.error("Booking collection save error (non-blocking):", bookingErr);
    }

    // Also save to leads collection for unified tracking
    try {
      const leadPayload = {
        data: {
          firstname: body.name || body.parent_name,
          phone: body.phone || body.phone_number,
          child_age: body.childAge || body.child_age,
          concern: body.concern || body.primary_concern || "Development Assessment",
          source: body.source || "milestones_page",
          page: body.page || "unknown",
          utm_source: body.utm_source || "",
          utm_medium: body.utm_medium || "",
          utm_campaign: body.utm_campaign || "",
          utm_term: body.utm_term || "",
          utm_content: body.utm_content || "",
          gclid: body.gclid || "",
        },
      };
      console.log("[DEBUG] Incoming body UTM fields:", JSON.stringify({
        utm_source: body.utm_source, utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign, utm_term: body.utm_term, gclid: body.gclid,
      }));
      console.log("[DEBUG] Lead payload being sent to Strapi:", JSON.stringify(leadPayload));
      const leadRes = await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUSTOM_TOKEN}`,
        },
        body: JSON.stringify(leadPayload),
      });
      const leadResText = await leadRes.text();
      console.log("[DEBUG] Strapi leads response status:", leadRes.status, "body:", leadResText);
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
