import type { Metadata } from "next";
import Desk from "../components/desk/Desk";

export const metadata: Metadata = {
  title: "Gallery | Miriam Lin",
  description: "An interactive desk — places, books, quotes, and a lamp.",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Gallery
      </h1>

      <div className="mt-8 sm:mt-10">
        <Desk />
      </div>
    </main>
  );
}
