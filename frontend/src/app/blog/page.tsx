export const dynamic = "force-dynamic";
import Link from "next/link";
import { BlogBackendService } from "@/services-backend/BlogService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Blog | Siraa Health",
  description: "Expert healthcare articles from Siraa Health specialists.",
};

export default async function BlogPage({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page || "1");
  const category = resolvedParams?.category || undefined;
  const { blogs, total } = await BlogBackendService.getBlogs(page, 9, category);
  const categories = await BlogBackendService.getCategories();
  const totalPages = Math.ceil(total / 9);
  const featured = blogs.find((b: any) => b.is_featured) || blogs[0];
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Blog</h1>
      <p className="text-gray-500 mb-8">Expert insights from Siraa Health specialists</p>
      <div className="flex gap-2 flex-wrap mb-8">
        <Link href="/blog" className="px-4 py-1.5 rounded-full text-sm border bg-teal-600 text-white border-teal-600">All</Link>
        {categories.map((c: any) => (
          <Link key={c.slug} href={"/blog?category=" + c.slug} className="px-4 py-1.5 rounded-full text-sm border border-gray-300 text-gray-600">{c.name}</Link>
        ))}
      </div>
      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No articles yet. Check back soon!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog: any) => (
            <Link key={blog.id} href={"/blog/" + blog.slug} className="block rounded-xl border border-gray-100 hover:shadow-md transition group overflow-hidden">
              {blog.featured_image && <img src={blog.featured_image} alt={blog.title} className="w-full h-44 object-cover" />}
              <div className="p-5">
                {blog.category && <span className="text-xs text-teal-600 font-medium">{blog.category.name}</span>}
                <h3 className="font-semibold text-gray-900 mt-1 mb-2 group-hover:text-teal-700 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{blog.excerpt}</p>
                <div className="flex gap-3 text-xs text-gray-400">
                  {blog.author && <span>{blog.author.name}</span>}
                  {blog.reading_time && <span>{blog.reading_time} min read</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
