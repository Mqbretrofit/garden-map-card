import { createGeometry, getBoundaryPaths, getWorldBounds, getZonePoints, getZones, normalizePoints } from "./garden-geometry.js?v=2";

const COLORS = Object.freeze({
  background: "#18202a",
  grid: "rgba(255, 255, 255, 0.09)",
  zoneFill: "rgba(67, 160, 71, 0.28)",
  zoneStroke: "rgba(129, 199, 132, 0.95)",
  noGoFill: "rgba(244, 67, 54, 0.38)",
  noGoStroke: "rgba(255, 82, 82, 1)",
  boundaryStroke: "rgba(74, 101, 255, 0.9)",
  boundaryGlow: "rgba(168, 179, 255, 0.38)",
  mowedPath: "rgba(82, 94, 245, 0.62)",
  mowedPathStroke: "rgba(220, 226, 255, 0.72)",
  mowedCoverage: "rgba(255, 235, 59, 0.28)",
  robot: "#ffcc33",
  robotStroke: "#1b1b1b",
});

export class AnthbotMapRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.options = { ...options };
    this.state = {};
    this.image = null;
    this.imageUrl = null;
    this.rasterCanvas = null;
    this.rasterBoundaryCanvas = null;
    this.rasterKey = null;
    this.rasterBoundaryKey = null;
    this.robotImage = null;
    this.robotImageUrl = null;
    this.robotHeading = null;
    this.cloudHeading = null;
    this.liveMowedPath = [];
    this.persistedMowedPath = [];
    this.lastTrailPoint = null;
    this.mowedPathStorageKey = options.mowedPathStorageKey || null;
    this.lastSavedMowedPathSignature = "";
    this.dpr = 1;
    this.view = {
      panX: 0,
      panY: 0,
      zoom: 1,
      rotation: Number(options.rotation) || 0,
    };
    this.drag = null;
    this.pointers = new Map();
    this.pinch = null;
    this.irrigationAnimationFrame = null;
    this.irrigationAnimationLast = 0;
    this.irrigationAnimationPhase = 0;
    this.decodedBoundaryCalibration = options.decodedBoundaryCalibration || {};
    if (!this.isCloudOnlyMowedPath()) {
      this.restoreLiveMowedPath();
    }

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWheel = this.onWheel.bind(this);

    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointercancel", this.onPointerUp);
    canvas.addEventListener("wheel", this.onWheel, { passive: false });
  }

  destroy() {
    if (this.irrigationAnimationFrame) {
      cancelAnimationFrame(this.irrigationAnimationFrame);
      this.irrigationAnimationFrame = null;
    }
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
  }

  setOptions(options = {}) {
    const previousMowedPathStorageKey = this.mowedPathStorageKey;
    this.options = { ...this.options, ...options };
    this.mowedPathStorageKey = this.options.mowedPathStorageKey || null;
    if (this.isCloudOnlyMowedPath()) {
      this.liveMowedPath = [];
      this.persistedMowedPath = [];
      this.lastTrailPoint = null;
    } else if (this.mowedPathStorageKey !== previousMowedPathStorageKey) {
      this.restoreLiveMowedPath();
    }
    if (options.decodedBoundaryCalibration) {
      this.decodedBoundaryCalibration = options.decodedBoundaryCalibration;
    }
    if (Number.isFinite(Number(options.rotation))) {
      this.view.rotation = Number(options.rotation);
    }
    this.loadImage(this.options.image);
    this.loadRobotImage(this.options.robotImage);
    this.draw();
    this.syncIrrigationAnimation();
  }

  setState(state = {}) {
    this.state = state;
    if (!this.isCloudOnlyMowedPath()) {
      this.restoreCloudMowedPath(state);
      this.updateLiveMowedPath(state);
    }
    this.loadImage(this.options.image);
    this.loadRobotImage(this.options.robotImage);
    this.draw();
    this.syncIrrigationAnimation();
  }

  isCloudOnlyMowedPath() {
    return String(this.options.mowedPathSource || "auto").toLowerCase() === "cloud";
  }

  setCalibration(calibration) {
    this.options.calibration = calibration;
    this.draw();
  }

  setRobotCalibration(robotCalibration) {
    this.options.robotCalibration = robotCalibration;
    this.draw();
  }

  setMowingPathCalibration(mowingPathCalibration) {
    this.options.mowingPathCalibration = mowingPathCalibration;
    this.draw();
  }

  setDecodedBoundaryCalibration(decodedBoundaryCalibration) {
    this.decodedBoundaryCalibration = decodedBoundaryCalibration || {};
    this.options.decodedBoundaryCalibration = this.decodedBoundaryCalibration;
    this.draw();
  }

  resetView() {
    this.view.panX = 0;
    this.view.panY = 0;
    this.view.zoom = 1;
    this.view.rotation = Number(this.options.rotation) || 0;
    this.draw();
  }

  rotate(delta) {
    this.view.rotation += delta;
    this.draw();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.round(rect.width * this.dpr));
    this.canvas.height = Math.max(1, Math.round(rect.height * this.dpr));
    this.draw();
  }

  draw() {
    if (!this.ctx || !this.canvas.width || !this.canvas.height) {
      return;
    }

    const ctx = this.ctx;
    const width = this.canvas.width / this.dpr;
    const height = this.canvas.height / this.dpr;
    const areaDefinition = this.state.area_definition || {};
    const mapSource = {
      ...areaDefinition,
      map_raster: this.state.map_raster,
      map_definition: this.state.map_definition,
      path_definition: this.state.path_definition,
      map_binary_paths: this.state.map_binary_paths,
      path_binary_paths: this.state.path_binary_paths,
    };
    const pose = this.state.pose || {};
    const bounds = this.options.bounds || getWorldBounds(mapSource, pose);
    const baseGeometry = createGeometry({
      width,
      height,
      bounds,
      view: this.view,
      calibration: {},
      aspectRatio: this.image ? this.image.width / this.image.height : undefined,
      fit: this.options.fit,
    });
    const geometry = createGeometry({
      width,
      height,
      bounds,
      view: this.view,
      calibration: this.options.calibration,
      aspectRatio: this.image ? this.image.width / this.image.height : undefined,
      fit: this.options.fit,
    });

    ctx.save();
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    this.drawBackground(ctx, this.image ? baseGeometry : geometry, width, height);
    if (this.options.showZones !== false) {
      this.drawZones(ctx, geometry, getZones(areaDefinition, ["custom_areas", "zones", "customAreas"]), "zone");
    }
    if (this.options.showNoGoZones !== false) {
      this.drawZones(
        ctx,
        geometry,
        getZones(areaDefinition, [
          "forbid_areas",
          "forbidAreas",
          "remote_forbid_areas",
          "remoteForbidAreas",
          "no_go_areas",
          "noGoAreas",
        ]),
        "no-go",
      );
    }
    if (this.options.showLegacyBoundary === true) {
      this.drawBoundary(ctx, geometry, getBoundaryPaths(mapSource));
    }
    this.drawDecodedBoundary(ctx, geometry);
    this.drawMowedPath(ctx, geometry);
    this.drawCharger(ctx, geometry);
    this.drawIrrigationHeads(ctx, baseGeometry);
    this.drawRobot(ctx, geometry, pose);

    ctx.restore();
  }

  clientToMap(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const width = this.canvas.width / this.dpr;
    const height = this.canvas.height / this.dpr;
    const areaDefinition = this.state.area_definition || {};
    const mapSource = { ...areaDefinition, map_raster: this.state.map_raster, map_definition: this.state.map_definition };
    const bounds = this.options.bounds || getWorldBounds(mapSource, this.state.pose || {});
    const geometry = createGeometry({ width, height, bounds, view: this.view, calibration: {}, aspectRatio: this.image ? this.image.width / this.image.height : undefined, fit: this.options.fit });
    return geometry.screenToMap({ x: clientX - rect.left, y: clientY - rect.top });
  }

  drawIrrigationHeads(ctx, geometry) {
    if (!this.options.showIrrigationHeads) return;
    const heads = Array.isArray(this.options.irrigationHeads) ? this.options.irrigationHeads : [];
    const dripLines = Array.isArray(this.options.irrigationDripLines) ? this.options.irrigationDripLines : [];
    const zones = new Map((Array.isArray(this.options.irrigationZones) ? this.options.irrigationZones : []).map((zone) => [Number(zone.id), zone]));
    for (const line of dripLines) {
      const zone = zones.get(Number(line.zone)) || { color: "#38bdf8", active: false };
      if (!zone.active && !this.options.irrigationEditMode) continue;
      const start = geometry.mapToScreen({ x: Number(line.x1), y: Number(line.y1) });
      const end = geometry.mapToScreen({ x: Number(line.x2), y: Number(line.y2) });
      if (![start.x, start.y, end.x, end.y].every(Number.isFinite)) continue;
      const color = zone.color || "#38bdf8";
      const phase = this.irrigationAnimationPhase + Number(line.id || 0) * .29;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(3,10,18,.72)";
      ctx.lineWidth = zone.active ? 9 : 7;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.strokeStyle = colorWithAlpha(color, zone.active ? .95 : .72);
      ctx.lineWidth = zone.active ? 5 : 4;
      ctx.setLineDash(zone.active ? [4, 8] : [8, 6]);
      ctx.lineDashOffset = zone.active ? -phase * 22 : 0;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.setLineDash([]);
      if (zone.active) {
        ctx.strokeStyle = colorWithAlpha("#e0f2fe", .82);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 10]);
        ctx.lineDashOffset = -phase * 30;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (this.options.irrigationEditMode) {
        for (const point of [start, end]) {
          ctx.fillStyle = color;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    for (const head of heads) {
      const zone = zones.get(Number(head.zone)) || { color: "#38bdf8", active: false };
      if (!zone.active && !this.options.irrigationEditMode) continue;
      const point = geometry.mapToScreen({ x: Number(head.x), y: Number(head.y) });
      const mapOrigin = geometry.mapToScreen({ x: 0, y: 0 });
      const mapXAxis = geometry.mapToScreen({ x: 1, y: 0 });
      const mapYAxis = geometry.mapToScreen({ x: 0, y: 1 });
      const mapPixelScale = Math.max(
        Math.hypot(mapXAxis.x - mapOrigin.x, mapXAxis.y - mapOrigin.y),
        Math.hypot(mapYAxis.x - mapOrigin.x, mapYAxis.y - mapOrigin.y),
      );
      const pixelsPerMeter = mapPixelScale * .02245;
      const radius = clamp((Number(head.radius) || 9) * Math.sqrt(Math.max(.4, this.view.zoom)), 6, 30);
      const color = zone.color || "#38bdf8";
      const phase = this.irrigationAnimationPhase + Number(head.id || 0) * 0.37;
      const previewActive = this.options.irrigationEditMode
        && Number(head.id) === Number(this.options.irrigationSelectedHeadId);
      const sprayActive = zone.active || previewActive;
      ctx.save();
      if (sprayActive) {
        const headMapX = Number(head.x);
        const headMapY = Number(head.y);
        const mapAngleToScreen = (angle) => {
          const target = geometry.mapToScreen({
            x: headMapX + Math.cos(angle) * .01,
            y: headMapY + Math.sin(angle) * .01,
          });
          return Math.atan2(target.y - point.y, target.x - point.x);
        };
        const fallbackDirection = Math.atan2(.5 - headMapY, .5 - headMapX);
        const configuredDirection = Number(head.direction_angle ?? head.directionAngle ?? head.heading);
        const mapDirection = Number.isFinite(configuredDirection)
          ? configuredDirection * Math.PI / 180
          : fallbackDirection;
        const configuredSweep = Number(head.sweep_angle ?? head.sweepAngle ?? head.arc);
        const sweep = clamp(Number.isFinite(configuredSweep) ? configuredSweep : 110, 30, 360) * Math.PI / 180;
        const configuredStart = Number(head.start_angle ?? head.startAngle);
        const startMapAngle = Number.isFinite(configuredStart)
          ? configuredStart * Math.PI / 180
          : mapDirection - sweep / 2;
        const pulse = (Math.sin(phase * 3.2) + 1) / 2;
        const spraySetting = Number(head.spray_radius ?? head.sprayRadius ?? head.range);
        const sprayDistance = Number(head.spray_distance ?? head.sprayDistance);
        const sweepSpeed = clamp(Number(head.sweep_speed ?? head.sweepSpeed ?? 1), .2, 3);
        const spray = clamp(
          Number.isFinite(spraySetting)
            ? spraySetting * Math.sqrt(Math.max(.4, this.view.zoom))
            : Number.isFinite(sprayDistance)
              ? sprayDistance * pixelsPerMeter
            : radius * (6.2 + pulse * .55),
          Math.max(4, pixelsPerMeter),
          Math.max(12, mapPixelScale * .5),
        );
        const sweepPosition = (Math.sin(phase * 1.65 * sweepSpeed) + 1) / 2;
        const jetAngle = mapAngleToScreen(startMapAngle + sweep * sweepPosition)
          + (Number(this.options.irrigationDirectionRotationCorrection) || 0);

        ctx.save();
        ctx.strokeStyle = colorWithAlpha("#dff6ff", .84);
        ctx.lineWidth = 1.7;
        ctx.lineCap = "round";
        for (let ray = -2; ray <= 2; ray += 1) {
          const angle = jetAngle + ray * .028;
          const start = radius * 1.12;
          const end = spray * (.78 + (ray + 2) * .035);
          const controlDistance = end * .56;
          ctx.globalAlpha = .38 + (2 - Math.abs(ray)) * .16;
          ctx.beginPath();
          ctx.moveTo(point.x + Math.cos(angle) * start, point.y + Math.sin(angle) * start);
          ctx.quadraticCurveTo(
            point.x + Math.cos(angle) * controlDistance,
            point.y + Math.sin(angle) * controlDistance - spray * .13,
            point.x + Math.cos(angle) * end,
            point.y + Math.sin(angle) * end,
          );
          ctx.stroke();
        }
        ctx.fillStyle = colorWithAlpha("#e7f8ff", .92);
        for (let drop = 0; drop < 26; drop += 1) {
          const angle = jetAngle + Math.sin(drop * 1.91 + phase * 2.1) * .09;
          const travel = ((phase * .48 + drop * .113) % 1) * spray;
          const arcHeight = Math.sin(Math.PI * travel / spray) * spray * .13;
          ctx.globalAlpha = .22 + .66 * (1 - travel / spray);
          ctx.beginPath();
          ctx.arc(
            point.x + Math.cos(angle) * travel,
            point.y + Math.sin(angle) * travel - arcHeight,
            clamp(radius * .13, 1.1, 2.4),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();

      }
      const metal = ctx.createRadialGradient(point.x - radius * .35, point.y - radius * .45, 1, point.x, point.y, radius * 1.18);
      metal.addColorStop(0, "#f8fafc");
      metal.addColorStop(.28, "#94a3b8");
      metal.addColorStop(.72, "#334155");
      metal.addColorStop(1, "#0f172a");
      ctx.fillStyle = metal;
      ctx.strokeStyle = "rgba(255,255,255,.92)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(point.x, point.y, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(point.x, point.y, radius * .68, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = sprayActive ? "#fff" : "#07111c";
      ctx.font = `800 ${Math.max(9, radius)}px system-ui,sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(String(head.zone), point.x, point.y + .4);
      if (this.options.irrigationEditMode) {
        ctx.fillStyle = "#dc2626";
        ctx.beginPath(); ctx.arc(point.x + radius, point.y - radius, Math.max(6, radius * .65), 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillText("×", point.x + radius, point.y - radius);
      }
      ctx.restore();
    }
  }

  syncIrrigationAnimation() {
    const active = this.options.showIrrigationHeads && (
      (this.options.irrigationZones || []).some((zone) => zone.active)
      || (this.options.irrigationEditMode && this.options.irrigationSelectedHeadId != null)
    );
    if (!active) {
      if (this.irrigationAnimationFrame) cancelAnimationFrame(this.irrigationAnimationFrame);
      this.irrigationAnimationFrame = null;
      this.irrigationAnimationLast = 0;
      this.irrigationAnimationPhase = 0;
      return;
    }
    if (this.irrigationAnimationFrame) return;
    const animate = (timestamp) => {
      this.irrigationAnimationFrame = null;
      const stillActive = this.options.showIrrigationHeads && (
        (this.options.irrigationZones || []).some((zone) => zone.active)
        || (this.options.irrigationEditMode && this.options.irrigationSelectedHeadId != null)
      );
      if (!stillActive) {
        this.irrigationAnimationLast = 0;
        this.irrigationAnimationPhase = 0;
        return;
      }
      if (!this.irrigationAnimationLast || timestamp - this.irrigationAnimationLast >= 33) {
        this.irrigationAnimationLast = timestamp;
        this.irrigationAnimationPhase = Date.now() / 1000;
        this.draw();
      }
      this.irrigationAnimationFrame = requestAnimationFrame(animate);
    };
    this.irrigationAnimationFrame = requestAnimationFrame(animate);
  }

  drawMowedPath(ctx, geometry) {
    if (this.options.showMowedPath === false) {
      return;
    }
    // The Anthbot cloud may keep the previous route after mowing has ended.
    // Match the official app and hide that stale trail while the mower is
    // returning to, docked at, or charging on the station.
    if (isDockingOrChargingState(this.state)) {
      return;
    }

    const pathSource = String(this.options.mowedPathSource || "auto").toLowerCase();
    const cloudOnly = pathSource === "cloud";
    const cloudTrail = pathSource === "live" ? [] : extractCloudMowedPathPoints(this.state);
    const baseTrail = cloudOnly
      ? cloudTrail
      : (cloudTrail.length >= 2 ? cloudTrail : this.persistedMowedPath);
    const hasCloudTrail = pathSource !== "live" && baseTrail?.length >= 1;
    const hasLiveTrail = !cloudOnly && this.liveMowedPath?.length >= 1;
    if (!hasCloudTrail && !hasLiveTrail) {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const canvasDiagonal = Math.hypot(rect.width || 0, rect.height || 0);
    const zoomWidthFactor = Math.sqrt(Math.max(0.25, Number(this.view.zoom) || 1));
    const width = clamp(
      (Number(this.options.mowedPathWidth) || 7) * zoomWidthFactor,
      3,
      22,
    );

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = "source-over";

    if (hasCloudTrail) {
      this.drawMowedTrailLayer(ctx, geometry, this.mowedPathDisplayTrail(baseTrail, true), {
        width,
        canvasDiagonal,
        showCoverage: this.options.showMowedCoverage !== false,
      });
    }
    if (hasLiveTrail) {
      this.drawMowedTrailLayer(ctx, geometry, this.liveMowedPath, {
        width,
        canvasDiagonal,
        showCoverage: false,
      });
    }
    ctx.restore();
  }

  drawMowedTrailLayer(ctx, geometry, trail, options = {}) {
    const width = Number(options.width) || 7;
    const segments = buildMowedPathSegments(
      trail,
      (point) => this.mowingPathPositionToScreen(geometry, point),
      Number(options.canvasDiagonal) || 800,
    );
    if (!segments.length) return;

    if (options.showCoverage) {
      const coverageWidth = this.mowedCoverageScreenWidth(geometry, trail);
      if (coverageWidth > width) {
        ctx.strokeStyle = this.options.mowedCoverageColor || COLORS.mowedCoverage;
        ctx.lineWidth = coverageWidth;
        for (const segment of segments) {
          if (segment.length < 2) continue;
          drawScreenSegment(ctx, segment);
          ctx.stroke();
        }
      }
    }

    ctx.strokeStyle = this.options.mowedPathColor || COLORS.mowedPath;
    ctx.lineWidth = width;
    if (segments.length === 1 && segments[0].length === 1) {
      ctx.fillStyle = this.options.mowedPathColor || COLORS.mowedPath;
      ctx.beginPath();
      ctx.arc(segments[0][0].x, segments[0][0].y, width / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    for (const segment of segments) {
      if (segment.length < 2) continue;
      drawScreenSegment(ctx, segment);
      ctx.stroke();
    }
    ctx.strokeStyle = COLORS.mowedPathStroke;
    ctx.lineWidth = Math.max(1.5, width * 0.08);
    for (const segment of segments) {
      if (segment.length < 2) continue;
      drawScreenSegment(ctx, segment);
      ctx.stroke();
    }
  }

  mowedCoverageScreenWidth(geometry, trail) {
    const coverageMm = Number(
      this.options.mowedCoverageWidth ?? this.options.mowed_coverage_width ?? 360,
    );
    if (!Number.isFinite(coverageMm) || coverageMm <= 0) return 0;
    const anchor = (trail || []).find((point) =>
      Number.isFinite(Number(point?.x)) && Number.isFinite(Number(point?.y)),
    ) || this.state.pose;
    if (!anchor) return clamp(coverageMm / 35, 10, 48);
    const a = this.mowingPathPositionToScreen(geometry, anchor);
    const b = this.mowingPathPositionToScreen(geometry, {
      x: Number(anchor.x) + coverageMm,
      y: Number(anchor.y),
    });
    return clamp(Math.hypot(b.x - a.x, b.y - a.y), 10, 64);
  }

  mowedPathDisplayTrail(trail, useCloudScale = false) {
    const scale = Number(
      this.options.mowedPathDisplayScale ??
      this.options.mowed_path_display_scale ??
      (useCloudScale && Number(this.state?.path_coordinate_scale) === 1 ? 10 : 1),
    );
    if (!Number.isFinite(scale) || scale === 1) return trail;
    return (trail || []).map((point) => ({ ...point, x: Number(point.x) * scale, y: Number(point.y) * scale }));
  }

  drawBoundary(ctx, geometry, paths) {
    if (this.options.showBoundary === false || !Array.isArray(paths) || !paths.length) {
      return;
    }

    const color = this.options.boundaryColor || COLORS.boundaryStroke;
    const width = clamp(
      Number(this.options.boundaryWidth) || 3,
      1,
      12,
    );

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const path of paths) {
      if (!Array.isArray(path) || path.length < 2) {
        continue;
      }

      const screenPoints = path.map((point) => geometry.worldToScreen(point));
      ctx.strokeStyle = COLORS.boundaryGlow;
      ctx.lineWidth = width + 4;
      drawPolyline(ctx, screenPoints, true);
      ctx.stroke();

      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      drawPolyline(ctx, screenPoints, true);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawBackground(ctx, geometry, width, height) {
    if (this.options.transparentBackground === true) {
      return;
    }

    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, width, height);

    if (this.image) {
      drawImageOnMap(ctx, geometry, this.image, {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 1, y: 0 },
        bottomLeft: { x: 0, y: 1 },
        dpr: this.dpr,
        smoothing: true,
        stroke: "rgba(255, 255, 255, 0.12)",
      });
      return;
    }

    if (this.drawMapRaster(ctx, geometry)) {
      return;
    }

    this.drawGrid(ctx, geometry);
  }

  drawDecodedBoundary(ctx, geometry) {
    if (this.options.showBoundary === false || this.options.showDecodedBoundary === false) {
      return false;
    }

    const raster = this.state.map_raster;
    const bounds = raster?.bounds;
    if (!raster || !bounds || !Array.isArray(raster.runs)) {
      return false;
    }

    const minX = Number(bounds.min_x ?? bounds.minX);
    const maxX = Number(bounds.max_x ?? bounds.maxX);
    const minY = Number(bounds.min_y ?? bounds.minY);
    const maxY = Number(bounds.max_y ?? bounds.maxY);
    if (![minX, maxX, minY, maxY].every(Number.isFinite)) {
      return false;
    }

    const boundaryGeometry = applyMapCalibration(geometry, this.decodedBoundaryCalibration);
    return this.drawRasterBoundary(ctx, boundaryGeometry, raster, {
      minX,
      maxX,
      minY,
      maxY,
    });
  }

  drawRasterBoundary(ctx, geometry, raster, bounds) {
    const width = Number(raster?.width);
    const height = Number(raster?.height);
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
      return false;
    }

    const pixels = decodeRasterRuns(raster, width, height);
    if (!pixels) {
      return false;
    }

    const stepX = (bounds.maxX - bounds.minX) / width;
    const stepY = (bounds.maxY - bounds.minY) / height;
    if (!Number.isFinite(stepX) || !Number.isFinite(stepY) || stepX === 0 || stepY === 0) {
      return false;
    }

    const isSolid = (x, y) =>
      x >= 0 &&
      x < width &&
      y >= 0 &&
      y < height &&
      pixels[y * width + x] !== 0;
    const toScreen = (x, y) =>
      geometry.worldToScreen({
        x: bounds.minX + x * stepX,
        y: bounds.minY + y * stepY,
      });
    let edgeCount = 0;
    const addEdge = (x1, y1, x2, y2) => {
      const start = toScreen(x1, y1);
      const end = toScreen(x2, y2);
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      edgeCount += 1;
    };

    ctx.save();
    ctx.strokeStyle = this.options.boundaryColor || COLORS.boundaryStroke;
    ctx.lineWidth = clamp(Number(this.options.boundaryWidth) || 3, 1, 12);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (!isSolid(x, y)) {
          continue;
        }
        if (!isSolid(x - 1, y)) addEdge(x, y, x, y + 1);
        if (!isSolid(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
        if (!isSolid(x, y - 1)) addEdge(x, y, x + 1, y);
        if (!isSolid(x, y + 1)) addEdge(x, y + 1, x + 1, y + 1);
      }
    }

    if (edgeCount) {
      ctx.stroke();
    }
    ctx.restore();
    return edgeCount > 0;
  }

  drawMapRaster(ctx, geometry) {
    const raster = this.state.map_raster;
    const bounds = raster?.bounds;
    if (!raster || !bounds || !Array.isArray(raster.runs)) {
      return false;
    }

    const rasterCanvas = this.getRasterCanvas(raster);
    if (!rasterCanvas) {
      return false;
    }

    const minX = Number(bounds.min_x ?? bounds.minX);
    const maxX = Number(bounds.max_x ?? bounds.maxX);
    const minY = Number(bounds.min_y ?? bounds.minY);
    const maxY = Number(bounds.max_y ?? bounds.maxY);
    if (![minX, maxX, minY, maxY].every(Number.isFinite)) {
      return false;
    }

    drawImageFromWorldRect(ctx, geometry, rasterCanvas, {
      minX,
      maxX,
      minY,
      maxY,
      dpr: this.dpr,
      smoothing: false,
    });
    return true;
  }

  getRasterCanvas(raster) {
    const width = Number(raster.width);
    const height = Number(raster.height);
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
      return null;
    }

    const key = `${width}x${height}:${raster.runs.length}:${raster.runs[0]}:${raster.runs[raster.runs.length - 1]}`;
    if (this.rasterCanvas && this.rasterKey === key) {
      return this.rasterCanvas;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const imageData = ctx.createImageData(width, height);
    let pixel = 0;
    for (let index = 0; index < raster.runs.length - 1; index += 2) {
      const value = Number(raster.runs[index]);
      const count = Number(raster.runs[index + 1]);
      if (!Number.isFinite(value) || !Number.isFinite(count) || count <= 0) {
        continue;
      }
      const color = rasterColor(value);
      for (let step = 0; step < count && pixel < width * height; step += 1, pixel += 1) {
        const sourceX = pixel % width;
        const sourceY = Math.floor(pixel / width);
        const target = ((height - 1 - sourceY) * width + sourceX) * 4;
        imageData.data[target] = color[0];
        imageData.data[target + 1] = color[1];
        imageData.data[target + 2] = color[2];
        imageData.data[target + 3] = color[3];
      }
    }
    ctx.putImageData(imageData, 0, 0);

    this.rasterCanvas = canvas;
    this.rasterKey = key;
    return canvas;
  }

  getRasterBoundaryCanvas(raster) {
    const width = Number(raster.width);
    const height = Number(raster.height);
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
      return null;
    }

    const key = `boundary:${width}x${height}:${raster.runs.length}:${raster.runs[0]}:${raster.runs[raster.runs.length - 1]}`;
    if (this.rasterBoundaryCanvas && this.rasterBoundaryKey === key) {
      return this.rasterBoundaryCanvas;
    }

    const pixels = decodeRasterRuns(raster, width, height);
    if (!pixels) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const imageData = ctx.createImageData(width, height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = y * width + x;
        const value = pixels[index];
        const solid = value !== 0;
        const edge =
          solid &&
          (value !== 255 ||
            x === 0 ||
            y === 0 ||
            x === width - 1 ||
            y === height - 1 ||
            pixels[index - 1] === 0 ||
            pixels[index + 1] === 0 ||
            pixels[index - width] === 0 ||
            pixels[index + width] === 0);

        if (!edge) {
          continue;
        }

        const target = ((height - 1 - y) * width + x) * 4;
        imageData.data[target] = 55;
        imageData.data[target + 1] = 95;
        imageData.data[target + 2] = 255;
        imageData.data[target + 3] = value === 255 ? 210 : 245;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    this.rasterBoundaryCanvas = canvas;
    this.rasterBoundaryKey = key;
    return canvas;
  }

  drawGrid(ctx, geometry) {
    ctx.save();
    ctx.translate(geometry.map.centerX, geometry.map.centerY);
    ctx.rotate(geometry.map.rotation);
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;

    for (let step = -0.5; step <= 0.5; step += 0.1) {
      ctx.beginPath();
      ctx.moveTo(step * geometry.map.width, -geometry.map.height / 2);
      ctx.lineTo(step * geometry.map.width, geometry.map.height / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-geometry.map.width / 2, step * geometry.map.height);
      ctx.lineTo(geometry.map.width / 2, step * geometry.map.height);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.strokeRect(-geometry.map.width / 2, -geometry.map.height / 2, geometry.map.width, geometry.map.height);
    ctx.restore();
  }

  drawZones(ctx, geometry, zones, type) {
    const isNoGo = type === "no-go";
    ctx.fillStyle = isNoGo ? COLORS.noGoFill : COLORS.zoneFill;
    ctx.strokeStyle = isNoGo ? COLORS.noGoStroke : COLORS.zoneStroke;
    ctx.lineWidth = 2;

    for (const zone of zones) {
      const points = getZonePoints(zone);
      if (points.length < 2) {
        continue;
      }

      const screenPoints = points.map((point) => geometry.worldToScreen(point));
      ctx.beginPath();
      ctx.moveTo(screenPoints[0].x, screenPoints[0].y);
      for (const point of screenPoints.slice(1)) {
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      if (!isNoGo || this.options.showNoGoLabels !== false) {
        this.drawZoneLabel(ctx, screenPoints, zoneLabel(zone, isNoGo, this.options.noGoLabel));
      }
    }
  }

  drawZoneLabel(ctx, points, label) {
    if (!label || !points.length) {
      return;
    }

    const center = points.reduce(
      (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
      { x: 0, y: 0 },
    );
    center.x /= points.length;
    center.y /= points.length;

    ctx.save();
    ctx.font = "600 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const width = ctx.measureText(label).width + 14;
    ctx.fillStyle = "rgba(12, 18, 24, 0.72)";
    roundRect(ctx, center.x - width / 2, center.y - 13, width, 26, 13);
    ctx.fill();
    ctx.fillStyle = "rgba(232, 255, 237, 0.96)";
    ctx.fillText(label, center.x, center.y);
    ctx.restore();
  }

  drawCharger(ctx, geometry) {
    const charger = this.options.charger;
    if (!charger || !Number.isFinite(Number(charger.x)) || !Number.isFinite(Number(charger.y))) {
      return;
    }

    const point = geometry.mapToScreen({ x: Number(charger.x), y: Number(charger.y) });

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.fillStyle = "rgba(13, 148, 136, 0.92)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("H", 0, 0);
    ctx.restore();
  }

  drawRobot(ctx, geometry, pose) {
    if (!pose || !Number.isFinite(Number(pose.x)) || !Number.isFinite(Number(pose.y))) {
      return;
    }

    const robotCalibration = this.options.robotCalibration || {};
    const point = this.robotPositionToScreen(geometry, pose);
    const mowingHeadingOffset = this.isMowingState()
      ? Number(this.options.robotMowingHeadingOffset ?? this.options.robot_mowing_heading_offset ?? 0) || 0
      : 0;
    const cloudYaw =
      cloudHeadingToCanvasRadians(this.cloudHeadingDegrees(pose)) +
      geometry.map.rotation +
      degreesToRadians(Number(this.options.robotHeadingOffset ?? this.options.robot_heading_offset) || 0) +
      degreesToRadians(mowingHeadingOffset) +
      (Number(robotCalibration.rotation) || 0);
    const headingSource = String(this.options.robotHeadingSource || "cloud").toLowerCase();
    const movementYaw =
      headingSource === "movement" || headingSource === "auto"
        ? this.movementHeading(geometry)
        : null;
    this.cloudHeading =
      this.cloudHeading === null ? cloudYaw : smoothAngle(this.cloudHeading, cloudYaw, 0.45);
    const yaw = headingSource === "movement"
      ? movementYaw ?? this.cloudHeading
      : headingSource === "cloud"
        ? this.cloudHeading
        : movementYaw ?? this.cloudHeading;

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(yaw);
    if (this.robotImage) {
      const size = clamp(
        (Number(this.options.robotSize) || 42) *
          (Number(robotCalibration.scaleX) || 1) *
          (Number(this.view.zoom) || 1),
        8,
        260,
      );
      const aspect = this.robotImage.width / this.robotImage.height || 1;
      const imageRotation =
        this.options.robotImageRotation === undefined
          ? Math.PI / 2
          : degreesToRadians(Number(this.options.robotImageRotation) || 0);

      ctx.rotate(imageRotation);
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.drawImage(this.robotImage, (-size * aspect) / 2, -size / 2, size * aspect, size);
      ctx.restore();
      return;
    }

    const radius = clamp(9 * (Number(this.view.zoom) || 1), 4, 64);
    ctx.fillStyle = COLORS.robot;
    ctx.strokeStyle = COLORS.robotStroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(radius + 5, 0);
    ctx.lineTo(-radius, -radius * 0.75);
    ctx.lineTo(-radius * 0.55, 0);
    ctx.lineTo(-radius, radius * 0.75);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  loadImage(url) {
    if (!url || url === this.imageUrl) {
      return;
    }

    this.imageUrl = url;
    this.image = null;
    const image = new Image();
    image.onload = () => {
      this.image = image;
      this.draw();
    };
    image.src = url;
  }

  loadRobotImage(url) {
    if (!url) {
      this.robotImageUrl = null;
      this.robotImage = null;
      return;
    }
    if (url === this.robotImageUrl) {
      return;
    }

    this.robotImageUrl = url;
    this.robotImage = null;
    const image = new Image();
    image.onload = () => {
      this.robotImage = image;
      this.draw();
    };
    image.src = url;
  }

  updateLiveMowedPath(state = {}) {
    const pose = state.pose || {};
    if (!Number.isFinite(Number(pose.x)) || !Number.isFinite(Number(pose.y))) {
      return;
    }

    const point = { x: Number(pose.x), y: Number(pose.y) };
    if (!isLiveMowingState(state) && !this.shouldTrackLiveMovementFallback(state, point)) {
      return;
    }
    if (!this.lastTrailPoint) {
      this.liveMowedPath.push(point);
      this.lastTrailPoint = point;
      this.saveLiveMowedPath();
      return;
    }

    if (this.lastTrailPoint) {
      const distance = Math.hypot(point.x - this.lastTrailPoint.x, point.y - this.lastTrailPoint.y);
      if (distance < 1) {
        return;
      }
    }

    this.liveMowedPath.push(point);
    this.lastTrailPoint = point;
    if (this.liveMowedPath.length > 3000) {
      this.liveMowedPath.splice(0, this.liveMowedPath.length - 3000);
    }
    this.saveLiveMowedPath();
  }

  shouldTrackLiveMovementFallback(state = {}, point) {
    if (isDockingOrChargingStateValue(state?.mower_status) || isDockingOrChargingStateValue(state?.robot_status_raw)) {
      return false;
    }
    if (state?.history_path_live_refresh === true || state?.path_time || state?.path_id || Number(state?.path_point_count) > 0) {
      return true;
    }
    if (!this.lastTrailPoint) return false;
    return Math.hypot(point.x - this.lastTrailPoint.x, point.y - this.lastTrailPoint.y) >= 1;
  }

  restoreCloudMowedPath(state = {}) {
    const cloud = extractCloudMowedPathPoints(state);
    if (cloud.length >= 2) this.rememberMowedPath(cloud);
  }

  restoreLiveMowedPath() {
    this.persistedMowedPath = [];
    this.lastTrailPoint = null;
    if (!this.mowedPathStorageKey) return;
    try {
      const stored = JSON.parse(window.localStorage.getItem(this.mowedPathStorageKey) || "null");
      const points = normalizePathPoints(Array.isArray(stored) ? stored : stored?.points);
      this.persistedMowedPath = points.slice(-5000);
      this.lastTrailPoint = this.persistedMowedPath[this.persistedMowedPath.length - 1] || null;
    } catch (error) {
      console.warn("Garden map mowed path restore failed", error);
    }
  }

  saveLiveMowedPath() {
    this.rememberMowedPath(mergeCloudAndLivePaths(this.persistedMowedPath, this.liveMowedPath));
  }

  rememberMowedPath(points) {
    if (!this.mowedPathStorageKey) return;
    const normalized = normalizePathPoints(points).slice(-5000);
    if (!normalized.length) return;
    const last = normalized[normalized.length - 1];
    const signature = `${normalized.length}:${Math.round(Number(last.x) * 10)}:${Math.round(Number(last.y) * 10)}`;
    if (signature === this.lastSavedMowedPathSignature) return;
    this.persistedMowedPath = normalized;
    this.lastSavedMowedPathSignature = signature;
    try {
      window.localStorage.setItem(this.mowedPathStorageKey, JSON.stringify({ savedAt: Date.now(), points: normalized }));
    } catch (error) {
      console.warn("Garden map mowed path save failed", error);
    }
  }

  movementHeading(geometry) {
    const trail = this.liveMowedPath;
    if (!trail || trail.length < 2) {
      return null;
    }

    const last = this.mowingPathPositionToScreen(geometry, trail[trail.length - 1]);
    const previous = this.mowingPathPositionToScreen(geometry, trail[trail.length - 2]);
    const dx = last.x - previous.x;
    const dy = last.y - previous.y;
    if (Math.hypot(dx, dy) < 6) {
      return this.robotHeading;
    }

    const nextHeading = Math.atan2(dy, dx);
    this.robotHeading =
      this.robotHeading === null ? nextHeading : smoothAngle(this.robotHeading, nextHeading, 0.35);
    return this.robotHeading;
  }

  cloudHeadingDegrees(pose) {
    const headingCandidates = [
      this.state.raw_pose?.heading,
      pose?.heading,
      this.state.cur_pose?.heading,
      this.state.curPose?.heading,
      this.state.map_scan_pose?.heading,
      this.state.mapScanPose?.heading,
    ];
    for (const value of headingCandidates) {
      const heading = Number(value);
      if (Number.isFinite(heading)) {
        return normalizeHeadingDegrees(heading);
      }
    }

    const yawCandidates = [
      this.state.raw_pose?.yaw,
      pose?.yaw,
      this.state.cur_pose?.yaw,
      this.state.curPose?.yaw,
      this.state.map_scan_pose?.yaw,
      this.state.mapScanPose?.yaw,
    ];
    for (const value of yawCandidates) {
      const yaw = Number(value);
      if (Number.isFinite(yaw)) {
        return milliRadiansToDegrees(yaw);
      }
    }
    return 0;
  }

  robotPositionToScreen(geometry, point) {
    const robotCalibration = this.options.robotCalibration || {};
    const mapPoint = geometry.worldToMap({ x: Number(point.x), y: Number(point.y) });
    return geometry.mapToScreenWithLayerCalibration(mapPoint, {
      offsetX: Number(robotCalibration.offsetX) || 0,
      offsetY: Number(robotCalibration.offsetY) || 0,
    });
  }

  mowingPathPositionToScreen(geometry, point) {
    const mowingPathCalibration = this.options.mowingPathCalibration || {};
    const mapPoint = geometry.worldToMap({ x: Number(point.x), y: Number(point.y) });
    return geometry.mapToScreenWithLayerCalibration(mapPoint, mowingPathCalibration);
  }

  isMowingState() {
    const status = String(this.state.mower_status || "").toLowerCase();
    return [
      "mowing",
      "working",
      "cutting",
      "edge_cutting",
      "zone_mowing",
      "zonemowing",
      "nyiras",
      "nyĂ­rĂˇs",
      "nyir",
      "nyĂ­r",
      "munka",
      "vagas",
      "vĂˇgĂˇs",
    ].some((item) => status.includes(item));
  }

  onPointerDown(event) {
    this.canvas.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size >= 2) {
      this.startPinch();
      this.drag = null;
      return;
    }
    this.drag = {
      x: event.clientX,
      y: event.clientY,
      panX: this.view.panX,
      panY: this.view.panY,
    };
  }

  onPointerMove(event) {
    if (this.pointers.has(event.pointerId)) {
      this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (this.pinch && this.pointers.size >= 2) {
      const [first, second] = [...this.pointers.values()];
      const distance = Math.max(1, Math.hypot(second.x - first.x, second.y - first.y));
      const midpoint = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      const factor = distance / this.pinch.distance;
      const zoom = clamp(this.pinch.zoom * factor, 0.2, 8);
      const appliedFactor = zoom / this.pinch.zoom;
      const rect = this.canvas.getBoundingClientRect();
      const startLocal = {
        x: this.pinch.midpoint.x - rect.left,
        y: this.pinch.midpoint.y - rect.top,
      };
      const currentLocal = { x: midpoint.x - rect.left, y: midpoint.y - rect.top };
      const startCenter = {
        x: rect.width / 2 + this.pinch.panX,
        y: rect.height / 2 + this.pinch.panY,
      };
      this.view.zoom = zoom;
      this.view.panX = currentLocal.x + (startCenter.x - startLocal.x) * appliedFactor - rect.width / 2;
      this.view.panY = currentLocal.y + (startCenter.y - startLocal.y) * appliedFactor - rect.height / 2;
      this.draw();
      return;
    }
    if (!this.drag) {
      return;
    }

    this.view.panX = this.drag.panX + event.clientX - this.drag.x;
    this.view.panY = this.drag.panY + event.clientY - this.drag.y;
    this.draw();
  }

  onPointerUp(event) {
    if (this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    this.pointers.delete(event.pointerId);
    this.pinch = null;
    if (this.pointers.size === 1) {
      const [remaining] = this.pointers.values();
      this.drag = {
        x: remaining.x,
        y: remaining.y,
        panX: this.view.panX,
        panY: this.view.panY,
      };
    } else {
      this.drag = null;
    }
  }

  startPinch() {
    const [first, second] = [...this.pointers.values()];
    this.pinch = {
      distance: Math.max(1, Math.hypot(second.x - first.x, second.y - first.y)),
      midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
      zoom: this.view.zoom,
      panX: this.view.panX,
      panY: this.view.panY,
    };
  }

  onWheel(event) {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.1 : 0.9;
    this.view.zoom = clamp(this.view.zoom * factor, 0.2, 8);
    this.draw();
  }
}

function fitAspect(sourceWidth, sourceHeight, maxWidth, maxHeight) {
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);
  return {
    width: sourceWidth * scale,
    height: sourceHeight * scale,
  };
}

function rotateAround(point, center, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = point.x - center.x;
  const dy = point.y - center.y;

  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Anthbot's cloud heading uses the opposite horizontal axis from the canvas:
// up/down already match, while left/right must be mirrored.
export function cloudHeadingToCanvasRadians(value) {
  return normalizeAngle(degreesToRadians(180 - normalizeHeadingDegrees(value)));
}

function milliRadiansToDegrees(value) {
  return (Number(value) * 180) / (Math.PI * 1000);
}

function normalizeHeadingDegrees(value) {
  const heading = Number(value) || 0;
  return Math.abs(heading) > 360 ? heading / 100 : heading;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function colorWithAlpha(color, alpha) {
  const value = String(color || "#38bdf8").trim();
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const number = parseInt(hex[1], 16);
    return `rgba(${(number >> 16) & 255},${(number >> 8) & 255},${number & 255},${alpha})`;
  }
  const short = value.match(/^#([0-9a-f]{3})$/i);
  if (short) {
    const digits = short[1].split("").map((digit) => parseInt(digit + digit, 16));
    return `rgba(${digits[0]},${digits[1]},${digits[2]},${alpha})`;
  }
  return value;
}

function normalizeAngle(angle) {
  while (angle > Math.PI) {
    angle -= Math.PI * 2;
  }
  while (angle < -Math.PI) {
    angle += Math.PI * 2;
  }
  return angle;
}

function smoothAngle(current, next, amount) {
  return current + normalizeAngle(next - current) * amount;
}

function drawPolyline(ctx, points, close = false) {
  if (!points.length) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) {
    ctx.lineTo(point.x, point.y);
  }
  if (close) {
    ctx.closePath();
  }
}

function drawImageOnMap(ctx, geometry, source, options = {}) {
  const topLeft = geometry.mapToScreen(options.topLeft);
  const topRight = geometry.mapToScreen(options.topRight);
  const bottomLeft = geometry.mapToScreen(options.bottomLeft);
  drawImageToScreenRect(ctx, source, topLeft, topRight, bottomLeft, options);
}

function drawImageFromWorldRect(ctx, geometry, source, options = {}) {
  const topLeft = geometry.worldToScreen({ x: options.minX, y: options.maxY });
  const topRight = geometry.worldToScreen({ x: options.maxX, y: options.maxY });
  const bottomLeft = geometry.worldToScreen({ x: options.minX, y: options.minY });
  drawImageToScreenRect(ctx, source, topLeft, topRight, bottomLeft, options);
}

function drawImageToScreenRect(ctx, source, topLeft, topRight, bottomLeft, options = {}) {
  const sourceWidth = Number(source.width) || 1;
  const sourceHeight = Number(source.height) || 1;
  const dpr = Number(options.dpr) || 1;
  const a = (topRight.x - topLeft.x) / sourceWidth;
  const b = (topRight.y - topLeft.y) / sourceWidth;
  const c = (bottomLeft.x - topLeft.x) / sourceHeight;
  const d = (bottomLeft.y - topLeft.y) / sourceHeight;

  ctx.save();
  ctx.imageSmoothingEnabled = options.smoothing !== false;
  ctx.setTransform(a * dpr, b * dpr, c * dpr, d * dpr, topLeft.x * dpr, topLeft.y * dpr);
  ctx.drawImage(source, 0, 0);
  if (options.stroke) {
    ctx.strokeStyle = options.stroke;
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, sourceWidth, sourceHeight);
  }
  ctx.restore();
}

function extractPathPoints(value) {
  const direct = normalizePathPoints(value);
  if (direct.length) {
    return direct;
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => extractPathPoints(item));
  }

  if (value && typeof value === "object") {
    if (Number.isFinite(Number(value.x)) && Number.isFinite(Number(value.y))) {
      return [normalizePathPoint(value)];
    }

    for (const key of ["points", "path", "track", "tracks", "trajectory", "mowed_path", "mowedPath"]) {
      const points = extractPathPoints(value[key]);
      if (points.length) {
        return points;
      }
    }
  }

  return [];
}

function normalizePathPoints(value) {
  if (!Array.isArray(value)) return [];
  return value.map(normalizePathPoint).filter(Boolean);
}

function normalizePathPoint(value) {
  if (Array.isArray(value) && value.length >= 2) {
    return { x: Number(value[0]), y: Number(value[1]) };
  }
  if (!value || typeof value !== "object") return null;
  const point = { x: Number(value.x ?? value.lng ?? value.lon), y: Number(value.y ?? value.lat) };
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
  if (value.type !== undefined) point.type = Number(value.type);
  if (value.clean_time !== undefined) point.clean_time = Number(value.clean_time);
  if (value.break_before === true) point.break_before = true;
  return point;
}

function buildMowedPathSegments(points, toScreen, canvasDiagonal) {
  const segments = [];
  let segment = [];
  let previous = null;
  const jumpLimit = Math.max(45, Math.min(180, (Number(canvasDiagonal) || 800) * 0.12));
  for (const point of points || []) {
    const pointType = Number(point?.type);
    const cleanTime = Number(point?.clean_time ?? point?.cleanTime ?? point?.cleanedCode);
    const isMowedPoint = point?.type === undefined || [1, 2, 5, 8].includes(pointType) || (Number.isFinite(cleanTime) && cleanTime > 0);
    if (!isMowedPoint) {
      if (segment.length) segments.push(segment);
      segment = [];
      previous = null;
      continue;
    }
    const screen = toScreen(point);
    if (!screen || !Number.isFinite(screen.x) || !Number.isFinite(screen.y)) continue;
    const jumped = previous && Math.hypot(screen.x - previous.x, screen.y - previous.y) > jumpLimit;
    if (point.break_before || jumped) {
      if (segment.length) segments.push(segment);
      segment = [];
    }
    segment.push(screen);
    previous = screen;
  }
  if (segment.length) segments.push(segment);
  return segments;
}

function drawScreenSegment(ctx, segment) {
  ctx.beginPath();
  ctx.moveTo(segment[0].x, segment[0].y);
  for (const point of segment.slice(1)) ctx.lineTo(point.x, point.y);
}

function extractCloudMowedPathPoints(state = {}) {
  const candidates = [
    state.mowed_path, state.mowedPath, state.cloud_path, state.cloudPath,
    state.history_path_info, state.historyPathInfo, state.his_path, state.HisPath,
    state.record_path, state.RecordPath, state.path_definition, state.path_binary_paths,
    state.mowing_path, state.mowingPath, state.track, state.tracks, state.trajectory, state.path,
  ];
  for (const candidate of candidates) {
    const points = extractPathPoints(candidate);
    if (points.length >= 2) return points;
  }
  return [];
}

function mergeCloudAndLivePaths(cloudPath, livePath) {
  if (!cloudPath?.length) return livePath || [];
  if (!livePath?.length) return cloudPath;
  const merged = [...cloudPath];
  let startIndex = 0;
  for (let index = livePath.length - 1; index >= 0; index -= 1) {
    if (pointDistance(merged[merged.length - 1], livePath[index]) < 1) {
      startIndex = index + 1;
      break;
    }
  }
  let firstLive = startIndex === 0;
  for (const point of livePath.slice(startIndex)) {
    if (pointDistance(merged[merged.length - 1], point) >= 1) {
      merged.push(firstLive ? { ...point, break_before: true } : point);
      firstLive = false;
    }
  }
  return merged;
}

function pointDistance(a, b) {
  if (!a || !b) return Number.POSITIVE_INFINITY;
  return Math.hypot(Number(a.x) - Number(b.x), Number(a.y) - Number(b.y));
}

function isDockingOrChargingStateValue(value) {
  const normalized = String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "");
  return ["charging", "charge", "docking", "returning", "returntodock", "goinghome", "homing", "idle", "standby"].includes(normalized);
}

function isDockingOrChargingState(state = {}) {
  return (
    state?.charging === true ||
    String(state?.charging || "").toLowerCase() === "on" ||
    isDockingOrChargingStateValue(state?.mower_status) ||
    isDockingOrChargingStateValue(state?.robot_status_raw) ||
    isDockingOrChargingStateValue(state?.robot_sta)
  );
}

function isLiveMowingState(state = {}) {
  const values = [state.mower_status, state.robot_status_raw, state.robot_sta];
  return values.some((value) => {
    const normalized = String(value || "").trim().toLowerCase().replace(/[\s_-]+/g, "");
    return ["mowing", "working", "cutting", "zonemowing", "edgemowing", "bordercutting"].includes(normalized);
  });
}

function rasterColor(value) {
  if (value === 255) {
    return [248, 250, 252, 255];
  }
  if (value === 160) {
    return [158, 166, 174, 255];
  }
  if (value === 128) {
    return [117, 125, 133, 255];
  }
  if (value === 0) {
    return [25, 32, 42, 255];
  }

  const shade = clamp(Number(value) || 0, 0, 255);
  return [shade, shade, shade, 255];
}

function applyMapCalibration(geometry, calibration = {}) {
  return {
    worldToScreen(point) {
      const mapPoint = geometry.worldToMap(point);
      return geometry.mapToScreenWithLayerCalibration(mapPoint, calibration);
    },
  };
}

function decodeRasterRuns(raster, width, height) {
  if (!Array.isArray(raster?.runs)) {
    return null;
  }

  const pixels = new Uint8Array(width * height);
  let offset = 0;
  for (let index = 0; index < raster.runs.length - 1; index += 2) {
    const value = clamp(Number(raster.runs[index]) || 0, 0, 255);
    const count = Number(raster.runs[index + 1]);
    if (!Number.isFinite(count) || count <= 0) {
      continue;
    }
    pixels.fill(value, offset, Math.min(width * height, offset + count));
    offset += count;
    if (offset >= width * height) {
      break;
    }
  }
  return pixels;
}

function zoneLabel(zone, isNoGo, noGoLabel = "No-go") {
  if (isNoGo) {
    const name = String(zone?.name || zone?.label || "").trim();
    return name && !/^zone\s*\d+$/i.test(name) ? name : noGoLabel;
  }

  const name = String(zone?.name || zone?.label || "").trim();
  if (name) {
    return name;
  }

  return zone?.id === undefined || zone?.id === null ? "Zone" : `Zone ${zone.id}`;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
