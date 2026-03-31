"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Creature } from "@/lib/types";
import CreaturePage from "./CreaturePage";

interface BookViewerProps {
  creatures: Creature[];
}

export default function BookViewer({ creatures }: BookViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function goTo(next: number) {
    if (next < 0 || next >= creatures.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={creatures[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full"
        >
          <CreaturePage creature={creatures[index]} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div
        className="fixed bottom-6 left-0 right-0 flex justify-center items-center gap-6 z-50"
      >
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-opacity disabled:opacity-30"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-parchment)" }}
          aria-label="יצור קודם"
        >
          ›
        </button>

        <span className="text-sm" style={{ color: "var(--color-ink-light)" }}>
          {index + 1} / {creatures.length}
        </span>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === creatures.length - 1}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-opacity disabled:opacity-30"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-parchment)" }}
          aria-label="יצור הבא"
        >
          ‹
        </button>
      </div>
    </div>
  );
}
