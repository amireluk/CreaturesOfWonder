"use client";

import { Habitat, Size, DangerLevel } from "@/lib/types";
import { habitats, sizeLabels } from "@/lib/habitats";

interface StatsStripProps {
  habitat: Habitat;
  size: Size;
  danger: DangerLevel;
}

function Skulls({ level }: { level: DangerLevel }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} style={{ color: "var(--color-accent)", fontSize: "1.1rem", lineHeight: 1 }}>
          {"☠\uFE0E"}
        </span>
      ))}
    </div>
  );
}

export default function StatsStrip({ habitat, size, danger }: StatsStripProps) {
  const habitatInfo = habitats[habitat];

  return (
    <div className="flex justify-around items-center py-3 px-4 rounded-lg"
      style={{ backgroundColor: "var(--color-parchment-dark)" }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
          {habitatInfo.label}
        </span>
      </div>

      <div className="w-px h-8" style={{ backgroundColor: "var(--color-ink-light)", opacity: 0.3 }} />

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
          {sizeLabels[size]}
        </span>
      </div>

      <div className="w-px h-8" style={{ backgroundColor: "var(--color-ink-light)", opacity: 0.3 }} />

      <div className="flex flex-col items-center gap-1">
        <Skulls level={danger} />
      </div>
    </div>
  );
}
