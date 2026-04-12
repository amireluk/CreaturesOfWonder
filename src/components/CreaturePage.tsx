"use client";

import { Creature } from "@/lib/types";
import { assetUrl } from "@/lib/assets";
import { useNikud } from "@/contexts/NikudContext";
import { stripNikud } from "@/lib/nikud";
import StatsStrip from "./StatsStrip";
import RevealCard from "./RevealCard";

interface CreaturePageProps {
  creature: Creature;
}

export default function CreaturePage({ creature }: CreaturePageProps) {
  const { showNikud } = useNikud();
  const hn = (text: string) => (showNikud ? text : stripNikud(text));

  return (
    <div className="max-w-lg mx-auto px-4 pb-12">
      {/* Hero Image */}
      <div className="relative w-full aspect-[3/4] rounded-b-2xl overflow-hidden shadow-xl mb-6">
        <img
          src={assetUrl(creature.image)}
          alt={creature.name.english}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 right-4 left-4 text-right">
          <h1 className="text-4xl font-black text-white drop-shadow-lg leading-tight">
            {hn(creature.name.hebrew)}
          </h1>
          <span className="text-lg text-white/80">({creature.name.english})</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <StatsStrip
          habitat={creature.stats.habitat}
          size={creature.stats.size}
          danger={creature.stats.danger}
        />
      </div>

      {/* Main Description */}
      <div className="mb-6 px-1 flex flex-col gap-3">
        {creature.description.map((para, i) => (
          <p key={i} className="text-lg leading-loose" style={{ color: "var(--color-ink)" }}>
            {hn(para)}
          </p>
        ))}
      </div>

      {/* Did You Know */}
      <div
        className="mb-6 p-4 rounded-xl border-2 border-dashed"
        style={{
          borderColor: "var(--color-accent-gold)",
          backgroundColor: "rgba(197, 148, 58, 0.08)",
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">💡</span>
          <div>
            <h3
              className="text-sm font-bold mb-1"
              style={{ color: "var(--color-accent-gold)" }}
            >
              הידעת?
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-ink)" }}>
              {hn(creature.didYouKnow)}
            </p>
          </div>
        </div>
      </div>

      {/* Reveal Sections */}
      <div className="flex flex-col gap-3">
        {creature.reveals.map((reveal) => (
          <RevealCard key={reveal.type} reveal={reveal} />
        ))}
      </div>
    </div>
  );
}
