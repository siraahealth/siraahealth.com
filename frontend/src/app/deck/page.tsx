import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DECK_COOKIE, verifyDeckToken } from "@/lib/deckAuth";
import DeckGate from "./DeckGate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pitch Deck",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function DeckPage() {
  const cookieStore = await cookies();
  const email = verifyDeckToken(cookieStore.get(DECK_COOKIE)?.value);
  return <DeckGate initiallyUnlocked={!!email} />;
}
