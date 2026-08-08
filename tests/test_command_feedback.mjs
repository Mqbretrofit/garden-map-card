import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../garden-map-card.source.js", import.meta.url), "utf8");
const bundle = fs.readFileSync(new URL("../garden-map-card.js", import.meta.url), "utf8");
const distBundle = fs.readFileSync(new URL("../dist/garden-map-card.js", import.meta.url), "utf8");

assert.equal(bundle, distBundle, "The root and HACS bundles must be identical");

for (const text of [
  "Parancs elküldve:",
  "A felhő elfogadta:",
  "A felhő elutasította:",
  "A robot visszaigazolta:",
  "Nem érkezett állapot-visszaigazolás:",
]) {
  assert.ok(source.includes(text), `Missing feedback stage: ${text}`);
}

for (const service of [
  "start_full_mow",
  "start_zone_mow",
  "start_outer_edge_mow",
  "start_dock_edge_mow",
  "stop_mow",
  "return_to_dock",
]) {
  assert.ok(source.includes(service), `Missing command mapping: ${service}`);
}

for (const status of ["nyiras", "zonanyiras", "keszenlet", "toltes", "visszaatoltore"]) {
  assert.ok(source.includes(`"${status}"`), `Missing Hungarian status alias: ${status}`);
}

assert.ok(source.includes("executeAnthbotButton(buttonEntity"), "Button controls must use feedback handling");
assert.ok(source.includes("this.waitForCommandConfirmation(service, label, token)"), "Robot confirmation polling is missing");
assert.ok(source.includes('["anthbot_map", "anthbot_genie_plus", "anthbot_ha"]'), "Integration domain auto-selection is missing");

console.log("Garden Map Card command feedback checks passed");
