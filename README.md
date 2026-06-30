<div align="center">

# Kunaal's Portfolio

**A cinematic, film-title-sequence portfolio for an AI engineer & SaaS founder.**

Systems that think. Products that ship.

[Live Demo](https://kunaal-portfolio.vercel.app) · [The Cutting Room (Blog)](https://kunaal-portfolio.vercel.app/blog) · [LinkedIn](https://www.linkedin.com/in/boggavarapu-yuva-satya-kunaal-127817290/) · [GitHub](https://github.com/Yuvakunaal)

</div>

---

## ✦ Overview

A personal portfolio built as a **feature film**: it opens with a programmatic title sequence, presents projects as a *filmography*, the career as a *shooting schedule*, credentials as *laurels*, and contact as *end credits*. The aesthetic is editorial-cinematic — void black, projector gold, and a high-contrast serif — wrapped around a fast, fully static, deeply SEO-optimized Next.js app.

## 🎬 Features

- **Remotion title-sequence intro** — a real, frame-perfect cinematic cold-open rendered live with `@remotion/player`.
- **Kinetic, scroll-driven sections** — GSAP + ScrollTrigger masked-text reveals, a pinned horizontal *Journey* timeline (vertical on mobile), and Lenis smooth scroll.
- **Interactive filmography** — hover-driven project detail panel on desktop, inline on mobile.
- **"The Cutting Room" blog** — Markdown-based, with reading time, tags, related-project links, and full per-post SEO.
- **Bespoke details** — gooey gold cursor (Blobity), film grain, vignette, letterbox framing, transparent serif-K favicon.
- **Production-grade SEO** — JSON-LD (`Person`, `WebSite`, `ItemList`, `BlogPosting`, `BreadcrumbList`), dynamic `sitemap.ts` + `robots.ts`, per-page metadata, Open Graph + Twitter cards, manifest.
- **Fully static & dependency-light** — every route is SSG; **no environment variables required**.

## 🛠 Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, custom CSS design tokens |
| Motion | GSAP + ScrollTrigger (`@gsap/react`), Lenis, Remotion |
| Cursor | Blobity |
| Blog | Markdown via `gray-matter` + `marked` |
| Fonts | `next/font` — Fraunces (display), Geist (sans), Geist Mono |

## 📁 Project Structure

```
app/
  layout.tsx            # Root: fonts, metadata, JSON-LD, global overlays
  page.tsx              # Home — orchestrates all sections
  globals.css           # Design tokens, prose & component styles
  sitemap.ts            # Dynamic sitemap (home + blog + posts)
  robots.ts             # robots.txt
  manifest.ts           # Web app manifest
  icon.png              # Favicon (transparent gold "K")
  opengraph-image.jpg   # Home social card
  blog/
    page.tsx            # Blog index ("The Cutting Room")
    [slug]/page.tsx     # Blog post (Article + Breadcrumb schema)
components/
  sections/             # Intro, Marquee, Logline, Filmography, Craft, Production, Laurels, EndCredits
  ui/                   # Nav, Ticker, BlogChrome, BlobityCursor, Stage, Kinetic, LenisProvider
  remotion/             # TitleSequence (the intro composition)
content/blog/           # Markdown posts (source of the blog)
lib/
  data.ts               # All portfolio content (projects, skills, journey, laurels)
  site.ts               # Site URL, name, profiles, last-modified date
  blog.ts               # Markdown parsing + reading time
assets/                 # Source images (not served) — logo, OG sources
```

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000

npm run build      # production build
npm start          # serve the production build
```

## ✍️ Adding a Blog Post

Drop a Markdown file into `content/blog/` — the route, sitemap entry, and SEO are generated automatically:

```md
---
title: "Your post title"
description: "One-line summary used for SEO and social cards."
date: "2026-05-01"
tags: ["AI", "Architecture"]
project: "Project Name"          # optional — shows a related-project CTA
projectUrl: "https://..."        # optional
---

Your content in **Markdown**.
```

## ⚙️ Configuration

Edit **`lib/site.ts`**:

- `SITE_URL` — **set this to your production domain** (drives canonical, OG, sitemap, robots).
- `SITE_LAST_MODIFIED` — bump (`YYYY-MM-DD`) only on real content changes; powers an accurate sitemap `lastmod`.

Portfolio content (projects, skills, journey, laurels, links) lives in **`lib/data.ts`**.

## ▲ Deployment

Optimized for **Vercel** (zero config, no env vars):

1. Push to GitHub.
2. Import the repo on Vercel — Next.js is auto-detected.
3. Deploy. Add a custom domain if desired, then set `SITE_URL` to it.
4. Submit `https://yourdomain/sitemap.xml` in Google Search Console.

## 👤 Author

**Boggavarapu Yuva Satya Kunaal** — AI & Data Science engineer, founder of SQLumina.
[LinkedIn](https://www.linkedin.com/in/boggavarapu-yuva-satya-kunaal-127817290/) · [GitHub](https://github.com/Yuvakunaal) · [dev.to](https://dev.to/yuva_kunaal)

<div align="center"><sub>FIN.</sub></div>
