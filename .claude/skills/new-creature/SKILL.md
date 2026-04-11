---
name: new-creature
description: Research a new creature and generate English content + art prompt. Trigger when the user says "new creature", "add creature X", "research X", or "start X".
argument-hint: [creature-id]
---

You are starting the pipeline for a new creature: **$ARGUMENTS**

## Steps

### 1. Check for existing lore

Check if `lore/$ARGUMENTS.md` exists.
- If it exists, read it — that's your research base.
- If it doesn't exist, do research now (see Research section below), then write `lore/$ARGUMENTS.md`.

### 2. Research (if needed)

Research the creature thoroughly:
- D&D SRD mechanics: habitat, size category, danger/CR, key abilities
- Real-world mythology or folklore roots (if any)
- Interesting facts, behaviors, diet, lair, social structure
- What makes this creature unique vs others already in the app

Existing creatures for reference (avoid overlap): Troll, Beholder, Owlbear, Siren, Hydra, Mimic.

Write findings to `lore/$ARGUMENTS.md` using this structure:
```
# [Creature Name] — Research Notes

## D&D Stats & Mechanics
...

## Behavior & Ecology
...

## Real-World Origins (if any)
...

## Interesting Facts
...

## Reveal Section Candidates
List 2-3 reveal options that would work well for this creature, with a short rationale for each.
Pick the best 1-2 and note your recommendation.
```

### 3. Choose reveal sections

Pick 1-2 reveal sections from this roster that best fit the creature's personality and lore:
- `weaknesses` — How to survive an encounter / how to fight it
- `abilities` — A key special power and how it works
- `lair` — Where it lives and what its home is like
- `diet` — What it eats and how it hunts
- `social` — Pack/herd behavior, family structure, hierarchy
- `strange` — The weirdest / most surprising thing about it
- `origin` — Real-world mythology/folklore roots (use when there's a compelling real-world story)
- `signs` — How to detect one before you see it
- `scale` — How its size/power compares to familiar things

Don't force-fit. The sections should feel essential for THIS creature, not generic.

### 4. Write English content to `content/$ARGUMENTS.json`

Create `content/$ARGUMENTS.json` with this structure. Fill all `en` fields; leave `he` and `he_nikud` empty (they'll be populated by the text pipeline):

```json
{
  "id": "$ARGUMENTS",
  "name": {
    "hebrew": "",
    "english": "[English Name]"
  },
  "stats": {
    "habitat": "[forest|water|underground|swamp|mountain|plains|sky]",
    "size": "[small|medium|large|huge]",
    "danger": [1-5]
  },
  "image": "/images/creatures/$ARGUMENTS.webp",
  "reveals": [
    { "type": "[reveal type]" }
  ],
  "en": {
    "description": [
      "[Paragraph 1: 3-4 sentences. Field guide tone — the creature IS real. Appearance and where it lives.]",
      "[Paragraph 2: 3-4 sentences. Behavior, how it hunts or lives, what makes it dangerous or interesting.]"
    ],
    "didYouKnow": "[Single punchy sentence. The most surprising fact. Kids aged 7-9 audience.]",
    "reveals": [
      {
        "title": "[Short section heading, 3-6 words]",
        "content": "[3-5 sentences of reveal content.]"
      }
    ]
  },
  "he": {
    "description": ["", ""],
    "didYouKnow": "",
    "reveals": [{ "title": "", "content": "" }]
  },
  "he_nikud": {
    "description": ["", ""],
    "didYouKnow": "",
    "reveals": [{ "title": "", "content": "" }]
  }
}
```

**Content rules:**
- 2nd-3rd grade reading level (ages 7-9)
- Field guide tone: creature IS real — never say "in D&D" or "in mythology" in `description` or `didYouKnow`
- Origin reveals CAN mention real-world mythology — that's the point of that section
- Match tone/style of existing creatures (troll.json, beholder.json as reference)
- `danger`: 1=harmless, 2=risky, 3=dangerous, 4=very dangerous, 5=legendary

**Hebrew name:** If you know the standard Hebrew name or a good coined name, fill in `name.hebrew` now. Otherwise leave empty and note it for the user.

### 5. Generate art prompt

Read `lore/art-prompting-guide.md` for the full style guide and prompt structure.

Generate a complete art prompt following the template:
1. **Technique** paragraph (copy the standard opening exactly from the guide)
2. **Creature description** — size, body shape, key features with soft color names, defining feature slightly exaggerated
3. **Expression & pose** — emotional state in conversational language, body language, what the creature is doing
4. **Composition** — low-angle looking up (default), 3/4 body, portrait 3:4
5. **Background** — loose watercolor washes of color/light only, habitat-evocative, atmospheric
6. **Edges** — fade to cream paper, bottom quarter kept simple for text overlay
7. **Safety negatives** — standard closing line

Target: 150-250 words. Run the consistency checklist from the guide before outputting.

Append the prompt to `lore/art-prompting-guide.md` under `## 4. Creature Image Prompts` as a new `### [Creature Name]` section.

### 6. Hand off to user

Output this message (fill in the creature name and image filename):

---
**[Creature Name] is ready for art generation.**

Art prompt has been added to `lore/art-prompting-guide.md`.

**Your next step:**
1. Copy the art prompt from the guide and generate the image in Google Nano Banana (or Gemini)
2. Save the result as `public/images/originals/$ARGUMENTS.png`
3. Then say: **apply text pipeline for $ARGUMENTS**
---
