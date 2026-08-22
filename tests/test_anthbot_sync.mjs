import assert from "node:assert/strict";
import fs from "node:fs";

import { createGeometry } from "../garden-geometry.js";
import { cloudHeadingToCanvasRadians } from "../garden-renderer.js";
import {
  cardToYaml,
  readMowingPathCalibration,
} from "../garden-calibration.js";
import {
  LANGUAGES as ANTHBOT_LANGUAGES,
  translate as translateAnthbot,
} from "../garden-anthbot-i18n.js";
import { translate } from "../garden-i18n.js";

const source = fs.readFileSync(new URL("../garden-map-card.source.js", import.meta.url), "utf8");

const geometry = createGeometry({
  bounds: { minX: 0, minY: 0, maxX: 1000, maxY: 1000 },
  width: 1000,
  height: 600,
  fit: "contain",
  calibration: { offsetX: 0.08, offsetY: -0.04, scaleX: 1.2, scaleY: 0.8, rotation: Math.PI / 2 },
});
const center = geometry.mapToScreenWithLayerCalibration({ x: 0.5, y: 0.5 }, {});
const right = geometry.mapToScreenWithLayerCalibration({ x: 0.5, y: 0.5 }, { offsetX: 0.01 });
const down = geometry.mapToScreenWithLayerCalibration({ x: 0.5, y: 0.5 }, { offsetY: 0.01 });
assert.ok(right.x > center.x, "Layer right must still move right after map calibration");
assert.ok(down.y > center.y, "Layer down must still move down after map calibration");

const legacyPath = readMowingPathCalibration({
  robotCalibration: { offsetX: 0.12, offsetY: -0.08, scaleX: 1.5, scaleY: 0.7, rotation: 1.2 },
});
assert.deepEqual(legacyPath, { offsetX: 0.12, offsetY: -0.08, scaleX: 1, scaleY: 1, rotation: 0 });

const yaml = cardToYaml(
  { entity: "sensor.test_map", robot_heading_offset: 15 },
  { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
  { offsetX: 0.1, offsetY: 0, scaleX: 1.1, scaleY: 0.9, rotation: 0 },
  { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1, rotation: 0 },
  { offsetX: 0, offsetY: 0.2, scaleX: 1, scaleY: 1, rotation: 0.3 },
);
assert.match(yaml, /robot_heading_offset: 15/);
assert.match(yaml, /robotCalibration:[\s\S]*scaleY: 0\.9/);
assert.match(yaml, /mowingPathCalibration:[\s\S]*offsetY: 0\.2/);
assert.ok(
  yaml.indexOf("mowingPathCalibration:") < yaml.indexOf("decodedBoundaryCalibration:"),
  "Garden YAML layer order must match Anthbot Map Card",
);

assert.ok(Math.abs(cloudHeadingToCanvasRadians(90) - Math.PI / 2) < 1e-9);
assert.ok(Math.abs(cloudHeadingToCanvasRadians(270) + Math.PI / 2) < 1e-9);

for (const marker of [
  "data-mowing-path-calibration",
  "data-robot-heading",
  "setMowingPathCalibration",
  "renderMowingHistoryList",
  "get_mowing_record_detail",
  "renderMowingRecordZonesSvg",
  "createSettingsSection",
  "formatRecordSource(value)",
  'if (normalized === "1") return this.t("mowingSourceApp")',
  "const recordsPayload = attrs.mowing_records || { data: [] }",
  "__gardenMapCardRegistrationTag",
]) {
  assert.ok(source.includes(marker), `Missing Anthbot sync marker: ${marker}`);
}

assert.ok(!source.includes("GARDEN_BUILD_LABEL"), "Release card must not display a test build label");

const rendererSource = fs.readFileSync(new URL("../garden-renderer.js", import.meta.url), "utf8");
assert.ok(rendererSource.includes("drawRasterBoundary(ctx, geometry, raster, bounds)"));
assert.ok(rendererSource.includes("ctx.lineWidth = clamp(Number(this.options.boundaryWidth) || 3, 1, 12)"));

const sourceFormatter = source.match(/formatRecordSource\(value\) \{([\s\S]*?)\n  \}\n\n  createPanelGrid/);
assert.ok(sourceFormatter, "Garden must contain the complete Anthbot record-source formatter");
const formatRecordSource = new Function("value", sourceFormatter[1]);
assert.equal(
  formatRecordSource.call({ t: (key) => key }, "1"),
  "mowingSourceApp",
  "Real mowing history start_cause=1 must render as app-started",
);

assert.equal(translate("en", "mowingPathFit"), "Mowing path calibration");
assert.equal(translate("hu", "mowingPathFit"), "Nyírási útvonal kalibráció");
assert.notEqual(translate("en", "mowingHistoryDetailLoading"), "mowingHistoryDetailLoading");

for (const [language] of ANTHBOT_LANGUAGES.filter(([code]) => code !== "auto" && code !== "en")) {
  for (const key of ["mowingPathFit", "mowingHistory", "mowingHistoryEmpty", "mowingHistoryDetailUnavailable"]) {
    assert.notEqual(
      translateAnthbot(language, key),
      translateAnthbot("en", key),
      `${language}:${key} must not fall back to English`,
    );
  }
}
assert.equal(translateAnthbot("hu", "mowingPathFit"), "Nyírási útvonal kalibráció");
assert.equal(translateAnthbot("de", "mowingHistory"), "Frühere Mähaufgaben");

console.log("Garden Map Card Anthbot v2.3 sync checks passed");
