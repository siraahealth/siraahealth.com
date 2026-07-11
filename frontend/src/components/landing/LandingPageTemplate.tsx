"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ChevronRight, Phone, ArrowRight, X } from "lucide-react";
import {
  LandingLeadForm, LandingExitPopup, TrustBar, LandingBreadcrumb,
  FAQItem, HowItWorks, TestimonialCard, DoctorQuote, Eyebrow, InternalLinks,
} from "@/components/landing/LandingComponents";

export interface LandingPageData {
  url?: string; breadcrumb: string; eyebrow: string; concern: string;
  h1First: string; h1Accent: string; subtext: string; ctaLabel: string;
  sourcePrefix: string; seoTitle?: string; metaDescription?: string;
  stats: { val: string; label: string }[];
  symptoms: string[]; whatChanges: string[];
  whatGains: { title: string; desc: string }[];
  steps: { num: string; title: string; desc: string }[];
  whatToExpect: string[]; whySiraa: string[];
  testimonials: { name: string; location: string; child: string; text: string; rating: number }[];
  faqs: { q: string; a: string }[];
  internalLinks: { href: string; label: string }[];
  doctorQuote: { quote: string; name: string; title: string; initials: string };
  symptomsHeading?: string; whatChangesHeading?: string; whatGainsHeading?: string;
  howItWorksHeading?: string; whatToExpectHeading?: string; whySiraaHeading?: string; testimonialsHeading?: string;
}

export function LandingPageTemplate({ data }: { data: LandingPageData }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      <LandingExitPopup source={`exit_popup_${data.sourcePrefix}`} defaultConcern={data.concern} />
      <TrustBar />
      <LandingBreadcrumb label={data.breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:items-start py-10 lg:py-16">
          <div className="min-w-0">

            <section className="mb-12">
              <Eyebrow>{data.eyebrow}</Eyebrow>
              <h1 className="font-display font-bold text-[32px] lg:text-[42px] text-foreground leading-[1.15] mb-5">
                {data.h1First} <span className="text-primary">{data.h1Accent}</span>
              </h1>
              <p className="text-[17px] text-muted-foreground leading-relaxed mb-6 max-w-2xl">{data.subtext}</p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
                {data.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display font-bold text-[24px] text-primary">{s.val}</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>What parents notice</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-2">{data.symptomsHeading ?? "Signs that parents and teachers often notice"}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">If any of these sound familiar, a professional assessment is the right next step.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.symptoms.map((s) => (
                  <div key={s} className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                    <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5"></div>
                    <span className="text-[14px] text-foreground leading-snug">{s}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 bg-blue-50 rounded-2xl p-6 lg:p-8 border border-blue-100">
              <Eyebrow>What changes</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-6">{data.whatChangesHeading ?? "What changes when you get the right support"}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.whatChanges.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] text-foreground leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>What your child actually gains</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-6">{data.whatGainsHeading ?? "More than just the presenting concern"}</h2>
              <div className="flex flex-col gap-4">
                {data.whatGains.map((g, i) => (
                  <div key={g.title} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border/50 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-display font-bold text-primary text-[13px]">{i + 1}</div>
                    <div>
                      <div className="font-semibold text-[15px] text-foreground mb-0.5">{g.title}</div>
                      <div className="text-[13px] text-muted-foreground leading-relaxed">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-2">{data.howItWorksHeading ?? "A clear process from first call to real results"}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">No surprises. A team that keeps you informed at every step.</p>
              <HowItWorks steps={data.steps} />
            </section>

            <section className="mb-12 bg-[#FDFCF8] rounded-2xl p-6 lg:p-8 border border-border/40">
              <Eyebrow>What to expect when you start</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-6">{data.whatToExpectHeading ?? "Your first month at Siraa Health"}</h2>
              <div className="flex flex-col gap-3">
                {data.whatToExpect.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-border/40 last:border-none">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-[14px] text-foreground leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>Why Siraa Health</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-2">{data.whySiraaHeading ?? "What sets us apart from other clinics in Gurgaon"}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">4870 plus families chose Siraa Health. Here is why.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.whySiraa.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-[14px] text-foreground leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>Parent stories</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-6">{data.testimonialsHeading ?? "Families who were in your position"}</h2>
              <div className="flex flex-col gap-5">
                {data.testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
              </div>
            </section>

            <section className="mb-12">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="font-display font-bold text-[26px] text-foreground mb-6">What parents usually ask us</h2>
              <div className="rounded-2xl bg-white border border-border/50 px-6 shadow-sm">
                {data.faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

            <InternalLinks links={data.internalLinks} />

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 bg-white overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
              <button onClick={() => setShowModal(true)} className="flex-1 bg-primary text-white font-bold text-[13px] flex items-center justify-center gap-2 px-4 cursor-pointer border-0 outline-none" style={{clipPath:"polygon(0 0, 90% 0, 75% 100%, 0 100%)"}}>
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>Book Appointment</span>
              </button>
              <a href="tel:+919910731103" className="w-36 bg-white text-foreground font-bold text-[13px] flex items-center justify-center gap-1 pr-3">
                <span>Call Now</span>
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
              </a>
            </div>

            <div className="lg:hidden mb-12 mt-8" ref={formRef}>
              <div className="rounded-2xl bg-white border border-border/50 shadow-lg p-6">
                <LandingLeadForm source={`${data.sourcePrefix}_mobile`} defaultConcern={data.concern} ctaLabel={data.ctaLabel} />
              </div>
            </div>
          </div>

          <div className="hidden lg:block" ref={formRef}>
            <div className="sticky top-24">
              <div className="rounded-2xl bg-white border border-border/50 shadow-xl shadow-black/5 p-6">
                <LandingLeadForm source={`${data.sourcePrefix}_sticky`} defaultConcern={data.concern} ctaLabel={data.ctaLabel} />
              </div>
              <div className="mt-4">
                <DoctorQuote quote={data.doctorQuote.quote} name={data.doctorQuote.name} title={data.doctorQuote.title} initials={data.doctorQuote.initials} />
              </div>
              <div className="mt-4 p-4 rounded-xl border border-border/40 text-center">
                <p className="text-[12px] text-muted-foreground mb-1">Prefer to call?</p>
                <a href="tel:+919910731103" className="font-bold text-[16px] text-primary hover:text-primary/80 transition-colors">+91 99107 31103</a>
                <p className="text-[11px] text-muted-foreground mt-0.5">Mon to Sat, 9am to 7pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="font-display font-bold text-[22px] text-foreground mb-1">Book a Free Assessment</h3>
                  <p className="text-muted-foreground text-[13px] mb-4">No waiting list. We respond within 2 hours.</p>
                  <LandingLeadForm source={`${data.sourcePrefix}_modal`} defaultConcern={data.concern} ctaLabel={data.ctaLabel} />
                </div>
              </div>
            )}

    </>
  );
}
