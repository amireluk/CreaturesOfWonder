# Creatures of Wonder

A Hebrew-language web app for kids (ages 7-9, native Hebrew speakers) to explore and learn about D&D creatures. Think "Monster Manual for kids" — creatures described as if real, not as literature references.

## Project Status
- **Phase**: Spec complete, iterating on first creature (Troll) before scaling to all 25
- **Next**: Generate Troll image + Suno ambient track, build first creature page, iterate until perfect

## Key Decisions
- **Platform**: PWA, portrait-only for v1, tablet-first (wide viewport 768px+), responsive to phone (narrow viewport)
- **Tech stack**: React + Next.js, TypeScript, Tailwind, Framer Motion (see SPEC.md for details)
- **Deployment**: GitHub Pages
- **Language**: Hebrew WITH Nikud on all text. Creature names also include English name in parentheses.
- **Reading level**: 2nd-3rd grade Hebrew
- **Content source**: D&D (primarily SRD), personal/non-commercial project
- **Art style**: Stylized fantasy painting a la Caleb Cleveland (ABCs/123s of D&D). NOT cartoonish, NOT photorealistic. Rich colors, visible brushstrokes, dramatic lighting, slightly exaggerated proportions. Child-appropriate but impressive.
- **Image generation**: Google Nano Banana (Gemini app) or Google image gen API
- **Sound**: Single ambient track for v1 (per-habitat tracks are future). Generated via Suno. Off by default.
- **No categories filter**: Filters are Habitat, Size, Danger Level only
- **No gamification, no narration, no "old book" aging aesthetic**
- **Interactive reveals**: Each creature gets 1-2 special sections chosen to fit that creature (from a roster of options like "Weaknesses", "What do they eat?", "Origin", etc.). Research the creature first, then pick sections — don't force-fit.
- **Origin section**: Creatures with interesting real-world mythology/folklore roots get an "Origin" reveal section.

## Creature List (26 for v1)
Red Dragon, Beholder, Mind Flayer, Owlbear, Mimic, Gelatinous Cube, Displacer Beast, Rust Monster, Basilisk, Griffon, Hydra, Treant, Bulette, Purple Worm, Umber Hulk, Wyvern, Lich, Death Knight, Goblin, Skeleton, Troll, Orc, Kobold, Werewolf, Ogre, Siren

## Content Guidelines
- Write as if the creature is real — field guide tone, not mythology lesson
- "Sirens live near rocky coastlines" not "In Greek mythology, the Siren was..."
- Text blocks: 4-6 sentences, readable for 8-year-old Hebrew speakers
- Each creature page: hero image, name (Hebrew w/ Nikud + English), quick stats, main description, "Did you know?" nugget, 1-2 interactive reveal sections
- Ground content in credible D&D sources, don't mix lore across settings

## Image Generation
See SPEC.md § 3.1 for art style, image specs, and base prompt template.

## Sound
Single ambient track for v1. Suno prompt in SPEC.md.

## IMPORTANT: Keeping Docs in Sync
**Whenever a decision changes during development — whether from user feedback, technical constraints, or iteration — update SPEC.md to reflect the change.** The spec is the living source of truth for this project. Don't let it drift from reality.

## Working Conventions
- Iterate on one creature (Troll) until the page is perfect before scaling
- All creature content must be researched first, then structured — don't template-force
- Image and sound prompts are generated here, assets created externally
- Portrait orientation only for v1
- Layout breakpoints based on viewport width, not device type
