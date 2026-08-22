import "./irrigation-map-card.js?v=159.1";
import { translate as translateAnthbot } from "./garden-anthbot-i18n.js?v=166";

const EDGE_I18N = {
  en:{edgeSettings:"Edge settings",edgeSettingsHint:"Cutting height and boundary overlap",cuttingHeightMm:"Cutting height (mm)",edgeOverlapCm:"Edge overlap (cm)",save:"Save",saving:"Saving…",edgeSaved:"Edge settings saved",edge:"Edge",overlapPreview:"Overlap preview"},
  hu:{edgeSettings:"Szegély beállításai",edgeSettingsHint:"Vágási magasság és szegélyátfedés",cuttingHeightMm:"Vágási magasság (mm)",edgeOverlapCm:"Szegélyátfedés (cm)",save:"Mentés",saving:"Mentés…",edgeSaved:"Szegélybeállítások elmentve",edge:"Szegély",overlapPreview:"Átfedés előnézete"},
  de:{edgeSettings:"Kanteneinstellungen",edgeSettingsHint:"Schnitthöhe und Kantenüberlappung",cuttingHeightMm:"Schnitthöhe (mm)",edgeOverlapCm:"Kantenüberlappung (cm)",save:"Speichern",saving:"Speichern…",edgeSaved:"Kanteneinstellungen gespeichert",edge:"Kante",overlapPreview:"Überlappungsvorschau"},
  fr:{edgeSettings:"Réglages de bordure",edgeSettingsHint:"Hauteur de coupe et chevauchement",cuttingHeightMm:"Hauteur de coupe (mm)",edgeOverlapCm:"Chevauchement de bordure (cm)",save:"Enregistrer",saving:"Enregistrement…",edgeSaved:"Réglages de bordure enregistrés",edge:"Bordure",overlapPreview:"Aperçu du chevauchement"},
  es:{edgeSettings:"Ajustes del borde",edgeSettingsHint:"Altura de corte y solapamiento",cuttingHeightMm:"Altura de corte (mm)",edgeOverlapCm:"Solapamiento del borde (cm)",save:"Guardar",saving:"Guardando…",edgeSaved:"Ajustes del borde guardados",edge:"Borde",overlapPreview:"Vista previa del solapamiento"},
  it:{edgeSettings:"Impostazioni bordo",edgeSettingsHint:"Altezza di taglio e sovrapposizione",cuttingHeightMm:"Altezza di taglio (mm)",edgeOverlapCm:"Sovrapposizione bordo (cm)",save:"Salva",saving:"Salvataggio…",edgeSaved:"Impostazioni bordo salvate",edge:"Bordo",overlapPreview:"Anteprima sovrapposizione"},
  pt:{edgeSettings:"Definições da borda",edgeSettingsHint:"Altura de corte e sobreposição",cuttingHeightMm:"Altura de corte (mm)",edgeOverlapCm:"Sobreposição da borda (cm)",save:"Guardar",saving:"A guardar…",edgeSaved:"Definições da borda guardadas",edge:"Borda",overlapPreview:"Pré-visualização da sobreposição"},
  nl:{edgeSettings:"Randinstellingen",edgeSettingsHint:"Maaihoogte en randoverlap",cuttingHeightMm:"Maaihoogte (mm)",edgeOverlapCm:"Randoverlap (cm)",save:"Opslaan",saving:"Opslaan…",edgeSaved:"Randinstellingen opgeslagen",edge:"Rand",overlapPreview:"Voorbeeld overlap"},
  pl:{edgeSettings:"Ustawienia krawędzi",edgeSettingsHint:"Wysokość koszenia i nakładanie",cuttingHeightMm:"Wysokość koszenia (mm)",edgeOverlapCm:"Nakładanie na krawędź (cm)",save:"Zapisz",saving:"Zapisywanie…",edgeSaved:"Zapisano ustawienia krawędzi",edge:"Krawędź",overlapPreview:"Podgląd nakładania"},
  cs:{edgeSettings:"Nastavení okraje",edgeSettingsHint:"Výška sečení a překrytí okraje",cuttingHeightMm:"Výška sečení (mm)",edgeOverlapCm:"Překrytí okraje (cm)",save:"Uložit",saving:"Ukládání…",edgeSaved:"Nastavení okraje uloženo",edge:"Okraj",overlapPreview:"Náhled překrytí"},
  sk:{edgeSettings:"Nastavenia okraja",edgeSettingsHint:"Výška kosenia a prekrytie okraja",cuttingHeightMm:"Výška kosenia (mm)",edgeOverlapCm:"Prekrytie okraja (cm)",save:"Uložiť",saving:"Ukladanie…",edgeSaved:"Nastavenia okraja uložené",edge:"Okraj",overlapPreview:"Náhľad prekrytia"},
  ro:{edgeSettings:"Setări margine",edgeSettingsHint:"Înălțime de tundere și suprapunere",cuttingHeightMm:"Înălțime de tundere (mm)",edgeOverlapCm:"Suprapunere margine (cm)",save:"Salvează",saving:"Se salvează…",edgeSaved:"Setările marginii au fost salvate",edge:"Margine",overlapPreview:"Previzualizare suprapunere"},
  da:{edgeSettings:"Kantindstillinger",edgeSettingsHint:"Klippehøjde og kantoverlap",cuttingHeightMm:"Klippehøjde (mm)",edgeOverlapCm:"Kantoverlap (cm)",save:"Gem",saving:"Gemmer…",edgeSaved:"Kantindstillinger gemt",edge:"Kant",overlapPreview:"Forhåndsvisning af overlap"},
  sv:{edgeSettings:"Kantinställningar",edgeSettingsHint:"Klipphöjd och kantöverlappning",cuttingHeightMm:"Klipphöjd (mm)",edgeOverlapCm:"Kantöverlappning (cm)",save:"Spara",saving:"Sparar…",edgeSaved:"Kantinställningar sparade",edge:"Kant",overlapPreview:"Förhandsvisning av överlappning"},
  no:{edgeSettings:"Kantinnstillinger",edgeSettingsHint:"Klippehøyde og kantoverlapping",cuttingHeightMm:"Klippehøyde (mm)",edgeOverlapCm:"Kantoverlapping (cm)",save:"Lagre",saving:"Lagrer…",edgeSaved:"Kantinnstillinger lagret",edge:"Kant",overlapPreview:"Forhåndsvisning av overlapping"},
  fi:{edgeSettings:"Reuna-asetukset",edgeSettingsHint:"Leikkuukorkeus ja reunan limitys",cuttingHeightMm:"Leikkuukorkeus (mm)",edgeOverlapCm:"Reunan limitys (cm)",save:"Tallenna",saving:"Tallennetaan…",edgeSaved:"Reuna-asetukset tallennettu",edge:"Reuna",overlapPreview:"Limityksen esikatselu"},
  "zh-CN":{edgeSettings:"边缘设置",edgeSettingsHint:"割草高度和边缘重叠",cuttingHeightMm:"割草高度（毫米）",edgeOverlapCm:"边缘重叠（厘米）",save:"保存",saving:"正在保存…",edgeSaved:"边缘设置已保存",edge:"边缘",overlapPreview:"重叠预览"},
  "zh-TW":{edgeSettings:"邊緣設定",edgeSettingsHint:"割草高度和邊緣重疊",cuttingHeightMm:"割草高度（毫米）",edgeOverlapCm:"邊緣重疊（公分）",save:"儲存",saving:"正在儲存…",edgeSaved:"邊緣設定已儲存",edge:"邊緣",overlapPreview:"重疊預覽"},
  tr:{edgeSettings:"Kenar ayarları",edgeSettingsHint:"Kesme yüksekliği ve kenar bindirmesi",cuttingHeightMm:"Kesme yüksekliği (mm)",edgeOverlapCm:"Kenar bindirmesi (cm)",save:"Kaydet",saving:"Kaydediliyor…",edgeSaved:"Kenar ayarları kaydedildi",edge:"Kenar",overlapPreview:"Bindirme önizlemesi"},
  th:{edgeSettings:"การตั้งค่าขอบ",edgeSettingsHint:"ความสูงการตัดและระยะซ้อนขอบ",cuttingHeightMm:"ความสูงการตัด (มม.)",edgeOverlapCm:"ระยะซ้อนขอบ (ซม.)",save:"บันทึก",saving:"กำลังบันทึก…",edgeSaved:"บันทึกการตั้งค่าขอบแล้ว",edge:"ขอบ",overlapPreview:"ตัวอย่างระยะซ้อน"},
  vi:{edgeSettings:"Cài đặt mép",edgeSettingsHint:"Chiều cao cắt và độ chồng mép",cuttingHeightMm:"Chiều cao cắt (mm)",edgeOverlapCm:"Độ chồng mép (cm)",save:"Lưu",saving:"Đang lưu…",edgeSaved:"Đã lưu cài đặt mép",edge:"Mép",overlapPreview:"Xem trước độ chồng"},
  ko:{edgeSettings:"가장자리 설정",edgeSettingsHint:"절단 높이 및 가장자리 겹침",cuttingHeightMm:"절단 높이 (mm)",edgeOverlapCm:"가장자리 겹침 (cm)",save:"저장",saving:"저장 중…",edgeSaved:"가장자리 설정 저장됨",edge:"가장자리",overlapPreview:"겹침 미리보기"},
  km:{edgeSettings:"ការកំណត់គែម",edgeSettingsHint:"កម្ពស់កាត់ និងការជាន់គែម",cuttingHeightMm:"កម្ពស់កាត់ (មម)",edgeOverlapCm:"ការជាន់គែម (សម)",save:"រក្សាទុក",saving:"កំពុងរក្សាទុក…",edgeSaved:"បានរក្សាទុកការកំណត់គែម",edge:"គែម",overlapPreview:"មើលការជាន់ជាមុន"},
};
const t = (card, key) => EDGE_I18N[card.language || "en"]?.[key] || EDGE_I18N.en[key] || translateAnthbot(card.language || "en", key);
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);

function init(card) {
  card.selectedMowingTarget ||= { type: "full" };
  card.mowingZoneGroupsOpen ||= {};
  if (card.mowingZoneGroupsOpen["zone-set"] === undefined) card.mowingZoneGroupsOpen["zone-set"] = true;
  if (card.mowingZoneGroupsOpen["auto-zone-set"] === undefined) card.mowingZoneGroupsOpen["auto-zone-set"] = false;
  card.panelInteractionUntil ||= 0;
}

function autoZones(card, area = card.entity?.attributes?.area_definition || {}) {
  for (const key of ["region_areas", "regionAreas", "auto_regions", "auto_zones"]) {
    if (Array.isArray(area?.[key])) return area[key];
  }
  const direct = card.entity?.attributes?.auto_zones;
  return Array.isArray(direct) ? direct : [];
}

function ridableAreas(card) {
  const states=card._hass?.states||{};
  const configuredId=card.config?.entity;
  const activeId=typeof card.activeEntityId==="function"?card.activeEntityId():card.activeMapEntityId;
  const sources=[card.entity,states[configuredId],states[activeId]];
  const configuredBase=String(configuredId||"").replace(/^sensor\./,"").replace(/_map(?:_\d+)?$/,"");
  for(const [entityId,state] of Object.entries(states))if(entityId.startsWith(`sensor.${configuredBase}_map`)&&state?.attributes?.ridable_areas)sources.push(state);
  for(const source of sources){
    const attrs=source?.attributes||{};
    let edges=Array.isArray(attrs.ridable_areas)?attrs.ridable_areas:[];
    const area=attrs.area_definition||{};
    if(!edges.length)for(const key of ["ridable_areas","ridableAreas"])if(Array.isArray(area?.[key])){edges=area[key];break;}
    const valid=edges.filter((edge)=>edge&&Number.isFinite(Number(edge.id)));
    if(valid.length)return valid;
  }
  return [];
}

function choiceRow(values, selected, onSelect) {
  const row = document.createElement("div"); row.className = "edge-choice-row";
  values.forEach((value) => { const button=document.createElement("button");button.type="button";button.textContent=String(value).padStart(value<10?2:1,"0");button.className=value===selected?"active":"";button.addEventListener("click",()=>{row.querySelectorAll("button").forEach((item)=>item.classList.toggle("active",item===button));onSelect(value);});row.appendChild(button); });
  return row;
}

function edgePreview(card, distance) {
  const preview=document.createElement("div");preview.className="edge-visual";preview.setAttribute("aria-label",t(card,"overlapPreview"));
  preview.innerHTML=`<svg viewBox="0 0 720 330" role="img"><defs><linearGradient id="grass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#91b83d"/><stop offset="1" stop-color="#4c7d24"/></linearGradient><pattern id="paving" width="46" height="30" patternUnits="userSpaceOnUse"><rect width="46" height="30" fill="#d9dde2"/><path d="M0 29.5h46M23 0v30" stroke="#bbc1c8" stroke-width="1"/></pattern><filter id="robotShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-opacity=".38"/></filter><marker id="measureArrowStart" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M8 0 0 4 8 8z" fill="#fff"/></marker><marker id="measureArrowEnd" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="#fff"/></marker></defs><path d="M0 0h720v330H0z" fill="url(#paving)"/><path d="M150 0h570v330H330z" fill="url(#grass)"/><path class="edge-overlap-band" d="M150 0h80l180 330h-80z" fill="rgba(99,224,112,.44)"/><path d="M150 0l180 330" stroke="#fff" stroke-width="3"/><g class="edge-robot-art" filter="url(#robotShadow)"></g><g class="edge-measure"><line x1="261" y1="203" x2="240" y2="215" stroke="#fff" stroke-width="4" marker-start="url(#measureArrowStart)" marker-end="url(#measureArrowEnd)"/><text x="240" y="242" text-anchor="middle" fill="#d5ffad" font-size="25" font-weight="800">${distance} cm</text></g></svg>`;
  const robotGroup=preview.querySelector(".edge-robot-art");
  const robotUrl=card.config?.robot_image||card.config?.robotImage||card.rendererOptions?.()?.robotImage||card.renderer?.options?.robotImage||card.renderer?.robotImageUrl||card.renderer?.robotImage?.src;
  if(robotUrl){const image=document.createElementNS("http://www.w3.org/2000/svg","image");image.setAttribute("href",robotUrl);image.setAttribute("x","250");image.setAttribute("y","63");image.setAttribute("width","145");image.setAttribute("height","210");image.setAttribute("preserveAspectRatio","xMidYMid meet");image.setAttribute("transform","rotate(-29 322 168)");robotGroup.appendChild(image);}else{robotGroup.innerHTML=`<g transform="translate(257 98) rotate(-29 78 60)"><rect x="0" y="10" rx="28" width="155" height="108" fill="#f3f5f6" stroke="#252d35" stroke-width="6"/><rect x="45" y="0" rx="14" width="70" height="35" fill="#202832"/><rect x="62" y="45" rx="7" width="36" height="21" fill="#e76b35"/><circle cx="22" cy="110" r="21" fill="#232a31"/><circle cx="133" cy="110" r="21" fill="#232a31"/></g>`;}
  let robotX=0,robotY=0;
  const update=(value,animate=true)=>{const pixelsPerCm=4.8,outX=-.877,outY=.48,measureX=261,measureY=203,length=value*pixelsPerCm,endX=measureX+outX*length,endY=measureY+outY*length;const line=preview.querySelector(".edge-measure line"),label=preview.querySelector(".edge-measure text");line.setAttribute("x2",endX);line.setAttribute("y2",endY);label.textContent=`${value} cm`;label.setAttribute("x",endX);label.setAttribute("y",Math.min(318,endY+27));const nextX=outX*length,nextY=outY*length;if(animate&&robotGroup.animate)robotGroup.animate([{transform:`translate(${robotX}px, ${robotY}px)`},{transform:`translate(${nextX}px, ${nextY}px)`}],{duration:420,easing:"cubic-bezier(.2,.8,.2,1)"});robotGroup.setAttribute("transform",`translate(${nextX} ${nextY})`);robotX=nextX;robotY=nextY;};update(distance,false);preview.updateDistance=update;return preview;
}

function openEdgeModal(card, edge) {
  card.shadowRoot.querySelector(".edge-settings-backdrop")?.remove();
  let height=[30,40,50,60,70].includes(Number(edge.cutter_height))?Number(edge.cutter_height):50;
  let distance=[5,7,10,13,15,17,20].includes(Number(edge.ride_distance))?Number(edge.ride_distance):10;
  const backdrop=document.createElement("div");backdrop.className="edge-settings-backdrop";backdrop.dataset.edgeId=String(edge.id);
  const modal=document.createElement("div");modal.className="edge-settings-modal";
  modal.innerHTML=`<div class="edge-modal-head"><strong>${esc(t(card,"edgeSettings"))}</strong><button type="button" class="edge-close" aria-label="${esc(t(card,"close"))}">×</button></div><label>${esc(t(card,"cuttingHeightMm"))}</label><div class="edge-height-slot"></div><label>${esc(t(card,"edgeOverlapCm"))}</label><div class="edge-preview-slot"></div><div class="edge-distance-slot"></div><button type="button" class="edge-save">${esc(t(card,"save"))}</button>`;
  const preview=edgePreview(card,distance);
  modal.querySelector(".edge-height-slot").appendChild(choiceRow([30,40,50,60,70],height,(value)=>{height=value;}));
  modal.querySelector(".edge-preview-slot").appendChild(preview);
  modal.querySelector(".edge-distance-slot").appendChild(choiceRow([5,7,10,13,15,17,20],distance,(value)=>{distance=value;preview.updateDistance(value);}));
  const close=()=>backdrop.remove();modal.querySelector(".edge-close").addEventListener("click",close);backdrop.addEventListener("click",(event)=>{if(event.target===backdrop)close();});
  modal.querySelector(".edge-save").addEventListener("click",async(event)=>{const button=event.currentTarget;button.disabled=true;button.textContent=t(card,"saving");try{await card._hass.callService("anthbot_map","set_edge_settings",{entity_id:card.config.entity,edge_id:Number(edge.id),mow_height:height,ride_distance:distance});card.notify(t(card,"edgeSaved"));close();card.scheduleRefresh();}catch(error){button.disabled=false;button.textContent=t(card,"save");card.notify(`${t(card,"settingFailed")}: ${error?.message||error}`);}});
  backdrop.appendChild(modal);card.shadowRoot.appendChild(backdrop);
  modal.scrollTop=0;requestAnimationFrame(()=>{modal.scrollTop=0;});
}

function section(card, title, key, open = false) {
  const details = document.createElement("details");
  details.className = "settings-section";
  details.open = open;
  details.innerHTML = `<summary>${esc(title)}</summary><div class="settings-section-body"></div>`;
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    card.shadowRoot.querySelectorAll("details.settings-section").forEach((item) => {
      if (item !== details) item.open = false;
    });
  });
  return details;
}

function zoneGroup(card, type, title, zones, body) {
  const selected = card.selectedMowingTarget?.type === type ? card.selectedMowingTarget.zones || [] : [];
  const details = section(card, `${title} · ${selected.length} ${t(card, "selectedCount")}`, type);
  details.classList.add("mowing-zone-group");
  details.open = Boolean(card.mowingZoneGroupsOpen[type]);
  details.addEventListener("toggle", () => { card.mowingZoneGroupsOpen[type] = details.open; });
  const content = details.querySelector(".settings-section-body");
  const grid = card.createPanelGrid();
  zones.forEach((zone) => {
    const tile = document.createElement("button");
    tile.type = "button";
    const active = selected.some((item) => String(item.id) === String(zone.id));
    tile.className = `panel-tile mowing-target-tile ${active ? "active" : ""}`;
    tile.innerHTML = `<strong>${esc(zone.name || `${type === "auto-zone-set" ? t(card, "autoZone") : t(card, "zone")} ${zone.id}`)}</strong><span>${t(card, "selectMowingTarget")}</span>`;
    tile.addEventListener("click", (event) => {
      event.preventDefault(); event.stopPropagation();
      const current = card.selectedMowingTarget?.type === type ? [...(card.selectedMowingTarget.zones || [])] : [];
      const index = current.findIndex((item) => String(item.id) === String(zone.id));
      if (index >= 0) current.splice(index, 1); else current.push(zone);
      card.selectedMowingTarget = current.length ? { type, zones: current } : { type: "full" };
      card.renderControlPanel(body);
    });
    grid.appendChild(tile);
  });
  content.appendChild(grid);
  if (selected.length) {
    const order = document.createElement("div");
    order.className = "mowing-order";
    order.innerHTML = `<div class="mowing-order-title">${t(card, "mowingOrder")}</div>`;
    selected.forEach((zone, index) => {
      const row = document.createElement("div");
      row.className = "mowing-order-row";
      row.innerHTML = `<strong>${index + 1}.</strong><span>${esc(zone.name || `${t(card, "zone")} ${zone.id}`)}</span>`;
      for (const [symbol, offset, label] of [["↑", -1, "moveUp"], ["↓", 1, "moveDown"]]) {
        const button = document.createElement("button");
        button.type = "button"; button.textContent = symbol; button.title = t(card, label);
        button.disabled = index + offset < 0 || index + offset >= selected.length;
        button.addEventListener("click", () => {
          const next = [...card.selectedMowingTarget.zones];
          [next[index], next[index + offset]] = [next[index + offset], next[index]];
          card.selectedMowingTarget = { type, zones: next };
          card.renderControlPanel(body);
        });
        row.appendChild(button);
      }
      order.appendChild(row);
    });
    content.appendChild(order);
  }
  return details;
}

function maintenanceValue(card, kind) {
  const raw = card.entity?.attributes?.maintenance || {};
  const keys = { blade:["rc_pecent","rc_percent"], camera:["cl_pecent","cl_percent"], contact:["ccp_pecent","ccp_percent"] }[kind];
  const value = keys.map((key) => raw[key]).find((item) => item != null && item !== "");
  return Number.isFinite(Number(value)) ? `${Math.round(Number(value))}%` : t(card, "maintenanceUnavailable");
}

function maintenanceTile(card, title, kind, reset, command) {
  const tile = document.createElement("div");
  tile.className = "panel-tile maintenance-tile";
  tile.innerHTML = `<strong>${title}</strong><span>${t(card, "remainingLife")}</span><span class="maintenance-value">${maintenanceValue(card, kind)}</span>`;
  const button = document.createElement("button");
  button.type = "button"; button.className = `maintenance-reset ${command}`; button.textContent = reset;
  button.addEventListener("click", () => card.handleCommand(command));
  tile.appendChild(button);
  return tile;
}

function findZoneEntity(card, domain, kind, zone, labels) {
  const zoneTokens = [zone.id, zone.name].filter((v) => v != null).map((v) => String(v).toLowerCase());
  const kindTokens = kind === "auto" ? ["auto zone", "automatic zone"] : ["zone"];
  return Object.entries(card._hass?.states || {}).find(([id, state]) => {
    if (!id.startsWith(`${domain}.`) || state.state === "unavailable") return false;
    const name = `${id} ${state.attributes?.friendly_name || ""}`.toLowerCase();
    return kindTokens.some((v) => name.includes(v)) && zoneTokens.some((v) => name.includes(v)) && labels.some((v) => name.includes(v));
  })?.[0] || null;
}

function directNumber(card, label, entityId, min, max, step, unit) {
  const value = Number(entityId ? card._hass.states[entityId]?.state : NaN);
  const tile = document.createElement("div"); tile.className="panel-tile control-tile";
  tile.innerHTML=`<div class="control-head"><span>${label}</span><strong>${Number.isFinite(value)?value:"-"} ${unit}</strong></div><input type="range" min="${min}" max="${max}" step="${step}" value="${Number.isFinite(value)?value:min}" ${entityId?"":"disabled"}>`;
  const input=tile.querySelector("input"); input.addEventListener("input",()=>tile.querySelector("strong").textContent=`${input.value} ${unit}`);
  input.addEventListener("change",async()=>{await card._hass.callService("number","set_value",{entity_id:entityId,value:Number(input.value)});card.scheduleRefresh();});
  return tile;
}

function directSwitch(card, label, entityId) {
  const checked=entityId && card._hass.states[entityId]?.state==="on";
  const tile=document.createElement("label");tile.className="panel-tile switch-tile";
  tile.innerHTML=`<span>${label}</span><input type="checkbox" ${checked?"checked":""} ${entityId?"":"disabled"}>`;
  const input=tile.querySelector("input");input.addEventListener("change",async()=>{await card._hass.callService("switch",input.checked?"turn_on":"turn_off",{entity_id:entityId});card.scheduleRefresh();});
  return tile;
}

function obstacle(card, switchId, levelId) {
  const enabled=switchId && card._hass.states[switchId]?.state==="on";
  const tile=document.createElement("div");tile.className=`panel-tile obstacle-combined ${enabled?"":"disabled"}`;
  const row=document.createElement("label");row.className="switch-tile";row.innerHTML=`<span>${t(card,"visualObstacle")}</span><input type="checkbox" ${enabled?"checked":""} ${switchId?"":"disabled"}>`;
  const levels=document.createElement("div");levels.className="obstacle-levels";levels.style.cssText="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:10px";
  const selected=Math.max(0,Math.min(2,Math.round(Number(levelId?card._hass.states[levelId]?.state:1))));
  ["low","medium","high"].forEach((key,index)=>{const b=document.createElement("button");b.type="button";b.textContent=t(card,key);b.className=`height-option ${index===selected?"active":""}`;b.disabled=!levelId;b.addEventListener("click",async()=>{levels.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));await card._hass.callService("number","set_value",{entity_id:levelId,value:index});card.scheduleRefresh();});levels.appendChild(b);});
  const input=row.querySelector("input");input.addEventListener("change",async()=>{await card._hass.callService("switch",input.checked?"turn_on":"turn_off",{entity_id:switchId});levels.style.display=input.checked?"grid":"none";card.scheduleRefresh();});
  levels.style.display=enabled?"grid":"none";tile.append(row,levels);return tile;
}

