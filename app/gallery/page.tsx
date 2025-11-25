export default function GalleryPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 text-center">
      <p
        className="bg-gradient-to-r from-slate-900 via-blue-600 to-cyan-300 bg-clip-text text-5xl font-extrabold uppercase tracking-[0.14em] text-transparent drop-shadow-[0_0_12px_rgba(60,150,220,0.5)]"
        style={{
          fontFamily: "'Eurostile', 'Bank Gothic', 'Orbitron', 'Segoe UI', sans-serif",
          backgroundSize: "180% 180%",
          animation: "neonSweep 5s ease-in-out infinite",
        }}
      >
        Under Construction
      </p>
      <style>{`
        @keyframes neonSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 10px rgba(90,190,255,0.55)); }
          50% { background-position: 100% 50%; filter: drop-shadow(0 0 16px rgba(140,210,255,0.65)); }
          100% { background-position: 0% 50%; filter: drop-shadow(0 0 10px rgba(90,190,255,0.55)); }
        }
      `}</style>
    </main>
  );
}
