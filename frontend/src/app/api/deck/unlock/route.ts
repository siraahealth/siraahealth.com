import { NextRequest, NextResponse } from "next/server";
import { DECK_COOKIE, DECK_TTL_SECONDS, pinMatches, signDeckToken } from "@/lib/deckAuth";
import { recordFailure, retryAfter } from "@/lib/deckRateLimit";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.siraahealth.com";
const CUSTOM_TOKEN = process.env.CUSTOM_TOKEN || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Set by nginx from the real connection, so visitors can't spoof it.
  const ip = req.headers.get("x-real-ip")?.trim() || null;

  const wait = retryAfter(ip);
  if (wait > 0) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }

  let body: { email?: unknown; pin?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const pin = typeof body.pin === "string" ? body.pin.trim() : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!pin || !pinMatches(pin)) {
    recordFailure(ip);
    await new Promise((r) => setTimeout(r, 400)); // slow down guessing
    return NextResponse.json({ error: "That PIN isn't right. Please check and try again." }, { status: 401 });
  }

  // Save best-effort — a Strapi hiccup shouldn't lock an investor out of the deck.
  try {
    const res = await fetch(`${STRAPI_URL}/api/deck-viewers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Token": CUSTOM_TOKEN,
      },
      body: JSON.stringify({
        data: {
          email,
          viewed_at: new Date().toISOString(),
          user_agent: req.headers.get("user-agent")?.slice(0, 255) ?? "",
          ip: ip ?? "",
        },
      }),
    });
    if (!res.ok) {
      console.error("[Siraa] Deck viewer Strapi save failed:", res.status, await res.text().catch(() => ""));
    }
  } catch (strapiErr) {
    console.error("[Siraa] Deck viewer Strapi save failed:", strapiErr);
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DECK_COOKIE, signDeckToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DECK_TTL_SECONDS,
  });
  return res;
}
