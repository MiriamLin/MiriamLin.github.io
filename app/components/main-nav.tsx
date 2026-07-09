'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-10">
      <nav className="flex items-baseline justify-between gap-6 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <Link
          href="/"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Miriam Lin
        </Link>
        <div className="flex items-baseline gap-4 text-[15px] sm:gap-6">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors ${
                  isActive
                    ? "text-zinc-900 underline decoration-blue-900 decoration-2 underline-offset-[6px] dark:text-zinc-100 dark:decoration-blue-400"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
