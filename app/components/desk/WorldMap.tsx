'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { WORLD_LAND_PATH } from "./world-path";

// ── Edit your places here ─────────────────────────────────────────────────
// color: "green" | "blue" | "yellow"
const PLACES = [
  { name: "Taipei", country: "Taiwan", lat: 25.03, lon: 121.56, color: "green" },
  { name: "Edinburgh", country: "Scotland", lat: 55.95, lon: -3.19, color: "blue" },
  { name: "Lausanne", country: "Switzerland", lat: 46.52, lon: 6.63, color: "blue" },
  { name: "Tokyo", country: "Japan", lat: 35.68, lon: 139.69, color: "yellow" },
  { name: "Seoul", country: "South Korea", lat: 37.57, lon: 126.98, color: "yellow" },
  { name: "Hong Kong", country: "", lat: 22.32, lon: 114.17, color: "yellow" },
  { name: "London", country: "England", lat: 51.51, lon: -0.13, color: "yellow" },
  { name: "Paris", country: "France", lat: 48.86, lon: 2.35, color: "yellow" },
  { name: "Rome", country: "Italy", lat: 41.9, lon: 12.5, color: "yellow" },
  { name: "Dublin", country: "Ireland", lat: 53.35, lon: -6.26, color: "yellow" },
  { name: "Munich", country: "Germany", lat: 48.14, lon: 11.58, color: "yellow" },
  { name: "Zurich", country: "Switzerland", lat: 47.37, lon: 8.54, color: "yellow" },
] as const;
// ──────────────────────────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
  green: "#059669",
  blue: "#2563eb",
  yellow: "#f59e0b",
};

// Equirectangular projection into the 1000×420 viewBox (map cropped at 60°S).
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

function MapModal({ onClose }: { onClose: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Modal label="Places I've lived and visited" onClose={onClose}>
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
        Places
      </h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-zinc-400">
        Cities I&rsquo;ve lived in or visited
      </p>

      <svg viewBox="0 0 1000 420" className="mt-6 w-full" role="img" aria-label="World map with city markers">
        {/* graticule */}
        {[70, 140, 210, 280, 350].map((y) => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} className="stroke-stone-200/70 dark:stroke-zinc-800" strokeWidth="1" />
        ))}
        {[167, 333, 500, 667, 833].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="420" className="stroke-stone-200/70 dark:stroke-zinc-800" strokeWidth="1" />
        ))}

        {/* land — real Natural Earth 110m geometry */}
        <path d={WORLD_LAND_PATH} fillRule="evenodd" className="fill-stone-200 dark:fill-zinc-700" />

        {/* dot layer — all markers */}
        {PLACES.map((p, i) => {
          const { x, y } = project(p.lat, p.lon);
          const c = COLORS[p.color];
          const active = hovered === p.name;
          return (
            <motion.g
              key={p.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 + i * 0.07 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(active ? null : p.name)}
              className="cursor-pointer"
            >
              {/* generous invisible hit area */}
              <circle cx={x} cy={y} r={12} fill="transparent" />
              <circle cx={x} cy={y} r={active ? 9 : 7} fill={c} opacity={0.25} />
              <circle
                cx={x}
                cy={y}
                r={active ? 5 : 3.8}
                fill={c}
                stroke="white"
                strokeWidth={1.4}
                style={{ transition: "r 150ms ease" }}
              />
            </motion.g>
          );
        })}

        {/* label layer — rendered after every dot so it's never covered by a neighboring marker */}
        {PLACES.map((p) => {
          if (hovered !== p.name) return null;
          const { x, y } = project(p.lat, p.lon);
          return (
            <text
              key={p.name}
              x={x}
              y={y - 13}
              textAnchor="middle"
              strokeLinejoin="round"
              className="pointer-events-none fill-stone-900 stroke-white text-[14px] font-semibold [paint-order:stroke] dark:fill-zinc-50 dark:stroke-zinc-900"
              strokeWidth={4}
            >
              {p.name}
            </text>
          );
        })}
      </svg>

      {/* city chips — hovering one highlights its dot */}
      <div className="mt-6 flex flex-wrap gap-2">
        {PLACES.map((p, i) => (
          <motion.button
            key={p.name}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === p.name ? null : p.name)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              hovered === p.name
                ? "bg-stone-200 text-stone-900 dark:bg-zinc-700 dark:text-zinc-100"
                : "bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[p.color] }}
            />
            {p.name}
            {p.country && <span className="text-stone-400 dark:text-zinc-500">· {p.country}</span>}
          </motion.button>
        ))}
      </div>
    </Modal>
  );
}

