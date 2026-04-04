"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Creature } from "@/lib/types";
import { Filters, filterCreatures } from "@/lib/search";
import CreaturePage from "@/components/CreaturePage";
import SearchPanel from "@/components/SearchPanel";

interface BookViewerProps {
  creatures: Creature[];
}

const SWIPE_THRESHOLD = 50;

export default function PortraitBookViewer({ creatures }: BookViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const touchStartX = useRef<number | null>(null);

  const filtered = filterCreatures(creatures, query, filters);
  const safeIndex = Math.min(index, Math.max(0, filtered.length - 1));

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= filtered.length || isFlipping) return;
    setDirection(next > safeIndex ? 1 : -1);
    setIsFlipping(true);
    setIndex(next);
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => setIsFlipping(false), 600);
  }, [safeIndex, filtered.length, isFlipping]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx > 0) goTo(safeIndex - 1);
    else goTo(safeIndex + 1);
  }

  const variants = {
    enter: (dir: 1 | -1) => ({
      rotateY: dir > 0 ? -90 : 90,
    }),
    center: {
      rotateY: 0,
      transition: {
        rotateY: { type: "spring" as const, stiffness: 220, damping: 28 },
      },
    },
    exit: (dir: 1 | -1) => ({
      rotateY: dir > 0 ? 90 : -90,
      transition: {
        rotateY: { type: "spring" as const, stiffness: 220, damping: 28 },
      },
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-6 px-4"
      style={{ background: "linear-gradient(160deg, #2c1810 0%, #1a0f08 100%)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="w-full max-w-lg flex items-center justify-center mb-4">
        <h1 className="text-xl font-black" style={{ color: "var(--color-accent-gold)" }}>
          ספר היצורים המופלאים
        </h1>
      </div>

      {/* Book frame — perspective set here, not on the animating child */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--color-parchment)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(139,69,19,0.3)",
          minHeight: "82vh",
          perspective: "1400px",
          perspectiveOrigin: "center center",
        }}
      >
        <div className="absolute top-0 right-0 w-6 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)" }} />

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 gap-3">
            <span className="text-4xl">🔍</span>
            <p style={{ color: "var(--color-ink-light)" }}>לא נמצאו יצורים</p>
          </div>
        )}

        {filtered.length > 0 && (
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={filtered[safeIndex]?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Front face */}
              <div style={{ backfaceVisibility: "hidden" }}>
                <CreaturePage creature={filtered[safeIndex]} />
              </div>

              {/* Back face — plain lined parchment visible mid-flip */}
              <div
                className="absolute inset-0 min-h-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "var(--color-parchment)",
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(139,69,19,0.07) 31px, rgba(139,69,19,0.07) 32px)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Navigation */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-6 mt-5">
          <button onClick={() => goTo(safeIndex - 1)} disabled={safeIndex === 0 || isFlipping}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}>‹</button>

          <div className="flex gap-2">
            {filtered.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
                style={{
                  width: i === safeIndex ? "20px" : "8px", height: "8px",
                  backgroundColor: i === safeIndex ? "var(--color-accent-gold)" : "rgba(197,148,58,0.35)",
                }} />
            ))}
          </div>

          <button onClick={() => goTo(safeIndex + 1)} disabled={safeIndex === filtered.length - 1 || isFlipping}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}>›</button>
        </div>
      )}

      <SearchPanel query={query} filters={filters} onQueryChange={setQuery}
        onFiltersChange={setFilters} resultCount={filtered.length} />
    </div>
  );
}
