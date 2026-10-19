'use client';

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
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

// Spine sizing is derived from the title so every book looks a little different.
function spineStyle(book: BookEntry, i: number) {
  const width = Math.min(52, Math.max(34, 26 + book.title.length * 0.9));
  const height = [150, 136, 158, 144, 130, 154, 140][i % 7];
  return { width, height };
}

const SHELF_ROWS = 3;

function Spine({ book, index, onOpen }: { book: BookEntry; index: number; onOpen: () => void }) {
  const { width, height } = spineStyle(book, index);
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${book.title} by ${book.author}`}
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-[3px] bg-gradient-to-r shadow-[inset_-3px_0_6px_rgba(0,0,0,0.35),inset_2px_0_3px_rgba(255,255,255,0.15),2px_0_4px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${book.color}`}
      style={{ width, height }}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, type: "spring", stiffness: 380, damping: 18 }}
      whileHover={{ y: -12, rotate: -2 }}
      whileTap={{ y: -24, scale: 1.05 }}
    >
      {/* gilt bands */}
      <span aria-hidden className="absolute inset-x-0 top-3 h-px bg-amber-200/50" />
      <span aria-hidden className="absolute inset-x-0 top-[15px] h-px bg-amber-200/30" />
      <span aria-hidden className="absolute inset-x-0 bottom-3 h-px bg-amber-200/50" />
      <span aria-hidden className="absolute inset-x-0 bottom-[15px] h-px bg-amber-200/30" />
      <span className="absolute inset-x-0 inset-y-6 flex items-center justify-center overflow-hidden">
        <span className="max-h-full truncate font-serif text-[12px] font-semibold tracking-wide text-white/90 [writing-mode:vertical-rl]">
          {book.title}
        </span>
      </span>
    </motion.button>
  );
}

function Bookshelf({ onOpen }: { onOpen: (i: number) => void }) {
  const perRow = Math.ceil(BOOKS.length / SHELF_ROWS);
  const rows = Array.from({ length: SHELF_ROWS }, (_, r) =>
    BOOKS.slice(r * perRow, (r + 1) * perRow).map((b, j) => ({ b, i: r * perRow + j }))
  ).filter((row) => row.length > 0);

  return (
    <motion.div
      key="shelf"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-md rounded-xl border-[10px] border-[#6b4528] bg-[#2b1c11] shadow-[inset_0_0_40px_rgba(0,0,0,0.6),0_20px_40px_-15px_rgba(0,0,0,0.5)] dark:border-[#4a2f1b]"
    >
      {rows.map((row, r) => (
        <div key={r}>
          <div className="flex h-[176px] items-end gap-[3px] px-4">
            {row.map(({ b, i }) => (
              <Spine key={b.title} book={b} index={i} onOpen={() => onOpen(i)} />
            ))}
          </div>
          {/* plank */}
          <div className="h-3 bg-gradient-to-b from-[#a0703f] to-[#6b4528] shadow-[0_6px_10px_rgba(0,0,0,0.5)]" />
        </div>
      ))}
    </motion.div>
  );
}

const EASE = [0.45, 0, 0.2, 1] as const;
// Opening choreography (seconds)
const T_ARRIVE = 0.7; // closed book flies in and turns to face us
const T_COVER = 0.9; // cover swings open
const T_LEAVES = 0.35; // stagger of fluttering pages

function OpenBook({ book, onBack }: { book: BookEntry; onBack: () => void }) {
  return (
    <motion.div
      key={book.title}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="[perspective:1800px]"
    >
      <motion.div
        className="relative mx-auto max-w-xl [transform-style:preserve-3d]"
        initial={{ x: "-25%", y: 60, rotateY: 75, rotateX: 20, scale: 0.55, opacity: 0 }}
        animate={{ x: ["-25%", "-25%", "0%"], y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: T_ARRIVE,
          ease: EASE,
          x: { duration: T_ARRIVE + T_COVER, times: [0, T_ARRIVE / (T_ARRIVE + T_COVER), 1], ease: EASE },
        }}
      >
        <div className="grid min-h-[300px] grid-cols-2 [transform-style:preserve-3d]">
          {/* left half is empty until the cover lands there */}
          <div />
          {/* right page: the quote */}
          <div className="relative flex items-center rounded-r-md bg-[#f8f3e6] p-5 shadow-[inset_18px_0_24px_-18px_rgba(0,0,0,0.3),0_20px_40px_-10px_rgba(0,0,0,0.45)] sm:p-8 dark:bg-[#e9e1cc]">
            {/* page-edge stack */}
            <div aria-hidden className="absolute inset-y-1 -right-1 w-1 rounded-r bg-[repeating-linear-gradient(to_bottom,#d8cfba_0px,#d8cfba_1px,#f5f0e2_1px,#f5f0e2_3px)]" />
            <motion.p
              className="font-serif text-[13px] italic leading-relaxed text-stone-700 sm:text-[15px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: T_ARRIVE + T_COVER + T_LEAVES * 2, duration: 0.6 }}
            >
              {book.quote ? <>&ldquo;{book.quote}&rdquo;</> : "—"}
            </motion.p>
          </div>
        </div>

        {/* fluttering leaves: visible only while turning */}
        {[0, 1, 2].map((k) => (
          <motion.div
            key={k}
            aria-hidden
            className="absolute inset-y-[3px] right-[3px] w-[calc(50%-3px)] origin-left rounded-r-md bg-[#fbf7ec] shadow-md [backface-visibility:hidden]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ delay: T_ARRIVE + T_COVER * 0.5 + k * T_LEAVES, duration: 0.7, ease: EASE }}
          />
        ))}

        {/* front cover: outside = cover art, inside = title page */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 origin-left [transform-style:preserve-3d]"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -180 }}
          transition={{ delay: T_ARRIVE, duration: T_COVER, ease: EASE }}
        >
          <div className={`absolute inset-0 rounded-r-md bg-gradient-to-br shadow-xl [backface-visibility:hidden] ${book.color}`}>
            <div className="absolute inset-y-0 left-0 w-2 bg-black/30" />
            <div className="absolute inset-3 left-5 flex flex-col items-center justify-center gap-2 rounded-sm border border-white/25 px-3 text-center">
              <span aria-hidden className="text-[10px] text-white/50">✦</span>
              <p className="font-serif text-base font-semibold text-white sm:text-lg">{book.title}</p>
              <span aria-hidden className="block h-px w-6 bg-white/40" />
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/65">{book.author}</p>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-l-md bg-[#f8f3e6] p-5 text-center shadow-[inset_-18px_0_24px_-18px_rgba(0,0,0,0.3),0_20px_40px_-10px_rgba(0,0,0,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8 dark:bg-[#e9e1cc]">
            <span aria-hidden className="text-xs text-stone-400">✦</span>
            <h3 className="font-serif text-lg font-semibold leading-snug text-stone-900 [text-wrap:balance] sm:text-2xl">
              {book.title}
            </h3>
            <span aria-hidden className="block h-px w-8 bg-stone-400/60" />
            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500 sm:text-xs">{book.author}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onBack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: T_ARRIVE + T_COVER + 0.4 }}
        className="mx-auto mt-8 flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Back to the shelf
      </motion.button>
    </motion.div>
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
        Books I keep coming back to. Pull one off the shelf.
      </p>

      <div className="mt-6">
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait" initial={false}>
            {book === null ? (
              <Bookshelf onOpen={setSelected} />
            ) : (
              <OpenBook book={book} onBack={() => setSelected(null)} />
            )}
          </AnimatePresence>
        </MotionConfig>
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
