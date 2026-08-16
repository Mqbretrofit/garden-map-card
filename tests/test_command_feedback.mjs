import assert from "node:assert/strict";
import fs from "node:fs";
import { LANGUAGES, translate } from "../garden-i18n.js";

const source = fs.readFileSync(new URL("../garden-map-card.source.js", import.meta.url), "utf8");
const bundle = fs.readFileSync(new URL("../garden-map-card.js", import.meta.url), "utf8");
const distBundle = fs.readFileSync(new URL("../dist/garden-map-card.js", import.meta.url), "utf8");

assert.equal(bundle, distBundle, "The root and HACS bundles must be identical");

for (const key of [
  "commandSentWaiting",
  "commandCloudAccepted",
  "commandCloudRejected",
  "commandConfirmed",
  "commandNotConfirmed",
]) {
  assert.ok(source.includes(`this.feedback("${key}"`), `Missing feedback stage: ${key}`);
  for (const [language] of LANGUAGES.filter(([language]) => language !== "auto")) {
    const message = translate(language, key);
    assert.ok(message.includes("{command}"), `${language}.${key} must contain {command}`);
    assert.notEqual(message, key, `${language}.${key} is not translated`);
  }
}

for (const text of ["Parancs elküldve:", "A felhő elfogadta:", "A felhő elutasította:"]) {
  assert.ok(!source.includes(text), `Hard-coded Hungarian feedback remains: ${text}`);
}

for (const key of [
  "robotLog", "irrigationLog", "openLogHint", "robotLogLoading",
  "robotLogLoadFailed", "noRobotLog", "robotLogDate", "refresh",
]) {
  for (const [language] of LANGUAGES.filter(([language]) => language !== "auto")) {
    assert.notEqual(translate(language, key), key, `${language}.${key} must have a translated fallback`);
  }
}

for (const hardCodedUi of [
  ">Robotnapló<", ">Öntözési napló<", "Robotnapló betöltése",
  "Ezen a napon nincs robotállapot-változás", ">Frissítés<",
]) {
  assert.ok(!source.includes(hardCodedUi), `Hard-coded Garden UI remains: ${hardCodedUi}`);
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

assert.ok(source.includes('selected?.type==="edge") return this.handleCommand("outer-edge")'), "Selected outer edge must dispatch the outer-edge command");
assert.ok(source.includes('"outer-edge": "start_outer_edge_mow"'), "Outer-edge command must use the dedicated integration service");
assert.ok(source.includes('"edgemowing"'), "Official outer-edge status alias is missing");
assert.ok(source.includes("tile.dataset.primaryMowingAction=action"), "Primary mowing tile must be marked as target-dependent");

assert.ok(source.includes("executeAnthbotButton(buttonEntity"), "Button controls must use feedback handling");
assert.ok(source.includes("this.waitForCommandConfirmation(service, label, token)"), "Robot confirmation polling is missing");
assert.ok(source.includes('["anthbot_map", "anthbot_genie_plus", "anthbot_ha"]'), "Integration domain auto-selection is missing");

for (const oldAnthbotSelector of [
  'data-command=',
  'className = `panel-tile command-tile',
  'className = "panel-tile zone-tile"',
  'data-role="zone-controls"',
]) {
  assert.ok(
    !source.includes(oldAnthbotSelector),
    `Garden controls can still be intercepted by the old Anthbot handler: ${oldAnthbotSelector}`,
  );
}
for (const gardenSelector of [
  'data-garden-command=',
  'garden-command-tile',
  'garden-zone-tile',
  'data-role="garden-zone-controls"',
]) {
  assert.ok(source.includes(gardenSelector), `Missing isolated Garden selector: ${gardenSelector}`);
}

console.log("Garden Map Card command feedback checks passed");
