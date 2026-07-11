"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
import { bookingSchema } from "@/validation/booking-schema";
import { pushEvent } from "@/utils/gtm";

const frontendService = new FrontendService();

// Define the form data type to match exactly what react-hook-form expects
interface IBookingFormData {
  parent_name: string;
  phone_number: string;
  child_age?: string;
  primary_concern?: string;
  consent: boolean;
}

export function BookingForm() {
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
  } = useForm<IBookingFormData>({
    resolver: yupResolver(bookingSchema) as any,
    defaultValues: {
      parent_name: "",
      phone_number: "",
      child_age: "",
      primary_concern: "",
      consent: true,
    },
  });

  const onSubmit = async (data: IBookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    pushEvent("appointment_form_submit_attempt", {
      child_age: data.child_age || "",
      primary_concern: data.primary_concern || "",
    });

    try {
      await frontendService.createBooking(data);
      setSubmitStatus("success");
      pushEvent("appointment_booking_success", {
        child_age: data.child_age || "",
        primary_concern: data.primary_concern || "",
      });
      pushEvent("form_submit", {
        form_name: "booking_form",
        page_family: "homepage_vaccination",
        primary_concern: data.primary_concern || "",
      });
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      pushEvent("appointment_booking_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-24">
      {submitStatus === "success" ? (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Booking Request Received!
          </h3>
          <p className="text-muted-foreground font-medium mb-8">
            Thank you for reaching out. Our team will contact you shortly to
            confirm your appointment.
          </p>
          <Button
            onClick={() => setSubmitStatus("idle")}
            className="rounded-full px-8 py-6 h-auto text-lg font-bold"
          >
            Book Another Appointment
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-primary/5 animate-fade-in-up">
          <div className="mb-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Request an Appointment
            </h3>
            <p className="text-muted-foreground font-medium">
              Fill in the details below and we'll get back to you shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="parent_name"
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >
                Parent's Name *
              </Label>
              <Input
                id="parent_name"
                placeholder="e.g. Rahul Sharma"
                {...register("parent_name")}
                className={`rounded-xl py-6 border-2 transition-all ${
                  errors.parent_name
                    ? "border-red-200 bg-red-50"
                    : "border-border hover:border-primary/30"
                }`}
              />
              {errors.parent_name && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />{" "}
                  {errors.parent_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone_number"
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >
                Phone Number *
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
                  +91
                </span>
                <Input
                  id="phone_number"
                  placeholder="9876543210"
                  {...register("phone_number")}
                  className={`rounded-xl py-6 pl-14 border-2 transition-all ${
                    errors.phone_number
                      ? "border-red-200 bg-red-50"
                      : "border-border hover:border-primary/30"
                  }`}
                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />{" "}
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="child_age"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Child's Age
                </Label>
                <Controller
                  name="child_age"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={`rounded-xl h-14 border-2 transition-all font-medium ${
                          errors.child_age
                            ? "border-red-200 bg-red-50"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 bg-white shadow-2xl z-[9999]">
                        <SelectItem
                          value="0-12 Months"
                          className="py-3 cursor-pointer"
                        >
                          0-12 Months
                        </SelectItem>
                        <SelectItem
                          value="1-2 Years"
                          className="py-3 cursor-pointer"
                        >
                          1-2 Years
                        </SelectItem>
                        <SelectItem
                          value="2-3 Years"
                          className="py-3 cursor-pointer"
                        >
                          2-3 Years
                        </SelectItem>
                        <SelectItem
                          value="3-5 Years"
                          className="py-3 cursor-pointer"
                        >
                          3-5 Years
                        </SelectItem>
                        <SelectItem
                          value="5-8 Years"
                          className="py-3 cursor-pointer"
                        >
                          5-8 Years
                        </SelectItem>
                        <SelectItem
                          value="8+ Years"
                          className="py-3 cursor-pointer"
                        >
                          8+ Years
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.child_age && (
                  <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />{" "}
                    {errors.child_age.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="primary_concern"
                  className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Primary Concern
                </Label>
                <Controller
                  name="primary_concern"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={`rounded-xl h-14 border-2 transition-all font-medium ${
                          errors.primary_concern
                            ? "border-red-200 bg-red-50"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <SelectValue placeholder="Select primary concern" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 bg-white shadow-2xl z-[9999]">
                        <SelectItem
                          value="Speech Delays"
                          className="py-3 cursor-pointer"
                        >
                          Speech Delays
                        </SelectItem>
                        <SelectItem
                          value="Autism"
                          className="py-3 cursor-pointer"
                        >
                          Autism
                        </SelectItem>
                        <SelectItem
                          value="Behavioural Issue"
                          className="py-3 cursor-pointer"
                        >
                          Behavioural Issue
                        </SelectItem>
                        <SelectItem
                          value="Motor Skills /Development"
                          className="py-3 cursor-pointer"
                        >
                          Motor Skills /Development
                        </SelectItem>
                        <SelectItem
                          value="Not Sure - Need Assessment"
                          className="py-3 cursor-pointer"
                        >
                          Not Sure - Need Assessment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.primary_concern && (
                  <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />{" "}
                    {errors.primary_concern.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input
                    id="consent"
                    type="checkbox"
                    {...register("consent")}
                    className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-primary h transition-all"
                  />
                </div>
                <Label
                  htmlFor="consent"
                  className="text-sm text-muted-foreground leading-tight cursor-pointer"
                >
                  I consent to receiving WhatsApp updates and calls regarding my
                  appointment request.
                </Label>
              </div>
              {errors.consent && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-2">
                  <AlertCircle className="w-3 h-3" /> {errors.consent.message}
                </p>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-bold">
                  Something went wrong. Please try again or call us directly.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full w-full font-bold text-lg bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Booking Request"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
