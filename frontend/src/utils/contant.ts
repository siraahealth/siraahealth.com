import { VaccinationAdvantageItem } from "@/components/swipers/VaccinationAdvantageSwiper";
import { CheckCircle, Heart, Shield, Users } from "lucide-react";

export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

export const formattedPhoneNumber =
  PHONE_NUMBER?.replace(/(\+91)(\d{5})(\d{5})/, "$1 $2 $3") || null;

export const advantages: VaccinationAdvantageItem[] = [
  {
    title: "Prevent Dangerous Diseases",
    description:
      "Vaccines protect children from diseases like measles, polio, and pneumonia.",
    icon: Shield,
  },
  {
    title: "Build Strong Immunity",
    description: "Vaccines train the immune system to fight infections early.",
    icon: Heart,
  },
  {
    title: "Protect the Community",
    description: "Vaccination prevents outbreaks and protects other children.",
    icon: Users,
  },
  {
    title: "Safe & Well Tested",
    description: "Vaccines are carefully tested and monitored for safety.",
    icon: CheckCircle,
  },
];
