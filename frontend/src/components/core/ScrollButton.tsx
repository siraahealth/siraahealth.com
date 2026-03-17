"use client";

import { useRouter } from "next/navigation";
import { scrollToSection } from "@/utils/scroll";

interface ScrollButtonProps {
  /** The id of the section element to scroll to on the current page. */
  sectionId: string;
  /**
   * Optional — the page path that contains the target section (e.g. "/").
   * Required when this button may be rendered on a different page than the target section.
   * When the element is not found on the current page, the user is navigated here
   * and ScrollOnMount will complete the scroll after the page loads.
   */
  href?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A client component button that smooth-scrolls to a given section id.
 * Handles both same-page scroll and cross-page navigation + scroll.
 */
export function ScrollButton({ sectionId, href, className, children }: ScrollButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Element is on the current page — scroll directly
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href) {
      // Element is on another page — store intent and navigate
      sessionStorage.setItem("pendingScrollSection", sectionId);
      router.push(href);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
