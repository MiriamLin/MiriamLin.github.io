'use client';

import { useEffect, useState } from "react";

// ── Edit your terminal content here ──────────────────────────────────────
// Every supported command lives in this file. To add a page, add an entry
// to PAGES below — it automatically appears in `ls` and works with `cat`.

const ABOUT = [
  "Hi!",
  "",
  "I'm Miriam.",
  "",
  "A Computer Science student from National Taiwan University.",
  "",
  "Interested in AI, research, and building products.",
];

const BOOKS = [
  { heading: "Currently Reading" },
  "• Thinking, Fast and Slow",
  "• Lessons in Chemistry",
];

const CONTACT = [
  { heading: "Email" },
  "miriamlin2005@gmail.com",
];

const NOW_LOCATION = "Lausanne, Switzerland";
const NOW_TIMEZONE = "Europe/Zurich";
const NOW_CURRENTLY = "Doing AI research at EPFL";
// ──────────────────────────────────────────────────────────────────────────

type LineSpec = string | { heading: string };

function Lines({ lines }: { lines: LineSpec[] }) {
  return (
    <>
      {lines.map((line, i) =>
        typeof line === "string" ? (
          <p key={i} className="min-h-[1.4em] whitespace-pre-wrap">{line}</p>
        ) : (
          <p key={i} className="font-semibold text-zinc-100">{line.heading}</p>
        )
      )}
    </>
  );
}

// Live clock for `cat now` — updates every second.
function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: NOW_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "shortOffset",
  }).format(now);
  return <>{time}</>;
}

function Now() {
  return (
    <>
      <p className="font-semibold text-zinc-100">Location</p>
      <p>{NOW_LOCATION}</p>
      <p className="min-h-[1.4em]" />
      <p className="font-semibold text-zinc-100">Local Time</p>
      <p><LocalTime /></p>
      <p className="min-h-[1.4em]" />
      <p className="font-semibold text-zinc-100">Currently</p>
      <p>{NOW_CURRENTLY}</p>
    </>
  );
}

const PAGES: Record<string, React.ReactNode> = {
  about: <Lines lines={ABOUT} />,
  now: <Now />,
  books: <Lines lines={BOOKS} />,
  contact: <Lines lines={CONTACT} />,
};

const HELP = (
  <>
    <p className="font-semibold text-zinc-100">Available commands</p>
    <p className="min-h-[1.4em]" />
    {[
      ["help", "Show available commands"],
      ["ls", "List available pages"],
      ["cat", "Read a page"],
      ["clear", "Clear the terminal"],
    ].map(([cmd, desc]) => (
      <p key={cmd} className="whitespace-pre-wrap">
        <span className="whitespace-pre text-emerald-400">{cmd.padEnd(10)}</span>
        {desc}
      </p>
    ))}
  </>
);

const LS = (
  <>
    {Object.keys(PAGES).map((page) => (
      <p key={page} className="text-sky-400">{page}</p>
    ))}
  </>
);

const UNKNOWN = (
  <>
    <p>Unknown command.</p>
    <p className="min-h-[1.4em]" />
    <p>
      Type <span className="text-emerald-400">&quot;help&quot;</span>.
    </p>
  </>
);

export const WELCOME = [
  "MiriamOS v1.0",
  "",
  "Welcome :)",
  "",
  'Type "help" to get started.',
  "",
];

// Returns the output for a command, or "clear" for the clear action.
export function runCommand(raw: string): React.ReactNode | "clear" {
  const input = raw.trim().replace(/\s+/g, " ");
  if (input === "clear") return "clear";
  if (input === "help") return HELP;
  if (input === "ls") return LS;
  if (input.startsWith("cat ")) {
    const page = input.slice(4);
    if (page in PAGES) return PAGES[page];
  }
  return UNKNOWN;
}
