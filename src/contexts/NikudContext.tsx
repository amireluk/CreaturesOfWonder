"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface NikudContextValue {
  showNikud: boolean;
  toggleNikud: () => void;
}

const NikudContext = createContext<NikudContextValue>({
  showNikud: true,
  toggleNikud: () => {},
});

export function NikudProvider({ children }: { children: React.ReactNode }) {
  const [showNikud, setShowNikud] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("showNikud");
    if (stored !== null) setShowNikud(stored === "true");
  }, []);

  function toggleNikud() {
    setShowNikud((prev) => {
      const next = !prev;
      localStorage.setItem("showNikud", String(next));
      return next;
    });
  }

  return (
    <NikudContext.Provider value={{ showNikud, toggleNikud }}>
      {children}
    </NikudContext.Provider>
  );
}

export function useNikud() {
  return useContext(NikudContext);
}
