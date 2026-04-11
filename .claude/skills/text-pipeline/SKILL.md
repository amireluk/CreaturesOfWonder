---
name: text-pipeline
description: Apply the creature text pipeline — translate English to Hebrew with Nikud, convert image, wire into index, and regenerate the .ts file. Trigger when the user asks to "apply text pipeline for X", "translate X", "add nikud to X", or "update the Hebrew for X".
argument-hint: [creature-id]
---

You are applying the text pipeline for creature: **$ARGUMENTS**

## Step 1 — Convert image (if needed)

Check if `public/images/creatures/$ARGUMENTS.webp` already exists.

If it does NOT exist:
- Check if `public/images/originals/$ARGUMENTS.png` exists
- If the PNG exists, run:
  ```
  node -e "require('sharp')('public/images/originals/$ARGUMENTS.png').resize(800, 1067, { fit: 'cover', position: 'top' }).webp({ quality: 85 }).toFile('public/images/creatures/$ARGUMENTS.webp', (err) => { if (err) throw err; console.log('done'); })"
  ```
- If the PNG does NOT exist, stop and tell the user: "No image found at `public/images/originals/$ARGUMENTS.png`. Please add the PNG first."

## Step 2 — Translate and add Nikud

Read `content/$ARGUMENTS.json`.

The JSON has top-level language sections: `en`, `he`, `he_nikud`. Each contains `description[]`, `didYouKnow`, and `reveals[]` (with `title` + `content` per entry).

For each text field across `description`, `didYouKnow`, `reveals[].title`, `reveals[].content`:
- `he_nikud` field is empty AND `en` exists → translate `en` to Hebrew + add full Nikud → write to `he_nikud`
- `he` field is empty but `he_nikud` is populated → strip nikud (remove U+0591–U+05C7) → write to `he`
- `he` is populated but `he_nikud` is empty → add Nikud to `he` → write to `he_nikud`
- User said to retranslate a specific field → clear that field in both `he` and `he_nikud`, retranslate

**Hebrew rules:**
- 2nd-3rd grade reading level (ages 7-9, native Hebrew speakers)
- Field guide tone: the creature IS real — never say "in D&D" or "in mythology" in description/didYouKnow (origin reveals may mention real-world sources)
- Full Nikud on ALL text including titles and short strings
- Natural Hebrew — write as a native speaker would, don't translate literally from English
- Match tone and style of existing creatures (read `content/troll.json` or `content/beholder.json` as reference if needed)

**Hebrew grammar reminders:**
- Vav conjunction (and) before a word starting with a consonant cluster or shva: use וּ (e.g., וּכְנָפַיִם, not וְכְּנָפַיִם)
- בְּ before shva: use בִּ (e.g., בִּקְבוּצָה)
- Adjectives must agree with their noun in gender and number
- קָסוּם = magical (adjective), קוֹסֵם = sorcerer (noun) — pick correctly

Write the updated JSON back to `content/$ARGUMENTS.json`.

## Step 2b — Hebrew verification pass

Read back ONLY the `he_nikud` block you just wrote — ignore the English entirely for this step.

Review it as a native Hebrew reader would, checking:
- **Naturalness**: does it read like something a Hebrew speaker would actually say, or does it sound translated?
- **Reading level**: is every word and sentence accessible to a 7-9 year old? Flag anything too complex.
- **Grammar**: agreement (gender/number), correct binyan, proper use of definite article
- **Nikud accuracy**: vowel points match the word as it would be pronounced. Common errors to check: shva vs hataf, holam male vs haser, dagesh in begadkefat after open syllable
- **Tone**: field guide, present-tense, creature is real. No "in D&D", no "in mythology" outside of origin reveals.
- **Flow**: do the paragraphs read smoothly aloud? Any sentence that feels clunky or too long?

Fix any issues found directly in the JSON before moving to Step 3. If you fix something in `he_nikud`, strip the nikud and update `he` to match.

## Step 3 — Regenerate the .ts file

Run:
```
node scripts/generate.js $ARGUMENTS
```

Verify the output file `src/data/creatures/$ARGUMENTS.ts` was updated successfully.

## Step 4 — Wire into index (if new creature)

Check `src/data/creatures/index.ts`. If `$ARGUMENTS` is not already imported and included in the `creatures` array:

1. Add the import at the top with the other creature imports:
   ```typescript
   import { $ARGUMENTS } from "./$ARGUMENTS";
   ```
2. Add `$ARGUMENTS` to the `creatures` array.

## Step 5 — Confirm

Report what was done:
- Which fields were translated/updated
- Whether the image was converted
- Whether the creature was added to index.ts
- Any fields skipped (already had he_nikud)
