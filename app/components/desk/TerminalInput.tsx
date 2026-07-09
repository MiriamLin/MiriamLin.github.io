'use client';

import { useEffect, useRef } from "react";

export function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-emerald-400">miriam@desk</span>
      <span className="text-zinc-500">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-zinc-500">$</span>
      <span>&nbsp;</span>
    </span>
  );
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="flex cursor-text items-start font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <Prompt />
      <span className="relative min-w-0 break-all">
        {value}
        {/* blinking block cursor */}
        <span
          aria-hidden
          className="ml-px inline-block h-[1.15em] w-[0.55em] translate-y-[0.2em] bg-zinc-300 [animation:terminal-blink_1.1s_steps(1)_infinite]"
        />
        {/* invisible input that actually captures keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // deliberately not a real shell: no history, no tab, no arrows
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
              e.preventDefault();
              return;
            }
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
          className="absolute inset-0 h-full w-full cursor-text opacity-0"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          aria-label="Terminal input"
        />
      </span>
    </div>
  );
}