function enhanceGardenAnthbot(Card) {
  const p = Card.prototype;
  const originalHassDescriptor = Object.getOwnPropertyDescriptor(p, "hass");
  const originalRender = p.render;
  const originalHandleCommand = p.handleCommand;
  const originalUpdateRenderer = p.updateRenderer;
  const originalCommandLabel = p.commandLabel;
  const originalCommandIsConfirmed = p.commandIsConfirmed;
  const originalGetControlEntity = p.getControlEntity;

  // Use the same numbered-entity resolver as Anthbot Map beta45. Garden's
  // legacy resolver only tried the unnumbered and `_2` variants directly,
  // while an existing installation commonly exposes these controls as `_3`.
  p.findEntity = function(domain, suffixes) {
    const base = this.entityBase();
    for (const suffix of suffixes) {
      const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`^${domain}\\.${escapedBase}_${escapedSuffix}(?:_(\\d+))?$`);
      const matches = Object.entries(this._hass?.states || {})
        .map(([entityId, state]) => ({entityId, state, match: entityId.match(pattern)}))
        .filter(({state, match}) => match && state.state !== "unavailable")
        .sort((left, right) => Number(right.match?.[1] || 1) - Number(left.match?.[1] || 1));
      if (matches.length) return matches[0].entityId;
    }
    for (const suffix of suffixes) {
      const wanted = `${base}_${suffix}`.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
      const suffixSlug = String(suffix).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
      for (const [entityId, state] of Object.entries(this._hass?.states || {})) {
        if (!entityId.startsWith(`${domain}.`) || state.state === "unavailable") continue;
        const entitySlug = entityId.slice(domain.length + 1).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
        const friendlySlug = String(state.attributes?.friendly_name || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
        if (entitySlug === wanted || entitySlug.replace(/_\d+$/, "") === wanted || entitySlug.endsWith(`_${suffixSlug}`) || friendlySlug.includes(suffixSlug)) return entityId;
      }
    }
    return null;
  };

  p.render = function() {
    init(this);
    originalRender.call(this);
    // The control panel below replaces Garden's legacy duplicated map dock.
    this.shadowRoot?.querySelector(".command-dock")?.remove();
    const tabs = this.shadowRoot?.querySelector(".panel-tabs");
    if (tabs && !tabs.querySelector('[data-panel="maintenance"]')) {
      const button = document.createElement("button");
      button.type = "button"; button.dataset.panel = "maintenance"; button.textContent = t(this, "maintenance");
      button.addEventListener("click", () => this.setPanel("maintenance"));
      tabs.appendChild(button);
    }
    if (!this.shadowRoot?.querySelector("style[data-anthbot-enhancements]")) {
      const style = document.createElement("style");
      style.dataset.anthbotEnhancements = "";
      style.textContent = `
        .mowing-target-tile{border:1px solid rgba(255,255,255,.15)!important;transition:none!important}
        .mowing-target-tile:hover{background:var(--anthbot-secondary-background)!important}
        .mowing-target-tile.active,.mowing-target-tile.active:hover{background:linear-gradient(145deg,#31bf62,#249c4d)!important;border-color:#72efa0!important;color:#fff!important}
        .mowing-target-tile.active span{color:#fff!important}.mowing-zone-group{margin:10px 0}
        .settings-section{margin:10px 0;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(7,15,23,.22);overflow:hidden}
        .settings-section>summary{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;cursor:pointer;font-weight:800;list-style:none;color:#fff!important}
        .settings-section>summary::after{content:"⌄";display:block;margin-left:12px;color:#fff;transition:transform .15s ease}
        .settings-section[open]>summary::after{transform:rotate(180deg)}
        .settings-section-body{padding:0 10px 12px}.mowing-order{display:grid;gap:7px;margin-top:10px}.mowing-order-title{font-weight:800}
        .mowing-order-row{display:grid;grid-template-columns:32px 1fr 42px 42px;align-items:center;gap:7px;padding:7px 9px;border-radius:11px;background:rgba(255,255,255,.08)}
        .mowing-order-row button{min-height:36px;justify-content:center}.task-action-tile.start,.task-action-tile.resume{background:linear-gradient(145deg,#31bf62,#249c4d)!important}.task-action-tile.pause{background:linear-gradient(145deg,#f0a829,#d77f16)!important}
        .maintenance-tile{display:flex;flex-direction:column;align-items:stretch;gap:10px}.maintenance-value{font-size:22px!important;font-weight:900;color:#55e58a!important}.maintenance-reset{min-height:42px;font-weight:800}
        .garden-glass-panel>.garden-glass-head{top:0!important}
        .garden-glass-panel>.system-switch{position:sticky;top:45px;z-index:4;background:rgba(9,18,27,.86)!important;backdrop-filter:blur(10px)}
        .garden-glass-panel>.system-switch button{color:#fff!important}
        .edge-settings-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.58);backdrop-filter:blur(8px)}
        .edge-settings-modal{width:min(680px,100%);max-height:calc(100dvh - 32px);overflow:auto;box-sizing:border-box;padding:20px;border:1px solid rgba(255,255,255,.18);border-radius:24px;background:linear-gradient(145deg,rgba(18,27,34,.98),rgba(10,17,23,.98));box-shadow:0 24px 70px rgba(0,0,0,.52);color:#fff}
        .edge-modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;font-size:25px}.edge-close{width:44px;height:44px;border:1px solid rgba(255,255,255,.16);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:28px;cursor:pointer}.edge-settings-modal>label{display:block;margin:17px 0 9px;font-size:18px;font-weight:800}
        .edge-choice-row{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:14px;background:rgba(255,255,255,.05)}.edge-height-slot .edge-choice-row{grid-template-columns:repeat(5,minmax(0,1fr))}.edge-choice-row button{min-width:0;min-height:52px;border:0;border-right:1px solid rgba(255,255,255,.10);background:transparent;color:#cbd1d5;font:inherit;font-weight:800;cursor:pointer}.edge-choice-row button:last-child{border-right:0}.edge-choice-row button.active{background:linear-gradient(145deg,#62ce55,#399d3b);color:#fff}
        .edge-visual{overflow:hidden;border-radius:17px;border:1px solid rgba(255,255,255,.14);background:#5d872d}.edge-visual svg{display:block;width:100%;height:auto}.edge-robot-art{transform-box:fill-box;transform-origin:center;transition:transform .42s cubic-bezier(.2,.8,.2,1)}.edge-save{width:100%;min-height:56px;margin-top:20px;border:0;border-radius:15px;background:linear-gradient(145deg,#31bf62,#249c4d);color:#fff;font:inherit;font-size:20px;font-weight:900;cursor:pointer}.edge-save:disabled{opacity:.65}
        .edge-settings-tile{cursor:pointer;text-align:left}.edge-settings-tile strong,.edge-settings-tile span{display:block}.edge-settings-tile span{margin-top:6px;color:rgba(255,255,255,.68)}
        @media(max-width:600px){.edge-settings-backdrop{padding:8px;align-items:end}.edge-settings-modal{padding:16px;border-radius:22px 22px 12px 12px;max-height:calc(100dvh - 12px)}.edge-modal-head{font-size:22px}.edge-choice-row button{min-height:46px;font-size:14px}.edge-visual{max-height:34vh}.edge-visual svg{height:34vh;object-fit:cover}.edge-settings-modal>label{font-size:16px}}
      `;
      this.shadowRoot.appendChild(style);
    }
    const body = this.shadowRoot?.querySelector('[data-role="panel-body"]');
    body?.addEventListener("pointerdown", () => { this.panelInteractionUntil = Date.now() + 1200; }, true);
  };

  p.renderAppPanel = function() {
    init(this);
    const body = this.shadowRoot.querySelector('[data-role="panel-body"]');
    if (!body || !this._hass) return;
    // The normal three-second Garden refresh must not recreate an open panel:
    // doing so closes native <details> elements and loses their interaction state.
    if (this.gardenAnthbotBackgroundRefresh && body.childElementCount) return;
    this.shadowRoot.querySelectorAll("button[data-panel]").forEach((button) => button.classList.toggle("active", button.dataset.panel === this.activePanel));
    if (this.activePanel === "maintenance") this.renderMaintenancePanel(body);
    else if (this.activePanel === "settings") this.renderSettingsPanel(body);
    else if (this.activePanel === "interface") this.renderInterfacePanel(body);
    else if (this.activePanel === "status") this.renderStatusPanel(body);
    else if (this.activePanel === "diagnostics") this.renderDiagnosticsPanel(body);
    else this.renderControlPanel(body);
  };

  p.renderControlPanel = function(body) {
    init(this); body.innerHTML = "";
    const targets = this.createPanelGrid();
    const target = (type, title) => {
      const tile = document.createElement("button"); tile.type = "button";
      tile.className = `panel-tile mowing-target-tile ${this.selectedMowingTarget?.type === type ? "active" : ""}`;
      tile.innerHTML = `<strong>${title}</strong><span>${t(this, "selectMowingTarget")}</span>`;
      tile.addEventListener("click", () => { this.selectedMowingTarget = {type}; this.renderControlPanel(body); });
      return tile;
    };
    targets.append(target("full", t(this,"fullArea")), target("edge", t(this,"commandOuterEdge")), target("dock-edge", t(this,"dockEdgeLabel")));
    body.appendChild(targets);
    const manual = this.currentZones(); if (manual.length) body.appendChild(zoneGroup(this,"zone-set",t(this,"manualZones"),manual,body));
    const automatic = autoZones(this); if (automatic.length) body.appendChild(zoneGroup(this,"auto-zone-set",t(this,"autoZones"),automatic,body));
    const action = this.primaryMowingAction();
    const actions = this.createPanelGrid();
    actions.append(this.createPrimaryMowingTile(action), this.createCommandTile(t(this,"stopLabel"),t(this,"stopSub"),"stop"), this.createCommandTile(t(this,"homeLabel"),t(this,"homeSub"),"dock"));
    body.appendChild(actions);
  };

  p.primaryMowingAction = function() {
    const values = this.commandStatusValues();
    if (values.some((v) => ["paused","pause","szunetel","szuneteltetve"].some((x) => v.includes(x)))) return this.entity?.attributes?.last_mowing_task?.type ? "resume" : "start";
    if (values.some((v) => ["mowing","globalmowing","zonemowing","regionmowing","working","cutting","nyiras","funyiras"].some((x) => v.includes(x)))) return "pause";
    return "start";
  };
  p.createPrimaryMowingTile = function(action) {
    const labels = {start:[t(this,"startLabel"),t(this,"startSelectedTask")],pause:[t(this,"pauseTask"),t(this,"pauseTaskSub")],resume:[t(this,"resumeTask"),t(this,"resumeTaskSub")]};
    const tile = document.createElement("button"); tile.type="button"; tile.dataset.primaryMowingAction=action; tile.className=`panel-tile task-action-tile ${action}`;
    tile.innerHTML=`<strong>${labels[action][0]}</strong><span>${labels[action][1]}</span>`;
    tile.addEventListener("click",()=>this.handlePrimaryMowingAction(action)); return tile;
  };
  p.handlePrimaryMowingAction = async function(action) {
    if (["pause","resume"].includes(action)) return this.handleCommand(action);
    const selected=this.selectedMowingTarget;
    if (selected?.type==="zone-set" && selected.zones?.length) {
      if (selected.zones.length===1) return this.startZone(selected.zones[0]);
      return this.startZones(selected.zones);
    }
    if (selected?.type==="auto-zone-set" && selected.zones?.length) {
      if (selected.zones.length===1 && typeof this.startAutoZone==="function") return this.startAutoZone(selected.zones[0]);
      return this.startAutoZones(selected.zones);
    }
    if (selected?.type==="edge") return this.handleCommand("outer-edge");
    if (selected?.type==="dock-edge") return this.handleCommand("dock-edge");
    return this.handleCommand("start");
  };
  p.startZones = function(zones) { return this.callAnthbotService("start_zone_mow", {zones:zones.map((z)=>z.id??z.name)}); };
  p.startAutoZone = function(zone) { return this.callAnthbotService("start_auto_zone_mow", {auto_zones:String(zone.id??zone.name)}); };
  p.startAutoZones = function(zones) { return this.callAnthbotService("start_auto_zone_mow", {auto_zones:zones.map((z)=>z.id??z.name)}); };

  // Match Anthbot Map beta45: command button entities take precedence over
  // direct service calls for pause, resume and maintenance operations.
  p.getControlEntity = function(command) {
    const existing = originalGetControlEntity.call(this, command);
    if (existing) return existing;
    const suffixes = {
      pause: ["pause_mow"],
      resume: ["resume_mow"],
      "reset-blade": ["reset_blade_maintenance"],
      "reset-camera": ["reset_camera_maintenance"],
      "reset-contact": ["reset_dock_contact_maintenance"],
    }[command];
    return suffixes ? this.findEntity("button", suffixes) : null;
  };

  p.handleCommand = async function(command) {
    const services={pause:"pause_mow",resume:"resume_mow","reset-blade":"reset_blade_maintenance","reset-camera":"reset_camera_maintenance","reset-contact":"reset_dock_contact_maintenance"};
    if (!services[command]) return originalHandleCommand.call(this,command);
    if (command.startsWith("reset-") && !window.confirm(t(this,"resetCounterWarning"))) return;
    const customAction = this.config.button_actions?.[command] || this.config.buttonActions?.[command];
    if (customAction) return this.callCustomButtonAction(command, customAction);
    const buttonEntity = this.getControlEntity(command);
    if (buttonEntity) return this.executeAnthbotButton(buttonEntity, services[command], this.commandLabel(services[command]));
    return this.callAnthbotService(services[command]);
  };

  p.commandLabel = function(service) {
    const labels = {
      start_auto_zone_mow: t(this,"autoZones"),
      pause_mow: t(this,"pauseTask"),
      resume_mow: t(this,"resumeTask"),
      reset_blade_maintenance: t(this,"resetBlade"),
      reset_camera_maintenance: t(this,"resetCamera"),
      reset_dock_contact_maintenance: t(this,"resetDockContact")
    };
    return labels[service] || originalCommandLabel.call(this,service);
  };

  p.commandIsConfirmed = function(service) {
    const expected = {
      pause_mow:["paused","pause","szunetel","szunet"],
      resume_mow:["mowing","globalmowing","zonemowing","regionmowing","working","cutting","nyiras","funyiras"],
      start_auto_zone_mow:["mowing","zonemowing","regionmowing","working","cutting","nyiras","funyiras"]
    }[service];
    if (expected) return this.commandStatusValues().some((status)=>expected.some((value)=>status.includes(value)));
    return originalCommandIsConfirmed.call(this,service);
  };

  p.renderMaintenancePanel = function(body) {
    body.innerHTML=""; const grid=this.createPanelGrid();
    grid.append(maintenanceTile(this,t(this,"bladeMaintenance"),"blade",t(this,"resetBlade"),"reset-blade"),maintenanceTile(this,t(this,"cameraMaintenance"),"camera",t(this,"resetCamera"),"reset-camera"),maintenanceTile(this,t(this,"dockContactMaintenance"),"contact",t(this,"resetDockContact"),"reset-contact")); body.appendChild(grid);
  };
  p.renderSettingsPanel = function(body) {
    body.innerHTML="";
    const global=section(this,t(this,"globalSettings"),"global",true);const grid=this.createPanelGrid();
    grid.append(this.createCommandTile(t(this,"cloud"),t(this,"cloudSub"),"connect"),this.createMowHeightControl(),this.createNumberControl(t(this,"mowCount"),"mowCount",1,3,1,"×"),obstacle(this,this.getSwitchEntity("visualObstacle"),this.getNumberEntity("visualObstacleLevel")),this.createNumberControl(t(this,"customDirection"),"mowDirection",0,180,1,"deg"),this.createNumberControl(t(this,"rainDelay"),"rainContinue",0,8,1,"h"),this.createNumberControl(t(this,"volume"),"voiceVolume",0,100,1,"%"),this.createSwitchControl(t(this,"rainDetection"),"rain"),this.createSwitchControl(t(this,"customCutDirection"),"customDirection"),this.createSwitchControl(t(this,"edgeReturn"),"edgeReturn"),this.createSwitchControl(t(this,"autoDockMow"),"autoDockMow"));
    global.querySelector(".settings-section-body").appendChild(grid);body.appendChild(global);
    const edges=ridableAreas(this);
    if(edges.length){const edgeSection=section(this,t(this,"edgeSettings"),"edges");const edgeGrid=this.createPanelGrid();edges.forEach((edge,index)=>{const tile=document.createElement("button");tile.type="button";tile.className="panel-tile edge-settings-tile";const edgeName=edges.length===1?t(this,"edge"):(edge.name||`${t(this,"edge")} ${index+1}`);tile.innerHTML=`<strong>${esc(edgeName)}</strong><span>${esc(t(this,"edgeSettingsHint"))}</span>`;tile.addEventListener("click",()=>openEdgeModal(this,edge));edgeGrid.appendChild(tile);});edgeSection.querySelector(".settings-section-body").appendChild(edgeGrid);body.appendChild(edgeSection);}
    for (const [kind,title,zones] of [["manual",t(this,"manualZones"),this.currentZones()],["auto",t(this,"autoZones"),autoZones(this)]]) {
      if (!zones.length) continue; const group=section(this,title,kind);const content=group.querySelector(".settings-section-body");
      zones.forEach((zone)=>{const item=document.createElement("details");item.className="settings-section";item.innerHTML=`<summary>${esc(zone.name||`${t(this,"zone")} ${zone.id}`)}</summary><div class="settings-section-body"></div>`;const zg=this.createPanelGrid();
        const number=(labels)=>findZoneEntity(this,"number",kind,zone,labels),sw=(labels)=>findZoneEntity(this,"switch",kind,zone,labels);
        zg.append(directNumber(this,t(this,"mowCount"),number(["mowing passes","mow count"]),1,3,1,"×"),directNumber(this,t(this,"cutHeight"),number(["cutting height","mow height"]),30,70,5,"mm"),obstacle(this,sw(["visual obstacle"]),number(["obstacle sensitivity","visual obstacle level"])),directSwitch(this,t(this,"edgeCutting"),sw(["edge cutting","edge cut"])),directSwitch(this,t(this,"customCutDirection"),sw(["custom mowing direction"])),directNumber(this,t(this,"customDirection"),number(["mowing direction"]),0,180,1,"deg"));item.querySelector(".settings-section-body").appendChild(zg);content.appendChild(item);});
      body.appendChild(group);
    }
  };
  p.renderDiagnosticsPanel = function(body) {
    body.innerHTML=""; const grid=this.createPanelGrid();
    [[t(this,"bladeLife"),"cuttingComponentsLife"],[t(this,"cameraLife"),"cuttingLineLife"],[t(this,"dockContact"),"rechargeContactLife"],["WiFi","wifi"],["Bluetooth","bluetooth"],[t(this,"firmware"),"firmware"],[t(this,"gpsLatitude"),"gpsLatitude"],[t(this,"gpsLongitude"),"gpsLongitude"],[t(this,"lastUpdate"),"shadowUpdated"]].forEach(([label,key])=>grid.appendChild(this.createInfoTile(label,key)));
    body.appendChild(grid); const attrs=this.entity?.attributes||{};
    const recordsPayload=attrs.mowing_records||{data:[]};
    const recordsError=attrs.mowing_records_error;
    const history=this.createSettingsSection(t(this,"mowingHistory"),"mowing-history");
    this.renderMowingHistoryList(history.querySelector(".settings-section-body"),recordsPayload,recordsError);
    body.appendChild(history);
    const errors=this.createSettingsSection(t(this,"errorHistory"),"error-history");
    errors.querySelector(".settings-section-body").innerHTML=`<pre>${esc(JSON.stringify(attrs.error_history||[],null,2))}</pre>`;
    body.appendChild(errors);
  };

  p.updateRenderer = function() {
    if (Date.now() < (this.panelInteractionUntil||0)) return;
    this.gardenAnthbotBackgroundRefresh = true;
    let result;
    try {
      result = originalUpdateRenderer.call(this);
    } finally {
      this.gardenAnthbotBackgroundRefresh = false;
    }
    // Keep the open zone folds intact, but refresh the state-driven primary
    // action independently: Start -> Pause -> Resume -> Start.
    const current = this.shadowRoot?.querySelector(".task-action-tile");
    if (current) {
      const action = this.primaryMowingAction();
      if (!current.classList.contains(action)) current.replaceWith(this.createPrimaryMowingTile(action));
    }
    return result;
  };

  if (originalHassDescriptor?.set) {
    Object.defineProperty(p, "hass", {
      configurable: originalHassDescriptor.configurable,
      enumerable: originalHassDescriptor.enumerable,
      get: originalHassDescriptor.get || function() { return this._hass; },
      set: function(hass) {
        originalHassDescriptor.set.call(this, hass);
        const attrs = this._hass?.states?.[this.config?.entity]?.attributes || this.entity?.attributes || {};
        const signature = JSON.stringify([
          attrs.ridable_area_time ?? null,
          ridableAreas(this),
        ]);
        const previous = this.gardenEdgeStateSignature;
        this.gardenEdgeStateSignature = signature;
        if (previous === undefined || previous === signature) return;

        const openModal = this.shadowRoot?.querySelector(".edge-settings-backdrop");
        if (openModal) {
          const edgeId = openModal.dataset.edgeId;
          const edge = ridableAreas(this).find((item) => String(item.id) === edgeId);
          if (edge) openEdgeModal(this, edge);
          else openModal.remove();
          return;
        }
        if (this.activePanel === "settings") {
          const body = this.shadowRoot?.querySelector('[data-role="panel-body"]');
          if (body) this.renderSettingsPanel(body);
        }
      },
    });
  }
}
import { AnthbotMapRenderer } from "./garden-renderer.js?v=159";
import { getZones, getZonePoints, createGeometry, getWorldBounds, getBoundaryPaths } from "./garden-geometry.js?v=3";
import { LANGUAGES, resolveLanguage, translate } from "./garden-i18n.js?v=133";
import {
  adjustCalibration,
  cardToYaml,
  readCalibration,
  readDecodedBoundaryCalibration,
  readMowingPathCalibration,
  readRobotCalibration,
  resetCalibration,
} from "./garden-calibration.js?v=132";
import GARDEN_STYLES from "./garden-styles.css";
import ROBOT_IMAGE from "./robot.png";

const GARDEN_CARD_TAG = globalThis.__gardenMapCardRegistrationTag || "garden-map-card";
delete globalThis.__gardenMapCardRegistrationTag;
delete globalThis.__gardenMapCardBuildLabel;

const escapeHtml = esc;

const ENTITY_MAP = {
  battery: ["sensor", ["battery_level"]],
  status: ["sensor", ["mower_status"]],
  charging: ["binary_sensor", ["charging"]],
  connection: ["binary_sensor", ["connection"]],
  cuttingHeight: ["sensor", ["cutting_height"]],
  mowingArea: ["sensor", ["mowing_area_session", "mowing_area"]],
  mowingTime: ["sensor", ["mowing_time_session", "mowing_time"]],
  rtkFix: ["sensor", ["rtk_fix_state"]],
  totalArea: ["sensor", ["total_mapped_area"]],
  errorDescription: ["sensor", ["error_description"]],
  cuttingComponentsLife: ["sensor", ["cutting_components_life"]],
  cuttingLineLife: ["sensor", ["cutting_line_life"]],
  rechargeContactLife: ["sensor", ["recharge_contact_life"]],
  wifi: ["binary_sensor", ["wifi_connected"]],
  bluetooth: ["binary_sensor", ["bluetooth_active"]],
  firmware: ["sensor", ["firmware_version"]],
  gpsLatitude: ["sensor", ["gps_latitude"]],
  gpsLongitude: ["sensor", ["gps_longitude"]],
  poseYaw: ["sensor", ["pose_yaw"]],
  shadowUpdated: ["sensor", ["shadow_last_updated"]],
};

const NUMBER_MAP = {
  mowHeight: ["mow_height", "mow_height_setting", "mow height"],
  mowDirection: ["custom_mowing_direction", "custom_mowing_direction_setting", "custom mowing direction"],
  rainContinue: ["rain_continue_time", "rain_continue_time_setting", "rain continue time"],
  voiceVolume: ["voice_volume", "voice_volume_setting", "voice volume"],
  mowCount: ["mow_count", "mow_count_setting", "mowing passes"],
  visualObstacleLevel: ["visual_obstacle_level", "visual_obstacle_level_setting", "visual obstacle sensitivity"],
};

const SWITCH_MAP = {
  rain: ["rain_perception", "rain_perception_enabled", "rain perception"],
  customDirection: ["custom_mowing_direction_enabled", "custom mowing direction"],
  visualObstacle: ["visual_obstacle_detection", "visual_obstacle_detection_enabled", "visual obstacle detection"],
  edgeReturn: ["edge_following_return_enabled", "edge-following return"],
  autoDockMow: ["automatic_dock_mowing_enabled", "automatic dock-area mowing"],
};

function mergeSavedIrrigationItems(configuredItems, savedItems) {
  const configured = Array.isArray(configuredItems) ? configuredItems : [];
  const saved = Array.isArray(savedItems) ? savedItems : [];
  const savedById = new Map(saved.map((item) => [String(item?.id), item]));
  const configuredIds = new Set(configured.map((item) => String(item?.id)));

  return [
    ...configured.map((item) => ({ ...item, ...(savedById.get(String(item?.id)) || {}) })),
    ...saved.filter((item) => !configuredIds.has(String(item?.id))),
  ];
}

function cloneIrrigationItems(items) {
  return Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
}

class GardenMapCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = {};
    this.entity = null;
    this.calibration = resetCalibration();
    this.robotCalibration = resetCalibration();
    this.mowingPathCalibration = resetCalibration();
    this.robotHeadingOffset = 0;
    this.decodedBoundaryCalibration = resetCalibration();
    this.renderer = null;
    this.activePanel = "control";
    this.refreshTimer = null;
    this.refreshInFlight = false;
    this.mapExpanded = false;
    this.showDecodedBoundary = true;
    this.showZones = true;
    this.showNoGoZones = true;
    this.showNoGoLabels = true;
    this.mapOverlayOverrides = {};
    this.mapOnly = false;
    this.themeBackground = false;
    this.transparentBackground = false;
    this.glassBackground = false;
    this.optimisticSettings = new Map();
    this.commandConfirmationToken = 0;
    this.suppressMapExpandClickUntil = 0;
    this.selectedLanguage = "auto";
    this.languageOverride = false;
    this.activeSystem = "robot";
    this.irrigationCard = null;
    this.yamlIrrigationConfig = null;
    this.irrigationObserver = null;
    this.irrigationCountdownTimer = null;
    this.irrigationEditType = "head";
    this.selectedIrrigationHeadId = null;
    this.pendingDripStart = null;
    this.gardenMenuOpen = false;
    this.irrigationLogEntries = [];
    this.irrigationLogLoading = false;
    this.irrigationLogError = "";
    this.irrigationLogLoaded = false;
    this.lastIrrigationStatus = "";
    this.irrigationLogDate = this.localDateKey(new Date());
    this.robotLogEntries = [];
    this.robotLogLoading = false;
    this.robotLogError = "";
    this.robotLogLoaded = false;
    this.robotLogDate = this.localDateKey(new Date());
    this.lastRobotStatus = "";
  }

  setConfig(config) {
    if (!config?.entity) {
      throw new Error("Garden Map Card requires an entity");
    }

    const yamlIrrigation = config.irrigation || {};
    this.yamlIrrigationConfig = {
      ...yamlIrrigation,
      heads: cloneIrrigationItems(yamlIrrigation.heads),
      drip_lines: cloneIrrigationItems(yamlIrrigation.drip_lines || yamlIrrigation.dripLines),
    };
    this.config = {
      ...config,
      irrigation: config.irrigation ? { ...this.yamlIrrigationConfig } : config.irrigation,
    };
    try {
      const savedIrrigation = JSON.parse(window.localStorage.getItem(`garden-map-irrigation-settings:${config.entity}`) || "null");
      if (savedIrrigation?.heads) {
        const configuredIrrigation = this.yamlIrrigationConfig || {};
        this.config = {
          ...config,
          irrigation: {
            ...configuredIrrigation,
            ...savedIrrigation,
            heads: mergeSavedIrrigationItems(configuredIrrigation.heads, savedIrrigation.heads),
            drip_lines: mergeSavedIrrigationItems(
              configuredIrrigation.drip_lines || configuredIrrigation.dripLines,
              savedIrrigation.drip_lines || savedIrrigation.dripLines,
            ),
          },
        };
      }
    } catch (_error) {}
    const savedInterface = this.readInterfaceSettings(config.entity);
    this.mapOnly = typeof config.map_only === "boolean"
      ? config.map_only
      : typeof config.mapOnly === "boolean" ? config.mapOnly : Boolean(savedInterface.mapOnly);
    this.themeBackground = typeof config.theme_background === "boolean"
      ? config.theme_background
      : typeof config.themeBackground === "boolean"
        ? config.themeBackground
        : Boolean(savedInterface.themeBackground);
    this.transparentBackground = typeof config.transparent_background === "boolean"
      ? config.transparent_background
      : typeof config.transparentBackground === "boolean"
        ? config.transparentBackground
        : Boolean(savedInterface.transparentBackground);
    this.glassBackground = typeof config.glass_background === "boolean"
      ? config.glass_background
      : typeof config.glassBackground === "boolean"
        ? config.glassBackground
        : Boolean(savedInterface.glassBackground);
    this.languageOverride = savedInterface.languageOverride === true;
    this.selectedLanguage = this.languageOverride
      ? savedInterface.language || "auto"
      : config.language
        || savedInterface.language
        || window.localStorage.getItem("anthbot-map-language")
        || "auto";
    this.activeSystem = window.localStorage.getItem("anthbot-map-active-system") === "irrigation"
      ? "irrigation"
      : (config.default_system === "irrigation" ? "irrigation" : "robot");
    this.stopRefreshTimer();
    window.clearTimeout(this.pendingRefreshTimer);
    this.calibration = readCalibration(config);
    this.robotCalibration = readRobotCalibration(config);
    this.mowingPathCalibration = readMowingPathCalibration(config);
    this.robotHeadingOffset = Number(config.robot_heading_offset ?? config.robotHeadingOffset) || 0;
    this.decodedBoundaryCalibration = readDecodedBoundaryCalibration(config);
    this.mapOverlayOverrides = savedInterface.mapOverlayOverrides && typeof savedInterface.mapOverlayOverrides === "object"
      ? { ...savedInterface.mapOverlayOverrides }
      : {};
    const overlaySetting = (key, snakeKey, camelKey) => {
      if (this.mapOverlayOverrides[key] === true && typeof savedInterface[key] === "boolean") {
        return savedInterface[key];
      }
      if (typeof config[snakeKey] === "boolean") {
        return config[snakeKey];
      }
      if (typeof config[camelKey] === "boolean") {
        return config[camelKey];
      }
      return true;
    };
    this.showDecodedBoundary = overlaySetting("showDecodedBoundary", "show_decoded_boundary", "showDecodedBoundary");
    this.showZones = overlaySetting("showZones", "show_zones", "showZones");
    this.showNoGoZones = overlaySetting("showNoGoZones", "show_no_go_zones", "showNoGoZones");
    this.showNoGoLabels = overlaySetting("showNoGoLabels", "show_no_go_labels", "showNoGoLabels");
    this.render();
  }

  set hass(hass) {
    const previousLanguage = this.language;
    const previousIrrigationStatus = this.lastIrrigationStatus;
    const previousRobotStatus = this.lastRobotStatus;
    this._hass = hass;
    this.loadSavedIrrigationSettings();
    this.activeMapEntityId = this.resolveActiveMapEntity();
    this.entity = hass.states[this.activeEntityId()] || hass.states[this.config.entity];
    this.lastIrrigationStatus = hass.states["input_text.irrigation_status"]?.state || "";
    this.lastRobotStatus = this.getRelatedEntity("status")?.state || this.entity?.state || "";
    if (this.irrigationCard) {
      this.irrigationCard.hass = hass;
      requestAnimationFrame(() => {
        this.decorateIrrigationCard();
        this.updateRenderer();
      });
    }
    this.updateIrrigationCountdown();
    if (previousIrrigationStatus
        && previousIrrigationStatus !== this.lastIrrigationStatus
        && this.shadowRoot?.querySelector(".irrigation-log-box")?.open) {
      this.loadIrrigationLog(true);
    }
    if (previousRobotStatus
        && previousRobotStatus !== this.lastRobotStatus
        && this.shadowRoot?.querySelector(".robot-log-box")?.open) {
      this.loadRobotLog(true);
    }
    this.startRefreshTimer();
    this.startIrrigationCountdownTimer();
    if (previousLanguage !== this.language) {
      this.render();
    } else {
      this.updateRenderer();
    }
  }

  get language() {
    return resolveLanguage(this.selectedLanguage, this._hass);
  }

  t(key) {
    const anthbotTranslation = translateAnthbot(this.language, key);
    return anthbotTranslation !== key ? anthbotTranslation : translate(this.language, key);
  }

  disconnectedCallback() {
    this.stopRefreshTimer();
    this.stopIrrigationCountdownTimer();
    window.clearTimeout(this.pendingRefreshTimer);
    this.resizeObserver?.disconnect();
    this.renderer?.destroy();
    this.renderer = null;
    this.irrigationObserver?.disconnect();
  }

  getCardSize() {
    return 8;
  }

  render() {
    const root = this.shadowRoot;
    const mapOnly = this.mapOnly;
    const themeBackground = this.themeBackground;
    const transparentBackground = this.transparentBackground;
    const glassBackground = this.glassBackground;
    const cardClasses = [
      mapOnly ? "map-only" : "",
      themeBackground ? "theme-background" : "",
      glassBackground ? "glass-background" : "",
      transparentBackground ? "transparent-background" : "",
    ]
      .filter(Boolean)
      .join(" ");
    root.innerHTML = `
      <ha-card class="${cardClasses}">
        <style>${GARDEN_STYLES}</style>
        <style>
          .system-switch { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:10px; background:transparent; }
          .system-switch button { min-height:44px; border:1px solid rgba(255,255,255,.16); border-radius:12px; background:rgba(255,255,255,.08); color:var(--primary-text-color,#fff); font:inherit; font-weight:800; cursor:pointer; }
          .system-switch button.active { background:var(--primary-color,#149ec2); border-color:var(--primary-color,#149ec2); color:#fff; }
          .cloud-status { font-size:12px; font-weight:800; color:#aeb7c2; }
          .cloud-status[data-state="online"] { color:#55e58a; }
          .cloud-status[data-state="waiting"] { color:#ffd45c; }
          .cloud-status[data-state="offline"] { color:#ff6b6b; }
          ha-card.irrigation-mode .app-shell, ha-card.irrigation-mode .app-panel, ha-card.irrigation-mode > .calibration, ha-card.irrigation-mode .command-dock { display:none !important; }
          .irrigation-head-editor { display:none; }
          ha-card.irrigation-mode > .irrigation-head-editor { display:block; }
          ha-card > .calibration, ha-card > .irrigation-head-editor { margin:0; border:0; border-top:1px solid rgba(255,255,255,.14); border-radius:0; background:rgba(9,18,27,.94); color:#fff; }
          ha-card > .calibration > summary, ha-card > .irrigation-head-editor > summary { display:block; padding:15px 18px; color:#fff !important; font-weight:800; cursor:pointer; list-style:none; }
          ha-card > .calibration > summary::-webkit-details-marker, ha-card > .irrigation-head-editor > summary::-webkit-details-marker { display:none; }
          ha-card > .calibration > summary::before, ha-card > .irrigation-head-editor > summary::before { content:"▸"; display:inline-block; margin-right:9px; color:#fff; transition:transform .18s ease; }
          ha-card > .calibration[open] > summary::before, ha-card > .irrigation-head-editor[open] > summary::before { transform:rotate(90deg); }
          ha-card > .calibration .calibration-title { color:#fff !important; }
          ha-card > .calibration button, ha-card > .calibration textarea { color:#fff !important; }
          .irrigation-head-editor .head-editor-content { padding:12px 16px 16px; }
          .irrigation-head-editor .head-editor-types, .irrigation-head-editor .head-editor-zones { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
          .irrigation-head-editor button { min-height:40px; padding:8px 13px; border:1px solid var(--divider-color,rgba(127,127,127,.32)); border-radius:12px; background:var(--secondary-background-color,#202936); color:var(--primary-text-color,#fff); font:inherit; cursor:pointer; }
          .irrigation-head-editor button.active { background:var(--primary-color,#149ec2); color:#fff; }
          .head-spray-editor { display:grid; gap:11px; margin-top:14px; padding:13px; border:1px solid rgba(255,255,255,.16); border-radius:12px; background:rgba(255,255,255,.06); }
          .head-spray-editor[hidden] { display:none; }
          .head-spray-selection { display:flex; align-items:center; justify-content:space-between; gap:12px; padding-bottom:4px; }
          .head-spray-selection strong { color:#bae6fd; }
          .head-spray-selection .head-spray-actions { display:flex; gap:8px; }
          .head-spray-selection button { min-height:36px; padding:6px 12px; }
          .head-spray-selection button[data-delete-selected-head] { background:rgba(220,38,38,.22); border-color:rgba(248,113,113,.55); }
          .head-spray-selection button[data-save-irrigation-heads] { background:rgba(22,163,74,.28); border-color:rgba(74,222,128,.62); }
          .head-spray-editor label { display:grid; grid-template-columns:minmax(130px,1fr) minmax(160px,2fr) 68px; align-items:center; gap:10px; font-weight:700; }
          .head-spray-editor select, .head-spray-editor input { width:100%; accent-color:var(--primary-color,#149ec2); }
          .head-spray-editor select { min-height:38px; padding:6px 9px; border:1px solid rgba(255,255,255,.18); border-radius:9px; background:var(--secondary-background-color,#202936); color:var(--primary-text-color,#fff); }
          .head-spray-value { text-align:right; color:#bae6fd; font-variant-numeric:tabular-nums; }
          .irrigation-host { display:none; }
          ha-card.irrigation-mode .irrigation-host { display:block; }
          .irrigation-log-box { display:none; margin:0; border:0; border-top:1px solid rgba(255,255,255,.14); background:rgba(9,18,27,.94); color:#fff; }
          ha-card.irrigation-mode > .irrigation-log-box { display:block; }
          .robot-log-box { display:block; margin:0; border:0; border-top:1px solid rgba(255,255,255,.14); background:rgba(9,18,27,.94); color:#fff; }
          ha-card.irrigation-mode > .robot-log-box { display:none; }
          .irrigation-log-box > summary, .robot-log-box > summary { display:flex; align-items:center; gap:9px; padding:15px 18px; color:#fff; font-weight:800; cursor:pointer; list-style:none; }
          .irrigation-log-box > summary::-webkit-details-marker, .robot-log-box > summary::-webkit-details-marker { display:none; }
          .irrigation-log-box > summary::before, .robot-log-box > summary::before { content:"▸"; color:#fff; transition:transform .18s ease; }
          .irrigation-log-box[open] > summary::before, .robot-log-box[open] > summary::before { transform:rotate(90deg); }
          .irrigation-log-content { padding:0 14px 16px; }
          .irrigation-log-toolbar { display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:10px; color:#cbd5e1; font-size:12px; }
          .irrigation-log-date { min-height:36px; padding:6px 9px; border:1px solid rgba(255,255,255,.2); border-radius:10px; background:rgba(255,255,255,.10); color:#fff; color-scheme:dark; font:inherit; font-weight:700; }
          .irrigation-log-refresh { min-height:34px; padding:6px 11px; border:1px solid rgba(255,255,255,.2); border-radius:10px; background:rgba(255,255,255,.08); color:#fff; font:inherit; font-weight:700; cursor:pointer; }
          .irrigation-log-list { display:grid; gap:8px; max-height:380px; overflow:auto; }
          .irrigation-log-entry { display:grid; grid-template-columns:112px 11px 1fr; align-items:start; gap:9px; padding:10px 11px; border:1px solid rgba(255,255,255,.12); border-radius:12px; background:rgba(255,255,255,.06); }
          .irrigation-log-time { color:#aeb7c2; font-size:12px; line-height:1.35; }
          .irrigation-log-dot { width:9px; height:9px; margin-top:4px; border-radius:50%; background:#38bdf8; box-shadow:0 0 0 3px rgba(56,189,248,.16); }
          .irrigation-log-entry.success .irrigation-log-dot { background:#4ade80; box-shadow:0 0 0 3px rgba(74,222,128,.16); }
          .irrigation-log-entry.error .irrigation-log-dot { background:#fb7185; box-shadow:0 0 0 3px rgba(251,113,133,.16); }
          .irrigation-log-entry.warning .irrigation-log-dot { background:#facc15; box-shadow:0 0 0 3px rgba(250,204,21,.16); }
          .irrigation-log-message { color:#fff; font-size:13px; font-weight:700; line-height:1.35; overflow-wrap:anywhere; }
          .irrigation-log-empty { padding:14px; border-radius:12px; background:rgba(255,255,255,.06); color:#cbd5e1; text-align:center; }
          .garden-menu-toggle { position:absolute; right:14px; bottom:14px; z-index:40; min-height:46px; padding:9px 15px; border:1px solid rgba(255,255,255,.38); border-radius:999px; background:rgba(10,18,26,.66); color:#fff; backdrop-filter:blur(12px); box-shadow:0 8px 28px rgba(0,0,0,.32); font:inherit; font-weight:800; cursor:pointer; }
          .irrigation-countdown { display:none; position:absolute; top:14px; left:50%; z-index:38; transform:translateX(-50%); align-items:center; gap:7px; padding:6px 11px; border:1px solid rgba(255,255,255,.28); border-radius:999px; background:rgba(9,18,27,.56); color:#fff; backdrop-filter:blur(9px); box-shadow:0 5px 18px rgba(0,0,0,.22); font-size:13px; font-weight:800; line-height:1; white-space:nowrap; pointer-events:none; }
          .irrigation-countdown[data-visible="true"] { display:flex; }
          .irrigation-countdown-dot { width:7px; height:7px; flex:0 0 7px; border-radius:50%; background:var(--zone-color,#38bdf8); box-shadow:0 0 0 3px rgba(255,255,255,.13); }
          .garden-glass-panel { display:none; position:absolute; z-index:39; right:12px; bottom:70px; width:min(1100px,calc(100% - 24px)); max-height:calc(100% - 84px); overflow:auto; border:1px solid rgba(255,255,255,.34); border-radius:18px; background:rgba(9,18,27,.16); color:#fff; backdrop-filter:blur(9px) saturate(115%); box-shadow:0 16px 44px rgba(0,0,0,.24); overscroll-behavior:contain; }
          .garden-glass-panel.open { display:block; }
          .garden-glass-head { position:sticky; top:0; z-index:5; display:flex; align-items:center; justify-content:space-between; padding:9px 12px 0; background:linear-gradient(rgba(9,18,27,.64),rgba(9,18,27,0)); }
          .garden-glass-head strong { font-size:15px; }
          .garden-glass-close { width:36px; height:36px; border:0; border-radius:50%; background:rgba(255,255,255,.12); color:#fff; font-size:22px; cursor:pointer; }
          .garden-glass-panel .app-shell, .garden-glass-panel .app-panel { background:transparent !important; border:0 !important; }
          .garden-glass-panel .top-menu { background:rgba(255,255,255,.07) !important; border-radius:14px; margin:0 10px; }
          .garden-glass-panel .panel-tabs { padding-inline:10px; }
          .garden-glass-panel .command-dock { display:block !important; position:static !important; inset:auto !important; transform:none !important; margin:8px 10px 12px; background:rgba(6,14,22,.26) !important; }
          @media (max-width:720px) {
            .canvas-wrap.auto-map-size { aspect-ratio:auto; height:calc(100dvh - 78px); min-height:0; max-height:none; }
            .preview-hint { max-width:52%; padding:8px 10px; border-radius:13px; }
            .preview-hint strong { font-size:14px; }
            .preview-hint span { font-size:11px; }
            .garden-glass-panel { left:8px; right:8px; bottom:60px; width:auto; max-height:76%; }
            .garden-menu-toggle { right:9px; bottom:9px; min-height:40px; padding:7px 11px; font-size:14px; }
          }
        </style>
        <div class="system-switch">
          <button type="button" data-system="robot">🤖 Robot</button>
          <button type="button" data-system="irrigation">💧 ${this.t("irrigationSystem")}</button>
        </div>
        <section class="app-shell">
          <div class="top-menu">
            <div>
              <div class="menu-title">${this.config.name || "Anthbot Map"}</div>
              <div class="menu-subtitle" data-role="state">${this.t("waiting")}</div>
            </div>
            <div class="mini-status">
              <div class="battery-ring" data-role="battery-ring">
                <span data-role="battery-value">--</span>
              </div>
              <div class="status-copy">
                <span class="status-label">${this.t("status")}</span>
                <strong data-role="mower-status">-</strong>
                <span class="cloud-status" data-role="cloud-status">${this.t("cloudChecking")}</span>
              </div>
            </div>
          </div>
          <div class="panel-tabs">
            <button type="button" data-panel="control">${this.t("control")}</button>
            <button type="button" data-panel="settings">${this.t("robotSettings")}</button>
            <button type="button" data-panel="interface">${this.t("interfaceSettings")}</button>
            <button type="button" data-panel="status">${this.t("status")}</button>
            <button type="button" data-panel="diagnostics">${this.t("diagnostics")}</button>
          </div>
        </section>
        <div class="canvas-wrap">
          <canvas></canvas>
          <div class="irrigation-countdown" data-role="irrigation-countdown" aria-live="polite">
            <span class="irrigation-countdown-dot"></span>
            <span data-role="irrigation-countdown-text"></span>
          </div>
          <div class="map-overlay map-title">
            <div class="name">${this.config.name || "Garden Map"}</div>
            <div class="state" data-role="map-state">${this.t("waiting")}</div>
          </div>
          <div class="map-overlay preview-hint">
            <strong>${this.t("map")}</strong>
            <span>${this.t("expand")}</span>
          </div>
          <button type="button" class="map-close" data-action="close-map" title="${this.t("close")}">&times;</button>
          <div class="map-overlay map-actions">
            <button type="button" data-action="zoom-in" title="${this.t("zoomIn")}">+</button>
            <button type="button" data-action="zoom-out" title="${this.t("zoomOut")}">-</button>
          </div>
          <div class="map-overlay map-badges">
            <span data-role="zone-count">${this.t("zones")}: -</span>
            <span data-role="pose">${this.t("position")}: -</span>
            <span data-role="heading">${this.t("heading")}: -</span>
            <span class="cloud-status" data-role="map-cloud-status">${this.t("cloudChecking")}</span>
          </div>
          <div class="map-overlay command-dock">
            <div class="zone-strip" data-role="garden-zone-controls"></div>
            <div class="mower-controls">
              <button class="command start" type="button" data-garden-command="start">
                <span class="command-icon">${this.t("start")}</span>
                <span>${this.t("startLabel")}</span>
              </button>
              <button class="command stop" type="button" data-garden-command="stop">
                <span class="command-icon">${this.t("stop")}</span>
                <span>${this.t("stopLabel")}</span>
              </button>
              <button class="command dock" type="button" data-garden-command="dock">
                <span class="command-icon">${this.t("home")}</span>
                <span>${this.t("homeLabel")}</span>
              </button>
            </div>
          </div>
          <button type="button" class="garden-menu-toggle" data-garden-menu="toggle">☰ ${this.t("menu")}</button>
          <section class="garden-glass-panel">
            <div class="garden-glass-head"><strong>Garden · ${this.t("control")}</strong><button type="button" class="garden-glass-close" data-garden-menu="close">×</button></div>
          </section>
        </div>
        <section class="app-panel">
          <div class="panel-body" data-role="panel-body"></div>
        </section>
        <section class="irrigation-host"></section>
        <details class="robot-log-box">
          <summary>${this.t("robotLog")}</summary>
          <div class="irrigation-log-content" data-role="robot-log-content">
            <div class="irrigation-log-empty">${this.t("openLogHint")}</div>
          </div>
        </details>
        <details class="irrigation-log-box">
          <summary>${this.t("irrigationLog")}</summary>
          <div class="irrigation-log-content" data-role="irrigation-log-content">
            <div class="irrigation-log-empty">${this.t("openLogHint")}</div>
          </div>
        </details>
        <details class="irrigation-head-editor">
          <summary>${this.t("irrigationElements")}</summary>
          <div class="head-editor-content">
            <button type="button" data-irrigation-head-edit>${this.t("markElements")}</button>
            <div class="head-editor-types">
              <button type="button" data-irrigation-edit-type="head">${this.t("sprinklerHead")}</button>
              <button type="button" data-irrigation-edit-type="drip">${this.t("dripLine")}</button>
            </div>
            <div class="head-editor-zones">
              ${(this.config.irrigation?.zones || []).map((zone) => `<button type="button" data-irrigation-edit-zone="${Number(zone.id)}">${zone.name || `${this.t("zone")} ${zone.id}`}</button>`).join("")}
            </div>
            <div class="head-spray-editor" data-role="head-spray-editor" hidden>
              <div class="head-spray-selection">
                <strong data-selected-head-label>${this.t("selectSprinkler")}</strong>
                <div class="head-spray-actions">
                  <button type="button" data-save-irrigation-heads>${this.t("save")}</button>
                  <button type="button" data-delete-selected-head>${this.t("delete")}</button>
                </div>
              </div>
              <label>
                <span>${this.t("heading")}</span>
                <input type="range" min="0" max="359" step="1" data-head-setting="direction_angle">
                <span class="head-spray-value" data-head-value="direction_angle"></span>
              </label>
              <label>
                <span>${this.t("sprayAngle")}</span>
                <input type="range" min="30" max="360" step="5" data-head-setting="sweep_angle">
                <span class="head-spray-value" data-head-value="sweep_angle"></span>
              </label>
              <label>
                <span>${this.t("sweepSpeed")}</span>
                <input type="range" min="0.2" max="3" step="0.1" data-head-setting="sweep_speed">
                <span class="head-spray-value" data-head-value="sweep_speed"></span>
              </label>
              <label>
                <span>${this.t("sprayDistance")}</span>
                <input type="range" min="1" max="15" step="0.5" data-head-setting="spray_distance">
                <span class="head-spray-value" data-head-value="spray_distance"></span>
              </label>
            </div>
            <div data-role="irrigation-edit-hint">${this.t("selectZoneAndType")}</div>
          </div>
        </details>
        <details class="calibration">
          <summary>${this.t("calibration")}</summary>
          <div class="calibration-title">${this.t("mapFit")}</div>
          <div class="calibration-grid">
            <button type="button" data-calibration="up">${this.t("up")}</button>
            <button type="button" data-calibration="left">${this.t("left")}</button>
            <button type="button" data-calibration="right">${this.t("right")}</button>
            <button type="button" data-calibration="down">${this.t("down")}</button>
            <button type="button" data-calibration="narrower">${this.t("narrower")}</button>
            <button type="button" data-calibration="wider">${this.t("wider")}</button>
            <button type="button" data-calibration="shorter">${this.t("shorter")}</button>
            <button type="button" data-calibration="taller">${this.t("taller")}</button>
            <button type="button" data-calibration="rotate-left">${this.t("rotation")} -</button>
            <button type="button" data-calibration="rotate-right">${this.t("rotation")} +</button>
          </div>
          <div class="calibration-title">${this.t("robotFit")}</div>
          <div class="calibration-grid">
            <button type="button" data-robot-calibration="up">${this.t("up")}</button>
            <button type="button" data-robot-calibration="left">${this.t("left")}</button>
            <button type="button" data-robot-calibration="right">${this.t("right")}</button>
            <button type="button" data-robot-calibration="down">${this.t("down")}</button>
            <button type="button" data-robot-calibration="narrower">${this.t("narrower")}</button>
            <button type="button" data-robot-calibration="wider">${this.t("wider")}</button>
            <button type="button" data-action="reset-robot">${this.t("reset")}</button>
          </div>
          <div class="calibration-title">${this.t("mowingPathFit")}</div>
          <div class="calibration-grid">
            <button type="button" data-mowing-path-calibration="up">${this.t("up")}</button>
            <button type="button" data-mowing-path-calibration="left">${this.t("left")}</button>
            <button type="button" data-mowing-path-calibration="right">${this.t("right")}</button>
            <button type="button" data-mowing-path-calibration="down">${this.t("down")}</button>
            <button type="button" data-mowing-path-calibration="narrower">${this.t("narrower")}</button>
            <button type="button" data-mowing-path-calibration="wider">${this.t("wider")}</button>
            <button type="button" data-mowing-path-calibration="shorter">${this.t("shorter")}</button>
            <button type="button" data-mowing-path-calibration="taller">${this.t("taller")}</button>
            <button type="button" data-mowing-path-calibration="rotate-left">${this.t("rotation")} -</button>
            <button type="button" data-mowing-path-calibration="rotate-right">${this.t("rotation")} +</button>
            <button type="button" data-action="reset-mowing-path">${this.t("reset")}</button>
          </div>
          <div class="calibration-title">${this.t("robotDirection")}</div>
          <div class="calibration-grid">
            <button type="button" data-robot-heading="left">-15°</button>
            <button type="button" data-robot-heading="right">+15°</button>
            <button type="button" data-robot-heading="around">180°</button>
            <button type="button" data-action="reset-robot-heading">${this.t("reset")}</button>
          </div>
          <div class="calibration-title">${this.t("boundaryFit")}</div>
          <div class="calibration-grid">
            <button type="button" data-boundary-calibration="up">${this.t("up")}</button>
            <button type="button" data-boundary-calibration="left">${this.t("left")}</button>
            <button type="button" data-boundary-calibration="right">${this.t("right")}</button>
            <button type="button" data-boundary-calibration="down">${this.t("down")}</button>
            <button type="button" data-boundary-calibration="narrower">${this.t("narrower")}</button>
            <button type="button" data-boundary-calibration="wider">${this.t("wider")}</button>
            <button type="button" data-boundary-calibration="shorter">${this.t("shorter")}</button>
            <button type="button" data-boundary-calibration="taller">${this.t("taller")}</button>
            <button type="button" data-boundary-calibration="rotate-left">${this.t("rotation")} -</button>
            <button type="button" data-boundary-calibration="rotate-right">${this.t("rotation")} +</button>
            <button type="button" data-action="reset-boundary">${this.t("reset")}</button>
          </div>
          <div class="yaml-row">
            <textarea readonly data-role="yaml"></textarea>
            <button type="button" data-action="copy-yaml">${this.t("yamlCopy")}</button>
          </div>
        </details>
      </ha-card>
    `;

    const glassPanel = root.querySelector(".garden-glass-panel");
    [
      root.querySelector(".system-switch"),
      root.querySelector(".app-shell"),
      root.querySelector(".app-panel"),
      root.querySelector(".command-dock"),
      root.querySelector(".irrigation-host"),
    ].forEach((element) => { if (element) glassPanel?.appendChild(element); });
    glassPanel?.classList.toggle("open", this.gardenMenuOpen);

    root.querySelectorAll("button[data-action]").forEach((button) => {
      button.addEventListener("click", () => this.handleAction(button.dataset.action));
    });
    root.querySelectorAll("button[data-garden-command]").forEach((button) => {
      button.addEventListener("click", () => this.handleCommand(button.dataset.gardenCommand));
    });
    root.querySelectorAll("button[data-panel]").forEach((button) => {
      button.addEventListener("click", () => this.setPanel(button.dataset.panel));
    });
    root.querySelectorAll("button[data-calibration]").forEach((button) => {
      button.addEventListener("click", () => this.handleCalibration(button.dataset.calibration));
    });
    root.querySelectorAll("button[data-robot-calibration]").forEach((button) => {
      button.addEventListener("click", () => this.handleRobotCalibration(button.dataset.robotCalibration));
    });
    root.querySelectorAll("button[data-mowing-path-calibration]").forEach((button) => {
      button.addEventListener("click", () => this.handleMowingPathCalibration(button.dataset.mowingPathCalibration));
    });
    root.querySelectorAll("button[data-robot-heading]").forEach((button) => {
      button.addEventListener("click", () => this.handleRobotHeading(button.dataset.robotHeading));
    });
    root.querySelectorAll("button[data-boundary-calibration]").forEach((button) => {
      button.addEventListener("click", () => this.handleBoundaryCalibration(button.dataset.boundaryCalibration));
    });

    const canvas = root.querySelector("canvas");
    const canvasWrap = root.querySelector(".canvas-wrap");
    this.applyAutomaticMapSize(canvasWrap);
    const pointerStarts = new Map();
    let mapGestureMoved = false;
    canvasWrap?.addEventListener("pointerdown", (event) => {
      pointerStarts.set(event.pointerId, { x: event.clientX, y: event.clientY });
    });
    canvasWrap?.addEventListener("pointermove", (event) => {
      const start = pointerStarts.get(event.pointerId);
      if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
        mapGestureMoved = true;
      }
    });
    const finishMapGesture = (event) => {
      pointerStarts.delete(event.pointerId);
      if (mapGestureMoved) {
        this.suppressMapExpandClickUntil = Date.now() + 250;
      }
      if (!pointerStarts.size) {
        mapGestureMoved = false;
      }
    };
    canvasWrap?.addEventListener("pointerup", finishMapGesture);
    canvasWrap?.addEventListener("pointercancel", finishMapGesture);
    canvasWrap?.addEventListener("click", (event) => {
      if (event.composedPath().includes(glassPanel)) {
        return;
      }
      if (Date.now() < this.suppressMapExpandClickUntil) {
        return;
      }
      if (!mapOnly && !this.mapExpanded && !event.target.closest("button") && !(this.activeSystem === "irrigation" && this.irrigationCard?.editMode)) {
        this.setMapExpanded(true);
      }
    });
    root.querySelectorAll("button[data-system]").forEach((button) => {
      button.addEventListener("click", () => this.setActiveSystem(button.dataset.system));
    });
    root.querySelector("[data-irrigation-head-edit]")?.addEventListener("click", () => this.toggleIrrigationHeadEditor());
    const irrigationLogBox = root.querySelector(".irrigation-log-box");
    irrigationLogBox?.addEventListener("toggle", () => {
      if (irrigationLogBox.open) this.loadIrrigationLog();
    });
    const robotLogBox = root.querySelector(".robot-log-box");
    robotLogBox?.addEventListener("toggle", () => {
      if (robotLogBox.open) this.loadRobotLog();
    });
    root.querySelectorAll("[data-irrigation-edit-zone]").forEach((button) => {
      button.addEventListener("click", () => this.selectIrrigationEditZone(Number(button.dataset.irrigationEditZone)));
    });
    root.querySelectorAll("[data-irrigation-edit-type]").forEach((button) => {
      button.addEventListener("click", () => this.selectIrrigationEditType(button.dataset.irrigationEditType));
    });
    root.querySelector("[data-delete-selected-head]")?.addEventListener("click", () => this.deleteSelectedIrrigationHead());
    root.querySelector("[data-save-irrigation-heads]")?.addEventListener("click", () => this.saveIrrigationSettings());
    root.querySelectorAll("[data-head-setting]").forEach((input) => {
      input.addEventListener("input", () => this.updateIrrigationHeadSetting(input.dataset.headSetting, Number(input.value)));
    });
    root.querySelectorAll("button[data-garden-menu]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.gardenMenuOpen = button.dataset.gardenMenu === "close" ? false : !this.gardenMenuOpen;
        glassPanel?.classList.toggle("open", this.gardenMenuOpen);
      });
    });
    canvasWrap?.addEventListener("dblclick", () => {
      if (this.mapOnly) this.setInterfaceOption("mapOnly", false);
    });

    this.renderer?.destroy();
    this.renderer = new AnthbotMapRenderer(canvas, this.rendererOptions());
    canvas?.addEventListener("click", (event) => this.handleIrrigationMapClick(event));
    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.renderer?.resize());
    this.resizeObserver.observe(canvas);
    requestAnimationFrame(() => this.renderer?.resize());
    this.setMapExpanded(this.mapExpanded);
    this.setupIrrigationCard();
    this.applyActiveSystem();
    this.updateRenderer();
    this.startIrrigationCountdownTimer();
    this.updateIrrigationCountdown();
  }

  localDateKey(date) {
    const value = date instanceof Date ? date : new Date(date);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async loadIrrigationLog(force = false) {
    if (!this._hass || this.irrigationLogLoading) return;
    if (this.irrigationLogLoaded && !force) {
      this.renderIrrigationLog();
      return;
    }
    this.irrigationLogLoading = true;
    this.irrigationLogError = "";
    this.renderIrrigationLog();
    try {
      const start = new Date(`${this.irrigationLogDate}T00:00:00`);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const path = `history/period/${encodeURIComponent(start.toISOString())}`
        + `?filter_entity_id=input_text.irrigation_status`
        + `&end_time=${encodeURIComponent(end.toISOString())}&no_attributes`;
      const response = await this._hass.callApi("GET", path);
      const states = Array.isArray(response?.[0]) ? response[0] : [];
      const entries = [];
      let previousState = null;
      states.forEach((item) => {
        const state = String(item?.state || "").trim();
        const changedAt = new Date(item.last_changed || item.last_updated || 0);
        if (!state
            || ["unknown", "unavailable"].includes(state)
            || state === previousState
            || !Number.isFinite(changedAt.getTime())
            || changedAt < start
            || changedAt >= end) return;
        previousState = state;
        entries.push({
          state,
          time: changedAt.toISOString(),
          type: this.irrigationLogType(state),
        });
      });
      this.irrigationLogEntries = entries.reverse().slice(0, 100);
      this.irrigationLogLoaded = true;
    } catch (error) {
      this.irrigationLogError = error?.message || String(error);
      this.irrigationLogEntries = [];
    } finally {
      this.irrigationLogLoading = false;
      this.renderIrrigationLog();
    }
  }

  irrigationLogType(state) {
    const value = String(state || "").toLocaleLowerCase("hu-HU");
    if (value.includes("hiba") || value.includes("nem indult") || value.includes("leállt")) return "error";
    if (value.includes("kész") || value.includes("befejeződ")) return "success";
    if (value.includes("eső") || value.includes("tilt") || value.includes("várako")) return "warning";
    return "info";
  }

  renderIrrigationLog() {
    const content = this.shadowRoot?.querySelector('[data-role="irrigation-log-content"]');
    if (!content) return;
    const maximumDate = this.localDateKey(new Date());
    let body = "";
    if (this.irrigationLogLoading) {
      body = `<div class="irrigation-log-empty">${this.t("logLoading")}</div>`;
    } else if (this.irrigationLogError) {
      body = `<div class="irrigation-log-empty">${this.escapeHtml(this.t("logLoadFailed").replace("{error}", this.irrigationLogError))}</div>`;
    } else if (!this.irrigationLogEntries.length) {
      body = `<div class="irrigation-log-empty">${this.t("noIrrigationLog")}</div>`;
    } else {
      body = `<div class="irrigation-log-list">${this.irrigationLogEntries.map((entry) => {
        const time = new Date(entry.time).toLocaleString(this.language, {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return `<div class="irrigation-log-entry ${entry.type}">
          <div class="irrigation-log-time">${this.escapeHtml(time)}</div>
          <span class="irrigation-log-dot"></span>
          <div class="irrigation-log-message">${this.escapeHtml(entry.state)}</div>
        </div>`;
      }).join("")}</div>`;
    }
    content.innerHTML = `
      <div class="irrigation-log-toolbar">
        <input class="irrigation-log-date" type="date" value="${this.escapeHtml(this.irrigationLogDate)}" max="${maximumDate}" aria-label="${this.t("logDate")}">
        <button type="button" class="irrigation-log-refresh">${this.t("refresh")}</button>
      </div>
      ${body}`;
    content.querySelector(".irrigation-log-date")?.addEventListener("change", (event) => {
      if (!event.target.value) return;
      this.irrigationLogDate = event.target.value;
      this.irrigationLogLoaded = false;
      this.loadIrrigationLog(true);
    });
    content.querySelector(".irrigation-log-refresh")?.addEventListener("click", () => this.loadIrrigationLog(true));
  }

  async loadRobotLog(force = false) {
    if (!this._hass || this.robotLogLoading) return;
    if (this.robotLogLoaded && !force) {
      this.renderRobotLog();
      return;
    }
    const statusEntity = this.getRelatedEntity("status")?.entity_id || this.config.entity;
    const errorEntity = this.getRelatedEntity("errorDescription")?.entity_id;
    const entityIds = [...new Set([statusEntity, errorEntity].filter(Boolean))];
    if (!entityIds.length) {
      this.robotLogError = this.t("robotStatusMissing");
      this.renderRobotLog();
      return;
    }
    this.robotLogLoading = true;
    this.robotLogError = "";
    this.renderRobotLog();
    try {
      const start = new Date(`${this.robotLogDate}T00:00:00`);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const path = `history/period/${encodeURIComponent(start.toISOString())}`
        + `?filter_entity_id=${encodeURIComponent(entityIds.join(","))}`
        + `&end_time=${encodeURIComponent(end.toISOString())}&no_attributes`;
      const response = await this._hass.callApi("GET", path);
      const previousByEntity = new Map();
      const entries = (Array.isArray(response) ? response.flat() : [])
        .map((item) => {
          const entityId = String(item?.entity_id || "");
          const state = String(item?.state || "").trim();
          const changedAt = new Date(item?.last_changed || item?.last_updated || 0);
          if (!entityId
              || !state
              || ["unknown", "unavailable"].includes(state.toLowerCase())
              || !Number.isFinite(changedAt.getTime())
              || changedAt < start
              || changedAt >= end
              || previousByEntity.get(entityId) === state) return null;
          previousByEntity.set(entityId, state);
          const isErrorEntity = entityId === errorEntity;
          if (isErrorEntity && this.robotLogErrorIsEmpty(state)) return null;
          return {
            state: isErrorEntity ? this.t("errorPrefix").replace("{error}", state) : this.robotLogStatusLabel(state),
            rawState: state,
            time: changedAt.toISOString(),
            type: isErrorEntity ? "error" : this.robotLogStatusType(state),
          };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.time) - new Date(a.time));
      this.robotLogEntries = entries.slice(0, 100);
      this.robotLogLoaded = true;
    } catch (error) {
      this.robotLogError = error?.message || String(error);
      this.robotLogEntries = [];
    } finally {
      this.robotLogLoading = false;
      this.renderRobotLog();
    }
  }

  robotLogErrorIsEmpty(state) {
    const value = slugify(state);
    return !value || ["0", "none", "no_error", "nincs", "ok", "normal"].includes(value);
  }

  robotLogStatusLabel(state) {
    const value = slugify(state);
    const labels = {
      mowing: this.t("statusMowing"), cutting: this.t("statusMowing"), working: this.t("statusMowing"),
      paused: this.t("statusPaused"), pause: this.t("statusPaused"),
      returning: this.t("statusReturning"), returning_to_dock: this.t("statusReturning"), going_home: this.t("statusReturning"),
      charging: this.t("statusCharging"), docked: this.t("statusDocked"), idle: this.t("statusIdle"),
      standby: this.t("statusStandby"), stopped: this.t("statusStopped"), error: this.t("statusError"),
      offline: this.t("statusOffline"), disconnected: this.t("statusOffline"),
    };
    return labels[value] || String(state).replaceAll("_", " ");
  }

  robotLogStatusType(state) {
    const value = slugify(state);
    if (["error", "offline", "disconnected"].includes(value)) return "error";
    if (["paused", "pause", "returning", "returning_to_dock", "going_home"].includes(value)) return "warning";
    if (["charging", "docked", "idle", "standby"].includes(value)) return "success";
    return "info";
  }

  renderRobotLog() {
    const content = this.shadowRoot?.querySelector('[data-role="robot-log-content"]');
    if (!content) return;
    const maximumDate = this.localDateKey(new Date());
    let body = "";
    if (this.robotLogLoading) {
      body = `<div class="irrigation-log-empty">${this.t("robotLogLoading")}</div>`;
    } else if (this.robotLogError) {
      body = `<div class="irrigation-log-empty">${this.escapeHtml(this.t("robotLogLoadFailed").replace("{error}", this.robotLogError))}</div>`;
    } else if (!this.robotLogEntries.length) {
      body = `<div class="irrigation-log-empty">${this.t("noRobotLog")}</div>`;
    } else {
      body = `<div class="irrigation-log-list">${this.robotLogEntries.map((entry) => {
        const time = new Date(entry.time).toLocaleString(this.language, {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return `<div class="irrigation-log-entry ${entry.type}">
          <div class="irrigation-log-time">${this.escapeHtml(time)}</div>
          <span class="irrigation-log-dot"></span>
          <div class="irrigation-log-message">${this.escapeHtml(entry.state)}</div>
        </div>`;
      }).join("")}</div>`;
    }
    content.innerHTML = `
      <div class="irrigation-log-toolbar">
        <input class="irrigation-log-date" type="date" value="${this.escapeHtml(this.robotLogDate)}" max="${maximumDate}" aria-label="${this.t("robotLogDate")}">
        <button type="button" class="irrigation-log-refresh">${this.t("refresh")}</button>
      </div>
      ${body}`;
    content.querySelector(".irrigation-log-date")?.addEventListener("change", (event) => {
      if (!event.target.value) return;
      this.robotLogDate = event.target.value;
      this.robotLogLoaded = false;
      this.loadRobotLog(true);
    });
    content.querySelector(".irrigation-log-refresh")?.addEventListener("click", () => this.loadRobotLog(true));
  }

  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  setupIrrigationCard() {
    const host = this.shadowRoot?.querySelector(".irrigation-host");
    if (!host || !this.config.irrigation) return;
    const card = document.createElement("irrigation-map-card");
    if (typeof card.setConfig !== "function") {
      host.innerHTML = `<div style="padding:16px;color:var(--error-color)">${this.t("irrigationResourceMissing")}</div>`;
      return;
    }
    card.setConfig({ ...this.config.irrigation, image: this.config.image });
    card.heads = mergeSavedIrrigationItems(
      this.yamlIrrigationConfig?.heads,
      card.heads,
    );
    card.dripLines = mergeSavedIrrigationItems(
      this.yamlIrrigationConfig?.drip_lines,
      card.dripLines,
    );
    card.config = {
      ...card.config,
      heads: card.heads,
      drip_lines: card.dripLines,
    };
    if (this._hass) card.hass = this._hass;
    host.replaceChildren(card);
    this.irrigationCard = card;
    this.irrigationObserver?.disconnect();
    this.irrigationObserver = new MutationObserver(() => {
      this.decorateIrrigationCard();
      this.renderer?.setOptions(this.rendererOptions());
    });
    this.irrigationObserver.observe(card.shadowRoot, { childList: true, subtree: false });
    this.decorateIrrigationCard();
    this.updateIrrigationHeadEditor();
  }

  decorateIrrigationCard() {
    const root = this.irrigationCard?.shadowRoot;
    if (!root) return;
    const innerCard = root.querySelector("ha-card");
    const nestedPanel = root.querySelector(".irrigation-glass-panel");
    if (innerCard && nestedPanel) {
      [".top", ".zones", ".pump-status", ".quick-controls", ".settings-box", ".schedule-box", ".yaml-box"]
        .map((selector) => nestedPanel.querySelector(selector))
        .forEach((element) => { if (element) innerCard.appendChild(element); });
    }
    if (!root.querySelector("style[data-shared-map]")) {
      const style = document.createElement("style");
      style.dataset.sharedMap = "true";
      style.textContent = `
      ha-card { border:0 !important; box-shadow:none !important; border-radius:0 !important; background:rgba(9,18,27,.20) !important; }
      .map-wrap { display:none !important; }
      .top { display:none !important; }
      .top > div { display:none !important; }
      .top, .zones, .pump-status, .quick-controls, .settings-box, .schedule-box, .yaml-box { background:transparent !important; }
      .settings-box, .schedule-box, .yaml-box { border-color:rgba(255,255,255,.16) !important; }
      .settings-box summary, .schedule-box summary, .yaml-box summary { color:#fff !important; opacity:1 !important; text-shadow:0 1px 3px rgba(0,0,0,.75); }
      .settings-box summary::marker, .schedule-box summary::marker, .yaml-box summary::marker { color:rgba(255,255,255,.82) !important; }
      .settings-content, .schedule-main, .saved-program, .empty-programs { background:rgba(255,255,255,.88) !important; }
    `;
      root.appendChild(style);
    }

    innerCard?.style.setProperty("background", "transparent", "important");
    innerCard?.style.setProperty("box-shadow", "none", "important");
    root.querySelectorAll(".settings-box, .schedule-box, .yaml-box").forEach((box) => {
      box.style.setProperty("background", "rgba(5,12,19,.10)", "important");
      box.style.setProperty("color", "#ffffff", "important");
    });
    root.querySelectorAll(".settings-box summary, .schedule-box summary, .yaml-box summary").forEach((summary) => {
      summary.style.setProperty("color", "#ffffff", "important");
      summary.style.setProperty("opacity", "1", "important");
      summary.style.setProperty("font-weight", "800", "important");
    });
    this.updateIrrigationHeadEditor();
  }

  toggleIrrigationHeadEditor() {
    if (!this.irrigationCard) return;
    this.irrigationCard.editMode = !this.irrigationCard.editMode;
    if (!this.irrigationCard.editMode) this.pendingDripStart = null;
    this.irrigationCard.render?.();
    requestAnimationFrame(() => {
      this.decorateIrrigationCard();
      this.updateIrrigationHeadEditor();
      this.renderer?.setOptions(this.rendererOptions());
    });
  }

  selectIrrigationEditZone(zoneId) {
    if (!this.irrigationCard || !Number.isFinite(zoneId)) return;
    this.irrigationCard.activeZone = zoneId;
    this.pendingDripStart = null;
    if (!this.irrigationCard.editMode) this.irrigationCard.editMode = true;
    this.irrigationCard.render?.();
    requestAnimationFrame(() => {
      this.decorateIrrigationCard();
      this.updateIrrigationHeadEditor();
      this.renderer?.setOptions(this.rendererOptions());
    });
  }

  selectIrrigationEditType(type) {
    if (type !== "head" && type !== "drip") return;
    this.irrigationEditType = type;
    this.pendingDripStart = null;
    if (this.irrigationCard && !this.irrigationCard.editMode) {
      this.irrigationCard.editMode = true;
      this.irrigationCard.render?.();
    }
    requestAnimationFrame(() => {
      this.decorateIrrigationCard();
      this.updateIrrigationHeadEditor();
      this.renderer?.setOptions(this.rendererOptions());
    });
  }

  updateIrrigationHeadEditor() {
    const editing = Boolean(this.irrigationCard?.editMode);
    const activeZone = Number(this.irrigationCard?.activeZone || 1);
    const toggle = this.shadowRoot?.querySelector("[data-irrigation-head-edit]");
    if (toggle) {
      toggle.textContent = editing ? this.t("markingDone") : this.t("markElements");
      toggle.classList.toggle("active", editing);
    }
    this.shadowRoot?.querySelectorAll("[data-irrigation-edit-zone]").forEach((button) => {
      button.classList.toggle("active", editing && Number(button.dataset.irrigationEditZone) === activeZone);
    });
    this.shadowRoot?.querySelectorAll("[data-irrigation-edit-type]").forEach((button) => {
      button.classList.toggle("active", editing && button.dataset.irrigationEditType === this.irrigationEditType);
    });
    const hint = this.shadowRoot?.querySelector('[data-role="irrigation-edit-hint"]');
    if (hint) {
      if (!editing) {
        hint.textContent = this.t("enableMarkingHint");
      } else if (this.irrigationEditType === "drip") {
        hint.textContent = this.pendingDripStart
          ? this.t("dripEndHint")
          : this.t("dripStartHint");
      } else {
        hint.textContent = this.t("sprinklerEditHint");
      }
    }
    const heads = Array.isArray(this.irrigationCard?.heads) ? this.irrigationCard.heads : [];
    const panel = this.shadowRoot?.querySelector('[data-role="head-spray-editor"]');
    if (!heads.length) {
      this.selectedIrrigationHeadId = null;
      if (panel) panel.hidden = true;
      return;
    }
    if (!heads.some((head) => Number(head.id) === Number(this.selectedIrrigationHeadId))) {
      this.selectedIrrigationHeadId = Number(heads[0].id);
    }
    if (panel) panel.hidden = false;
    const head = heads.find((item) => Number(item.id) === Number(this.selectedIrrigationHeadId));
    if (!head) return;
    const selectedLabel = this.shadowRoot?.querySelector("[data-selected-head-label]");
    if (selectedLabel) selectedLabel.textContent = `${head.name || this.t("headLabel").replace("{id}", head.id)} · ${this.t("zoneLabel").replace("{id}", Number(head.zone))}`;
    const fallbackDirection = ((Math.atan2(.5 - Number(head.y), .5 - Number(head.x)) * 180 / Math.PI) + 360) % 360;
    const values = {
      direction_angle: Number.isFinite(Number(head.direction_angle)) ? Number(head.direction_angle) : Math.round(fallbackDirection),
      sweep_angle: Number.isFinite(Number(head.sweep_angle)) ? Number(head.sweep_angle) : 110,
      sweep_speed: Number.isFinite(Number(head.sweep_speed)) ? Number(head.sweep_speed) : 1,
      spray_distance: Number.isFinite(Number(head.spray_distance)) ? Number(head.spray_distance) : 6,
    };
    this.shadowRoot?.querySelectorAll("[data-head-setting]").forEach((input) => {
      const key = input.dataset.headSetting;
      input.value = String(values[key]);
      const output = this.shadowRoot?.querySelector(`[data-head-value="${key}"]`);
      if (output) {
        output.textContent = key === "direction_angle" || key === "sweep_angle"
          ? `${Math.round(values[key])}°`
          : key === "sweep_speed" ? `${values[key].toFixed(1)}×` : `${values[key].toFixed(1)} m`;
      }
    });
  }

  updateIrrigationHeadSetting(key, value) {
    const heads = Array.isArray(this.irrigationCard?.heads) ? this.irrigationCard.heads : [];
    const head = heads.find((item) => Number(item.id) === Number(this.selectedIrrigationHeadId));
    if (!head || !["direction_angle", "sweep_angle", "sweep_speed", "spray_distance"].includes(key) || !Number.isFinite(value)) return;
    head[key] = value;
    this.syncIrrigationMapElements();
    this.renderer?.setOptions(this.rendererOptions());
    this.updateIrrigationHeadEditor();
  }

  deleteSelectedIrrigationHead() {
    const heads = Array.isArray(this.irrigationCard?.heads) ? this.irrigationCard.heads : [];
    const index = heads.findIndex((head) => Number(head.id) === Number(this.selectedIrrigationHeadId));
    if (index < 0) return;
    heads.splice(index, 1);
    heads.forEach((head, headIndex) => { head.id = headIndex + 1; head.name = String(headIndex + 1); });
    this.selectedIrrigationHeadId = heads[index]?.id ?? heads[index - 1]?.id ?? null;
    this.syncIrrigationMapElements();
    this.updateIrrigationHeadEditor();
    this.renderer?.setOptions(this.rendererOptions());
    this.notify(this.t("sprinklerDeleted"));
  }

  irrigationSettingsKey() {
    return `garden-map-irrigation-settings:${this.config?.entity || "default"}`;
  }

  irrigationSettingsSnapshot() {
    return {
      heads: Array.isArray(this.irrigationCard?.heads) ? this.irrigationCard.heads : [],
      drip_lines: Array.isArray(this.irrigationCard?.dripLines) ? this.irrigationCard.dripLines : [],
    };
  }

  async saveIrrigationSettings() {
    const settings = this.irrigationSettingsSnapshot();
    window.localStorage.setItem(this.irrigationSettingsKey(), JSON.stringify(settings));
    try {
      await this._hass?.callWS({ type: "frontend/set_user_data", key: this.irrigationSettingsKey(), value: settings });
      this.notify(this.t("sprinklerSaved"));
    } catch (_error) {
      this.notify(this.t("settingsSavedOnDevice"));
    }
  }

  async loadSavedIrrigationSettings() {
    const key = this.irrigationSettingsKey();
    if (!this._hass?.callWS || this.loadedIrrigationSettingsKey === key) return;
    this.loadedIrrigationSettingsKey = key;
    try {
      const response = await this._hass.callWS({ type: "frontend/get_user_data", key });
      const settings = response?.value ?? response;
      if (!Array.isArray(settings?.heads)) return;
      const configuredIrrigation = this.yamlIrrigationConfig || this.config.irrigation || {};
      const mergedSettings = {
        ...settings,
        heads: mergeSavedIrrigationItems(configuredIrrigation.heads, settings.heads),
        drip_lines: mergeSavedIrrigationItems(
          configuredIrrigation.drip_lines || configuredIrrigation.dripLines,
          settings.drip_lines || settings.dripLines,
        ),
      };
      window.localStorage.setItem(key, JSON.stringify(mergedSettings));
      this.config = {
        ...this.config,
        irrigation: { ...configuredIrrigation, ...mergedSettings },
      };
      if (this.irrigationCard) {
        this.irrigationCard.heads = mergedSettings.heads;
        this.irrigationCard.dripLines = mergedSettings.drip_lines;
        this.syncIrrigationMapElements();
        this.updateIrrigationHeadEditor();
        this.renderer?.setOptions(this.rendererOptions());
      }
    } catch (_error) {}
  }

  setActiveSystem(system) {
    if (system !== "robot" && system !== "irrigation") return;
    this.activeSystem = system;
    window.localStorage.setItem("anthbot-map-active-system", system);
    this.applyActiveSystem();
    this.renderer?.setOptions(this.rendererOptions());
    window.dispatchEvent(new Event("resize"));
  }

  applyActiveSystem() {
    const card = this.shadowRoot?.querySelector("ha-card");
    card?.classList.toggle("irrigation-mode", this.activeSystem === "irrigation");
    this.shadowRoot?.querySelectorAll("button[data-system]").forEach((button) => {
      button.classList.toggle("active", button.dataset.system === this.activeSystem);
    });
  }

  irrigationZones() {
    const config = this.config.irrigation || {};
    return (Array.isArray(config.zones) ? config.zones : []).map((zone) => {
      const id = Number(zone.id);
      const manualTimer = Number.isFinite(id)
        ? this._hass?.states?.[`timer.irrigation_manual_zone_${id}`]
        : null;
      const programTimer = Number.isFinite(id)
        ? this._hass?.states?.[`timer.irrigation_program_zone_${id}`]
        : null;
      return {
        ...zone,
        active: this._hass?.states?.[zone.entity]?.state === "on"
          || manualTimer?.state === "active"
          || programTimer?.state === "active",
      };
    });
  }

  startIrrigationCountdownTimer() {
    if (this.irrigationCountdownTimer) return;
    this.irrigationCountdownTimer = window.setInterval(() => this.updateIrrigationCountdown(), 1000);
  }

  stopIrrigationCountdownTimer() {
    if (!this.irrigationCountdownTimer) return;
    window.clearInterval(this.irrigationCountdownTimer);
    this.irrigationCountdownTimer = null;
  }

  updateIrrigationCountdown() {
    const badge = this.shadowRoot?.querySelector('[data-role="irrigation-countdown"]');
    const text = this.shadowRoot?.querySelector('[data-role="irrigation-countdown-text"]');
    if (!badge || !text) return;

    const activeZone = this.irrigationZones().find((zone) => zone.active);
    const zoneId = Number(activeZone?.id);
    const programZoneTimer = Number.isFinite(zoneId)
      ? this._hass?.states?.[`timer.irrigation_program_zone_${zoneId}`]
      : null;
    const manualTimer = Number.isFinite(zoneId)
      ? this._hass?.states?.[`timer.irrigation_manual_zone_${zoneId}`]
      : null;
    const programTimer = this._hass?.states?.["timer.irrigation_zone"];
    const timer = programZoneTimer?.state === "active"
      ? programZoneTimer
      : manualTimer?.state === "active"
      ? manualTimer
      : programTimer?.state === "active" ? programTimer : null;
    const remaining = this.irrigationTimerRemaining(timer);

    if (!activeZone || !remaining) {
      badge.dataset.visible = "false";
      text.textContent = "";
      return;
    }

    badge.style.setProperty("--zone-color", activeZone.color || "#38bdf8");
    text.textContent = `${activeZone.name || `${this.t("zone")} ${activeZone.id}`} · ${remaining}`;
    badge.dataset.visible = "true";
  }

  irrigationTimerRemaining(timer) {
    if (!timer) return "";
    const finishesAt = timer.attributes?.finishes_at;
    if (finishesAt) {
      const finishTime = new Date(finishesAt).getTime();
      if (!Number.isFinite(finishTime)) return "";
      const seconds = Math.max(0, Math.ceil((finishTime - Date.now()) / 1000));
      return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    }
    return String(timer.attributes?.remaining || "");
  }

  handleIrrigationMapClick(event) {
    const irrigation = this.irrigationCard;
    if (this.activeSystem !== "irrigation" || !irrigation?.editMode || !this.renderer) return;
    const point = this.renderer.clientToMap(event.clientX, event.clientY);
    if (!point || point.x < 0 || point.x > 1 || point.y < 0 || point.y > 1) return;
    if (this.irrigationEditType === "drip") {
      const dripLines = Array.isArray(irrigation.dripLines) ? irrigation.dripLines : [];
      irrigation.dripLines = dripLines;
      if (!this.pendingDripStart) {
        const hit = dripLines.findIndex((line) => distanceToSegment(point, line) < 0.022);
        if (hit >= 0) {
          dripLines.splice(hit, 1);
          dripLines.forEach((line, index) => {
            line.id = index + 1;
            line.name = `${this.t("dripLine")} ${index + 1}`;
          });
          this.syncIrrigationMapElements();
          this.renderer.setOptions(this.rendererOptions());
          this.notify(this.t("dripDeleted"));
          return;
        }
        this.pendingDripStart = {
          x: Number(point.x.toFixed(4)),
          y: Number(point.y.toFixed(4)),
        };
        this.updateIrrigationHeadEditor();
        this.renderer.setOptions(this.rendererOptions());
        return;
      }

      const end = {
        x: Number(point.x.toFixed(4)),
        y: Number(point.y.toFixed(4)),
      };
      if (Math.hypot(end.x - this.pendingDripStart.x, end.y - this.pendingDripStart.y) < 0.015) {
        this.notify(this.t("dripTooShort"));
        return;
      }
      dripLines.push({
        id: dripLines.length + 1,
        name: `${this.t("dripLine")} ${dripLines.length + 1}`,
        zone: Number(irrigation.activeZone || 1),
        x1: this.pendingDripStart.x,
        y1: this.pendingDripStart.y,
        x2: end.x,
        y2: end.y,
        width: 5,
      });
      this.pendingDripStart = null;
      this.syncIrrigationMapElements();
      this.updateIrrigationHeadEditor();
      this.renderer.setOptions(this.rendererOptions());
      this.notify(this.t("dripAdded"));
      return;
    }

    const heads = irrigation.heads || [];
    const hit = heads.findIndex((head) => Math.hypot(Number(head.x) - point.x, Number(head.y) - point.y) < 0.025);
    if (hit >= 0) {
      this.selectedIrrigationHeadId = heads[hit].id;
    } else {
      const direction = ((Math.atan2(.5 - point.y, .5 - point.x) * 180 / Math.PI) + 360) % 360;
      const newHead = {
        id: heads.length + 1,
        name: String(heads.length + 1),
        zone: irrigation.activeZone,
        x: Number(point.x.toFixed(4)),
        y: Number(point.y.toFixed(4)),
        radius: 9,
        direction_angle: Math.round(direction),
        sweep_angle: 110,
        sweep_speed: 1,
        spray_distance: 6,
      };
      heads.push(newHead);
      this.selectedIrrigationHeadId = newHead.id;
    }
    this.syncIrrigationMapElements();
    this.renderer.setOptions(this.rendererOptions());
    this.updateIrrigationHeadEditor();
  }

  syncIrrigationMapElements() {
    const irrigation = this.irrigationCard;
    if (!irrigation) return;
    const heads = Array.isArray(irrigation.heads) ? irrigation.heads : [];
    const dripLines = Array.isArray(irrigation.dripLines) ? irrigation.dripLines : [];
    irrigation.config = { ...irrigation.config, heads, drip_lines: dripLines };
    this.config = {
      ...this.config,
      irrigation: {
        ...(this.config.irrigation || {}),
        heads,
        drip_lines: dripLines,
      },
    };
    irrigation.updateYaml?.();
    this.updateYaml();
  }

  applyAutomaticMapSize(canvasWrap) {
    if (!canvasWrap) return;

    const configuredHeight = Number(this.config.height);
    if (Number.isFinite(configuredHeight) && configuredHeight > 0) {
      canvasWrap.classList.remove("auto-map-size");
      canvasWrap.style.setProperty("--anthbot-map-height", `${configuredHeight}px`);
      return;
    }

    canvasWrap.classList.add("auto-map-size");
    const imageUrl = this.config.image;
    if (!imageUrl) return;

    const probe = new Image();
    probe.onload = () => {
      if (!canvasWrap.isConnected || !probe.naturalWidth || !probe.naturalHeight) return;
      canvasWrap.style.setProperty(
        "--anthbot-map-aspect-ratio",
        `${probe.naturalWidth} / ${probe.naturalHeight}`,
      );
      this.renderer?.resize();
    };
    probe.src = imageUrl;
  }

  computeLivePose(attributes = this.entity?.attributes || {}) {
    const rawPose = attributes.pose && typeof attributes.pose === "object" ? attributes.pose : {};
    const coordinatePose = [rawPose, attributes.cur_pose, attributes.map_scan_pose].find((candidate) =>
      Number.isFinite(Number(candidate?.x)) && Number.isFinite(Number(candidate?.y)),
    );
    const poseYawEntity = this.getRelatedEntity("poseYaw");
    const fallbackYaw = [
      coordinatePose?.yaw,
      coordinatePose?.heading,
      rawPose.yaw,
      rawPose.heading,
      poseYawEntity?.state,
    ].find((value) => Number.isFinite(Number(value)));
    return coordinatePose
      ? { ...rawPose, ...coordinatePose, yaw: fallbackYaw }
      : { ...rawPose, yaw: fallbackYaw };
  }

  updateRenderer() {
    if (!this.renderer || !this.entity) {
      return;
    }

    const attributes = this.entity.attributes || {};
    const pose = this.computeLivePose(attributes);
    const rawPose = attributes.pose && typeof attributes.pose === "object" ? attributes.pose : {};
    this.renderer.setOptions(this.rendererOptions());
    this.renderer.setState({
      pose,
      raw_pose: rawPose,
      cur_pose: attributes.cur_pose,
      map_scan_pose: attributes.map_scan_pose,
      path: attributes.path,
      mowed_path: attributes.mowed_path,
      mowedPath: attributes.mowedPath,
      mowing_path: attributes.mowing_path,
      mowingPath: attributes.mowingPath,
      track: attributes.track,
      tracks: attributes.tracks,
      trajectory: attributes.trajectory,
      cloud_path: attributes.cloud_path,
      cloudPath: attributes.cloudPath,
      path_id: attributes.path_id,
      path_start: attributes.path_start,
      path_task_type: attributes.path_task_type,
      path_point_count: attributes.path_point_count,
      path_coordinate_scale: attributes.path_coordinate_scale,
      path_first_point: attributes.path_first_point,
      path_time: attributes.path_time,
      history_path_info: attributes.history_path_info,
      history_path_source: attributes.history_path_source,
      map_raster: attributes.map_raster,
      map_definition: attributes.map_definition,
      path_definition: attributes.path_definition,
      map_binary_paths: attributes.map_binary_paths,
      path_binary_paths: attributes.path_binary_paths,
      mower_status: this.getRelatedEntity("status")?.state || attributes.mower_status || this.entity.state,
      robot_status_raw: attributes.robot_status_raw,
      charging: this.getRelatedEntity("charging")?.state === "on",
      history_path_live_refresh: attributes.history_path_live_refresh,
      area_definition: attributes.area_definition,
    });

    const state = this.shadowRoot.querySelector('[data-role="state"]');
    if (state) {
      state.textContent = `${this.entity.entity_id} - ${this.entity.state}`;
    }
    const mapState = this.shadowRoot.querySelector('[data-role="map-state"]');
    if (mapState) {
      mapState.textContent = `${this.entity.entity_id} - ${this.entity.state}`;
    }

    this.updateMapBadges(attributes);
    this.updateBatteryAndStatus();
    this.renderZoneControls(attributes.area_definition);
    if (!this.isPanelControlActive()) {
      this.renderAppPanel();
    }
    this.updateYaml();
  }

  isPanelControlActive() {
    const activeElement = this.shadowRoot?.activeElement;
    if (!activeElement?.closest?.('[data-role="panel-body"]')) {
      return false;
    }
    return ["SELECT", "INPUT", "BUTTON"].includes(activeElement.tagName);
  }

  updateMapBadges(attributes) {
    this.updateCloudStatus(attributes);
    const customAreas = Array.isArray(attributes.area_definition?.custom_areas)
      ? attributes.area_definition.custom_areas.length
      : 0;
    const noGoAreas =
      (Array.isArray(attributes.area_definition?.forbid_areas)
        ? attributes.area_definition.forbid_areas.length
        : 0) +
      (Array.isArray(attributes.area_definition?.remote_forbid_areas)
        ? attributes.area_definition.remote_forbid_areas.length
        : 0);

    const zoneCount = this.shadowRoot.querySelector('[data-role="zone-count"]');
    if (zoneCount) {
      zoneCount.textContent = `${this.t("zones")}: ${customAreas} / ${this.t("forbidden")}: ${noGoAreas}`;
    }

    const poseBadge = this.shadowRoot.querySelector('[data-role="pose"]');
    if (poseBadge) {
      const x = Number(attributes.pose?.x);
      const y = Number(attributes.pose?.y);
      poseBadge.textContent =
        Number.isFinite(x) && Number.isFinite(y)
          ? `${this.t("position")}: ${Math.round(x)}, ${Math.round(y)}`
          : `${this.t("position")}: -`;
    }

    const headingBadge = this.shadowRoot.querySelector('[data-role="heading"]');
    if (headingBadge) {
      const headingValue = [
        attributes.cur_pose?.heading,
        attributes.map_scan_pose?.heading,
        attributes.pose?.heading,
      ].find((value) => Number.isFinite(Number(value)));
      const yawValue = [
        attributes.cur_pose?.yaw,
        attributes.map_scan_pose?.yaw,
        attributes.pose?.yaw,
        this.getRelatedEntity("poseYaw")?.state,
      ].find((value) => Number.isFinite(Number(value)));
      const heading = Number.isFinite(Number(headingValue))
        ? normalizeHeadingDegrees(headingValue)
        : Number.isFinite(Number(yawValue))
          ? milliRadiansToDegrees(yawValue)
          : null;
      headingBadge.textContent = Number.isFinite(heading)
        ? `${this.t("heading")}: ${Math.round(normalizeSignedDegrees(heading))}°`
        : `${this.t("heading")}: -`;
    }
  }

  updateBatteryAndStatus() {
    const batteryRing = this.shadowRoot.querySelector('[data-role="battery-ring"]');
    const batteryValue = this.shadowRoot.querySelector('[data-role="battery-value"]');
    const batteryEntity = this.getRelatedEntity("battery");
    const batteryPercent = Number(batteryEntity?.state);

    if (batteryValue) {
      batteryValue.textContent = Number.isFinite(batteryPercent) ? `${batteryPercent}` : "--";
    }
    if (batteryRing) {
      const percent = Number.isFinite(batteryPercent) ? Math.max(0, Math.min(100, batteryPercent)) : 0;
      batteryRing.style.setProperty("--battery", `${percent * 3.6}deg`);
      batteryRing.classList.toggle("low", percent > 0 && percent < 25);
      batteryRing.classList.toggle("charging", this.getRelatedEntity("charging")?.state === "on");
    }

    const mowerStatus = this.shadowRoot.querySelector('[data-role="mower-status"]');
    if (mowerStatus) {
      const statusEntity = this.getRelatedEntity("status");
      mowerStatus.textContent = statusEntity ? this.translateStatus(statusEntity.state) : "-";
    }
  }

  setPanel(panel) {
    this.activePanel = panel;
    this.renderAppPanel();
  }

  renderAppPanel() {
    const body = this.shadowRoot.querySelector('[data-role="panel-body"]');
    if (!body || !this._hass) {
      return;
    }

    this.shadowRoot.querySelectorAll("button[data-panel]").forEach((button) => {
      button.classList.toggle("active", button.dataset.panel === this.activePanel);
    });

    if (this.activePanel === "settings") {
      this.renderSettingsPanel(body);
    } else if (this.activePanel === "interface") {
      this.renderInterfacePanel(body);
    } else if (this.activePanel === "status") {
      this.renderStatusPanel(body);
    } else if (this.activePanel === "diagnostics") {
      this.renderDiagnosticsPanel(body);
    } else {
      this.renderControlPanel(body);
    }
  }

  renderControlPanel(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    grid.append(
      this.createCommandTile(this.t("startLabel"), this.t("startSub"), "start"),
      this.createCommandTile(this.t("stopLabel"), this.t("stopSub"), "stop"),
      this.createCommandTile(this.t("homeLabel"), this.t("homeSub"), "dock"),
      this.createCommandTile(this.t("outerEdgeLabel"), this.t("outerEdgeSub"), "outer-edge"),
      this.createCommandTile(this.t("dockEdgeLabel"), this.t("dockEdgeSub"), "dock-edge"),
    );

    for (const zone of this.currentZones()) {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "panel-tile garden-zone-tile";
      tile.innerHTML = `<strong>${zone.name || `${this.t("zone")} ${zone.id}`}</strong><span>${this.t("zoneStart")}</span>`;
      tile.addEventListener("click", () => this.startZone(zone));
      grid.appendChild(tile);
    }

    body.appendChild(grid);
  }

  renderSettingsPanel(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    grid.append(
      this.createCommandTile(this.t("cloud"), this.t("cloudSub"), "connect"),
      this.createMowHeightControl(),
      this.createNumberControl(this.t("customDirection"), "mowDirection", 0, 180, 1, "deg"),
      this.createNumberControl(this.t("rainDelay"), "rainContinue", 0, 8, 1, "h"),
      this.createNumberControl(this.t("volume"), "voiceVolume", 0, 100, 1, "%"),
      this.createSwitchControl(this.t("rainDetection"), "rain"),
      this.createSwitchControl(this.t("customCutDirection"), "customDirection"),
    );
    body.appendChild(grid);
  }

  updateCloudStatus(attributes = {}) {
    const cloudConnected = attributes.cloud_connected;
    const robotOnline = attributes.robot_online;
    const mqttConnected = attributes.live_shadow_connected;
    const state = cloudConnected === false || mqttConnected === false ? "offline" : robotOnline === true ? "online" : "waiting";
    const baseText = cloudConnected === false
      ? this.t("cloudDisconnected")
      : robotOnline === true
        ? this.t("cloudRobotOnline")
        : cloudConnected === true
          ? this.t("cloudRobotNoResponse")
          : this.t("cloudChecking");
    const mqttText = typeof mqttConnected === "boolean"
      ? ` · MQTT: ${mqttConnected ? "online" : "offline"}`
      : "";
    const text = `${baseText}${mqttText}`;
    for (const role of ["cloud-status", "map-cloud-status"]) {
      const badge = this.shadowRoot?.querySelector(`[data-role="${role}"]`);
      if (badge) {
        badge.textContent = text;
        badge.dataset.state = state;
      }
    }
  }

  renderInterfacePanel(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    grid.append(
      this.createLanguageControl(),
      this.createInterfaceSwitch(this.t("mapOnly"), "mapOnly"),
      this.createInterfaceSwitch(this.t("themeBackground"), "themeBackground"),
      this.createInterfaceSwitch(this.t("glassBackground"), "glassBackground"),
      this.createInterfaceSwitch(this.t("transparentBackground"), "transparentBackground"),
      this.createMapOverlaySwitch(this.t("showZones"), "showZones"),
      this.createMapOverlaySwitch(this.t("showBoundary"), "showDecodedBoundary"),
      this.createMapOverlaySwitch(this.t("showNoGoZones"), "showNoGoZones"),
      this.createMapOverlaySwitch(this.t("showNoGoLabels"), "showNoGoLabels"),
    );
    body.appendChild(grid);
  }

  renderStatusPanel(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    for (const item of [
      [this.t("battery"), "battery"],
      [this.t("status"), "status"],
      [this.t("charging"), "charging"],
      [this.t("connection"), "connection"],
      [this.t("cutHeight"), "cuttingHeight"],
      [this.t("mowedArea"), "mowingArea"],
      [this.t("mowingTime"), "mowingTime"],
      ["RTK", "rtkFix"],
      [this.t("totalArea"), "totalArea"],
      [this.t("error"), "errorDescription"],
    ]) {
      grid.appendChild(this.createInfoTile(item[0], item[1]));
    }
    body.appendChild(grid);
  }

  renderDiagnosticsPanel(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    for (const item of [
      [this.t("bladeLife"), "cuttingComponentsLife"],
      [this.t("lineLife"), "cuttingLineLife"],
      [this.t("dockContact"), "rechargeContactLife"],
      ["WiFi", "wifi"],
      ["Bluetooth", "bluetooth"],
      [this.t("firmware"), "firmware"],
      [this.t("gpsLatitude"), "gpsLatitude"],
      [this.t("gpsLongitude"), "gpsLongitude"],
      [this.t("lastUpdate"), "shadowUpdated"],
    ]) {
      grid.appendChild(this.createInfoTile(item[0], item[1]));
    }
    body.appendChild(grid);
    const attrs = this.entity?.attributes || {};
    const recordsPayload = attrs.mowing_records || { data: [] };
    const recordsError = attrs.mowing_records_error;
    const history = this.createSettingsSection(this.t("mowingHistory"), "mowing-history");
    this.renderMowingHistoryList(
      history.querySelector(".settings-section-body"),
      recordsPayload,
      recordsError,
    );
    body.appendChild(history);
    const errors = this.createSettingsSection(this.t("errorHistory"), "error-history");
    errors.querySelector(".settings-section-body").innerHTML = `<pre>${escapeHtml(JSON.stringify(attrs.error_history || [], null, 2))}</pre>`;
    body.appendChild(errors);
  }

  renderMowingHistoryList(container, recordsPayload, recordsError) {
    container.innerHTML = "";
    const records = Array.isArray(recordsPayload?.data)
      ? recordsPayload.data
      : Array.isArray(recordsPayload) ? recordsPayload : [];

    const summary = this.buildMowingHistorySummary(recordsPayload);
    if (summary) container.appendChild(summary);

    if (!records.length) {
      const empty = document.createElement("div");
      empty.className = "mowing-history-empty";
      empty.textContent = recordsError
        ? `${this.t("mowingHistoryEmpty")} (${recordsError})`
        : this.t("mowingHistoryEmpty");
      container.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = "mowing-history-list";
    for (const record of records) {
      list.appendChild(this.createMowingHistoryCard(record));
    }
    container.appendChild(list);
  }

  buildMowingHistorySummary(payload) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
    const total = pickRecordValue(payload, ["total", "total_times", "totalTimes"]);
    const totalArea = pickRecordValue(payload, ["total_area", "totalArea"]);
    if (total === undefined && totalArea === undefined) return null;

    const summary = document.createElement("div");
    summary.className = "mowing-history-summary";
    const items = [];
    if (total !== undefined) items.push([this.t("mowingHistoryTotalCount"), String(total)]);
    if (totalArea !== undefined) items.push([this.t("mowingHistoryTotalArea"), formatRecordArea(totalArea)]);
    for (const [label, value] of items) {
      const item = document.createElement("div");
      item.className = "mowing-history-summary-item";
      item.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>`;
      summary.appendChild(item);
    }
    return summary;
  }

  createMowingHistoryCard(record) {
    const card = document.createElement("div");
    card.className = "mowing-history-card";

    const { start, end } = resolveMowingRecordTimeRange(record);
    const area = pickRecordValue(record, MOWING_RECORD_AREA_KEYS);
    const percent = pickRecordValue(record, MOWING_RECORD_PERCENT_KEYS);
    const durationEntry = pickRecordEntry(record, MOWING_RECORD_DURATION_KEYS);
    const rawDuration = durationEntry?.value;
    const mode = pickRecordValue(record, MOWING_RECORD_MODE_KEYS);
    const source = pickRecordValue(record, MOWING_RECORD_SOURCE_KEYS);
    const zoneListRaw = pickRecordValue(record, MOWING_RECORD_ZONE_LIST_KEYS);
    const zoneList = Array.isArray(zoneListRaw) ? zoneListRaw : [];

    const areaUrl = pickRecordValue(record, MOWING_RECORD_AREA_URL_KEYS);
    const mapUrl = pickRecordValue(record, MOWING_RECORD_MAP_URL_KEYS);
    const pathUrl = pickRecordValue(record, MOWING_RECORD_PATH_URL_KEYS);
    if (areaUrl || mapUrl || pathUrl) {
      card.classList.add("has-detail");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      const openDetail = (event) => {
        event.stopPropagation();
        this.openMowingRecordDetail(record, { areaUrl, mapUrl, pathUrl });
      };
      card.addEventListener("click", openDetail);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetail(event);
        }
      });
    }

    const head = document.createElement("div");
    head.className = "mowing-history-head";
    head.innerHTML = `<strong>${escapeHtml(this.formatMowingDateRange(start, end))}</strong>`;
    card.appendChild(head);

    let durationSeconds = null;
    if (start && end) {
      durationSeconds = (end.getTime() - start.getTime()) / 1000;
    } else if (rawDuration !== undefined) {
      durationSeconds = normalizeRecordDurationSeconds(rawDuration, durationEntry?.key);
    }

    const statItems = [];
    if (area !== undefined) statItems.push([this.t("mowingHistoryArea"), formatRecordArea(area)]);
    if (percent !== undefined) {
      const pct = formatRecordPercent(percent);
      if (pct) statItems.push([this.t("mowingHistoryProgress"), pct]);
    }
    if (durationSeconds !== null) {
      statItems.push([this.t("mowingHistoryDuration"), formatRecordDurationSeconds(durationSeconds)]);
    }
    if (mode !== undefined) statItems.push([this.t("mowingHistoryMode"), this.formatRecordMode(mode)]);
    if (source !== undefined) statItems.push([this.t("mowingHistoryStartedBy"), this.formatRecordSource(source)]);

    if (statItems.length) {
      const stats = document.createElement("div");
      stats.className = "mowing-history-stats";
      for (const [label, value] of statItems) {
        const stat = document.createElement("div");
        stat.className = "mowing-history-stat";
        stat.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong>`;
        stats.appendChild(stat);
      }
      card.appendChild(stats);
    }

    if (zoneList.length) {
      const zoneWrap = document.createElement("div");
      zoneWrap.className = "mowing-history-zones";
      for (const zone of zoneList) {
        const zoneName = pickRecordValue(zone, MOWING_RECORD_ZONE_NAME_KEYS);
        const width = pickRecordValue(zone, MOWING_RECORD_ZONE_WIDTH_KEYS);
        const height = pickRecordValue(zone, MOWING_RECORD_ZONE_HEIGHT_KEYS);
        const zoneArea = pickRecordValue(zone, MOWING_RECORD_ZONE_AREA_KEYS);
        let dims = "";
        if (width !== undefined && height !== undefined) {
          dims = `${formatRecordNumber(width)}m × ${formatRecordNumber(height)}m`;
        } else if (zoneArea !== undefined) {
          dims = formatRecordArea(zoneArea);
        }
        const chip = document.createElement("div");
        chip.className = "mowing-history-zone-chip";
        chip.innerHTML = `<strong>${escapeHtml(zoneName ? String(zoneName) : this.t("zone"))}</strong>${dims ? `<span>${escapeHtml(dims)}</span>` : ""}`;
        zoneWrap.appendChild(chip);
      }
      card.appendChild(zoneWrap);
    }

    const extraKeys = collectUnmappedRecordKeys(record, MOWING_RECORD_MAPPED_KEYS);
    if (extraKeys.length) {
      const extra = {};
      for (const key of extraKeys) extra[key] = record[key];
      const details = document.createElement("details");
      details.className = "mowing-history-raw";
      details.innerHTML = `<summary>${this.t("mowingHistoryRawFields")}</summary><pre>${escapeHtml(JSON.stringify(extra, null, 2))}</pre>`;
      card.appendChild(details);
    }

    return card;
  }

  async openMowingRecordDetail(record, { areaUrl, mapUrl, pathUrl } = {}) {
    const overlay = document.createElement("div");
    overlay.className = "mowing-record-detail-overlay";
    const dialog = document.createElement("div");
    dialog.className = "mowing-record-detail-dialog";
    overlay.appendChild(dialog);

    const closeOverlay = () => {
      overlay.remove();
      document.removeEventListener("keydown", onKeydown);
    };
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeOverlay();
    });
    const onKeydown = (event) => {
      if (event.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKeydown);

    const { start, end } = resolveMowingRecordTimeRange(record);
    const titleText = this.formatMowingDateRange(start, end);

    dialog.innerHTML = `
      <div class="mowing-record-detail-head">
        <div class="mowing-record-detail-title">${escapeHtml(titleText)}</div>
        <button type="button" class="mowing-record-detail-close" aria-label="${escapeHtml(this.t("close"))}">×</button>
      </div>
      <div class="mowing-record-detail-body">
        <div class="mowing-record-detail-status">${escapeHtml(this.t("mowingHistoryDetailLoading"))}</div>
      </div>
    `;
    dialog.querySelector(".mowing-record-detail-close").addEventListener("click", closeOverlay);

    const root = this.shadowRoot || document.body;
    root.appendChild(overlay);

    const body = dialog.querySelector(".mowing-record-detail-body");

    try {
      if (!this._hass?.connection) {
        throw new Error("Home Assistant connection unavailable");
      }
      const serviceData = {};
      if (areaUrl) serviceData.area_url = areaUrl;
      if (mapUrl) serviceData.map_url = mapUrl;
      if (pathUrl) serviceData.path_url = pathUrl;
      const entityId = this.entity?.entity_id;
      if (entityId) serviceData.entity_id = entityId;

      // Called via the raw websocket connection (not this._hass.callService)
      // because the card installs a callService wrapper for command-toast
      // feedback that only forwards 4 positional args and would silently
      // drop the return_response flag this call depends on.
      const result = await this._hass.connection.sendMessagePromise({
        type: "call_service",
        domain: "anthbot_map",
        service: "get_mowing_record_detail",
        service_data: serviceData,
        return_response: true,
      });
      const detail = result?.response || {};
      // The record row's x/y came back as small numbers (e.g. -8.23/-5.10)
      // that only line up with the map raster's mm-based world bounds when
      // treated as METERS and converted to mm (raster bounds are mm) --
      // hence the *1000 here.
      const anchorMetersX = Number(pickRecordValue(record, MOWING_RECORD_START_X_KEYS));
      const anchorMetersY = Number(pickRecordValue(record, MOWING_RECORD_START_Y_KEYS));
      const anchor = {
        x: Number.isFinite(anchorMetersX) ? anchorMetersX * 1000 : 0,
        y: Number.isFinite(anchorMetersY) ? anchorMetersY * 1000 : 0,
      };
      // Same garden photo the live map card underlays behind the
      // boundary/zones (config.image) -- reused here so the history popup's
      // zone schematic sits on the same familiar backdrop. Preloaded (and
      // its natural pixel size read) *before* rendering so the image can be
      // placed with the exact same affine fit the live map uses (see
      // renderMowingRecordZonesSvg) instead of a naive stretch-to-fit.
      const backgroundImage = this.config?.image ? await loadImageElement(this.config.image) : null;

      // Mirrors renderer.js's own draw() exactly (confirmed by reading it):
      // the live map does NOT feed the same world bounds into every
      // geometry blindly -- it prefers an explicit `config.bounds` override
      // when the user has set one, only falling back to a freshly computed
      // getWorldBounds() otherwise. And critically, it fits BOTH its
      // "base" (image) and calibrated (zones/path) geometries using the
      // *photo's own* aspect ratio, and applies the same view rotation
      // (config.rotation, plus the mobile auto-rotate) to both. Any of
      // these three that differ between the popup and the live map would
      // reproduce the "photo looks aligned-ish but isn't really" bug even
      // with the correct calibration numbers -- so all three are threaded
      // through here instead of recomputed independently.
      const mobileViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;
      const mobileRotation = mobileViewport
        ? Number(this.config.mobile_map_rotation ?? this.config.mobileMapRotation ?? 90) || 0
        : 0;
      const rotation = degreesToRadians((Number(this.config.rotation) || 0) + mobileRotation);

      // A record's own `area_url` snapshot is what got mowed *then*, but it
      // can differ slightly from the property's current live boundary/zone
      // data (re-mapped since, edge points refined, etc.) -- if the popup
      // computed its world bounds from that historical snapshot while the
      // live map computes its bounds from the CURRENT live state, the two
      // would end up scaled just enough differently to visibly mismatch
      // (Attila's "squeeze it together horizontally" report) even with
      // identical calibration numbers. So world bounds are computed here
      // from the exact same live inputs `updateRenderer()` feeds the live
      // renderer -- not from the historical record's own area data -- and
      // handed down already resolved, matching renderer.js's own
      // `bounds = this.config.bounds || getWorldBounds(mapSource, pose)`.
      const liveAttributes = this.entity?.attributes || {};
      const liveMapSource = {
        ...(liveAttributes.area_definition || {}),
        map_raster: liveAttributes.map_raster,
        map_definition: liveAttributes.map_definition,
        path_definition: liveAttributes.path_definition,
        map_binary_paths: liveAttributes.map_binary_paths,
        path_binary_paths: liveAttributes.path_binary_paths,
      };
      const livePose = this.computeLivePose(liveAttributes);
      const bounds = this.config?.bounds || getWorldBounds(liveMapSource, livePose);
      // Attila asked for the lawn's own boundary outline to also be visible
      // in the popup. First attempt used getBoundaryPaths() (map_binary_paths
      // -- the raw wire-perimeter/travel-route data), but Attila noticed it
      // cuts straight across the driveway/parking area: that vector path is
      // the "legacy boundary" the live map itself only draws when
      // showLegacyBoundary is explicitly turned on (normally off). What the
      // live map actually shows BY DEFAULT is a pixel-traced outline of the
      // `map_raster` mask (drawDecodedBoundary/drawRasterBoundary in
      // renderer.js) -- the real mapped-lawn silhouette, not the wire route.
      // boundaryRaster carries that live raster through so the popup can
      // trace the same outline; boundaryPaths is kept only as a fallback
      // for the (rare) case no live map_raster is available.
      const boundaryRaster = liveMapSource.map_raster;
      const boundaryPaths = getBoundaryPaths(liveMapSource);

      // Attila: the zones/coverage still read "too tall" vertically vs. the
      // live map, even with identical bounds/calibration. Root cause: the
      // live map's own "map" rect (computeMapFit's width/height/center) is
      // fit against the live CANVAS's own pixel width/height -- whatever
      // the card's actual on-screen box happens to be, which (with the
      // default `fit: "cover"`, or any configured fixed `height:`) can have
      // a different aspect ratio than the photo, causing the live view to
      // crop/zoom rather than show the whole world uncropped. The popup was
      // instead sizing its own SVG canvas to exactly match the photo's own
      // aspect ratio (zero letterboxing by construction) -- a DIFFERENT fit
      // than the live map's, so even identical bounds/calibration produced
      // a differently-cropped/zoomed picture. Reading the live renderer's
      // *actual* current canvas pixel size (and its `fit` mode) and reusing
      // both here reproduces the exact same "map" rect the live view uses.
      const liveCanvas = this.renderer?.canvas;
      const liveDpr = this.renderer?.dpr || 1;
      const canvasSize =
        liveCanvas && liveCanvas.width > 0 && liveCanvas.height > 0
          ? { width: liveCanvas.width / liveDpr, height: liveCanvas.height / liveDpr }
          : null;
      const fit = this.renderer?.options?.fit || this.config?.fit || "cover";

      this.renderMowingRecordDetailBody(body, detail, {
        pathRequested: Boolean(pathUrl),
        anchor,
        mowedZoneInfo: mowedZoneInfoFromRecord(record),
        // The card's own calibration (from the "Map fit" controls) -- the
        // same one the live map applies -- so the zone/image placement here
        // matches the live map instead of an independent, uncalibrated fit.
        calibration: this.calibration,
        // Separate, additional calibration knob (from the live map's own
        // "decoded boundary" fit controls) applied only to the raster-
        // traced boundary outline -- distinct from the main `calibration`
        // used for zones/coverage/photo. Threading it through is what lets
        // the traced outline land exactly where it does on the live map.
        decodedBoundaryCalibration: this.decodedBoundaryCalibration,
        backgroundImage,
        bounds,
        boundaryRaster,
        boundaryPaths,
        canvasSize,
        fit,
        rotation,
      });
    } catch (error) {
      body.innerHTML = `<div class="mowing-record-detail-status mowing-record-detail-error">${escapeHtml(String(error?.message || error))}</div>`;
    }
  }

  renderMowingRecordDetailBody(
    body,
    detail,
    {
      pathRequested = true,
      anchor = null,
      mowedZoneInfo = null,
      calibration = null,
      decodedBoundaryCalibration = null,
      backgroundImage = null,
      bounds = null,
      boundaryRaster = null,
      boundaryPaths = null,
      canvasSize = null,
      fit = "cover",
      rotation = 0,
    } = {}
  ) {
    body.innerHTML = "";
    let rendered = false;

    // The map file is just the mower's static lawn boundary (the same
    // outline every session) -- it does NOT show what got mowed *this*
    // session. That comes from the path file's decoded trajectory points,
    // which get drawn as a coverage overlay on top of whichever background
    // (raster or zone schematic) is available, or on their own if neither is.
    const pathPoints = extractDetailPathPoints(detail?.path, anchor);

    // Sanity guard: the delta+anchor reconstruction (see
    // extractDetailPathPoints) can still drift wildly if the struct-layout
    // guess is wrong for this record's path format -- drawing that as a
    // "coverage" line would be actively misleading (a stray line shooting
    // across the whole map), worse than showing nothing. Only draw it if
    // its extent is in the same ballpark as the raster's own world size.
    let pathLooksSane = true;
    const mapRaster = detail?.map?._map_raster;
    if (mapRaster?.bounds && pathPoints.length) {
      const pb = boundingBoxOf(pathPoints);
      const rb = mapRaster.bounds;
      const rasterSpanX = Number(rb.max_x ?? rb.maxX) - Number(rb.min_x ?? rb.minX);
      const rasterSpanY = Number(rb.max_y ?? rb.maxY) - Number(rb.min_y ?? rb.minY);
      if (Number.isFinite(rasterSpanX) && rasterSpanX > 0 && Number.isFinite(rasterSpanY) && rasterSpanY > 0) {
        pathLooksSane = pb.maxX - pb.minX <= rasterSpanX * 4 && pb.maxY - pb.minY <= rasterSpanY * 4;
      }
    }

    // Prefer the zone schematic (labeled rectangles/polygons, with the
    // zone(s) this record actually mowed highlighted) when zone data is
    // available -- this is the layout Attila's reference screenshot (the
    // real app's own history detail screen) uses, and it reads much better
    // than the raw boundary raster. Fall back to the raster picture, then
    // to a bare path plot, when there's no zone data to work with.
    if (detail?.area && typeof detail.area === "object") {
      const svg = renderMowingRecordZonesSvg(detail.area, pathLooksSane ? pathPoints : [], mowedZoneInfo, {
        backgroundImage,
        calibration,
        decodedBoundaryCalibration,
        bounds,
        boundaryRaster,
        boundaryPaths,
        canvasSize,
        fit,
        rotation,
      });
      if (svg) {
        const wrap = document.createElement("div");
        wrap.className = "mowing-record-detail-canvas-wrap";
        wrap.appendChild(svg);
        body.appendChild(wrap);
        rendered = true;
      }
    }

    if (!rendered && mapRaster && Array.isArray(mapRaster.runs) && mapRaster.width && mapRaster.height) {
      const canvas = renderMowingRecordRasterCanvas(mapRaster);
      if (canvas) {
        if (pathPoints.length && pathLooksSane) {
          drawDetailPathOnRasterCanvas(canvas, mapRaster, pathPoints);
        }
        const wrap = document.createElement("div");
        wrap.className = "mowing-record-detail-canvas-wrap";
        wrap.appendChild(canvas);
        body.appendChild(wrap);
        rendered = true;
      }
    }

    if (!rendered && pathPoints.length && pathLooksSane) {
      const svg = renderMowingRecordPathOnlySvg(pathPoints);
      if (svg) {
        const wrap = document.createElement("div");
        wrap.className = "mowing-record-detail-canvas-wrap";
        wrap.appendChild(svg);
        body.appendChild(wrap);
        rendered = true;
      }
    }

    if (!rendered) {
      const status = document.createElement("div");
      status.className = "mowing-record-detail-status";
      status.textContent = this.t("mowingHistoryDetailUnavailable");
      body.appendChild(status);
    }

    const errors = detail?._errors;
    if (Array.isArray(errors) && errors.length) {
      const errBox = document.createElement("div");
      errBox.className = "mowing-record-detail-error";
      errBox.textContent = errors.join(" | ");
      body.appendChild(errBox);
    }

  }

  formatMowingDateRange(start, end) {
    if (!start && !end) return this.t("mowingHistoryUnknownTime");
    const locale = this.language && this.language !== "auto" ? this.language : undefined;
    const dateFmt = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    const timeFmt = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" });
    if (start && !end) return dateFmt.format(start);
    if (end && !start) return dateFmt.format(end);
    const startLabel = start ? dateFmt.format(start) : "?";
    const endLabel = end ? timeFmt.format(end) : "?";
    return `${startLabel} – ${endLabel}`;
  }

  formatRecordMode(value) {
    const normalized = String(value).toLowerCase();
    // Confirmed against the mobile app (2026-08-19): the cloud's numeric
    // mow_mode "1" is shown by the app as "Zónák" (zone mowing), not "Teljes
    // terület" as previously (incorrectly) guessed. "0" is assumed to be the
    // complementary full-area mow since it's the only other observed value.
    if (normalized === "1") return this.t("mowingModeZones");
    if (normalized === "0") return this.t("mowingModeGlobal");
    if (normalized.includes("zone") || normalized.includes("zona")) return this.t("mowingModeZones");
    if (normalized.includes("edge") || normalized.includes("border") || normalized.includes("szeg")) return this.t("mowingModeEdge");
    if (normalized.includes("dock")) return this.t("mowingModeDockEdge");
    if (normalized.includes("global") || normalized.includes("all") || normalized.includes("entire")) return this.t("mowingModeGlobal");
    return String(value);
  }

  formatRecordSource(value) {
    const normalized = String(value).toLowerCase();
    if (normalized === "1") return this.t("mowingSourceApp");
    if (normalized.includes("app")) return this.t("mowingSourceApp");
    if (normalized.includes("sched") || normalized.includes("plan") || normalized.includes("timer")) {
      return this.t("mowingSourceSchedule");
    }
    if (normalized.includes("button") || normalized.includes("key") || normalized.includes("manual")) {
      return this.t("mowingSourceButton");
    }
    if (normalized.includes("voice")) return this.t("mowingSourceVoice");
    return String(value).toUpperCase();
  }

  createPanelGrid() {
    const grid = document.createElement("div");
    grid.className = "panel-grid";
    return grid;
  }

  settingsStorageKey() {
    return `anthbot-map-open-settings-${this.entityBase()}`;
  }

  readOpenSettingsKey() {
    return window.localStorage.getItem(this.settingsStorageKey()) || "global";
  }

  createSettingsSection(title, key, defaultOpen = false) {
    const details = document.createElement("details");
    details.className = "settings-section";
    details.dataset.settingsKey = key;
    details.open = this.readOpenSettingsKey() === key
      || (defaultOpen && !window.localStorage.getItem(this.settingsStorageKey()));
    details.innerHTML = `<summary>${title}</summary><div class="settings-section-body"></div>`;
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      window.localStorage.setItem(this.settingsStorageKey(), key);
      this.shadowRoot.querySelectorAll("details.settings-section").forEach((item) => {
        if (item !== details) item.open = false;
      });
    });
    return details;
  }

  createCommandTile(title, subtitle, command) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `panel-tile garden-command-tile ${command}`;
    tile.innerHTML = `<strong>${title}</strong><span>${subtitle}</span>`;
    tile.addEventListener("click", () => this.handleCommand(command));
    return tile;
  }

  createInfoTile(label, key) {
    const entity = this.getRelatedEntity(key);
    const tile = document.createElement("div");
    tile.className = "panel-tile info-tile";
    tile.innerHTML = `<span>${label}</span><strong>${this.formatEntity(entity, key)}</strong>`;
    return tile;
  }

  createLanguageControl() {
    const tile = document.createElement("label");
    tile.className = "panel-tile language-tile";
    const title = document.createElement("span");
    title.textContent = this.t("language");
    const select = document.createElement("select");
    select.setAttribute("aria-label", this.t("language"));
    for (const [code, name] of LANGUAGES) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code === "auto" ? this.t("automatic") : name;
      option.selected = code === this.selectedLanguage;
      select.appendChild(option);
    }
    select.addEventListener("change", () => {
      this.selectedLanguage = select.value;
      this.languageOverride = true;
      this.config = { ...this.config, language: select.value };
      window.localStorage.setItem("anthbot-map-language", select.value);
      this.saveInterfaceSettings();
      this.render();
    });
    tile.append(title, select);
    return tile;
  }

  createMowHeightControl() {
    const key = "mowHeight";
    const entityId = this.getNumberEntity(key);
    const entity = entityId ? this._hass.states[entityId] : null;
    const value = this.displayedNumberValue(key, Number(entity?.state));
    const selected = Number.isFinite(value) ? Math.max(30, Math.min(70, Math.round(value / 5) * 5)) : 50;
    const tile = document.createElement("div");
    tile.className = "panel-tile control-tile mow-height-tile";
    tile.innerHTML = `
      <div class="control-head">
        <span>${this.t("cutHeight")}</span>
        <strong>${selected} mm</strong>
      </div>
      <div class="height-options" role="group" aria-label="${this.t("cutHeight")}"></div>
    `;
    const options = tile.querySelector(".height-options");
    for (let height = 30; height <= 70; height += 5) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "height-option";
      button.textContent = String(height);
      button.classList.toggle("active", height === selected);
      button.disabled = !(entityId || this.hasSettingFallback(key));
      button.addEventListener("click", () => {
        options.querySelectorAll(".height-option").forEach((item) => item.classList.toggle("active", item === button));
        this.applyOptimisticNumber(key, height, button);
        this.setNumberEntity(key, entityId, height, button);
      });
      options.appendChild(button);
    }
    return tile;
  }

  createNumberControl(label, key, min, max, step, unit) {
    const entityId = this.getNumberEntity(key);
    const entity = entityId ? this._hass.states[entityId] : null;
    const value = this.displayedNumberValue(key, Number(entity?.state));
    const tile = document.createElement("div");
    tile.className = "panel-tile control-tile";
    tile.innerHTML = `
      <div class="control-head">
        <span>${label}</span>
        <strong>${Number.isFinite(value) ? value : "-"} ${unit}</strong>
      </div>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${Number.isFinite(value) ? value : min}" ${entityId || this.hasSettingFallback(key) ? "" : "disabled"}>
    `;
    const input = tile.querySelector("input");
    input.addEventListener("input", () => this.applyOptimisticNumber(key, Number(input.value), input));
    input.addEventListener("change", () => this.setNumberEntity(key, entityId, Number(input.value), input));
    return tile;
  }

  createSwitchControl(label, key) {
    const entityId = this.getSwitchEntity(key);
    const entity = entityId ? this._hass.states[entityId] : null;
    const checked = entity?.state === "on";
    const tile = document.createElement("label");
    tile.className = "panel-tile switch-tile";
    tile.title = entityId || this.t("switchMissing");
    tile.innerHTML = `
      <span>${label}</span>
      <input type="checkbox" ${checked ? "checked" : ""} ${entityId ? "" : "disabled"}>
    `;
    const input = tile.querySelector("input");
    input.addEventListener("change", () => this.toggleSwitchEntity(key, entityId, input.checked, input));
    return tile;
  }

  createMapOverlaySwitch(label, key) {
    const checked = Boolean(this[key]);
    const tile = document.createElement("label");
    tile.className = "panel-tile switch-tile";
    tile.innerHTML = `
      <span>${label}</span>
      <input type="checkbox" ${checked ? "checked" : ""}>
    `;
    const input = tile.querySelector("input");
    input.addEventListener("change", () => this.setMapOverlayVisibility(key, input.checked));
    return tile;
  }

  createInterfaceSwitch(label, key) {
    const tile = document.createElement("label");
    tile.className = "panel-tile switch-tile";
    tile.innerHTML = `
      <span>${label}</span>
      <input type="checkbox" ${this[key] ? "checked" : ""}>
    `;
    tile.querySelector("input").addEventListener("change", (event) => {
      this.setInterfaceOption(key, event.target.checked);
    });
    return tile;
  }

  renderZoneControls(areaDefinition = {}) {
    const container = this.shadowRoot.querySelector('[data-role="garden-zone-controls"]');
    if (!container) {
      return;
    }

    container.innerHTML = "";
    for (const zone of this.currentZones(areaDefinition)) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = zone.name || `${this.t("zone")} ${zone.id}`;
      button.addEventListener("click", () => this.startZone(zone));
      container.appendChild(button);
    }
  }

  currentZones(areaDefinition = this.entity?.attributes?.area_definition || {}) {
    const zones = Array.isArray(areaDefinition?.custom_areas) ? areaDefinition.custom_areas : [];
    return zones.filter((zone) => zone?.id !== undefined && zone?.id !== null);
  }

  rendererOptions() {
    const mobileViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;
    const mobileRotation = mobileViewport
      ? Number(this.config.mobile_map_rotation ?? this.config.mobileMapRotation ?? 90) || 0
      : 0;
    return {
      image: this.config.image,
      bounds: this.config.bounds,
      fit: mobileViewport
        ? (this.config.mobile_map_fit || this.config.mobileMapFit || "contain")
        : (this.config.fit || "cover"),
      rotation: degreesToRadians((Number(this.config.rotation) || 0) + mobileRotation),
      irrigationDirectionRotationCorrection: degreesToRadians(-2 * mobileRotation),
      calibration: this.calibration,
      robotCalibration: this.robotCalibration,
      mowingPathCalibration: this.mowingPathCalibration,
      decodedBoundaryCalibration: this.decodedBoundaryCalibration,
      robotImage: this.config.robot_image || this.config.robotImage || ROBOT_IMAGE,
      noGoLabel: this.t("forbidden"),
      showNoGoZones: this.showNoGoZones,
      showNoGoLabels: this.showNoGoLabels,
      robotSize: mobileViewport
        ? (this.config.mobile_robot_size ?? this.config.mobileRobotSize ?? 24)
        : (this.config.robot_size ?? this.config.robotSize),
      robotImageRotation: this.config.robot_image_rotation ?? this.config.robotImageRotation,
      robotHeadingSource: this.config.robot_heading_source || this.config.robotHeadingSource,
      robotHeadingOffset: this.robotHeadingOffset,
      robotMowingHeadingOffset: this.config.robot_mowing_heading_offset ?? this.config.robotMowingHeadingOffset,
      showMowedPath: this.config.show_mowed_path !== false,
      showMowedCoverage: this.config.show_mowed_coverage !== false && this.config.showMowedCoverage !== false,
      // Use only the official Anthbot cloud task path. Never mix in a
      // browser-generated live trail or a locally cached fallback.
      mowedPathSource: "cloud",
      mowedPathColor: this.config.mowed_path_color || this.config.mowedPathColor,
      mowedPathWidth: this.config.mowed_path_width ?? this.config.mowedPathWidth,
      mowedCoverageColor: this.config.mowed_coverage_color || this.config.mowedCoverageColor,
      mowedCoverageWidth: this.config.mowed_coverage_width ?? this.config.mowedCoverageWidth,
      mowedPathStorageKey: null,
      showBoundary: this.config.show_boundary !== false,
      showLegacyBoundary: this.config.show_legacy_boundary === true || this.config.showLegacyBoundary === true,
      showDecodedBoundary: this.showDecodedBoundary,
      showZones: this.showZones,
      transparentBackground: this.transparentBackground,
      boundaryColor: this.config.boundary_color || this.config.boundaryColor,
      boundaryWidth: this.config.boundary_width ?? this.config.boundaryWidth,
      charger: this.config.charger,
      irrigationHeads: mergeSavedIrrigationItems(
        this.yamlIrrigationConfig?.heads,
        this.irrigationCard?.heads,
      ),
      irrigationDripLines: mergeSavedIrrigationItems(
        this.yamlIrrigationConfig?.drip_lines,
        this.irrigationCard?.dripLines,
      ),
      irrigationZones: this.irrigationZones(),
      showIrrigationHeads: this.activeSystem === "irrigation" || this.irrigationZones().some((zone) => zone.active),
      irrigationEditMode: Boolean(this.irrigationCard?.editMode),
      irrigationSelectedHeadId: this.selectedIrrigationHeadId,
      irrigationEditType: this.irrigationEditType,
      irrigationActiveZone: Number(this.irrigationCard?.activeZone || 1),
      irrigationPendingDripStart: this.pendingDripStart,
    };
  }

  startRefreshTimer() {
    if (!this._hass || this.refreshTimer || this.config.refresh_interval === 0) {
      return;
    }

    const interval = Math.max(1, Number(this.config.refresh_interval ?? this.config.refreshInterval ?? 2)) * 1000;
    this.refreshTimer = window.setInterval(() => this.refreshEntities(), interval);
  }

  stopRefreshTimer() {
    if (this.refreshTimer) {
      window.clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  async refreshEntities() {
    if (!this._hass || this.refreshInFlight || !this.activeEntityId()) {
      return;
    }

    this.refreshInFlight = true;
    try {
      await this._hass.callService("homeassistant", "update_entity", {
        entity_id: this.refreshEntityIds(),
      });
    } catch (error) {
      console.warn("Anthbot map refresh failed", error);
    } finally {
      this.refreshInFlight = false;
      this.syncEntityAndRenderer();
      window.setTimeout(() => this.syncEntityAndRenderer(), 750);
      window.setTimeout(() => this.syncEntityAndRenderer(), 1800);
    }
  }

  syncEntityAndRenderer() {
    if (!this._hass || !this.config?.entity) {
      return;
    }
    this.activeMapEntityId = this.resolveActiveMapEntity();
    const latestEntity = this._hass.states[this.activeEntityId()];
    if (latestEntity) {
      this.entity = latestEntity;
      this.updateRenderer();
    }
  }

  refreshEntityIds() {
    return [
      this.activeEntityId(),
      this.getRelatedEntity("status")?.entity_id,
      this.getRelatedEntity("battery")?.entity_id,
      this.getRelatedEntity("charging")?.entity_id,
      this.getRelatedEntity("mowingArea")?.entity_id,
      this.getRelatedEntity("mowingTime")?.entity_id,
      this.getRelatedEntity("poseYaw")?.entity_id,
    ].filter(Boolean);
  }

  async handleCommand(command) {
    const customAction = this.config.button_actions?.[command] || this.config.buttonActions?.[command];
    if (customAction) {
      await this.callCustomButtonAction(command, customAction);
      return;
    }

    const buttonEntity = this.getControlEntity(command);
    if (buttonEntity) {
      const serviceByCommand = {
        start: "start_full_mow",
        stop: "stop_mow",
        dock: "return_to_dock",
        "outer-edge": "start_outer_edge_mow",
        "dock-edge": "start_dock_edge_mow",
      };
      await this.executeAnthbotButton(buttonEntity, serviceByCommand[command]);
      return;
    }

    const serviceByCommand = {
      connect: "connect_cloud",
      start: "start_full_mow",
      stop: "stop_mow",
      dock: "return_to_dock",
      "outer-edge": "start_outer_edge_mow",
      "dock-edge": "start_dock_edge_mow",
    };
    const service = serviceByCommand[command];
    if (service) {
      await this.callAnthbotService(service);
    }
  }

  async startZone(zone) {
    const buttonEntity = this.getZoneButtonEntity(zone);
    if (buttonEntity) {
      await this.executeAnthbotButton(
        buttonEntity,
        "start_zone_mow",
        zone?.name || `${this.t("zone")} ${zone?.id || ""}`.trim(),
      );
      return;
    }
    await this.callAnthbotService("start_zone_mow", { zones: String(zone.id ?? zone.name) });
  }

  async executeAnthbotButton(buttonEntity, service, label = this.commandLabel(service)) {
    if (!service) {
      await this._hass.callService("button", "press", {}, { entity_id: buttonEntity });
      this.scheduleRefresh(200);
      return;
    }
    const token = this.beginCommandFeedback(service, label);
    try {
      await this._hass.callService("button", "press", {}, { entity_id: buttonEntity });
      this.showCommandFeedback(this.feedback("commandCloudAccepted", label));
      this.scheduleRefresh(200);
      void this.waitForCommandConfirmation(service, label, token);
    } catch (error) {
      this.showCommandFeedback(this.feedback("commandCloudRejected", label));
      throw error;
    }
  }

  async callAnthbotService(service, data = {}) {
    const label = this.commandLabel(service);
    const token = this.beginCommandFeedback(service, label);
    try {
      const domain = ["anthbot_map", "anthbot_genie_plus", "anthbot_ha"]
        .find((candidate) => this._hass?.services?.[candidate]?.[service])
        || "anthbot_genie_plus";
      await this._hass.callService(domain, service, {
        ...data,
        entity_id: this.activeEntityId(),
      });
      this.showCommandFeedback(this.feedback("commandCloudAccepted", label));
      this.scheduleRefresh(200);
      void this.waitForCommandConfirmation(service, label, token);
    } catch (error) {
      this.showCommandFeedback(this.feedback("commandCloudRejected", label));
      throw error;
    }
  }

  beginCommandFeedback(service, label) {
    const token = ++this.commandConfirmationToken;
    this.pendingCommandFeedback = { service, label, token };
    this.showCommandFeedback(this.feedback("commandSentWaiting", label));
    return token;
  }

  showCommandFeedback(message) {
    const id = "garden-map-anthbot-command-feedback";
    document.getElementById(id)?.remove();
    const toast = document.createElement("div");
    toast.id = id;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = String(message || "");
    Object.assign(toast.style, {
      position: "fixed",
      zIndex: "2147483647",
      top: "70px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "max-content",
      maxWidth: "calc(100vw - 24px)",
      boxSizing: "border-box",
      padding: "9px 14px",
      border: "1px solid rgba(255,255,255,.45)",
      borderRadius: "10px",
      background: "rgba(2,119,189,.92)",
      color: "#fff",
      boxShadow: "0 5px 18px rgba(0,0,0,.32)",
      font: "700 14px sans-serif",
      textAlign: "center",
      pointerEvents: "none",
    });
    document.body.appendChild(toast);
    window.setTimeout(() => {
      if (document.getElementById(id) === toast) toast.remove();
    }, 8000);
  }

  commandLabel(service) {
    return ({
      start_full_mow: this.t("startLabel"),
      start_zone_mow: this.t("zoneStart"),
      start_outer_edge_mow: this.t("commandOuterEdge"),
      start_dock_edge_mow: this.t("commandDockEdge"),
      stop_mow: this.t("stopLabel"),
      return_to_dock: this.t("homeLabel"),
      connect_cloud: this.t("cloud"),
    })[service] || service;
  }

  feedback(key, command) {
    return this.t(key).replaceAll("{command}", command);
  }

  commandStatusValues() {
    const entity = this._hass?.states?.[this.activeEntityId()];
    const attributes = entity?.attributes || {};
    const robotState = attributes.robot_sta;
    const values = [
      this.getRelatedEntity("status")?.state,
      attributes.mower_status,
      attributes.robot_status_raw,
      typeof robotState === "object" ? robotState?.value : robotState,
      entity?.state,
    ];
    for (const [entityId, state] of Object.entries(this._hass?.states || {})) {
      if (state?.state === "unavailable") continue;
      if (!(entityId.startsWith("lawn_mower.")
          || entityId.includes("mower_status")
          || entityId.includes("robot_status"))) continue;
      values.push(
        state.state,
        state.attributes?.mower_status,
        state.attributes?.robot_status_raw,
        state.attributes?.robot_sta?.value,
      );
    }
    return values.map((value) => String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ""));
  }

  commandIsConfirmed(service) {
    const expected = ({
      start_full_mow: ["mowing", "globalmowing", "working", "cutting", "nyiras", "funyiras"],
      start_zone_mow: ["mowing", "zonemowing", "regionmowing", "working", "cutting", "nyiras", "funyiras", "zonanyiras"],
      start_outer_edge_mow: ["mowing", "bordermowing", "edgemowing", "edgecutting", "working", "szegelynyiras"],
      start_dock_edge_mow: ["mowing", "nestmowing", "working", "tolto", "kornyekeneknyirasa"],
      stop_mow: ["paused", "pause", "standby", "idle", "charging", "charge", "docked", "szunetel", "keszenlet", "toltes", "dokkolva"],
      return_to_dock: ["returning", "backtodock", "returntodock", "docking", "charging", "charge", "docked", "visszaatoltore", "toltes", "dokkolva"],
    })[service];
    return Array.isArray(expected) && this.commandStatusValues().some((status) =>
      expected.some((value) => status.includes(value)),
    );
  }

  async waitForCommandConfirmation(service, label = this.commandLabel(service), token = this.commandConfirmationToken) {
    if (service === "connect_cloud") return;
    const deadline = Date.now() + 20000;
    while (token === this.commandConfirmationToken && Date.now() < deadline) {
      await new Promise((resolve) => window.setTimeout(resolve, 1000));
      await this.refreshEntities();
      if (this.commandIsConfirmed(service)) {
        this.showCommandFeedback(this.feedback("commandConfirmed", label));
        this.pendingCommandFeedback = null;
        return;
      }
    }
    if (token === this.commandConfirmationToken) {
      this.showCommandFeedback(this.feedback("commandNotConfirmed", label));
      this.pendingCommandFeedback = null;
    }
  }

  async setNumberEntity(kind, entityId, value, input) {
    if (!Number.isFinite(value)) {
      return;
    }
    this.applyOptimisticNumber(kind, value, input);
    try {
      if (this.hasSettingFallback(kind)) {
        await this.callSettingFallback(kind, value);
      } else if (entityId) {
        await this._hass.callService("number", "set_value", { entity_id: entityId, value });
        this.scheduleRefresh();
      } else {
        throw new Error(`No setting target found for ${kind}`);
      }
    } catch (error) {
      if (input) {
        const previous = this.getNumberEntity(kind);
        const state = previous ? this._hass.states[previous] : null;
        if (state) {
          input.value = Number(state.state);
        }
      }
      this.notify(`${this.t("settingFailed")}: ${entityId || kind}`);
      throw error;
    }
  }

  async toggleSwitchEntity(kind, entityId, checked, input) {
    if (!entityId && !this.hasSwitchFallback(kind)) {
      this.notify(`${this.t("switchMissing")}: ${kind}`);
      return;
    }
    try {
      if (this.hasSwitchFallback(kind)) {
        await this.callSwitchFallback(kind, checked);
      } else {
        await this._hass.callService("switch", checked ? "turn_on" : "turn_off", { entity_id: entityId });
        this.scheduleRefresh();
      }
    } catch (error) {
      if (input) {
        input.checked = !checked;
      }
      this.notify(`${this.t("operationFailed")}: ${entityId}`);
      throw error;
    }
  }

  hasSettingFallback(kind) {
    return ["mowHeight", "mowDirection", "rainContinue", "voiceVolume"].includes(kind);
  }

  async callSettingFallback(kind, value) {
    const fallback = {
      mowHeight: ["set_mow_height", { mow_height: value }],
      mowDirection: ["set_custom_mowing_direction", { mow_direction: value, enable_custom_direction: true }],
      rainContinue: ["set_rain_continue_time", { rain_continue_time: value }],
      voiceVolume: ["set_voice_volume", { voice_volume: value }],
    }[kind];
    if (!fallback) {
      throw new Error(`No fallback service for ${kind}`);
    }
    await this.callAnthbotService(fallback[0], fallback[1]);
    this.scheduleRefresh();
  }

  hasSwitchFallback(kind) {
    return ["rain", "customDirection"].includes(kind);
  }

  async callSwitchFallback(kind, checked) {
    const fallback = {
      rain: ["set_rain_perception", { enable_rain_perception: checked }],
      customDirection: ["set_custom_mowing_direction", {
        mow_direction: Number(this.getNumberEntity("mowDirection") ? this._hass.states[this.getNumberEntity("mowDirection")]?.state : 0) || 0,
        enable_custom_direction: checked,
      }],
    }[kind];
    if (!fallback) {
      throw new Error(`No fallback service for ${kind}`);
    }
    await this.callAnthbotService(fallback[0], fallback[1]);
    this.scheduleRefresh();
  }

  applyOptimisticNumber(kind, value, input) {
    if (Number.isFinite(value)) {
      this.optimisticSettings.set(kind, { value, until: Date.now() + 10000 });
    }
    const tile = input?.closest(".control-tile");
    const valueLabel = tile?.querySelector(".control-head strong");
    const units = {
      mowHeight: "mm",
      mowDirection: "deg",
      rainContinue: "h",
      voiceVolume: "%",
    };
    if (valueLabel) {
      valueLabel.textContent = `${value} ${units[kind] || ""}`.trim();
    }
  }

  async callCustomButtonAction(command, action) {
    const definition = typeof action === "string" ? { service: action } : action;
    const serviceName = definition?.service;
    if (typeof serviceName !== "string" || !serviceName.includes(".")) {
      throw new Error(`Invalid custom action for ${command}`);
    }

    const separator = serviceName.indexOf(".");
    const domain = serviceName.slice(0, separator);
    const service = serviceName.slice(separator + 1);
    const data = definition.data || definition.service_data || {};
    const target = definition.target || {};

    try {
      await this._hass.callService(domain, service, data, target);
    } catch (error) {
      this.notify(`${this.t("operationFailed")}: ${serviceName}`);
      throw error;
    }
  }

  displayedNumberValue(kind, entityValue) {
    const optimistic = this.optimisticSettings.get(kind);
    if (optimistic && optimistic.until > Date.now()) {
      return optimistic.value;
    }
    this.optimisticSettings.delete(kind);
    return entityValue;
  }

  scheduleRefresh(delay = 1200) {
    window.clearTimeout(this.pendingRefreshTimer);
    this.pendingRefreshTimer = window.setTimeout(() => this.refreshEntities(), delay);
  }

  async connectCloudQuietly() {
    try {
      await this._hass.callService("anthbot_genie_plus", "connect_cloud", {
        entity_id: this.activeEntityId(),
      });
    } catch (error) {
      console.warn("Anthbot cloud connect failed before setting update", error);
    }
  }

  handleAction(action) {
    if (action === "zoom-in") {
      this.renderer.view.zoom = Math.min(8, this.renderer.view.zoom * 1.15);
      this.renderer.draw();
    } else if (action === "zoom-out") {
      this.renderer.view.zoom = Math.max(0.2, this.renderer.view.zoom / 1.15);
      this.renderer.draw();
    } else if (action === "rotate-left") {
      this.renderer.rotate(-Math.PI / 18);
    } else if (action === "rotate-right") {
      this.renderer.rotate(Math.PI / 18);
    } else if (action === "reset") {
      this.calibration = resetCalibration();
      this.robotCalibration = resetCalibration();
      this.mowingPathCalibration = resetCalibration();
      this.robotHeadingOffset = 0;
      this.renderer.setCalibration(this.calibration);
      this.renderer.setRobotCalibration(this.robotCalibration);
      this.renderer.setMowingPathCalibration(this.mowingPathCalibration);
      this.renderer.setOptions(this.rendererOptions());
      this.renderer.resetView();
      this.updateYaml();
    } else if (action === "reset-robot") {
      this.robotCalibration = resetCalibration();
      this.renderer.setRobotCalibration(this.robotCalibration);
      this.updateYaml();
    } else if (action === "reset-mowing-path") {
      this.mowingPathCalibration = resetCalibration();
      this.renderer.setMowingPathCalibration(this.mowingPathCalibration);
      this.updateYaml();
    } else if (action === "reset-robot-heading") {
      this.robotHeadingOffset = 0;
      this.renderer.setOptions(this.rendererOptions());
      this.updateYaml();
    } else if (action === "reset-boundary") {
      this.decodedBoundaryCalibration = resetCalibration();
      this.renderer?.setDecodedBoundaryCalibration(this.decodedBoundaryCalibration);
      this.updateYaml();
    } else if (action === "copy-yaml") {
      this.copyYaml();
    } else if (action === "close-map") {
      this.setMapExpanded(false);
    }
  }

  setMapOverlayVisibility(key, visible) {
    this[key] = Boolean(visible);
    this.mapOverlayOverrides[key] = true;
    this.renderer?.setOptions({
      showDecodedBoundary: this.showDecodedBoundary,
      showZones: this.showZones,
      showNoGoZones: this.showNoGoZones,
      showNoGoLabels: this.showNoGoLabels,
    });
    this.saveInterfaceSettings();
    this.updateYaml();
  }

  interfaceStorageKey(entity = this.config.entity) {
    return `anthbot-map-interface:${entity || "default"}`;
  }

  mowedPathStorageKey(entity = this.config.entity) {
    return `garden-map-mowed-path:${entity || "default"}`;
  }

  readInterfaceSettings(entity) {
    try {
      return JSON.parse(window.localStorage.getItem(this.interfaceStorageKey(entity)) || "{}") || {};
    } catch (_error) {
      return {};
    }
  }

  saveInterfaceSettings() {
    window.localStorage.setItem(this.interfaceStorageKey(), JSON.stringify({
      mapOnly: this.mapOnly,
      themeBackground: this.themeBackground,
      glassBackground: this.glassBackground,
      transparentBackground: this.transparentBackground,
      language: this.selectedLanguage,
      languageOverride: this.languageOverride,
      showDecodedBoundary: this.showDecodedBoundary,
      showZones: this.showZones,
      showNoGoZones: this.showNoGoZones,
      showNoGoLabels: this.showNoGoLabels,
      mapOverlayOverrides: this.mapOverlayOverrides,
    }));
  }

  setInterfaceOption(key, enabled) {
    this[key] = Boolean(enabled);
    if (enabled && key === "glassBackground") this.transparentBackground = false;
    if (enabled && key === "transparentBackground") this.glassBackground = false;
    if (key === "mapOnly") this.config = { ...this.config, map_only: this.mapOnly };
    if (key === "themeBackground") {
      this.config = { ...this.config, theme_background: this.themeBackground };
    }
    if (key === "glassBackground") {
      this.config = { ...this.config, glass_background: this.glassBackground, transparent_background: false };
    }
    if (key === "transparentBackground") {
      this.config = { ...this.config, transparent_background: this.transparentBackground, glass_background: false };
    }
    this.saveInterfaceSettings();
    this.render();
  }

  setMapExpanded(expanded) {
    this.mapExpanded = Boolean(expanded);
    this.shadowRoot?.querySelector("ha-card")?.classList.toggle("map-expanded", this.mapExpanded);
    requestAnimationFrame(() => this.renderer?.resize());
  }

  handleCalibration(action) {
    this.calibration = adjustCalibration(this.calibration, action, 1);
    this.renderer.setCalibration(this.calibration);
    this.updateYaml();
  }

  handleRobotCalibration(action) {
    this.robotCalibration = adjustCalibration(this.robotCalibration, action, 1);
    this.renderer.setRobotCalibration(this.robotCalibration);
    this.updateYaml();
  }

  handleMowingPathCalibration(action) {
    this.mowingPathCalibration = adjustCalibration(this.mowingPathCalibration, action, 1);
    this.renderer.setMowingPathCalibration(this.mowingPathCalibration);
    this.updateYaml();
  }

  handleRobotHeading(action) {
    const deltaByAction = {
      left: -15,
      right: 15,
      around: 180,
    };
    const delta = deltaByAction[action];
    if (!Number.isFinite(delta)) return;
    this.robotHeadingOffset = ((this.robotHeadingOffset + delta + 180) % 360 + 360) % 360 - 180;
    this.renderer.setOptions(this.rendererOptions());
    this.updateYaml();
  }

  handleBoundaryCalibration(action) {
    this.decodedBoundaryCalibration = adjustCalibration(this.decodedBoundaryCalibration, action, 1);
    this.renderer?.setDecodedBoundaryCalibration(this.decodedBoundaryCalibration);
    this.updateYaml();
  }

  updateYaml() {
    const yaml = this.shadowRoot?.querySelector('[data-role="yaml"]');
    if (yaml) {
      yaml.value = cardToYaml(
        this.configForYaml(),
        this.calibration,
        this.robotCalibration,
        this.decodedBoundaryCalibration,
        this.mowingPathCalibration,
      );
    }
  }

  async copyYaml() {
    const yaml = cardToYaml(
      this.configForYaml(),
      this.calibration,
      this.robotCalibration,
      this.decodedBoundaryCalibration,
      this.mowingPathCalibration,
    );
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(yaml);
      return;
    }

    const input = this.shadowRoot?.querySelector('[data-role="yaml"]');
    input?.select();
    document.execCommand("copy");
  }

  configForYaml() {
    return {
      ...this.config,
      map_only: this.mapOnly,
      theme_background: this.themeBackground,
      glass_background: this.glassBackground,
      transparent_background: this.transparentBackground,
      language: this.selectedLanguage,
      robot_heading_offset: this.robotHeadingOffset,
      show_decoded_boundary: this.showDecodedBoundary,
      show_zones: this.showZones,
      show_no_go_zones: this.showNoGoZones,
      show_no_go_labels: this.showNoGoLabels,
    };
  }

  getControlEntity(command) {
    const configured = this.config.controls?.[command];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return configured;
    }

    const suffixByCommand = {
      start: ["start_full_mow"],
      stop: ["stop_mow"],
      dock: ["return_to_dock"],
    };
    return this.findEntity("button", suffixByCommand[command] || []);
  }

  getZoneButtonEntity(zone) {
    const configured = this.config.zoneButtons?.[zone.id] || this.config.zoneButtons?.[zone.name];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return configured;
    }

    const zoneId = zone.id === undefined || zone.id === null ? null : String(zone.id);
    const zoneName = String(zone.name || "").trim();
    const normalizedName = slugify(zoneName);

    for (const [entityId, state] of Object.entries(this._hass.states || {})) {
      if (!entityId.startsWith("button.")) {
        continue;
      }
      const attrs = state.attributes || {};
      if (this.isEntityAvailable(entityId) && this.belongsToActiveRobot(entityId) && attrs.zone_type && zoneId !== null && String(attrs.id) === zoneId) {
        return entityId;
      }
      if (this.isEntityAvailable(entityId) && this.belongsToActiveRobot(entityId) && attrs.zone_type && normalizedName && slugify(attrs.name) === normalizedName) {
        return entityId;
      }
    }

    const base = this.entityBase();
    const visibleNumber = zoneName.match(/\d+/)?.[0];
    const suffixes = [
      zoneId ? `manual_zone_${zoneId}` : "",
      zoneId ? `auto_zone_${zoneId}` : "",
      zoneId ? `zone_${zoneId}` : "",
      normalizedName ? `zone_${normalizedName}` : "",
      normalizedName ? normalizedName : "",
      visibleNumber ? `zone_zone_${visibleNumber}` : "",
      visibleNumber ? `zone_${visibleNumber}` : "",
    ].filter(Boolean);

    for (const suffix of suffixes) {
      for (const candidate of [`button.${base}_${suffix}`, `button.${base}_${suffix}_2`]) {
        if (this.isEntityAvailable(candidate)) {
          return candidate;
        }
      }
    }

    for (const [entityId, state] of Object.entries(this._hass.states || {})) {
      if (!entityId.startsWith("button.") || !entityId.includes(base) || !this.isEntityAvailable(entityId)) {
        continue;
      }
      const entityName = slugify(entityId.slice("button.".length)).replace(/_\d+$/, "");
      const friendlyName = slugify(state.attributes?.friendly_name);
      if (normalizedName && (entityName.includes(normalizedName) || friendlyName.includes(normalizedName))) {
        return entityId;
      }
    }

    return null;
  }

  getRelatedEntity(kind) {
    const configured = this.config.entities?.[kind];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return this._hass.states[configured];
    }

    const mapped = ENTITY_MAP[kind];
    if (!mapped) {
      return null;
    }
    const entityId = this.findEntity(mapped[0], mapped[1]);
    return entityId ? this._hass.states[entityId] : null;
  }

  getNumberEntity(kind) {
    const configured = this.config.numbers?.[kind];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return configured;
    }
    return this.findEntity("number", NUMBER_MAP[kind] || []);
  }

  getSwitchEntity(kind) {
    const configured = this.config.switches?.[kind];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return configured;
    }

    return this.findEntity("switch", SWITCH_MAP[kind] || []);
  }

  findEntity(domain, suffixes) {
    const base = this.entityBase();
    for (const suffix of suffixes) {
      for (const candidate of [
        `${domain}.${base}_${suffix}`,
        `${domain}.${base}_${suffix}_2`,
      ]) {
        if (this.isEntityAvailable(candidate)) {
          return candidate;
        }
      }
    }

    for (const suffix of suffixes) {
      const wanted = slugify(`${base}_${suffix}`);
      for (const [entityId, state] of Object.entries(this._hass.states || {})) {
        if (!entityId.startsWith(`${domain}.`)) {
          continue;
        }
        const entitySlug = slugify(entityId.slice(domain.length + 1)).replace(/_\d+$/, "");
        const friendlySlug = slugify(state.attributes?.friendly_name);
        const suffixSlug = slugify(suffix);
        if (this.isEntityAvailable(entityId) && this.belongsToActiveRobot(entityId) && (entitySlug === wanted || entitySlug.endsWith(`_${suffixSlug}`) || friendlySlug.includes(suffixSlug))) {
          return entityId;
        }
      }
    }
    return null;
  }

  entityBase() {
    return String(this.activeEntityId() || this.config.entity || "")
      .replace(/^sensor\./, "")
      .replace(/_map(?:_\d+)?$/, "");
  }

  activeEntityId() {
    return this.activeMapEntityId || this.config.entity;
  }

  isEntityAvailable(entityId) {
    const entity = entityId && this._hass?.states?.[entityId];
    return Boolean(entity && String(entity.state).toLowerCase() !== "unavailable");
  }

  resolveActiveMapEntity() {
    const configured = String(this.config?.entity || "");
    const configuredState = this._hass?.states?.[configured];
    if (configuredState && configuredState.state !== "unavailable") {
      return configured;
    }

    const root = configured.replace(/_map(?:_\d+)?$/, "_map");
    const escapedRoot = root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`^${escapedRoot}(?:_(\\d+))?$`);
    const active = Object.entries(this._hass?.states || {})
      .map(([entityId, state]) => ({ entityId, state, match: entityId.match(pattern) }))
      .filter(({ state, match }) => match && state.state !== "unavailable")
      .sort((left, right) => Number(right.match?.[1] || 1) - Number(left.match?.[1] || 1));
    return active[0]?.entityId || configured;
  }

  belongsToActiveRobot(entityId) {
    if (!entityId) {
      return false;
    }
    const slug = String(entityId).replace(/^[^.]+\./, "");
    const base = this.entityBase();
    if (slug === base || slug.startsWith(`${base}_`)) {
      return true;
    }

    const mapAttributes = this._hass?.states?.[this.activeEntityId()]?.attributes || {};
    const attributes = this._hass?.states?.[entityId]?.attributes || {};
    const serial = mapAttributes.serial_number || mapAttributes.serial || mapAttributes.device_sn;
    return Boolean(serial && [attributes.serial_number, attributes.serial, attributes.device_sn].includes(serial));
  }

  formatEntity(entity, key = "") {
    if (!entity) {
      return "-";
    }
    if (key === "shadowUpdated") {
      return this.formatLocalDateTime(entity.state);
    }
    if (key === "mowingTime") {
      return this.formatDuration(entity.state);
    }
    const unit = entity.attributes?.unit_of_measurement;
    const value = this.translateStatus(entity.state);
    return unit ? `${value} ${unit}` : value;
  }

  formatDuration(value) {
    const totalSeconds = Math.max(0, Math.floor(Number(value)));
    if (!Number.isFinite(totalSeconds)) {
      return value || "-";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((part) => String(part).padStart(2, "0"))
      .join(":");
  }

  formatLocalDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value || "-";
    }

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const timeZone = this._hass?.config?.time_zone;
    if (timeZone) {
      options.timeZone = timeZone;
    }

    try {
      return new Intl.DateTimeFormat(this.language, options).format(date);
    } catch (_error) {
      delete options.timeZone;
      return new Intl.DateTimeFormat(undefined, options).format(date);
    }
  }

  translateStatus(status) {
    const key = `status_${status}`;
    const value = this.t(key);
    return value === key ? status : value;
  }

  resolveAsset(fileName) {
    const script = document.currentScript?.src || import.meta.url;
    return new URL(fileName, script).toString();
  }

  notify(message) {
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

const MOWING_RECORD_ID_KEYS = ["id", "record_id", "recordId", "task_id", "taskId", "_id"];
const MOWING_RECORD_START_KEYS = [
  "start_time", "startTime", "begin_time", "beginTime", "begin",
  "task_start_time", "taskStartTime", "create_time", "createTime",
  "started_at", "startedAt",
];
const MOWING_RECORD_END_KEYS = [
  "end_time", "endTime", "finish_time", "finishTime", "stop_time", "stopTime",
  "complete_time", "completeTime", "finished_at", "finishedAt",
];
const MOWING_RECORD_AREA_KEYS = [
  "area", "mow_area", "mowArea", "actual_area", "actualArea", "clean_area",
  "cleanArea", "cleaned_area", "cleanedArea", "real_area", "realArea",
  "task_area", "taskArea", "mowing_area", "mowingArea",
];
const MOWING_RECORD_PERCENT_KEYS = [
  "percent", "percentage", "progress", "complete_rate", "completeRate",
  "finish_rate", "finishRate", "mow_percent", "mowPercent",
  "task_percent", "taskPercent", "rate", "mowing_progress", "mowingProgress",
];
const MOWING_RECORD_DURATION_KEYS = [
  "duration_ms", "durationMs", "elapsed_ms", "elapsedMs",
  "mowing_time_ms", "mowingTimeMs", "task_time_ms", "taskTimeMs",
  "duration", "cost_time", "costTime", "time_len", "timeLen", "elapsed",
  "elapsed_time", "elapsedTime", "mowing_time", "mowingTime",
  "task_time", "taskTime", "work_time", "workTime", "mow_time", "mowTime",
];
const MOWING_RECORD_MODE_KEYS = [
  "mode", "mow_mode", "mowMode", "task_type", "taskType", "type",
  "task_mode", "taskMode",
];
const MOWING_RECORD_SOURCE_KEYS = [
  "source", "start_source", "startSource", "trigger", "task_source",
  "taskSource", "from", "start_type", "startType", "start_reason", "startReason",
  "start_cause", "startCause",
];
const MOWING_RECORD_AREA_URL_KEYS = ["area_url", "areaUrl"];
const MOWING_RECORD_MAP_URL_KEYS = ["map_url", "mapUrl"];
const MOWING_RECORD_PATH_URL_KEYS = ["path_url", "pathUrl"];
// The record row's own start position (confirmed present alongside
// mow_mode/finish_time in the /api/v1/device/area response) -- used as the
// anchor for the mgs-v1-history path format, whose points turned out to be
// per-sample deltas rather than absolute coordinates (see
// extractDetailPathPoints).
const MOWING_RECORD_START_X_KEYS = ["x", "X", "start_x", "startX"];
const MOWING_RECORD_START_Y_KEYS = ["y", "Y", "start_y", "startY"];
const MOWING_RECORD_ZONE_LIST_KEYS = [
  "zone_list", "zoneList", "zones", "region_list", "regionList",
  "area_list", "areaList", "task_zones", "taskZones", "zone_info", "zoneInfo",
];
const MOWING_RECORD_ZONE_NAME_KEYS = [
  "name", "zone_name", "zoneName", "region_name", "regionName",
  "area_name", "areaName", "title",
];
const MOWING_RECORD_ZONE_WIDTH_KEYS = ["width", "w", "zone_width", "zoneWidth"];
const MOWING_RECORD_ZONE_HEIGHT_KEYS = [
  "height", "h", "zone_height", "zoneHeight", "length", "zone_length", "zoneLength",
];
const MOWING_RECORD_ZONE_AREA_KEYS = ["area", "zone_area", "zoneArea", "actual_area", "actualArea", "size"];

const MOWING_RECORD_MAPPED_KEYS = [
  ...MOWING_RECORD_ID_KEYS, ...MOWING_RECORD_START_KEYS, ...MOWING_RECORD_END_KEYS,
  ...MOWING_RECORD_AREA_KEYS, ...MOWING_RECORD_PERCENT_KEYS, ...MOWING_RECORD_DURATION_KEYS,
  ...MOWING_RECORD_MODE_KEYS, ...MOWING_RECORD_SOURCE_KEYS, ...MOWING_RECORD_ZONE_LIST_KEYS,
];

// Builds a lookup (normalized zone name -> {name, dims}) from the mowing
// record's own `zone_list` field -- this is the app's own account of which
// zones were actually part of *this* session (matching the reference
// screenshot Attila shared, which highlights only the mowed zone(s) among
// the full property layout). Matched against the full zone polygons from
// the `area` file by name in renderMowingRecordZonesSvg.
function mowedZoneInfoFromRecord(record) {
  const zoneListRaw = pickRecordValue(record, MOWING_RECORD_ZONE_LIST_KEYS);
  const zoneList = Array.isArray(zoneListRaw) ? zoneListRaw : [];
  const info = new Map();
  for (const zone of zoneList) {
    const zoneName = pickRecordValue(zone, MOWING_RECORD_ZONE_NAME_KEYS);
    if (!zoneName) continue;
    const width = pickRecordValue(zone, MOWING_RECORD_ZONE_WIDTH_KEYS);
    const height = pickRecordValue(zone, MOWING_RECORD_ZONE_HEIGHT_KEYS);
    const zoneArea = pickRecordValue(zone, MOWING_RECORD_ZONE_AREA_KEYS);
    let dims = "";
    if (width !== undefined && height !== undefined) {
      dims = `${formatRecordNumber(width)}m × ${formatRecordNumber(height)}m`;
    } else if (zoneArea !== undefined) {
      dims = formatRecordArea(zoneArea);
    }
    info.set(String(zoneName).trim().toLowerCase(), { name: String(zoneName), dims });
  }
  return info;
}

function pickRecordValue(record, keys) {
  if (!record || typeof record !== "object") return undefined;
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function pickRecordEntry(record, keys) {
  if (!record || typeof record !== "object") return null;
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return { key, value };
  }
  return null;
}

function collectUnmappedRecordKeys(record, mappedKeys) {
  if (!record || typeof record !== "object") return [];
  const mapped = new Set(mappedKeys);
  return Object.keys(record).filter((key) => !mapped.has(key));
}

function parseRecordTimestamp(value) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "number") {
    const ms = value > 10_000_000_000 ? value : value * 1000;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{14}$/.test(trimmed)) {
      const year = trimmed.slice(0, 4), month = trimmed.slice(4, 6), day = trimmed.slice(6, 8);
      const hour = trimmed.slice(8, 10), minute = trimmed.slice(10, 12), second = trimmed.slice(12, 14);
      const date = new Date(Date.UTC(+year, +month - 1, +day, +hour, +minute, +second));
      return Number.isNaN(date.getTime()) ? null : date;
    }
    if (/^\d+$/.test(trimmed)) return parseRecordTimestamp(Number(trimmed));
    let isoCandidate = trimmed.replace(" ", "T");
    // The Anthbot cloud API returns timestamps such as finish_time in UTC but
    // without a "Z"/offset suffix (e.g. "2026-08-19T15:09:59"). Per the JS Date
    // spec, a date-time string with no timezone designator is parsed as LOCAL
    // time, which silently shifted every mowing-history time by the viewer's
    // UTC offset (confirmed against the mobile app: cloud said 15:09, app
    // showed 17:09 in UTC+2). Mark it UTC explicitly before parsing.
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(isoCandidate)) {
      isoCandidate += "Z";
    }
    const date = new Date(isoCandidate);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

