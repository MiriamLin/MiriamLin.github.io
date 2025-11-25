import Link from "next/link";
import { getPostList } from "../../lib/blog";

export default async function BlogPage() {
  const posts = await getPostList();
  // articles in content/blog/
  return (
    <main className="mx-auto mt-12 max-w-4xl px-6">
      <section className="mt-12">
        {posts.length === 0 ? (
          <p className="text-center text-zinc-600">No posts yet. Drop a markdown file in content/blog.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5"
              >
                <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xl font-semibold text-black underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
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
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">{post.preview}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
