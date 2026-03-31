"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealSection } from "@/lib/types";

const revealIcons: Record<string, string> = {
  survive: "🛡️",
  abilities: "✨",
  lair: "🏚️",
  diet: "🍖",
  alignment: "🤝",
  scale: "📏",
  weaknesses: "🔥",
  social: "👥",
  signs: "👂",
  strange: "❓",
  origin: "📜",
};

interface RevealCardProps {
  reveal: RevealSection;
}

export default function RevealCard({ reveal }: RevealCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const icon = reveal.icon || revealIcons[reveal.type] || "📖";

  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: "var(--color-parchment-dark)" }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-bold" style={{ color: "var(--color-accent)" }}>
            {reveal.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl"
          style={{ color: "var(--color-ink-light)" }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div
                className="w-full h-px mb-3"
                style={{ backgroundColor: "var(--color-ink-light)", opacity: 0.2 }}
              />
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-ink)" }}
              >
                {reveal.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
