"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";
import LandingNavbar from "./LandingNavbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();

  // Special pages use AppNavbar
  const isAppPage = pathname === "/milestones/Thick-DelhiNCR" || pathname === "/vaccinations/Thick-DelhiNCR";

  if (isAppPage) {
    return <AppNavbar />;
  }

  return <LandingNavbar />;
}
