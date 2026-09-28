"use client";

import { usePathname } from "next/navigation";

// Pages that render full-screen without the site navbar, footer and popups.
const BARE_ROUTES = ["/deck"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) return null;
  return <>{children}</>;
}
