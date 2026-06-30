import type { MetadataRoute } from "next";
import { SITE_URL, SITE_LAST_MODIFIED } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  // Accurate, verifiable lastmod (Google ignores priority & changefreq; it only
  // trusts lastmod when it reflects real content changes).
  const homeModified = new Date(SITE_LAST_MODIFIED);
  const blogModified = posts.length ? new Date(posts[0].date) : homeModified;

  return [
    { url: SITE_URL, lastModified: homeModified, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, lastModified: blogModified, changeFrequency: "weekly" },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
    })),
  ];
}
