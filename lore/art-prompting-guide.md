# Art Style & Image Prompting Guide

This document is the authoritative reference for generating creature images for Creatures of Wonder. It captures the target art style (derived from Caleb Cleveland's D&D children's book illustrations), prompting principles for AI image generators (primarily Google Gemini / Nano Banana), and a structured workflow for building creature prompts.

---

## 1. Target Style — What We're After

The reference images (in `public/images/references/`) are from Caleb Cleveland's *ABCs of D&D* and *123s of D&D*. Every creature image we generate must feel like it belongs in the same book. Here's what makes that style work:

### Line Quality — Economy Is Everything
- **Thin, confident brush-pen ink outlines that define BIG shapes only** — the outer silhouette, the face, major boundaries (where head meets ruff, where limbs separate from body). Then STOP.
- **Minimal interior linework** — do NOT draw individual fur strands, feather barbs, or muscle striations with ink. The body interior is mostly smooth watercolor with very few lines.
- Lines are CLEAN and intentional on the creature, LOOSE and gestural on the background
- Outlines define form but don't trap color — watercolor washes bleed slightly past lines in organic places
- Line weight varies subtly: thicker on the creature's silhouette edges, thinner on the few interior details
- **The face gets the most linework** — eyes, brow, beak/mouth/nose are well-defined. The body gets the least — let the paint handle it.

### Color Palette
- **Warm, solid, natural** — colors are PRESENT. Tans, warm browns, sage green, ochre, warm earth tones. Think of the soft_owlbear reference: the fur is a clear warm tan-brown, the background greens are visible, nothing is washed out.
- The creature has **full color** — it reads as a warm, solidly-colored watercolor painting, NOT as a faded or diluted sketch
- **Paper shows through at edges and in backgrounds** — but the creature itself has confident, warm color throughout
- Shadows are **warm** (brown, warm violet) with real presence
- Overall feeling: **a warm, inviting storybook illustration with solid color**. The softness comes from the TECHNIQUE (smooth rounded forms, minimal linework, watercolor washes) NOT from diluting the colors.

### Painting Technique — Clean Washes, Limited Tones
- **Watercolor washes on textured cream/off-white paper** — NOT digitally smooth
- Visible paper grain shows through transparent paint layers
- **Max two tones per color area: a base color and one shadow.** No gradients, no blending across many mid-tones. Clean, graphic, readable.
- Washes are **flat and clean**, not wet-into-wet blended — edges are soft but colors don't bleed into each other
- **Texture comes from COLOR VARIATION in washes, not from drawn lines.** Fur is suggested by a shadow wash on one side, not by drawing individual hairs. Feathers are layered flat wash shapes, not individually inked.
- Darker values built through **layered washes**, not through darkening outlines
- Some areas left as **bare paper** or very light wash — the image breathes
- Paint feels WET, smooth, and organic — not dry-brushed, hatched, or airbrushed

### Creature Proportions & Design
- **Rounded, soft shape language** — bodies are built from smooth curves, not angular or muscular forms. Think soft volumes, almost plush-like in their roundedness, but still with real weight.
- Creatures are rendered **MORE realistically than the human characters** in the same book — but still stylized with gentle, rounded forms
- **Slight exaggeration of each creature's DEFINING feature**: owl eyes bigger, troll arms longer, beholder's central eye more prominent — but only that feature
- Overall proportions are **anatomically grounded** — these feel like real animals or beings that could exist
- **NOT chibi, NOT bobble-head** — the creature's body shape and silhouette are the star, not oversized heads
- **Weight and mass feel real** — you can feel gravity. A bear-sized creature looks heavy. A floating creature has visual weight from its bulk.
- **Simplified extremities** — paws, claws, feet, and tails are rounded and understated, not sharp or individually rendered. Claws are suggested, not emphasized.
- **Textures come from smooth watercolor washes**, not from detailed linework. Fur = gentle color gradation. Feathers = layered wash shapes. Skin = tonal variation. NOT individual strands, barbs, or scales drawn with ink.

