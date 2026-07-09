'use client';

import { motion } from "framer-motion";
import { Prompt } from "./TerminalInput";

export type Entry = {
  id: number;
  command: string;
  output: React.ReactNode;
};

// One executed command: the echoed prompt line plus its output, fading in.
export default function TerminalOutput({ entry }: { entry: Entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div className="flex items-start">
        <Prompt />
        <span className="min-w-0 break-all">{entry.command}</span>
      </div>
      {entry.output && (
        <motion.div
          className="mt-1 mb-2 text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.08 }}
        >
          {entry.output}
        </motion.div>
      )}
    </motion.div>
  );
}
