import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BlobityCursor from "@/components/ui/BlobityCursor";
import { SITE_URL, SITE_NAME, PROFILES } from "@/lib/site";
import { director, films } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const DESCRIPTION =
  "Boggavarapu Yuva Satya Kunaal (Kunaal) — AI & Data Science engineer and founder of SQLumina. I build multi-agent LLM pipelines, RAG systems and production-grade SaaS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kunaal's Portfolio — AI Engineer & SaaS Founder",
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: director.fullName, url: PROFILES.linkedin }],
  creator: director.fullName,
  publisher: director.fullName,
  keywords: [
    "Boggavarapu Yuva Satya Kunaal",
    "Kunaal",
    "AI Engineer",
    "GenAI Engineer",
    "Multi-Agent Systems",
    "RAG",
    "SaaS Founder",
    "SQLumina",
    "Data Engineering",
    "Next.js portfolio",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Kunaal's Portfolio — AI Engineer & SaaS Founder",
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunaal's Portfolio — AI Engineer & SaaS Founder",
    description: DESCRIPTION,
    creator: "@yuva_kunaal",
    images: ["/twitter-image.jpg"],
  },
  category: "technology",
};

function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: director.fullName,
    alternateName: "Kunaal",
    url: SITE_URL,
    image: `${SITE_URL}/icon.png`,
    jobTitle: "AI Engineer & Founder",
    description: director.logline,
    email: `mailto:${director.email}`,
    knowsAbout: [
      "Artificial Intelligence",
      "Large Language Models",
      "Multi-Agent Systems",
      "Retrieval-Augmented Generation",
      "Prompt Engineering",
      "Data Engineering",
      "SaaS",
      "Python",
      "FastAPI",
      "Next.js",
      "SQL",
    ],
    knowsLanguage: ["en"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Chaitanya Bharathi Institute of Technology (CBIT)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs: [PROFILES.linkedin, PROFILES.github, PROFILES.devto],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const projects = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: "Selected Work",
    itemListElement: films.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type":
          f.genre.includes("Open-Source") || f.genre.includes("Art")
            ? "CreativeWork"
            : "SoftwareApplication",
        name: f.title,
        description: f.synopsis,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        keywords: f.stack.join(", "),
        datePublished: /^\d{4}$/.test(f.year) ? f.year : "2026",
        author: { "@id": `${SITE_URL}/#person` },
        ...(f.live || f.github ? { url: f.live || f.github } : {}),
      },
    })),
  };

  const json = { "@context": "https://schema.org", "@graph": [person, website, projects] };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <StructuredData />
        {/* Cinematic overlays — top frame is the ticker (see Ticker.tsx) */}
        <div className="letterbox-bar" style={{ bottom: 0 }} aria-hidden />
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
        <BlobityCursor />
        {children}
      </body>
    </html>
  );
}
