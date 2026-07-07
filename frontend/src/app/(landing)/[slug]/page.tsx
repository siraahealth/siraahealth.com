// Dynamic landing route v3: matches behaviourtherapy/thick-DelhiNCR layout exactly.
// Two-column (content + sticky form), bottom drawer, 15s popup, 2-field forms, auto-submit, thank-you page.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLandingPage, landingSlugs, LANDING_PAGES } from "@/content/landingPages";
import { LANDING_SITE, clinicSchema, faqSchema, medicalPageSchema, breadcrumbSchema } from "@/lib/landingSeo";
import {
  LandingFAQ, LandingReviews, DesktopStickyForm, MobileBookSection, LandingPageWrapper,
} from "@/components/landing/LandingClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  const url = LANDING_SITE.url + page.path;
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: page.seoTitle, description: page.metaDescription, url, type: "website" },
  };
}

/* ── Section wrapper ── */
const Section = ({ id, title, eyebrow, label, tone, children }: {
  id?: string; title?: string; eyebrow?: string; label?: string; tone?: "tint"; children: React.ReactNode;
}) => (
  <section id={id} className={`py-10 md:py-14 ${tone === "tint" ? "bg-[#FDF0F0]/60 rounded-3xl px-5 md:px-8 my-4" : ""}`}>
    {label && <div className="inline-block rounded-full bg-[#F5F0FC] border border-[#EDD8F0] text-[#6B5B95] text-xs font-semibold px-3 py-1 mb-3 uppercase tracking-wide">{label}</div>}
    {eyebrow && <p className="text-[#E8614A] font-semibold uppercase tracking-wide text-sm mb-2">{eyebrow}</p>}
    {title && <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#1a1a1a]">{title}</h2>}
    {children}
  </section>
);

/* ── Checklist ── */
const Check = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3 sm:grid-cols-2">
    {items.map((s) => (
      <li key={s} className="flex items-start gap-3 rounded-2xl bg-white border border-[#EDD8F0] p-4">
        <span aria-hidden="true" className="text-[#2DBF6E] mt-0.5">✔</span><span className="text-[#2d2d2d]">{s}</span>
      </li>
    ))}
  </ul>
);

