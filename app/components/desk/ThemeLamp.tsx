'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Turning the lamp ON switches the site to dark mode — the room goes dark
// and the desk is lit by the lamp — and OFF returns to daylight.
export default function ThemeLamp({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    // Animate every themed color on the page for ~500ms (see globals.css).
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 600);
  };

  const lit = mounted && isDark;

  return (
    <div className={className}>
      {/* Warm pool of light cast onto the desk (kept outside the hover transform) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[340%] w-[340%] -translate-x-[62%] -translate-y-[38%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,196,110,0.5), rgba(255,180,90,0.18) 55%, transparent 72%)",
        }}
        initial={false}
        animate={{ opacity: lit ? [0, 0.9, 0.25, 1, 0.6, 1] : 0 }}
        transition={{ duration: lit ? 0.8 : 0.5, ease: "easeOut" }}
      />

      <motion.button
        type="button"
        onClick={toggle}
        aria-label={lit ? "Turn lamp off — switch to light mode" : "Turn lamp on — switch to dark mode"}
        aria-pressed={lit}
        className="group relative block w-full cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {/* Lamp seen from above: base in the corner, arm, round shade */}
        <svg viewBox="0 0 140 140" className="w-full drop-shadow-[0_6px_14px_rgba(60,36,10,0.35)]">
          <defs>
            <radialGradient id="lamp-shade" cx="38%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#5b616b" />
              <stop offset="100%" stopColor="#31353c" />
            </radialGradient>
            <radialGradient id="lamp-base" cx="40%" cy="35%" r="80%">
              <stop offset="0%" stopColor="#4c525b" />
              <stop offset="100%" stopColor="#282c32" />
            </radialGradient>
          </defs>

          {/* base, tucked toward the corner */}
          <circle cx="108" cy="34" r="22" fill="url(#lamp-base)" />
          <circle cx="108" cy="34" r="22" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          <circle cx="108" cy="34" r="7" fill="#1e2126" />

          {/* arm reaching over the desk */}
          <path d="M100,44 Q78,60 62,80" fill="none" stroke="#3a3f46" strokeWidth="8" strokeLinecap="round" />
          <path d="M100,44 Q78,60 62,80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />

          {/* shade */}
          <circle cx="52" cy="94" r="32" fill="url(#lamp-shade)" />
          <circle cx="52" cy="94" r="32" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />

          {/* bulb — flickers between states, brightens on hover */}
          <motion.circle
            cx="52"
            cy="94"
            r="20"
            initial={false}
            animate={{
              opacity: lit ? [0.15, 1, 0.3, 1, 0.55, 1] : 0.35,
              fill: lit ? "#ffd9a0" : "#8b9099",
            }}
            transition={{ duration: lit ? 0.8 : 0.4 }}
            className="transition-[filter] duration-250 group-hover:brightness-110"
          />
          <motion.circle
            cx="52"
            cy="94"
            r="9"
            initial={false}
            animate={{
              opacity: lit ? [0, 1, 0.2, 1, 0.5, 1] : 0,
              fill: "#fff3dd",
            }}
            transition={{ duration: lit ? 0.8 : 0.3 }}
          />
          {/* subtle hover halo so the bulb "glows brighter" even when off */}
          <circle
            cx="52"
            cy="94"
            r="27"
            fill="rgba(255,200,120,0.28)"
            className="opacity-0 transition-opacity duration-250 group-hover:opacity-100"
          />
        </svg>
        <span className="desk-label pointer-events-none mt-1 block text-center text-[11px] font-medium tracking-wide text-white/0 transition-colors duration-250 group-hover:text-white/70 dark:group-hover:text-amber-100/60">
          {lit ? "Lights on" : "Lights off"}
        </span>
      </motion.button>
    </div>
  );
}
