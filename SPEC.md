# Creatures of Wonder — Spec

## Overview

A Hebrew-language PWA for kids (ages 7-9) to explore D&D creatures. The app feels like flipping through a book of wonders — each page is a creature, described as if it's a real living thing in a fantasy world. The goal is to be the place a kid goes when they see a cool monster in a show and want to learn more.

Personal project. Non-commercial. Hosted on GitHub.

---

## 1. User Experience

### 1.1 Core Flow

The primary experience is **browsing**. The user opens the app and sees a creature page. They can:

- **Flip** to the next/previous creature (swipe gesture on touch, arrow keys on desktop)
- **Search** by name (Hebrew or English)
- **Filter** by:
  - **Habitat** (cave/underground, swamp, forest, mountain, water, arctic, desert, urban)
  - **Size** (tiny, small, medium, large, huge, gargantuan — with kid-friendly labels)
  - **Danger level** (1-5 scale, visualized as claw marks or similar)

Search and filters are accessible from a persistent but unobtrusive UI element (floating button or slide-out panel). They should not clutter the reading experience.

### 1.2 Creature Page Structure

Each creature page is a single scrollable view (on phone) or a spread (on tablet):

#### Always visible:
1. **Hero illustration** — full-width at top, the main creature image
2. **Name** — Hebrew with Nikud, English in parentheses. Example: טְרוֹל (Troll)
3. **Quick stats strip** — visual, icon-based:
   - Habitat (icon + label)
   - Size (relative scale icon)
   - Danger level (claw marks, 1-5)
4. **Main description** — 4-6 sentences in Hebrew. Written as if describing a real creature in a field guide. Conversational but informative, not childish.
5. **"Did you know?" nugget** — a single surprising fact, visually distinct (different background, maybe a small icon)

#### Interactive reveals (1-2 per creature, chosen to fit):
These are tap-to-reveal elements — flaps, fold-outs, or pop-up cards. Each creature gets 1-2 from this roster, selected based on what's most interesting about that specific creature:

| Section | Description | Best for |
|---|---|---|
| How to survive an encounter | Practical (fictional) survival tips | Dangerous, aggressive creatures |
| Special abilities | Breakdown of signature powers | Creatures with a cool mechanic |
| Where they live | Detailed lair/habitat description | Creatures with distinctive lairs |
| What do they eat? | Diet and hunting behavior | When the answer is fun/gross/surprising |
| Friend or foe? | Can they be reasoned with? | Non-always-evil creatures |
| How big are they really? | Size comparison vs. human silhouette | Extremely large or tiny creatures |
| Weaknesses | What can defeat them | Creatures with famous vulnerabilities |
| Pack or loner? | Social structure and behavior | Social creatures, horde creatures |
| What's that sound? | How you'd know one is nearby | Stealthy or ambush creatures |
| Strange but true | Extra weird lore detail | Creatures with bizarre biology |
| Origin | Real-world mythology or folklore origin of the creature | Creatures with interesting real-world roots (Hydra, Basilisk, Werewolf, etc.) |

The reveal animation should feel tactile — like lifting a flap in a physical book.

### 1.3 Navigation & Layout

**Portrait-only for v1.** The app is designed for portrait orientation. No landscape optimization in this version.

Layout is determined by **viewport width** (CSS media queries), not device type:

**Wide viewport (768px+)** — tablet portrait and similar:
- Page-flip animation with swipe gestures (realistic page-curl using react-pageflip or similar)
- Creature content fills most of the screen
- Minimal chrome — search/filter accessible via a subtle icon

**Narrow viewport (below 768px)** — phone portrait:
- Vertical scroll replaces page-flip (swiping horizontally on a narrow screen feels cramped)
- Same content, stacked vertically
- Pull-down for search/filter

**Transitions**:
- Page flip animation between creatures (wide viewport)
- Smooth scroll-in on narrow viewport
- Reveal animations for interactive sections: flip, slide, or unfold

### 1.4 Visual Design

