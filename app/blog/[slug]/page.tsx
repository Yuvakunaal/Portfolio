import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogChrome from "@/components/blog/BlogChrome";
import { getAllPosts, getPost, getSlugs } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { director } from "@/lib/data";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getSlugs().includes(slug)) return {};
  const { meta } = getPost(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [director.fullName],
      tags: meta.tags,
      images: [{ url: "/blog/opengraph-image.jpg", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/blog/twitter-image.jpg"],
    },
  };
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getSlugs().includes(slug)) notFound();
  const { meta, html } = getPost(slug);
  const url = `${SITE_URL}/blog/${slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: "en",
    keywords: meta.tags.join(", "),
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/blog/opengraph-image.jpg`,
    author: { "@id": `${SITE_URL}/#person`, "@type": "Person", name: director.fullName },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  const more = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <BlogChrome maxWidth={720}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Link
        href="/blog"
        className="cursor-target mono"
        style={{
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted)",
          textDecoration: "none",
        }}
      >
        ← All writing
      </Link>

      <div
        className="mono"
        style={{
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "var(--gold)",
          textTransform: "uppercase",
          margin: "2.5rem 0 1.25rem",
        }}
      >
        {fmtDate(meta.date)} · {meta.readingTime}
      </div>

      <h1
        className="display"
        style={{
          fontSize: "clamp(2rem, 5.5vw, 3.4rem)",
          color: "var(--bone)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          marginBottom: "1.25rem",
        }}
      >
        {meta.title}
      </h1>

      <p
        style={{
          color: "var(--muted)",
          fontSize: "1.1rem",
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: "1.5rem",
        }}
      >
        {meta.description}
      </p>

      {meta.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
          {meta.tags.map((t) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "var(--bone-dim)",
                border: "1px solid var(--line)",
                borderRadius: "999px",
                padding: "0.3rem 0.65rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="rule" style={{ marginBottom: "2.5rem" }} />

      <article className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

      {/* Related project CTA */}
      {meta.project && meta.projectUrl && (
        <div
          style={{
            marginTop: "3.5rem",
            padding: "1.75rem",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "1rem",
          }}
        >
          <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>
            The project
          </div>
          <a
            href={meta.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target display"
            style={{
              fontSize: "1.5rem",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            {meta.project} ↗
          </a>
        </div>
      )}

      {/* More writing */}
      {more.length > 0 && (
        <div style={{ marginTop: "4rem", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            More writing
          </div>
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="cursor-target"
              style={{
                display: "block",
                marginBottom: "1rem",
                color: "var(--bone)",
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
              }}
            >
              {p.title} →
            </Link>
          ))}
        </div>
      )}
    </BlogChrome>
  );
}
