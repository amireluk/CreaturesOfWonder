#!/usr/bin/env node
// Generates src/data/creatures/{id}.ts from content/{id}.json
// Usage: node scripts/generate.js <creature-id>
//        node scripts/generate.js --all

const fs = require("fs");
const path = require("path");

const contentDir = path.resolve(__dirname, "../content");
const outputDir = path.resolve(__dirname, "../src/data/creatures");

function getHebrew(lang, fieldPath) {
  if (!lang) throw new Error(`Missing language block at: ${fieldPath}`);
  return lang;
}

function buildCreature(content) {
  // Support both new top-level language sections and legacy per-field format
  const isNew = content.en && !content.description;

  if (isNew) {
    const heb = content.he_nikud || content.he;
    if (!heb) throw new Error(`Missing he_nikud and he blocks in ${content.id}`);

    if (!heb.description || heb.description.some((d) => !d))
      throw new Error(`Missing Hebrew description in ${content.id}`);
    if (!heb.didYouKnow)
      throw new Error(`Missing Hebrew didYouKnow in ${content.id}`);

    return {
      id: content.id,
      name: content.name,
      stats: content.stats,
      image: content.image,
      description: heb.description,
      didYouKnow: heb.didYouKnow,
      reveals: content.reveals.map((r, i) => ({
        type: r.type,
        title: heb.reveals[i].title,
        content: heb.reveals[i].content,
      })),
    };
  }

  // Legacy per-field format fallback
  function getText(field, fieldPath) {
    if (typeof field === "string") return field;
    if (field.he_nikud) return field.he_nikud;
    if (field.he) return field.he;
    throw new Error(`Missing Hebrew text at: ${fieldPath}`);
  }

  return {
    id: content.id,
    name: content.name,
    stats: content.stats,
    image: content.image,
    description: content.description.map((d, i) =>
      getText(d, `description[${i}]`)
    ),
    didYouKnow: getText(content.didYouKnow, "didYouKnow"),
    reveals: content.reveals.map((r, i) => ({
      type: r.type,
      title: getText(r.title, `reveals[${i}].title`),
      content: getText(r.content, `reveals[${i}].content`),
    })),
  };
}

function serialize(val, depth = 0) {
  const pad = "  ".repeat(depth);
  const innerPad = "  ".repeat(depth + 1);

  if (typeof val === "string") return JSON.stringify(val);
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (val === null) return "null";

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map((v) => `${innerPad}${serialize(v, depth + 1)}`);
    return `[\n${items.join(",\n")},\n${pad}]`;
  }

  if (typeof val === "object") {
    const entries = Object.entries(val).map(
      ([k, v]) => `${innerPad}${k}: ${serialize(v, depth + 1)}`
    );
    return `{\n${entries.join(",\n")},\n${pad}}`;
  }

  return String(val);
}

function generate(id) {
  const contentPath = path.join(contentDir, `${id}.json`);
  if (!fs.existsSync(contentPath)) {
    console.error(`Content file not found: content/${id}.json`);
    process.exit(1);
  }

  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
  const creature = buildCreature(content);

  const output = `import { Creature } from "@/lib/types";

// AUTO-GENERATED from content/${id}.json — edit that file, not this one
export const ${id}: Creature = ${serialize(creature)};
`;

  const outputPath = path.join(outputDir, `${id}.ts`);
  fs.writeFileSync(outputPath, output);
  console.log(`✓ Generated src/data/creatures/${id}.ts`);
}

const args = process.argv.slice(2);
if (args[0] === "--all") {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".json"));
  files.forEach((f) => generate(f.replace(".json", "")));
} else if (args[0]) {
  generate(args[0]);
} else {
  console.error("Usage: node scripts/generate.js <creature-id> | --all");
  process.exit(1);
}
