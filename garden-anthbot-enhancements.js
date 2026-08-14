import { translate } from "./garden-anthbot-i18n.js?v=163";

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
const t = (card, key) => EDGE_I18N[card.language || "en"]?.[key] || EDGE_I18N.en[key] || translate(card.language || "en", key);
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

export function enhanceGardenAnthbot(Card) {
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
    const tile = document.createElement("button"); tile.type="button"; tile.className=`panel-tile task-action-tile ${action}`;
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
    for (const [title,data] of [[t(this,"mowingHistory"),attrs.mowing_records?.data||attrs.mowing_records||[]],[t(this,"errorHistory"),attrs.error_history||[]]]) { const box=section(this,title,title); box.querySelector(".settings-section-body").innerHTML=`<pre>${esc(JSON.stringify(data,null,2))}</pre>`; body.appendChild(box); }
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
