import type { Metadata } from "next";
import Link from "next/link";
import BlogChrome from "@/components/blog/BlogChrome";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "Writing — AI Engineering, LLMs & Building Products";
const DESCRIPTION =
  "Field notes from the cutting room by Kunaal — articles on AI engineering, multi-agent LLM pipelines, RAG, text-to-SQL, and shipping production SaaS.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/blog/opengraph-image.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/blog/twitter-image.jpg"],
  },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Writing — Kunaal",
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    author: { "@id": `${SITE_URL}/#person` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };

  return (
    <BlogChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />

      <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
        The Cutting Room
      </div>
      <h1
        className="display"
        style={{
          fontSize: "clamp(2.6rem, 8vw, 5rem)",
          color: "var(--bone)",
          lineHeight: 0.95,
          marginBottom: "1.25rem",
        }}
      >
        Writing
      </h1>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
          lineHeight: 1.6,
          maxWidth: "52ch",
          marginBottom: "clamp(3rem, 6vh, 4.5rem)",
        }}
      >
        Field notes on AI engineering, multi-agent LLM pipelines, RAG, text-to-SQL,
        and shipping production software.
      </p>

      <ul style={{ listStyle: "none", borderTop: "1px solid var(--line)" }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ borderBottom: "1px solid var(--line)" }}>
            <Link
              href={`/blog/${p.slug}`}
              className="blog-row cursor-target"
              style={{
                display: "block",
                padding: "1.75rem 0",
                textDecoration: "none",
                color: "var(--bone)",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {fmtDate(p.date)} · {p.readingTime}
                {p.project ? ` · ${p.project}` : ""}
              </div>
              <h2
                className="blog-row-title display"
                style={{
                  fontSize: "clamp(1.5rem, 3.4vw, 2.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  marginBottom: "0.6rem",
                  transition: "color 0.4s var(--ease-cine)",
                }}
              >
                {p.title}
              </h2>
              <p
                style={{
                  color: "var(--bone-dim)",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  maxWidth: "60ch",
                }}
              >
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </BlogChrome>
  );
}
