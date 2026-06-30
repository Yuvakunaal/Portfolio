import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  project?: string;
  projectUrl?: string;
  readingTime: string;
};

export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(slug: string) {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  return matter(raw);
}

export function getPostMeta(slug: string): PostMeta {
  const { data, content } = readRaw(slug);
  const words = content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    project: data.project,
    projectUrl: data.projectUrl,
    readingTime,
  };
}

export function getPost(slug: string): { meta: PostMeta; html: string } {
  const { content } = readRaw(slug);
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(content) as string;
  return { meta: getPostMeta(slug), html };
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map(getPostMeta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
