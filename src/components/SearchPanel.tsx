"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Habitat, Size, DangerLevel } from "@/lib/types";
import { Filters } from "@/lib/search";
import { habitats, sizeLabels } from "@/lib/habitats";

interface SearchPanelProps {
  query: string;
  filters: Filters;
  onQueryChange: (q: string) => void;
  onFiltersChange: (f: Filters) => void;
  resultCount: number;
}

const dangerLabels: Record<number, string> = {
  1: "נמוכה",
  2: "בינונית",
  3: "גבוהה",
  4: "מסוכנת",
  5: "קטלנית",
};

export default function SearchPanel({
  query,
  filters,
  onQueryChange,
  onFiltersChange,
  resultCount,
}: SearchPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = query || filters.habitat || filters.size || filters.danger;

  function clearAll() {
    onQueryChange("");
    onFiltersChange({});
  }

  return (
    <>
      {/* Floating search button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
        style={{
          backgroundColor: hasActiveFilters ? "var(--color-accent-gold)" : "rgba(44,24,16,0.85)",
          color: hasActiveFilters ? "#2c1810" : "var(--color-accent-gold)",
          border: "1px solid rgba(197,148,58,0.4)",
        }}
        aria-label="חיפוש וסינון"
      >
        {hasActiveFilters ? "✕" : "🔍"}
      </button>

      {/* Active filter badge */}
      {hasActiveFilters && (
        <div
          className="fixed top-5 left-16 z-50 px-2 py-1 rounded-full text-xs"
          style={{ backgroundColor: "rgba(44,24,16,0.85)", color: "var(--color-accent-gold)" }}
        >
          {resultCount} יצורים
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-6"
              style={{ backgroundColor: "var(--color-parchment)", maxHeight: "80vh", overflowY: "auto" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: "var(--color-parchment-dark)" }} />

              {/* Search input */}
              <div className="mb-5">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="חפש יצור..."
                  className="w-full px-4 py-3 rounded-xl text-right outline-none text-base"
                  style={{
                    backgroundColor: "var(--color-parchment-dark)",
                    color: "var(--color-ink)",
                    border: "1px solid rgba(139,69,19,0.2)",
                  }}
                  autoFocus
                />
              </div>

              {/* Habitat filter */}
              <div className="mb-4">
                <p className="text-xs font-bold mb-2" style={{ color: "var(--color-ink-light)" }}>בית גידול</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(habitats) as Habitat[]).map((h) => (
                    <button
                      key={h}
                      onClick={() => onFiltersChange({ ...filters, habitat: filters.habitat === h ? undefined : h })}
                      className="px-3 py-1.5 rounded-full text-sm transition-all"
                      style={{
                        backgroundColor: filters.habitat === h ? "var(--color-accent)" : "var(--color-parchment-dark)",
                        color: filters.habitat === h ? "var(--color-parchment)" : "var(--color-ink)",
                      }}
                    >
                      {habitats[h].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size filter */}
              <div className="mb-4">
                <p className="text-xs font-bold mb-2" style={{ color: "var(--color-ink-light)" }}>גודל</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(sizeLabels) as Size[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => onFiltersChange({ ...filters, size: filters.size === s ? undefined : s })}
                      className="px-3 py-1.5 rounded-full text-sm transition-all"
                      style={{
                        backgroundColor: filters.size === s ? "var(--color-accent)" : "var(--color-parchment-dark)",
                        color: filters.size === s ? "var(--color-parchment)" : "var(--color-ink)",
                      }}
                    >
                      {sizeLabels[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger filter */}
              <div className="mb-5">
                <p className="text-xs font-bold mb-2" style={{ color: "var(--color-ink-light)" }}>רמת סכנה</p>
                <div className="flex flex-wrap gap-2">
                  {([1, 2, 3, 4, 5] as DangerLevel[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => onFiltersChange({ ...filters, danger: filters.danger === d ? undefined : d })}
                      className="px-3 py-1.5 rounded-full text-sm transition-all"
                      style={{
                        backgroundColor: filters.danger === d ? "var(--color-accent)" : "var(--color-parchment-dark)",
                        color: filters.danger === d ? "var(--color-parchment)" : "var(--color-ink)",
                      }}
                    >
                      {dangerLabels[d]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "var(--color-parchment-dark)", color: "var(--color-ink-light)" }}
                  >
                    נקה הכול
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "var(--color-accent)", color: "var(--color-parchment)" }}
                >
                  הצג {resultCount} יצורים
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
