// Static validator for src/data/events.json.
// Run: npm run validate
// Exits non-zero on any error so it can gate `npm run build`.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const file = join(here, "..", "src", "data", "events.json");

let events;
try {
  events = JSON.parse(readFileSync(file, "utf8"));
} catch (e) {
  console.error("✗ Cannot read or parse events.json:", e.message);
  process.exit(1);
}

let errors = 0;
let warnings = 0;
const fail = (msg) => {
  console.error("✗", msg);
  errors++;
};
const warn = (msg) => {
  console.warn("⚠", msg);
  warnings++;
};
const ok = (msg) => console.log("✓", msg);

if (!Array.isArray(events)) {
  fail("events.json root is not an array");
  process.exit(1);
}

// 1. Unique IDs
const ids = events.map((e) => e.id);
const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
if (dupes.length) fail(`Duplicate event IDs: ${dupes.join(", ")}`);
else ok(`All ${ids.length} event IDs unique`);
const idSet = new Set(ids);

// 2. Reference integrity (nextEventId, delayedConsequences.eventId)
for (const e of events) {
  const allChoices = [
    ...(e.choices ?? []),
    ...(e.variants ?? []).flatMap((v) => v.choices ?? []),
  ];
  for (const c of allChoices) {
    if (c.nextEventId && !idSet.has(c.nextEventId)) {
      fail(`${e.id}.${c.id}: nextEventId "${c.nextEventId}" not found`);
    }
    for (const dc of c.delayedConsequences ?? []) {
      if (!idSet.has(dc.eventId)) {
        fail(`${e.id}.${c.id}: delayedConsequences "${dc.eventId}" not found`);
      }
      if (typeof dc.delayDays !== "number" || dc.delayDays < 1) {
        fail(`${e.id}.${c.id}: invalid delayDays`);
      }
    }
  }
}

// 3. Each non-branch / non-epilogue day in 1..7 has at least 3 events
const byDay = {};
for (const e of events) {
  const tags = e.tags ?? [];
  if (tags.includes("branch") || tags.includes("epilogue")) continue;
  (byDay[e.day] ||= []).push(e.id);
}
for (let d = 1; d <= 7; d++) {
  const n = byDay[d]?.length ?? 0;
  if (n === 0) fail(`Day ${d} has no regular events`);
  else if (n < 3) warn(`Day ${d} has only ${n} regular events`);
}

// 4. Required epilogue events present
const required = [
  "EP_BURNOUT_1",
  "EP_BURNOUT_2",
  "EP_GOHOME_1",
  "EP_GOHOME_2",
  "EP_SURVIVE_1",
  "EP_GROWTH_1",
  "EP_GROWTH_2",
  "EP_BELONGING_1",
  "EP_BELONGING_2",
];
const missingEp = required.filter((id) => !idSet.has(id));
if (missingEp.length) fail(`Missing epilogue events: ${missingEp.join(", ")}`);
else ok("All 9 epilogue events present");

// 5. Flag coverage — every requireFlags / forbidFlags must be settable
const setFlags = new Set();
const reqFlags = new Set();
for (const e of events) {
  const allChoices = [
    ...(e.choices ?? []),
    ...(e.variants ?? []).flatMap((v) => v.choices ?? []),
  ];
  for (const c of allChoices) for (const f of c.setFlags ?? []) setFlags.add(f);
  for (const v of e.variants ?? []) {
    for (const f of v.requireFlags ?? []) reqFlags.add(f);
    for (const f of v.forbidFlags ?? []) reqFlags.add(f);
  }
}
const orphanReq = [...reqFlags].filter((f) => !setFlags.has(f));
if (orphanReq.length) fail(`Required flags never set: ${orphanReq.join(", ")}`);
else ok(`All ${reqFlags.size} required flags are set somewhere`);
const unusedSet = [...setFlags].filter((f) => !reqFlags.has(f));
if (unusedSet.length) {
  warn(
    `${unusedSet.length} flags are set but not yet checked by any variant ` +
      `(OK if reserved for future content): ${unusedSet.slice(0, 5).join(", ")}${
        unusedSet.length > 5 ? ", …" : ""
      }`,
  );
}

// 6. Schema sanity — non-empty messages, choices, text
const validSenders = new Set([
  "mom",
  "manager",
  "friend",
  "ex",
  "neighbor",
  "colleague",
  "cityhall",
  "bank",
  "system",
  "self",
]);
const validTypes = new Set(["chat", "mail", "notification", "system"]);

for (const e of events) {
  if (!e.id) fail("Event with no id");
  if (typeof e.day !== "number") fail(`${e.id}: day missing`);
  if (!validTypes.has(e.type)) fail(`${e.id}: bad type "${e.type}"`);
  if (!validSenders.has(e.sender)) fail(`${e.id}: bad sender "${e.sender}"`);
  if (!Array.isArray(e.messages) || e.messages.length === 0)
    fail(`${e.id}: empty messages`);
  if (!Array.isArray(e.choices) || e.choices.length === 0)
    fail(`${e.id}: no choices`);
  for (const c of e.choices ?? []) {
    if (!c.id) fail(`${e.id}: choice with no id`);
    if (!c.text || !c.text.trim()) fail(`${e.id}.${c.id}: empty text`);
    if (!c.statEffects || typeof c.statEffects !== "object")
      fail(`${e.id}.${c.id}: missing statEffects`);
  }
  for (const v of e.variants ?? []) {
    if (!Array.isArray(v.messages) || v.messages.length === 0)
      fail(`${e.id}: variant with empty messages`);
  }
}

// Final
console.log(`\n${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}`);
process.exit(errors ? 1 : 0);
