import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, phone, child_age, concern, source } = body;
    const utm_source = body.utm_source || "";
    const utm_medium = body.utm_medium || "";
    const utm_campaign = body.utm_campaign || "";
    const utm_term = body.utm_term || "";
    const utm_content = body.utm_content || "";
    const gclid = body.gclid || "";
    const page = body.page || body.landing_page || body.last_landing_page || "";

    if (!firstname || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, "");
    const fakeEmail = `${digits}@lead.siraahealth.com`;

    // 1. Save to Strapi (backup — always runs)
    try {
      await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUSTOM_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            firstname,
            phone,
            child_age,
            concern,
            source,
            page,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            gclid,
          },
        }),
      });
    } catch (strapiErr) {
      console.error("[Siraa] Strapi save failed:", strapiErr);
    }

    // 2. Send to HubSpot (primary)
    try {
      const hsPayload = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "email",     value: fakeEmail },
          { name: "phone",     value: phone },
          { name: "concern",   value: concern || "" },
          { name: "source",    value: source || "website" },
        ],
        context: {
          pageUri: "https://siraahealth.com",
          pageName: "Siraa Health",
        },
      };

      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/246180888/f7aef44d-b5e1-4225-96ba-96cf5a76f97c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hsPayload),
        }
      );
      const data = await res.json();
      console.log("[Siraa] HubSpot status:", res.status, JSON.stringify(data));
    } catch (hsErr) {
      console.error("[Siraa] HubSpot failed:", hsErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lead route error:", error);
    return NextResponse.json({ success: true });
  }
}
