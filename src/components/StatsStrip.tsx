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
    <div className="flex gap-1">
      {Array.from({ length: level }).map((_, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 100 100" fill="currentColor"
          style={{ color: "#c0392b" }}
        >
          {/* Skull */}
          <ellipse cx="50" cy="38" rx="26" ry="28" />
          <rect x="34" y="58" width="13" height="12" rx="2" />
          <rect x="53" y="58" width="13" height="12" rx="2" />
          {/* Eye sockets */}
          <ellipse cx="41" cy="35" rx="7" ry="8" fill="#f5f0e8" />
          <ellipse cx="59" cy="35" rx="7" ry="8" fill="#f5f0e8" />
          {/* Crossbones */}
          <line x1="15" y1="75" x2="85" y2="95" stroke="#c0392b" strokeWidth="8" strokeLinecap="round"/>
          <line x1="85" y1="75" x2="15" y2="95" stroke="#c0392b" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="15" cy="75" r="6" />
          <circle cx="85" cy="75" r="6" />
          <circle cx="15" cy="95" r="6" />
          <circle cx="85" cy="95" r="6" />
        </svg>
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
