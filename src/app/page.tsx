"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookCover from "@/components/BookCover";
import PortraitBookViewer from "@/layouts/portrait/BookViewer";
import { creatures } from "@/data/creatures";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <BookCover onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <PortraitBookViewer creatures={creatures} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