### Expression & Personality
- **Every creature has a DISTINCT emotional state** readable at a glance
- Approved emotions: **curious, grumpy, proud, mischievous, alert, suspicious, protective, confused, serene, smug, wary**
- NOT approved: terrifying, bloodthirsty, enraged, horrific, anguished, tortured
- **Eyes are the primary vehicle for expression** — large enough to read clearly, with reflected light for life
- **Body language reinforces the emotion** — posture, head angle, weight distribution, limb placement all tell the story
- Creatures feel like **beings with inner lives**, not monsters to be feared — like encountering a real animal in the wild

### Background Treatment
- **VERY loose impressionistic watercolor washes ONLY** — shapes suggested, never defined
- **NO ink lines in the background.** Zero. Ink is for the creature only. Background elements (trees, rocks, ferns, water) are pure color wash shapes with no outlines.
- Trees = vertical color wash strokes only, no drawn trunks or branches. Foliage = dappled wash blobs, no leaf shapes.
- **Atmospheric perspective**: background is softer, lighter, less saturated than the creature
- **Warm ambient light** permeates every scene — golden, amber, filtered-through-foliage quality
- **Edges of composition fade to cream/paper color** — natural vignette, no hard borders
- Background serves **mood, not geography** — it evokes feeling, not a specific map location

### Scale & Composition
- Creatures are **BIG** — they fill the frame and command presence
- **Low camera angles** make creatures taller and more impressive (looking UP at the creature)
- **Clean, readable silhouettes** — you could identify the creature from its shadow alone
- Breathing room in the composition — not cramped, but the creature dominates
- Creature is the **uncontested focal point** — nothing in the background competes

### What Makes It Child-Appropriate WITHOUT Being Childish
- No gore, blood, wounds, dismemberment, or visible injuries
- Creatures have **charm and personality** — they're characters, not threats
- Scale creates **wonder**, not fear
- Even dangerous creatures are rendered with **respect** — like a nature documentary on a magical world
- There's **personality** (grumpy ogre, mischievous goblins, suspicious troll) but never silliness or parody
- **Professional illustration quality** — the art takes the audience seriously

---

## 2. Prompting Principles for AI Image Generators

These principles apply primarily to Google Gemini / Nano Banana but work well across generators.

### Principle 1: Describe a Scene, Don't List Keywords

**Bad:** `watercolor, troll, swamp, ink outlines, muted colors, storybook, portrait, 3:4`

**Good:** `A towering moss-green troll stands knee-deep in murky swamp water, hunched forward with one massive hand gripping a gnarled branch. Watercolor and ink illustration on textured cream paper...`

Narrative paragraphs produce more coherent, atmospheric images. The AI understands spatial relationships and mood through natural language far better than through keyword lists.

### Principle 2: Lead with Medium and Technique

The FIRST thing the AI reads sets the artistic frame for everything that follows. Start every prompt with:

> `Watercolor and ink illustration on textured cream paper. Thin confident brush-pen ink outlines with transparent watercolor washes. Visible paper grain, wet-into-wet color blending, soft warm palette — colors are gentle washes, present but never heavy or saturated.`

