import fs from "fs/promises";
import path from "path";

export type PostMeta = {
  slug: string;
  title: string;
  preview: string;
  dateMs: number;
};

export type Post = PostMeta & {
  content: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

type FrontMatter = {
  title?: string;
  date?: string;
  slug?: string;
};

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontMatter(raw: string): { meta: FrontMatter; body: string } {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };

  const end = raw.indexOf("\n---");
  if (end === -1) return { meta: {}, body: raw };

  const header = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trimStart();

  const meta: FrontMatter = {};
  header
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (!key) return;
      meta[key.trim() as keyof FrontMatter] = rest.join(":").trim();
    });

  return { meta, body };
}

type PostFile = {
  file: string;
  slug: string;
  title?: string;
  date?: string;
};

async function getPostIndex(): Promise<PostFile[]> {
  try {
    await fs.mkdir(blogDir, { recursive: true });
    const files = await fs.readdir(blogDir);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const base = file.replace(/\.md$/, "");
        const safeSlug = slugify(base);
        return { file, slug: safeSlug };
      });
  } catch {
    return [];
  }
}

async function readMarkdownFile(
  slug: string
): Promise<{ content: string; statTime: number; meta: FrontMatter } | null> {
  const index = await getPostIndex();
  const match = index.find((entry) => entry.slug === slug);
  if (!match) return null;

  const filePath = path.join(blogDir, match.file);
  try {
    const [raw, stat] = await Promise.all([fs.readFile(filePath, "utf8"), fs.stat(filePath)]);
    const { meta, body } = parseFrontMatter(raw);
    return { content: body, statTime: stat.mtimeMs, meta: { ...meta, slug: match.slug } };
  } catch {
    return null;
  }
}

function extractTitle(raw: string, fallback: string): string {
  const headingMatch = raw.match(/^#\s+(.*)$/m);
  return headingMatch ? headingMatch[1].trim() : fallback;
}

function extractPreview(raw: string): string {
  const body = raw.replace(/^#\s+.*$/m, "").replace(/\s+/g, " ").trim();
  if (!body) return "No description yet.";
  return body.length > 140 ? `${body.slice(0, 140).trimEnd()}…` : body;
}

function normalizeDate(metaDate: string | undefined, fallbackMs: number): number {
  if (!metaDate) return fallbackMs;
  const parsed = Date.parse(metaDate);
  return Number.isNaN(parsed) ? fallbackMs : parsed;
}

export async function getPostList(): Promise<PostMeta[]> {
  const index = await getPostIndex();

  const posts = await Promise.all(
    index.map(async (entry) => {
      const read = await readMarkdownFile(entry.slug);
      if (!read) return null;
      const { content, statTime, meta } = read;
      const title = meta.title || extractTitle(content, entry.slug);
      const dateMs = normalizeDate(meta.date, statTime);
      return {
        slug: entry.slug,
        title,
        preview: extractPreview(content),
        dateMs,
      };
    })
  );

  return posts.filter((p): p is PostMeta => Boolean(p)).sort((a, b) => b.dateMs - a.dateMs);
}

export async function getPost(slug: string): Promise<Post | null> {
  const read = await readMarkdownFile(slug);
  if (!read) return null;
  const { content, statTime, meta } = read;
  const title = meta.title || extractTitle(content, slug);
  const dateMs = normalizeDate(meta.date, statTime);
  return {
    slug,
    title,
    preview: extractPreview(content),
    dateMs,
    content,
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const index = await getPostIndex();
  return index.map((entry) => entry.slug);
}
