import { BaseBackendService } from "./BaseService";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  reading_time?: number;
  featured_image?: string;
  is_featured?: boolean;
  publishedAt?: string;
  seo_title?: string;
  seo_description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  author?: { name: string; qualification?: string; designation?: string; bio?: string; profile_image?: string; slug?: string; };
  category?: { name: string; slug: string; };
  faqs?: { question: string; answer: string; sort_order?: number; }[];
}

export class BlogBackendService extends BaseBackendService {
  public static async getBlogs(page = 1, pageSize = 10, category?: string): Promise<{ blogs: Blog[]; total: number }> {
    try {
      let url = `/api/blogs?populate[featured_image][fields][0]=url&populate[author][fields][0]=name&populate[author][fields][1]=qualification&populate[category][fields][0]=name&populate[category][fields][1]=slug&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc&status=published`;
      if (category) url += `&filters[category][slug][$eq]=${category}`;
      const res = await this.fetchStrapi(url);
      if (!res.ok) return { blogs: [], total: 0 };
      const { data, meta } = await res.json();
      if (!data || data.length === 0) return { blogs: [], total: 0 };
      return {
        blogs: data.map((b: any) => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          reading_time: b.reading_time,
          is_featured: b.is_featured,
          publishedAt: b.publishedAt,
          featured_image: b.featured_image?.url ? `${this.STRAPI_URL}${b.featured_image.url}` : undefined,
          author: b.author ? { name: b.author.name, qualification: b.author.qualification } : undefined,
          category: b.category ? { name: b.category.name, slug: b.category.slug } : undefined,
        })),
        total: meta?.pagination?.total || 0,
      };
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      return { blogs: [], total: 0 };
    }
  }

  public static async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const res = await fetch(`${this.STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate[featured_image][fields][0]=url&populate[author][fields][0]=name&populate[author][fields][1]=qualification&populate[author][fields][2]=designation&populate[author][fields][3]=bio&populate[author][fields][4]=slug&populate[author][populate][profile_image][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[og_image][fields][0]=url&status=published`, {
        headers: { "Authorization": `Bearer ${this.CUSTOM_TOKEN}`, "Content-Type": "application/json" },
        cache: "no-store"
      });
      console.log('getBlogBySlug status:', res.status, 'slug:', slug);
      if (!res.ok) { console.log('getBlogBySlug failed:', await res.text()); return null; }
      const json = await res.json();
      console.log('getBlogBySlug data length:', json?.data?.length);
      const { data } = json;
      if (!data || data.length === 0) return null;
      const b = data[0];
      return {
        id: b.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        reading_time: b.reading_time,
        publishedAt: b.publishedAt,
        seo_title: b.seo_title,
        seo_description: b.seo_description,
        og_title: b.og_title,
        og_description: b.og_description,
        canonical_url: b.canonical_url,
        featured_image: b.featured_image?.url ? `${this.STRAPI_URL}${b.featured_image.url}` : undefined,
        og_image: b.og_image?.url ? `${this.STRAPI_URL}${b.og_image.url}` : undefined,
        author: b.author ? { name: b.author.name, qualification: b.author.qualification, designation: b.author.designation, bio: b.author.bio, slug: b.author.slug, profile_image: b.author.profile_image?.url ? `${this.STRAPI_URL}${b.author.profile_image.url}` : undefined } : undefined,
        category: b.category ? { name: b.category.name, slug: b.category.slug } : undefined,
        faqs: b.faqs ? b.faqs.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)) : [],
      };
    } catch (err) {
      console.error("Failed to fetch blog", err);
      return null;
    }
  }

  public static async getCategories(): Promise<{ name: string; slug: string }[]> {
    try {
      const res = await this.fetchStrapi(`/api/categories?fields[0]=name&fields[1]=slug&status=published`);
      if (!res.ok) return [];
      const { data } = await res.json();
      if (!data) return [];
      return data.map((c: any) => ({ name: c.name, slug: c.slug }));
    } catch (err) {
      console.error("Failed to fetch categories", err);
      return [];
    }
  }
}
