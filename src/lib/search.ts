import { Creature, Habitat, Size, DangerLevel } from "./types";

export interface Filters {
  habitat?: Habitat;
  size?: Size;
  danger?: DangerLevel;
}

export function filterCreatures(
  creatures: Creature[],
  query: string,
  filters: Filters
): Creature[] {
  return creatures.filter((c) => {
    // Text search — Hebrew name or English name
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const matchesHebrew = c.name.hebrew.includes(q);
      const matchesEnglish = c.name.english.toLowerCase().includes(q);
      if (!matchesHebrew && !matchesEnglish) return false;
    }

    if (filters.habitat && c.stats.habitat !== filters.habitat) return false;
    if (filters.size && c.stats.size !== filters.size) return false;
    if (filters.danger && c.stats.danger !== filters.danger) return false;

    return true;
  });
}
