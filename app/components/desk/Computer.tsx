'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./Terminal";

// Bare overlay: just the dark console floating on a dimmed backdrop.
// Close via the red traffic light, Escape, or clicking outside.
function ComputerModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm dark:bg-black/70"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        className="relative w-full max-w-xl"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <Terminal onClose={onClose} />
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Computer({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the terminal"
        aria-haspopup="dialog"
        className="group block w-full cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {/* Laptop seen from above */}
        <div className="w-full -rotate-1 drop-shadow-[0_6px_12px_rgba(60,36,10,0.3)] transition-[filter] duration-250 group-hover:drop-shadow-[0_14px_24px_rgba(60,36,10,0.4)]">
          {/* screen half — a sliver of terminal visible */}
          <div className="rounded-t-lg bg-zinc-800 p-[5%] pb-[3%] dark:bg-zinc-900">
            <div className="overflow-hidden rounded-sm bg-[#17181d] p-[5%] font-mono">
              <p className="flex items-center gap-[3%]">
                <span className="h-[3px] w-[3px] rounded-full bg-[#ff5f57]" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#febc2e]" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#28c840]" />
              </p>
              <p className="mt-[4%] flex items-center text-[5px] leading-tight sm:text-[6px]">
                <span className="text-emerald-400">miriam@desk</span>
                <span className="text-zinc-500">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-zinc-500">$</span>
                <span className="ml-0.5 inline-block h-[6px] w-[3px] bg-zinc-300 [animation:terminal-blink_1.1s_steps(1)_infinite]" />
              </p>
              <p className="mt-[3%] h-[3px] w-2/3 rounded-full bg-zinc-700" />
              <p className="mt-[3%] h-[3px] w-1/2 rounded-full bg-zinc-700/70" />
            </div>
          </div>
          {/* hinge */}
          <div className="h-[3px] bg-zinc-600 dark:bg-zinc-950" />
          {/* keyboard deck */}
          <div className="rounded-b-lg bg-gradient-to-b from-zinc-300 to-zinc-400 px-[6%] pb-[5%] pt-[4%] dark:from-zinc-700 dark:to-zinc-800">
            {/* keys */}
            <div className="h-8 rounded-sm bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_9px),repeating-linear-gradient(to_bottom,rgba(0,0,0,0.18)_0px,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_8px)] opacity-70 sm:h-10 dark:opacity-90" />
            {/* trackpad */}
            <div className="mx-auto mt-[4%] h-4 w-2/5 rounded-sm bg-black/10 shadow-inner sm:h-5 dark:bg-white/5" />
          </div>
        </div>
        <span className="desk-label pointer-events-none mt-2 block text-center text-[11px] font-medium tracking-wide text-white/0 transition-colors duration-250 group-hover:text-white/70 dark:group-hover:text-amber-100/60">
          Terminal
        </span>
      </motion.button>

      <AnimatePresence>{open && <ComputerModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}