- **Not "old book"** — no yellowed pages, no aged textures
- Rich, warm color palette inspired by the creature illustrations
- Clean typography — Hebrew body text should be highly readable with Nikud
- Subtle paper-like texture for backgrounds (but fresh, not aged)
- Each creature page can have a subtle color accent derived from the creature/habitat
- Stats icons should be simple and consistent
- The overall feel: a beautifully crafted modern book of wonders

---

## 2. Content

### 2.1 Creature List (v1 — 25 creatures)

| # | Creature | Size | Primary Habitat | Danger |
|---|---|---|---|---|
| 1 | Red Dragon | Gargantuan | Mountain | 5 |
| 2 | Beholder | Large | Underground | 5 |
| 3 | Mind Flayer | Medium | Underground | 5 |
| 4 | Owlbear | Large | Forest | 3 |
| 5 | Mimic | Medium | Underground | 2 |
| 6 | Gelatinous Cube | Large | Underground | 2 |
| 7 | Displacer Beast | Large | Forest | 3 |
| 8 | Rust Monster | Medium | Underground | 1 |
| 9 | Basilisk | Medium | Underground | 3 |
| 10 | Griffon | Large | Mountain | 3 |
| 11 | Hydra | Huge | Swamp | 4 |
| 12 | Treant | Huge | Forest | 3 |
| 13 | Bulette | Large | Desert/grassland | 4 |
| 14 | Purple Worm | Gargantuan | Underground | 5 |
| 15 | Umber Hulk | Large | Underground | 4 |
| 16 | Wyvern | Large | Mountain | 3 |
| 17 | Lich | Medium | Underground | 5 |
| 18 | Death Knight | Medium | Any | 5 |
| 19 | Goblin | Small | Underground/forest | 1 |
| 20 | Skeleton | Medium | Any | 1 |
| 21 | Troll | Large | Swamp | 3 |
| 22 | Orc | Medium | Any | 2 |
| 23 | Kobold | Small | Underground | 1 |
| 24 | Werewolf | Medium | Forest/urban | 3 |
| 25 | Ogre | Large | Swamp/forest | 2 |

### 2.2 Content Tone & Language

- **Hebrew without Nikud** for all body text (descriptions, reveals, did-you-know)
- **Nikud only on creature names**, followed by English in parentheses. Example: טְרוֹל (Troll)
- **Reading level**: 2nd-3rd grade native Hebrew speakers (age 7-9)
- **Tone**: Field guide. The creature is real. You might encounter it. Here's what you need to know.
  - YES: "טרולים חיים בביצות חשוכות ואוכלים כמעט הכול — אפילו עצמות"
  - NO: "הטרול הוא יצור מתוך משחק דאנג'נס אנד דרגונס..."
- **Not childish or goofy**, but not grim either. A slight sense of wonder and adventure.
- **4-6 sentences** per main description. Enough to learn, short enough to not lose attention.
- "Did you know?" is 1-2 sentences max.
- Interactive reveals: 2-4 sentences each.

### 2.3 Content Research Approach

- Primary source: D&D 5e SRD and Monster Manual lore
- Each creature must be researched individually before writing
- Do NOT mix lore across different D&D settings or editions carelessly
- The main description should reflect the D&D version specifically, not the mythological one
- When a creature has interesting real-world origins (mythology, folklore), include an "Origin" reveal section telling that story. This is separate from the main D&D-focused description.
- Research first, then choose which interactive reveal sections best fit

---

## 3. Art & Sound

### 3.1 Image Style

**Reference**: Caleb Cleveland's illustrations for ABCs/123s of D&D.

**Style characteristics**:
- Digital watercolor illustration with thin, loose pen-like ink outlines
- Soft watercolor washes for coloring — colors blend and breathe, not flat fills
- Muted warm palette — earthy greens, soft browns, warm yellows, gentle lighting
- Exaggerated storybook proportions — oversized heads (roughly one-third of total height), large expressive facial features, compact bodies. Chibi-adjacent but not anime.
- Backgrounds are very loose impressionistic watercolor washes — barely defined, soft and atmospheric
- Creatures have cleaner linework than backgrounds but still feel hand-drawn, not hard-edged
- Child-appropriate: no gore, no horror, no dismemberment, no wounds
- Creatures look powerful and impressive, not cute or silly

