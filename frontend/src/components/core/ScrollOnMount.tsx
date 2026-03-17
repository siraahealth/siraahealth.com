"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/utils/scroll";

/**
 * Mount this component on any page that contains scroll-target sections.
 * On mount it checks sessionStorage for a pending scroll request left by
 * ScrollButton after cross-page navigation, clears it, and scrolls to
 * the target section.
 *
 * Returns null — renders nothing.
 */
export function ScrollOnMount() {
  useEffect(() => {
    const sectionId = sessionStorage.getItem("pendingScrollSection");
    if (!sectionId) return;

    sessionStorage.removeItem("pendingScrollSection");

    // Small delay lets the page fully paint before scrolling
    const timer = setTimeout(() => scrollToSection(sectionId), 300);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
