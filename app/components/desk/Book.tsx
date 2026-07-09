'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

// ── Edit your reading list here — add as many books as you like ──────────
// quote is optional; leave it "" to skip the quote block on the detail page.
// color is a Tailwind gradient (from-… to-…) for the cover.
type BookEntry = {
  title: string;
  author: string;
  quote: string;
  color: string;
};

const BOOKS: BookEntry[] = [
  {
    title: "The Infinity Machine",
    author: "Sebastian Mallaby",
    quote: "Step one: Solve intelligence. Step two: Use it to solve everything else.",
    color: "from-teal-700 to-cyan-950",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    quote: "What important truth do very few people agree with you on?",
    color: "from-zinc-700 to-zinc-950",
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    quote:
      "It is our choices, Harry, that show what we truly are, far more than our abilities.",
    color: "from-violet-800 to-purple-950",
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    quote:
      "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    color: "from-sky-500 to-indigo-600",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    quote:
      "When you want something, all the universe conspires in helping you to achieve it.",
    color: "from-amber-600 to-orange-800",
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    quote: "Remember, the enemy's gate is down.",
    color: "from-slate-800 to-indigo-950",
  },
  {
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    quote: "Spend each day trying to be a little wiser than you were when you woke up.",
    color: "from-stone-600 to-stone-900",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    quote:
      "One of history's few iron laws is that luxuries tend to become necessities and to spawn new obligations.",
    color: "from-orange-700 to-red-900",
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    quote:
      "History followed different courses for different peoples because of differences among peoples' environments, not because of biological differences among peoples themselves.",
    color: "from-emerald-700 to-green-950",
  },
  {
    title: "The Singularity Is Near",
    author: "Ray Kurzweil",
    quote:
      "The Singularity will allow us to transcend the limitations of our biological bodies and brains.",
    color: "from-blue-600 to-indigo-950",
  },
  {
    title: "三體",
    author: "劉慈欣",
    quote: "給歲月以文明，而不是給文明以歲月。",
    color: "from-indigo-900 to-slate-950",
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    quote: "For you, a thousand times over.",
    color: "from-rose-800 to-red-950",
  },
  {
    title: "Elon Musk",
    author: "Walter Isaacson",
    quote: "The only rules are the ones dictated by the laws of physics. Everything else is a recommendation.",
    color: "from-neutral-600 to-neutral-900",
  },
  {
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    quote: "Pain + Reflection = Progress",
    color: "from-sky-700 to-blue-950",
  },
];
// ──────────────────────────────────────────────────────────────────────────

function Cover({ book, className = "" }: { book: BookEntry; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-r-md rounded-l-[3px] bg-gradient-to-br shadow-md ${book.color} ${className}`}
    >
      {/* spine */}
      <div className="absolute inset-y-0 left-0 w-[6px] bg-black/30" />
      <div className="absolute inset-y-0 left-[6px] w-px bg-white/25" />
      {/* hairline frame */}
      <div className="absolute inset-[9px] left-[14px] rounded-sm border border-white/25" />
      {/* centered serif composition */}
      <div className="absolute inset-[9px] left-[14px] flex flex-col items-center justify-center gap-2 px-2 text-center">
        <span aria-hidden className="text-[10px] text-white/50">✦</span>
        <p className="font-serif text-[13px] font-semibold leading-snug text-white [text-wrap:balance]">
          {book.title}
        </p>
        <span aria-hidden className="block h-px w-6 bg-white/40" />
        <p className="text-[8.5px] uppercase tracking-[0.18em] text-white/65">
          {book.author}
        </p>
      </div>
    </div>
  );
}

function LibraryModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const book = selected === null ? null : BOOKS[selected];

  return (
    <Modal label="Reading list" onClose={onClose}>
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
        Reading List
      </h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-zinc-400">
        Books I keep coming back to.
      </p>

      <div className="mt-6 [perspective:1400px]">
        <AnimatePresence mode="wait" initial={false}>
          {book === null ? (
            <motion.div
              key="shelf"
              className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4"
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ transformOrigin: "left center" }}
            >
              {BOOKS.map((b, i) => (
                <motion.button
                  key={b.title}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="group cursor-pointer text-left focus:outline-none"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, type: "spring", stiffness: 320, damping: 26 }}
                  whileHover={{ y: -4 }}
                >
                  <Cover book={b} className="aspect-[2/3] w-full transition-shadow duration-250 group-hover:shadow-xl" />
                  <p className="mt-2.5 truncate text-[13px] font-semibold text-stone-800 dark:text-zinc-200">
                    {b.title}
                  </p>
                  <p className="truncate text-[11px] text-stone-500 dark:text-zinc-500">
                    {b.author}
                  </p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={book.title}
              className="flex flex-col gap-6 sm:flex-row sm:gap-8"
              initial={{ opacity: 0, rotateY: -65 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 25 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              style={{ transformOrigin: "left center" }}
            >
              <div className="shrink-0">
                <Cover book={book} className="aspect-[2/3] w-40" />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                  All books
                </button>
              </div>

              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500 dark:text-zinc-400">{book.author}</p>

                {book.quote && (
                  <blockquote className="relative mt-6 rounded-2xl bg-stone-50 p-5 pl-6 dark:bg-zinc-800/60">
                    <span aria-hidden className="absolute left-0 top-3 h-[calc(100%-24px)] w-[3px] rounded-full bg-amber-500/50" />
                    <p className="font-serif text-[15px] italic leading-relaxed text-stone-700 dark:text-zinc-300">
                      &ldquo;{book.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

export default function Book({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open my reading list"
        aria-haspopup="dialog"
        className="group block w-full cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        animate="rest"
      >
        <motion.div
          className="w-full rotate-2 drop-shadow-[0_6px_12px_rgba(60,36,10,0.3)] transition-[filter] duration-250 group-hover:drop-shadow-[0_14px_24px_rgba(60,36,10,0.4)]"
          variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.03, y: -3 } }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {/* Hardcover seen from above */}
          <div className="relative aspect-[3/4] w-full [perspective:700px]">
            {/* page block underneath */}
            <div className="absolute inset-y-[3px] left-[7px] right-[2px] rounded-r-sm bg-gradient-to-r from-[#efe8d8] to-[#faf6ec]">
              <div className="absolute inset-y-1 right-0.5 w-[3px] rounded-sm bg-[repeating-linear-gradient(to_bottom,#d8cfba_0px,#d8cfba_1px,#f5f0e2_1px,#f5f0e2_3px)]" />
            </div>
            {/* ribbon bookmark */}
            <div className="absolute -bottom-2 left-[58%] h-4 w-[7px] rounded-b-sm bg-red-800/90" />
            {/* cover, hinged at the spine */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center rounded-r-md rounded-l-[3px] bg-gradient-to-br from-emerald-800 to-emerald-950 shadow-sm"
              style={{ transformOrigin: "left center" }}
              variants={{ rest: { rotateY: 0 }, hover: { rotateY: -16 } }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="absolute inset-y-0 left-0 w-[7px] rounded-l-[3px] bg-black/30" />
              <div className="absolute inset-y-0 left-[7px] w-px bg-white/20" />
              <div className="mx-4 border-y border-amber-200/40 py-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-100/90">
                  Reading
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-100/90">
                  List
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <span className="desk-label pointer-events-none mt-3 block text-center text-[11px] font-medium tracking-wide text-white/0 transition-colors duration-250 group-hover:text-white/70 dark:group-hover:text-amber-100/60">
          Library
        </span>
      </motion.button>

      <AnimatePresence>{open && <LibraryModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}