// Paints a run-length-encoded coverage raster (the same format the live map
// uses for `_map_raster`, see renderer.js's getRasterCanvas) into a small
// standalone <canvas>, without needing the live renderer's calibrated
// world-to-screen geometry -- the history popup just needs the raw picture.
function rasterColorForRecordDetail(value) {
  if (value === 255) return [248, 250, 252, 255];
  if (value === 160) return [158, 166, 174, 255];
  if (value === 128) return [117, 125, 133, 255];
  if (value === 0) return [25, 32, 42, 255];
  const shade = Math.max(0, Math.min(255, Number(value) || 0));
  return [shade, shade, shade, 255];
}

// Resolves once the image has loaded (with its natural pixel size readable)
// or once it fails -- never rejects, so callers can `await` it plainly and
// treat a null result as "no background image available".
function loadImageElement(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function boundingBoxOf(points) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const point of points) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.y > maxY) maxY = point.y;
  }
  return { minX, minY, maxX, maxY };
}

// The Genie/MGS path format tags every sample with a `type`; these codes
// (mirrored from renderer.js's live-map trail filter) mark "blade engaged /
// actually cutting" points, as opposed to plain travel (blade off, e.g.
// driving to the start point or back to the dock).
const DETAIL_PATH_MOWED_TYPES = new Set([1, 2, 5, 8]);
// Consecutive mowed samples farther apart than this (in the same mm world
// units as the map raster bounds) are treated as a break -- e.g. the mower
// was carried, or the log jumps between two disjoint passes -- rather than
// drawn as a single straight line cutting across the whole map.
const DETAIL_PATH_JUMP_LIMIT_MM = 2500;

