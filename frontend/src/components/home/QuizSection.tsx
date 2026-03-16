"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  AlertCircle,
} from "lucide-react";
import { QuizService } from "@/services/QuizService";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  childAge: yup.string().required("Child age is required"),
  symptoms: yup.array().of(yup.string()).min(1, "Select at least one option"),
  concerns: yup.string().required("This field is required"),
  parentName: yup.string().required("Name is required"),
  parentNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
});

const AGE_OPTIONS = ["0–12 months", "1–2 years", "2–4 years", "4–6 years"];

const SYMPTOM_OPTIONS = [
  "Delayed speech or not speaking as expected",
  "Difficulty making eye contact",
  "Very hyperactive or cannot sit still",
  "Difficulty understanding instructions",
  "Frequent tantrums or behavioral issues",
  "None of the above",
];

const CONCERN_OPTIONS = ["Yes", "Maybe / Not sure", "No"];

export function QuizSection() {
  const [step, setStep] = useState(0); // 0, 1, 2, 3 (Step 4 is the form)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      symptoms: [],
      childAge: "",
      concerns: "",
      parentName: "",
      parentNumber: "",
    },
  });

  const selectedAge = watch("childAge");
  const selectedSymptoms = watch("symptoms") || [];
  const selectedConcern = watch("concerns");

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 0) fieldsToValidate = ["childAge"];
    if (step === 1) fieldsToValidate = ["symptoms"];
    if (step === 2) fieldsToValidate = ["concerns"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => s + 1);
      setSubmitError(null);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const formattedData = {
        parentName: data.parentName,
        parentNumber: data.parentNumber,
        quiz: [
          {
            question: "How old is your child?",
            answer: data.childAge,
          },
          {
            question: "Have you noticed any of these in your child?",
            answer: data.symptoms,
          },
          {
            question:
              "Have teachers or family members expressed concern about your child's development?",
            answer: data.concerns,
          },
        ],
      };
      await QuizService.submitQuiz(formattedData);
      setShowResult(true);
      reset();
    } catch (error: any) {
      console.error("Submission failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSymptom = (symptom: string) => {
    const current = [...selectedSymptoms];
    if (symptom === "None of the above") {
      setValue("symptoms", ["None of the above"]);
      return;
    }

    const noneIndex = current.indexOf("None of the above");
    if (noneIndex > -1) current.splice(noneIndex, 1);

    const index = current.indexOf(symptom);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(symptom);
    }
    setValue("symptoms", current);
  };

  if (showResult) {
    return (
      <section className="py-20 bg-[#F8FAFF]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-primary/10 border border-primary/5 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
                Thank You!
              </h3>
              <p className="text-muted-foreground font-medium mb-6">
                Based on your responses, it may be helpful to have a
                developmental screening with a specialist. Early support can
                make a big difference.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#booking-form"
                className="px-8 py-4 rounded-full font-bold text-lg bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all text-center flex items-center justify-center gap-2"
              >
                Book Development Assessment
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919910731103?text=Hi%20I%20want%20to%20book%20a%20child%20assessment%20with%20Siraa%20Health"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-bold text-lg bg-secondary/20 text-foreground hover:bg-secondary/30 border-2 border-secondary transition-all text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
            <button
              onClick={() => {
                setShowResult(false);
                setStep(0);
              }}
              className="text-primary font-semibold hover:underline"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl shadow-primary/10 border border-primary/10 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

          <div className="relative z-10">
            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">
                  Step {step + 1} of 4
                </p>
                <div className="w-32 h-2.5 bg-accent rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
                      Is Your Child's Development on Track?
                    </h2>
                    <p className="text-muted-foreground font-medium text-lg">
                      Answer 4 quick questions to check if your child may
                      benefit from a developmental screening.
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-foreground mb-6">
                      How old is your child?
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {AGE_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => setValue("childAge", option)}
                          className={`w-full p-4 rounded-xl text-left font-semibold transition-all border text-base ${
                            selectedAge === option
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                      {errors.childAge && (
                        <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.childAge.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <p className="text-xl font-bold text-foreground mb-2">
                      Have you noticed any of these in your child?
                    </p>
                    <p className="text-sm text-muted-foreground font-medium mb-6">
                      Select all that apply
                    </p>
                    <div className="space-y-3">
                      {SYMPTOM_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleSymptom(option)}
                          className={`w-full p-4 rounded-xl text-left font-semibold transition-all border flex items-center gap-4 text-base ${
                            selectedSymptoms.includes(option)
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              selectedSymptoms.includes(option)
                                ? "bg-primary border-primary"
                                : "border-gray-200 bg-white"
                            }`}
                          >
                            {selectedSymptoms.includes(option) && (
                              <Check
                                className="w-4 h-4 text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>
                          {option}
                        </button>
                      ))}
                      {errors.symptoms && (
                        <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.symptoms.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <p className="text-xl font-bold text-foreground mb-6 leading-relaxed">
                      Have teachers or family members expressed concern about
                      your child's development?
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {CONCERN_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => setValue("concerns", option)}
                          className={`w-full p-4 rounded-xl text-left font-semibold transition-all border text-base ${
                            selectedConcern === option
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                      {errors.concerns && (
                        <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.concerns.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-bold text-foreground">
                      One More Step
                    </h3>
                    <p className="text-muted-foreground font-medium text-lg">
                      Tell us your details so our specialists can reach out to
                      you.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-base font-bold text-gray-700">
                        Parent Name
                      </label>
                      <input
                        {...register("parentName")}
                        placeholder="Enter your full name"
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#3B82F6] focus:bg-white outline-none transition-all"
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.parentName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-base font-bold text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                          +91
                        </span>
                        <input
                          {...register("parentNumber")}
                          placeholder="10-digit number"
                          className="w-full p-4 pl-14 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#3B82F6] focus:bg-white outline-none transition-all"
                        />
                      </div>
                      {errors.parentNumber && (
                        <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />{" "}
                          {errors.parentNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{submitError}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10">
              {step > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-foreground bg-accent/30 hover:bg-accent/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              <button
                onClick={step === 3 ? handleSubmit(onSubmit) : nextStep}
                disabled={
                  isSubmitting ||
                  (step === 0 && selectedAge === "") ||
                  (step === 1 && selectedSymptoms.length === 0) ||
                  (step === 2 && selectedConcern === "") ||
                  (step === 3 && !watch("parentName")) ||
                  (step === 3 && !watch("parentNumber"))
                }
                className="ml-auto flex items-center gap-2 px-10 py-4 rounded-2xl font-bold bg-primary text-white hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
              >
                {step === 3
                  ? isSubmitting
                    ? "Submitting..."
                    : "Complete Quiz"
                  : "Next"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
