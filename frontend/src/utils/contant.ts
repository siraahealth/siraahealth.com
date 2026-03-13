export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export const formattedPhoneNumber =
  PHONE_NUMBER?.replace(/(\+91)(\d{5})(\d{5})/, "$1 $2 $3") || null;
