"use client";

import { motion } from "framer-motion";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(160deg, #2c1810 0%, #1a0f08 100%)" }}
    >
      {/* Cover card */}
      <motion.div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl cursor-pointer select-none"
        style={{
          background: "linear-gradient(160deg, #5c2a0e 0%, #3a1a08 100%)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(197,148,58,0.4)",
          minHeight: "75vh",
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpen}
      >
        {/* Spine shadow */}
        <div
          className="absolute top-0 right-0 w-8 h-full pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 100%)" }}
        />

        {/* Decorative border */}
        <div
          className="absolute inset-4 rounded-xl pointer-events-none"
          style={{ border: "1px solid rgba(197,148,58,0.35)" }}
        />
        <div
          className="absolute inset-6 rounded-lg pointer-events-none"
          style={{ border: "1px solid rgba(197,148,58,0.15)" }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8 py-12" style={{ minHeight: "75vh" }}>
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="text-8xl mb-8"
          >
            🐉
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl font-black text-center leading-tight mb-3"
            style={{ color: "var(--color-accent-gold)", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            ספר היצורים המופלאים
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-32 h-px my-4"
            style={{ backgroundColor: "rgba(197,148,58,0.5)" }}
          />

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-center text-lg"
            style={{ color: "rgba(197,148,58,0.7)" }}
          >
            מדריך מאוייר לילדים
          </motion.p>

          {/* Open prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ delay: 1.4, duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
            className="absolute bottom-12 text-center"
            style={{ color: "rgba(197,148,58,0.6)" }}
          >
            <p className="text-sm">לחץ לפתיחה</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
