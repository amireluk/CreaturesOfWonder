"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Creature } from "@/lib/types";
import { Filters, filterCreatures } from "@/lib/search";
import { assetUrl } from "@/lib/assets";
import CreaturePage from "./CreaturePage";
import SearchPanel from "./SearchPanel";

interface BookViewerProps {
  creatures: Creature[];
}

export default function BookViewer({ creatures }: BookViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered = filterCreatures(creatures, query, filters);
  const current = filtered[index] ?? filtered[0];
  const safeIndex = filtered.indexOf(current) === -1 ? 0 : filtered.indexOf(current);

  // Reset index when filters change
  useEffect(() => {
    setIndex(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [query, filters]);

  // Sound
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(assetUrl("/sounds/ambient.mp3"));
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }
    if (soundEnabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [soundEnabled]);

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= filtered.length || isFlipping) return;
    setIsFlipping(true);
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => setIsFlipping(false), 500);
  }, [index, filtered.length, isFlipping]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx > 0) goTo(safeIndex - 1);
    else goTo(safeIndex + 1);
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      rotateY: dir > 0 ? 25 : -25,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      rotateY: dir > 0 ? -25 : 25,
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
      <div className="w-full max-w-lg flex items-center justify-between mb-4">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all"
          style={{
            backgroundColor: "rgba(44,24,16,0.7)",
            color: soundEnabled ? "var(--color-accent-gold)" : "rgba(197,148,58,0.4)",
            border: "1px solid rgba(197,148,58,0.2)",
          }}
          aria-label={soundEnabled ? "השתק" : "הפעל צלילים"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>

        <h1
          className="text-xl font-black"
          style={{ color: "var(--color-accent-gold)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          ספר היצורים המופלאים
        </h1>

        {/* spacer to balance layout */}
        <div className="w-9" />
      </div>

      {/* Book frame */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--color-parchment)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(139,69,19,0.3)",
          minHeight: "82vh",
        }}
      >
        {/* Spine shadow RTL */}
        <div
          className="absolute top-0 right-0 w-6 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none z-10"
          style={{ background: "radial-gradient(circle at 0% 100%, rgba(0,0,0,0.06) 0%, transparent 70%)" }}
        />

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 gap-3">
            <span className="text-4xl">🔍</span>
            <p style={{ color: "var(--color-ink-light)" }}>לא נמצאו יצורים</p>
          </div>
        )}

        {/* Page content */}
        {filtered.length > 0 && (
          <div className="relative overflow-hidden" style={{ perspective: "1200px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={filtered[safeIndex]?.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
              >
                <CreaturePage creature={filtered[safeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Navigation */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-6 mt-5">
          <button
            onClick={() => goTo(safeIndex - 1)}
            disabled={safeIndex === 0 || isFlipping}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}
            aria-label="יצור קודם"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === safeIndex ? "20px" : "8px",
                  height: "8px",
                  backgroundColor: i === safeIndex ? "var(--color-accent-gold)" : "rgba(197,148,58,0.35)",
                }}
                aria-label={`יצור ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(safeIndex + 1)}
            disabled={safeIndex === filtered.length - 1 || isFlipping}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}
            aria-label="יצור הבא"
          >
            ›
          </button>
        </div>
      )}

      {/* Search panel */}
      <SearchPanel
        query={query}
        filters={filters}
        onQueryChange={setQuery}
        onFiltersChange={setFilters}
        resultCount={filtered.length}
      />
    </div>
  );
}
