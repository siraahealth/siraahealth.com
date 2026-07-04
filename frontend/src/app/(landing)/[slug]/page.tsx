// Dynamic landing route: /(landing)/[slug] → 24 SSG pediatric landing pages.
// Next.js 16: params is a Promise — always `await params`.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLandingPage, landingSlugs, LANDING_PAGES } from "@/content/landingPages";
import { LANDING_SITE, clinicSchema, faqSchema, medicalPageSchema, breadcrumbSchema } from "@/lib/landingSeo";
import { LandingFAQ, LandingBookingForm, LandingStickyCTA } from "@/components/landing/LandingClient";

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

const Section = ({ id, title, eyebrow, tone, children }: {
  id?: string; title?: string; eyebrow?: string; tone?: "mist"; children: React.ReactNode;
}) => (
  <section id={id} className={`py-12 md:py-16 ${tone === "mist" ? "bg-[#E8F1F1]/60" : ""}`}>
    <div className="mx-auto max-w-4xl px-5">
      {eyebrow && <p className="text-[#F26D5B] font-semibold uppercase tracking-wide text-sm mb-2">{eyebrow}</p>}
      {title && <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#1E2A32]">{title}</h2>}
      {children}
    </div>
  </section>
);

const Check = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3 sm:grid-cols-2">
    {items.map((s) => (
      <li key={s} className="flex items-start gap-3 rounded-2xl bg-white border border-[#E8F1F1] p-4 shadow-sm">
        <span aria-hidden="true" className="text-[#0E7C7B] mt-0.5">✔</span><span>{s}</span>
      </li>
    ))}
  </ul>
);

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const schemas = [clinicSchema(), medicalPageSchema(page), faqSchema(page.faqs), breadcrumbSchema(page)];
  const waHref = `https://wa.me/${LANDING_SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like to consult a pediatrician at Siraa Health.")}`;

  return (
    <main className="bg-[#FDF9F3] text-[#1E2A32]">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <div className="bg-[#083D3C] text-[#FDF9F3]">
        <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm opacity-70 mb-4">
            <Link href="/" className="hover:opacity-100">Home</Link> <span aria-hidden="true">›</span> {page.nav}
          </nav>
          <p className="text-5xl mb-4" aria-hidden="true">{page.heroEmoji}</p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{page.h1}</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl">{page.heroSub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#book" className="inline-flex items-center justify-center rounded-full bg-[#F26D5B] hover:bg-[#D9503E] text-white font-semibold min-h-[48px] px-6">{page.cta}</a>
            <a href={waHref} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white font-semibold min-h-[48px] px-6">WhatsApp a Pediatrician</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Why parents trust Siraa Health">
            {["MD Pediatricians", "4870+ Families Trust Us", "IAP Vaccination Schedule", "Same-Day Appointments"].map((t) => (
              <li key={t} className="rounded-full bg-white/10 text-sm font-medium px-4 py-2">{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* AEO answer */}
      <Section>
        <div className="answer-block rounded-2xl border border-[#0E7C7B]/20 bg-white p-6 shadow-sm">
          <p className="font-semibold text-[#0A5958] mb-2">{page.answer.q}</p>
          <p className="text-lg leading-relaxed">{page.answer.a}</p>
        </div>
      </Section>

      <Section title={page.symptomsTitle} tone="mist"><Check items={page.symptoms} /></Section>

      <Section title="When Should I Worry?" eyebrow="Red flags">
        <div className="rounded-2xl border-l-8 border-[#C0392B] bg-white p-6 shadow-sm" role="alert">
          <p className="flex items-center gap-2 text-xl font-semibold text-[#C0392B] mb-4"><span aria-hidden="true">⚠</span> See a Doctor Immediately If…</p>
          <ul className="grid gap-2 sm:grid-cols-2 mb-6">
            {page.redFlags.map((f) => (
              <li key={f} className="flex items-start gap-2"><span aria-hidden="true" className="text-[#C0392B]">•</span>{f}</li>
            ))}
          </ul>
          <a href={`tel:${LANDING_SITE.phone}`} className="inline-flex items-center justify-center rounded-full bg-[#C0392B] text-white font-semibold min-h-[48px] px-6">📞 Call Siraa Health Now</a>
        </div>
      </Section>

      <Section title={page.causesTitle} tone="mist">
        <ul className="space-y-3">
          {page.causes.map((c) => (
            <li key={c} className="flex gap-3 rounded-2xl bg-white border border-[#E8F1F1] p-4 shadow-sm">
              <span aria-hidden="true" className="text-[#F26D5B]">●</span>{c}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How We Care for Your Child at Siraa Health" eyebrow="Our approach">
        <ol className="space-y-4">
          {page.treatment.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-white border border-[#E8F1F1] p-5 shadow-sm">
              <span className="shrink-0 w-9 h-9 rounded-full bg-[#0E7C7B] text-white font-semibold grid place-items-center" aria-hidden="true">{i + 1}</span>
              <div><p className="font-semibold text-[#0A5958]">{s.title}</p><p className="opacity-80">{s.desc}</p></div>
            </li>
          ))}
        </ol>
        <figure className="mt-8 rounded-2xl bg-[#083D3C] text-[#FDF9F3] p-6 md:p-8 shadow-xl">
          <blockquote className="text-xl leading-relaxed">&ldquo;{page.advice}&rdquo;</blockquote>
          <figcaption className="mt-4 opacity-80">
            <span className="font-semibold text-[#FFC24B]">{LANDING_SITE.doctor.name}</span> · {LANDING_SITE.doctor.creds} · {LANDING_SITE.doctor.exp} in pediatrics
          </figcaption>
        </figure>
      </Section>

      <Section title={page.homeCareTitle} tone="mist"><Check items={page.homeCare} /></Section>

      <Section title="Frequently Asked Questions"><LandingFAQ faqs={page.faqs} /></Section>

      <Section id="book" tone="mist" title="Book Your Appointment" eyebrow="Same-day slots for sick children">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <LandingBookingForm serviceType={page.cta.replace(/^Book |^Get /, "")} pagePath={page.path} />
          <div className="rounded-2xl bg-white border border-[#E8F1F1] p-6 shadow-sm">
            <p className="font-semibold text-[#0A5958] mb-2">Visit us</p>
            <p className="opacity-80 text-sm">{LANDING_SITE.address}</p>
            <p className="opacity-80 text-sm mt-1">{LANDING_SITE.hours}</p>
            <p className="mt-3"><a className="font-semibold text-[#0A5958] underline" href={`tel:${LANDING_SITE.phone}`}>{LANDING_SITE.phone}</a></p>
          </div>
        </div>
      </Section>

      <Section title="Related Care at Siraa">
        <ul className="flex flex-wrap gap-3">
          {page.related.map((r) => {
            const rp = LANDING_PAGES.find((p) => p.path === r);
            return rp ? (
              <li key={r}>
                <Link href={r} className="inline-block rounded-full border-2 border-[#0E7C7B] text-[#0A5958] font-semibold px-5 py-2.5 hover:bg-[#E8F1F1]">
                  {rp.nav} →
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </Section>

      <LandingStickyCTA />
    </main>
  );
}