export default function WorldMap({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open map of places I've lived and visited"
        aria-haspopup="dialog"
        className="group block w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-lg"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {/* Folded paper map, seen from above */}
        <svg viewBox="0 0 200 138" className="w-full -rotate-3 drop-shadow-[0_6px_12px_rgba(60,36,10,0.28)] transition-[filter] duration-250 group-hover:drop-shadow-[0_14px_24px_rgba(60,36,10,0.38)]">
          <defs>
            <clipPath id="map-clip">
              <rect x="2" y="2" width="196" height="134" rx="5" />
            </clipPath>
          </defs>
          <rect x="2" y="2" width="196" height="134" rx="5" className="fill-[#f6efdf] dark:fill-[#e8dfc9]" />
          <g clipPath="url(#map-clip)">
            {/* accordion fold shading */}
            <rect x="51" y="0" width="49" height="138" fill="#000" opacity="0.05" />
            <rect x="149" y="0" width="49" height="138" fill="#000" opacity="0.05" />
            <line x1="51" y1="0" x2="51" y2="138" stroke="#8a6a3f" strokeWidth="0.8" opacity="0.35" />
            <line x1="100" y1="0" x2="100" y2="138" stroke="#8a6a3f" strokeWidth="0.8" opacity="0.25" />
            <line x1="149" y1="0" x2="149" y2="138" stroke="#8a6a3f" strokeWidth="0.8" opacity="0.35" />
            {/* faint printed geography */}
            <path d="M20,44 Q42,28 66,40 Q88,52 82,74 Q76,94 52,92 Q28,90 22,68 Q18,54 20,44 Z" fill="#a8bfa0" opacity="0.55" />
            <path d="M112,84 Q132,70 156,80 Q178,90 172,108 Q166,126 140,122 Q116,118 110,100 Q107,90 112,84 Z" fill="#a8bfa0" opacity="0.5" />
            <path d="M124,26 Q140,18 158,26 Q172,33 166,46 Q160,58 142,54 Q124,50 121,38 Q120,30 124,26 Z" fill="#c4d4ce" opacity="0.6" />
            <path d="M14,110 Q40,100 64,110 Q84,118 104,112" fill="none" stroke="#9db6c9" strokeWidth="1.4" opacity="0.6" />
            {/* dashed route with endpoint dots */}
            <path d="M46,64 Q90,40 140,42 Q168,44 164,94" fill="none" stroke="#c2571b" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.85" />
            <circle cx="46" cy="64" r="3" fill="#c2571b" />
            <circle cx="164" cy="94" r="3" fill="#c2571b" />
            {/* compass */}
            <g opacity="0.5">
              <circle cx="178" cy="20" r="9" fill="none" stroke="#8a6a3f" strokeWidth="1" />
              <path d="M178,13.5 L180.5,20 L178,26.5 L175.5,20 Z" fill="#8a6a3f" />
            </g>
          </g>
          <rect x="2" y="2" width="196" height="134" rx="5" fill="none" stroke="#8a6a3f" strokeWidth="0.8" opacity="0.25" />
        </svg>
        <span className="desk-label pointer-events-none mt-3 block text-center text-[11px] font-medium tracking-wide text-white/0 transition-colors duration-250 group-hover:text-white/70 dark:group-hover:text-amber-100/60">
          Places
        </span>
      </motion.button>

      <AnimatePresence>{open && <MapModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}