function isDetailPathMowedPoint(point, hasKnownMowedTypes) {
  // Historical files may omit type information. When at least one known
  // blade-engaged type is present, use the same filtering as the live map so
  // travel to/from the dock is not painted as mowed coverage. If no known type
  // occurs, preserve the complete path rather than rendering a blank detail.
  return !hasKnownMowedTypes || DETAIL_PATH_MOWED_TYPES.has(Number(point?.type));
}

// Pulls the decoded path points out of a `path` file definition (see
// api.py's `_decode_path_definition`) and drops anything without finite
// coordinates.
//
// 2026-08-21 history: a live hex dump of an "mgs-v1-history" path file
// showed the very first points sitting almost still (x~-98, y~5, barely
// moving for several samples) -- exactly what you'd expect right at the
// start of a session near the dock, NOT a per-sample delta pattern. The
// real bug turned out to be the coordinate scale: this format was using x1
// instead of the x10 every other format uses (now fixed in api.py). No
// cumulative summing/anchor needed -- the decoded x/y are already absolute
// positions in the same mm world frame as the map raster bounds. (The
// `anchor` parameter is kept, unused, in case a future format genuinely
// turns out to be delta-encoded.)
function extractDetailPathPoints(pathDefinition, _anchor = null) {
  const raw = pathDefinition?._path_points;
  if (!Array.isArray(raw)) return [];
  const points = [];
  for (const point of raw) {
    const x = Number(point?.x);
    const y = Number(point?.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    points.push({ x, y, type: point?.type, clean_time: point?.clean_time });
  }
  return points;
}

// Splits the raw point stream into disjoint polylines: drops travel-only
// (blade-off) points and starts a new segment whenever consecutive mowed
// points are implausibly far apart.
function buildDetailPathSegments(points, jumpLimit) {
  const segments = [];
  let segment = [];
  let previous = null;
  const hasKnownMowedTypes = points.some((point) =>
    DETAIL_PATH_MOWED_TYPES.has(Number(point?.type))
  );
  for (const point of points) {
    if (!isDetailPathMowedPoint(point, hasKnownMowedTypes)) {
      if (segment.length) segments.push(segment);
      segment = [];
      previous = null;
      continue;
    }
    const jumped = previous && Math.hypot(point.x - previous.x, point.y - previous.y) > jumpLimit;
    if (jumped && segment.length) {
      segments.push(segment);
      segment = [];
    }
    segment.push(point);
    previous = point;
  }
  if (segment.length) segments.push(segment);
  return segments.filter((entry) => entry.length >= 2);
}

// Converts a path point's world coordinates (mm, same frame the map
// raster's `bounds` are expressed in) into the raster canvas's raw pixel
// space, matching the same row flip `renderMowingRecordRasterCanvas` uses.
function projectWorldPointToRasterPixel(point, raster) {
  const bounds = raster?.bounds;
  const resolution = Number(raster?.resolution);
  const height = Number(raster?.height);
  if (!bounds || !Number.isFinite(resolution) || resolution <= 0 || !Number.isFinite(height)) {
    return null;
  }
  const minX = Number(bounds.min_x ?? bounds.minX);
  const minY = Number(bounds.min_y ?? bounds.minY);
  if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null;
  const resolutionMm = resolution * 1000;
  if (!Number.isFinite(resolutionMm) || resolutionMm <= 0) return null;
  const x = (point.x - minX) / resolutionMm;
  const y = height - 1 - (point.y - minY) / resolutionMm;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

// Draws the session's actual mowed coverage on top of the static boundary
// raster. Returns true if anything was drawn.
function drawDetailPathOnRasterCanvas(canvas, raster, pathPoints) {
  if (!canvas || !pathPoints.length) return false;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  const segments = buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM)
    .map((segment) => segment.map((point) => projectWorldPointToRasterPixel(point, raster)).filter(Boolean))
    .filter((segment) => segment.length >= 2);
  if (!segments.length) return false;

  const strokeWidth = Math.max(2, canvas.width * 0.012);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [color, width] of [
    ["rgba(82, 94, 245, 0.55)", strokeWidth],
    ["rgba(220, 226, 255, 0.7)", Math.max(1, strokeWidth * 0.35)],
  ]) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    for (const segment of segments) {
      ctx.beginPath();
      ctx.moveTo(segment[0].x, segment[0].y);
      for (const point of segment.slice(1)) ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }
  ctx.restore();
  return true;
}

