// Landing route v6: star-clipped floating hero image, JS-fixed sidebar, premium clean layout.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLandingPage, landingSlugs, LANDING_PAGES } from "@/content/landingPages";
import { LANDING_SITE, clinicSchema, faqSchema, medicalPageSchema, breadcrumbSchema } from "@/lib/landingSeo";
import {
  LandingFAQ, LandingReviews, DesktopStickyForm, MobileBookSection, MobileCTABar, HeroStarImage,
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

/* ── Hero image mapping: 5 images across 24 pages ── */
const HERO_IMAGE_MAP: Record<string, string> = {
  // Sick child care (9 pages)
  "/child-fever-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-cough-cold-doctor-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-vomiting-diarrhea-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-breathing-difficulty-wheezing-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-ear-infection-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-skin-rash-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/child-constipation-treatment-gurgaon": "/assets/hero-sick-child.jpeg",
  "/sick-child-opd-gurgaon": "/assets/hero-sick-child.jpeg",
  "/seasonal-illness-children-gurgaon": "/assets/hero-sick-child.jpeg",
  // Vaccination (2 pages)
  "/child-vaccination-gurgaon": "/assets/hero-vaccination.jpeg",
  "/baby-vaccination-schedule-india": "/assets/hero-vaccination.jpeg",
  // Newborn & infant (3 pages)
  "/newborn-baby-doctor-gurgaon": "/assets/hero-newborn.jpeg",
  "/breastfeeding-lactation-support-gurgaon": "/assets/hero-newborn.jpeg",
  "/well-baby-checkup-gurgaon": "/assets/hero-newborn.jpeg",
  // Growth & development (4 pages)
  "/child-growth-nutrition-gurgaon": "/assets/hero-growth.jpeg",
  "/child-development-assessment-gurgaon": "/assets/hero-growth.jpeg",
  "/child-health-checkup-packages-gurgaon": "/assets/hero-growth.jpeg",
  "/school-health-checkup-gurgaon": "/assets/hero-growth.jpeg",
  // Specialist & trust (6 pages)
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
        <Star className="top-[320px] left-[5%] w-6 h-6 rotate-12" />
        <Teddy className="top-[600px] right-[3%] w-10 h-10 -rotate-6" />
        <Rocket className="top-[900px] left-[8%] w-7 h-7 rotate-[30deg]" />
        <Ball className="top-[1400px] right-[6%] w-5 h-5" />
        <Star className="top-[1800px] left-[4%] w-5 h-5 -rotate-12" />
        <Chocolate className="top-[2200px] right-[4%] w-6 h-6 rotate-6" />
        <Teddy className="top-[2800px] left-[6%] w-8 h-8 rotate-12" />
        <Rocket className="top-[3400px] right-[5%] w-6 h-6 -rotate-[20deg]" />
        <Ball className="top-[3900px] left-[3%] w-6 h-6" />
        <Star className="top-[4400px] right-[7%] w-5 h-5 rotate-45" />

        {/* ═══ TWO-COLUMN GRID ═══ */}
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div className="pb-28 lg:pb-16">

            {/* ── HERO ── */}
            <div className="relative text-white px-6 md:px-10 py-14 md:py-20 lg:rounded-b-[2.5rem]" style={{ background: "linear-gradient(135deg, #6B5B95 0%, #8B6BAF 60%, #A87BC5 100%)" }}>
              {/* Subtle circles */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/5" />
              <div className="absolute bottom-12 right-24 w-10 h-10 rounded-full bg-white/[0.03]" />

              <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-6">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span className="mx-2 opacity-40">/</span>
                <span className="text-white/80">{page.nav}</span>
              </nav>

              {/* Hero content + star image side by side on larger screens */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
                <div className="flex-1">
                  <h1 className="text-[2rem] md:text-[2.75rem] font-semibold leading-[1.15] tracking-tight">{page.h1}</h1>
                  <p className="mt-5 text-[17px] text-white/85 leading-relaxed max-w-lg">{page.heroSub}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#book" className="lg:hidden inline-flex items-center justify-center rounded-full text-white font-semibold h-12 px-7 text-sm shadow-lg shadow-black/10"
                      style={{ background: "linear-gradient(135deg, #2DBF6E, #22A05A)" }}>{page.cta}</a>
                    <a href={waHref} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-semibold h-12 px-7 text-sm shadow-lg shadow-black/10">
                      <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-2.6-.8-4.3-2.6-5.6-4.7-.7-1.2-1.1-2.5-.6-3.3.3-.5.8-.8 1.2-.8h.6c.2 0 .5-.1.7.5l.9 2.1c.1.2 0 .4-.1.6l-.5.7c-.1.2-.2.3-.1.6.6 1.1 1.6 2 2.9 2.6.3.1.5.1.6-.1l.8-1c.2-.2.4-.2.6-.1l2 1c.2.1.4.2.4.4 0 .1 0 .4-.1.3Z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                  {/* Stats */}
                  <div className="mt-10 flex gap-8 text-sm">
                    {[{ n: "4870+", l: "Families" }, { n: "20+ yrs", l: "Experience" }, { n: "IAP", l: "Certified" }].map((s) => (
                      <div key={s.l}><p className="text-xl font-bold">{s.n}</p><p className="text-white/50 text-xs mt-0.5">{s.l}</p></div>
                    ))}
                  </div>
                </div>

                {/* Star-clipped floating image */}
                <div className="mt-10 lg:mt-0">
                  <HeroStarImage src={heroImage} alt={`Pediatric ${page.nav} care at Siraa Health Gurgaon`} />
                </div>
              </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="px-5 md:px-8">

              {/* Answer block */}
              <div className="mt-12 mb-14 answer-block">
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
          <DesktopStickyForm serviceType={serviceType} pagePath={page.path} advice={page.advice} />
        </div>
      </div>
      <MobileCTABar serviceType={serviceType} pagePath={page.path} />
    </>
  );
}
