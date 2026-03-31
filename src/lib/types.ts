export type Habitat =
  | "underground"
  | "swamp"
  | "forest"
  | "mountain"
  | "water"
  | "arctic"
  | "desert"
  | "urban";

export type Size = "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";

export type DangerLevel = 1 | 2 | 3 | 4 | 5;

export type RevealType =
  | "survive"
  | "abilities"
  | "lair"
  | "diet"
  | "alignment"
  | "scale"
  | "weaknesses"
  | "social"
  | "signs"
  | "strange"
  | "origin";

export interface RevealSection {
  type: RevealType;
  title: string;
  content: string;
  icon?: string;
}

export interface Creature {
  id: string;
  name: {
    hebrew: string;
    english: string;
  };
  stats: {
    habitat: Habitat;
    size: Size;
    danger: DangerLevel;
  };
  image: string;
  description: string;
  didYouKnow: string;
  origin?: string;
  reveals: RevealSection[];
}