// Appends the mowed-path polylines to an existing zone/path-only SVG, using
// raw world coordinates directly (the same unflipped convention the zone
// polygons already use, see renderMowingRecordZonesSvg).
function appendDetailPathPolylines(svg, pathPoints, strokeWidth) {
  const segments = buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM);
  if (!segments.length) return false;
  const svgNs = "http://www.w3.org/2000/svg";
  for (const segment of segments) {
    const line = document.createElementNS(svgNs, "polyline");
    line.setAttribute("points", segment.map((p) => `${p.x},${p.y}`).join(" "));
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "rgba(94, 224, 131, 0.85)");
    line.setAttribute("stroke-width", String(strokeWidth));
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-linejoin", "round");
    svg.appendChild(line);
  }
  return true;
}

// Standalone rendering for when only the path file decoded (no map raster,
// no area/zone data): plots the mowed-point bounding box on its own.
function renderMowingRecordPathOnlySvg(pathPoints) {
  const segments = buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM);
  if (!segments.length) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const segment of segments) {
    for (const point of segment) {
      if (point.x < minX) minX = point.x;
      if (point.x > maxX) maxX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.y > maxY) maxY = point.y;
    }
  }
  if (![minX, minY, maxX, maxY].every(Number.isFinite)) return null;

  const spanX = Math.max(maxX - minX, 0.01);
  const spanY = Math.max(maxY - minY, 0.01);
  const padding = Math.max(spanX, spanY) * 0.08;
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute(
    "viewBox",
    `${minX - padding} ${minY - padding} ${spanX + padding * 2} ${spanY + padding * 2}`
  );
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  appendDetailPathPolylines(svg, pathPoints, Math.max(spanX, spanY) * 0.01);
  return svg;
}