This is more effective than "digital watercolor" (which biases toward clean digital output) or "in the style of [artist]" (which may not be in the model's training data).

### Principle 3: Name Specific Soft Colors — Not Too Rich, Not Too Faded

**Bad:** `warm color palette`, `earthy tones`, `muted colors` (too vague — AI picks whatever)

**Too saturated:** `raw umber shadows, burnt sienna accents, rich olive green` (pushes AI toward heavy, opaque pigment)

**Too washed out:** `very diluted, paper grain visible through every wash, more paper than paint` (pushes AI toward ghostly, bleached output)

**Good:** `sage-green skin with warm brown shadows, golden light, ochre highlights.`

Name specific colors directly. One qualifier is fine ("warm brown", "sage green") but don't stack softeners ("soft pale diluted sage green"). The softness comes from the technique, not from draining the color. The creature should have FULL, WARM color.

### Principle 4: Separate Subject Detail from Background Detail

Explicitly tell the AI what gets detail and what stays loose:

> `The creature is rendered with clean defined ink linework and watercolor washes. The background has NO ink lines — pure loose watercolor wash shapes only, no outlines on any background element.`

This prevents the AI from rendering the entire image at uniform detail. The background having the same linework density as the creature is the single most common failure mode — it kills the storybook atmosphere and makes images feel cluttered.

### Principle 5: Give Emotional Direction, Not Just Physical Description

The difference between a good creature image and a great one is personality:

**Physical only:** `a troll with green skin, long arms, pointed ears, and sharp teeth`

**With personality:** `expression is grumpy and suspicious — small eyes squinting down at the viewer, jaw set, posture says "you shouldn't be here." More annoyed than angry, more territorial than threatening.`

Always describe the creature's emotional state in plain, conversational language. Describe it as if directing an actor.

### Principle 6: Use Camera Language for Composition

Even for illustrations, photographic/cinematic terms give precise compositional control:

- **`low-angle view looking up`** — makes creatures imposing and impressive (USE THIS A LOT)
- **`3/4 body shot`** — standard creature portrait, shows most of the body
- **`eye-level view`** — intimate, face-to-face feeling
- **`wide establishing shot`** — creature small in a large habitat (NOT for hero images)
- **`slight Dutch angle`** — subtle dynamism and unease

### Principle 7: Describe Positively, Save Negatives for the End

Build the image through positive description first. The AI responds much better to "what IS" than "what ISN'T":

**Front of prompt:** Everything you want — medium, creature, pose, expression, background, lighting, composition
**End of prompt (safety net):** `No text, no gore, no humans in frame, no photorealism, no 3D rendering, no hard digital edges, no flat cel-shading.`

### Principle 8: Iterate Through Conversation

Gemini/Nano Banana excels at conversational refinement. After the first generation:
- `"Make the eyes larger and more expressive — I want to read its emotion from across the room"`
- `"Loosen the background — it's too detailed, I want soft watercolor washes only"`
- `"Push the color palette warmer — more golden amber light, less grey"`
- `"The creature needs more weight and mass — make it feel heavier, more grounded"`

Don't regenerate from scratch when a tweak will do.

---

## 3. Prompt Structure Template

Use this structure for every creature. Fill in the bracketed sections.

```
Watercolor and ink illustration on textured cream paper. Thin confident
brush-pen ink outlines with transparent watercolor washes, visible paper
grain, wet-into-wet color blending, soft warm palette. Warm watercolor washes with solid color presence — NOT washed out or pale. Minimal interior linework — ink defines outer silhouette and face only, watercolor washes handle all body texture. Smooth rounded forms.

[CREATURE DESCRIPTION: Size relative to frame. Build and body shape —
emphasize SMOOTH ROUNDED forms. Key physical features with SOFT color
names (e.g., "soft sage green" not "rich olive"). Textures come from
watercolor wash gradation, NOT drawn lines (e.g., "fur suggested by
smooth warm tan washes" NOT "fur rendered in individual strokes").
Face gets the most detail. Body stays smooth. Extremities (paws,
claws) are rounded and simplified. The ONE defining feature slightly
exaggerated.]

[EXPRESSION & POSE: Emotional state in plain conversational language.
What the body language communicates. What the creature is doing or
reacting to. Described as if directing an actor.]

[COMPOSITION: Camera angle (usually low-angle looking up). How much of
the creature is visible (full body / 3/4 body). "Creature fills the
frame, clean readable silhouette." Portrait orientation 3:4.]

[BACKGROUND: Described as COLOR and LIGHT only, not as specific objects.
"Loose impressionistic watercolor washes — [warm color] light filtering
through [atmospheric source], [color] tones fading into soft [color]
mist." Minimal detail. Atmospheric. Warm.]

[EDGES & OVERLAY: "Edges of composition fade softly to cream paper.
Bottom quarter transitions to darker warm tones — simplified, no
important detail — to accommodate a text overlay."]

[SAFETY: "No text in image. No gore, wounds, or horror. No humans in
frame. No photorealism, no 3D rendering, no hard digital edges, no flat
cel-shading, no anime style."]
```

### Prompt Length

Aim for **150–250 words** per prompt. Shorter prompts give the AI too much freedom; longer prompts can cause it to lose coherence or ignore later instructions. The sweet spot is detailed enough to be specific, short enough that every word earns its place.

### Consistency Checklist

Before finalizing any creature prompt, verify:

- [ ] Starts with the medium/technique paragraph (copy exactly from template)
- [ ] Colors are specific and soft — not vague moods, not heavy pigments, not ghostly faded
- [ ] Creature's defining feature identified and slightly exaggerated
- [ ] Emotional state described in conversational language
- [ ] Camera angle specified (default: low-angle looking up)
- [ ] Background described as loose washes of color and light only
- [ ] Bottom quarter kept simple for text overlay
- [ ] Edges fade to cream paper
- [ ] Safety negatives at the end
- [ ] Total word count 150–250

---

## 4. Creature Image Prompts

### Troll

> Watercolor and ink illustration on textured cream paper. Thin confident brush-pen ink outlines with transparent watercolor washes, visible paper grain, wet-into-wet color blending, soft warm palette. Warm watercolor washes with solid color presence — NOT washed out or pale. Minimal interior linework — ink defines outer silhouette and face only, watercolor washes handle all body texture. Smooth rounded forms.
>
> A towering D&D troll seen from a low angle, looming above the viewer. Massive and lanky — exaggeratedly long dangling arms that hang past its knees, hunched shoulders, a gangly silhouette that fills the frame top to bottom. Sage-green rubbery skin rendered in smooth watercolor washes with warm brown shadows — no individual skin texture lines, just tonal shifts. A mane of matted hair in olive tones, tangled with moss and twigs, frames the face. Enormous bulbous warty nose dominates the face. Small squinting eyes peer down. Wide jaw with blunt uneven teeth — mouth closed in a grimace. Standing with weight on one leg, a crude wooden club held loosely at his side in one hand like a thug sizing you up. Rounded simplified hands and feet. Body is smooth rounded forms, not angular or muscular.
>
> Expression is grumpy and territorial — the look of a tough guy deciding if you're worth the trouble. More "you don't belong here" than aggressive. Standing casually but menacingly, like a bouncer outside a club.
>
> Low-angle view looking up. Full body visible, creature fills the frame. Clean readable silhouette. Portrait orientation 3:4.
>
> Background: loose impressionistic washes — soft golden light filtering through mossy canopy shapes overhead, muted sage and warm ochre mist, light brown at the base fading into cream. Barely defined. Atmospheric and warm.
>
> Edges fade softly to cream paper. Bottom quarter transitions to darker warm tones, kept simple for text overlay.
>
> No text in image. No gore, wounds, or horror. No humans in frame. No photorealism, no 3D rendering, no hard digital edges, no flat cel-shading, no detailed fur linework, no crosshatching.

### Owlbear

> Digital watercolor fantasy illustration with thin loose ink outlines and soft watercolor washes in a muted warm color palette. A large D&D owlbear rearing up on its hind legs in a forest clearing, one massive clawed paw raised mid-swipe. Stocky powerful bear body covered in thick brown-tawny fur, with a large owl-like head — big round amber eyes, sharp curved yellowish beak, small ear tufts on top. A thick feathery ruff around the neck where owl head meets bear body. The body is bulky and muscular, the stance aggressive but more "startled animal" than "attacking monster." Expression is fierce and alert — it just spotted something in its territory. Proportions emphasize the massive bear bulk with the surprisingly expressive owl face. Background is loose impressionistic watercolor — sunlit forest clearing, dappled golden-green light filtering through tall trees, ferns and undergrowth — soft and atmospheric, barely defined. Creature has cleaner linework than background but still feels hand-drawn. Composition centered, edges fading softly to cream, bottom quarter kept simple for text overlay. Portrait orientation 3:4. Approachable but impressive, powerful not cute. In the style of Caleb Cleveland's D&D children's book illustrations. No text, no gore, no wounds, no humans, no photorealism, no 3D rendering, no hard digital edges.
> Make it adorable.
> It is walking on 4 legs at the forest with a cub by its side

### Beholder

> Watercolor and ink illustration on textured cream paper. Thin confident brush-pen ink outlines with clean flat watercolor washes on visible paper grain. Solid warm color — NOT washed out or pale. Max two tones per color area: base color and one shadow, no gradients or blending. Minimal interior linework — ink defines outer silhouette and face only, washes handle all body texture. Smooth rounded forms.
>
> A large D&D beholder floating in mid-air, its massive spherical body filling most of the frame. One enormous central eye with a pink-purple iris stares directly at the viewer — this eye dominates the composition. Wide mouth stretched into a broad toothy grin, rows of uneven teeth visible. Rounded body in a flat mauve base wash with a grey-lavender shadow on one side — two tones, clean. Multiple eyestalks rise from the crown of its head like a wild crown, each ending in a smaller eye looking in a different direction — some curious, some half-lidded, each with its own personality. The eyestalks are smooth organic curves.
>
> Expression is smug and self-satisfied — the grin of a creature that knows it's the most dangerous thing in the room. One eyestalk peers at the viewer while others scan lazily around. There's dark humor in the face — it finds you amusing.
>
> Straight-on view, slightly below center so the viewer looks up at the floating creature. The beholder fills the upper two-thirds of the frame. Portrait orientation 3:4.
>
> Background: pure watercolor wash shapes only — NO ink lines on any background element. Cavern in blue-grey wash, warm golden glow wash from one side. No drawn rocks, no outlined stalactites — pure wash color shapes only. Two tones per area. Clean, not blended.
>
> Edges fade softly to cream paper. Bottom quarter transitions to deeper shadow tones, kept simple for text overlay.
>
> No text in image. No gore, wounds, or horror. No humans in frame. No photorealism, no 3D rendering, no hard digital edges, no flat cel-shading, no detailed fur linework, no crosshatching. No ink outlines on background elements.

### Siren

> Watercolor and ink illustration on textured cream paper. Thin confident brush-pen ink outlines with transparent watercolor washes, visible paper grain, wet-into-wet color blending, soft warm palette with gentle coastal sunset accents. Warm watercolor washes with solid color presence — NOT washed out or pale. Minimal interior linework — ink defines outer silhouette and face only, watercolor washes handle all body texture. Smooth rounded forms.
>
> A D&D siren perched on a jagged sea rock — a bird-woman with a beautiful human upper body and face, flowing windswept hair streaked with gold and dark brown, tangled with small shells and coral beads. Large powerful wings spread wide behind her — feathers rendered as layered watercolor wash shapes in teal, blue, and warm gold. Iridescence suggested through color shifts, not vivid saturation. Individual feather barbs are NOT drawn — just smooth overlapping wash shapes. Lower body transitions to bird legs with rounded talons gripping the wet rock. The wings are the defining feature — massive and dramatic, filling the upper frame. Skin has a warm golden tone. She wears no clothing — feathers and flowing hair provide natural, tasteful coverage.
>
> She is singing — head tilted upward, eyes closed, mouth open, completely lost in her own song. One hand raised gracefully as if conducting the wind. The whole pose radiates music — you can almost hear it. Expression is serene and mesmerizing, hauntingly beautiful rather than threatening.
>
> Low-angle view from below the rock, looking up. Three-quarter body visible — talons on rock at lower center, wings filling upper frame. Clean dramatic silhouette against the sky. Portrait orientation 3:4.
>
> Background: loose impressionistic washes — gentle coastal sunset in soft peach, warm amber, and muted rose-gold. Distant sea rendered as horizontal washes of soft teal and warm grey. Sea spray mist softening everything. Barely defined rocky coastline shapes. Atmospheric and luminous.
>
> Edges fade softly to cream paper. Bottom quarter transitions to darker warm rock tones, kept simple for text overlay.
>
> No text in image. No gore, wounds, or horror. No humans in frame. No photorealism, no 3D rendering, no hard digital edges, no flat cel-shading, no detailed fur linework, no crosshatching, no anime style.

---

## 5. After-Generation Refinement Phrases

Use these conversational follow-ups when iterating on a generated image:

### If too digital / too clean:
- "Add more visible paper texture — I want to see cream-colored paper grain through the paint"
- "Make the background much looser — just soft watercolor washes, barely defined shapes"
- "The linework should feel hand-drawn, not computer-generated — vary the line weight more"

### If too scary / too dark:
- "Soften the expression — more curious/grumpy than threatening"
- "Warm up the overall palette — more golden amber, less cool grey"
- "The creature should look impressive, not frightening — think nature documentary, not horror movie"

### If too much linework / too detailed / too "hairy":
- "Remove the individual fur/feather lines — I want smooth watercolor washes for texture, not drawn strands"
- "The body should be smooth rounded forms with color gradation, not textured with ink lines"
- "Only the face and outer silhouette should have linework — the body interior should be mostly just watercolor"
- "Soften and round the shapes — less angular, less muscular, more like soft volumes"
- "Simplify the claws and paws — round them, don't emphasize them"

### If too cute / too cartoonish:
- "Make the proportions more realistic — less chibi, more like a real animal in a stylized world"
- "Add more weight and mass to the body — it should feel heavy and grounded"
- "Sharpen the beak/claws/teeth slightly — this is a powerful creature, not a stuffed animal"

### If background too detailed:
- "Simplify the background to loose color washes only — no defined objects, just atmosphere"
- "The background should feel like wet watercolor on paper — colors bleeding into each other, no hard edges"

### If colors too saturated / too rich:
- "Soften the colors — they should feel like watercolor washes, not opaque paint"
- "Let some cream paper show through in the lighter areas — the color shouldn't be wall-to-wall"
- "The palette should feel warm and gentle, not vivid or punchy"

### If colors too washed out / too pale:
- "The creature needs more color presence — it's too ghostly right now"
- "Add a bit more warmth and pigment to the creature while keeping the background soft"
- "The creature should feel solid and warm, not bleached — soft watercolor, not faded watercolor"

### If composition is off:
- "Lower the camera angle — I want to look UP at the creature to feel its scale"
- "The creature should fill more of the frame — it needs to feel imposing and present"
- "Simplify the bottom quarter — that area needs to be plain for a text overlay"

---

## 6. Workflow for New Creatures

When generating an image for a new creature from the roster:

1. **Read the lore file** (`lore/[creature].md`) — understand the creature's physical description, personality, habitat, and defining features
2. **Identify the ONE defining visual feature** to exaggerate slightly (every creature has one — the thing that makes its silhouette unique)
3. **Choose an emotional state** from the approved list that fits the creature's personality
4. **Choose a camera angle** — default is low-angle looking up; adjust if the creature's shape benefits from a different view (e.g., beholder floating = below-center)
5. **Fill in the prompt template** section by section — don't skip any section
6. **Run the consistency checklist** before generating
7. **Generate and iterate** — expect 2-4 rounds of refinement using the conversational follow-up phrases
8. **Save originals** to `public/images/originals/[creature].png` and optimized versions to `public/images/creatures/[creature].webp`

### Choosing the Emotional State

Match emotion to creature personality from the lore:

| Emotion | Best for |
|---------|----------|
| Grumpy / territorial | Troll, Ogre, Rust Monster |
| Alert / protective | Owlbear, Griffon, Wyvern |
| Smug / self-satisfied | Beholder, Lich, Red Dragon |
| Curious / mischievous | Mimic, Goblin, Kobold |
| Serene / mesmerizing | Siren, Treant |
| Wary / suspicious | Displacer Beast, Werewolf |
| Hungry / focused | Bulette, Purple Worm, Hydra |
| Proud / regal | Death Knight, Griffon, Red Dragon |
| Menacing calm | Mind Flayer, Lich |
| Confused / startled | Gelatinous Cube, Skeleton |
| Fierce / savage | Orc, Hydra |

These are starting points — adjust based on what the lore research reveals about each creature's personality.
