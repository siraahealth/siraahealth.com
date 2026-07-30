"use client";

import { createContext, useContext, useMemo } from "react";

interface PhoneNumberContextValue {
  phoneNumber: string;
  formattedPhoneNumber: string;
  whatsappUrl: string;
}

const PhoneNumberContext = createContext<PhoneNumberContextValue | null>(null);

/**
 * Wraps the app (mounted once in the root layout) with the phone number
 * fetched server-side from Strapi's site-setting Single Type. This is the
 * single source of truth for every Client Component on the site — change
 * the number in Strapi, and every consumer of usePhoneNumber() picks it up
 * on the next page load (subject to the 5-minute revalidation window).
 */
export function PhoneNumberProvider({
  phoneNumber,
  children,
}: {
  phoneNumber: string;
  children: React.ReactNode;
}) {
  const value = useMemo(() => {
    const formattedPhoneNumber = phoneNumber.replace(
      /(\+91)(\d{5})(\d{5})/,
      "$1 $2 $3",
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20I%20want%20to%20book%20a%20child%20assessment%20with%20Siraa%20Health`;
    return { phoneNumber, formattedPhoneNumber, whatsappUrl };
  }, [phoneNumber]);

  return (
    <PhoneNumberContext.Provider value={value}>
      {children}
    </PhoneNumberContext.Provider>
  );
}

/**
 * Client Component hook for the site-wide phone number. Use this instead of
 * importing the old static PHONE_NUMBER constant from utils/contant.ts —
 * that constant is now only a build-time fallback, not the live value.
 */
export function usePhoneNumber(): PhoneNumberContextValue {
  const ctx = useContext(PhoneNumberContext);
  if (!ctx) {
    throw new Error(
      "usePhoneNumber() must be used within <PhoneNumberProvider> (mounted in the root layout).",
    );
  }
  return ctx;
}
