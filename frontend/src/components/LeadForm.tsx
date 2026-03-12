import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateLead } from "@/hooks/use-leads";

const insertLeadSchema = z.object({
  parentName: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  childAge: z.string().min(1, "Please select an age group"),
  concern: z.string().min(1, "Please select a primary concern"),
});

type LeadInput = z.infer<typeof insertLeadSchema>;
import { Loader2, CalendarHeart, User, Phone, ClipboardList } from "lucide-react";

export function LeadForm() {
  const { mutate: createLead, isPending } = useCreateLead();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      parentName: "",
      phoneNumber: "",
      childAge: "",
      concern: "",
    },
  });

  const onSubmit = (data: LeadInput) => {
    createLead(data, {
      onSuccess: () => {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      },
    });
  };

  return (
    <div id="booking-form" className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-primary/10 border border-primary/5 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Book a Development Assessment
          </h3>
          <p className="text-muted-foreground mt-2 font-medium">
            Take the first step towards your child's brighter future.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarHeart className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display mb-2">Request Received!</h4>
            <p>Thank you. Our child specialist will call you within 24 hours to schedule the assessment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Parent's Name
              </label>
              <input
                {...register("parentName")}
                className="w-full px-4 py-3 rounded-xl bg-accent/30 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                placeholder="Enter your full name"
              />
              {errors.parentName && (
                <p className="text-destructive text-sm font-medium">{errors.parentName.message as string}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                className="w-full px-4 py-3 rounded-xl bg-accent/30 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                placeholder="10-digit mobile number"
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-sm font-medium">{errors.phoneNumber.message as string}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                  <CalendarHeart className="w-4 h-4 text-primary" /> Child's Age
                </label>
                <select
                  {...register("childAge")}
                  className="w-full px-4 py-3 rounded-xl bg-accent/30 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                >
                  <option value="">Select Age</option>
                  <option value="0-12 months">0-12 Months</option>
                  <option value="1-2 years">1-2 Years</option>
                  <option value="2-3 years">2-3 Years</option>
                  <option value="3-5 years">3-5 Years</option>
                  <option value="5-8 years">5-8 Years</option>
                  <option value="8+ years">8+ Years</option>
                </select>
                {errors.childAge && (
                  <p className="text-destructive text-sm font-medium">{errors.childAge.message as string}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-primary" /> Primary Concern
                </label>
                <select
                  {...register("concern")}
                  className="w-full px-4 py-3 rounded-xl bg-accent/30 border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                >
                  <option value="">Select Concern</option>
                  <option value="Speech Delay">Speech Delay</option>
                  <option value="Autism Screening">Autism Screening</option>
                  <option value="Behavioral Issues">Behavioral Issues</option>
                  <option value="Motor Skills / Development">Motor Skills / Development</option>
                  <option value="Not Sure - Need Assessment">Not Sure - Need Assessment</option>
                </select>
                {errors.concern && (
                  <p className="text-destructive text-sm font-medium">{errors.concern.message as string}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Booking...
                </>
              ) : (
                "Book Assessment Now"
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Secure & Confidential. Your data is safe.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
