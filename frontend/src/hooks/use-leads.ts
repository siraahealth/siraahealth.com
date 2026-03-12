import { useMutation } from "@tanstack/react-query";
import { fetchStrapi } from "@/lib/api";

export type LeadInput = Record<string, any>;
export type LeadResponse = any;
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation<LeadResponse, Error, LeadInput>({
    mutationFn: async (data: LeadInput) => {
      // Wrap data in Strapi's { data: ... } format
      const res = await fetchStrapi("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ data }),
      });

      if (!res.ok) {
        let errorMessage = "Failed to submit request";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Ignore parsing error
        }
        throw new Error(errorMessage);
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment Booked Successfully!",
        description: "One of our child specialists will contact you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
}
