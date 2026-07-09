'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Edit your quotes here ─────────────────────────────────────────────────
const QUOTES = [
  { text: "學而不思則罔，思而不學則殆。", source: "論語" },
  { text: "When you want something, all the universe conspires in helping you to achieve it.", source: "The Alchemist" },
  { text: "I think, therefore I am.", source: "René Descartes" },
  { text: "給歲月以文明，而不是給文明以歲月。", source: "三體" },
  { text: "The best way to predict the future is to invent it.", source: "Alan Kay" },
  { text: "Imagination is more important than knowledge.", source: "Albert Einstein" },
  { text: "千里之行，始於足下。", source: "老子" },
  { text: "What I cannot create, I do not understand.", source: "Richard Feynman" },
  { text: "The only true wisdom is in knowing you know nothing.", source: "Socrates" },
  { text: "Stay hungry. Stay foolish.", source: "Steve Jobs" },
  { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", source: "Albert Einstein" },
  { text: "毀滅你，與你有何相干？", source: "三體" },
  { text: "The limits of my language mean the limits of my world.", source: "Ludwig Wittgenstein" },
  { text: "Be the change that you wish to see in the world.", source: "Mahatma Gandhi" },
  { text: "The first principle is that you must not fool yourself—and you are the easiest person to fool.", source: "Richard Feynman" },
  { text: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.", source: "The Little Prince" },
  { text: "The best investment you can make is in yourself.", source: "Warren Buffett" },
  { text: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.", source: "Carl Sagan" },
  { text: "If I have seen further it is by standing on the shoulders of giants.", source: "Isaac Newton" },
  { text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.", source: "Alan Turing" },
  { text: "I solemnly swear that I am up to no good.", source: "Harry Potter" },
];
// ──────────────────────────────────────────────────────────────────────────

const PRINT_DURATION = 1.1;

export default function QuotePrinter({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [printing, setPrinting] = useState(false);
  const quote = QUOTES[index];

  const print = () => {
    if (printing) return;
    setPrinting(true);
    setIndex((i) => (i + 1) % QUOTES.length);
    window.setTimeout(() => setPrinting(false), (PRINT_DURATION + 0.6) * 1000);
  };

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={print}
        aria-label="Print a new quote"
        className="group block w-full cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        animate={printing ? "printing" : "rest"}
      >
        {/* Printer body, seen from above */}
        <motion.div
          className="relative z-10 rounded-2xl bg-gradient-to-b from-[#f3efe6] to-[#e4ddce] p-3 shadow-[0_8px_18px_rgba(60,36,10,0.32),inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4 dark:from-[#3a3a40] dark:to-[#2b2b30] dark:shadow-[0_8px_18px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
          variants={{
            rest: { x: 0, y: 0, scale: 1 },
            hover: { x: [0, -0.7, 0.7, -0.5, 0.5, 0], y: -3, scale: 1.03 },
            printing: { x: [0, -0.6, 0.6, -0.6, 0.6, 0], y: 0, scale: 1 },
          }}
          transition={{
            x: { duration: 0.35, repeat: printing ? Infinity : 0, repeatDelay: 0.1 },
            y: { type: "spring", stiffness: 400, damping: 22 },
            scale: { type: "spring", stiffness: 400, damping: 22 },
          }}
        >
          {/* vents */}
          <div className="h-8 rounded-lg bg-[repeating-linear-gradient(to_right,rgba(90,70,45,0.14)_0px,rgba(90,70,45,0.14)_2px,transparent_2px,transparent_8px)] sm:h-10 dark:bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_2px,transparent_2px,transparent_8px)]" />
          {/* control row */}
          <div className="mt-2.5 flex items-center justify-between px-0.5 sm:mt-3">
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500/80 dark:text-zinc-400/80">
              quotes
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-400/40 dark:bg-zinc-600" />
              {/* status light: on when hovered or printing */}
              <span
                className={`h-2 w-2 rounded-full transition-all duration-250 ${
                  printing
                    ? "animate-pulse bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
                    : "bg-stone-400/40 shadow-none group-hover:bg-emerald-400 group-hover:shadow-[0_0_8px_2px_rgba(52,211,153,0.55)] dark:bg-zinc-600"
                }`}
              />
            </span>
          </div>
          {/* paper slot */}
          <div className="mt-2.5 h-2 rounded-full bg-stone-800/85 shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)] sm:mt-3 dark:bg-black/70" />
        </motion.div>

        {/* Paper sliding out of the slot */}
        <div className="relative z-0 mx-auto -mt-1.5 w-[86%]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={index}
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ opacity: 0, y: 26, rotate: 2.5, transition: { duration: 0.35, ease: "easeIn" } }}
              transition={{ duration: PRINT_DURATION, ease: [0.2, 0.8, 0.3, 1] }}
            >
              <div className="drop-shadow-[0_5px_10px_rgba(60,36,10,0.28)] dark:drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                <div className="bg-gradient-to-b from-[#f4f0e4] to-[#fdfbf4] px-4 pb-2 pt-3 sm:px-5">
                  {/* receipt header */}
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: PRINT_DURATION * 0.2, duration: 0.4 }}
                  >
                    <span className="h-px flex-1 bg-stone-300" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400">
                      quote
                    </span>
                    <span className="h-px flex-1 bg-stone-300" />
                  </motion.div>
                  <motion.p
                    className="mt-2 text-center font-serif text-[11.5px] italic leading-snug text-stone-800 sm:text-[12.5px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: PRINT_DURATION * 0.4, duration: 0.5 }}
                  >
                    &ldquo;{quote.text}&rdquo;
                  </motion.p>
                  <motion.div
                    className="mt-2 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: PRINT_DURATION * 0.65, duration: 0.5 }}
                  >
                    <span aria-hidden className="text-[9px] text-amber-600/70">
                      ✦
                    </span>
                    <span className="font-mono text-[9px] tracking-wide text-stone-500 sm:text-[10px]">
                      {quote.source}
                    </span>
                    <span aria-hidden className="text-[9px] text-amber-600/70">
                      ✦
                    </span>
                  </motion.div>
                  <motion.p
                    className="mt-1.5 text-center font-mono text-[7.5px] uppercase tracking-[0.25em] text-stone-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: PRINT_DURATION * 0.8, duration: 0.5 }}
                  >
                    № {String(index + 1).padStart(2, "0")} / {QUOTES.length}
                  </motion.p>
                </div>
                {/* torn zig-zag bottom edge */}
                <div
                  aria-hidden
                  className="h-[7px] w-full bg-[#fdfbf4] [clip-path:polygon(0_0,100%_0,100%_30%,96%_100%,92%_30%,88%_100%,84%_30%,80%_100%,76%_30%,72%_100%,68%_30%,64%_100%,60%_30%,56%_100%,52%_30%,48%_100%,44%_30%,40%_100%,36%_30%,32%_100%,28%_30%,24%_100%,20%_30%,16%_100%,12%_30%,8%_100%,4%_30%,0_100%)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
