import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, phone, child_age, concern, source } = body;

    if (!firstname || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, "");
    const fakeEmail = `${digits}@lead.siraahealth.com`;

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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("HubSpot route error:", error);
    return NextResponse.json({ success: true });
  }
}
