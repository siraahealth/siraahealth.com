import { NextRequest, NextResponse } from "next/server";
import { DECK_COOKIE, DECK_TTL_SECONDS, signDeckToken, verifyDeckToken } from "@/lib/deckAuth";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// Extend the session while the viewer is active.
export async function POST(req: NextRequest) {
  const email = verifyDeckToken(req.cookies.get(DECK_COOKIE)?.value);
  if (!email) {
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DECK_COOKIE, signDeckToken(email), { ...cookieOptions, maxAge: DECK_TTL_SECONDS });
  return res;
}

// Log out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DECK_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
