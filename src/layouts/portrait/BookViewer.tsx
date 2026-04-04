"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Creature } from "@/lib/types";
import CreaturePage from "@/components/CreaturePage";

interface BookViewerProps {
  creatures: Creature[];
}

const SWIPE_THRESHOLD = 50;

export default function PortraitBookViewer({ creatures }: BookViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const safeIndex = Math.min(index, Math.max(0, creatures.length - 1));

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= creatures.length) return;
    setDirection(next > safeIndex ? 1 : -1);
    setIndex(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [safeIndex, creatures.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx > 0) goTo(safeIndex + 1);
    else goTo(safeIndex - 1);
  }

  const variants = {
    enter: (dir: 1 | -1) => ({
      x: dir > 0 ? "-100%" : "100%",
    }),
    center: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 380, damping: 38 },
    },
    exit: (dir: 1 | -1) => ({
      x: dir > 0 ? "100%" : "-100%",
      transition: { type: "spring" as const, stiffness: 380, damping: 38 },
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-6 px-4"
      style={{ background: "linear-gradient(160deg, #2c1810 0%, #1a0f08 100%)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Book frame */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--color-parchment)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(139,69,19,0.3)",
          minHeight: "82vh",
        }}
      >
        <div className="absolute top-0 right-0 w-6 h-full z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)" }} />

        {creatures.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 gap-3">
            <span className="text-4xl">🔍</span>
            <p style={{ color: "var(--color-ink-light)" }}>לא נמצאו יצורים</p>
          </div>
        )}

        {creatures.length > 0 && (
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={creatures[safeIndex]?.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <CreaturePage creature={creatures[safeIndex]} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Navigation */}
      {creatures.length > 0 && (
        <div className="flex items-center gap-6 mt-5">
          <button onClick={() => goTo(safeIndex - 1)} disabled={safeIndex === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}>‹</button>

          <div className="flex gap-2">
            {creatures.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
                style={{
                  width: i === safeIndex ? "20px" : "8px", height: "8px",
                  backgroundColor: i === safeIndex ? "var(--color-accent-gold)" : "rgba(197,148,58,0.35)",
                }} />
            ))}
          </div>

          <button onClick={() => goTo(safeIndex + 1)} disabled={safeIndex === creatures.length - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg disabled:opacity-30 active:scale-95"
            style={{ backgroundColor: "var(--color-accent-gold)", color: "#2c1810" }}>›</button>
        </div>
      )}
    </div>
  );
}
