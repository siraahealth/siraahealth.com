"use client";

import { useEffect, useRef } from "react";
import { scrollToSection } from "@/utils/scroll";
import { usePathname } from "next/navigation";

/**
 * Mount this component on any page that contains scroll-target sections.
 * On mount it checks sessionStorage for a pending scroll request left by
 * ScrollButton after cross-page navigation, clears it, and scrolls to
 * the target section.
 *
 * Returns null — renders nothing.
 */
export default function ScrollOnMount() {
  const pathName = usePathname();
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionId = sessionStorage.getItem("pendingScrollSection");
    if (!sectionId) return;

    sessionStorage.removeItem("pendingScrollSection");

    // Small delay lets the page fully paint before scrolling
    ref.current = setTimeout(() => {
      scrollToSection(sectionId);
    }, 1000);
    return () => {
      ref.current && clearTimeout(ref.current);
    };
  }, [pathName]);

  return null;
}
