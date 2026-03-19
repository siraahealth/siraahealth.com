export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export const formattedPhoneNumber =
  PHONE_NUMBER?.replace(/(\+91)(\d{5})(\d{5})/, "$1 $2 $3") || "";

export const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=Hi%20I%20want%20to%20book%20a%20child%20assessment%20with%20Siraa%20Health`;
