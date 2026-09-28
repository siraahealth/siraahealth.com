"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function DeckGate({ initiallyUnlocked }: { initiallyUnlocked: boolean }) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/deck/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pin }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setUnlocked(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) {
    return (
      <div className="flex h-dvh flex-col bg-muted">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-white px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/siraa-logo.png" alt="Siraa Health" width={36} height={36} />
            <span className="font-display text-lg font-bold text-foreground">Siraa Health</span>
          </Link>
          <div className="flex gap-2">
            <a
              href="/api/deck/file"
              target="_blank"
              rel="noopener"
              className="hidden rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:inline-flex"
            >
              Open full screen
            </a>
            <a
              href="/api/deck/file?download=1"
              className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Download
            </a>
          </div>
        </header>
        <iframe className="w-full flex-1 border-0" src="/api/deck/file#view=FitH" title="Siraa Health pitch deck" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-2 overflow-hidden bg-[radial-gradient(120%_80%_at_75%_20%,#FFF1E0_0%,transparent_55%),radial-gradient(90%_70%_at_15%_90%,hsl(var(--primary)/0.12)_0%,transparent_60%)] px-4 pb-10 pt-6 lg:flex-row lg:gap-14 lg:p-10">
      <div className="pointer-events-none w-full max-w-[420px] lg:order-2 lg:max-w-[640px] lg:flex-1">
        <Image
          src="/assets/deck-bg.webp"
          alt="A smiling girl sitting between Nilo the blue elephant and a monkey friend"
          width={1402}
          height={1122}
          priority
          sizes="(min-width: 1024px) 640px, 420px"
          className="h-auto w-full drop-shadow-[0_24px_40px_rgba(14,27,61,0.14)]"
        />
      </div>

      <section
        aria-labelledby="deck-title"
        className="w-full max-w-[440px] rounded-3xl border border-border bg-white/90 p-6 shadow-xl shadow-primary/5 backdrop-blur-md sm:p-8 lg:flex-none lg:basis-[420px]"
      >
        <div className="mb-5 flex items-center gap-2">
          <Image src="/assets/siraa-logo.png" alt="" width={36} height={36} />
          <span className="font-display text-lg font-bold text-foreground">Siraa Health</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Private · Pitch deck</span>
        <h1 id="deck-title" className="mb-2 mt-2 font-display text-3xl font-bold leading-tight text-foreground lg:text-4xl">
          Please enter your email and PIN
        </h1>
        <p className="mb-6 text-[15px] text-muted-foreground">
          This deck is shared privately. Enter your email and the PIN you received to view it.
        </p>

        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="deck-email" className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">
              Email
            </label>
            <input
              id="deck-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="deck-pin" className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">
              PIN
            </label>
            <input
              id="deck-pin"
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          {error && (
            <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !email || !pin}
            className="w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? "Checking…" : "View pitch deck"}
          </button>
        </form>
        <p className="mt-4 text-[13px] text-muted-foreground">Your email is shared only with the Siraa Health team.</p>
      </section>
    </div>
  );
}
