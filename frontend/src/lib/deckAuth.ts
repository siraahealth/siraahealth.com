import crypto from "crypto";

export const DECK_COOKIE = "siraa_deck";
// Cookie outlives the 10-min client idle timer by a minute so the page, not a
// surprise 401, decides when to log out.
export const DECK_TTL_SECONDS = 11 * 60;

function secret() {
  const s = process.env.DECK_SECRET;
  if (!s) throw new Error("DECK_SECRET is not set");
  return s;
}

function hmac(data: string) {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

// token = base64url(email|expiry).signature
export function signDeckToken(email: string) {
  const exp = Math.floor(Date.now() / 1000) + DECK_TTL_SECONDS;
  const payload = Buffer.from(`${email}|${exp}`).toString("base64url");
  return `${payload}.${hmac(payload)}`;
}

export function verifyDeckToken(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = hmac(payload);
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const [email, exp] = Buffer.from(payload, "base64url").toString().split("|");
  if (!email || Number(exp) < Date.now() / 1000) return null;
  return email;
}

export function pinMatches(pin: string) {
  const expected = process.env.DECK_PIN;
  if (!expected) throw new Error("DECK_PIN is not set");
  const a = crypto.createHash("sha256").update(pin).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}
