'use client';

import WorldMap from "./WorldMap";
import Book from "./Book";
import QuotePrinter from "./QuotePrinter";
import ThemeLamp from "./ThemeLamp";
import Computer from "./Computer";

export default function Desk() {
  return (
    <div className="relative mx-auto w-full">
      {/*
        The desk surface, viewed from directly above.
        NOTE: this element must never get a transform/filter of its own —
        object hover transforms live on the objects themselves.
      */}
      <div className="relative w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(60,36,10,0.45),0_12px_24px_-8px_rgba(60,36,10,0.3)] sm:rounded-[2.75rem] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.75),0_12px_24px_-8px_rgba(0,0,0,0.5)]">
        {/* wood base tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c69a68] via-[#b8895a] to-[#a5764b] dark:from-[#6b4a2e] dark:via-[#5c3f27] dark:to-[#4c3320]" />

        {/* wood grain (static SVG noise, rendered once) */}
        <svg className="absolute inset-0 h-full w-full opacity-45 mix-blend-multiply dark:opacity-60" aria-hidden>
          <filter id="wood-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.11" numOctaves="3" seed="8" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0 0.15  0 0 0 0.55 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#wood-grain)" />
        </svg>

        {/* plank seams */}
        <div className="absolute inset-x-0 top-1/3 h-px bg-black/15" />
        <div className="absolute inset-x-0 top-1/3 mt-px h-px bg-white/10" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-black/15" />
        <div className="absolute inset-x-0 top-2/3 mt-px h-px bg-white/10" />

        {/* soft edge vignette + sheen */}
        <div className="absolute inset-0 shadow-[inset_0_2px_2px_rgba(255,255,255,0.25),inset_0_0_80px_rgba(50,28,8,0.35)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_0_100px_rgba(0,0,0,0.55)]" />

        {/* sizing frame: taller on phones, wide on desktop */}
        <div className="relative aspect-[3/5] sm:aspect-[16/11]">
          <ThemeLamp className="absolute right-[4%] top-[3%] w-[32%] sm:right-[3.5%] sm:top-[5%] sm:w-[19%]" />
          <Computer className="absolute left-[8%] top-[4%] w-[30%] sm:left-[11%] sm:top-[5%] sm:w-[18%]" />
          <WorldMap className="absolute left-[7%] top-[28%] w-[42%] sm:left-[9%] sm:top-[38%] sm:w-[27%]" />
          <Book className="absolute right-[8%] top-[26%] w-[24%] sm:right-auto sm:left-[53%] sm:top-[15%] sm:w-[15%]" />
          <QuotePrinter className="absolute left-1/2 top-[50%] w-[64%] -translate-x-1/2 sm:left-[36%] sm:top-[46%] sm:w-[34%] sm:translate-x-0" />
        </div>
      </div>
    </div>
  );
}