**Image specs**:
- Aspect ratio: 3:4 (portrait)
- Resolution: 1024×1365px (retina)
- Composition: creature centered, full body or ¾ body, habitat background filling the frame
- Edges fade softly to cream/off-white — no hard borders
- Leave breathing room in the bottom ~25% of the image (a dark gradient overlay with the creature's name will sit there, so avoid important detail in that area)

**Base prompt for AI image generation**:
> Digital watercolor fantasy illustration with thin loose ink outlines, soft watercolor washes, muted warm color palette. [CREATURE DESCRIPTION HERE — pose, features, expression, props]. Stylized exaggerated proportions, expressive face. Background is loose impressionistic watercolor — [HABITAT DESCRIPTION] — soft and atmospheric, barely defined. Creature has cleaner linework than background but still feels hand-drawn. Composition centered, edges fading softly to cream, bottom quarter kept simple for text overlay. Portrait orientation 3:4. Approachable but impressive, powerful not cute. In the style of Caleb Cleveland's D&D children's book illustrations. No text, no gore, no wounds, no humans, no photorealism, no 3D rendering, no hard digital edges.

Each creature gets a specific prompt built on this base. One hero image per creature.

#### Creature Image Prompts

**Troll:**
> Digital watercolor fantasy illustration with thin loose ink outlines and soft watercolor washes in a muted warm color palette. A large, towering D&D troll seen from a low angle looking up, looming over the viewer. The creature is leaning forward, one hand gripping a crude wooden club resting on its shoulder, with lanky, stretched proportions and an imposing presence. It features moss-green rubbery skin, a wide and heavily extruded square jaw with blunt uneven teeth, and an enormous bulbous warty nose. Its hair is thick and matted with moss and twigs, styled into a wild mane that frames an expressive face with small, squinting, suspicious eyes peering downward. Both hands and feet feature long thick nails. Expression is grumpy and wary rather than threatening — more "get off my swamp" than aggressive. Background is loose impressionistic watercolor — misty swamp sky seen from below, soft mossy tree canopy, warm amber light filtering through fog — soft and atmospheric, barely defined. Creature has cleaner linework than background but still feels hand-drawn. Composition centered, edges fading softly to cream, bottom quarter kept simple for text overlay. Portrait orientation 3:4. Approachable but impressive, powerful not cute. In the style of Caleb Cleveland's D&D children's book illustrations. No text, no gore, no wounds, no humans, no photorealism, no 3D rendering, no hard digital edges.

**Beholder:**
> Digital watercolor fantasy illustration with thin loose ink outlines, soft watercolor washes, muted warm color palette. A large D&D beholder floating in mid-air, spherical body filling much of the frame, one enormous central eye with a vivid purple-pink iris staring directly at the viewer, wide mouth stretched into a toothy grin showing rows of uneven teeth, multiple eyestalks rising from the top of its head each ending in a smaller eye looking in different directions. Rough bumpy skin in muted purple-brown tones, underside slightly lighter. Expression is curious and self-satisfied, almost smug — it knows it's the smartest thing in the room. Stylized exaggerated proportions, expressive face. Background is loose impressionistic watercolor — deep underground cavern, faint glow of crystals, dark rocky walls fading into shadow — soft and atmospheric, barely defined. Creature has cleaner linework than background but still feels hand-drawn. Composition centered, edges fading softly to cream, bottom quarter kept simple for text overlay. Portrait orientation 3:4. Approachable but impressive, powerful not cute. In the style of Caleb Cleveland's D&D children's book illustrations. No text, no gore, no wounds, no humans, no photorealism, no 3D rendering, no hard digital edges.

### 3.2 Ambient Sound

Subtle background ambient tracks. The sound should be barely noticeable — it sets mood without demanding attention.

User can mute. Sound is off by default — opt-in with a subtle speaker icon.

**v1: Single ambient track.** One general fantasy ambient track for the entire app. Per-habitat tracks are a future enhancement.

**Suno prompt for v1 ambient track**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, ancient library of wonders, soft mystical hum, gentle page-turning warmth, faint magical shimmer, vast and inviting, loopable, soft and immersive, suitable for a children's fantasy book experience

**Future: Per-habitat tracks.** When ready to expand, generate one track per habitat type:

| Habitat | Mood |
|---|---|
| Underground/cave | Dripping water, distant echoes, low hum |
| Swamp | Insects, bubbling mud, distant bird calls |
| Forest | Wind through leaves, creaking wood, bird song |
| Mountain | Wind, distant rumble, open air |
| Water | Waves, deep current, whale-like distant calls |
| Arctic | Howling wind, cracking ice, silence |
| Desert | Dry wind, sand shifting, heat shimmer |
| Urban | Distant crowd, torches, stone echoes |

<details>
<summary>Suno prompts for future per-habitat tracks</summary>

**Suno prompt base**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, [habitat-specific descriptors], loopable, soft and immersive, suitable for a children's fantasy book experience

**Underground/cave**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, deep underground cavern, dripping water echoes, distant low resonant hum, occasional stone creak, vast dark spaces, mysterious but not frightening, loopable, soft and immersive, suitable for a children's fantasy book experience

**Swamp**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, misty swamp at dusk, gentle bubbling water, distant frogs and crickets, slow murky atmosphere, warm humid air, eerie but calm, loopable, soft and immersive, suitable for a children's fantasy book experience

**Forest**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, deep enchanted forest, wind rustling through ancient leaves, distant birdsong, creaking old trees, dappled sunlight mood, peaceful but alive, loopable, soft and immersive, suitable for a children's fantasy book experience

**Mountain**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, high mountain peak, strong cold wind, distant thunder rolling, vast open sky, eagle cry in distance, majestic and awe-inspiring, loopable, soft and immersive, suitable for a children's fantasy book experience

**Water**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, deep ocean or underground lake, slow current, distant whale-like calls, bubbles rising, deep blue vastness, mysterious and serene, loopable, soft and immersive, suitable for a children's fantasy book experience

**Arctic**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, frozen tundra, howling distant wind, cracking ice, vast white silence, cold and still, beautiful desolation, loopable, soft and immersive, suitable for a children's fantasy book experience

**Desert**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, endless sand desert, dry wind carrying sand grains, heat shimmer, distant mirage, sparse and vast, ancient and timeless, loopable, soft and immersive, suitable for a children's fantasy book experience

**Urban**:
> Ambient atmospheric background music, fantasy themed, subtle and non-intrusive, no vocals, no melody, medieval fantasy city at night, distant crowd murmur, flickering torchlight ambiance, stone streets, tavern sounds far away, shadowy but lively, loopable, soft and immersive, suitable for a children's fantasy book experience

</details>

---

## 4. Technical Architecture

### 4.1 Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js (App Router) | SSG for performance, React ecosystem, PWA support |
| Language | TypeScript | Type safety for content structures |
| Styling | Tailwind CSS | Rapid UI development, responsive design |
| Animations | Framer Motion | Page transitions, reveal animations, gestures |
| PWA | next-pwa | Offline support, installable on home screen |
| Content | MDX or JSON files | Static creature data, easy to edit and extend |
| Deployment | GitHub Pages | Free, integrated with repo |
| RTL | Native CSS + Tailwind RTL plugin | Hebrew is RTL |

### 4.2 Project Structure

```
/src
  /app
    /page.tsx              — main creature viewer
    /layout.tsx            — app shell, RTL setup, font loading
  /components
    /CreaturePage.tsx       — full creature page layout
    /CreatureImage.tsx      — hero image with loading state
    /StatsStrip.tsx         — habitat, size, danger icons
    /Description.tsx        — main text block
    /DidYouKnow.tsx        — fun fact section
    /RevealSection.tsx      — interactive flap/card component
    /Navigation.tsx         — flip controls, search, filter
    /FilterPanel.tsx        — filter UI (habitat, size, danger)
    /SearchBar.tsx          — Hebrew/English search
    /SoundToggle.tsx        — ambient sound control
    /PageFlip.tsx           — page transition animation wrapper
  /data
    /creatures             — one file per creature
      /troll.ts
      /beholder.ts
      /...
    /habitats.ts           — habitat definitions and sound mappings
  /lib
    /types.ts              — TypeScript interfaces
    /search.ts             — search logic (Hebrew + English)
    /filters.ts            — filter logic
  /public
    /images/creatures      — generated creature illustrations
    /sounds                — ambient tracks per habitat
    /fonts                 — Hebrew font with good Nikud support
```

### 4.3 Data Model

```typescript
interface Creature {
  id: string;
  name: {
    hebrew: string;      // with Nikud: "טְרוֹל"
    english: string;     // "Troll"
  };
  stats: {
    habitat: Habitat;
    size: Size;
    danger: 1 | 2 | 3 | 4 | 5;
  };
  image: string;         // path to hero image
  description: string;   // main text, Hebrew WITHOUT Nikud, 4-6 sentences
  didYouKnow: string;   // 1-2 sentences, Hebrew without Nikud
  origin?: string;       // real-world mythology/folklore origin, if interesting
  reveals: RevealSection[];  // 1-2 interactive sections
}

interface RevealSection {
  type: RevealType;
  title: string;         // Hebrew
  content: string;       // Hebrew without Nikud, 2-4 sentences
  icon?: string;         // optional icon for the flap
}

type RevealType =
  | 'survive'        // How to survive an encounter
  | 'abilities'      // Special abilities
  | 'lair'           // Where they live
  | 'diet'           // What do they eat?
  | 'alignment'      // Friend or foe?
  | 'scale'          // How big are they really?
  | 'weaknesses'     // Weaknesses
  | 'social'         // Pack or loner?
  | 'signs'          // What's that sound?
  | 'strange'        // Strange but true
  | 'origin'         // Real-world mythology/folklore origin

type Habitat = 'underground' | 'swamp' | 'forest' | 'mountain' | 'water' | 'arctic' | 'desert' | 'urban';

type Size = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';
```

### 4.4 Key Technical Considerations

- **RTL layout**: All layout must be RTL by default. Test every component.
- **Nikud rendering**: Use a font that handles Nikud well (e.g., Frank Ruhl Libre, Noto Serif Hebrew). Test readability at body text sizes.
- **Touch gestures**: Swipe for page flip (tablet), tap for reveals. Use Framer Motion's gesture system.
- **Performance**: Images are the heaviest asset. Use Next.js Image optimization, lazy loading, and appropriate sizing per breakpoint.
- **Offline**: PWA service worker should cache all creature data and images for offline browsing.
- **Sound**: Use Howler.js or native Web Audio API. Ambient tracks should loop seamlessly, crossfade when switching habitats. Default muted.

---

## 5. Implementation Plan

### Phase 1: Troll (iterate to perfection)
1. Generate Troll image (external — run prompt in AI image tool)
2. Generate swamp ambient track (external — run prompt in Suno)
3. Set up Next.js project with RTL, Hebrew font, Tailwind
4. Build CreaturePage component with Troll data
5. Build reveal animations
6. Test on tablet and phone
7. Iterate on content, layout, and image until perfect

### Phase 2: Scale to 25
8. Write content for all 25 creatures (research each one individually)
9. Generate all 25 creature images
10. Generate remaining habitat ambient tracks
11. Build search and filter functionality
12. Build page-flip navigation
13. Polish transitions and animations

### Phase 3: Release
14. PWA setup (manifest, service worker, icons)
15. Final responsive testing
16. Deploy to GitHub Pages
17. Push to GitHub

---

## 6. Open Questions

- **Font**: Need to test Hebrew fonts with Nikud at body text size on mobile. Frank Ruhl Libre and Noto Serif Hebrew are candidates.
- **Image generation tool**: Using Google's Nano Banana (Gemini app) or Google image gen API. Need to test with the Troll prompt.
- **Suno output quality**: Need to test if Suno can produce seamlessly loopable ambient tracks or if manual editing is needed.
- **Page flip library**: Evaluate turn.js, react-pageflip, or custom Framer Motion implementation for the tablet page-flip effect.
