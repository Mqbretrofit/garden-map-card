import fs from "node:fs";
import assert from "node:assert/strict";

const bundle = fs.readFileSync(new URL("../garden-map-card.js", import.meta.url), "utf8");
const enhancements = bundle;

assert.match(bundle, /attributes\.live_shadow_connected/);
assert.match(bundle, /MQTT:.*online.*offline/);
assert.match(bundle, /mqttConnected\s*===\s*false\s*\?\s*"offline"/);
assert.match(enhancements, /attrs\.ridable_area_time/);
assert.match(enhancements, /ridableAreas\(this\)/);
assert.match(enhancements, /gardenEdgeStateSignature/);
assert.match(enhancements, /edges\.length\s*===\s*1\s*\?\s*t\(this,\s*"edge"\)/);
assert.doesNotMatch(bundle, /from "\.\/garden-anthbot-enhancements\.js/);

console.log("Garden Map Card MQTT status checks passed");
