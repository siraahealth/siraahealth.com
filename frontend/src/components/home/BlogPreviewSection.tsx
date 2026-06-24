import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock } from "lucide-react";
import { BlogBackendService } from "@/services-backend/BlogService";

export async function BlogPreviewSection() {
  let blogs: any[] = [];

  try {
    const result = await BlogBackendService.getBlogs(1, 3);
    blogs = result.blogs || [];
  } catch {
    return null;
  }

  if (!blogs.length) return null;

  return (
    <section className="py-12 lg:py-20 bg-[#F8F9FA] border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              From our blog
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Helping you understand your child better
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 flex items-center gap-1.5 text-primary font-semibold text-[15px] hover:gap-2.5 transition-all"
          >
            View all articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Link
              key={i}
              href={`/blog/${blog.slug}`}
              className="group bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              {/* Featured image */}
              <div className="aspect-[16/9] w-full overflow-hidden relative bg-accent">
                {blog.featured_image ? (
                  <Image
                    src={blog.featured_image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <span className="text-4xl">🧠</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Category */}
                {blog.category?.name && (
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                    {blog.category.name}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-display font-bold text-[17px] text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                    {blog.excerpt}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                  {blog.reading_time && (
                    <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.reading_time} min read
                    </div>
                  )}
                  <span className="text-[13px] font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
