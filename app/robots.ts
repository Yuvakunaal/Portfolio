import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Allow everything (incl. AI crawlers like GPTBot/ClaudeBot/Google-Extended via "*")
  // except the contact API. No Host directive — Google never supported it.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
