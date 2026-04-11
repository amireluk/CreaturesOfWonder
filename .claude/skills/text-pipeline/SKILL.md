---
name: text-pipeline
description: Apply the creature text pipeline — translate English to Hebrew with Nikud and regenerate the .ts file. Trigger when the user asks to "apply text pipeline for X", "translate X", "add nikud to X", or "update the Hebrew for X".
argument-hint: [creature-id]
---

You are applying the text pipeline for creature: **$ARGUMENTS**

## Steps

1. **Read** `content/$ARGUMENTS.json`
2. **Identify** which fields need work by checking each text field:
   - `he_nikud` is empty AND `en` exists → translate `en` to Hebrew + add full Nikud → write to `he_nikud`
   - `he` is populated but `he_nikud` is empty → add Nikud to `he` → write to `he_nikud`
   - User said they edited a specific English field → clear `he` and `he_nikud` for that field only, retranslate
3. **Write** the updated JSON back to `content/$ARGUMENTS.json`
4. **Run** `node scripts/generate.js $ARGUMENTS` to regenerate the `.ts` file
5. **Confirm** what was done (which fields were translated/updated)

## Hebrew rules

- 2nd-3rd grade reading level (ages 7-9, native Hebrew speakers)
- Field guide tone: the creature IS real — never say "in D&D" or "in mythology" in the main description
- Full Nikud on ALL text, including titles and short strings
- Natural Hebrew — don't translate literally from English, write as a native speaker would
- Match the tone and style of existing creatures (read `content/troll.json` or `content/beholder.json` as reference)

## Field guide

The content JSON structure:
- `description[]` — 2 paragraphs, 3-4 sentences each
- `didYouKnow` — single punchy sentence, the most surprising fact
- `reveals[].title` — short section heading (3-6 words)
- `reveals[].content` — 3-5 sentences, the reveal content

If `content/$ARGUMENTS.json` does not exist, say so and ask the user to provide the English content or point to a lore file.
