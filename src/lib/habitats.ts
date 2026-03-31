import { Habitat } from "./types";

interface HabitatInfo {
  id: Habitat;
  label: string;
  icon: string;
}

export const habitats: Record<Habitat, HabitatInfo> = {
  underground: { id: "underground", label: "מתחת לאדמה", icon: "⛏️" },
  swamp: { id: "swamp", label: "ביצה", icon: "🌿" },
  forest: { id: "forest", label: "יער", icon: "🌲" },
  mountain: { id: "mountain", label: "הר", icon: "⛰️" },
  water: { id: "water", label: "מים", icon: "🌊" },
  arctic: { id: "arctic", label: "קרח", icon: "❄️" },
  desert: { id: "desert", label: "מדבר", icon: "🏜️" },
  urban: { id: "urban", label: "עיר", icon: "🏰" },
};

export const sizeLabels: Record<string, string> = {
  tiny: "זעיר",
  small: "קטן",
  medium: "בינוני",
  large: "גדול",
  huge: "ענק",
  gargantuan: "עצום",
};
