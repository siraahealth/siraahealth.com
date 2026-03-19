"use client";

import { pushEvent } from "@/utils/gtm";

/**
 * Client island — a clickable tel: phone link that fires a GTM phone_call_click event.
 * Keeps the parent Footer as a server component.
 */
export function FooterPhoneLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      onClick={() => pushEvent("phone_call_click", { source: "footer" })}
      className="hover:text-primary transition-colors"
    >
      {label}
    </a>
  );
}
