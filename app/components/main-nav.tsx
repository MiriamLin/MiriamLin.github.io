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
    <nav className="mx-auto my-8 flex w-full max-w-6xl items-center justify-between gap-[clamp(1.25rem,6vw,5rem)] px-[clamp(1.5rem,7vw,5rem)] py-4 text-xl font-semibold tracking-wide">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              isActive ? "text-black" : "text-zinc-400 hover:text-black"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
