import { BlogBackendService } from "@/services-backend/BlogService";
import { notFound } from "next/navigation";
import BlogLeadForm from "@/components/blog/BlogLeadForm";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const blog = await BlogBackendService.getBlogBySlug(slug);
  if (!blog) return { title: "Not Found" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt || blog.seo_description,
    "datePublished": blog.publishedAt,
    "dateModified": blog.updatedAt || blog.publishedAt,
    "image": blog.featured_image ? [blog.featured_image] : [],
    "author": blog.author ? { "@type": "Person", "name": blog.author.name, "jobTitle": blog.author.qualification } : { "@type": "Organization", "name": "Siraa Health" },
    "publisher": { "@type": "Organization", "name": "Siraa Health", "logo": { "@type": "ImageObject", "url": "https://siraahealth.com/assets/siraa-logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://siraahealth.com/blog/" + slug }
  };

  const faqMatches = [...(blog.content || "").matchAll(/Q:\s*(.+?)\nA:\s*(.+?)(?=\nQ:|$)/gs)];
  const faqSchema = faqMatches.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqMatches.map((m: RegExpMatchArray) => ({
      "@type": "Question",
      "name": m[1].trim(),
      "acceptedAnswer": { "@type": "Answer", "text": m[2].trim() }
    }))
  } : null;

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    openGraph: {
      title: blog.og_title || blog.title,
      description: blog.og_description || blog.excerpt,
      images: blog.og_image ? [blog.og_image] : [],
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function BlogPostPage({ params }: any) {
  const { slug } = await params;
  const blog = await BlogBackendService.getBlogBySlug(slug);
  if (!blog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "datePublished": blog.publishedAt,
    "author": blog.author ? { "@type": "Person", "name": blog.author.name } : { "@type": "Organization", "name": "Siraa Health" },
    "publisher": { "@type": "Organization", "name": "Siraa Health", "logo": { "@type": "ImageObject", "url": "https://siraahealth.com/assets/siraa-logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://siraahealth.com/blog/" + slug }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <div className="mb-4 text-sm text-gray-400">
        <a href="/" className="hover:text-teal-600">Home</a> › <a href="/blog" className="hover:text-teal-600">Blog</a> › {blog.title}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
        {blog.author && <span>{blog.author.name}{blog.author.qualification && ", " + blog.author.qualification}</span>}
        {blog.publishedAt && <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
        {blog.reading_time && <span>{blog.reading_time} min read</span>}
      </div>
      {blog.featured_image && <img src={blog.featured_image} alt={blog.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />}
      <div className="prose prose-lg max-w-none mb-10 whitespace-pre-line">{blog.content}</div>
      {blog.faqs && blog.faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {blog.faqs.map((faq: any, i: number) => (
              <details key={i} className="group p-4">
                <summary className="font-medium text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-teal-600">+</span>
                </summary>
                <div className="mt-3 text-gray-500 text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      )}
      {blog.author && (
        <div className="border border-gray-100 rounded-xl p-6 mb-10 flex gap-4 items-start">
          {blog.author.profile_image && <img src={blog.author.profile_image} alt={blog.author.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />}
          <div>
            <div className="font-semibold text-gray-900">{blog.author.name}</div>
            {blog.author.qualification && <div className="text-sm text-gray-400">{blog.author.qualification}{blog.author.designation && " · " + blog.author.designation}</div>}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex gap-2 md:hidden z-50">
        <a href="tel:+919910731103" className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg text-sm font-medium">Call Now</a>
        <a href="https://wa.me/919910731103" className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg text-sm font-medium">WhatsApp</a>
        <a href="#lead-form" className="flex-1 bg-teal-600 text-white text-center py-3 rounded-lg text-sm font-medium">Book</a>
      </div>
      <BlogLeadForm slug={slug} />
    </main>
  );
}