function renderMowingRecordRasterCanvas(raster) {
  const width = Number(raster.width);
  const height = Number(raster.height);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.createImageData(width, height);
  let pixel = 0;
  const runs = raster.runs || [];
  for (let index = 0; index < runs.length - 1 && pixel < width * height; index += 2) {
    const value = Number(runs[index]);
    const count = Number(runs[index + 1]);
    if (!Number.isFinite(value) || !Number.isFinite(count) || count <= 0) continue;
    const color = rasterColorForRecordDetail(value);
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
  return canvas;
}

// Port of renderer.js's decodeRasterRuns(): expands the raster's
// run-length-encoded `runs` (value, count, value, count, ...) into a flat
// per-pixel array, row-major, NO row flip (that flip in
// renderMowingRecordRasterCanvas above is purely a canvas-image-orientation
// concern; the raw pixel order here matches world Y directly, same as
// renderer.js's own boundary tracer expects).
function decodeRasterSolidMask(raster, width, height) {
  if (!Array.isArray(raster?.runs)) return null;
  const pixels = new Uint8Array(width * height);
  let offset = 0;
  for (let index = 0; index < raster.runs.length - 1; index += 2) {
    const value = Math.max(0, Math.min(255, Number(raster.runs[index]) || 0));
    const count = Number(raster.runs[index + 1]);
    if (!Number.isFinite(count) || count <= 0) continue;
    pixels.fill(value, offset, Math.min(width * height, offset + count));
    offset += count;
    if (offset >= width * height) break;
  }
  return pixels;
}

// Port of renderer.js's drawRasterBoundary(): traces the edges between
// solid (mowed-lawn) and empty raster cells -- the real mapped-lawn
// silhouette, pixel-accurate, as opposed to the raw wire-perimeter/travel
// route in map_binary_paths (which can cut across non-grass areas like a
// driveway when the mower's route connects two mowing zones). Returns an
// SVG path `d` string built from many disconnected M/L segments -- one per
// boundary edge, exactly mirroring the ctx.moveTo/lineTo pairs the canvas
// version draws -- which is not a single closed loop, but reads as one
// when stroked with round joins/caps because adjacent edges share endpoints.
function buildRasterBoundaryPathD(raster, rasterBounds, worldToScreen) {
  const width = Number(raster?.width);
  const height = Number(raster?.height);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    return null;
  }
  const pixels = decodeRasterSolidMask(raster, width, height);
  if (!pixels) return null;

  const minX = Number(rasterBounds?.min_x ?? rasterBounds?.minX);
  const maxX = Number(rasterBounds?.max_x ?? rasterBounds?.maxX);
  const minY = Number(rasterBounds?.min_y ?? rasterBounds?.minY);
  const maxY = Number(rasterBounds?.max_y ?? rasterBounds?.maxY);
  if (![minX, maxX, minY, maxY].every(Number.isFinite)) return null;

  const stepX = (maxX - minX) / width;
  const stepY = (maxY - minY) / height;
  if (!Number.isFinite(stepX) || !Number.isFinite(stepY) || stepX === 0 || stepY === 0) {
    return null;
  }

  const isSolid = (x, y) => x >= 0 && x < width && y >= 0 && y < height && pixels[y * width + x] !== 0;
  const toScreen = (x, y) => worldToScreen({ x: minX + x * stepX, y: minY + y * stepY });

  const segments = [];
  const addEdge = (x1, y1, x2, y2) => {
    const start = toScreen(x1, y1);
    const end = toScreen(x2, y2);
    segments.push(`M${start.x},${start.y} L${end.x},${end.y}`);
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!isSolid(x, y)) continue;
      if (!isSolid(x - 1, y)) addEdge(x, y, x, y + 1);
      if (!isSolid(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
      if (!isSolid(x, y - 1)) addEdge(x, y, x + 1, y);
      if (!isSolid(x, y + 1)) addEdge(x, y + 1, x + 1, y + 1);
    }
  }

  return segments.length ? segments.join(" ") : null;
}

