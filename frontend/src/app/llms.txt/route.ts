function envOrDefault(value: string | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function toUrlList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function GET() {
  const baseUrl = envOrDefault(
    process.env.NEXT_PUBLIC_FRONTEND_URL,
    "https://sirrahealth.com",
  ).replace(/\/+$/, "");

  const phone = envOrDefault(
    process.env.NEXT_PUBLIC_PHONE_NUMBER,
    "+91 99107 31103",
  );

  const email = envOrDefault(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    "siraahealthinfo@gmail.com",
  );

  const instagram =
    envOrDefault(
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      "https://www.instagram.com/SiraaHealth",
    ) || "";

  const facebook =
    envOrDefault(
      process.env.NEXT_PUBLIC_FACEBOOK_URL,
      "https://www.facebook.com/people/Siraababy/61587920614614",
    ) || "";

  const extraSocials = toUrlList(process.env.NEXT_PUBLIC_SOCIAL_URLS);
  const socials = [instagram, facebook, ...extraSocials].filter(Boolean);

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
