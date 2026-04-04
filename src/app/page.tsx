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
            exit={{ rotateY: -90, transformOrigin: "right center" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            style={{ perspective: "1400px" }}
          >
            <BookCover onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            style={{ perspective: "1400px" }}
          >
            <PortraitBookViewer creatures={creatures} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
