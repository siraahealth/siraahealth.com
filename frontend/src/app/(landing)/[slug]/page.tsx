// Landing route v7: behaviourtherapy-style hero — full-width image top, text below, form sticky right.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLandingPage, landingSlugs, LANDING_PAGES } from "@/content/landingPages";
import { LANDING_SITE, clinicSchema, faqSchema, medicalPageSchema, breadcrumbSchema } from "@/lib/landingSeo";
import {
  LandingFAQ, LandingReviews, DesktopStickyForm, MobileBookSection, MobileCTABar,
  Star, Teddy, Rocket, Ball, Chocolate,
} from "@/components/landing/LandingClient";

export const dynamicParams = false;
export function generateStaticParams() { return landingSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  const url = LANDING_SITE.url + page.path;
  return {
    title: page.seoTitle, description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.seoTitle, description: page.metaDescription, url, type: "website" },
  };
}

/* ── Hero image mapping ── */
const HERO_IMAGE_MAP: Record<string, string> = {
  "/child-fever-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-cough-cold-doctor-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-vomiting-diarrhea-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-breathing-difficulty-wheezing-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-ear-infection-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-skin-rash-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-constipation-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/sick-child-opd-gurgaon": "/assets/hero-sick-child.jpeg",
  "/seasonal-illness-children-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-vaccination-gurgaon": "/assets/hero-vaccination.jpeg",
  "/baby-vaccination-schedule-india": "/assets/hero-vaccination.jpeg",
  "/newborn-baby-doctor-gurgaon": "/assets/hero-newborn.jpeg",
  "/breastfeeding-lactation-support-gurgaon": "/assets/hero-newborn.jpeg",
  "/well-baby-checkup-gurgaon": "/assets/hero-newborn.jpeg",
  "/child-growth-nutrition-gurgaon": "/assets/hero-growth.jpeg",
  "/child-development-assessment-gurgaon": "/assets/hero-growth.jpeg",
  "/child-health-checkup-packages-gurgaon": "/assets/hero-growth.jpeg",
  "/school-health-checkup-gurgaon": "/assets/hero-growth.jpeg",
  "/child-asthma-allergy-gurgaon": "/assets/hero-specialist.jpeg",
  "/child-digestive-problems-gurgaon": "/assets/hero-specialist.jpeg",
  "/child-behaviour-specialist-gurgaon": "/assets/hero-specialist.jpeg",
  "/child-sleep-problems-gurgaon": "/assets/hero-specialist.jpeg",
  "/best-pediatrician-gurgaon": "/assets/hero-specialist.jpeg",
  "/pediatrician-sector-67-gurgaon": "/assets/hero-specialist.jpeg",
};

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const schemas = [clinicSchema(), medicalPageSchema(page), faqSchema(page.faqs), breadcrumbSchema(page)];
  const serviceType = page.cta.replace(/^Book |^Get /, "");
  const waHref = `https://wa.me/${LANDING_SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like to consult a pediatrician at Siraa Health.")}`;
  const heroImage = HERO_IMAGE_MAP[page.path] || "/assets/hero-specialist.jpeg";

  return (
    <>
      <div className="bg-[#F5F0FC] text-[#2d2d2d] min-h-screen relative overflow-x-hidden" id="main">
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}

        {/* Scattered decorative elements */}
        <Star className="top-[800px] left-[5%] w-6 h-6 rotate-12" />
        <Teddy className="top-[1200px] right-[3%] w-10 h-10 -rotate-6" />
        <Rocket className="top-[1600px] left-[8%] w-7 h-7 rotate-[30deg]" />
        <Ball className="top-[2000px] right-[6%] w-5 h-5" />
        <Star className="top-[2400px] left-[4%] w-5 h-5 -rotate-12" />
        <Chocolate className="top-[2800px] right-[4%] w-6 h-6 rotate-6" />
        <Teddy className="top-[3200px] left-[6%] w-8 h-8 rotate-12" />
        <Rocket className="top-[3600px] right-[5%] w-6 h-6 -rotate-[20deg]" />

        {/* ── Trust strip (above hero) ── */}
        <div className="border-b border-[#EDD8F0] bg-white/60 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-5 py-2.5 flex items-center justify-center gap-5 flex-wrap text-[12px] text-[#2d2d2d] font-medium">
            {["Expert Pediatricians", "Personalized Care Plans", "Child-Friendly Clinic", "4870+ Families Trust Us", "Same-Day Appointments"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DBF6E]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ TWO-COLUMN GRID — starts at hero so form aligns with image ═══ */}
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div className="pb-28 lg:pb-16">

            {/* ── HERO: full-width image + text below ── */}
            <div className="overflow-hidden rounded-b-3xl lg:rounded-b-[2rem]">
              <img
                src={heroImage}
                alt={`Pediatric ${page.nav} care at Siraa Health Gurgaon`}
                className="w-full h-[280px] md:h-[380px] object-cover"
                loading="eager"
              />
            </div>

            <div className="px-5 md:px-8 pt-8">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#666] mb-5">
                <Link href="/" className="hover:text-[#1a1a1a] transition flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</Link>
                <span className="opacity-40">›</span>
                <Link href="/#pediatric-services" className="hover:text-[#1a1a1a] transition">Pediatric Care</Link>
                <span className="opacity-40">›</span>
                <span className="text-[#1a1a1a] font-medium">{page.nav}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-block rounded-full bg-[#F5F0FC] border border-[#EDD8F0] text-[#6B5B95] text-xs font-semibold px-4 py-1.5 uppercase tracking-wider">{page.nav} · Gurgaon</span>
                <a href="#book" className="lg:hidden inline-block rounded-full border border-[#E8614A] text-[#E8614A] text-xs font-semibold px-4 py-1.5 uppercase tracking-wider hover:bg-[#E8614A] hover:text-white transition">Talk to Expert for Free</a>
              </div>

              {/* H1 */}
              <h1 className="text-[1.75rem] md:text-[2.5rem] font-bold leading-[1.2] text-[#1a1a1a] mb-5">{page.h1}</h1>

              {/* Sub text */}
              <p className="text-[17px] text-[#2d2d2d] leading-relaxed max-w-xl mb-6">{page.heroSub}</p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["4870+ Families Helped", "MD Pediatricians", "IAP Certified", "Same-Day Appointments"].map((t) => (
                  <span key={t} className="rounded-full border border-[#EDD8F0] text-[#2d2d2d] text-xs font-medium px-4 py-2">{t}</span>
                ))}
              </div>

              {/* Stats bar */}
              <div className="rounded-2xl overflow-hidden flex mb-12" style={{ background: "linear-gradient(135deg, #6B5B95, #8B6BAF)" }}>
                {[{ n: "4870+", l: "Families supported" }, { n: "20+", l: "Years experience" }, { n: "IAP", l: "Certified vaccination" }].map((s, i) => (
                  <div key={s.l} className={`flex-1 text-center py-4 text-white ${i > 0 ? "border-l border-white/10" : ""}`}>
                    <p className="text-xl md:text-2xl font-bold">{s.n}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* ── CONTENT SECTIONS ── */}

              {/* Answer block */}
              <div className="mb-14 answer-block">
                <p className="text-[#E8614A] font-semibold text-lg mb-3">{page.answer.q}</p>
                <p className="text-[17px] leading-[1.75] text-[#2d2d2d]">{page.answer.a}</p>
              </div>

              {/* Symptoms */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Signs to watch</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">{page.symptomsTitle}</h2>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {page.symptoms.map((s) => (
                    <div key={s} className="flex items-start gap-3 bg-white/70 rounded-2xl px-5 py-4">
                      <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2DBF6E" opacity=".12"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#2DBF6E" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                      <span className="text-[15px] text-[#2d2d2d]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red flags */}
              <div className="mb-14 bg-white rounded-3xl p-6 md:p-8 border-l-4 border-[#C0392B]" role="alert">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Red flags</p>
                <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-2">When Should I Worry?</h2>
                <p className="text-sm text-[#666] mb-5">See a doctor immediately if your child shows any of these signs.</p>
                <div className="grid gap-2 sm:grid-cols-2 mb-6">
                  {page.redFlags.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 py-1.5">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#C0392B] mt-2" />
                      <span className="text-[15px] text-[#2d2d2d]">{f}</span>
                    </div>
                  ))}
                </div>
                <a href={`tel:${LANDING_SITE.phone}`} className="inline-flex items-center gap-2 rounded-full bg-[#C0392B] text-white font-semibold h-11 px-6 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1z"/></svg>
                  Call Siraa Health Now
                </a>
              </div>

              {/* Causes */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Understanding</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">{page.causesTitle}</h2>
                <div className="space-y-4">
                  {page.causes.map((c, i) => (
                    <div key={c} className="flex gap-4 items-start">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-[#E8614A]/10 text-[#E8614A] text-xs font-bold grid place-items-center mt-0.5">{i + 1}</span>
                      <p className="text-[15px] text-[#2d2d2d] leading-relaxed">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How we care — with lead-child.png */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Our approach</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-8">How We Care for Your Child at Siraa Health</h2>
                <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                  <div className="space-y-5">
                    {page.treatment.map((s, i) => (
                      <div key={s.title} className="flex gap-4">
                        <div className="shrink-0">
                          <div className="w-10 h-10 rounded-2xl text-white font-bold text-sm grid place-items-center" style={{ background: "linear-gradient(135deg, #E8614A, #D4527E)" }}>{String(i + 1).padStart(2, "0")}</div>
                          {i < page.treatment.length - 1 && <div className="w-px h-6 bg-[#EDD8F0] mx-auto mt-1" />}
                        </div>
                        <div className="pb-2"><p className="font-semibold text-[#1a1a1a] mb-1">{s.title}</p><p className="text-[15px] text-[#2d2d2d] leading-relaxed">{s.desc}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(107,91,149,0.12)]">
                    <Image src="/assets/lead-child.png" alt="Child receiving care at Siraa Health" width={500} height={600} className="w-full h-auto object-cover" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                      <p className="text-sm font-semibold text-[#1a1a1a]">Evidence-based care</p>
                      <p className="text-xs text-[#666]">Every decision guided by the latest pediatric science</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home care */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">At home</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">{page.homeCareTitle}</h2>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {page.homeCare.map((s) => (
                    <div key={s} className="flex items-start gap-3 bg-white/70 rounded-2xl px-5 py-4">
                      <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#2DBF6E" opacity=".12"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#2DBF6E" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                      <span className="text-[15px] text-[#2d2d2d]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Parent stories</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">What families say</h2>
                <LandingReviews />
              </div>

              {/* FAQ */}
              <div className="mb-14">
                <p className="text-[#6B5B95] text-xs font-semibold uppercase tracking-wider mb-2">Questions</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-6">What parents usually ask us</h2>
                <LandingFAQ faqs={page.faqs} />
              </div>

              {/* Mobile booking */}
              <div id="book" className="mb-14">
                <MobileBookSection serviceType={serviceType} pagePath={page.path} />
                <div className="mt-5 text-center text-sm text-[#666]">
                  <p>{LANDING_SITE.address} · {LANDING_SITE.hours}</p>
                  <a href={`tel:${LANDING_SITE.phone}`} className="font-semibold text-[#6B5B95] mt-1 inline-block">{LANDING_SITE.phone}</a>
                </div>
              </div>

              {/* Related */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">Related Care</h2>
                <div className="flex flex-wrap gap-2.5">
                  {page.related.map((r) => {
                    const rp = LANDING_PAGES.find((p) => p.path === r);
                    return rp ? (
                      <Link key={r} href={r} className="rounded-full bg-white border border-[#EDD8F0] text-[#1a1a1a] font-medium px-5 py-2.5 text-sm hover:border-[#6B5B95] hover:bg-[#F5F0FC] transition">
                        {rp.nav}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: Fixed form ════ */}
          <DesktopStickyForm serviceType={serviceType} pagePath={page.path} />
        </div>
      </div>
      <MobileCTABar serviceType={serviceType} pagePath={page.path} />
    </>
  );
}
