"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookViewer from "@/components/BookViewer";
import BookCover from "@/components/BookCover";
import { creatures } from "@/data/creatures";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            exit={{ rotateY: -90, opacity: 0, transformOrigin: "right center" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ perspective: "1200px" }}
          >
            <BookCover onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ perspective: "1200px" }}
          >
            <BookViewer creatures={creatures} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
