import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "../../../lib/blog";
import React from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function renderMarkdown(markdown: string) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;
  let codeLang = "";

  const flushParagraph = () => {
    if (paragraph.length) {
      elements.push(
        <p key={elements.length} className="text-base leading-7 text-zinc-800">
          {paragraph.join(" ")}
        </p>
      );
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      elements.push(
        <ul
          key={elements.length}
          className="list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-800"
        >
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  const flushCode = () => {
    if (code.length) {
      elements.push(
        <pre
          key={elements.length}
          className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-sm text-zinc-50 shadow-inner"
        >
          <code className={codeLang ? `language-${codeLang}` : undefined}>{code.join("\n")}</code>
        </pre>
      );
      code = [];
      codeLang = "";
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
        codeLang = line.replace(/```/, "").trim();
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h1 key={elements.length} className="text-3xl font-bold text-black">
          {line.replace(/^#\s+/, "").trim()}
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-semibold text-black">
          {line.replace(/^##\s+/, "").trim()}
        </h2>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^-+\s*/, "").trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushCode();

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto mt-12 max-w-3xl px-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-black">{post.title}</h1>
        <time
          className="text-sm uppercase tracking-wide text-zinc-500"
          dateTime={new Date(post.dateMs).toISOString()}
        >
          {new Date(post.dateMs).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </header>

      <article className="mt-8 space-y-6">
        {renderMarkdown(post.content)}
      </article>
    </main>
  );
}
