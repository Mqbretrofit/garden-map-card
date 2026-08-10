import fs from "node:fs";
import assert from "node:assert/strict";

const bundle = fs.readFileSync(new URL("../garden-map-card.js", import.meta.url), "utf8");

assert.match(bundle, /attributes\.live_shadow_connected/);
assert.match(bundle, /MQTT:.*online.*offline/);
assert.match(bundle, /mqttConnected === false \? "offline"/);

console.log("Garden Map Card MQTT status checks passed");
