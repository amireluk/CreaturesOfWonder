#!/usr/bin/env node
// Migrates content/{id}.json from per-field {en,he,he_nikud} to top-level language sections
// Also populates `he` by stripping nikud from `he_nikud`
// Usage: node scripts/migrate-content.js <creature-id> | --all

const fs = require("fs");
const path = require("path");

const contentDir = path.resolve(__dirname, "../content");

function stripNikud(str) {
  // Remove Hebrew vowel points and cantillation marks (U+0591–U+05C7)
  return str.replace(/[\u0591-\u05C7]/g, "");
}

function migrate(id) {
  const filePath = path.join(contentDir, `${id}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Already migrated?
  if (content.en && content.he_nikud) {
    console.log(`✓ ${id} already migrated, skipping`);
    return;
  }

  const en = { description: [], didYouKnow: "", reveals: [] };
  const he = { description: [], didYouKnow: "", reveals: [] };
  const he_nikud = { description: [], didYouKnow: "", reveals: [] };
  const revealsTypes = [];

  // description
  for (const d of content.description) {
    en.description.push(d.en || "");
    he_nikud.description.push(d.he_nikud || "");
    he.description.push(d.he || (d.he_nikud ? stripNikud(d.he_nikud) : ""));
  }

  // didYouKnow
  en.didYouKnow = content.didYouKnow.en || "";
  he_nikud.didYouKnow = content.didYouKnow.he_nikud || "";
  he.didYouKnow = content.didYouKnow.he || (content.didYouKnow.he_nikud ? stripNikud(content.didYouKnow.he_nikud) : "");

  // reveals
  for (const r of content.reveals) {
    revealsTypes.push({ type: r.type });
    en.reveals.push({ title: r.title.en || "", content: r.content.en || "" });
    const nikudTitle = r.title.he_nikud || "";
    const nikudContent = r.content.he_nikud || "";
    he_nikud.reveals.push({ title: nikudTitle, content: nikudContent });
    he.reveals.push({
      title: r.title.he || (nikudTitle ? stripNikud(nikudTitle) : ""),
      content: r.content.he || (nikudContent ? stripNikud(nikudContent) : ""),
    });
  }

  const migrated = {
    id: content.id,
    name: content.name,
    stats: content.stats,
    image: content.image,
    reveals: revealsTypes,
    en,
    he,
    he_nikud,
  };

  fs.writeFileSync(filePath, JSON.stringify(migrated, null, 2) + "\n");
  console.log(`✓ Migrated content/${id}.json`);
}

const args = process.argv.slice(2);
if (args[0] === "--all") {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".json"));
  files.forEach((f) => migrate(f.replace(".json", "")));
} else if (args[0]) {
  migrate(args[0]);
} else {
  console.error("Usage: node scripts/migrate-content.js <creature-id> | --all");
  process.exit(1);
}
