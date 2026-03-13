"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { FrontendService } from "@/services/FrontendService";
import { vaccinationBookingSchema } from "@/validation/vaccination-booking-schema";

const frontendService = new FrontendService();

interface IVaccinationFormData {
  parent_name: string;
  phone_number: string;
  child_age?: string;
}

export function VaccinationBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IVaccinationFormData>({
    resolver: yupResolver(vaccinationBookingSchema) as any,
    defaultValues: {
      parent_name: "",
      phone_number: "",
      child_age: "",
    },
  });

  const onSubmit = async (data: IVaccinationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // We pass the data to createVaccinationBooking
      await frontendService.createVaccinationBooking(data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 text-center animate-fade-in-up h-full flex flex-col justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-4">
          Booking Request Received!
        </h3>
        <p className="text-muted-foreground font-medium mb-8">
          Thank you for choosing Siraa Health. Our team will contact you within
          24 hours to confirm your vaccination appointment.
        </p>
        <Button
          onClick={() => setSubmitStatus("idle")}
          className="rounded-full px-8 py-6 h-auto text-lg font-bold"
        >
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-primary/5 animate-fade-in-up">
      <div className="mb-6 text-center">
        <h3 className="text-xl lg:text-2xl font-display font-bold text-blue-600 mb-2">
          Book Vaccination Appointment
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          Quick & easy scheduling for your child
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="parent_name"
            className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            Parent Name *
          </Label>
          <Input
            id="parent_name"
            placeholder="Enter your name"
            {...register("parent_name")}
            className={`rounded-xl h-12 border-2 transition-all ${
              errors.parent_name
                ? "border-red-200 bg-red-50"
                : "border-border hover:border-blue-300"
            }`}
          />
          {errors.parent_name && (
            <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.parent_name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="phone_number"
            className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            Mobile Number *
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">
              +91
            </span>
            <Input
              id="phone_number"
              placeholder="98765 43210"
              {...register("phone_number")}
              className={`rounded-xl h-12 pl-12 border-2 transition-all ${
                errors.phone_number
                  ? "border-red-200 bg-red-50"
                  : "border-border hover:border-blue-300"
              }`}
            />
          </div>
          {errors.phone_number && (
            <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone_number.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="child_age"
            className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            Child's Age
          </Label>
          <Controller
            name="child_age"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`rounded-xl h-12 border-2 transition-all font-medium text-sm ${
                    errors.child_age
                      ? "border-red-200 bg-red-50"
                      : "border-border hover:border-blue-300"
                  }`}
                >
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 bg-white shadow-2xl z-[9999]">
                  <SelectItem
                    value="0-6 Months"
                    className="py-2.5 cursor-pointer text-sm"
                  >
                    0-6 Months
                  </SelectItem>
                  <SelectItem
                    value="6-12 Months"
                    className="py-2.5 cursor-pointer text-sm"
                  >
                    6-12 Months
                  </SelectItem>
                  <SelectItem
                    value="1-2 Years"
                    className="py-2.5 cursor-pointer text-sm"
                  >
                    1-2 Years
                  </SelectItem>
                  <SelectItem
                    value="2-5 Years"
                    className="py-2.5 cursor-pointer text-sm"
                  >
                    2-5 Years
                  </SelectItem>
                  <SelectItem
                    value="5+ Years"
                    className="py-2.5 cursor-pointer text-sm"
                  >
                    5+ Years
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {submitStatus === "error" && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-[10px] font-bold leading-tight">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-xl w-full font-bold text-lg bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all text-center flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Book Now"
          )}
        </Button>

        <div className="pt-1">
          <div className="flex mx-auto items-center w-fit gap-2">
            <div className="flex items-center h-4 pt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-[14px] text-muted-foreground leading-tight cursor-pointer font-medium">
              Your data is secure. No spam.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
