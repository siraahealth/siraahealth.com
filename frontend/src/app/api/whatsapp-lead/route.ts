import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

function generateReferenceCode() {
  // Short, readable, staff can read it back over WhatsApp/phone easily.
  // Timestamp tail (base36) + 2 random chars keeps collisions very unlikely
  // without needing a DB round-trip to check uniqueness.
  const timePart = Date.now().toString(36).slice(-4).toUpperCase();
  const randPart = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `SRA-${timePart}${randPart}`;
}

export async function POST(request: Request) {
  const referenceCode = generateReferenceCode();

  try {
    const body = await request.json();
    const {
      concern = "",
      urgency = "",
      page = "",
      source = "whatsapp_widget",
    } = body;

    const utm_source = body.utm_source || "";
    const utm_medium = body.utm_medium || "";
    const utm_campaign = body.utm_campaign || "";
    const utm_term = body.utm_term || "";
    const utm_content = body.utm_content || "";
    const gclid = body.gclid || "";

    // Save best-effort — a Strapi hiccup should never block the person
    // from reaching WhatsApp. The reference code still gets handed back
    // either way so the message text stays consistent.
    try {
      await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUSTOM_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            firstname: "WhatsApp Lead (pending)",
            phone: "pending",
            concern,
            urgency,
            source,
            page,
            reference_code: referenceCode,
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
      console.error("[Siraa] WhatsApp pre-lead Strapi save failed:", strapiErr);
    }

    return NextResponse.json({ success: true, referenceCode });
  } catch (error: any) {
    console.error("[Siraa] WhatsApp pre-lead route error:", error);
    // Even on a parse error, hand back a reference code so the UI can proceed.
    return NextResponse.json({ success: true, referenceCode });
  }
}
