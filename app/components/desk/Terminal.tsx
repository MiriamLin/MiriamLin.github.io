'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WELCOME, runCommand } from "./terminal-commands";
import TerminalInput from "./TerminalInput";
import TerminalOutput, { type Entry } from "./TerminalOutput";

let nextId = 1;

export default function Terminal({ onClose }: { onClose?: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [clearing, setClearing] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // keep the latest line in view
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, showWelcome]);

  const submit = () => {
    if (clearing) return;
    const command = value;
    setValue("");

    const result = runCommand(command);
    if (result === "clear") {
      // fade everything out, then start fresh with just the prompt
      setClearing(true);
      window.setTimeout(() => {
        setEntries([]);
        setShowWelcome(false);
        setClearing(false);
      }, 220);
      return;
    }
    // empty input: just echo a fresh prompt line
    const output = command.trim() === "" ? null : result;
    setEntries((prev) => [...prev, { id: nextId++, command, output }]);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-[#17181d] shadow-[0_18px_45px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
      {/* title bar — the red light closes the terminal */}
      <div className="relative flex items-center gap-1.5 border-b border-white/5 bg-[#1f2027] px-3.5 py-2.5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close terminal"
          className="group/close relative z-10 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[#ff5f57]"
        >
          <span className="text-[8px] font-bold leading-none text-[#7d1a12] opacity-0 transition-opacity duration-150 group-hover/close:opacity-100">
            ×
          </span>
        </button>
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="absolute inset-x-0 text-center font-mono text-[11px] text-zinc-500">
          miriam@desk — zsh
        </span>
      </div>

      {/* body */}
      <div
        ref={bodyRef}
        className="h-[60vh] max-h-[26rem] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300 sm:text-[13px]"
        aria-label="Terminal"
      >
        <AnimatePresence>
          {!clearing && (
            <motion.div key="content" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              {showWelcome && (
                <div className="mb-2">
                  {WELCOME.map((line, i) => (
                    <motion.p
                      key={i}
                      className="min-h-[1.4em] whitespace-pre-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.09 }}
                    >
                      {i === 0 ? (
                        <span className="font-semibold text-zinc-100">{line}</span>
                      ) : (
                        line
                      )}
                    </motion.p>
                  ))}
                </div>
              )}
              {entries.map((entry) => (
                <TerminalOutput key={entry.id} entry={entry} />
              ))}
              <TerminalInput value={value} onChange={setValue} onSubmit={submit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
