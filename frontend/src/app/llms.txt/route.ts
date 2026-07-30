import { getSiteSettings } from "@/lib/siteSettings";

function toUrlList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const { phoneNumber: phone } = await getSiteSettings();

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  const instagram = "https://www.instagram.com/SiraaHealth";

  const facebook = "https://www.facebook.com/people/Siraababy/61587920614614";

  const socials = [instagram, facebook];

  const lines = [
    "LLMs.txt",
    "Site: Siraa Health",
    `URL: ${baseUrl}`,
    "Purpose: Provide public information for search and AI systems.",
    "",
    "Summary:",
    "Siraa Health is a pediatric therapy and vaccination clinic in Gurgaon, Haryana, India.",
    "We focus on early screening, milestone assessments, and child-friendly vaccination care.",
    "",
    "Services:",
    "- Developmental milestones assessment",
    "- Pediatric therapy for speech delay, autism, and developmental delays",
    "- Pediatric vaccinations",
    "",
    "Location:",
    "Golf course road",
    "Gurgaon, Haryana, India",
    "",
    "Contact:",
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "Hours:",
    "Mon-Sat 09:00-19:00",
    "Sun Closed",
    "",
    "Social:",
    ...socials.map((url) => `- ${url}`),
    "",
    "Allowed: /",
    "Disallowed:",
    "",
    "Primary pages:",
    `${baseUrl}/`,
    `${baseUrl}/milestones/Thick-DelhiNCR`,
    `${baseUrl}/vaccinations/Thick-DelhiNCR`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
