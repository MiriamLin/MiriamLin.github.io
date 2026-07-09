import Link from "next/link";
import { getPostList } from "../../lib/blog";

export default async function BlogPage() {
  const posts = await getPostList();
  // articles in content/blog/
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Blog</h1>

      <section className="mt-8">
        {posts.length === 0 ? (
          <p className="text-[15px] text-zinc-600 dark:text-zinc-400">
            No posts yet. Drop a markdown file in content/blog.
          </p>
        ) : (
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6"
              >
                <time
                  className="shrink-0 pt-0.5 font-mono text-xs text-zinc-500 sm:w-24 dark:text-zinc-400"
                  dateTime={new Date(post.dateMs).toISOString()}
                >
                  {new Date(post.dateMs).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div className="min-w-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-zinc-900 underline-offset-4 dark:text-zinc-100 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {post.preview}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
