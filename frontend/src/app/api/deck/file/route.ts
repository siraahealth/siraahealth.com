import { NextRequest, NextResponse } from "next/server";
import { DECK_COOKIE, verifyDeckToken } from "@/lib/deckAuth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";

export const dynamic = "force-dynamic";

// The PDF lives in Strapi's "Pitch Deck" single type. We proxy it so its
// Strapi URL is never exposed to the browser.
async function getDeckUrl(): Promise<string | null> {
  const res = await fetch(`${STRAPI_URL}/api/pitch-deck?populate=file`, {
    headers: { "X-Custom-Token": CUSTOM_TOKEN },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Strapi pitch-deck fetch failed: ${res.status}`);
  const json = await res.json();
  const url: string | undefined = json?.data?.file?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export async function GET(req: NextRequest) {
  if (!verifyDeckToken(req.cookies.get(DECK_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = await getDeckUrl();
    if (!url) {
      return NextResponse.json({ error: "No deck uploaded yet." }, { status: 404 });
    }
    const file = await fetch(url, { cache: "no-store" });
    if (!file.ok || !file.body) throw new Error(`Deck file fetch failed: ${file.status}`);

    const download = req.nextUrl.searchParams.get("download") === "1";
    return new NextResponse(file.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="Siraa-Health-Pitch-Deck.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (err) {
    console.error("[Siraa] Deck file route error:", err);
    return NextResponse.json({ error: "Couldn't load the deck." }, { status: 502 });
  }
}
