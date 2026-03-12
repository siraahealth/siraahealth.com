"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export function DevelopmentQuiz() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [expertConcern, setExpertConcern] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const ageOptions = ["0–12 months", "1–2 years", "2–4 years", "4–6 years"];
  const concernOptions = [
    "Delayed speech or not speaking as expected",
    "Difficulty making eye contact",
    "Very hyperactive or cannot sit still",
    "Difficulty understanding instructions",
    "Frequent tantrums or behavioral issues",
    "None of the above",
  ];

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter((c) => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleNext = () => {
    if (step === 0 && !age) return;
    if (step === 1 && concerns.length === 0) return;
    if (step === 2 && !expertConcern) return;

    if (step < 2) {
      setStep(step + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFormComplete = () => {
    setShowForm(false);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-primary/10 border border-primary/5 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
            Thank You!
          </h3>
          <p className="text-muted-foreground font-medium mb-6">
            Based on your responses, it may be helpful to have a developmental screening with a specialist. Early support can make a big difference.
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
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-primary/10 border border-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="relative z-10 mb-6">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
            One More Step
          </h3>
          <p className="text-muted-foreground font-medium">
            Tell us your details so our specialists can reach out to you.
          </p>
        </div>

        <div className="relative z-10 w-full h-[600px] sm:h-[700px] rounded-xl overflow-hidden">
          <iframe
            src="https://forms.gle/bGk7rSAPB6zkZg5g7"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-xl"
          >
            Loading…
          </iframe>
        </div>

        <div className="relative z-10 mt-6 text-center">
          <button
            onClick={handleFormComplete}
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Skip and View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-primary/10 border border-primary/5 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

      <div className="relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-primary">Step {step + 1} of 3</p>
            <div className="w-32 h-2 bg-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Is Your Child's Development on Track?
              </h2>
              <p className="text-muted-foreground font-medium">
                Answer 3 quick questions to check if your child may benefit from a developmental screening.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-foreground mb-4">How old is your child?</p>
              <div className="space-y-3">
                {ageOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAge(option)}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                      age === option
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-lg font-semibold text-foreground mb-4">
                Have you noticed any of these in your child?
              </p>
              <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
              <div className="space-y-3">
                {concernOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleConcern(option)}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                      concerns.includes(option)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={concerns.includes(option)}
                      onChange={() => toggleConcern(option)}
                      className="mr-3"
                    />
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-lg font-semibold text-foreground mb-4">
                Have teachers or family members expressed concern about your child's development?
              </p>
              <div className="space-y-3">
                {["Yes", "Maybe / Not sure", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setExpertConcern(option)}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                      expertConcern === option
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-accent/30 text-foreground hover:border-primary/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground bg-accent/30 hover:bg-accent/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={
              (step === 0 && !age) || (step === 1 && concerns.length === 0) || (step === 2 && !expertConcern)
            }
            className="ml-auto flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-primary text-white hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {step === 2 ? "Complete Quiz" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
