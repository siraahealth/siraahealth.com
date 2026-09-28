// In-memory limits on wrong PIN attempts. The frontend runs as a single PM2
// process, so one Map is shared by every request.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS_PER_IP = 5; // per visitor, per 15 min
const MAX_FAILS_GLOBAL = 50; // across everyone, per 15 min: caps distributed guessing

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function bucket(key: string, now: number) {
  let b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, b);
  }
  return b;
}

function keys(ip: string | null) {
  return ip ? ["global", `ip:${ip}`] : ["global"];
}

/** Seconds until the caller may try again, or 0 if allowed. */
export function retryAfter(ip: string | null): number {
  const now = Date.now();
  for (const key of keys(ip)) {
    const b = bucket(key, now);
    const max = key === "global" ? MAX_FAILS_GLOBAL : MAX_FAILS_PER_IP;
    if (b.count >= max) return Math.ceil((b.resetAt - now) / 1000);
  }
  return 0;
}

export function recordFailure(ip: string | null) {
  const now = Date.now();
  for (const key of keys(ip)) bucket(key, now).count++;
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
}