// Compose the live map's separate decoded-boundary adjustment with the
// geometry's normal world-to-screen projection.
function worldToScreenWithExtraCalibration(geometry, calibration, point) {
  const mapPoint = geometry.worldToMap(point);
  return geometry.mapToScreenWithLayerCalibration(mapPoint, calibration);
}

// Draws a simple schematic (not necessarily oriented like the live map) of
// the zone polygons an "area" file describes, reusing the same zone/vertex
// parsing the live map overlay uses (getZones/getZonePoints from geometry.js)
// so it recognizes the same field-name variants.
function renderMowingRecordZonesSvg(
  areaDefinition,
  pathPoints = [],
  mowedZoneInfo = null,
  {
    backgroundImage = null,
    calibration = null,
    decodedBoundaryCalibration = null,
    bounds: resolvedBounds = null,
    boundaryRaster = null,
    boundaryPaths = null,
    canvasSize = null,
    fit = "cover",
    rotation = 0,
  } = {}
) {
  const zones = getZones(areaDefinition, ["custom_areas", "zones", "customAreas", "ridable_areas"]);
  const zonePolygons = zones
    .map((zone) => ({ zone, points: getZonePoints(zone) }))
    .filter((entry) => entry.points.length >= 3);
  if (!zonePolygons.length) return null;

  // Mirrors renderer.js's draw() precisely, not just "the same calibration
  // values": the live map (1) computes its world bounds from the property's
  // CURRENT live boundary/zone/raster data (falling back to an explicit
  // config.bounds override when the caller set one) -- NOT from whatever
  // this particular historical record's own `area_url` snapshot happens to
  // contain, which can differ just enough to visibly mis-scale things; the
  // caller (openMowingRecordDetail) already resolves that and passes the
  // final `bounds` in, (2) fits BOTH its image geometry and its zone/path
  // geometry to the *photo's own* aspect ratio (not the raw world aspect
  // ratio), and (3) draws the background photo with an UNCALIBRATED
  // geometry (calibration: {}) while drawing zones/path with the
  // CALIBRATED one -- the photo is the fixed reference frame; calibration
  // is how the robot's own (possibly offset/rotated/scaled) coordinate
  // system gets nudged to line up with it.
  const bounds = resolvedBounds || getWorldBounds(areaDefinition, null);
  const sourceWidth = Number(backgroundImage?.naturalWidth || backgroundImage?.width) || 0;
  const sourceHeight = Number(backgroundImage?.naturalHeight || backgroundImage?.height) || 0;
  const hasImage = Boolean(backgroundImage && sourceWidth > 0 && sourceHeight > 0);
  const photoRatio = hasImage ? sourceWidth / sourceHeight : undefined;

  // Attila: the zones/coverage still read "too tall" vertically vs. the
  // live map even with matching bounds/calibration. Root cause: the live
  // map's "map" rect is fit against the live CANVAS's own actual pixel
  // width/height (whatever the card's on-screen box happens to be) using
  // its configured `fit` ("cover" by default -- crops/zooms rather than
  // showing the world uncropped when the container's aspect ratio doesn't
  // match the photo's). The popup was instead sizing its own SVG canvas to
  // exactly match the photo's aspect ratio with zero letterboxing by
  // construction -- a DIFFERENT fit, so even identical bounds/calibration
  // produced a differently zoomed/cropped picture. When the caller can
  // supply the live renderer's actual current canvas size, reuse it (and
  // its `fit` mode) directly so the popup reproduces the exact same "map"
  // rect the live view uses; only fall back to a synthetic, letterbox-free
  // size (photo's own aspect ratio, "contain") when that isn't available.
  let size;
  let fitMode;
  if (canvasSize && canvasSize.width > 0 && canvasSize.height > 0) {
    size = { width: canvasSize.width, height: canvasSize.height };
    fitMode = fit || "cover";
  } else {
    const rawWorldRatio = (bounds.maxX - bounds.minX) / (bounds.maxY - bounds.minY);
    const worldRatio = Number.isFinite(rawWorldRatio) && rawWorldRatio > 0 ? rawWorldRatio : 1;
    const fitRatio = Number.isFinite(photoRatio) && photoRatio > 0 ? photoRatio : worldRatio;
    size = { width: 1000, height: Math.max(1, 1000 / fitRatio) };
    fitMode = "contain";
  }
  const view = { rotation: Number(rotation) || 0 };
  const geometryOptions = { bounds, width: size.width, height: size.height, view, aspectRatio: photoRatio, fit: fitMode };
  const baseGeometry = createGeometry({ ...geometryOptions, calibration: {} });
  const geometry = createGeometry({ ...geometryOptions, calibration });
  const project = (point) => geometry.worldToScreen(point);

  // Styling mirrors the real app's own history-detail screen (reference
  // screenshot, 2026-08-21): every zone rectangle gets the same plain pale
  // frame, and the actual mowed *coverage* (the clipped path swath drawn
  // per zone below) is what visually shows what got mowed -- not a flat
  // solid fill on the whole rectangle.
  const MOWED_STROKE = "#4d4ed6";
  const NEUTRAL_FILL = "#8b8fdb";
  const NEUTRAL_STROKE = "#9598e0";
  // Attila: the dimension text ("15.3m x 11.7m") was reading as too
  // dominant over the photo -- shrunk noticeably smaller than the zone
  // name label, instead of the previous 0.8x-of-name ratio.
  const fontSize = Math.max(size.width, size.height) * 0.026;
  const dimsFontSize = Math.max(size.width, size.height) * 0.013;
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  // Same garden photo the live map card underlays behind the boundary/zones
  // (config.image), placed with the exact same affine fit the live map
  // renderer uses (renderer.js's drawImageOnMap/drawImageToScreenRect): the
  // image's unit-square corners (0,0)-(1,0)-(0,1) run through the
  // UNCALIBRATED baseGeometry.mapToScreen (see comment above), and the
  // resulting 2x3 affine is reproduced here as an SVG matrix transform
  // instead of a canvas setTransform.
  if (hasImage) {
    const topLeft = baseGeometry.mapToScreen({ x: 0, y: 0 });
    const topRight = baseGeometry.mapToScreen({ x: 1, y: 0 });
    const bottomLeft = baseGeometry.mapToScreen({ x: 0, y: 1 });
    const a = (topRight.x - topLeft.x) / sourceWidth;
    const b = (topRight.y - topLeft.y) / sourceWidth;
    const c = (bottomLeft.x - topLeft.x) / sourceHeight;
    const d = (bottomLeft.y - topLeft.y) / sourceHeight;

    const bgImage = document.createElementNS(svgNs, "image");
    bgImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", backgroundImage.src);
    bgImage.setAttribute("href", backgroundImage.src);
    bgImage.setAttribute("x", "0");
    bgImage.setAttribute("y", "0");
    bgImage.setAttribute("width", String(sourceWidth));
    bgImage.setAttribute("height", String(sourceHeight));
    bgImage.setAttribute("preserveAspectRatio", "none");
    bgImage.setAttribute("opacity", "0.6");
    bgImage.setAttribute("transform", `matrix(${a} ${b} ${c} ${d} ${topLeft.x} ${topLeft.y})`);
    svg.appendChild(bgImage);
  }

  // Reference screenshot (the real app's own history-detail screen,
  // 2026-08-21) doesn't fill the whole zone RECTANGLE solid when it was
  // mowed -- it draws the real, irregular coverage silhouette (following
  // actual lawn edges/obstacles) inside the rectangle, and leaves the
  // rectangle itself as a plain pale reference frame for every zone,
  // mowed or not. We don't have a true coverage polygon, but the mowed
  // *path* (already decoded) traces that same irregular shape -- drawing
  // it as thick, near-solid, round-capped strokes (instead of the earlier
  // thin translucent lines that read as generic clutter) approximates it
  // closely, and clipping those strokes to each zone's own polygon (via an
  // SVG <clipPath>) keeps a session's coverage from bleeding into a
  // neighboring zone the same way the real app's per-zone silhouette does.
  const defs = document.createElementNS(svgNs, "defs");
  svg.appendChild(defs);
  const coverageSegments = pathPoints.length ? buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM) : [];
  // Approximate cutting width of the mower, in world mm -- unconfirmed
  // against real device specs, chosen to visually read as a filled
  // coverage swath (like the reference screenshot) rather than thin
  // stripes when consecutive passes overlap.
  const MOWER_WIDTH_MM = 300;
  const pxPerMm = geometry.map.width / Math.max(1, bounds.maxX - bounds.minX);
  const coverageStrokeWidth = Math.max(2, MOWER_WIDTH_MM * pxPerMm);

  zonePolygons.forEach(({ zone, points }, zoneIndex) => {
    const name = zone?.name || zone?.label;
    const normalizedName = name ? String(name).trim().toLowerCase() : "";
    const matched = mowedZoneInfo?.get(normalizedName) || null;
    const screenPoints = points.map(project);

    const poly = document.createElementNS(svgNs, "polygon");
    poly.setAttribute("points", screenPoints.map((p) => `${p.x},${p.y}`).join(" "));
    poly.setAttribute("fill", NEUTRAL_FILL);
    poly.setAttribute("fill-opacity", "0.14");
    poly.setAttribute("stroke", NEUTRAL_STROKE);
    poly.setAttribute("stroke-width", String(Math.max(size.width, size.height) * 0.004));
    svg.appendChild(poly);

    if (coverageSegments.length) {
      const clipId = `mowing-zone-clip-${zoneIndex}`;
      const clipPath = document.createElementNS(svgNs, "clipPath");
      clipPath.setAttribute("id", clipId);
      const clipPoly = document.createElementNS(svgNs, "polygon");
      clipPoly.setAttribute("points", screenPoints.map((p) => `${p.x},${p.y}`).join(" "));
      clipPath.appendChild(clipPoly);
      defs.appendChild(clipPath);

      const coverageGroup = document.createElementNS(svgNs, "g");
      coverageGroup.setAttribute("clip-path", `url(#${clipId})`);
      for (const segment of coverageSegments) {
        const line = document.createElementNS(svgNs, "polyline");
        line.setAttribute(
          "points",
          segment
            .map((p) => {
              const s = project(p);
              return `${s.x},${s.y}`;
            })
            .join(" ")
        );
        line.setAttribute("fill", "none");
        line.setAttribute("stroke", MOWED_STROKE);
        line.setAttribute("stroke-opacity", "0.92");
        line.setAttribute("stroke-width", String(coverageStrokeWidth));
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("stroke-linejoin", "round");
        coverageGroup.appendChild(line);
      }
      svg.appendChild(coverageGroup);
    }

    if (name) {
      let cx = 0, cy = 0;
      for (const p of screenPoints) { cx += p.x; cy += p.y; }
      cx /= screenPoints.length;
      cy /= screenPoints.length;

      // Dimensions: prefer the record's own reported width x height for a
      // zone it actually mowed (confirmed correct against the app in an
      // earlier round); otherwise fall back to this zone polygon's own
      // world-mm bounding box (unconfirmed for zones outside a record's
      // zone_list).
      let dims = matched?.dims || "";
      if (!dims && points.length >= 3) {
        let zMinX = Infinity, zMinY = Infinity, zMaxX = -Infinity, zMaxY = -Infinity;
        for (const p of points) {
          if (p.x < zMinX) zMinX = p.x;
          if (p.x > zMaxX) zMaxX = p.x;
          if (p.y < zMinY) zMinY = p.y;
          if (p.y > zMaxY) zMaxY = p.y;
        }
        if ([zMinX, zMinY, zMaxX, zMaxY].every(Number.isFinite)) {
          dims = `${((zMaxX - zMinX) / 1000).toFixed(1)}m × ${((zMaxY - zMinY) / 1000).toFixed(1)}m`;
        }
      }

      // A dark outline keeps the label legible over the (optional) photo
      // background, whose brightness varies -- plain white fill alone can
      // wash out over light patches of the image.
      const textOutline = String(Math.max(size.width, size.height) * 0.0025);

      const nameText = document.createElementNS(svgNs, "text");
      nameText.setAttribute("x", String(cx));
      nameText.setAttribute("y", String(cy - fontSize * 0.35));
      nameText.setAttribute("text-anchor", "middle");
      nameText.setAttribute("font-size", String(fontSize));
      nameText.setAttribute("font-weight", "600");
      nameText.setAttribute("fill", "#ffffff");
      nameText.setAttribute("stroke", "rgba(0,0,0,0.65)");
      nameText.setAttribute("stroke-width", textOutline);
      nameText.setAttribute("paint-order", "stroke");
      nameText.textContent = String(name);
      svg.appendChild(nameText);

      if (dims) {
        const dimsText = document.createElementNS(svgNs, "text");
        dimsText.setAttribute("x", String(cx));
        dimsText.setAttribute("y", String(cy + fontSize * 0.7));
        dimsText.setAttribute("text-anchor", "middle");
        dimsText.setAttribute("font-size", String(dimsFontSize));
        dimsText.setAttribute("fill", "rgba(255,255,255,0.85)");
        dimsText.setAttribute("stroke", "rgba(0,0,0,0.65)");
        dimsText.setAttribute("stroke-width", textOutline);
        dimsText.setAttribute("paint-order", "stroke");
        dimsText.textContent = dims;
        svg.appendChild(dimsText);
      }
    }
  });

  // Attila: "a no-go zone nincs rajta" -- the popup was only ever reading
  // the mowable-zone keys (custom_areas/zones/customAreas/ridable_areas);
  // it never looked at the forbidden/no-go-area keys at all, so those
  // zones were silently missing here even though the live map always
  // draws them (renderer.js's draw(): drawZones(..., "zone") immediately
  // followed by drawZones(..., "no-go"), same geometry, right before the
  // boundary/mowed-path layers -- mirrored here in the same order/style:
  // solid red fill+stroke, label falls back to "No-go" for an unnamed or
  // generically-named ("Zone 1") zone, same as zoneLabel() in renderer.js).
  const noGoZones = getZones(areaDefinition, [
    "forbid_areas",
    "forbidAreas",
    "remote_forbid_areas",
    "remoteForbidAreas",
    "no_go_areas",
    "noGoAreas",
  ]);
  const noGoPolygons = noGoZones
    .map((zone) => ({ zone, points: getZonePoints(zone) }))
    .filter((entry) => entry.points.length >= 3);
  const NO_GO_FILL = "rgba(244, 67, 54, 0.38)";
  const NO_GO_STROKE = "rgba(255, 82, 82, 1)";
  noGoPolygons.forEach(({ zone, points }) => {
    const screenPoints = points.map(project);
    const poly = document.createElementNS(svgNs, "polygon");
    poly.setAttribute("points", screenPoints.map((p) => `${p.x},${p.y}`).join(" "));
    poly.setAttribute("fill", NO_GO_FILL);
    poly.setAttribute("stroke", NO_GO_STROKE);
    poly.setAttribute("stroke-width", String(Math.max(size.width, size.height) * 0.004));
    svg.appendChild(poly);

    const rawName = zone?.name || zone?.label;
    const label = rawName && !/^zone\s*\d+$/i.test(String(rawName)) ? String(rawName) : "No-go";
    let cx = 0, cy = 0;
    for (const p of screenPoints) { cx += p.x; cy += p.y; }
    cx /= screenPoints.length;
    cy /= screenPoints.length;
    const textOutline = String(Math.max(size.width, size.height) * 0.0025);
    const labelText = document.createElementNS(svgNs, "text");
    labelText.setAttribute("x", String(cx));
    labelText.setAttribute("y", String(cy));
    labelText.setAttribute("text-anchor", "middle");
    labelText.setAttribute("font-size", String(fontSize * 0.8));
    labelText.setAttribute("font-weight", "600");
    labelText.setAttribute("fill", "#ffffff");
    labelText.setAttribute("stroke", "rgba(0,0,0,0.65)");
    labelText.setAttribute("stroke-width", textOutline);
    labelText.setAttribute("paint-order", "stroke");
    labelText.textContent = label;
    svg.appendChild(labelText);
  });

  // Attila asked for the lawn's own boundary outline to be visible too
  // (previously only the zone rectangles were drawn), then pointed out the
  // first attempt (getBoundaryPaths()'s map_binary_paths -- the raw
  // wire-perimeter/travel route) cut straight across the driveway, since
  // that's the "legacy boundary" the live map itself only shows when
  // explicitly turned on. What the live map shows BY DEFAULT is a
  // pixel-traced outline of the map_raster mask -- the real mapped-lawn
  // silhouette -- so that's preferred here too, with the vector paths kept
  // only as a fallback when no usable raster is available. Either way,
  // drawn twice -- a thicker, translucent "glow" underneath, then a solid
  // line on top -- and drawn last (on top of the zone fills) to match the
  // live map's own draw order (zones, then boundary, then mowed path).
  const boundaryWidth = Math.max(size.width, size.height) * 0.006;
  const boundaryGlowWidth = boundaryWidth * 2.2;
  const strokeBoundaryPathD = (pathD) => {
    const glow = document.createElementNS(svgNs, "path");
    glow.setAttribute("d", pathD);
    glow.setAttribute("fill", "none");
    glow.setAttribute("stroke", "rgba(168, 179, 255, 0.38)");
    glow.setAttribute("stroke-width", String(boundaryGlowWidth));
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("stroke-linejoin", "round");
    svg.appendChild(glow);

    const solid = document.createElementNS(svgNs, "path");
    solid.setAttribute("d", pathD);
    solid.setAttribute("fill", "none");
    solid.setAttribute("stroke", "rgba(74, 101, 255, 0.9)");
    solid.setAttribute("stroke-width", String(boundaryWidth));
    solid.setAttribute("stroke-linecap", "round");
    solid.setAttribute("stroke-linejoin", "round");
    svg.appendChild(solid);
  };

  const rasterBoundaryD =
    boundaryRaster && boundaryRaster.bounds
      ? buildRasterBoundaryPathD(boundaryRaster, boundaryRaster.bounds, (point) =>
          worldToScreenWithExtraCalibration(geometry, decodedBoundaryCalibration, point)
        )
      : null;

  if (rasterBoundaryD) {
    strokeBoundaryPathD(rasterBoundaryD);
  } else if (Array.isArray(boundaryPaths) && boundaryPaths.length) {
    for (const path of boundaryPaths) {
      if (!Array.isArray(path) || path.length < 2) continue;
      const screenPoints = path.map(project);
      const closedD = `M${screenPoints.map((p) => `${p.x},${p.y}`).join(" L")} Z`;
      strokeBoundaryPathD(closedD);
    }
  }

  return svg;
}

function formatRecordArea(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `${Math.round(num * 10) / 10} m²`;
}

function formatRecordNumber(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return String(Math.round(num * 10) / 10);
}

function formatRecordPercent(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  const pct = num > 0 && num <= 1 ? num * 100 : num;
  return `${Math.round(pct * 10) / 10}%`;
}

function formatRecordDurationSeconds(totalSeconds) {
  const total = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;
}

// The confirmed Anthbot mow_time field is expressed in seconds. Explicit
// millisecond aliases are converted by field name; magnitude is deliberately
// not used because a valid large-property mowing session can exceed 20,000 s.
function normalizeRecordDurationSeconds(rawDuration, sourceKey = "") {
  if (rawDuration === undefined || rawDuration === null || rawDuration === "") return null;
  const rawNum = Number(rawDuration);
  if (Number.isNaN(rawNum)) return null;
  return /(?:_ms|Ms)$/.test(String(sourceKey)) ? rawNum / 1000 : rawNum;
}

// Attila: the real app shows a "start - end" range for every history entry
// (e.g. "2026-08-09 13:53 - 2026-08-19 14:37"), but the cloud record itself
// only ever carries an end timestamp (`finish_time`) -- there is no
// start_time/begin_time field in the confirmed real response (see the
// MOWING_RECORD_START_KEYS alias list, which was written defensively before
// a populated history existed and has simply never matched anything real).
// What the record DOES carry is the session's duration (`mow_time`, in
// seconds), so the start can be reconstructed as end minus duration -- the
// same arithmetic the app itself must be doing to show that range. Falls
// back to whatever an actual start-time alias resolves to, if the cloud
// ever does start sending one, so this doesn't fight a real field later.
function resolveMowingRecordTimeRange(record) {
  const end = parseRecordTimestamp(pickRecordValue(record, MOWING_RECORD_END_KEYS));
  let start = parseRecordTimestamp(pickRecordValue(record, MOWING_RECORD_START_KEYS));
  if (!start && end) {
    const durationEntry = pickRecordEntry(record, MOWING_RECORD_DURATION_KEYS);
    const durationSeconds = normalizeRecordDurationSeconds(durationEntry?.value, durationEntry?.key);
    if (durationSeconds !== null && durationSeconds > 0) {
      start = new Date(end.getTime() - durationSeconds * 1000);
    }
  }
  return { start, end };
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function milliRadiansToDegrees(value) {
  return (Number(value) * 180) / (Math.PI * 1000);
}

function normalizeHeadingDegrees(value) {
  const heading = Number(value) || 0;
  return Math.abs(heading) > 360 ? heading / 100 : heading;
}

function normalizeSignedDegrees(value) {
  return ((Number(value) + 180) % 360 + 360) % 360 - 180;
}

function distanceToSegment(point, line) {
  const x1 = Number(line?.x1);
  const y1 = Number(line?.y1);
  const x2 = Number(line?.x2);
  const y2 = Number(line?.y2);
  if (![x1, y1, x2, y2].every(Number.isFinite)) return Infinity;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(point.x - x1, point.y - y1);
  const ratio = Math.max(0, Math.min(1, ((point.x - x1) * dx + (point.y - y1) * dy) / lengthSquared));
  return Math.hypot(point.x - (x1 + ratio * dx), point.y - (y1 + ratio * dy));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

enhanceGardenAnthbot(GardenMapCard);

if (!customElements.get(GARDEN_CARD_TAG)) {
  customElements.define(GARDEN_CARD_TAG, GardenMapCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: GARDEN_CARD_TAG,
  name: "Garden Map Card",
  description: "Közös Anthbot és locsolórendszer térképkártya – v166",
});
