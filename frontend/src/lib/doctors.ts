import { fetchStrapi } from "./api";

export interface Doctor {
  id: number;
  name: string;
  designation: string;
  experience: number;
  image?: string;
}

export async function getDoctors(): Promise<Doctor[]> {
  try {
    const res = await fetchStrapi("/api/doctors?populate=image");

    if (!res.ok) {
      console.warn(
        "Strapi doctors endpoint returned an error. Returning fallback data.",
        res.status,
      );
      return getFallbackDoctors();
    }

    const { data } = await res.json();

    if (!data || data.length === 0) {
      return getFallbackDoctors();
    }

    return data.map((doc: any) => ({
      id: doc.id,
      name: doc.name || doc.attributes?.name,
      designation: doc.designation || doc.attributes?.designation,
      experience: doc.experience || doc.attributes?.experience,
    }));
  } catch (err) {
    console.error("Failed to fetch doctors from Strapi", err);
    return getFallbackDoctors();
  }
}

function getFallbackDoctors(): Doctor[] {
  return [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      designation: "Chief Pediatric Therapist",
      experience: 12,
    },
    {
      id: 2,
      name: "Dr. Rahul Verma",
      designation: "Senior Clinical Psychologist",
      experience: 10,
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      designation: "Speech & Language Psychologist",
      experience: 8,
    },
  ];
}