/* ── Numbered steps ── */
const Steps = ({ steps }: { steps: { title: string; desc: string }[] }) => (
  <ol className="space-y-4">
    {steps.map((s, i) => (
      <li key={s.title} className="flex gap-4 rounded-2xl bg-white border border-[#EDD8F0] p-5">
        <span className="shrink-0 w-9 h-9 rounded-full bg-[#E8614A] text-white font-semibold grid place-items-center text-sm" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
        <div><p className="font-semibold text-[#1a1a1a]">{s.title}</p><p className="text-[#2d2d2d]">{s.desc}</p></div>
      </li>
    ))}
  </ol>
);

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const schemas = [clinicSchema(), medicalPageSchema(page), faqSchema(page.faqs), breadcrumbSchema(page)];
  const serviceType = page.cta.replace(/^Book |^Get /, "");
  const waHref = `https://wa.me/${LANDING_SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like to consult a pediatrician at Siraa Health.")}`;

  return (
    <LandingPageWrapper serviceType={serviceType} pagePath={page.path}>
      <div className="bg-[#F5F0FC] text-[#2d2d2d]" id="main">
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}

        {/* ── HERO ── */}
        <div className="text-white" style={{ background: "linear-gradient(135deg, #6B5B95, #8B6BAF)" }}>
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">›</span> {page.nav}
            </nav>
            <p className="text-5xl mb-4" aria-hidden="true">{page.heroEmoji}</p>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight max-w-3xl">{page.h1}</h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">{page.heroSub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex items-center justify-center rounded-full text-white font-semibold min-h-[48px] px-6"
                style={{ background: "linear-gradient(135deg, #2DBF6E, #22A05A)" }}>{page.cta}</a>
              <a href={waHref} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-semibold min-h-[48px] px-6">WhatsApp a Pediatrician</a>
            </div>
            {/* Stats bar */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { n: "4870+", l: "Families Trust Us" },
                { n: "20+", l: "Years Experience" },
                { n: "IAP", l: "Certified Vaccination" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl px-5 py-3 text-center" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))" }}>
                  <p className="text-xl font-bold">{s.n}</p>
                  <p className="text-xs text-white/75">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="mx-auto max-w-6xl px-5 pb-28 lg:pb-16 lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 lg:items-start">
          {/* Left: content */}
          <div>
            {/* AEO answer block */}
            <Section>
              <div className="answer-block rounded-2xl border border-[#EDD8F0] bg-white p-6">
                <p className="font-semibold text-[#E8614A] mb-2">{page.answer.q}</p>
                <p className="text-lg leading-relaxed text-[#2d2d2d]">{page.answer.a}</p>
              </div>
            </Section>

            {/* Symptoms / what we assess */}
            <Section label="Signs to watch" title={page.symptomsTitle} tone="tint">
              <Check items={page.symptoms} />
            </Section>

            {/* Red flags */}
            <Section label="Red flags" title="When Should I Worry?">
              <div className="rounded-2xl border-l-8 border-[#C0392B] bg-white p-6" role="alert">
                <p className="flex items-center gap-2 text-xl font-semibold text-[#C0392B] mb-4"><span aria-hidden="true">⚠</span> See a Doctor Immediately If…</p>
                <ul className="grid gap-2 sm:grid-cols-2 mb-6">
                  {page.redFlags.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#2d2d2d]"><span aria-hidden="true" className="text-[#C0392B]">•</span>{f}</li>
                  ))}
                </ul>
                <a href={`tel:${LANDING_SITE.phone}`} className="inline-flex items-center justify-center rounded-full bg-[#C0392B] text-white font-semibold min-h-[48px] px-6">📞 Call Siraa Health Now</a>
              </div>
            </Section>

            {/* Causes */}
            <Section label="Understanding" title={page.causesTitle} tone="tint">
              <ul className="space-y-3">
                {page.causes.map((c) => (
                  <li key={c} className="flex gap-3 rounded-2xl bg-white border border-[#EDD8F0] p-4 text-[#2d2d2d]">
                    <span aria-hidden="true" className="text-[#E8614A]">●</span>{c}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Treatment approach */}
            <Section label="Our approach" title="How We Care for Your Child at Siraa Health">
              <Steps steps={page.treatment} />
              {/* Doctor quote — mobile only (desktop shows in sticky column) */}
              <figure className="lg:hidden mt-8 rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #6B5B95, #8B5B95)" }}>
                <blockquote className="text-lg leading-relaxed">&ldquo;{page.advice}&rdquo;</blockquote>
                <figcaption className="mt-4 text-white/70">
                  <span className="font-semibold text-white">{LANDING_SITE.doctor.name}</span> · {LANDING_SITE.doctor.creds} · {LANDING_SITE.doctor.exp} in pediatrics
                </figcaption>
              </figure>
            </Section>

            {/* Home care */}
            <Section label="At home" title={page.homeCareTitle} tone="tint">
              <Check items={page.homeCare} />
            </Section>

            {/* Reviews */}
            <Section label="Parent Stories" title="What families say">
              <LandingReviews />
            </Section>

            {/* FAQ */}
            <Section label="Questions" title="What parents usually ask us">
              <LandingFAQ faqs={page.faqs} />
            </Section>

            {/* Mobile booking form */}
            <Section id="book" label="Book now">
              <MobileBookSection serviceType={serviceType} pagePath={page.path} />
              <div className="mt-5 rounded-2xl bg-white border border-[#EDD8F0] p-6">
                <p className="font-semibold text-[#1a1a1a] mb-2">{LANDING_SITE.address}</p>
                <p className="text-[#666666] text-sm">{LANDING_SITE.hours}</p>
                <p className="mt-3"><a className="font-semibold text-[#E8614A] underline" href={`tel:${LANDING_SITE.phone}`}>{LANDING_SITE.phone}</a></p>
              </div>
            </Section>

            {/* Related */}
            <Section title="Related Care at Siraa">
              <ul className="flex flex-wrap gap-3">
                {page.related.map((r) => {
                  const rp = LANDING_PAGES.find((p) => p.path === r);
                  return rp ? (
                    <li key={r}>
                      <Link href={r} className="inline-block rounded-full border-2 border-[#6B5B95] text-[#1a1a1a] font-semibold px-5 py-2.5 hover:bg-[#F5F0FC] transition">
                        {rp.nav} →
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </Section>
          </div>

          {/* Right: desktop sticky form */}
          <DesktopStickyForm serviceType={serviceType} pagePath={page.path} advice={page.advice} />
        </div>

        {/* Footer note */}
        <div className="mx-auto max-w-6xl px-5 pb-6">
          <div className="border-t border-[#EDD8F0] pt-4">
            <p className="text-xs text-[#666666]">⚕ Content medically reviewed by {LANDING_SITE.doctor.name}, {LANDING_SITE.doctor.creds}. This website provides general information and does not replace an in-person medical consultation.</p>
          </div>
        </div>
      </div>
    </LandingPageWrapper>
  );
}
