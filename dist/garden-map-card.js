// irrigation-map-card.js?v=159.1
var DEFAULT_ZONES = [
  { id: 1, name: "Zona 1", entity: "switch.ontozovezerlo_zona_1", color: "#38bdf8" },
  { id: 2, name: "Zona 2", entity: "switch.ontozovezerlo_zona_2", color: "#22c55e" },
  { id: 3, name: "Zona 3", entity: "switch.ontozovezerlo_zona_3", color: "#f59e0b" },
  { id: 4, name: "Zona 4", entity: "switch.ontozovezerlo_zona_4", color: "#a855f7" },
  { id: 5, name: "Fenyő kapu", entity: "switch.kerticsap_kapu_fenyo", color: "#ef4444" }
];
var SCHEDULER_ENTITIES = {
  status: "input_text.irrigation_status",
  timer: "timer.irrigation_zone",
  rainSensor: "switch.esosensor",
  rainDelaySelect: "input_select.irrigation_rain_delay",
  rainMinimumSelect: "input_select.irrigation_rain_minimum",
  rainDelayTimer: "timer.irrigation_rain_delay",
  runScript: "script.irrigation_run_sequence",
  manualRunScript: "script.irrigation_run_zone",
  stopZoneScript: "script.irrigation_stop_zone",
  stopScript: "script.irrigation_stop",
  manualMinutes: Array.from({ length: 5 }, (_, index) => `input_number.irrigation_manual_zone_${index + 1}_minutes`),
  programs: Array.from({ length: 8 }, (_, index) => `input_text.irrigation_program_${index + 1}`)
};
var DEFAULT_PUMP_ENTITIES = {
  power: "sensor.szivattyu_szivattyu_teljesitmeny",
  current: "sensor.szivattyu_szivattyu_aramfelvetel",
  voltage: "sensor.szivattyu_feszultseg"
};
var LANGUAGES = [
  ["auto", "Automatic / Automatikus"],
  ["en", "English"],
  ["hu", "Magyar"],
  ["de", "Deutsch"],
  ["fr", "Français"],
  ["es", "Español"],
  ["it", "Italiano"],
  ["pt", "Português"],
  ["nl", "Nederlands"],
  ["pl", "Polski"],
  ["cs", "Čeština"],
  ["sk", "Slovenčina"],
  ["ro", "Română"],
  ["da", "Dansk"],
  ["sv", "Svenska"],
  ["no", "Norsk"],
  ["fi", "Suomi"],
  ["zh-CN", "简体中文"],
  ["zh-TW", "繁體中文"],
  ["tr", "Türkçe"],
  ["th", "ไทย"],
  ["vi", "Tiếng Việt"],
  ["ko", "한국어"],
  ["km", "ខ្មែរ"]
];
var EN = {
  title: "Irrigation system",
  subtitle: "Map-based irrigation zone control",
  editHint: "Select a zone and click the map to add a sprinkler. Click an existing sprinkler to delete it.",
  markHeads: "Mark sprinklers",
  done: "Done",
  noIrrigation: "No irrigation in progress",
  save: "Save",
  startNow: "Start now",
  stop: "Stop",
  schedule: "Irrigation schedule",
  yamlExport: "YAML export",
  copyYaml: "Copy YAML",
  running: "running",
  off: "off",
  manualTime: "Manual time",
  minutes: "minutes",
  savedSchedules: "Saved schedules",
  newSchedule: "New schedule",
  noSchedules: "No saved schedules yet.",
  start: "Start",
  edit: "Edit",
  delete: "Delete",
  noDay: "No selected day",
  noZone: "No selected zone",
  back: "Back",
  editSchedule: "Edit schedule",
  name: "Name",
  enabled: "Schedule enabled",
  begins: "Start time",
  cycle: "Cycle",
  weekly: "Weekly cycle",
  odd: "Odd days",
  even: "Even days",
  zonesOrder: "Zones, duration and order",
  time: "Time",
  order: "Order",
  remaining: "remaining time",
  loading: "Loading image...",
  language: "Language",
  automatic: "Automatic",
  selectSchedule: "Select a schedule or create a new one.",
  chooseSchedule: "Select the schedule to start.",
  noEnabledSchedule: "No enabled schedule.",
  saved: "Schedule saved.",
  stopped: "Irrigation stopped.",
  copied: "YAML copied to clipboard.",
  settings: "Settings",
  settingsHelp: "Automatic follows the Home Assistant language. A manually selected language is remembered in this browser.",
  pump: "Pump",
  pumpRunning: "RUNNING",
  pumpStarting: "STARTING…",
  pumpStopping: "STOPPING…",
  pumpFailed: "FAILED TO START",
  pumpStopped: "STOPPED",
  power: "Power",
  current: "Current",
  voltage: "Voltage",
  rainSensor: "Rain sensor",
  rainNow: "Rain detected",
  noRain: "No rain",
  rainDelay: "Delay after rain",
  rainMinimum: "Minimum rain duration",
  rainDelayRemaining: "Irrigation lock remaining"
};
var HU = {
  title: "Locsolórendszer",
  subtitle: "Térképes locsolózóna-vezérlés",
  editHint: "Válassz zónát, majd kattints a térképre új fejhez. Egy meglévő fejre kattintva törölheted.",
  markHeads: "Fejek jelölése",
  done: "Jelölés kész",
  noIrrigation: "Nincs folyamatban öntözés",
  save: "Mentés",
  startNow: "Indítás most",
  stop: "Leállítás",
  schedule: "Öntözési időzítés",
  yamlExport: "YAML export",
  copyYaml: "YAML másolása",
  running: "megy",
  off: "kikapcsolva",
  manualTime: "Kézi idő",
  minutes: "perc",
  savedSchedules: "Elmentett időzítések",
  newSchedule: "Új időzítés",
  noSchedules: "Még nincs elmentett időzítés.",
  start: "Indítás",
  edit: "Szerkesztés",
  delete: "Törlés",
  noDay: "Nincs kiválasztott nap",
  noZone: "Nincs kiválasztott zóna",
  back: "Vissza",
  editSchedule: "Időzítés szerkesztése",
  name: "Név",
  enabled: "Időzítés engedélyezve",
  begins: "Kezdés",
  cycle: "Ciklus",
  weekly: "Heti ciklus",
  odd: "Páratlan nap",
  even: "Páros nap",
  zonesOrder: "Zónák, időtartam és sorrend",
  time: "Idő",
  order: "Sorrend",
  remaining: "hátralévő idő",
  loading: "Kép betöltése...",
  language: "Nyelv",
  automatic: "Automatikus",
  selectSchedule: "Válassz egy időzítést, vagy hozz létre újat.",
  chooseSchedule: "Válaszd ki az indítandó időzítést.",
  noEnabledSchedule: "Nincs engedélyezett időzítés.",
  saved: "Időzítés elmentve.",
  stopped: "Öntözés leállítva.",
  copied: "YAML a vágólapra másolva.",
  settings: "Beállítások",
  settingsHelp: "Az Automatikus beállítás a Home Assistant nyelvét követi. A kézzel kiválasztott nyelv ezen a böngészőn megmarad.",
  pump: "Szivattyú",
  pumpRunning: "MEGY",
  pumpStarting: "INDUL…",
  pumpStopping: "LEÁLL…",
  pumpFailed: "NEM INDULT",
  pumpStopped: "ÁLL",
  power: "Teljesítmény",
  current: "Áramfelvétel",
  voltage: "Feszültség",
  rainSensor: "Esőszenzor",
  rainNow: "Esőt érzékel",
  noRain: "Nem esik",
  rainDelay: "Eső utáni várakozás",
  rainMinimum: "Tiltáshoz szükséges esőidő",
  rainDelayRemaining: "Locsolási tiltás hátralévő ideje"
};
var CORE = {
  de: { title: "Bewässerungssystem", subtitle: "Kartenbasierte Zonensteuerung", save: "Speichern", startNow: "Jetzt starten", stop: "Stoppen", schedule: "Bewässerungsplan", running: "läuft", off: "aus", language: "Sprache" },
  fr: { title: "Système d’irrigation", subtitle: "Commande des zones sur carte", save: "Enregistrer", startNow: "Démarrer", stop: "Arrêter", schedule: "Programmation", running: "en cours", off: "arrêt", language: "Langue" },
  es: { title: "Sistema de riego", subtitle: "Control de zonas mediante mapa", save: "Guardar", startNow: "Iniciar ahora", stop: "Detener", schedule: "Programación", running: "activo", off: "apagado", language: "Idioma" },
  it: { title: "Sistema di irrigazione", subtitle: "Controllo zone su mappa", save: "Salva", startNow: "Avvia ora", stop: "Arresta", schedule: "Programmazione", running: "attivo", off: "spento", language: "Lingua" },
  pt: { title: "Sistema de irrigação", save: "Guardar", startNow: "Iniciar agora", stop: "Parar", schedule: "Programação", running: "ativo", off: "desligado", language: "Idioma" },
  nl: { title: "Irrigatiesysteem", save: "Opslaan", startNow: "Nu starten", stop: "Stoppen", schedule: "Planning", running: "actief", off: "uit", language: "Taal" },
  pl: { title: "System nawadniania", save: "Zapisz", startNow: "Uruchom teraz", stop: "Zatrzymaj", schedule: "Harmonogram", running: "działa", off: "wyłączone", language: "Język" },
  cs: { title: "Zavlažovací systém", save: "Uložit", startNow: "Spustit nyní", stop: "Zastavit", schedule: "Plánování", running: "běží", off: "vypnuto", language: "Jazyk" },
  sk: { title: "Zavlažovací systém", save: "Uložiť", startNow: "Spustiť teraz", stop: "Zastaviť", schedule: "Plánovanie", running: "beží", off: "vypnuté", language: "Jazyk" },
  ro: { title: "Sistem de irigații", save: "Salvează", startNow: "Pornește acum", stop: "Oprește", schedule: "Programare", running: "activ", off: "oprit", language: "Limbă" },
  da: { title: "Vandingssystem", save: "Gem", startNow: "Start nu", stop: "Stop", schedule: "Tidsplan", running: "kører", off: "slukket", language: "Sprog" },
  sv: { title: "Bevattningssystem", save: "Spara", startNow: "Starta nu", stop: "Stoppa", schedule: "Schema", running: "kör", off: "av", language: "Språk" },
  no: { title: "Vanningssystem", save: "Lagre", startNow: "Start nå", stop: "Stopp", schedule: "Tidsplan", running: "kjører", off: "av", language: "Språk" },
  fi: { title: "Kastelujärjestelmä", save: "Tallenna", startNow: "Käynnistä nyt", stop: "Pysäytä", schedule: "Ajastus", running: "käynnissä", off: "pois", language: "Kieli" },
  "zh-CN": { title: "灌溉系统", save: "保存", startNow: "立即启动", stop: "停止", schedule: "灌溉计划", running: "运行中", off: "关闭", language: "语言" },
  "zh-TW": { title: "灌溉系統", save: "儲存", startNow: "立即啟動", stop: "停止", schedule: "灌溉排程", running: "運行中", off: "關閉", language: "語言" },
  tr: { title: "Sulama sistemi", subtitle: "Harita tabanlı sulama bölgesi kontrolü", editHint: "Bir bölge seçin, ardından sprinklerin haritadaki konumuna tıklayın", markHeads: "Sprinklerleri işaretle", done: "İşaretleme tamam", noIrrigation: "Sulama işlemi yok", save: "Kaydet", startNow: "Şimdi başlat", stop: "Durdur", schedule: "Sulama programı", yamlExport: "YAML dışa aktar", copyYaml: "YAML'ı kopyala", running: "çalışıyor", off: "kapalı", manualTime: "Manuel süre", minutes: "dakika", savedSchedules: "Kayıtlı programlar", newSchedule: "Yeni program", noSchedules: "Henüz kayıtlı program yok.", start: "Başlat", edit: "Düzenle", delete: "Sil", noDay: "Gün seçilmedi", noZone: "Bölge seçilmedi", back: "Geri", editSchedule: "Programı düzenle", name: "Ad", enabled: "Program etkin", begins: "Başlangıç", cycle: "Döngü", weekly: "Haftalık döngü", odd: "Tek günler", even: "Çift günler", zonesOrder: "Bölgeler, süre ve sıra", time: "Süre", order: "Sıra", remaining: "kalan süre", loading: "Resim yükleniyor...", language: "Dil", automatic: "Otomatik", selectSchedule: "Bir program seçin veya yeni bir tane oluşturun.", chooseSchedule: "Başlatılacak programı seçin.", noEnabledSchedule: "Etkin program yok.", saved: "Program kaydedildi.", stopped: "Sulama durduruldu.", copied: "YAML panoya kopyalandı." },
  th: { title: "ระบบชลประทาน", save: "บันทึก", startNow: "เริ่มตอนนี้", stop: "หยุด", schedule: "ตารางรดน้ำ", running: "กำลังทำงาน", off: "ปิด", language: "ภาษา" },
  vi: { title: "Hệ thống tưới", save: "Lưu", startNow: "Bắt đầu ngay", stop: "Dừng", schedule: "Lịch tưới", running: "đang chạy", off: "tắt", language: "Ngôn ngữ" },
  ko: { title: "관개 시스템", save: "저장", startNow: "지금 시작", stop: "정지", schedule: "관개 일정", running: "작동 중", off: "꺼짐", language: "언어" },
  km: { title: "ប្រព័ន្ធស្រោចស្រព", save: "រក្សាទុក", startNow: "ចាប់ផ្តើមឥឡូវ", stop: "បញ្ឈប់", schedule: "កាលវិភាគស្រោចស្រព", running: "កំពុងដំណើរការ", off: "បិទ", language: "ភាសា" }
};
CORE["de"] = { "title": "Bewässerungssystem", "subtitle": "Kartenbasierte Bewässerungszonensteuerung", "editHint": "Wählen Sie eine Zone aus und klicken Sie dann auf die Sprinklerposition auf der Karte.", "markHeads": "Sprinkler markieren", "done": "Fertig", "noIrrigation": "Keine Bewässerung aktiv", "save": "Speichern", "startNow": "Jetzt starten", "stop": "Stoppen", "schedule": "Bewässerungsplan", "yamlExport": "YAML-Export", "copyYaml": "YAML kopieren", "running": "Läuft", "off": "Aus", "manualTime": "Manuelle Zeit", "minutes": "Minuten", "savedSchedules": "Gespeicherte Zeitpläne", "newSchedule": "Neuer Zeitplan", "noSchedules": "Noch keine gespeicherten Zeitpläne.", "start": "Start", "edit": "Bearbeiten", "delete": "Löschen", "noDay": "Kein Tag ausgewählt", "noZone": "Keine Zone ausgewählt", "back": "Zurück", "editSchedule": "Bewässerungsplan bearbeiten", "name": "Name", "enabled": "Bewässerungsplan aktiviert", "begins": "Startzeit", "cycle": "Zyklus", "weekly": "Wochenzyklus", "odd": "Ungerade Tage", "even": "Gerade Tage", "zonesOrder": "Zonen, Dauer und Reihenfolge", "time": "Uhrzeit", "order": "Reihenfolge", "remaining": "Verbleibende Zeit", "loading": "Bild wird geladen…", "language": "Sprache", "automatic": "Automatisch", "selectSchedule": "Bewässerungsplan auswählen oder neuen erstellen.", "chooseSchedule": "Zu startenden Bewässerungsplan auswählen.", "noEnabledSchedule": "Kein Bewässerungsplan aktiviert.", "saved": "Bewässerungsplan gespeichert.", "stopped": "Bewässerung gestoppt.", "copied": "YAML-Datei in die Zwischenablage kopiert.", "settings": "Einstellungen", "settingsHelp": "Die automatische Sprachauswahl passt sich der Sprache von Home Assistant an. Eine manuell ausgewählte Sprache wird in diesem Browser gespeichert.", "pump": "Pumpe", "pumpRunning": "LÄUFT", "pumpStarting": "STARTET…", "pumpStopping": "STOPPT…", "pumpFailed": "START FEHLGESCHLAGEN", "pumpStopped": "STOPPET", "power": "Stromversorgung", "current": "Stromstärke", "voltage": "Spannung" };
CORE["fr"] = { "title": "Système d'irrigation", "subtitle": "Contrôle des zones d'irrigation par carte", "editHint": "Sélectionnez une zone, puis cliquez sur l'emplacement de l'arroseur sur la carte", "markHeads": "Marquer les arroseurs", "done": "Terminé", "noIrrigation": "Aucune irrigation en cours", "save": "Enregistrer", "startNow": "Démarrer maintenant", "stop": "Arrêter", "schedule": "Programmation d'irrigation", "yamlExport": "Exportation YAML", "copyYaml": "Copier le fichier YAML", "running": "En cours", "off": "Arrêté", "manualTime": "Durée manuelle", "minutes": "Minutes", "savedSchedules": "Programmations enregistrées", "newSchedule": "Nouvelle programmation", "noSchedules": "Aucune programmation enregistrée.", "start": "Démarrer", "edit": "Modifier", "delete": "Supprimer", "noDay": "Aucun jour sélectionné", "noZone": "Aucune zone sélectionnée", "back": "Retour", "editSchedule": "Modifier la programmation", "name": "Nom", "enabled": "Programmation activée", "begins": "Heure de début", "cycle": "Cycle", "weekly": "Cycle hebdomadaire", "odd": "Jours impairs", "even": "Jours pairs", "zonesOrder": "Zones, durée et ordre", "time": "Heure", "order": "Ordre", "remaining": "Temps restant", "loading": "Chargement de l'image...", "language": "Langue", "automatic": "Automatique", "selectSchedule": "Sélectionnez une programmation ou créez-en une nouvelle.", "chooseSchedule": "Sélectionnez la programmation à démarrer.", "noEnabledSchedule": "Aucune programmation activée.", "saved": "Programmation enregistrée.", "stopped": "Arrosage arrêté.", "copied": "Fichier YAML copié dans le presse-papiers.", "settings": "Paramètres", "settingsHelp": "Automatique : utilise la langue de Home Assistant. La langue sélectionnée manuellement est mémorisée dans ce navigateur.", "pump": "Pompe", "pumpRunning": "EN MARCHE", "pumpStarting": "DÉMARRAGE…", "pumpStopping": "ARRÊT…", "pumpFailed": "ÉCHEC DU DÉMARRAGE", "pumpStopped": "ARRÊTÉ", "power": "Alimentation", "current": "Courant", "voltage": "Tension" };
CORE["es"] = { "title": "Sistema de riego", "subtitle": "Control de zonas de riego basado en mapa", "editHint": "Seleccione una zona y haga clic en la posición del aspersor en el mapa", "markHeads": "Marcar aspersores", "done": "Listo", "noIrrigation": "No hay riego en curso", "save": "Guardar", "startNow": "Iniciar ahora", "stop": "Detener", "schedule": "Programación de riego", "yamlExport": "Exportar YAML", "copyYaml": "Copiar YAML", "running": "En funcionamiento", "off": "Apagado", "manualTime": "Tiempo manual", "minutes": "Minutos", "savedSchedules": "Programaciones guardadas", "newSchedule": "Nueva programación", "noSchedules": "Aún no hay programaciones guardadas.", "start": "Inicio", "edit": "Editar", "delete": "Eliminar", "noDay": "No se ha seleccionado ningún día", "noZone": "No se ha seleccionado ninguna zona", "back": "Atrás", "editSchedule": "Editar horario", "name": "Nombre", "enabled": "Horario habilitado", "begins": "Hora de inicio", "cycle": "Ciclo", "weekly": "Ciclo semanal", "odd": "Días impares", "even": "Días pares", "zonesOrder": "Zonas, duración y orden", "time": "Hora", "order": "Orden", "remaining": "Tiempo restante", "loading": "Cargando imagen...", "language": "Idioma", "automatic": "Automático", "selectSchedule": "Seleccione un horario o cree uno nuevo.", "chooseSchedule": "Seleccione el horario que desea iniciar.", "noEnabledSchedule": "No hay horarios habilitados.", "saved": "Horario guardado.", "stopped": "Riego detenido.", "copied": "YAML copiado al portapapeles.", "settings": "Ajustes", "settingsHelp": "El modo automático sigue el idioma de Home Assistant. El idioma seleccionado manualmente se guarda en este navegador.", "pump": "Bomba", "pumpRunning": "EN FUNCIONAMIENTO", "pumpStarting": "INICIANDO…", "pumpStopping": "DETENIENDO…", "pumpFailed": "ERROR AL INICIAR", "pumpStopped": "DETENIDA", "power": "Potencia", "current": "Corriente", "voltage": "Voltaje" };
CORE["it"] = { "title": "Sistema di irrigazione", "subtitle": "Controllo delle zone di irrigazione tramite mappa", "editHint": "Seleziona una zona, quindi fai clic sulla posizione dell'irrigatore sulla mappa", "markHeads": "Contrassegna gli irrigatori", "done": "Fatto", "noIrrigation": "Nessuna irrigazione in corso", "save": "Salva", "startNow": "Avvia ora", "stop": "Interrompi", "schedule": "Programma di irrigazione", "yamlExport": "Esportazione YAML", "copyYaml": "Copia YAML", "running": "in esecuzione", "off": "spento", "manualTime": "Tempo manuale", "minutes": "minuti", "savedSchedules": "Programmi salvati", "newSchedule": "Nuovo programma", "noSchedules": "Nessun programma salvato al momento.", "start": "Avvia", "edit": "Modifica", "delete": "Elimina", "noDay": "Nessun giorno selezionato", "noZone": "Nessuna zona selezionata", "back": "Indietro", "editSchedule": "Modifica programma", "name": "Nome", "enabled": "Programma abilitato", "begins": "Ora di inizio", "cycle": "Ciclo", "weekly": "Ciclo settimanale", "odd": "Giorni dispari", "even": "Giorni pari", "zonesOrder": "Zone, durata e ordine", "time": "Ora", "order": "Ordine", "remaining": "Tempo rimanente", "loading": "Caricamento immagine...", "language": "Lingua", "automatic": "Automatico", "selectSchedule": "Seleziona un programma o creane uno nuovo.", "chooseSchedule": "Seleziona il programma da avviare.", "noEnabledSchedule": "Nessun programma abilitato.", "saved": "Programma salvato.", "stopped": "Irrigazione interrotta.", "copied": "YAML copiato negli appunti.", "settings": "Impostazioni", "settingsHelp": "Automatico: segue la lingua di Home Assistant. In questo browser viene memorizzata la lingua selezionata manualmente.", "pump": "Pompa", "pumpRunning": "IN FUNZIONE", "pumpStarting": "AVVIO…", "pumpStopping": "ARRESTO…", "pumpFailed": "AVVIO NON RIUSCITO", "pumpStopped": "ARRESTO", "power": "Potenza", "current": "Corrente", "voltage": "Tensione" };
CORE["pt"] = { "title": "Sistema de irrigação", "subtitle": "Controle de zona de irrigação baseado em mapa", "editHint": "Selecione uma zona e clique na posição do aspersor no mapa", "markHeads": "Marcar aspersores", "done": "Concluído", "noIrrigation": "Nenhuma irrigação em andamento", "save": "Salvar", "startNow": "Iniciar agora", "stop": "Parar", "schedule": "Programação de irrigação", "yamlExport": "Exportar para YAML", "copyYaml": "Copiar YAML", "running": "em execução", "off": "desligado", "manualTime": "Tempo manual", "minutes": "minutos", "savedSchedules": "Programações salvas", "newSchedule": "Nova programação", "noSchedules": "Nenhuma programação salva ainda.", "start": "Iniciar", "edit": "Editar", "delete": "Excluir", "noDay": "Nenhum dia selecionado", "noZone": "Nenhuma zona selecionada", "back": "Voltar", "editSchedule": "Editar programação", "name": "Nome", "enabled": "Programação ativada", "begins": "Hora de início", "cycle": "Ciclo", "weekly": "Ciclo semanal", "odd": "Dias ímpares", "even": "Dias pares", "zonesOrder": "Zonas, duração e ordem", "time": "Hora", "order": "Ordem", "remaining": "Tempo restante", "loading": "Carregando imagem...", "language": "Idioma", "automatic": "Automático", "selectSchedule": "Selecione uma programação ou crie uma nova.", "chooseSchedule": "Selecione a programação a ser iniciada.", "noEnabledSchedule": "Nenhuma programação ativada.", "saved": "Programação salva.", "stopped": "Irrigação interrompida.", "copied": "YAML copiado para a área de transferência.", "settings": "Configurações", "settingsHelp": "O modo automático segue o idioma do Home Assistant. O idioma selecionado manualmente é memorizado neste navegador.", "pump": "Bomba", "pumpRunning": "EM FUNCIONAMENTO", "pumpStarting": "INICIANDO…", "pumpStopping": "PARANDO…", "pumpFailed": "FALHA AO INICIAR", "pumpStopped": "PARADA", "power": "Energia", "current": "Corrente", "voltage": "Voltagem" };
CORE["nl"] = { "title": "Irrigatiesysteem", "subtitle": "Kaartgebaseerde irrigatiezonebesturing", "editHint": "Selecteer een zone en klik vervolgens op de sproeierpositie op de kaart", "markHeads": "Sproeiers markeren", "done": "Klaar", "noIrrigation": "Geen irrigatie bezig", "save": "Opslaan", "startNow": "Nu starten", "stop": "Stoppen", "schedule": "Irrigatieschema", "yamlExport": "YAML exporteren", "copyYaml": "YAML kopiëren", "running": "actief", "off": "uit", "manualTime": "Handmatige tijd", "minutes": "minuten", "savedSchedules": "Opgeslagen schema's", "newSchedule": "Nieuw schema", "noSchedules": "Nog geen opgeslagen schema's.", "start": "Start", "edit": "Bewerken", "delete": "Verwijderen", "noDay": "Geen dag geselecteerd", "noZone": "Geen zone geselecteerd", "back": "Terug", "editSchedule": "Schema bewerken", "name": "Naam", "enabled": "Schema ingeschakeld", "begins": "Starttijd", "cycle": "Cyclus", "weekly": "Wekelijkse cyclus", "odd": "Oneven dagen", "even": "Even dagen", "zonesOrder": "Zones, duur en volgorde", "time": "Tijd", "order": "Volgorde", "remaining": "Resterende tijd", "loading": "Afbeelding laden...", "language": "Taal", "automatic": "Automatisch", "selectSchedule": "Selecteer een schema of maak een nieuw schema aan.", "chooseSchedule": "Selecteer het schema dat u wilt starten.", "noEnabledSchedule": "Geen ingeschakeld schema.", "saved": "Schema opgeslagen.", "stopped": "Irrigatie gestopt.", "copied": "YAML naar klembord gekopieerd.", "settings": "Instellingen", "settingsHelp": "Automatisch volgt de taal van Home Assistant. Een handmatig geselecteerde taal wordt in deze browser onthouden.", "pump": "Pomp", "pumpRunning": "DRAAIT", "pumpStarting": "START…", "pumpStopping": "STOPT…", "pumpFailed": "STARTEN MISLUKT", "pumpStopped": "GESTOPT", "power": "Stroom", "current": "Stroomsterkte", "voltage": "Spanning" };
CORE["pl"] = { "title": "System nawadniania", "subtitle": "Sterowanie strefą nawadniania na podstawie mapy", "editHint": "Wybierz strefę, a następnie kliknij pozycję zraszacza na mapie", "markHeads": "Oznacz zraszacze", "done": "Gotowe", "noIrrigation": "Brak nawadniania w toku", "save": "Zapisz", "startNow": "Rozpocznij teraz", "stop": "Zatrzymaj", "schedule": "Harmonogram nawadniania", "yamlExport": "Eksport YAML", "copyYaml": "Kopiuj YAML", "running": "uruchomione", "off": "wyłączone", "manualTime": "Czas ręczny", "minutes": "minut", "savedSchedules": "Zapisane harmonogramy", "newSchedule": "Nowy harmonogram", "noSchedules": "Brak zapisanych harmonogramów.", "start": "Start", "edit": "Edycja", "delete": "Usuń", "noDay": "Brak wybranego dnia", "noZone": "Brak wybranej strefy", "back": "Wstecz", "editSchedule": "Edytuj harmonogram", "name": "Nazwa", "enabled": "Harmonogram włączony", "begins": "Godzina rozpoczęcia", "cycle": "Cykl", "weekly": "Cykl tygodniowy", "odd": "Dni nieparzyste", "even": "Dni parzyste", "zonesOrder": "Strefy, czas trwania i kolejność", "time": "Godzina", "order": "Kolejność", "remaining": "Pozostały czas", "loading": "Ładowanie obrazu...", "language": "Język", "automatic": "Automatyczny", "selectSchedule": "Wybierz harmonogram lub utwórz nowy.", "chooseSchedule": "Wybierz harmonogram do uruchomienia.", "noEnabledSchedule": "Brak włączonego harmonogramu.", "saved": "Harmonogram zapisany.", "stopped": "Nawadnianie zatrzymane.", "copied": "Plik YAML skopiowany do schowka.", "settings": "Ustawienia", "settingsHelp": "Automatycznie podąża za językiem Asystenta Domowego. Ręcznie wybrany język jest zapamiętywany w tej przeglądarce.", "pump": "Pompa", "pumpRunning": "DZIAŁA", "pumpStarting": "URUCHAMIANIE…", "pumpStopping": "ZATRZYMYWANIE…", "pumpFailed": "NIEUDANE URUCHOMIENIE", "pumpStopped": "ZATRZYMANE", "power": "Moc", "current": "Prąd", "voltage": "Napięcie" };
CORE["cs"] = { "title": "Zavlažovací systém", "subtitle": "Ovládání zavlažovací zóny na mapě", "editHint": "Vyberte zónu a poté klikněte na pozici postřikovače na mapě", "markHeads": "Označte postřikovače", "done": "Hotovo", "noIrrigation": "Neprobíhá žádné zavlažování", "save": "Uložit", "startNow": "Spustit nyní", "stop": "Zastavit", "schedule": "Plán zavlažování", "yamlExport": "Export YAML", "copyYaml": "Kopírovat YAML", "running": "spuštěno", "off": "vypnuto", "manualTime": "Ruční čas", "minutes": "minuty", "savedSchedules": "Uložené plány", "newSchedule": "Nový plán", "noSchedules": "Zatím žádné uložené plány.", "start": "Začátek", "edit": "Upravit", "delete": "Smazat", "noDay": "Není vybrán žádný den", "noZone": "Není vybrána žádná zóna", "back": "Zpět", "editSchedule": "Upravit plán", "name": "Název", "enabled": "Plán povolen", "begins": "Čas zahájení", "cycle": "Cyklus", "weekly": "Týdenní cyklus", "odd": "Liché dny", "even": "Sudé dny", "zonesOrder": "Zóny, trvání a pořadí", "time": "Čas", "order": "Pořadí", "remaining": "zbývající čas", "loading": "Načítání obrázku...", "language": "Jazyk", "automatic": "Automaticky", "selectSchedule": "Vyberte plán nebo vytvořte nový.", "chooseSchedule": "Vyberte plán, který chcete spustit.", "noEnabledSchedule": "Není povolen žádný plán.", "saved": "Plán uložen.", "stopped": "Zavlažování zastaveno.", "copied": "YAML zkopírován do schránky.", "settings": "Nastavení", "settingsHelp": "Automaticky se řídí jazykem Domácího asistenta. Ručně vybraný jazyk je v tomto prohlížeči zapamatován.", "pump": "Čerpadlo", "pumpRunning": "BĚŽÍ", "pumpStarting": "SPUŠTĚNÍ…", "pumpStopping": "ZASTAVENÍ…", "pumpFailed": "SPUŠTĚNÍ SE NEZDAŘILO", "pumpStopped": "ZASTAVENO", "power": "Napájení", "current": "Proud", "voltage": "Napětí" };
CORE["sk"] = { "title": "Zavlažovací systém", "subtitle": "Ovládanie zavlažovacej zóny na základe mapy", "editHint": "Vyberte zónu a potom kliknite na polohu zavlažovača na mape", "markHeads": "Označte zavlažovače", "done": "Hotovo", "noIrrigation": "Neprebieha žiadne zavlažovanie", "save": "Uložiť", "startNow": "Spustiť teraz", "stop": "Zastaviť", "schedule": "Plán zavlažovania", "yamlExport": "Export YAML", "copyYaml": "Kopírovať YAML", "running": "spustené", "off": "vypnuté", "manualTime": "Manuálny čas", "minutes": "minúty", "savedSchedules": "Uložené plány", "newSchedule": "Nový plán", "noSchedules": "Zatiaľ žiadne uložené plány.", "start": "Štart", "edit": "Upraviť", "delete": "Odstrániť", "noDay": "Žiadny vybraný deň", "noZone": "Žiadna vybraná zóna", "back": "Späť", "editSchedule": "Upraviť rozvrh", "name": "Názov", "enabled": "Rozvrh povolený", "begins": "Čas začiatku", "cycle": "Cyklus", "weekly": "Týždenný cyklus", "odd": "Nepárne dni", "even": "Párne dni", "zonesOrder": "Zóny, trvanie a poradie", "time": "Čas", "order": "Poradie", "remaining": "zostávajúci čas", "loading": "Načítava sa obrázok...", "language": "Jazyk", "automatic": "Automaticky", "selectSchedule": "Vyberte rozvrh alebo vytvorte nový.", "chooseSchedule": "Vyberte rozvrh, ktorý chcete spustiť.", "noEnabledSchedule": "Žiadny povolený rozvrh.", "saved": "Rozvrh uložený.", "stopped": "Zavlažovanie zastavené.", "copied": "YAML skopírovaný do schránky.", "settings": "Nastavenia", "settingsHelp": "Automaticky sa riadi jazykom Domáceho asistenta. Ručne vybraný jazyk sa v tomto prehliadači zapamätá.", "pump": "Čerpadlo", "pumpRunning": "V PREVÁDZKE", "pumpStarting": "SPUSTENIE…", "pumpStopping": "ZASTAVENIE…", "pumpFailed": "SPUSTENIE NEPODARILO SA", "pumpStopped": "ZASTAVENÉ", "power": "Napájanie", "current": "Prúd", "voltage": "Napätie" };
CORE["ro"] = { "title": "Sistem de irigații", "subtitle": "Controlul zonei de irigații bazat pe hartă", "editHint": "Selectați o zonă, apoi faceți clic pe poziția sprinklerului pe hartă", "markHeads": "Marcați sprinklerele", "done": "Gata", "noIrrigation": "Nicio irigare în curs", "save": "Salvați", "startNow": "Începeți acum", "stop": "Opriți", "schedule": "Program de irigare", "yamlExport": "Export YAML", "copyYaml": "Copiați YAML", "running": "în funcțiune", "off": "oprit", "manualTime": "Timp manual", "minutes": "minute", "savedSchedules": "Programe salvate", "newSchedule": "Program nou", "noSchedules": "Niciun program salvat încă.", "start": "Pornire", "edit": "Editare", "delete": "Ștergere", "noDay": "Nicio zi selectată", "noZone": "Nicio zonă selectată", "back": "Înapoi", "editSchedule": "Editare program", "name": "Nume", "enabled": "Program activat", "begins": "Ora de începere", "cycle": "Ciclu", "weekly": "Ciclu săptămânal", "odd": "Zile impare", "even": "Zile pare", "zonesOrder": "Zone, durată și ordine", "time": "Timp", "order": "Ordine", "remaining": "timp rămas", "loading": "Se încarcă imaginea...", "language": "Limbă", "automatic": "Automat", "selectSchedule": "Selectați un program sau creați unul nou.", "chooseSchedule": "Selectați programul de pornire.", "noEnabledSchedule": "Niciun program activat.", "saved": "Program salvat.", "stopped": "Irigarea oprită.", "copied": "YAML copiat în clipboard.", "settings": "Setări", "settingsHelp": "Automat respectă limba Home Assistant. O limbă selectată manual este memorată în acest browser.", "pump": "Pompă", "pumpRunning": "FUNCȚIONARE", "pumpStarting": "PORNIRE…", "pumpStopping": "OPRIRE…", "pumpFailed": "PORNIRE NEREUSITĂ", "pumpStopped": "OPRIT", "power": "Alimentare", "current": "Curent", "voltage": "Tensiune" };
CORE["da"] = { "title": "Vandingssystem", "subtitle": "Kortbaseret kontrol af vandingszone", "editHint": "Vælg en zone, og klik derefter på sprinklerpositionen på kortet", "markHeads": "Marker sprinklere", "done": "Udført", "noIrrigation": "Ingen vanding i gang", "save": "Gem", "startNow": "Start nu", "stop": "Stop", "schedule": "Vandingsplan", "yamlExport": "YAML-eksport", "copyYaml": "Kopiér YAML", "running": "kører", "off": "slukket", "manualTime": "Manuel tid", "minutes": "minutter", "savedSchedules": "Gemte planer", "newSchedule": "Ny plan", "noSchedules": "Ingen gemte planer endnu.", "start": "Start", "edit": "Rediger", "delete": "Slet", "noDay": "Ingen valgt dag", "noZone": "Ingen valgt zone", "back": "Tilbage", "editSchedule": "Rediger tidsplan", "name": "Navn", "enabled": "Tidsplan aktiveret", "begins": "Starttidspunkt", "cycle": "Cyklus", "weekly": "Ugentlig cyklus", "odd": "Ulige dage", "even": "Lige dage", "zonesOrder": "Zoner, varighed og rækkefølge", "time": "Tid", "order": "Rækkefølge", "remaining": "resterende tid", "loading": "Indlæser billede...", "language": "Sprog", "automatic": "Automatisk", "selectSchedule": "Vælg en tidsplan eller opret en ny.", "chooseSchedule": "Vælg den tidsplan, der skal startes.", "noEnabledSchedule": "Ingen aktiveret tidsplan.", "saved": "Tidsplan gemt.", "stopped": "Vanding stoppet.", "copied": "YAML kopieret til udklipsholder.", "settings": "Indstillinger", "settingsHelp": "Automatisk følger Home Assistants sprog. Et manuelt valgt sprog huskes i denne browser.", "pump": "Pumpe", "pumpRunning": "KØRER", "pumpStarting": "STARTER…", "pumpStopping": "STOPPER…", "pumpFailed": "KUNNE IKKE STARTE", "pumpStopped": "STOPPET", "power": "Strøm", "current": "Strøm", "voltage": "Spænding" };
CORE["sv"] = { "title": "Bevattningssystem", "subtitle": "Kartbaserad bevattningszonkontroll", "editHint": "Välj en zon och klicka sedan på sprinklerpositionen på kartan", "markHeads": "Markera sprinklers", "done": "Klar", "noIrrigation": "Ingen bevattning pågår", "save": "Spara", "startNow": "Starta nu", "stop": "Stopp", "schedule": "Bevattningsschema", "yamlExport": "YAML-export", "copyYaml": "Kopiera YAML", "running": "körs", "off": "avstängd", "manualTime": "Manuell tid", "minutes": "minuter", "savedSchedules": "Sparade scheman", "newSchedule": "Nytt schema", "noSchedules": "Inga sparade scheman ännu.", "start": "Start", "edit": "Redigera", "delete": "Radera", "noDay": "Ingen vald dag", "noZone": "Ingen vald zon", "back": "Tillbaka", "editSchedule": "Redigera schema", "name": "Namn", "enabled": "Schema aktiverat", "begins": "Starttid", "cycle": "Cykel", "weekly": "Veckocykel", "odd": "Udda dagar", "even": "Jämna dagar", "zonesOrder": "Zoner, varaktighet och ordning", "time": "Tid", "order": "Ordning", "remaining": "återstående tid", "loading": "Laddar bild...", "language": "Språk", "automatic": "Automatisk", "selectSchedule": "Välj ett schema eller skapa ett nytt.", "chooseSchedule": "Välj schemat som ska startas.", "noEnabledSchedule": "Inget aktiverat schema.", "saved": "Schema sparat.", "stopped": "Bevattning stoppad.", "copied": "YAML kopierad till urklipp.", "settings": "Inställningar", "settingsHelp": "Automatisk följer Home Assistants språk. Ett manuellt valt språk sparas i den här webbläsaren.", "pump": "Pump", "pumpRunning": "I KÖR", "pumpStarting": "STARTAR…", "pumpStopping": "STOPPAR…", "pumpFailed": "MISSLYCKADES STARTA", "pumpStopped": "STOPPAD", "power": "Ström", "current": "Ström", "voltage": "Spänning" };
CORE["no"] = { "title": "Vanningssystem", "subtitle": "Kartbasert kontroll av vanningssone", "editHint": "Velg en sone, og klikk deretter på sprinklerposisjonen på kartet", "markHeads": "Marker sprinkleranlegg", "done": "Ferdig", "noIrrigation": "Ingen vanning pågår", "save": "Lagre", "startNow": "Start nå", "stop": "Stopp", "schedule": "Vanningsplan", "yamlExport": "YAML-eksport", "copyYaml": "Kopier YAML", "running": "kjører", "off": "av", "manualTime": "Manuell tid", "minutes": "minutter", "savedSchedules": "Lagrede planer", "newSchedule": "Ny plan", "noSchedules": "Ingen lagrede planer ennå.", "start": "Start", "edit": "Rediger", "delete": "Slett", "noDay": "Ingen valgt dag", "noZone": "Ingen valgt sone", "back": "Tilbake", "editSchedule": "Rediger tidsplan", "name": "Navn", "enabled": "Tidsplan aktivert", "begins": "Starttidspunkt", "cycle": "Syklus", "weekly": "Ukesyklus", "odd": "Oddetallsdager", "even": "Partallsdager", "zonesOrder": "Soner, varighet og rekkefølge", "time": "Tid", "order": "Rekkefølge", "remaining": "gjenværende tid", "loading": "Laster inn bilde...", "language": "Språk", "automatic": "Automatisk", "selectSchedule": "Velg en tidsplan eller opprett en ny.", "chooseSchedule": "Velg tidsplanen som skal startes.", "noEnabledSchedule": "Ingen aktivert tidsplan.", "saved": "Tidsplan lagret.", "stopped": "Vanning stoppet.", "copied": "YAML kopiert til utklippstavlen.", "settings": "Innstillinger", "settingsHelp": "Automatisk følger Home Assistant-språket. Et manuelt valgt språk huskes i denne nettleseren.", "pump": "Pumpe", "pumpRunning": "KJØRER", "pumpStarting": "STARTER…", "pumpStopping": "STOPPING…", "pumpFailed": "START IKKE", "pumpStopped": "STOPPET", "power": "Strøm", "current": "Strøm", "voltage": "Spenning" };
CORE["fi"] = { "title": "Kastelujärjestelmä", "subtitle": "Karttapohjainen kasteluvyöhykkeen ohjaus", "editHint": "Valitse vyöhyke ja napsauta sitten sprinklerin sijaintia kartalla", "markHeads": "Merkitse sprinklerit", "done": "Valmis", "noIrrigation": "Ei kastelua käynnissä", "save": "Tallenna", "startNow": "Aloita nyt", "stop": "Pysäytä", "schedule": "Kasteluaikataulu", "yamlExport": "YAML-vienti", "copyYaml": "Kopioi YAML", "running": "käynnissä", "off": "pois päältä", "manualTime": "Manuaalinen aika", "minutes": "minuuttia", "savedSchedules": "Tallennetut aikataulut", "newSchedule": "Uusi aikataulu", "noSchedules": "Ei vielä tallennettuja aikatauluja.", "start": "Aloita", "edit": "Muokkaa", "delete": "Poista", "noDay": "Ei valittua päivää", "noZone": "Ei valittua vyöhykettä", "back": "Takaisin", "editSchedule": "Muokkaa aikataulua", "name": "Nimi", "enabled": "Aikataulu käytössä", "begins": "Aloitusaika", "cycle": "Sykli", "weekly": "Viikkosykli", "odd": "Parittomat päivät", "even": "Parilliset päivät", "zonesOrder": "Vyöhykkeet, kesto ja järjestys", "time": "Aika", "order": "Järjestys", "remaining": "Jäljellä oleva aika", "loading": "Ladataan kuvaa...", "language": "Kieli", "automatic": "Automaattinen", "selectSchedule": "Valitse aikataulu tai luo uusi.", "chooseSchedule": "Valitse aloitettava aikataulu.", "noEnabledSchedule": "Ei käytössä olevaa aikataulua.", "saved": "Aikataulu tallennettu.", "stopped": "Kastelu pysäytetty.", "copied": "YAML kopioitu leikepöydälle.", "settings": "Asetukset", "settingsHelp": "Automaattinen toiminto noudattaa Home Assistant -kielen asetusta. Manuaalisesti valittu kieli muistetaan tässä selaimessa.", "pump": "Pumppu", "pumpRunning": "KÄYNNISSÄ", "pumpStarting": "KÄYNNISTYY…", "pumpStopping": "PYSÄYTYKSESSÄ…", "pumpFailed": "KÄYNNISTYMINEN EI EPÄONNISTUNUT", "pumpStopped": "PYSÄYTETTY", "power": "Virta", "current": "Virta", "voltage": "Jännite" };
CORE["zh-CN"] = { "title": "灌溉系统", "subtitle": "基于地图的灌溉区域控制", "editHint": "选择一个区域，然后在地图上点击喷头位置", "markHeads": "标记喷头", "done": "完成", "noIrrigation": "当前无灌溉", "save": "保存", "startNow": "立即开始", "stop": "停止", "schedule": "灌溉计划", "yamlExport": "YAML 导出", "copyYaml": "复制 YAML", "running": "运行中", "off": "关闭", "manualTime": "手动设置时间", "minutes": "分钟", "savedSchedules": "已保存的计划", "newSchedule": "新建计划", "noSchedules": "暂无已保存的计划。", "start": "开始", "edit": "编辑", "delete": "删除", "noDay": "未选择日期", "noZone": "未选择区域", "back": "返回", "editSchedule": "编辑计划", "name": "名称", "enabled": "计划已启用", "begins": "开始时间", "cycle": "周期", "weekly": "每周周期", "odd": "单日", "even": "双日", "zonesOrder": "区域、持续时间和顺序", "time": "时间", "order": "顺序", "remaining": "剩余时间", "loading": "正在加载图像...", "language": "语言", "automatic": "自动", "selectSchedule": "选择计划或创建新计划。", "chooseSchedule": "选择要开始的计划。", "noEnabledSchedule": "未启用计划。", "saved": "计划已保存。", "stopped": "灌溉已停止。", "copied": "YAML 文件已复制到剪贴板。", "settings": "设置", "settingsHelp": "自动语言跟随 Home Assistant 的语言。 手动选择的语言会在此浏览器中保存。", "pump": "水泵", "pumpRunning": "运行中", "pumpStarting": "启动中…", "pumpStopping": "停止中…", "pumpFailed": "启动失败", "pumpStopped": "已停止", "power": "功率", "current": "电流", "voltage": "电压" };
CORE["zh-TW"] = { "title": "灌溉系統", "subtitle": "基於地圖的灌溉區域控制", "editHint": "選擇一個區域，然後在地圖上點選噴頭位置", "markHeads": "標記噴頭", "done": "完成", "noIrrigation": "目前無灌溉", "save": "保存", "startNow": "立即開始", "stop": "停止", "schedule": "灌溉計劃", "yamlExport": "YAML 匯出", "copyYaml": "複製 YAML", "running": "運行中", "off": "關閉", "manualTime": "手動設定時間", "minutes": "分鐘", "savedSchedules": "已保存的計劃", "newSchedule": "新建計劃", "noSchedules": "暫無已保存的計劃。", "start": "開始", "edit": "編輯", "delete": "刪除", "noDay": "未選擇日期", "noZone": "未選擇區域", "back": "返回", "editSchedule": "編輯計劃", "name": "名稱", "enabled": "計劃已啟用", "begins": "開始時間", "cycle": "週期", "weekly": "每週週期", "odd": "單日", "even": "雙日", "zonesOrder": "區域、持續時間和順序", "time": "時間", "order": "順序", "remaining": "剩餘時間", "loading": "正在載入圖片...", "language": "語言", "automatic": "自動", "selectSchedule": "選擇計劃或建立新計劃。", "chooseSchedule": "選擇要開始的計劃。", "noEnabledSchedule": "未啟用計劃。", "saved": "計劃已保存。", "stopped": "灌溉已停止。", "copied": "YAML 檔案已複製到剪貼簿。", "settings": "設定", "settingsHelp": "自動語言跟隨 Home Assistant 的語言。 手動選擇的語言會在此瀏覽器中儲存。", "pump": "水泵", "pumpRunning": "運行中", "pumpStarting": "啟動中…", "pumpStopping": "停止中…", "pumpFailed": "啟動失敗", "pumpStopped": "已停止", "power": "功率", "current": "電流", "voltage": "電壓" };
CORE["th"] = { "title": "ระบบชลประทาน", "subtitle": "การควบคุมโซนชลประทานบนแผนที่", "editHint": "เลือกโซน จากนั้นคลิกตำแหน่งหัวฉีดน้ำบนแผนที่", "markHeads": "ทำเครื่องหมายหัวฉีดน้ำ", "done": "เสร็จสิ้น", "noIrrigation": "ไม่มีระบบชลประทานกำลังทำงานอยู่", "save": "บันทึก", "startNow": "เริ่มทันที", "stop": "หยุด", "schedule": "ตารางการชลประทาน", "yamlExport": "ส่งออก YAML", "copyYaml": "คัดลอก YAML", "running": "กำลังทำงาน", "off": "ปิด", "manualTime": "ตั้งเวลาด้วยตนเอง", "minutes": "นาที", "savedSchedules": "ตารางที่บันทึกไว้", "newSchedule": "ตารางใหม่", "noSchedules": "ยังไม่มีตารางที่บันทึกไว้", "start": "เริ่ม", "edit": "แก้ไข", "delete": "ลบ", "noDay": "ไม่ได้เลือกวัน", "noZone": "ไม่ได้เลือกโซน", "back": "ย้อนกลับ", "editSchedule": "แก้ไขตารางเวลา", "name": "ชื่อ", "enabled": "เปิดใช้งานตารางเวลาแล้ว", "begins": "เวลาเริ่มต้น", "cycle": "รอบ", "weekly": "รอบรายสัปดาห์", "odd": "วันคี่", "even": "วันคู่", "zonesOrder": "โซน ระยะเวลา และลำดับ", "time": "เวลา", "order": "ลำดับ", "remaining": "เวลาที่เหลือ", "loading": "กำลังโหลดภาพ...", "language": "ภาษา", "automatic": "อัตโนมัติ", "selectSchedule": "เลือกตารางเวลาหรือสร้างตารางเวลาใหม่", "chooseSchedule": "เลือกตารางเวลาที่จะเริ่มต้น", "noEnabledSchedule": "ไม่ได้เปิดใช้งานตารางเวลา", "saved": "บันทึกตารางเวลาแล้ว", "stopped": "หยุดการชลประทานแล้ว", "copied": "คัดลอก YAML ไปยังคลิปบอร์ดแล้ว", "settings": "การตั้งค่า", "settingsHelp": "อัตโนมัติจะใช้ภาษาของ Home Assistant ภาษาที่เลือกด้วยตนเองจะถูกจดจำไว้ในเบราว์เซอร์นี้", "pump": "ปั๊ม", "pumpRunning": "กำลังทำงาน", "pumpStarting": "กำลังเริ่มต้น…", "pumpStopping": "กำลังหยุด…", "pumpFailed": "เริ่มต้นไม่สำเร็จ", "pumpStopped": "หยุดแล้ว", "power": "พลังงาน", "current": "กระแสไฟ", "voltage": "แรงดันไฟฟ้า" };
CORE["vi"] = { "title": "Hệ thống tưới tiêu", "subtitle": "Điều khiển vùng tưới dựa trên bản đồ", "editHint": "Chọn một vùng, sau đó nhấp vào vị trí vòi phun trên bản đồ", "markHeads": "Đánh dấu vòi phun", "done": "Xong", "noIrrigation": "Không có hoạt động tưới tiêu nào đang diễn ra", "save": "Lưu", "startNow": "Bắt đầu ngay", "stop": "Dừng", "schedule": "Lịch trình tưới tiêu", "yamlExport": "Xuất YAML", "copyYaml": "Sao chép YAML", "running": "Đang chạy", "off": "Tắt", "manualTime": "Thời gian thủ công", "minutes": "Phút", "savedSchedules": "Lịch trình đã lưu", "newSchedule": "Lịch trình mới", "noSchedules": "Chưa có lịch trình nào được lưu.", "start": "Bắt đầu", "edit": "Chỉnh sửa", "delete": "Xóa", "noDay": "Chưa chọn ngày", "noZone": "Chưa chọn khu vực", "back": "Quay lại", "editSchedule": "Chỉnh sửa lịch trình", "name": "Tên", "enabled": "Lịch trình đã được kích hoạt", "begins": "Thời gian bắt đầu", "cycle": "Chu kỳ", "weekly": "Chu kỳ hàng tuần", "odd": "Ngày lẻ", "even": "Ngày chẵn", "zonesOrder": "Khu vực, thời lượng và thứ tự", "time": "Thời gian", "order": "Thứ tự", "remaining": "Thời gian còn lại", "loading": "Đang tải hình ảnh...", "language": "Ngôn ngữ", "automatic": "Tự động", "selectSchedule": "Chọn lịch trình hoặc tạo lịch trình mới.", "chooseSchedule": "Chọn lịch trình để bắt đầu.", "noEnabledSchedule": "Chưa có lịch trình nào được kích hoạt.", "saved": "Lịch trình đã được lưu.", "stopped": "Tưới tiêu đã dừng.", "copied": "YAML đã được sao chép vào clipboard.", "settings": "Cài đặt", "settingsHelp": "Chế độ tự động tuân theo ngôn ngữ của Home Assistant. Ngôn ngữ được chọn thủ công sẽ được ghi nhớ trong trình duyệt này.", "pump": "Bơm", "pumpRunning": "ĐANG CHẠY", "pumpStarting": "ĐANG KHỞI ĐỘNG…", "pumpStopping": "ĐANG DỪNG…", "pumpFailed": "KHÔNG KHỞI ĐỘNG ĐƯỢC", "pumpStopped": "ĐÃ DỪNG", "power": "Công suất", "current": "Dòng điện", "voltage": "Điện áp" };
CORE["ko"] = { "title": "관개 시스템", "subtitle": "지도 기반 관개 구역 제어", "editHint": "구역을 선택한 다음 지도에서 스프링클러 위치를 클릭합니다.", "markHeads": "스프링클러 표시", "done": "완료", "noIrrigation": "현재 관개 중이 아닙니다.", "save": "저장", "startNow": "지금 시작", "stop": "중지", "schedule": "관개 일정", "yamlExport": "YAML 내보내기", "copyYaml": "YAML 복사", "running": "실행 중", "off": "꺼짐", "manualTime": "수동 시간", "minutes": "분", "savedSchedules": "저장된 일정", "newSchedule": "새 일정", "noSchedules": "아직 저장된 일정이 없습니다.", "start": "시작", "edit": "편집", "delete": "삭제", "noDay": "선택된 날짜 없음", "noZone": "선택된 구역 없음", "back": "뒤로", "editSchedule": "일정 편집", "name": "이름", "enabled": "일정 활성화됨", "begins": "시작 시간", "cycle": "주기", "weekly": "주간 주기", "odd": "홀수 날", "even": "짝수 날", "zonesOrder": "구역, 기간 및 순서", "time": "시간", "order": "순서", "remaining": "남은 시간", "loading": "이미지 불러오는 중...", "language": "언어", "automatic": "자동", "selectSchedule": "일정을 선택하거나 새 일정을 만드세요.", "chooseSchedule": "시작할 일정을 선택하세요.", "noEnabledSchedule": "활성화된 일정이 없습니다.", "saved": "일정이 저장되었습니다.", "stopped": "관개가 중지되었습니다.", "copied": "YAML 파일이 클립보드에 복사되었습니다.", "settings": "설정", "settingsHelp": "자동 설정은 Home Assistant의 언어 설정을 따릅니다. 수동으로 선택한 언어는 이 브라우저에 저장됩니다.", "pump": "펌프", "pumpRunning": "작동 중", "pumpStarting": "시작 중…", "pumpStopping": "정지 중…", "pumpFailed": "시작 실패", "pumpStopped": "정지됨", "power": "전원", "current": "전류", "voltage": "전압" };
CORE["km"] = { "title": "ប្រព័ន្ធស្រោចស្រព", "subtitle": "ការគ្រប់គ្រងតំបន់ស្រោចស្រពផ្អែកលើផែនទី", "editHint": "ជ្រើសរើសតំបន់មួយ បន្ទាប់មកចុចលើទីតាំងប្រព័ន្ធស្រោចស្រពនៅលើផែនទី", "markHeads": "សម្គាល់ប្រព័ន្ធស្រោចស្រព", "done": "រួចរាល់", "noIrrigation": "គ្មានប្រព័ន្ធស្រោចស្រពកំពុងដំណើរការទេ", "save": "រក្សាទុក", "startNow": "ចាប់ផ្តើមឥឡូវនេះ", "stop": "បញ្ឈប់", "schedule": "កាលវិភាគស្រោចស្រព", "yamlExport": "នាំចេញ YAML", "copyYaml": "ចម្លង YAML", "running": "កំពុងដំណើរការ", "off": "បិទ", "manualTime": "ពេលវេលាដោយដៃ", "minutes": "នាទី", "savedSchedules": "កាលវិភាគដែលបានរក្សាទុក", "newSchedule": "កាលវិភាគថ្មី", "noSchedules": "មិនទាន់មានកាលវិភាគដែលបានរក្សាទុកនៅឡើយទេ។", "start": "ចាប់ផ្តើម", "edit": "កែសម្រួល", "delete": "លុប", "noDay": "គ្មានថ្ងៃដែលបានជ្រើសរើសទេ", "noZone": "គ្មានតំបន់ដែលបានជ្រើសរើសទេ", "back": "ថយក្រោយ", "editSchedule": "កែសម្រួលកាលវិភាគ", "name": "ឈ្មោះ", "enabled": "កាលវិភាគត្រូវបានបើក", "begins": "ពេលវេលាចាប់ផ្តើម", "cycle": "វដ្ត", "weekly": "វដ្តប្រចាំសប្តាហ៍", "odd": "ថ្ងៃសេស", "even": "ថ្ងៃគូ", "zonesOrder": "តំបន់ រយៈពេល និងលំដាប់", "time": "ពេលវេលា", "order": "លំដាប់", "remaining": "ពេលវេលាដែលនៅសល់", "loading": "កំពុងផ្ទុករូបភាព...", "language": "ភាសា", "automatic": "ស្វ័យប្រវត្តិ", "selectSchedule": "ជ្រើសរើសកាលវិភាគ ឬបង្កើតកាលវិភាគថ្មី។", "chooseSchedule": "ជ្រើសរើសកាលវិភាគដើម្បីចាប់ផ្តើម។", "noEnabledSchedule": "គ្មានកាលវិភាគត្រូវបានបើកទេ។", "saved": "កាលវិភាគត្រូវបានរក្សាទុក។", "stopped": "ប្រព័ន្ធធារាសាស្រ្តបានឈប់។", "copied": "YAML ត្រូវបានចម្លងទៅក្ដារតម្បៀតខ្ទាស់។", "settings": "ការកំណត់", "settingsHelp": "ស្វ័យប្រវត្តិធ្វើតាមភាសា Home Assistant។ ភាសាដែលបានជ្រើសរើសដោយដៃត្រូវបានចងចាំនៅក្នុងកម្មវិធីរុករកនេះ។", "pump": "ស្នប់", "pumpRunning": "កំពុងដំណើរការ", "pumpStarting": "កំពុងចាប់ផ្តើម…", "pumpStopping": "កំពុងឈប់…", "pumpFailed": "បរាជ័យក្នុងការចាប់ផ្តើម", "pumpStopped": "បានឈប់", "power": "ថាមពល", "current": "ចរន្ត", "voltage": "វ៉ុល" };
CORE["tr"] = { "title": "Sulama sistemi", "subtitle": "Harita tabanlı sulama bölgesi kontrolü", "editHint": "Bir bölge seçin, ardından haritadaki fıskiye konumuna tıklayın", "markHeads": "Fıskiyeleri işaretle", "done": "Tamamlandı", "noIrrigation": "Devam eden sulama yok", "save": "Kaydet", "startNow": "Şimdi başlat", "stop": "Durdur", "schedule": "Sulama programı", "yamlExport": "YAML dışa aktarma", "copyYaml": "YAML kopyala", "running": "çalışıyor", "off": "kapalı", "manualTime": "Manuel zaman", "minutes": "dakika", "savedSchedules": "Kaydedilen programlar", "newSchedule": "Yeni program", "noSchedules": "Henüz kaydedilmiş program yok.", "start": "Başlat", "edit": "Düzenle", "delete": "Sil", "noDay": "Seçili gün yok", "noZone": "Seçili bölge yok", "back": "Geri", "editSchedule": "Programı düzenle", "name": "Ad", "enabled": "Program etkin", "begins": "Başlangıç ​​saati", "cycle": "Döngü", "weekly": "Haftalık döngü", "odd": "Tek günler", "even": "Çift günler", "zonesOrder": "Bölgeler, süre ve sıra", "time": "Saat", "order": "Sıra", "remaining": "Kalan süre", "loading": "Görüntü yükleniyor...", "language": "Dil", "automatic": "Otomatik", "selectSchedule": "Bir program seçin veya yeni bir program oluşturun.", "chooseSchedule": "Başlatılacak programı seçin.", "noEnabledSchedule": "Etkinleştirilmiş program yok.", "saved": "Program kaydedildi.", "stopped": "Sulama durduruldu.", "copied": "YAML panoya kopyalandı.", "settings": "Ayarlar", "settingsHelp": "Otomatik ayar, Home Assistant dilini takip eder. Manuel olarak seçilen bir dil bu tarayıcıda saklanır.", "pump": "Pompa", "pumpRunning": "ÇALIŞIYOR", "pumpStarting": "BAŞLATILIYOR…", "pumpStopping": "DURDURULUYOR…", "pumpFailed": "BAŞLATILAMADI", "pumpStopped": "DURDURULDU", "power": "Güç", "current": "Akım", "voltage": "Voltaj" };
var DAY_LABELS_BY_LANGUAGE = {
  en: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
  hu: ["H", "K", "Sze", "Cs", "P", "Szo", "V"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  fr: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  es: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"],
  it: ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
  pt: ["Se", "Te", "Qu", "Qu", "Se", "Sá", "Do"],
  nl: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
  pl: ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
  cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
  sk: ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"],
  ro: ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"],
  da: ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
  sv: ["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"],
  no: ["Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
  fi: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
  "zh-CN": ["一", "二", "三", "四", "五", "六", "日"],
  "zh-TW": ["一", "二", "三", "四", "五", "六", "日"],
  tr: ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"],
  th: ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  ko: ["월", "화", "수", "목", "금", "토", "일"],
  km: ["ច", "អ", "ពុ", "ព្រ", "សុ", "ស", "អា"]
};
var NEXT_IRRIGATION_TEXT = {
  en: ["Next irrigation", "No scheduled irrigation"],
  hu: ["Következő locsolás", "Nincs ütemezett locsolás"],
  de: ["Nächste Bewässerung", "Keine Bewässerung geplant"],
  fr: ["Prochain arrosage", "Aucun arrosage programmé"],
  es: ["Próximo riego", "No hay riego programado"],
  it: ["Prossima irrigazione", "Nessuna irrigazione programmata"],
  pt: ["Próxima rega", "Nenhuma rega programada"],
  nl: ["Volgende irrigatie", "Geen irrigatie gepland"],
  pl: ["Następne nawadnianie", "Brak zaplanowanego nawadniania"],
  cs: ["Další zavlažování", "Žádné zavlažování není naplánováno"],
  sk: ["Ďalšie zavlažovanie", "Nie je naplánované žiadne zavlažovanie"],
  ro: ["Următoarea irigare", "Nicio irigare programată"],
  da: ["Næste vanding", "Ingen planlagt vanding"],
  sv: ["Nästa bevattning", "Ingen bevattning planerad"],
  no: ["Neste vanning", "Ingen planlagt vanning"],
  fi: ["Seuraava kastelu", "Ei ajastettua kastelua"],
  "zh-CN": ["下次灌溉", "没有计划灌溉"],
  "zh-TW": ["下次灌溉", "沒有排定的灌溉"],
  tr: ["Sonraki sulama", "Planlanmış sulama yok"],
  th: ["การรดน้ำครั้งถัดไป", "ไม่มีการรดน้ำตามกำหนดเวลา"],
  vi: ["Lần tưới tiếp theo", "Không có lịch tưới"],
  ko: ["다음 관개", "예약된 관개 없음"],
  km: ["ការស្រោចស្រពបន្ទាប់", "មិនមានការស្រោចស្រពតាមកាលវិភាគទេ"]
};
var NEXT_COUNTDOWN_TEXT = {
  hu: "Indulásig",
  en: "Starts in"
};
var IrrigationMapCard = class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.config = {};
    this.hassObj = null;
    this.image = null;
    this.activeZone = 1;
    this.editMode = false;
    this.yamlOpen = false;
    this.scheduleOpen = false;
    this.settingsOpen = false;
    this.schedulePrograms = [];
    this.editingProgram = null;
    this.scheduleLoaded = false;
    this.clockTimer = null;
    this.headAnimationFrame = null;
    this.headAnimationLast = 0;
    this.headAnimationPhase = 0;
    this.heads = [];
    this.pumpStartAt = 0;
    this.pumpWasRequested = false;
  }
  connectedCallback() {
    if (!this.clockTimer) {
      this.clockTimer = window.setInterval(() => {
        this.updateScheduleStatus();
        this.updatePumpStatus();
      }, 1e3);
    }
    this.syncHeadAnimation();
  }
  disconnectedCallback() {
    window.clearInterval(this.clockTimer);
    this.clockTimer = null;
    if (this.headAnimationFrame) {
      window.cancelAnimationFrame(this.headAnimationFrame);
      this.headAnimationFrame = null;
    }
  }
  setConfig(config) {
    this.config = config || {};
    this.heads = this.readHeads();
    this.activeZone = Number(this.config.active_zone || this.config.activeZone || 1);
    this.loadImage();
    this.render();
  }
  set hass(hass) {
    this.hassObj = hass;
    if (!this.scheduleLoaded && hass?.states?.[SCHEDULER_ENTITIES.programs[0]]) {
      this.schedulePrograms = this.readSchedulePrograms();
      this.scheduleLoaded = true;
      this.renderScheduler();
    }
    if (!this.shadowRoot?.querySelector("ha-card")) {
      this.render();
      return;
    }
    if (!this.manualInputActive) {
      this.renderZones();
    }
    this.updatePumpStatus();
    this.updateRainSettings();
    this.updateYaml();
    this.updateScheduleStatus();
    requestAnimationFrame(() => this.draw());
    this.syncHeadAnimation();
  }
  getCardSize() {
    return 12;
  }
  language() {
    const stored = window.localStorage?.getItem("irrigation-map-card-language");
    const selected = String(stored || this.config.language || "auto");
    const raw = selected === "auto" ? this.hassObj?.locale?.language || this.hassObj?.language || navigator.language || "en" : selected;
    const lower = raw.replace("_", "-").toLowerCase();
    if (lower.startsWith("zh")) return /tw|hk|hant/.test(lower) ? "zh-TW" : "zh-CN";
    const short = lower.split("-")[0];
    if (short === "nb" || short === "nn") return "no";
    return LANGUAGES.some(([code]) => code === short) ? short : "en";
  }
  t(key) {
    const language = this.language();
    return (language === "hu" ? HU[key] : CORE[language]?.[key]) ?? EN[key] ?? key;
  }
  dayLabels() {
    return DAY_LABELS_BY_LANGUAGE[this.language()] || DAY_LABELS_BY_LANGUAGE.en;
  }
  pumpData() {
    const entities = { ...DEFAULT_PUMP_ENTITIES, ...this.config.pump_entities || this.config.pumpEntities || {} };
    const read = (entity) => {
      const value = Number.parseFloat(this.hassObj?.states?.[entity]?.state);
      return Number.isFinite(value) ? value : null;
    };
    const power = read(entities.power);
    const current = read(entities.current);
    const voltage = read(entities.voltage);
    const powerThreshold = Number(this.config.pump_power_threshold ?? 100);
    const currentThreshold = Number(this.config.pump_current_threshold ?? 1);
    const measuredRunning = (power ?? 0) > powerThreshold || (current ?? 0) > currentThreshold;
    const zoneRequested = this.zones().some((zone) => zone.active);
    return { power, current, voltage, measuredRunning, zoneRequested };
  }
  zones() {
    const configured = Array.isArray(this.config.zones) ? this.config.zones : [];
    return DEFAULT_ZONES.map((fallback, index) => {
      const zone = configured.find((item) => Number(item?.id) === fallback.id) || configured[index] || fallback;
      const entity = String(zone.entity || fallback.entity);
      return {
        id: Number(zone.id ?? index + 1),
        name: String(zone.name || fallback.name),
        entity,
        color: String(zone.color || fallback.color),
        active: this.hassObj?.states?.[entity]?.state === "on"
      };
    });
  }
  readHeads() {
    const source = Array.isArray(this.config.heads) ? this.config.heads : [];
    return source.map((head, index) => ({
      id: head.id ?? index + 1,
      name: String(head.name || `${index + 1}`),
      zone: Number(head.zone ?? 1),
      x: Number(head.x),
      y: Number(head.y),
      radius: Number(head.radius ?? 9),
      direction_angle: Number.isFinite(Number(head.direction_angle ?? head.directionAngle)) ? Number(head.direction_angle ?? head.directionAngle) : Math.round((Math.atan2(0.5 - Number(head.y), 0.5 - Number(head.x)) * 180 / Math.PI + 360) % 360),
      sweep_angle: Number(head.sweep_angle ?? head.sweepAngle ?? 110),
      sweep_speed: Number(head.sweep_speed ?? head.sweepSpeed ?? 1),
      spray_distance: Number(head.spray_distance ?? head.sprayDistance ?? 6)
    })).filter((head) => Number.isFinite(head.x) && Number.isFinite(head.y));
  }
  loadImage() {
    const url = this.config.image || "/local/garden.jpg";
    if (this.image?.dataset?.url === url) {
      return;
    }
    const image = new Image();
    image.dataset.url = url;
    image.onload = () => this.draw();
    image.src = url;
    this.image = image;
  }
  render() {
    if (!this.shadowRoot) {
      return;
    }
    const currentLanguage = window.localStorage?.getItem("irrigation-map-card-language") || this.config.language || "auto";
    const rainDelayEntity = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainDelaySelect];
    const rainDelayOptions = Array.isArray(rainDelayEntity?.attributes?.options) ? rainDelayEntity.attributes.options : ["0 óra", "6 óra", "12 óra", "24 óra", "48 óra"];
    const selectedRainDelay = rainDelayEntity?.state || "12 óra";
    const rainMinimumEntity = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainMinimumSelect];
    const rainMinimumOptions = Array.isArray(rainMinimumEntity?.attributes?.options) ? rainMinimumEntity.attributes.options : ["0 perc", "15 perc", "30 perc", "60 perc"];
    const selectedRainMinimum = rainMinimumEntity?.state || "30 perc";
    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>${this.styles()}</style>
        <section class="top">
          <div>
            <h2>${this.config.name || this.t("title")}</h2>
            <p>${this.editMode ? this.t("editHint") : this.t("subtitle")}</p>
          </div>
          <button class="edit ${this.editMode ? "active" : ""}" type="button" data-action="edit">${this.editMode ? this.t("done") : this.t("markHeads")}</button>
        </section>
        <div class="map-wrap">
          <canvas></canvas>
        </div>
        <section class="zones"></section>
        <section class="pump-status"></section>
        <section class="quick-controls">
          <div class="schedule-status main-schedule-status">${this.t("noIrrigation")}</div>
          <div class="next-irrigation"></div>
          <div class="quick-actions">
            <button type="button" class="save" data-action="quick-save">${this.t("save")}</button>
            <button type="button" class="start" data-action="quick-start">${this.t("startNow")}</button>
            <button type="button" class="stop" data-action="quick-stop">${this.t("stop")}</button>
          </div>
        </section>
        <details class="settings-box" ${this.settingsOpen ? "open" : ""}>
          <summary>⚙ ${this.t("settings")}</summary>
          <div class="settings-content">
            <label class="settings-field"><span>${this.t("language")}</span>
              <select data-action="language">${LANGUAGES.map(([code, name]) => `<option value="${code}" ${code === currentLanguage ? "selected" : ""}>${code === "auto" ? this.t("automatic") : name}</option>`).join("")}</select>
            </label>
            <div class="rain-settings">
              <div class="rain-state" data-rain-state></div>
              <label class="settings-field"><span>${this.t("rainDelay")}</span>
                <select data-action="rain-delay">${rainDelayOptions.map((option) => `<option value="${escapeHtml(option)}" ${option === selectedRainDelay ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>
              </label>
              <label class="settings-field"><span>${this.t("rainMinimum")}</span>
                <select data-action="rain-minimum">${rainMinimumOptions.map((option) => `<option value="${escapeHtml(option)}" ${option === selectedRainMinimum ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>
              </label>
              <p class="settings-help rain-delay-remaining" data-rain-delay-remaining></p>
            </div>
            <p class="settings-help">${this.t("settingsHelp")}</p>
          </div>
        </details>
        <details class="schedule-box" ${this.scheduleOpen ? "open" : ""}>
          <summary>${this.t("schedule")}</summary>
          <div class="scheduler"></div>
        </details>
        <details class="yaml-box" ${this.yamlOpen ? "open" : ""}>
          <summary>${this.t("yamlExport")}</summary>
          <div class="yaml-content">
            <textarea readonly spellcheck="false"></textarea>
            <button type="button" data-action="copy">${this.t("copyYaml")}</button>
          </div>
        </details>
      </ha-card>
    `;
    this.shadowRoot.querySelector('[data-action="edit"]')?.addEventListener("click", () => {
      this.editMode = !this.editMode;
      this.render();
    });
    this.shadowRoot.querySelector('[data-action="language"]')?.addEventListener("change", (event) => {
      window.localStorage?.setItem("irrigation-map-card-language", event.target.value);
      this.config = { ...this.config, language: event.target.value };
      this.render();
    });
    this.shadowRoot.querySelector('[data-action="rain-delay"]')?.addEventListener("change", async (event) => {
      if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.rainDelaySelect]) return;
      await this.hassObj.callService("input_select", "select_option", {
        entity_id: SCHEDULER_ENTITIES.rainDelaySelect,
        option: event.target.value
      });
      this.updateRainSettings();
    });
    this.shadowRoot.querySelector('[data-action="rain-minimum"]')?.addEventListener("change", async (event) => {
      if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.rainMinimumSelect]) return;
      await this.hassObj.callService("input_select", "select_option", {
        entity_id: SCHEDULER_ENTITIES.rainMinimumSelect,
        option: event.target.value
      });
      this.updateRainSettings();
    });
    this.shadowRoot.querySelector('[data-action="copy"]')?.addEventListener("click", () => this.copyYaml());
    this.shadowRoot.querySelector('[data-action="quick-save"]')?.addEventListener("click", () => this.quickSave());
    this.shadowRoot.querySelector('[data-action="quick-start"]')?.addEventListener("click", () => this.quickStart());
    this.shadowRoot.querySelector('[data-action="quick-stop"]')?.addEventListener("click", () => this.stopSchedule());
    this.shadowRoot.querySelector(".yaml-box")?.addEventListener("toggle", (event) => {
      this.yamlOpen = event.currentTarget.open;
    });
    this.shadowRoot.querySelector(".schedule-box")?.addEventListener("toggle", (event) => {
      this.scheduleOpen = event.currentTarget.open;
    });
    this.shadowRoot.querySelector(".settings-box")?.addEventListener("toggle", (event) => {
      this.settingsOpen = event.currentTarget.open;
    });
    const canvas = this.shadowRoot.querySelector("canvas");
    canvas?.addEventListener("click", (event) => this.handleMapClick(event));
    this.renderZones();
    this.updatePumpStatus();
    this.updateRainSettings();
    this.renderScheduler();
    this.updateYaml();
    requestAnimationFrame(() => this.draw());
  }
  updateRainSettings() {
    const stateElement = this.shadowRoot?.querySelector("[data-rain-state]");
    const remainingElement = this.shadowRoot?.querySelector("[data-rain-delay-remaining]");
    const select = this.shadowRoot?.querySelector('[data-action="rain-delay"]');
    const minimumSelect = this.shadowRoot?.querySelector('[data-action="rain-minimum"]');
    const rainSensor = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainSensor];
    const delayEntity = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainDelaySelect];
    const minimumEntity = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainMinimumSelect];
    const delayTimer = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainDelayTimer];
    if (select && delayEntity?.state && select.value !== delayEntity.state) {
      select.value = delayEntity.state;
    }
    if (minimumSelect && minimumEntity?.state && minimumSelect.value !== minimumEntity.state) {
      minimumSelect.value = minimumEntity.state;
    }
    if (stateElement) {
      const raining = rainSensor?.state === "on";
      stateElement.classList.toggle("raining", raining);
      stateElement.innerHTML = `<span>${this.t("rainSensor")}</span><strong>${raining ? this.t("rainNow") : this.t("noRain")}</strong>`;
    }
    if (remainingElement) {
      const remaining = delayTimer?.state === "active" ? this.timerRemaining(delayTimer) : "";
      remainingElement.textContent = remaining ? `${this.t("rainDelayRemaining")}: ${remaining}` : "";
    }
  }
  timerRemaining(timer) {
    const finishesAt = Date.parse(timer?.attributes?.finishes_at || "");
    let seconds = Number.isFinite(finishesAt) ? Math.max(0, Math.ceil((finishesAt - Date.now()) / 1e3)) : 0;
    if (!seconds && timer?.attributes?.remaining) {
      const parts = String(timer.attributes.remaining).split(":").map(Number);
      if (parts.length === 3 && parts.every(Number.isFinite)) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  renderZones() {
    const container = this.shadowRoot.querySelector(".zones");
    if (!container) {
      return;
    }
    container.innerHTML = "";
    for (const zone of this.zones()) {
      const minutesEntity = SCHEDULER_ENTITIES.manualMinutes[zone.id - 1];
      const minutes = clampNumber(this.hassObj?.states?.[minutesEntity]?.state, 1, 180, 15);
      const card = document.createElement("div");
      card.className = "zone-card";
      card.style.setProperty("--zone", zone.color);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `zone ${zone.active ? "running" : ""} ${zone.id === this.activeZone ? "selected" : ""}`;
      button.innerHTML = `<strong>${zone.name}</strong><span>${zone.active ? this.t("running") : this.t("off")}</span>`;
      button.addEventListener("click", () => {
        if (this.editMode) {
          this.activeZone = zone.id;
          this.render();
          return;
        }
        if (zone.active) {
          this.stopZone(zone);
          return;
        }
        this.startManualZone(zone, card.querySelector("input")?.value);
      });
      const duration = document.createElement("label");
      duration.className = "manual-duration";
      duration.innerHTML = `${this.t("manualTime")} <input type="number" inputmode="numeric" min="1" max="180" step="1" value="${minutes}"> <span>${this.t("minutes")}</span>`;
      const durationInput = duration.querySelector("input");
      durationInput?.addEventListener("pointerdown", () => {
        this.manualInputActive = true;
      });
      durationInput?.addEventListener("focus", () => {
        this.manualInputActive = true;
      });
      durationInput?.addEventListener("change", (event) => {
        this.saveManualMinutes(zone.id, event.target.value);
      });
      durationInput?.addEventListener("blur", async (event) => {
        const value = event.target.value;
        await this.saveManualMinutes(zone.id, value);
        this.manualInputActive = false;
        this.renderZones();
      });
      card.append(button, duration);
      container.appendChild(card);
    }
  }
  updatePumpStatus() {
    const container = this.shadowRoot?.querySelector(".pump-status");
    if (!container) return;
    const pump = this.pumpData();
    const value = (number, digits = 0) => number === null ? "—" : number.toFixed(digits);
    const labels = { pump: this.t("pump"), on: this.t("pumpRunning"), starting: this.t("pumpStarting"), stopping: this.t("pumpStopping"), failed: this.t("pumpFailed"), off: this.t("pumpStopped"), power: this.t("power"), current: this.t("current"), voltage: this.t("voltage") };
    if (pump.zoneRequested && !this.pumpWasRequested) this.pumpStartAt = Date.now();
    if (!pump.zoneRequested) this.pumpStartAt = 0;
    this.pumpWasRequested = pump.zoneRequested;
    const timeoutSeconds = Math.max(1, Number(this.config.pump_start_timeout ?? 15));
    const timedOut = pump.zoneRequested && !pump.measuredRunning && this.pumpStartAt > 0 && Date.now() - this.pumpStartAt >= timeoutSeconds * 1e3;
    const state = !pump.zoneRequested && pump.measuredRunning ? "stopping" : pump.measuredRunning ? "running" : timedOut ? "failed" : pump.zoneRequested ? "starting" : "stopped";
    const stateText = state === "running" ? labels.on : state === "stopping" ? labels.stopping : state === "failed" ? labels.failed : state === "starting" ? labels.starting : labels.off;
    container.innerHTML = `<div class="pump-head"><strong>${labels.pump}</strong><span class="pump-state ${state}">${stateText}</span></div>
      <div class="pump-values"><div><span>${labels.power}</span><strong>${value(pump.power)} W</strong></div><div><span>${labels.current}</span><strong>${value(pump.current, 2)} A</strong></div><div><span>${labels.voltage}</span><strong>${value(pump.voltage)} V</strong></div></div>`;
  }
  async saveManualMinutes(zoneId, value) {
    const minutes = clampNumber(value, 1, 180, 15);
    const entity = SCHEDULER_ENTITIES.manualMinutes[zoneId - 1];
    if (this.hassObj?.states?.[entity]) {
      await this.hassObj.callService("input_number", "set_value", { entity_id: entity, value: minutes });
    }
    return minutes;
  }
  async startManualZone(zone, value) {
    if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.manualRunScript]) {
      this.notify("A frissített irrigation_scheduler.yaml még nincs betöltve.");
      return;
    }
    const minutes = await this.saveManualMinutes(zone.id, value);
    await this.hassObj.callService("script", "turn_on", {
      entity_id: SCHEDULER_ENTITIES.manualRunScript,
      variables: { zone_id: zone.id, minutes }
    });
    this.notify(`${zone.name} elindítva ${minutes} percre.`);
  }
  async stopZone(zone) {
    if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.stopZoneScript]) {
      this.notify("A frissített irrigation_scheduler.yaml még nincs betöltve.");
      return;
    }
    await this.hassObj.callService("script", "turn_on", {
      entity_id: SCHEDULER_ENTITIES.stopZoneScript,
      variables: { zone_id: zone.id }
    });
    this.notify(`${zone.name} leállítva.`);
  }
  async toggleZone(zone) {
    const state = this.hassObj?.states?.[zone.entity];
    if (!state) {
      this.notify(`Nem talaltam: ${zone.entity}`);
      return;
    }
    await this.hassObj.callService("switch", state.state === "on" ? "turn_off" : "turn_on", { entity_id: zone.entity });
  }
  readSchedulePrograms() {
    return SCHEDULER_ENTITIES.programs.map((entity, index) => decodeProgram(this.hassObj?.states?.[entity]?.state, index + 1, this.zones())).filter(Boolean);
  }
  newScheduleProgram() {
    const used = new Set(this.schedulePrograms.map((program) => program.slot));
    const slot = SCHEDULER_ENTITIES.programs.findIndex((_, index) => !used.has(index + 1)) + 1;
    if (!slot) return null;
    return {
      slot,
      name: `Időzítés ${slot}`,
      enabled: true,
      startTime: "06:00",
      cycleMode: "Heti ciklus",
      days: [true, false, true, false, true, false, false],
      zones: this.zones().map((zone, index) => ({
        id: zone.id,
        name: zone.name,
        enabled: true,
        minutes: 15,
        order: index + 1
      }))
    };
  }
  renderScheduler() {
    const container = this.shadowRoot?.querySelector(".scheduler");
    if (!container) return;
    const installed = Boolean(this.hassObj?.states?.[SCHEDULER_ENTITIES.programs[0]]);
    if (this.editingProgram) {
      this.renderScheduleEditor(container, installed);
    } else {
      this.renderScheduleList(container, installed);
    }
  }
  renderScheduleList(container, installed) {
    const programs = [...this.schedulePrograms].sort((a, b) => a.startTime.localeCompare(b.startTime));
    container.innerHTML = `
      ${installed ? "" : '<div class="scheduler-warning">Az irrigation_scheduler.yaml még nincs betöltve.</div>'}
      <div class="schedule-list-header">
        <strong>${this.t("savedSchedules")}</strong>
        <button type="button" class="save" data-action="program-new" ${programs.length >= 8 ? "disabled" : ""}>+ ${this.t("newSchedule")}</button>
      </div>
      <div class="saved-programs">
        ${programs.length ? programs.map((program) => this.programCard(program)).join("") : `<div class="empty-programs">${this.t("noSchedules")}</div>`}
      </div>
    `;
    container.querySelector('[data-action="program-new"]')?.addEventListener("click", () => {
      const program = this.newScheduleProgram();
      if (!program) return;
      this.editingProgram = program;
      this.renderScheduler();
    });
    container.querySelectorAll("[data-program]").forEach((card) => {
      const slot = Number(card.dataset.program);
      const program = this.schedulePrograms.find((item) => item.slot === slot);
      card.querySelector('[data-action="program-toggle"]')?.addEventListener("change", (event) => {
        program.enabled = event.target.checked;
        this.persistProgram(program, true);
      });
      card.querySelector('[data-action="program-edit"]')?.addEventListener("click", () => {
        this.editingProgram = structuredClone(program);
        this.renderScheduler();
      });
      card.querySelector('[data-action="program-start"]')?.addEventListener("click", () => this.startProgram(program));
      card.querySelector('[data-action="program-delete"]')?.addEventListener("click", () => this.deleteProgram(program));
    });
    this.updateScheduleStatus();
  }
  programCard(program) {
    const days = program.cycleMode === "Heti ciklus" ? program.days.map((enabled, index) => enabled ? this.dayLabels()[index] : "").filter(Boolean).join(", ") : program.cycleMode;
    const zones = [...program.zones].filter((zone) => zone.enabled).sort((a, b) => a.order - b.order).map((zone) => `${zone.order}. ${zone.name} (${zone.minutes} p)`).join(" · ");
    return `
      <div class="saved-program ${program.enabled ? "" : "disabled"}" data-program="${program.slot}">
        <div class="program-summary">
          <label class="program-switch"><input type="checkbox" data-action="program-toggle" ${program.enabled ? "checked" : ""}></label>
          <div>
            <strong>${escapeHtml(program.name)}</strong>
            <div class="program-meta">${program.startTime} · ${escapeHtml(days || this.t("noDay"))}</div>
            <div class="program-zones-summary">${escapeHtml(zones || this.t("noZone"))}</div>
          </div>
        </div>
        <div class="program-card-actions">
          <button type="button" data-action="program-start">${this.t("start")}</button>
          <button type="button" data-action="program-edit">${this.t("edit")}</button>
          <button type="button" class="danger" data-action="program-delete">${this.t("delete")}</button>
        </div>
      </div>
    `;
  }
  renderScheduleEditor(container, installed) {
    const draft = this.editingProgram;
    const weekly = draft.cycleMode === "Heti ciklus";
    const zoneRows = [...draft.zones].sort((a, b) => a.order - b.order).map((zone) => `
      <div class="program-zone ${zone.enabled ? "enabled" : ""}" data-zone="${zone.id}">
        <label class="zone-check">
          <input type="checkbox" data-field="zone-enabled" ${zone.enabled ? "checked" : ""}>
          <span class="order-badge">${zone.id}.</span><span class="zone-name" style="color:#17202a!important;display:inline!important;font-weight:800!important;opacity:1!important;visibility:visible!important;">${escapeHtml(zone.name || `Zóna ${zone.id}`)}</span>
        </label>
        <label class="zone-value">${this.t("time")}
          <input type="number" data-field="zone-minutes" min="1" max="180" step="1" value="${zone.minutes}"><span>${this.t("minutes")}</span>
        </label>
        <label class="zone-value">${this.t("order")}
          <select data-field="zone-order">${this.zones().map((_, index) => index + 1).map((value) => `<option value="${value}" ${value === zone.order ? "selected" : ""}>${value}.</option>`).join("")}</select>
        </label>
      </div>
    `).join("");
    container.innerHTML = `
      ${installed ? "" : '<div class="scheduler-warning">Az irrigation_scheduler.yaml még nincs betöltve.</div>'}
      <div class="editor-head"><button type="button" data-action="program-back">← ${this.t("back")}</button><strong>${this.t("editSchedule")}</strong></div>
      <div class="schedule-main">
        <label class="schedule-field"><span>${this.t("name")}</span><input type="text" data-field="program-name" maxlength="32" value="${escapeHtml(draft.name)}"></label>
        <label class="master-toggle"><input type="checkbox" data-field="schedule-enabled" ${draft.enabled ? "checked" : ""}><span>${this.t("enabled")}</span></label>
        <label class="schedule-field"><span>${this.t("begins")}</span><input type="time" data-field="start-time" value="${draft.startTime}"></label>
        <label class="schedule-field"><span>${this.t("cycle")}</span><select data-field="cycle-mode">
          ${[["Heti ciklus", "weekly"], ["Páratlan nap", "odd"], ["Páros nap", "even"]].map(([mode, key]) => `<option value="${mode}" ${mode === draft.cycleMode ? "selected" : ""}>${this.t(key)}</option>`).join("")}
        </select></label>
        <div class="day-picker ${weekly ? "" : "hidden"}">
          ${this.dayLabels().map((label, index) => `<button type="button" class="day ${draft.days[index] ? "active" : ""}" data-day="${index}">${label}</button>`).join("")}
        </div>
      </div>
      <div class="program-title">${this.t("zonesOrder")}</div>
      <div class="program-zones">${zoneRows}</div>
    `;
    container.querySelector('[data-field="program-name"]')?.addEventListener("input", (event) => {
      draft.name = event.target.value;
    });
    container.querySelector('[data-field="schedule-enabled"]')?.addEventListener("change", (event) => {
      draft.enabled = event.target.checked;
    });
    container.querySelector('[data-field="start-time"]')?.addEventListener("change", (event) => {
      draft.startTime = event.target.value || "06:00";
    });
    container.querySelector('[data-field="cycle-mode"]')?.addEventListener("change", (event) => {
      draft.cycleMode = event.target.value;
      this.renderScheduler();
    });
    container.querySelectorAll("[data-day]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.day);
      draft.days[index] = !draft.days[index];
      button.classList.toggle("active", draft.days[index]);
    }));
    container.querySelectorAll("[data-zone]").forEach((row) => {
      const zone = draft.zones.find((item) => item.id === Number(row.dataset.zone));
      row.querySelector('[data-field="zone-enabled"]')?.addEventListener("change", (event) => {
        zone.enabled = event.target.checked;
        row.classList.toggle("enabled", zone.enabled);
      });
      row.querySelector('[data-field="zone-minutes"]')?.addEventListener("change", (event) => {
        zone.minutes = clampNumber(event.target.value, 1, 180, 15);
        event.target.value = zone.minutes;
      });
      row.querySelector('[data-field="zone-order"]')?.addEventListener("change", (event) => {
        zone.order = Number(event.target.value);
        this.renderScheduler();
      });
    });
    const close = () => {
      this.editingProgram = null;
      this.renderScheduler();
    };
    container.querySelector('[data-action="program-back"]')?.addEventListener("click", close);
  }
  openScheduler() {
    this.scheduleOpen = true;
    const details = this.shadowRoot?.querySelector(".schedule-box");
    if (details) details.open = true;
  }
  async quickSave() {
    if (!this.editingProgram) {
      this.openScheduler();
      this.notify(this.t("selectSchedule"));
      return;
    }
    await this.persistProgram(this.editingProgram);
  }
  async quickStart() {
    if (this.editingProgram) {
      const program = structuredClone(this.editingProgram);
      if (await this.persistProgram(this.editingProgram)) await this.startProgram(program);
      return;
    }
    const enabled = this.schedulePrograms.filter((program) => program.enabled);
    if (enabled.length === 1) {
      await this.startProgram(enabled[0]);
      return;
    }
    this.openScheduler();
    this.notify(enabled.length ? this.t("chooseSchedule") : this.t("noEnabledSchedule"));
  }
  async persistProgram(program, stayOnList = false) {
    const entity = SCHEDULER_ENTITIES.programs[program.slot - 1];
    if (!this.hassObj?.states?.[entity]) {
      this.notify("Előbb telepítsd a frissített irrigation_scheduler.yaml fájlt.");
      return false;
    }
    program.name = String(program.name || `Időzítés ${program.slot}`).trim().slice(0, 32);
    const value = JSON.stringify(encodeProgram(program));
    if (value.length > 255) {
      this.notify("Az időzítés neve túl hosszú.");
      return false;
    }
    await this.hassObj.callService("input_text", "set_value", { entity_id: entity, value });
    const index = this.schedulePrograms.findIndex((item) => item.slot === program.slot);
    const saved = structuredClone(program);
    if (index >= 0) this.schedulePrograms[index] = saved;
    else this.schedulePrograms.push(saved);
    this.editingProgram = null;
    this.renderScheduler();
    if (!stayOnList) this.notify(this.t("saved"));
    return true;
  }
  async deleteProgram(program) {
    if (!window.confirm(`Törlöd ezt az időzítést: ${program.name}?`)) return;
    const entity = SCHEDULER_ENTITIES.programs[program.slot - 1];
    await this.hassObj.callService("input_text", "set_value", { entity_id: entity, value: "" });
    this.schedulePrograms = this.schedulePrograms.filter((item) => item.slot !== program.slot);
    this.renderScheduler();
  }
  async startProgram(program) {
    if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.runScript]) {
      this.notify("A frissített időzítő YAML csomag nincs betöltve.");
      return;
    }
    await this.hassObj.callService("script", "turn_on", {
      entity_id: SCHEDULER_ENTITIES.runScript,
      variables: { program_json: JSON.stringify(encodeProgram(program)) }
    });
    this.notify(`${program.name} elindítva.`);
  }
  async stopSchedule() {
    if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.stopScript]) {
      this.notify("Az időzítő YAML csomag nincs betöltve.");
      return;
    }
    await this.hassObj.callService("script", "turn_on", { entity_id: SCHEDULER_ENTITIES.stopScript });
    this.notify(this.t("stopped"));
  }
  updateScheduleStatus() {
    const elements = this.shadowRoot?.querySelectorAll(".schedule-status");
    if (!elements?.length) return;
    const rawStatus = this.hassObj?.states?.[SCHEDULER_ENTITIES.status]?.state;
    const status = rawStatus && !["unknown", "unavailable"].includes(rawStatus) ? rawStatus : this.t("noIrrigation");
    const zoneById = new Map(this.zones().map((zone) => [Number(zone.id), zone]));
    const activeRows = [];
    for (let zoneId = 1; zoneId <= 5; zoneId += 1) {
      const zone = zoneById.get(zoneId);
      const programTimer = this.hassObj?.states?.[`timer.irrigation_program_zone_${zoneId}`];
      const manualTimer = this.hassObj?.states?.[`timer.irrigation_manual_zone_${zoneId}`];
      if (programTimer?.state === "active") {
        activeRows.push({
          name: zone?.name || `${this.t("zone")} ${zoneId}`,
          source: this.t("schedule"),
          remaining: timerRemaining(programTimer)
        });
      } else if (manualTimer?.state === "active") {
        activeRows.push({
          name: zone?.name || `${this.t("zone")} ${zoneId}`,
          source: this.t("manualTime"),
          remaining: timerRemaining(manualTimer)
        });
      }
    }
    elements.forEach((element) => {
      element.replaceChildren();
      if (activeRows.length) {
        for (const row of activeRows) {
          const line = document.createElement("div");
          line.className = "schedule-status-line";
          line.textContent = `${row.name} · ${row.source}${row.remaining ? ` · ${this.t("remaining")}: ${row.remaining}` : ""}`;
          element.appendChild(line);
        }
      } else {
        element.textContent = status;
      }
      element.classList.toggle("running", activeRows.length > 0);
    });
    this.updateNextIrrigation();
  }
  nextIrrigation(now = /* @__PURE__ */ new Date()) {
    const programs = this.schedulePrograms.filter(
      (program) => program.enabled && program.zones.some((zone) => zone.enabled)
    );
    let next = null;
    for (const program of programs) {
      const [hour, minute] = String(program.startTime || "06:00").split(":").map(Number);
      for (let offset = 0; offset <= 14; offset += 1) {
        const date = new Date(now);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + offset);
        date.setHours(hour, minute, 0, 0);
        if (date <= now) continue;
        const mondayIndex = (date.getDay() + 6) % 7;
        const allowed = program.cycleMode === "Páratlan nap" ? date.getDate() % 2 === 1 : program.cycleMode === "Páros nap" ? date.getDate() % 2 === 0 : Boolean(program.days[mondayIndex]);
        if (!allowed) continue;
        if (!next || date < next.date) next = { date, program };
        break;
      }
    }
    return next;
  }
  updateNextIrrigation() {
    const element = this.shadowRoot?.querySelector(".next-irrigation");
    if (!element) return;
    const language = this.language();
    const [label, empty] = NEXT_IRRIGATION_TEXT[language] || NEXT_IRRIGATION_TEXT.en;
    const next = this.nextIrrigation();
    if (!next) {
      element.innerHTML = `<span>${escapeHtml(empty)}</span>`;
      element.classList.add("empty");
      return;
    }
    const locale = language === "hu" ? "hu-HU" : language;
    const date = new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit"
    }).format(next.date);
    const countdown = this.nextIrrigationCountdown(next.date, language);
    element.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(date)}</strong><small>${escapeHtml(next.program.name)}</small><small class="next-countdown">${escapeHtml(countdown)}</small>`;
    element.classList.remove("empty");
  }
  nextIrrigationCountdown(date, language) {
    const totalSeconds = Math.max(0, Math.ceil((date.getTime() - Date.now()) / 1e3));
    const label = NEXT_COUNTDOWN_TEXT[language] || NEXT_COUNTDOWN_TEXT.en;
    if (totalSeconds <= 300) {
      const minutes2 = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${label}: ${String(minutes2).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    const totalMinutes = Math.ceil(totalSeconds / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor(totalMinutes % 1440 / 60);
    const minutes = totalMinutes % 60;
    const parts = [];
    if (days) parts.push(language === "hu" ? `${days} nap` : `${days} d`);
    if (hours) parts.push(language === "hu" ? `${hours} óra` : `${hours} h`);
    if (minutes || !parts.length) parts.push(language === "hu" ? `${minutes} perc` : `${minutes} min`);
    return `${label}: ${parts.join(" ")}`;
  }
  handleMapClick(event) {
    if (!this.editMode) {
      return;
    }
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const imageRect = this.currentImageRect(rect.width, rect.height);
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    if (canvasX < imageRect.x || canvasX > imageRect.x + imageRect.width || canvasY < imageRect.y || canvasY > imageRect.y + imageRect.height) {
      this.notify("A fej helyet a kepen belul jelold.");
      return;
    }
    let headIndex = -1;
    for (let index = this.heads.length - 1; index >= 0; index -= 1) {
      const head = this.heads[index];
      const headX = imageRect.x + Number(head.x) * imageRect.width;
      const headY = imageRect.y + Number(head.y) * imageRect.height;
      const hitRadius = Math.max(20, (Number(head.radius) || 9) * 2.2);
      if (Math.hypot(canvasX - headX, canvasY - headY) <= hitRadius) {
        headIndex = index;
        break;
      }
    }
    if (headIndex >= 0) {
      this.heads.splice(headIndex, 1);
      this.heads.forEach((head, index) => {
        head.id = index + 1;
        head.name = String(index + 1);
      });
      this.draw();
      this.updateYaml();
      this.notify("Locsolófej törölve.");
      return;
    }
    this.heads.push({
      id: this.heads.length + 1,
      name: String(this.heads.length + 1),
      zone: this.activeZone,
      x: round((canvasX - imageRect.x) / imageRect.width),
      y: round((canvasY - imageRect.y) / imageRect.height),
      radius: 9,
      direction_angle: Math.round((Math.atan2(0.5 - (canvasY - imageRect.y) / imageRect.height, 0.5 - (canvasX - imageRect.x) / imageRect.width) * 180 / Math.PI + 360) % 360),
      sweep_angle: 110,
      sweep_speed: 1,
      spray_distance: 6
    });
    this.draw();
    this.updateYaml();
  }
  draw() {
    const canvas = this.shadowRoot?.querySelector("canvas");
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111820";
    ctx.fillRect(0, 0, width, height);
    const imageRect = this.drawImage(ctx, width, height);
    this.drawHeads(ctx, imageRect);
  }
  syncHeadAnimation() {
    const hasRunningZone = this.zones().some((zone) => zone.active);
    if (!hasRunningZone) {
      if (this.headAnimationFrame) {
        window.cancelAnimationFrame(this.headAnimationFrame);
        this.headAnimationFrame = null;
      }
      this.headAnimationLast = 0;
      this.headAnimationPhase = 0;
      return;
    }
    if (this.headAnimationFrame) {
      return;
    }
    const animate = (timestamp) => {
      this.headAnimationFrame = null;
      if (!this.isConnected || !this.zones().some((zone) => zone.active)) {
        this.headAnimationLast = 0;
        this.headAnimationPhase = 0;
        this.draw();
        return;
      }
      if (!this.headAnimationLast || timestamp - this.headAnimationLast >= 33) {
        this.headAnimationLast = timestamp;
        this.headAnimationPhase = timestamp / 1e3;
        this.draw();
      }
      this.headAnimationFrame = window.requestAnimationFrame(animate);
    };
    this.headAnimationFrame = window.requestAnimationFrame(animate);
  }
  drawImage(ctx, width, height) {
    if (!this.image?.complete) {
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = "600 14px system-ui, sans-serif";
      ctx.fillText(this.t("loading"), 20, 28);
      return { x: 0, y: 0, width, height };
    }
    const rect = this.currentImageRect(width, height);
    ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height);
    return rect;
  }
  currentImageRect(width, height) {
    if (!this.image?.complete || !this.image.width || !this.image.height) {
      return { x: 0, y: 0, width, height };
    }
    const scale = Math.min(width / this.image.width, height / this.image.height);
    const drawWidth = this.image.width * scale;
    const drawHeight = this.image.height * scale;
    return {
      x: (width - drawWidth) / 2,
      y: (height - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight
    };
  }
  drawHeads(ctx, rect) {
    const zones = new Map(this.zones().map((zone) => [zone.id, zone]));
    for (const head of this.heads) {
      const zone = zones.get(Number(head.zone)) || zones.get(1);
      if (!zone.active && !this.editMode) {
        continue;
      }
      const x = rect.x + head.x * rect.width;
      const y = rect.y + head.y * rect.height;
      const radius = Number(head.radius) || 9;
      const phase = this.headAnimationPhase + Number(head.id || 0) * 0.37;
      if (zone.active) {
        const pulse = (Math.sin(phase * 4) + 1) / 2;
        const sprayRadius = radius * (3.7 + pulse * 0.85);
        const glow = ctx.createRadialGradient(x, y, radius * 0.7, x, y, sprayRadius);
        glow.addColorStop(0, "rgba(125,211,252,0.34)");
        glow.addColorStop(0.48, "rgba(56,189,248,0.19)");
        glow.addColorStop(1, "rgba(14,165,233,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, sprayRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.strokeStyle = "rgba(125,211,252,0.82)";
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.setLineDash([radius * 0.9, radius * 0.62]);
        ctx.lineDashOffset = -phase * 18;
        ctx.beginPath();
        ctx.arc(x, y, sprayRadius * 0.82, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        const rotation = phase * 1.1;
        for (let ray = 0; ray < 8; ray += 1) {
          const angle = rotation + ray * Math.PI / 4;
          const start = radius * 1.15;
          const end = sprayRadius * (0.72 + ray % 2 * 0.12);
          ctx.globalAlpha = 0.48 + ray % 2 * 0.22;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(angle) * start, y + Math.sin(angle) * start);
          ctx.lineTo(x + Math.cos(angle) * end, y + Math.sin(angle) * end);
          ctx.stroke();
        }
        ctx.restore();
      } else {
        ctx.fillStyle = "rgba(2,8,23,0.52)";
        ctx.strokeStyle = hexToRgba(zone.color, 0.78);
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      const metal = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.45, 1, x, y, radius * 1.18);
      metal.addColorStop(0, "#f8fafc");
      metal.addColorStop(0.28, "#94a3b8");
      metal.addColorStop(0.72, "#334155");
      metal.addColorStop(1, "#0f172a");
      ctx.fillStyle = metal;
      ctx.strokeStyle = zone.active ? "#e0f2fe" : "rgba(255,255,255,0.68)";
      ctx.lineWidth = zone.active ? 2.3 : 1.4;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = zone.active ? "#38bdf8" : zone.color;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.72, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = zone.active ? "#effaff" : "#07111c";
      ctx.font = `800 ${Math.max(9, radius * 1.08)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(head.zone), x, y + 0.4);
      if (this.editMode) {
        const deleteX = x + radius * 1.45;
        const deleteY = y - radius * 1.45;
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(deleteX, deleteY, Math.max(6, radius * 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = `900 ${Math.max(10, radius)}px system-ui, sans-serif`;
        ctx.fillText("×", deleteX, deleteY - 0.3);
      }
    }
  }
  updateYaml() {
    const textarea = this.shadowRoot?.querySelector("textarea");
    if (textarea) {
      textarea.value = this.toYaml();
    }
  }
  async copyYaml() {
    const text = this.toYaml();
    const textarea = this.shadowRoot?.querySelector("textarea");
    let copied = false;
    if (textarea) {
      textarea.value = text;
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        console.warn("Direct copy failed.", error);
      }
    }
    try {
      if (!copied && navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch (error) {
      console.warn("Clipboard API failed, trying fallback copy.", error);
    }
    if (!copied && !textarea) {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.left = "-9999px";
      helper.style.top = "0";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.focus();
      helper.select();
      helper.setSelectionRange(0, helper.value.length);
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        console.warn("Fallback copy failed.", error);
      } finally {
        helper.remove();
      }
    }
    if (copied) {
      this.showCopyResult("YAML kimásolva ✓", true);
      this.notify(this.t("copied"));
      return;
    }
    if (textarea) {
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
    }
    this.showCopyResult("Kijelölve – Ctrl+C", false);
    this.notify("A YAML ki van jelölve. Nyomj Ctrl+C-t.");
  }
  showCopyResult(message, success) {
    const button = this.shadowRoot?.querySelector('[data-action="copy"]');
    if (!button) return;
    const original = "YAML masolasa";
    button.textContent = message;
    button.classList.toggle("copy-success", success);
    window.setTimeout(() => {
      if (!button.isConnected) return;
      button.textContent = original;
      button.classList.remove("copy-success");
    }, 2200);
  }
  toYaml() {
    const lines = [
      "type: custom:irrigation-map-card",
      `name: ${JSON.stringify(this.config.name || "Locsolorendszer")}`,
      `image: ${JSON.stringify(this.config.image || "/local/garden.jpg")}`,
      `language: ${JSON.stringify(this.config.language || "auto")}`,
      "zones:"
    ];
    for (const zone of this.zones()) {
      lines.push(`  - id: ${zone.id}`);
      lines.push(`    name: ${JSON.stringify(zone.name)}`);
      lines.push(`    entity: ${zone.entity}`);
      lines.push(`    color: ${JSON.stringify(zone.color)}`);
    }
    lines.push("heads:");
    for (const head of this.heads) {
      lines.push(`  - id: ${head.id}`);
      lines.push(`    name: ${JSON.stringify(head.name)}`);
      lines.push(`    zone: ${head.zone}`);
      lines.push(`    x: ${head.x}`);
      lines.push(`    y: ${head.y}`);
      lines.push(`    radius: ${head.radius}`);
      lines.push(`    direction_angle: ${head.direction_angle}`);
      lines.push(`    sweep_angle: ${head.sweep_angle}`);
      lines.push(`    sweep_speed: ${head.sweep_speed}`);
      lines.push(`    spray_distance: ${head.spray_distance}`);
    }
    return lines.join("\n");
  }
  notify(message) {
    this.dispatchEvent(new CustomEvent("hass-notification", {
      detail: { message },
      bubbles: true,
      composed: true
    }));
  }
  styles() {
    return `
      ha-card { background:#111820; color:#fff; overflow:hidden; }
      .top { align-items:center; display:flex; justify-content:space-between; gap:12px; padding:16px; }
      h2 { font-size:22px; line-height:1.15; margin:0; }
      p { color:rgba(255,255,255,.68); font-size:13px; margin:4px 0 0; }
      button { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); border-radius:10px; color:#fff; cursor:pointer; font:inherit; min-height:38px; padding:8px 12px; }
      .edit.active { background:#5ee083; color:#07130f; font-weight:800; }
      .map-wrap { height:min(70vh, 620px); min-height:360px; padding:0 16px 16px; }
      canvas { background:#18202a; border:1px solid rgba(255,255,255,.1); border-radius:12px; display:block; height:100%; width:100%; }
      .zones { display:grid; gap:10px; grid-template-columns:repeat(5, minmax(0,1fr)); padding:0 16px 16px; }
      .zone-card { border:1px solid var(--zone); border-radius:11px; overflow:hidden; }
      .zone { align-items:flex-start; border-color:var(--zone); display:flex; flex-direction:column; justify-content:center; position:relative; }
      .zone-card .zone { border:0; border-radius:0; width:100%; }
      .zone.selected { outline:none; }
      .zone.running { background:rgba(94,224,131,.18); box-shadow:0 0 28px rgba(94,224,131,.24); }
      .zone strong { font-size:15px; }
      .zone span { color:rgba(255,255,255,.7); font-size:12px; }
      .manual-duration { align-items:center; background:#1b2530; color:rgba(255,255,255,.72); display:flex; font-size:11px; gap:5px; justify-content:center; padding:7px; }
      .manual-duration input { background:#fff; border:0; border-radius:6px; box-sizing:border-box; color:#17202a; font:inherit; font-weight:800; height:30px; text-align:center; width:55px; }
      .pump-status { background:#0c131b; border-block:1px solid rgba(255,255,255,.1); padding:12px 16px; }
      .pump-head { align-items:center; display:flex; justify-content:space-between; margin-bottom:10px; }
      .pump-state { background:#334155; border-radius:999px; color:#cbd5e1; font-size:12px; font-weight:900; padding:5px 10px; }
      .pump-state.running { background:#16a34a; box-shadow:0 0 18px rgba(34,197,94,.35); color:#fff; }
      .pump-state.starting { animation:pumpPulse 1s ease-in-out infinite; background:#d97706; color:#fff; }
      .pump-state.stopping { animation:pumpPulse 1s ease-in-out infinite; background:#475569; color:#fff; }
      .pump-state.failed { background:#b91c1c; box-shadow:0 0 18px rgba(220,38,38,.32); color:#fff; }
      @keyframes pumpPulse { 50% { opacity:.58; } }
      .pump-values { display:grid; gap:8px; grid-template-columns:repeat(3,minmax(0,1fr)); }
      .pump-values div { background:#17212c; border:1px solid rgba(255,255,255,.08); border-radius:10px; display:flex; flex-direction:column; padding:9px 10px; }
      .pump-values span { color:rgba(255,255,255,.58); font-size:11px; }
      .pump-values strong { font-size:16px; margin-top:2px; }
      .quick-controls { background:#f4f7f9; color:#17202a; padding:14px 16px 4px; }
      .quick-controls .schedule-status { margin:0 0 10px; }
      .next-irrigation { align-items:center; background:#e0f2fe; border:1px solid #bae6fd; border-radius:10px; color:#0c4a6e; display:grid; gap:2px; margin:0 0 10px; padding:10px 12px; }
      .next-irrigation span { font-size:12px; font-weight:700; text-transform:uppercase; }
      .next-irrigation strong { font-size:16px; }
      .next-irrigation small { color:#0369a1; font-weight:600; }
      .next-irrigation .next-countdown { color:#075985; font-size:14px; font-weight:800; margin-top:3px; }
      .next-irrigation.empty { background:#f1f5f9; border-color:#e2e8f0; color:#64748b; }
      .quick-actions { display:grid; gap:8px; grid-template-columns:1fr 1fr 1fr; }
      .quick-actions .save { background:#149ec2; border-color:#149ec2; color:#fff; font-weight:800; }
      .quick-actions .start { background:#15803d; border-color:#15803d; color:#fff; font-weight:800; }
      .quick-actions .stop { background:#b91c1c; border-color:#b91c1c; color:#fff; font-weight:800; }
      .settings-box { background:#f4f7f9; border-top:1px solid #dbe2e8; color:#17202a; padding:12px 16px; }
      .settings-box summary { cursor:pointer; font-size:17px; font-weight:800; padding:5px 0; user-select:none; }
      .settings-content { background:#fff; border:1px solid #dbe2e8; border-radius:12px; margin-top:12px; padding:14px; }
      .settings-field { align-items:center; display:flex; gap:14px; justify-content:space-between; }
      .settings-field span { font-weight:800; }
      .settings-field select { background:#fff; border:1px solid #94a3b8; border-radius:9px; color:#17202a; font:inherit; min-height:42px; padding:7px 10px; width:min(230px,60%); }
      .settings-help { color:#64748b; font-size:12px; margin:10px 0 0; }
      .rain-settings { border-top:1px solid #e2e8f0; display:grid; gap:12px; margin-top:14px; padding-top:14px; }
      .rain-state { align-items:center; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:10px; color:#166534; display:flex; justify-content:space-between; padding:10px 12px; }
      .rain-state span { font-weight:800; }
      .rain-state strong { font-size:13px; }
      .rain-state.raining { background:#e0f2fe; border-color:#7dd3fc; color:#075985; }
      .rain-delay-remaining { color:#075985; font-weight:800; margin-top:0; }
      .schedule-box { background:#f4f7f9; color:#17202a; padding:12px 16px 16px; }
      .schedule-box summary { cursor:pointer; font-size:17px; font-weight:800; padding:5px 0; user-select:none; }
      .scheduler { padding-top:12px; }
      .scheduler-warning { background:#fff3cd; border:1px solid #ffe69c; border-radius:10px; color:#664d03; margin-bottom:12px; padding:10px; }
      .schedule-list-header, .editor-head { align-items:center; display:flex; justify-content:space-between; gap:10px; margin-bottom:12px; }
      .schedule-list-header > strong, .editor-head > strong { font-size:16px; }
      .schedule-list-header .save { background:#149ec2; border-color:#149ec2; color:#fff; font-weight:800; opacity:1; }
      .schedule-list-header .save:disabled { background:#94a3b8; border-color:#94a3b8; cursor:not-allowed; opacity:.65; }
      .saved-programs { display:grid; gap:10px; }
      .empty-programs { background:#fff; border:1px dashed #94a3b8; border-radius:12px; color:#64748b; padding:22px; text-align:center; }
      .saved-program { background:#fff; border:1px solid #dbe2e8; border-left:5px solid #149ec2; border-radius:12px; display:grid; gap:12px; grid-template-columns:1fr auto; padding:12px; }
      .saved-program.disabled { border-left-color:#94a3b8; opacity:.62; }
      .program-summary { align-items:flex-start; display:flex; gap:10px; min-width:0; }
      .program-switch input { height:22px; width:22px; }
      .program-summary strong { font-size:16px; }
      .program-meta { color:#475569; margin-top:3px; }
      .program-zones-summary { color:#64748b; font-size:12px; margin-top:5px; }
      .program-card-actions { align-items:center; display:flex; gap:6px; }
      .program-card-actions button { background:#e2e8f0; color:#17202a; min-height:34px; padding:6px 9px; }
      .program-card-actions .danger { background:#fee2e2; color:#991b1b; }
      .schedule-main { background:#fff; border-radius:12px; display:grid; gap:12px; padding:14px; }
      .master-toggle { align-items:center; display:flex; font-weight:700; gap:9px; }
      .master-toggle input, .zone-check input { height:20px; width:20px; }
      .schedule-field { align-items:center; display:flex; justify-content:space-between; gap:12px; }
      .schedule-field input, .schedule-field select, .zone-value input, .zone-value select { background:#fff; border:1px solid #cbd5e1; border-radius:8px; box-sizing:border-box; color:#17202a; font:inherit; min-height:40px; padding:7px 9px; }
      .day-picker { display:grid; gap:7px; grid-template-columns:repeat(7, minmax(0,1fr)); }
      .day-picker.hidden { display:none; }
      .day { background:#e5e7eb; border:0; border-radius:999px; color:#475569; min-height:42px; padding:5px; }
      .day.active { background:#149ec2; color:#fff; font-weight:800; }
      .program-title { font-size:15px; font-weight:800; margin:16px 0 8px; }
      .program-zones { display:grid; gap:8px; }
      .program-zone { align-items:center; background:#fff; border:1px solid #dbe2e8; border-left:5px solid #94a3b8; border-radius:11px; color:#17202a; display:grid; gap:10px; grid-template-columns:minmax(150px,1fr) auto auto; opacity:.62; padding:10px; }
      .program-zone.enabled { border-left-color:#149ec2; opacity:1; }
      .zone-check { align-items:center; color:#17202a !important; display:flex; gap:8px; }
      .zone-check .zone-name { color:#17202a !important; display:inline !important; font-weight:800; opacity:1 !important; visibility:visible !important; }
      .order-badge { align-items:center; background:#e0f2fe; border-radius:999px; color:#0369a1; display:inline-flex; font-weight:800; height:30px; justify-content:center; width:30px; }
      .zone-value { align-items:center; display:flex; font-size:12px; gap:5px; }
      .zone-value input { text-align:center; width:68px; }
      .zone-value select { width:66px; }
      .schedule-status { background:#e2e8f0; border-radius:10px; font-weight:700; margin-top:12px; padding:11px; text-align:center; }
      .schedule-status.running { background:#dcfce7; color:#166534; }
      .schedule-status-line { padding:3px 0; }
      .schedule-status-line + .schedule-status-line { border-top:1px solid rgba(22,101,52,.16); margin-top:3px; padding-top:6px; }
      .schedule-actions { display:grid; gap:8px; grid-template-columns:1fr 1fr 1fr; margin-top:12px; }
      .schedule-actions .save { background:#149ec2; border-color:#149ec2; color:#fff; font-weight:800; }
      .schedule-actions .start { background:#15803d; border-color:#15803d; color:#fff; font-weight:800; }
      .schedule-actions .stop { background:#b91c1c; border-color:#b91c1c; color:#fff; font-weight:800; }
      .yaml-box { background:#fff; color:#17202a; padding:12px 16px 16px; }
      .yaml-box summary { cursor:pointer; font-weight:700; padding:4px 0; user-select:none; }
      .yaml-content { padding-top:10px; }
      textarea { box-sizing:border-box; display:block; font-family:monospace; min-height:180px; resize:vertical; width:100%; }
      [data-action="copy"] { background:#17202a; color:#fff; margin-top:8px; }
      [data-action="copy"].copy-success { background:#15803d; border-color:#15803d; }
      @media (max-width: 720px) {
        .zones { grid-template-columns:repeat(2, minmax(0,1fr)); }
        .map-wrap { min-height:300px; }
        .program-zone { grid-template-columns:1fr 1fr; }
        .zone-check { grid-column:1 / -1; }
        .saved-program { grid-template-columns:1fr; }
        .program-card-actions { display:grid; grid-template-columns:1fr 1fr 1fr; }
        .quick-actions { grid-template-columns:1fr; }
        .schedule-actions { grid-template-columns:1fr; }
      }
    `;
  }
};
function round(value) {
  return Math.round(value * 1e4) / 1e4;
}
function encodeProgram(program) {
  const modes = { "Heti ciklus": "w", "Páratlan nap": "o", "Páros nap": "e" };
  return {
    n: String(program.name || "Időzítés").slice(0, 32),
    e: program.enabled ? 1 : 0,
    t: program.startTime,
    c: modes[program.cycleMode] || "w",
    d: program.days.map((value) => value ? 1 : 0),
    z: program.zones.map((zone) => [zone.id, zone.enabled ? 1 : 0, zone.minutes, zone.order])
  };
}
function decodeProgram(value, slot, availableZones) {
  if (!value || ["unknown", "unavailable", "none"].includes(value)) return null;
  try {
    const raw = JSON.parse(value);
    if (!raw || !Array.isArray(raw.z)) return null;
    const modes = { w: "Heti ciklus", o: "Páratlan nap", e: "Páros nap" };
    const savedZoneMap = new Map(raw.z.map((item) => [Number(item[0]), item]));
    const zones = availableZones.map((fallback, index) => {
      const item = savedZoneMap.get(Number(fallback.id));
      if (!item) {
        return {
          id: Number(fallback.id),
          name: fallback.name || `Zóna ${index + 1}`,
          enabled: false,
          minutes: 15,
          order: index + 1
        };
      }
      return {
        id: Number(item[0] || fallback.id || index + 1),
        name: fallback.name || `Zóna ${index + 1}`,
        enabled: Number(item[1]) === 1,
        minutes: clampNumber(item[2], 1, 180, 15),
        order: clampNumber(item[3], 1, availableZones.length, index + 1)
      };
    }).slice(0, 5);
    return {
      slot,
      name: String(raw.n || `Időzítés ${slot}`),
      enabled: Number(raw.e) === 1,
      startTime: /^\d{2}:\d{2}$/.test(raw.t) ? raw.t : "06:00",
      cycleMode: modes[raw.c] || "Heti ciklus",
      days: Array.from({ length: 7 }, (_, index) => Number(raw.d?.[index]) === 1),
      zones
    };
  } catch (error) {
    console.warn(`Invalid irrigation program in slot ${slot}.`, error);
    return null;
  }
}
function clampNumber(value, min3, max3, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max3, Math.max(min3, Math.round(number)));
}
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function timerRemaining(timer) {
  const finishesAt = timer?.attributes?.finishes_at;
  if (finishesAt) {
    const seconds = Math.max(0, Math.ceil((new Date(finishesAt).getTime() - Date.now()) / 1e3));
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }
  return String(timer?.attributes?.remaining || "");
}
function hexToRgba(color, alpha) {
  const match = String(color || "").match(/^#([0-9a-f]{6})$/i);
  if (!match) {
    return color;
  }
  const intValue = parseInt(match[1], 16);
  return `rgba(${intValue >> 16 & 255}, ${intValue >> 8 & 255}, ${intValue & 255}, ${alpha})`;
}
if (!customElements.get("garden-irrigation-map-card")) {
  customElements.define("garden-irrigation-map-card", IrrigationMapCard);
}
if (!customElements.get("irrigation-map-card")) {
  customElements.define("irrigation-map-card", class extends IrrigationMapCard {
  });
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "garden-irrigation-map-card",
  name: "Locsolorendszer terkep",
  description: "Terkepes locsolofej es zonavezerlo kartya – v149"
});

// garden-map-card.source.js
import { translate as translateAnthbot } from "./garden-anthbot-i18n.js?v=166";

// garden-geometry.js?v=2
var DEFAULT_VIEW = Object.freeze({
  panX: 0,
  panY: 0,
  zoom: 1,
  rotation: 0
});
function createGeometry(options = {}) {
  const bounds = normalizeBounds(options.bounds);
  const calibration = normalizeCalibration(options.calibration);
  const size = {
    width: Math.max(1, Number(options.width) || 1),
    height: Math.max(1, Number(options.height) || 1)
  };
  const view = { ...DEFAULT_VIEW, ...options.view };
  const map = computeMapFit(size, bounds, view, options.aspectRatio, options.fit);
  return {
    bounds,
    calibration,
    size,
    view,
    map,
    worldToMap(point) {
      return worldToMap(point, bounds);
    },
    mapToWorld(point) {
      return mapToWorld(point, bounds);
    },
    mapToScreen(point) {
      return mapToScreen(point, map, calibration);
    },
    mapToScreenWithLayerCalibration(point, layerCalibration) {
      return mapToScreenWithLayerCalibration(point, map, calibration, layerCalibration);
    },
    calibrateMapPoint(point, pointCalibration) {
      return calibrateMapPoint(point, map, pointCalibration);
    },
    screenToMap(point) {
      return screenToMap(point, map, calibration);
    },
    worldToScreen(point) {
      return mapToScreen(worldToMap(point, bounds), map, calibration);
    },
    screenToWorld(point) {
      return mapToWorld(screenToMap(point, map, calibration), bounds);
    }
  };
}
function normalizeBounds(bounds) {
  const fallback = { minX: -500, minY: -500, maxX: 500, maxY: 500 };
  const next = { ...fallback, ...bounds || {} };
  for (const key of Object.keys(next)) {
    next[key] = Number(next[key]);
  }
  if (!Number.isFinite(next.minX) || !Number.isFinite(next.maxX) || next.minX === next.maxX) {
    next.minX = fallback.minX;
    next.maxX = fallback.maxX;
  }
  if (!Number.isFinite(next.minY) || !Number.isFinite(next.maxY) || next.minY === next.maxY) {
    next.minY = fallback.minY;
    next.maxY = fallback.maxY;
  }
  if (next.minX > next.maxX) {
    [next.minX, next.maxX] = [next.maxX, next.minX];
  }
  if (next.minY > next.maxY) {
    [next.minY, next.maxY] = [next.maxY, next.minY];
  }
  return next;
}
function getWorldBounds(areaDefinition, pose) {
  const points = [];
  const rasterBounds = areaDefinition?.map_raster?.bounds;
  if (rasterBounds && typeof rasterBounds === "object") {
    const minX = Number(rasterBounds.min_x ?? rasterBounds.minX);
    const maxX = Number(rasterBounds.max_x ?? rasterBounds.maxX);
    const minY = Number(rasterBounds.min_y ?? rasterBounds.minY);
    const maxY = Number(rasterBounds.max_y ?? rasterBounds.maxY);
    if ([minX, maxX, minY, maxY].every(Number.isFinite)) {
      points.push(
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY },
        { x: minX, y: maxY }
      );
    }
  }
  for (const path of getBoundaryPaths(areaDefinition)) {
    points.push(...path);
  }
  for (const zone of [
    ...getZones(areaDefinition, ["custom_areas", "zones", "customAreas"]),
    ...getZones(areaDefinition, [
      "forbid_areas",
      "forbidAreas",
      "remote_forbid_areas",
      "remoteForbidAreas",
      "no_go_areas",
      "noGoAreas"
    ])
  ]) {
    points.push(...getZonePoints(zone));
  }
  if (isFinitePoint(pose)) {
    points.push({ x: Number(pose.x), y: Number(pose.y) });
  }
  if (!points.length) {
    return normalizeBounds();
  }
  const xs = points.map((point) => Number(point.x)).filter(Number.isFinite);
  const ys = points.map((point) => Number(point.y)).filter(Number.isFinite);
  const padding = Math.max(100, Math.max(max(xs) - min(xs), max(ys) - min(ys)) * 0.08);
  return normalizeBounds({
    minX: min(xs) - padding,
    maxX: max(xs) + padding,
    minY: min(ys) - padding,
    maxY: max(ys) + padding
  });
}
function getZones(areaDefinition, keys) {
  if (!areaDefinition || typeof areaDefinition !== "object") {
    return [];
  }
  const zones = [];
  for (const key of keys) {
    if (Array.isArray(areaDefinition[key])) {
      zones.push(...areaDefinition[key].filter((zone) => zone && typeof zone === "object"));
    }
  }
  return zones;
}
function getZonePoints(zone) {
  const candidates = [zone.vertexs, zone.vertices, zone.points, zone.path, zone.polygon];
  for (const candidate of candidates) {
    const points = normalizePoints(candidate);
    if (points.length) {
      return points;
    }
  }
  if (Number.isFinite(Number(zone.x)) && Number.isFinite(Number(zone.y))) {
    const width = Number(zone.width ?? zone.w ?? zone.radius ?? 100);
    const height = Number(zone.height ?? zone.h ?? zone.radius ?? width);
    const x = Number(zone.x);
    const y = Number(zone.y);
    return [
      { x: x - width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y + height / 2 },
      { x: x - width / 2, y: y + height / 2 }
    ];
  }
  return [];
}
function getBoundaryPaths(areaDefinition) {
  if (!areaDefinition || typeof areaDefinition !== "object") {
    return [];
  }
  const paths = [];
  collectBinaryPaths(areaDefinition, paths);
  collectBoundaryPaths(areaDefinition, paths);
  if (paths.length) {
    return paths;
  }
  const fallback = zoneHullBoundary(areaDefinition);
  return fallback.length ? [fallback] : [];
}
function collectBinaryPaths(value, paths, seen = /* @__PURE__ */ new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      collectBinaryPaths(item, paths, seen);
    }
    return;
  }
  for (const key of ["map_binary_paths"]) {
    const candidates = value[key];
    if (!Array.isArray(candidates)) {
      continue;
    }
    for (const candidate of candidates) {
      const points = normalizePoints(candidate?.points ?? candidate);
      if (isUsableBoundaryCandidate(points)) {
        paths.push(points);
      }
    }
  }
  for (const child of Object.values(value)) {
    collectBinaryPaths(child, paths, seen);
  }
}
function isUsableBoundaryCandidate(points) {
  if (!Array.isArray(points) || points.length < 12) {
    return false;
  }
  const xs = points.map((point) => Number(point.x)).filter(Number.isFinite);
  const ys = points.map((point) => Number(point.y)).filter(Number.isFinite);
  if (!xs.length || !ys.length) {
    return false;
  }
  const width = max(xs) - min(xs);
  const height = max(ys) - min(ys);
  if (width < 800 || height < 800) {
    return false;
  }
  let longJumpCount = 0;
  for (let index = 1; index < points.length; index += 1) {
    const dx = Number(points[index].x) - Number(points[index - 1].x);
    const dy = Number(points[index].y) - Number(points[index - 1].y);
    if (Math.hypot(dx, dy) > 14e3) {
      longJumpCount += 1;
    }
  }
  return longJumpCount <= Math.max(2, points.length * 0.04);
}
function collectBoundaryPaths(value, paths, parentKey = "", seen = /* @__PURE__ */ new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  if (isBoundaryKey(parentKey)) {
    collectPointPaths(value, paths);
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectBoundaryPaths(item, paths, parentKey, seen);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (isBoundaryKey(key)) {
      collectPointPaths(child, paths);
    }
    collectBoundaryPaths(child, paths, key, seen);
  }
}
function isBoundaryKey(key) {
  return /boundary|boundaries|border|perimeter|outline|wire|route|work_?area|map_?(line|path|border)/i.test(String(key || ""));
}
function collectPointPaths(value, paths) {
  const points = normalizePoints(value);
  if (points.length >= 2) {
    paths.push(points);
    return;
  }
  if (!Array.isArray(value)) {
    return;
  }
  for (const item of value) {
    if (item && typeof item === "object") {
      collectPointPaths(item.vertexs ?? item.vertices ?? item.points ?? item.path ?? item.polygon ?? item, paths);
    }
  }
}
function zoneHullBoundary(areaDefinition) {
  const points = [];
  for (const zone of getZones(areaDefinition, ["custom_areas", "zones", "customAreas"])) {
    points.push(...getZonePoints(zone));
  }
  return convexHull(points);
}
function convexHull(points) {
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const point of points.filter(isFinitePoint)) {
    const x = Number(point.x);
    const y = Number(point.y);
    const key = `${x}:${y}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push({ x, y });
    }
  }
  if (unique.length < 3) {
    return [];
  }
  unique.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  const lower = [];
  for (const point of unique) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }
  const upper = [];
  for (let index = unique.length - 1; index >= 0; index -= 1) {
    const point = unique[index];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper];
}
function cross(origin, a, b) {
  return (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
}
function normalizePoints(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  if (value.every((item) => typeof item === "number")) {
    const points = [];
    for (let index = 0; index + 1 < value.length; index += 2) {
      points.push({ x: Number(value[index]), y: Number(value[index + 1]) });
    }
    return points.filter(isFinitePoint);
  }
  return value.map((item) => {
    if (Array.isArray(item) && item.length >= 2) {
      return { x: Number(item[0]), y: Number(item[1]) };
    }
    if (item && typeof item === "object") {
      return { x: Number(item.x ?? item.lng ?? item.lon), y: Number(item.y ?? item.lat) };
    }
    return null;
  }).filter(isFinitePoint);
}
function worldToMap(point, bounds) {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  return {
    x: (Number(point.x) - bounds.minX) / width,
    y: 1 - (Number(point.y) - bounds.minY) / height
  };
}
function mapToWorld(point, bounds) {
  return {
    x: bounds.minX + Number(point.x) * (bounds.maxX - bounds.minX),
    y: bounds.minY + (1 - Number(point.y)) * (bounds.maxY - bounds.minY)
  };
}
function mapToScreen(point, map, calibration) {
  const transformed = applyCalibration(point, calibration);
  return transformedMapPointToScreen(transformed, map);
}
function mapToScreenWithLayerCalibration(point, map, calibration, layerCalibration) {
  const transformed = applyCalibration(point, calibration);
  const transformedCenter = applyCalibration({ x: 0.5, y: 0.5 }, calibration);
  const layered = calibrateMapPoint(transformed, map, layerCalibration, transformedCenter);
  return transformedMapPointToScreen(layered, map);
}
function transformedMapPointToScreen(transformed, map) {
  const centered = {
    x: (transformed.x - 0.5) * map.width,
    y: (transformed.y - 0.5) * map.height
  };
  const rotated = rotatePoint(centered, map.rotation);
  return {
    x: map.centerX + rotated.x,
    y: map.centerY + rotated.y
  };
}
function screenToMap(point, map, calibration) {
  const centered = {
    x: Number(point.x) - map.centerX,
    y: Number(point.y) - map.centerY
  };
  const rotated = rotatePoint(centered, -map.rotation);
  const normalized = {
    x: rotated.x / map.width + 0.5,
    y: rotated.y / map.height + 0.5
  };
  return removeCalibration(normalized, calibration);
}
function computeMapFit(size, bounds, view, aspectRatio, fit = "contain") {
  const worldRatio = (bounds.maxX - bounds.minX) / (bounds.maxY - bounds.minY);
  const targetRatio = Number.isFinite(Number(aspectRatio)) && Number(aspectRatio) > 0 ? Number(aspectRatio) : worldRatio;
  const rotation = Number(view.rotation) || 0;
  const quarterTurn = Math.abs(Math.sin(rotation)) > Math.abs(Math.cos(rotation));
  const fitWidth = quarterTurn ? size.height : size.width;
  const fitHeight = quarterTurn ? size.width : size.height;
  const canvasRatio = fitWidth / fitHeight;
  let width = fitWidth;
  let height = fitHeight;
  if (fit === "cover") {
    if (targetRatio > canvasRatio) {
      width = height * targetRatio;
    } else {
      height = width / targetRatio;
    }
  } else if (targetRatio > canvasRatio) {
    height = width / targetRatio;
  } else {
    width = height * targetRatio;
  }
  return {
    width: Math.max(1, width * view.zoom),
    height: Math.max(1, height * view.zoom),
    centerX: size.width / 2 + view.panX,
    centerY: size.height / 2 + view.panY,
    rotation
  };
}
function normalizeCalibration(calibration) {
  return {
    offsetX: Number(calibration?.offsetX) || 0,
    offsetY: Number(calibration?.offsetY) || 0,
    scaleX: Number(calibration?.scaleX) || 1,
    scaleY: Number(calibration?.scaleY) || 1,
    rotation: Number(calibration?.rotation) || 0
  };
}
function applyCalibration(point, calibration) {
  const centered = {
    x: (Number(point.x) - 0.5) * calibration.scaleX,
    y: (Number(point.y) - 0.5) * calibration.scaleY
  };
  const rotated = rotatePoint(centered, calibration.rotation);
  return {
    x: rotated.x + 0.5 + calibration.offsetX,
    y: rotated.y + 0.5 + calibration.offsetY
  };
}
function removeCalibration(point, calibration) {
  const centered = {
    x: Number(point.x) - 0.5 - calibration.offsetX,
    y: Number(point.y) - 0.5 - calibration.offsetY
  };
  const rotated = rotatePoint(centered, -calibration.rotation);
  return {
    x: rotated.x / calibration.scaleX + 0.5,
    y: rotated.y / calibration.scaleY + 0.5
  };
}
function calibrateMapPoint(point, map, calibration = {}, center = { x: 0.5, y: 0.5 }) {
  const next = normalizeCalibration(calibration);
  const centered = {
    x: (Number(point.x) - Number(center.x)) * map.width * next.scaleX,
    y: (Number(point.y) - Number(center.y)) * map.height * next.scaleY
  };
  const rotated = rotatePoint(centered, next.rotation);
  return {
    x: rotated.x / map.width + Number(center.x) + next.offsetX,
    y: rotated.y / map.height + Number(center.y) + next.offsetY
  };
}
function rotatePoint(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos
  };
}
function isFinitePoint(point) {
  return Boolean(point && Number.isFinite(Number(point.x)) && Number.isFinite(Number(point.y)));
}
function min(values) {
  return Math.min(...values);
}
function max(values) {
  return Math.max(...values);
}

// garden-renderer.js?v=159
var COLORS = Object.freeze({
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
  robotStroke: "#1b1b1b"
});
var AnthbotMapRenderer = class {
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
      rotation: Number(options.rotation) || 0
    };
    this.drag = null;
    this.pointers = /* @__PURE__ */ new Map();
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
      path_binary_paths: this.state.path_binary_paths
    };
    const pose = this.state.pose || {};
    const bounds = this.options.bounds || getWorldBounds(mapSource, pose);
    const baseGeometry = createGeometry({
      width,
      height,
      bounds,
      view: this.view,
      calibration: {},
      aspectRatio: this.image ? this.image.width / this.image.height : void 0,
      fit: this.options.fit
    });
    const geometry = createGeometry({
      width,
      height,
      bounds,
      view: this.view,
      calibration: this.options.calibration,
      aspectRatio: this.image ? this.image.width / this.image.height : void 0,
      fit: this.options.fit
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
          "noGoAreas"
        ]),
        "no-go"
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
    const geometry = createGeometry({ width, height, bounds, view: this.view, calibration: {}, aspectRatio: this.image ? this.image.width / this.image.height : void 0, fit: this.options.fit });
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
      const phase = this.irrigationAnimationPhase + Number(line.id || 0) * 0.29;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(3,10,18,.72)";
      ctx.lineWidth = zone.active ? 9 : 7;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.strokeStyle = colorWithAlpha(color, zone.active ? 0.95 : 0.72);
      ctx.lineWidth = zone.active ? 5 : 4;
      ctx.setLineDash(zone.active ? [4, 8] : [8, 6]);
      ctx.lineDashOffset = zone.active ? -phase * 22 : 0;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.setLineDash([]);
      if (zone.active) {
        ctx.strokeStyle = colorWithAlpha("#e0f2fe", 0.82);
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
        Math.hypot(mapYAxis.x - mapOrigin.x, mapYAxis.y - mapOrigin.y)
      );
      const pixelsPerMeter = mapPixelScale * 0.02245;
      const radius = clamp((Number(head.radius) || 9) * Math.sqrt(Math.max(0.4, this.view.zoom)), 6, 30);
      const color = zone.color || "#38bdf8";
      const phase = this.irrigationAnimationPhase + Number(head.id || 0) * 0.37;
      const previewActive = this.options.irrigationEditMode && Number(head.id) === Number(this.options.irrigationSelectedHeadId);
      const sprayActive = zone.active || previewActive;
      ctx.save();
      if (sprayActive) {
        const headMapX = Number(head.x);
        const headMapY = Number(head.y);
        const mapAngleToScreen = (angle) => {
          const target = geometry.mapToScreen({
            x: headMapX + Math.cos(angle) * 0.01,
            y: headMapY + Math.sin(angle) * 0.01
          });
          return Math.atan2(target.y - point.y, target.x - point.x);
        };
        const fallbackDirection = Math.atan2(0.5 - headMapY, 0.5 - headMapX);
        const configuredDirection = Number(head.direction_angle ?? head.directionAngle ?? head.heading);
        const mapDirection = Number.isFinite(configuredDirection) ? configuredDirection * Math.PI / 180 : fallbackDirection;
        const configuredSweep = Number(head.sweep_angle ?? head.sweepAngle ?? head.arc);
        const sweep = clamp(Number.isFinite(configuredSweep) ? configuredSweep : 110, 30, 360) * Math.PI / 180;
        const configuredStart = Number(head.start_angle ?? head.startAngle);
        const startMapAngle = Number.isFinite(configuredStart) ? configuredStart * Math.PI / 180 : mapDirection - sweep / 2;
        const pulse = (Math.sin(phase * 3.2) + 1) / 2;
        const spraySetting = Number(head.spray_radius ?? head.sprayRadius ?? head.range);
        const sprayDistance = Number(head.spray_distance ?? head.sprayDistance);
        const sweepSpeed = clamp(Number(head.sweep_speed ?? head.sweepSpeed ?? 1), 0.2, 3);
        const spray = clamp(
          Number.isFinite(spraySetting) ? spraySetting * Math.sqrt(Math.max(0.4, this.view.zoom)) : Number.isFinite(sprayDistance) ? sprayDistance * pixelsPerMeter : radius * (6.2 + pulse * 0.55),
          Math.max(4, pixelsPerMeter),
          Math.max(12, mapPixelScale * 0.5)
        );
        const sweepPosition = (Math.sin(phase * 1.65 * sweepSpeed) + 1) / 2;
        const jetAngle = mapAngleToScreen(startMapAngle + sweep * sweepPosition) + (Number(this.options.irrigationDirectionRotationCorrection) || 0);
        ctx.save();
        ctx.strokeStyle = colorWithAlpha("#dff6ff", 0.84);
        ctx.lineWidth = 1.7;
        ctx.lineCap = "round";
        for (let ray = -2; ray <= 2; ray += 1) {
          const angle = jetAngle + ray * 0.028;
          const start = radius * 1.12;
          const end = spray * (0.78 + (ray + 2) * 0.035);
          const controlDistance = end * 0.56;
          ctx.globalAlpha = 0.38 + (2 - Math.abs(ray)) * 0.16;
          ctx.beginPath();
          ctx.moveTo(point.x + Math.cos(angle) * start, point.y + Math.sin(angle) * start);
          ctx.quadraticCurveTo(
            point.x + Math.cos(angle) * controlDistance,
            point.y + Math.sin(angle) * controlDistance - spray * 0.13,
            point.x + Math.cos(angle) * end,
            point.y + Math.sin(angle) * end
          );
          ctx.stroke();
        }
        ctx.fillStyle = colorWithAlpha("#e7f8ff", 0.92);
        for (let drop = 0; drop < 26; drop += 1) {
          const angle = jetAngle + Math.sin(drop * 1.91 + phase * 2.1) * 0.09;
          const travel = (phase * 0.48 + drop * 0.113) % 1 * spray;
          const arcHeight = Math.sin(Math.PI * travel / spray) * spray * 0.13;
          ctx.globalAlpha = 0.22 + 0.66 * (1 - travel / spray);
          ctx.beginPath();
          ctx.arc(
            point.x + Math.cos(angle) * travel,
            point.y + Math.sin(angle) * travel - arcHeight,
            clamp(radius * 0.13, 1.1, 2.4),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      const metal = ctx.createRadialGradient(point.x - radius * 0.35, point.y - radius * 0.45, 1, point.x, point.y, radius * 1.18);
      metal.addColorStop(0, "#f8fafc");
      metal.addColorStop(0.28, "#94a3b8");
      metal.addColorStop(0.72, "#334155");
      metal.addColorStop(1, "#0f172a");
      ctx.fillStyle = metal;
      ctx.strokeStyle = "rgba(255,255,255,.92)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 0.68, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = sprayActive ? "#fff" : "#07111c";
      ctx.font = `800 ${Math.max(9, radius)}px system-ui,sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(head.zone), point.x, point.y + 0.4);
      if (this.options.irrigationEditMode) {
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(point.x + radius, point.y - radius, Math.max(6, radius * 0.65), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillText("×", point.x + radius, point.y - radius);
      }
      ctx.restore();
    }
  }
  syncIrrigationAnimation() {
    const active = this.options.showIrrigationHeads && ((this.options.irrigationZones || []).some((zone) => zone.active) || this.options.irrigationEditMode && this.options.irrigationSelectedHeadId != null);
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
      const stillActive = this.options.showIrrigationHeads && ((this.options.irrigationZones || []).some((zone) => zone.active) || this.options.irrigationEditMode && this.options.irrigationSelectedHeadId != null);
      if (!stillActive) {
        this.irrigationAnimationLast = 0;
        this.irrigationAnimationPhase = 0;
        return;
      }
      if (!this.irrigationAnimationLast || timestamp - this.irrigationAnimationLast >= 33) {
        this.irrigationAnimationLast = timestamp;
        this.irrigationAnimationPhase = Date.now() / 1e3;
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
    if (isDockingOrChargingState(this.state)) {
      return;
    }
    const pathSource = String(this.options.mowedPathSource || "auto").toLowerCase();
    const cloudOnly = pathSource === "cloud";
    const cloudTrail = pathSource === "live" ? [] : extractCloudMowedPathPoints(this.state);
    const baseTrail = cloudOnly ? cloudTrail : cloudTrail.length >= 2 ? cloudTrail : this.persistedMowedPath;
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
      22
    );
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = "source-over";
    if (hasCloudTrail) {
      this.drawMowedTrailLayer(ctx, geometry, this.mowedPathDisplayTrail(baseTrail, true), {
        width,
        canvasDiagonal,
        showCoverage: this.options.showMowedCoverage !== false
      });
    }
    if (hasLiveTrail) {
      this.drawMowedTrailLayer(ctx, geometry, this.liveMowedPath, {
        width,
        canvasDiagonal,
        showCoverage: false
      });
    }
    ctx.restore();
  }
  drawMowedTrailLayer(ctx, geometry, trail, options = {}) {
    const width = Number(options.width) || 7;
    const segments = buildMowedPathSegments(
      trail,
      (point) => this.mowingPathPositionToScreen(geometry, point),
      Number(options.canvasDiagonal) || 800
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
      this.options.mowedCoverageWidth ?? this.options.mowed_coverage_width ?? 360
    );
    if (!Number.isFinite(coverageMm) || coverageMm <= 0) return 0;
    const anchor = (trail || []).find(
      (point) => Number.isFinite(Number(point?.x)) && Number.isFinite(Number(point?.y))
    ) || this.state.pose;
    if (!anchor) return clamp(coverageMm / 35, 10, 48);
    const a = this.mowingPathPositionToScreen(geometry, anchor);
    const b = this.mowingPathPositionToScreen(geometry, {
      x: Number(anchor.x) + coverageMm,
      y: Number(anchor.y)
    });
    return clamp(Math.hypot(b.x - a.x, b.y - a.y), 10, 64);
  }
  mowedPathDisplayTrail(trail, useCloudScale = false) {
    const scale = Number(
      this.options.mowedPathDisplayScale ?? this.options.mowed_path_display_scale ?? (useCloudScale && Number(this.state?.path_coordinate_scale) === 1 ? 10 : 1)
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
      12
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
        stroke: "rgba(255, 255, 255, 0.12)"
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
      maxY
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
    const isSolid = (x, y) => x >= 0 && x < width && y >= 0 && y < height && pixels[y * width + x] !== 0;
    const toScreen = (x, y) => geometry.worldToScreen({
      x: bounds.minX + x * stepX,
      y: bounds.minY + y * stepY
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
      smoothing: false
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
        const edge = solid && (value !== 255 || x === 0 || y === 0 || x === width - 1 || y === height - 1 || pixels[index - 1] === 0 || pixels[index + 1] === 0 || pixels[index - width] === 0 || pixels[index + width] === 0);
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
      { x: 0, y: 0 }
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
    const mowingHeadingOffset = this.isMowingState() ? Number(this.options.robotMowingHeadingOffset ?? this.options.robot_mowing_heading_offset ?? 0) || 0 : 0;
    const cloudYaw = cloudHeadingToCanvasRadians(this.cloudHeadingDegrees(pose)) + geometry.map.rotation + degreesToRadians(Number(this.options.robotHeadingOffset ?? this.options.robot_heading_offset) || 0) + degreesToRadians(mowingHeadingOffset) + (Number(robotCalibration.rotation) || 0);
    const headingSource = String(this.options.robotHeadingSource || "cloud").toLowerCase();
    const movementYaw = headingSource === "movement" || headingSource === "auto" ? this.movementHeading(geometry) : null;
    this.cloudHeading = this.cloudHeading === null ? cloudYaw : smoothAngle(this.cloudHeading, cloudYaw, 0.45);
    const yaw = headingSource === "movement" ? movementYaw ?? this.cloudHeading : headingSource === "cloud" ? this.cloudHeading : movementYaw ?? this.cloudHeading;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(yaw);
    if (this.robotImage) {
      const size = clamp(
        (Number(this.options.robotSize) || 42) * (Number(robotCalibration.scaleX) || 1) * (Number(this.view.zoom) || 1),
        8,
        260
      );
      const aspect = this.robotImage.width / this.robotImage.height || 1;
      const imageRotation = this.options.robotImageRotation === void 0 ? Math.PI / 2 : degreesToRadians(Number(this.options.robotImageRotation) || 0);
      ctx.rotate(imageRotation);
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.drawImage(this.robotImage, -size * aspect / 2, -size / 2, size * aspect, size);
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
    if (this.liveMowedPath.length > 3e3) {
      this.liveMowedPath.splice(0, this.liveMowedPath.length - 3e3);
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
      this.persistedMowedPath = points.slice(-5e3);
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
    const normalized = normalizePathPoints(points).slice(-5e3);
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
    this.robotHeading = this.robotHeading === null ? nextHeading : smoothAngle(this.robotHeading, nextHeading, 0.35);
    return this.robotHeading;
  }
  cloudHeadingDegrees(pose) {
    const headingCandidates = [
      this.state.raw_pose?.heading,
      pose?.heading,
      this.state.cur_pose?.heading,
      this.state.curPose?.heading,
      this.state.map_scan_pose?.heading,
      this.state.mapScanPose?.heading
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
      this.state.mapScanPose?.yaw
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
      offsetY: Number(robotCalibration.offsetY) || 0
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
      "vĂˇgĂˇs"
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
      panY: this.view.panY
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
        y: this.pinch.midpoint.y - rect.top
      };
      const currentLocal = { x: midpoint.x - rect.left, y: midpoint.y - rect.top };
      const startCenter = {
        x: rect.width / 2 + this.pinch.panX,
        y: rect.height / 2 + this.pinch.panY
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
        panY: this.view.panY
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
      panY: this.view.panY
    };
  }
  onWheel(event) {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.1 : 0.9;
    this.view.zoom = clamp(this.view.zoom * factor, 0.2, 8);
    this.draw();
  }
};
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function cloudHeadingToCanvasRadians(value) {
  return normalizeAngle(degreesToRadians(180 - normalizeHeadingDegrees(value)));
}
function milliRadiansToDegrees(value) {
  return Number(value) * 180 / (Math.PI * 1e3);
}
function normalizeHeadingDegrees(value) {
  const heading = Number(value) || 0;
  return Math.abs(heading) > 360 ? heading / 100 : heading;
}
function clamp(value, min3, max3) {
  return Math.min(max3, Math.max(min3, value));
}
function colorWithAlpha(color, alpha) {
  const value = String(color || "#38bdf8").trim();
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const number = parseInt(hex[1], 16);
    return `rgba(${number >> 16 & 255},${number >> 8 & 255},${number & 255},${alpha})`;
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
  if (value.type !== void 0) point.type = Number(value.type);
  if (value.clean_time !== void 0) point.clean_time = Number(value.clean_time);
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
    const isMowedPoint = point?.type === void 0 || [1, 2, 5, 8].includes(pointType) || Number.isFinite(cleanTime) && cleanTime > 0;
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
    state.mowed_path,
    state.mowedPath,
    state.cloud_path,
    state.cloudPath,
    state.history_path_info,
    state.historyPathInfo,
    state.his_path,
    state.HisPath,
    state.record_path,
    state.RecordPath,
    state.path_definition,
    state.path_binary_paths,
    state.mowing_path,
    state.mowingPath,
    state.track,
    state.tracks,
    state.trajectory,
    state.path
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
  return state?.charging === true || String(state?.charging || "").toLowerCase() === "on" || isDockingOrChargingStateValue(state?.mower_status) || isDockingOrChargingStateValue(state?.robot_status_raw) || isDockingOrChargingStateValue(state?.robot_sta);
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
    }
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
    const name2 = String(zone?.name || zone?.label || "").trim();
    return name2 && !/^zone\s*\d+$/i.test(name2) ? name2 : noGoLabel;
  }
  const name = String(zone?.name || zone?.label || "").trim();
  if (name) {
    return name;
  }
  return zone?.id === void 0 || zone?.id === null ? "Zone" : `Zone ${zone.id}`;
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

// garden-geometry.js?v=3
var DEFAULT_VIEW2 = Object.freeze({
  panX: 0,
  panY: 0,
  zoom: 1,
  rotation: 0
});
function createGeometry2(options = {}) {
  const bounds = normalizeBounds2(options.bounds);
  const calibration = normalizeCalibration2(options.calibration);
  const size = {
    width: Math.max(1, Number(options.width) || 1),
    height: Math.max(1, Number(options.height) || 1)
  };
  const view = { ...DEFAULT_VIEW2, ...options.view };
  const map = computeMapFit2(size, bounds, view, options.aspectRatio, options.fit);
  return {
    bounds,
    calibration,
    size,
    view,
    map,
    worldToMap(point) {
      return worldToMap2(point, bounds);
    },
    mapToWorld(point) {
      return mapToWorld2(point, bounds);
    },
    mapToScreen(point) {
      return mapToScreen2(point, map, calibration);
    },
    mapToScreenWithLayerCalibration(point, layerCalibration) {
      return mapToScreenWithLayerCalibration2(point, map, calibration, layerCalibration);
    },
    calibrateMapPoint(point, pointCalibration) {
      return calibrateMapPoint2(point, map, pointCalibration);
    },
    screenToMap(point) {
      return screenToMap2(point, map, calibration);
    },
    worldToScreen(point) {
      return mapToScreen2(worldToMap2(point, bounds), map, calibration);
    },
    screenToWorld(point) {
      return mapToWorld2(screenToMap2(point, map, calibration), bounds);
    }
  };
}
function normalizeBounds2(bounds) {
  const fallback = { minX: -500, minY: -500, maxX: 500, maxY: 500 };
  const next = { ...fallback, ...bounds || {} };
  for (const key of Object.keys(next)) {
    next[key] = Number(next[key]);
  }
  if (!Number.isFinite(next.minX) || !Number.isFinite(next.maxX) || next.minX === next.maxX) {
    next.minX = fallback.minX;
    next.maxX = fallback.maxX;
  }
  if (!Number.isFinite(next.minY) || !Number.isFinite(next.maxY) || next.minY === next.maxY) {
    next.minY = fallback.minY;
    next.maxY = fallback.maxY;
  }
  if (next.minX > next.maxX) {
    [next.minX, next.maxX] = [next.maxX, next.minX];
  }
  if (next.minY > next.maxY) {
    [next.minY, next.maxY] = [next.maxY, next.minY];
  }
  return next;
}
function getWorldBounds2(areaDefinition, pose) {
  const points = [];
  const rasterBounds = areaDefinition?.map_raster?.bounds;
  if (rasterBounds && typeof rasterBounds === "object") {
    const minX = Number(rasterBounds.min_x ?? rasterBounds.minX);
    const maxX = Number(rasterBounds.max_x ?? rasterBounds.maxX);
    const minY = Number(rasterBounds.min_y ?? rasterBounds.minY);
    const maxY = Number(rasterBounds.max_y ?? rasterBounds.maxY);
    if ([minX, maxX, minY, maxY].every(Number.isFinite)) {
      points.push(
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY },
        { x: minX, y: maxY }
      );
    }
  }
  for (const path of getBoundaryPaths2(areaDefinition)) {
    points.push(...path);
  }
  for (const zone of [
    ...getZones2(areaDefinition, ["custom_areas", "zones", "customAreas"]),
    ...getZones2(areaDefinition, [
      "forbid_areas",
      "forbidAreas",
      "remote_forbid_areas",
      "remoteForbidAreas",
      "no_go_areas",
      "noGoAreas"
    ])
  ]) {
    points.push(...getZonePoints2(zone));
  }
  if (isFinitePoint2(pose)) {
    points.push({ x: Number(pose.x), y: Number(pose.y) });
  }
  if (!points.length) {
    return normalizeBounds2();
  }
  const xs = points.map((point) => Number(point.x)).filter(Number.isFinite);
  const ys = points.map((point) => Number(point.y)).filter(Number.isFinite);
  const padding = Math.max(100, Math.max(max2(xs) - min2(xs), max2(ys) - min2(ys)) * 0.08);
  return normalizeBounds2({
    minX: min2(xs) - padding,
    maxX: max2(xs) + padding,
    minY: min2(ys) - padding,
    maxY: max2(ys) + padding
  });
}
function getZones2(areaDefinition, keys) {
  if (!areaDefinition || typeof areaDefinition !== "object") {
    return [];
  }
  const zones = [];
  for (const key of keys) {
    if (Array.isArray(areaDefinition[key])) {
      zones.push(...areaDefinition[key].filter((zone) => zone && typeof zone === "object"));
    }
  }
  return zones;
}
function getZonePoints2(zone) {
  const candidates = [zone.vertexs, zone.vertices, zone.points, zone.path, zone.polygon];
  for (const candidate of candidates) {
    const points = normalizePoints2(candidate);
    if (points.length) {
      return points;
    }
  }
  if (Number.isFinite(Number(zone.x)) && Number.isFinite(Number(zone.y))) {
    const width = Number(zone.width ?? zone.w ?? zone.radius ?? 100);
    const height = Number(zone.height ?? zone.h ?? zone.radius ?? width);
    const x = Number(zone.x);
    const y = Number(zone.y);
    return [
      { x: x - width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y - height / 2 },
      { x: x + width / 2, y: y + height / 2 },
      { x: x - width / 2, y: y + height / 2 }
    ];
  }
  return [];
}
function getBoundaryPaths2(areaDefinition) {
  if (!areaDefinition || typeof areaDefinition !== "object") {
    return [];
  }
  const paths = [];
  collectBinaryPaths2(areaDefinition, paths);
  collectBoundaryPaths2(areaDefinition, paths);
  if (paths.length) {
    return paths;
  }
  const fallback = zoneHullBoundary2(areaDefinition);
  return fallback.length ? [fallback] : [];
}
function collectBinaryPaths2(value, paths, seen = /* @__PURE__ */ new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      collectBinaryPaths2(item, paths, seen);
    }
    return;
  }
  for (const key of ["map_binary_paths"]) {
    const candidates = value[key];
    if (!Array.isArray(candidates)) {
      continue;
    }
    for (const candidate of candidates) {
      const points = normalizePoints2(candidate?.points ?? candidate);
      if (isUsableBoundaryCandidate2(points)) {
        paths.push(points);
      }
    }
  }
  for (const child of Object.values(value)) {
    collectBinaryPaths2(child, paths, seen);
  }
}
function isUsableBoundaryCandidate2(points) {
  if (!Array.isArray(points) || points.length < 12) {
    return false;
  }
  const xs = points.map((point) => Number(point.x)).filter(Number.isFinite);
  const ys = points.map((point) => Number(point.y)).filter(Number.isFinite);
  if (!xs.length || !ys.length) {
    return false;
  }
  const width = max2(xs) - min2(xs);
  const height = max2(ys) - min2(ys);
  if (width < 800 || height < 800) {
    return false;
  }
  let longJumpCount = 0;
  for (let index = 1; index < points.length; index += 1) {
    const dx = Number(points[index].x) - Number(points[index - 1].x);
    const dy = Number(points[index].y) - Number(points[index - 1].y);
    if (Math.hypot(dx, dy) > 14e3) {
      longJumpCount += 1;
    }
  }
  return longJumpCount <= Math.max(2, points.length * 0.04);
}
function collectBoundaryPaths2(value, paths, parentKey = "", seen = /* @__PURE__ */ new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }
  seen.add(value);
  if (isBoundaryKey2(parentKey)) {
    collectPointPaths2(value, paths);
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectBoundaryPaths2(item, paths, parentKey, seen);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (isBoundaryKey2(key)) {
      collectPointPaths2(child, paths);
    }
    collectBoundaryPaths2(child, paths, key, seen);
  }
}
function isBoundaryKey2(key) {
  return /boundary|boundaries|border|perimeter|outline|wire|route|work_?area|map_?(line|path|border)/i.test(String(key || ""));
}
function collectPointPaths2(value, paths) {
  const points = normalizePoints2(value);
  if (points.length >= 2) {
    paths.push(points);
    return;
  }
  if (!Array.isArray(value)) {
    return;
  }
  for (const item of value) {
    if (item && typeof item === "object") {
      collectPointPaths2(item.vertexs ?? item.vertices ?? item.points ?? item.path ?? item.polygon ?? item, paths);
    }
  }
}
function zoneHullBoundary2(areaDefinition) {
  const points = [];
  for (const zone of getZones2(areaDefinition, ["custom_areas", "zones", "customAreas"])) {
    points.push(...getZonePoints2(zone));
  }
  return convexHull2(points);
}
function convexHull2(points) {
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const point of points.filter(isFinitePoint2)) {
    const x = Number(point.x);
    const y = Number(point.y);
    const key = `${x}:${y}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push({ x, y });
    }
  }
  if (unique.length < 3) {
    return [];
  }
  unique.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
  const lower = [];
  for (const point of unique) {
    while (lower.length >= 2 && cross2(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }
  const upper = [];
  for (let index = unique.length - 1; index >= 0; index -= 1) {
    const point = unique[index];
    while (upper.length >= 2 && cross2(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper];
}
function cross2(origin, a, b) {
  return (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
}
function normalizePoints2(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  if (value.every((item) => typeof item === "number")) {
    const points = [];
    for (let index = 0; index + 1 < value.length; index += 2) {
      points.push({ x: Number(value[index]), y: Number(value[index + 1]) });
    }
    return points.filter(isFinitePoint2);
  }
  return value.map((item) => {
    if (Array.isArray(item) && item.length >= 2) {
      return { x: Number(item[0]), y: Number(item[1]) };
    }
    if (item && typeof item === "object") {
      return { x: Number(item.x ?? item.lng ?? item.lon), y: Number(item.y ?? item.lat) };
    }
    return null;
  }).filter(isFinitePoint2);
}
function worldToMap2(point, bounds) {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  return {
    x: (Number(point.x) - bounds.minX) / width,
    y: 1 - (Number(point.y) - bounds.minY) / height
  };
}
function mapToWorld2(point, bounds) {
  return {
    x: bounds.minX + Number(point.x) * (bounds.maxX - bounds.minX),
    y: bounds.minY + (1 - Number(point.y)) * (bounds.maxY - bounds.minY)
  };
}
function mapToScreen2(point, map, calibration) {
  const transformed = applyCalibration2(point, calibration);
  return transformedMapPointToScreen2(transformed, map);
}
function mapToScreenWithLayerCalibration2(point, map, calibration, layerCalibration) {
  const transformed = applyCalibration2(point, calibration);
  const transformedCenter = applyCalibration2({ x: 0.5, y: 0.5 }, calibration);
  const layered = calibrateMapPoint2(transformed, map, layerCalibration, transformedCenter);
  return transformedMapPointToScreen2(layered, map);
}
function transformedMapPointToScreen2(transformed, map) {
  const centered = {
    x: (transformed.x - 0.5) * map.width,
    y: (transformed.y - 0.5) * map.height
  };
  const rotated = rotatePoint2(centered, map.rotation);
  return {
    x: map.centerX + rotated.x,
    y: map.centerY + rotated.y
  };
}
function screenToMap2(point, map, calibration) {
  const centered = {
    x: Number(point.x) - map.centerX,
    y: Number(point.y) - map.centerY
  };
  const rotated = rotatePoint2(centered, -map.rotation);
  const normalized = {
    x: rotated.x / map.width + 0.5,
    y: rotated.y / map.height + 0.5
  };
  return removeCalibration2(normalized, calibration);
}
function computeMapFit2(size, bounds, view, aspectRatio, fit = "contain") {
  const worldRatio = (bounds.maxX - bounds.minX) / (bounds.maxY - bounds.minY);
  const targetRatio = Number.isFinite(Number(aspectRatio)) && Number(aspectRatio) > 0 ? Number(aspectRatio) : worldRatio;
  const rotation = Number(view.rotation) || 0;
  const quarterTurn = Math.abs(Math.sin(rotation)) > Math.abs(Math.cos(rotation));
  const fitWidth = quarterTurn ? size.height : size.width;
  const fitHeight = quarterTurn ? size.width : size.height;
  const canvasRatio = fitWidth / fitHeight;
  let width = fitWidth;
  let height = fitHeight;
  if (fit === "cover") {
    if (targetRatio > canvasRatio) {
      width = height * targetRatio;
    } else {
      height = width / targetRatio;
    }
  } else if (targetRatio > canvasRatio) {
    height = width / targetRatio;
  } else {
    width = height * targetRatio;
  }
  return {
    width: Math.max(1, width * view.zoom),
    height: Math.max(1, height * view.zoom),
    centerX: size.width / 2 + view.panX,
    centerY: size.height / 2 + view.panY,
    rotation
  };
}
function normalizeCalibration2(calibration) {
  return {
    offsetX: Number(calibration?.offsetX) || 0,
    offsetY: Number(calibration?.offsetY) || 0,
    scaleX: Number(calibration?.scaleX) || 1,
    scaleY: Number(calibration?.scaleY) || 1,
    rotation: Number(calibration?.rotation) || 0
  };
}
function applyCalibration2(point, calibration) {
  const centered = {
    x: (Number(point.x) - 0.5) * calibration.scaleX,
    y: (Number(point.y) - 0.5) * calibration.scaleY
  };
  const rotated = rotatePoint2(centered, calibration.rotation);
  return {
    x: rotated.x + 0.5 + calibration.offsetX,
    y: rotated.y + 0.5 + calibration.offsetY
  };
}
function removeCalibration2(point, calibration) {
  const centered = {
    x: Number(point.x) - 0.5 - calibration.offsetX,
    y: Number(point.y) - 0.5 - calibration.offsetY
  };
  const rotated = rotatePoint2(centered, -calibration.rotation);
  return {
    x: rotated.x / calibration.scaleX + 0.5,
    y: rotated.y / calibration.scaleY + 0.5
  };
}
function calibrateMapPoint2(point, map, calibration = {}, center = { x: 0.5, y: 0.5 }) {
  const next = normalizeCalibration2(calibration);
  const centered = {
    x: (Number(point.x) - Number(center.x)) * map.width * next.scaleX,
    y: (Number(point.y) - Number(center.y)) * map.height * next.scaleY
  };
  const rotated = rotatePoint2(centered, next.rotation);
  return {
    x: rotated.x / map.width + Number(center.x) + next.offsetX,
    y: rotated.y / map.height + Number(center.y) + next.offsetY
  };
}
function rotatePoint2(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos
  };
}
function isFinitePoint2(point) {
  return Boolean(point && Number.isFinite(Number(point.x)) && Number.isFinite(Number(point.y)));
}
function min2(values) {
  return Math.min(...values);
}
function max2(values) {
  return Math.max(...values);
}

// garden-i18n-complements.js?v=130
var COMMON_KEYS = [
  "waiting",
  "robotSettings",
  "interfaceSettings",
  "expand",
  "close",
  "zoomIn",
  "zoomOut",
  "start",
  "stop",
  "home",
  "outerEdgeLabel",
  "outerEdgeSub",
  "dockEdgeLabel",
  "dockEdgeSub",
  "cloudSub",
  "customCutDirection",
  "showNoGoZones",
  "showNoGoLabels",
  "mapOnly",
  "themeBackground",
  "glassBackground",
  "transparentBackground",
  "bladeLife",
  "lineLife",
  "dockContact",
  "lastUpdate",
  "mapFit",
  "robotFit",
  "robotDirection",
  "boundaryFit",
  "up",
  "left",
  "right",
  "down",
  "narrower",
  "wider",
  "shorter",
  "taller",
  "rotation",
  "reset",
  "switchMissing",
  "operationFailed",
  "settingFailed",
  "status_on",
  "status_off",
  "status_standby",
  "status_paused",
  "status_charging",
  "status_mowing",
  "status_returning_to_dock",
  "status_mapping",
  "status_positioning",
  "status_sleeping",
  "status_unknown"
];
function complete(language, values, extra = {}) {
  if (values.length !== COMMON_KEYS.length) {
    throw new Error(`${language}: expected ${COMMON_KEYS.length} complementary translations, got ${values.length}`);
  }
  return { ...Object.fromEntries(COMMON_KEYS.map((key, index) => [key, values[index]])), ...extra };
}
var TRANSLATION_COMPLEMENTS = {
  de: complete("de", [
    "Warten auf Kartenentität",
    "Robotereinstellungen",
    "Oberflächeneinstellungen",
    "Für große Ansicht klicken",
    "Schließen",
    "Vergrößern",
    "Verkleinern",
    "START",
    "STOPP",
    "LADESTATION",
    "Außenkante",
    "Äußere Rasengrenze mähen",
    "Ladestationsumgebung",
    "Um die Ladestation mähen",
    "Daten und Befehle aktualisieren",
    "Benutzerdefinierte Mährichtung",
    "Sperrgebiete anzeigen",
    "Beschriftungen der Sperrgebiete anzeigen",
    "Nur Karte",
    "Home-Assistant-Design verwenden",
    "Glashintergrund",
    "Transparenter Hintergrund",
    "Lebensdauer der Schneidkomponenten",
    "Lebensdauer des Schneidfadens",
    "Lebensdauer der Ladekontakte",
    "Letzte Aktualisierung",
    "Kartenausrichtung",
    "Roboterausrichtung",
    "Roboterrichtung",
    "Grenzausrichtung",
    "Oben",
    "Links",
    "Rechts",
    "Unten",
    "Schmaler",
    "Breiter",
    "Kürzer",
    "Höher",
    "Drehung",
    "Zurücksetzen",
    "Schalterentität nicht gefunden",
    "Vorgang fehlgeschlagen",
    "Einstellung fehlgeschlagen",
    "ein",
    "aus",
    "Bereitschaft",
    "pausiert",
    "wird geladen",
    "mäht",
    "kehrt zur Ladestation zurück",
    "kartiert",
    "positioniert",
    "Ruhezustand",
    "unbekannt"
  ]),
  fr: complete("fr", [
    "En attente de l’entité de carte",
    "Réglages du robot",
    "Réglages de l’interface",
    "Cliquer pour agrandir",
    "Fermer",
    "Zoom avant",
    "Zoom arrière",
    "DÉMARRER",
    "ARRÊTER",
    "STATION",
    "Bord extérieur",
    "Tondre la limite extérieure de la pelouse",
    "Autour de la station",
    "Tondre autour de la station de charge",
    "Actualiser les données et les commandes",
    "Direction de tonte personnalisée",
    "Afficher les zones interdites",
    "Afficher les libellés des zones interdites",
    "Carte uniquement",
    "Utiliser le thème Home Assistant",
    "Arrière-plan en verre",
    "Arrière-plan transparent",
    "Durée de vie des composants de coupe",
    "Durée de vie du fil de coupe",
    "Durée de vie des contacts de charge",
    "Dernière mise à jour",
    "Alignement de la carte",
    "Alignement du robot",
    "Direction du robot",
    "Alignement de la limite",
    "Haut",
    "Gauche",
    "Droite",
    "Bas",
    "Plus étroit",
    "Plus large",
    "Plus court",
    "Plus haut",
    "Rotation",
    "Réinitialiser",
    "Entité de commutateur introuvable",
    "Échec de l’opération",
    "Échec du réglage",
    "activé",
    "désactivé",
    "en attente",
    "en pause",
    "en charge",
    "en tonte",
    "retour à la station",
    "cartographie",
    "positionnement",
    "en veille",
    "inconnu"
  ]),
  es: complete("es", [
    "Esperando la entidad del mapa",
    "Ajustes del robot",
    "Ajustes de la interfaz",
    "Haz clic para ampliar",
    "Cerrar",
    "Acercar",
    "Alejar",
    "INICIAR",
    "DETENER",
    "BASE",
    "Borde exterior",
    "Cortar el límite exterior del césped",
    "Alrededores de la base",
    "Cortar alrededor de la base de carga",
    "Actualizar datos y comandos",
    "Dirección de corte personalizada",
    "Mostrar zonas prohibidas",
    "Mostrar etiquetas de zonas prohibidas",
    "Solo mapa",
    "Usar el tema de Home Assistant",
    "Fondo de cristal",
    "Fondo transparente",
    "Vida útil de los componentes de corte",
    "Vida útil del hilo de corte",
    "Vida útil de los contactos de carga",
    "Última actualización",
    "Alineación del mapa",
    "Alineación del robot",
    "Dirección del robot",
    "Alineación del límite",
    "Arriba",
    "Izquierda",
    "Derecha",
    "Abajo",
    "Más estrecho",
    "Más ancho",
    "Más corto",
    "Más alto",
    "Rotación",
    "Restablecer",
    "No se encontró la entidad del interruptor",
    "La operación ha fallado",
    "El ajuste ha fallado",
    "encendido",
    "apagado",
    "en espera",
    "en pausa",
    "cargando",
    "cortando",
    "volviendo a la base",
    "mapeando",
    "posicionando",
    "en reposo",
    "desconocido"
  ]),
  it: complete("it", [
    "In attesa dell’entità mappa",
    "Impostazioni robot",
    "Impostazioni interfaccia",
    "Fai clic per ingrandire",
    "Chiudi",
    "Ingrandisci",
    "Riduci",
    "AVVIA",
    "STOP",
    "BASE",
    "Bordo esterno",
    "Taglia il confine esterno del prato",
    "Dintorni della base",
    "Taglia intorno alla base di ricarica",
    "Aggiorna dati e comandi",
    "Direzione di taglio personalizzata",
    "Mostra zone vietate",
    "Mostra etichette delle zone vietate",
    "Solo mappa",
    "Usa il tema di Home Assistant",
    "Sfondo vetro",
    "Sfondo trasparente",
    "Durata dei componenti di taglio",
    "Durata del filo di taglio",
    "Durata dei contatti di ricarica",
    "Ultimo aggiornamento",
    "Allineamento mappa",
    "Allineamento robot",
    "Direzione robot",
    "Allineamento confine",
    "Su",
    "Sinistra",
    "Destra",
    "Giù",
    "Più stretto",
    "Più largo",
    "Più corto",
    "Più alto",
    "Rotazione",
    "Reimposta",
    "Entità interruttore non trovata",
    "Operazione non riuscita",
    "Impostazione non riuscita",
    "acceso",
    "spento",
    "in attesa",
    "in pausa",
    "in carica",
    "taglio in corso",
    "ritorno alla base",
    "mappatura",
    "posizionamento",
    "in riposo",
    "sconosciuto"
  ]),
  pt: complete("pt", [
    "A aguardar a entidade do mapa",
    "Definições do robô",
    "Definições da interface",
    "Clique para ampliar",
    "Fechar",
    "Ampliar",
    "Reduzir",
    "INICIAR",
    "PARAR",
    "BASE",
    "Borda exterior",
    "Cortar o limite exterior do relvado",
    "Área da base",
    "Cortar em redor da base de carregamento",
    "Atualizar dados e comandos",
    "Direção de corte personalizada",
    "Mostrar zonas proibidas",
    "Mostrar etiquetas das zonas proibidas",
    "Apenas mapa",
    "Usar o tema do Home Assistant",
    "Fundo de vidro",
    "Fundo transparente",
    "Vida útil dos componentes de corte",
    "Vida útil do fio de corte",
    "Vida útil dos contactos de carregamento",
    "Última atualização",
    "Alinhamento do mapa",
    "Alinhamento do robô",
    "Direção do robô",
    "Alinhamento do limite",
    "Cima",
    "Esquerda",
    "Direita",
    "Baixo",
    "Mais estreito",
    "Mais largo",
    "Mais curto",
    "Mais alto",
    "Rotação",
    "Repor",
    "Entidade do interruptor não encontrada",
    "A operação falhou",
    "A definição falhou",
    "ligado",
    "desligado",
    "em espera",
    "em pausa",
    "a carregar",
    "a cortar",
    "a regressar à base",
    "a mapear",
    "a posicionar",
    "em repouso",
    "desconhecido"
  ]),
  nl: complete("nl", [
    "Wachten op kaartentiteit",
    "Robotinstellingen",
    "Interface-instellingen",
    "Klik voor grote weergave",
    "Sluiten",
    "Inzoomen",
    "Uitzoomen",
    "START",
    "STOP",
    "LAADSTATION",
    "Buitenrand",
    "De buitenste gazongrens maaien",
    "Omgeving laadstation",
    "Rond het laadstation maaien",
    "Gegevens en opdrachten vernieuwen",
    "Aangepaste maairichting",
    "Verboden zones tonen",
    "Labels van verboden zones tonen",
    "Alleen kaart",
    "Home Assistant-thema gebruiken",
    "Glazen achtergrond",
    "Transparante achtergrond",
    "Levensduur snijonderdelen",
    "Levensduur maaidraad",
    "Levensduur laadcontacten",
    "Laatste update",
    "Kaartuitlijning",
    "Robotuitlijning",
    "Robotrichting",
    "Grensuitlijning",
    "Omhoog",
    "Links",
    "Rechts",
    "Omlaag",
    "Smaller",
    "Breder",
    "Korter",
    "Hoger",
    "Rotatie",
    "Resetten",
    "Schakelaarentiteit niet gevonden",
    "Bewerking mislukt",
    "Instelling mislukt",
    "aan",
    "uit",
    "stand-by",
    "gepauzeerd",
    "laden",
    "maaien",
    "terug naar laadstation",
    "in kaart brengen",
    "positioneren",
    "slaapstand",
    "onbekend"
  ]),
  cs: complete("cs", [
    "Čekání na entitu mapy",
    "Nastavení robota",
    "Nastavení rozhraní",
    "Kliknutím otevřete velké zobrazení",
    "Zavřít",
    "Přiblížit",
    "Oddálit",
    "SPUSTIT",
    "ZASTAVIT",
    "STANICE",
    "Vnější okraj",
    "Posekat vnější hranici trávníku",
    "Okolí stanice",
    "Posekat okolí nabíjecí stanice",
    "Aktualizovat data a příkazy",
    "Vlastní směr sečení",
    "Zobrazit zakázané zóny",
    "Zobrazit popisky zakázaných zón",
    "Pouze mapa",
    "Použít motiv Home Assistant",
    "Skleněné pozadí",
    "Průhledné pozadí",
    "Životnost žacích součástí",
    "Životnost žací struny",
    "Životnost nabíjecích kontaktů",
    "Poslední aktualizace",
    "Zarovnání mapy",
    "Zarovnání robota",
    "Směr robota",
    "Zarovnání hranice",
    "Nahoru",
    "Doleva",
    "Doprava",
    "Dolů",
    "Užší",
    "Širší",
    "Kratší",
    "Vyšší",
    "Otočení",
    "Obnovit",
    "Entita přepínače nebyla nalezena",
    "Operace se nezdařila",
    "Nastavení se nezdařilo",
    "zapnuto",
    "vypnuto",
    "pohotovost",
    "pozastaveno",
    "nabíjení",
    "sečení",
    "návrat do stanice",
    "mapování",
    "určování polohy",
    "spánek",
    "neznámý"
  ], { startSub: "Posekat celou plochu", stopSub: "Zastavit všechny úlohy" }),
  sk: complete("sk", [
    "Čakanie na entitu mapy",
    "Nastavenia robota",
    "Nastavenia rozhrania",
    "Kliknutím otvoríte veľké zobrazenie",
    "Zavrieť",
    "Priblížiť",
    "Oddialiť",
    "SPUSTIŤ",
    "ZASTAVIŤ",
    "STANICA",
    "Vonkajší okraj",
    "Pokosiť vonkajšiu hranicu trávnika",
    "Okolie stanice",
    "Pokosiť okolie nabíjacej stanice",
    "Aktualizovať údaje a príkazy",
    "Vlastný smer kosenia",
    "Zobraziť zakázané zóny",
    "Zobraziť popisy zakázaných zón",
    "Iba mapa",
    "Použiť tému Home Assistant",
    "Sklenené pozadie",
    "Priehľadné pozadie",
    "Životnosť kosiacich súčastí",
    "Životnosť kosiacej struny",
    "Životnosť nabíjacích kontaktov",
    "Posledná aktualizácia",
    "Zarovnanie mapy",
    "Zarovnanie robota",
    "Smer robota",
    "Zarovnanie hranice",
    "Nahor",
    "Doľava",
    "Doprava",
    "Nadol",
    "Užšie",
    "Širšie",
    "Kratšie",
    "Vyššie",
    "Otočenie",
    "Obnoviť",
    "Entita prepínača sa nenašla",
    "Operácia zlyhala",
    "Nastavenie zlyhalo",
    "zapnuté",
    "vypnuté",
    "pohotovosť",
    "pozastavené",
    "nabíjanie",
    "kosenie",
    "návrat do stanice",
    "mapovanie",
    "určovanie polohy",
    "spánok",
    "neznáme"
  ], { startSub: "Pokosiť celú plochu", stopSub: "Zastaviť všetky úlohy" }),
  ro: complete("ro", [
    "Se așteaptă entitatea hărții",
    "Setări robot",
    "Setări interfață",
    "Apasă pentru vizualizare mărită",
    "Închide",
    "Mărește",
    "Micșorează",
    "PORNIRE",
    "OPRIRE",
    "STAȚIE",
    "Margine exterioară",
    "Tunde limita exterioară a gazonului",
    "Zona stației",
    "Tunde în jurul stației de încărcare",
    "Actualizează datele și comenzile",
    "Direcție de tundere personalizată",
    "Afișează zonele interzise",
    "Afișează etichetele zonelor interzise",
    "Doar harta",
    "Folosește tema Home Assistant",
    "Fundal din sticlă",
    "Fundal transparent",
    "Durata de viață a componentelor de tăiere",
    "Durata de viață a firului de tăiere",
    "Durata de viață a contactelor de încărcare",
    "Ultima actualizare",
    "Aliniere hartă",
    "Aliniere robot",
    "Direcție robot",
    "Aliniere limită",
    "Sus",
    "Stânga",
    "Dreapta",
    "Jos",
    "Mai îngust",
    "Mai lat",
    "Mai scurt",
    "Mai înalt",
    "Rotire",
    "Resetare",
    "Entitatea comutatorului nu a fost găsită",
    "Operațiunea a eșuat",
    "Setarea a eșuat",
    "pornit",
    "oprit",
    "în așteptare",
    "în pauză",
    "se încarcă",
    "tunde",
    "revine la stație",
    "cartografiere",
    "poziționare",
    "repaus",
    "necunoscut"
  ], { startSub: "Tunde întreaga suprafață", stopSub: "Oprește toate sarcinile" }),
  da: complete("da", [
    "Venter på kortenhed",
    "Robotindstillinger",
    "Grænsefladeindstillinger",
    "Klik for stor visning",
    "Luk",
    "Zoom ind",
    "Zoom ud",
    "START",
    "STOP",
    "LADESTATION",
    "Yderkant",
    "Klip græsplænens ydre grænse",
    "Omkring ladestationen",
    "Klip omkring ladestationen",
    "Opdater data og kommandoer",
    "Tilpasset klipperetning",
    "Vis forbudszoner",
    "Vis etiketter for forbudszoner",
    "Kun kort",
    "Brug Home Assistant-tema",
    "Glasbaggrund",
    "Gennemsigtig baggrund",
    "Levetid for klippekomponenter",
    "Levetid for klippetråd",
    "Levetid for ladekontakter",
    "Seneste opdatering",
    "Kortjustering",
    "Robotjustering",
    "Robotretning",
    "Grænsejustering",
    "Op",
    "Venstre",
    "Højre",
    "Ned",
    "Smallere",
    "Bredere",
    "Kortere",
    "Højere",
    "Rotation",
    "Nulstil",
    "Kontaktenheden blev ikke fundet",
    "Handlingen mislykkedes",
    "Indstillingen mislykkedes",
    "til",
    "fra",
    "standby",
    "sat på pause",
    "oplader",
    "klipper",
    "vender tilbage til ladestationen",
    "kortlægger",
    "positionerer",
    "sover",
    "ukendt"
  ], { startSub: "Klip hele området", stopSub: "Stop alle opgaver" }),
  sv: complete("sv", [
    "Väntar på kartenhet",
    "Robotinställningar",
    "Gränssnittsinställningar",
    "Klicka för stor vy",
    "Stäng",
    "Zooma in",
    "Zooma ut",
    "START",
    "STOPP",
    "LADDSTATION",
    "Ytterkant",
    "Klipp gräsmattans yttre gräns",
    "Laddstationens omgivning",
    "Klipp runt laddstationen",
    "Uppdatera data och kommandon",
    "Anpassad klippriktning",
    "Visa förbjudna zoner",
    "Visa etiketter för förbjudna zoner",
    "Endast karta",
    "Använd Home Assistant-tema",
    "Glasbakgrund",
    "Genomskinlig bakgrund",
    "Klippkomponenternas livslängd",
    "Klipptrådens livslängd",
    "Laddkontakternas livslängd",
    "Senaste uppdatering",
    "Kartjustering",
    "Robotjustering",
    "Robotriktning",
    "Gränsjustering",
    "Upp",
    "Vänster",
    "Höger",
    "Ned",
    "Smalare",
    "Bredare",
    "Kortare",
    "Högre",
    "Rotation",
    "Återställ",
    "Brytarenheten hittades inte",
    "Åtgärden misslyckades",
    "Inställningen misslyckades",
    "på",
    "av",
    "standby",
    "pausad",
    "laddar",
    "klipper",
    "återvänder till laddstationen",
    "kartlägger",
    "positionerar",
    "sover",
    "okänd"
  ], { startSub: "Klipp hela området", stopSub: "Stoppa alla uppgifter" }),
  no: complete("no", [
    "Venter på kartenhet",
    "Robotinnstillinger",
    "Grensesnittinnstillinger",
    "Klikk for stor visning",
    "Lukk",
    "Zoom inn",
    "Zoom ut",
    "START",
    "STOPP",
    "LADESTASJON",
    "Ytterkant",
    "Klipp plenens ytre grense",
    "Rundt ladestasjonen",
    "Klipp rundt ladestasjonen",
    "Oppdater data og kommandoer",
    "Tilpasset klipperetning",
    "Vis forbudssoner",
    "Vis etiketter for forbudssoner",
    "Bare kart",
    "Bruk Home Assistant-tema",
    "Glassbakgrunn",
    "Gjennomsiktig bakgrunn",
    "Levetid for klippekomponenter",
    "Levetid for klippetråd",
    "Levetid for ladekontakter",
    "Siste oppdatering",
    "Kartjustering",
    "Robotjustering",
    "Robotretning",
    "Grensejustering",
    "Opp",
    "Venstre",
    "Høyre",
    "Ned",
    "Smalere",
    "Bredere",
    "Kortere",
    "Høyere",
    "Rotasjon",
    "Tilbakestill",
    "Bryterenheten ble ikke funnet",
    "Handlingen mislyktes",
    "Innstillingen mislyktes",
    "på",
    "av",
    "ventemodus",
    "satt på pause",
    "lader",
    "klipper",
    "returnerer til ladestasjonen",
    "kartlegger",
    "posisjonerer",
    "sover",
    "ukjent"
  ], { startSub: "Klipp hele området", stopSub: "Stopp alle oppgaver" }),
  fi: complete("fi", [
    "Odotetaan karttaentiteettiä",
    "Robotin asetukset",
    "Käyttöliittymän asetukset",
    "Avaa suuri näkymä napsauttamalla",
    "Sulje",
    "Lähennä",
    "Loitonna",
    "KÄYNNISTÄ",
    "PYSÄYTÄ",
    "LATAUSASEMA",
    "Ulkoreuna",
    "Leikkaa nurmikon ulkoraja",
    "Latausaseman ympäristö",
    "Leikkaa latausaseman ympäriltä",
    "Päivitä tiedot ja komennot",
    "Mukautettu leikkuusuunta",
    "Näytä kielletyt alueet",
    "Näytä kiellettyjen alueiden tunnisteet",
    "Vain kartta",
    "Käytä Home Assistant -teemaa",
    "Lasitausta",
    "Läpinäkyvä tausta",
    "Leikkuukomponenttien käyttöikä",
    "Leikkuulangan käyttöikä",
    "Latauskoskettimien käyttöikä",
    "Viimeisin päivitys",
    "Kartan kohdistus",
    "Robotin kohdistus",
    "Robotin suunta",
    "Rajan kohdistus",
    "Ylös",
    "Vasen",
    "Oikea",
    "Alas",
    "Kapeampi",
    "Leveämpi",
    "Lyhyempi",
    "Korkeampi",
    "Kierto",
    "Palauta",
    "Kytkinentiteettiä ei löytynyt",
    "Toiminto epäonnistui",
    "Asetus epäonnistui",
    "päällä",
    "pois",
    "valmiustila",
    "tauolla",
    "lataa",
    "leikkaa",
    "palaa latausasemalle",
    "kartoittaa",
    "paikantaa",
    "lepotila",
    "tuntematon"
  ], { startSub: "Leikkaa koko alue", stopSub: "Pysäytä kaikki tehtävät" }),
  "zh-CN": complete("zh-CN", [
    "等待地图实体",
    "机器人设置",
    "界面设置",
    "点击查看大图",
    "关闭",
    "放大",
    "缩小",
    "开始",
    "停止",
    "充电座",
    "外边界",
    "修剪草坪外边界",
    "充电座周边",
    "修剪充电座周边",
    "刷新数据和命令",
    "自定义修剪方向",
    "显示禁区",
    "显示禁区标签",
    "仅显示地图",
    "使用 Home Assistant 主题",
    "玻璃背景",
    "透明背景",
    "切割部件寿命",
    "割草线寿命",
    "充电触点寿命",
    "最后更新",
    "地图对齐",
    "机器人对齐",
    "机器人方向",
    "边界对齐",
    "上",
    "左",
    "右",
    "下",
    "变窄",
    "变宽",
    "变短",
    "变高",
    "旋转",
    "重置",
    "未找到开关实体",
    "操作失败",
    "设置失败",
    "开",
    "关",
    "待机",
    "暂停",
    "充电中",
    "修剪中",
    "正在返回充电座",
    "建图中",
    "定位中",
    "休眠",
    "未知"
  ]),
  "zh-TW": complete("zh-TW", [
    "等待地圖實體",
    "機器人設定",
    "介面設定",
    "點擊查看大圖",
    "關閉",
    "放大",
    "縮小",
    "開始",
    "停止",
    "充電座",
    "外邊界",
    "修剪草坪外邊界",
    "充電座周邊",
    "修剪充電座周邊",
    "重新整理資料和指令",
    "自訂修剪方向",
    "顯示禁區",
    "顯示禁區標籤",
    "僅顯示地圖",
    "使用 Home Assistant 主題",
    "玻璃背景",
    "透明背景",
    "切割組件壽命",
    "割草線壽命",
    "充電接點壽命",
    "最後更新",
    "地圖對齊",
    "機器人對齊",
    "機器人方向",
    "邊界對齊",
    "上",
    "左",
    "右",
    "下",
    "變窄",
    "變寬",
    "變短",
    "變高",
    "旋轉",
    "重設",
    "找不到開關實體",
    "操作失敗",
    "設定失敗",
    "開",
    "關",
    "待機",
    "暫停",
    "充電中",
    "修剪中",
    "正在返回充電座",
    "建圖中",
    "定位中",
    "休眠",
    "未知"
  ]),
  tr: complete("tr", [
    "Harita varlığı bekleniyor",
    "Robot ayarları",
    "Arayüz ayarları",
    "Büyük görünüm için tıklayın",
    "Kapat",
    "Yakınlaştır",
    "Uzaklaştır",
    "BAŞLAT",
    "DURDUR",
    "İSTASYON",
    "Dış kenar",
    "Çimin dış sınırını biç",
    "İstasyon çevresi",
    "Şarj istasyonunun çevresini biç",
    "Verileri ve komutları yenile",
    "Özel biçme yönü",
    "Yasak bölgeleri göster",
    "Yasak bölge etiketlerini göster",
    "Yalnızca harita",
    "Home Assistant temasını kullan",
    "Cam arka plan",
    "Şeffaf arka plan",
    "Kesme bileşenlerinin ömrü",
    "Kesme telinin ömrü",
    "Şarj kontaklarının ömrü",
    "Son güncelleme",
    "Harita hizalama",
    "Robot hizalama",
    "Robot yönü",
    "Sınır hizalama",
    "Yukarı",
    "Sol",
    "Sağ",
    "Aşağı",
    "Daha dar",
    "Daha geniş",
    "Daha kısa",
    "Daha uzun",
    "Döndürme",
    "Sıfırla",
    "Anahtar varlığı bulunamadı",
    "İşlem başarısız",
    "Ayar başarısız",
    "açık",
    "kapalı",
    "beklemede",
    "duraklatıldı",
    "şarj oluyor",
    "biçiyor",
    "istasyona dönüyor",
    "haritalandırıyor",
    "konumlandırıyor",
    "uykuda",
    "bilinmiyor"
  ]),
  th: complete("th", [
    "กำลังรอเอนทิตีแผนที่",
    "การตั้งค่าหุ่นยนต์",
    "การตั้งค่าอินเทอร์เฟซ",
    "คลิกเพื่อดูภาพขนาดใหญ่",
    "ปิด",
    "ซูมเข้า",
    "ซูมออก",
    "เริ่ม",
    "หยุด",
    "แท่นชาร์จ",
    "ขอบด้านนอก",
    "ตัดขอบด้านนอกของสนามหญ้า",
    "บริเวณแท่นชาร์จ",
    "ตัดหญ้ารอบแท่นชาร์จ",
    "รีเฟรชข้อมูลและคำสั่ง",
    "ทิศทางการตัดหญ้าแบบกำหนดเอง",
    "แสดงเขตห้ามเข้า",
    "แสดงป้ายเขตห้ามเข้า",
    "แผนที่เท่านั้น",
    "ใช้ธีม Home Assistant",
    "พื้นหลังกระจก",
    "พื้นหลังโปร่งใส",
    "อายุการใช้งานส่วนประกอบการตัด",
    "อายุการใช้งานเส้นตัด",
    "อายุการใช้งานหน้าสัมผัสชาร์จ",
    "อัปเดตล่าสุด",
    "จัดแนวแผนที่",
    "จัดแนวหุ่นยนต์",
    "ทิศทางหุ่นยนต์",
    "จัดแนวขอบเขต",
    "ขึ้น",
    "ซ้าย",
    "ขวา",
    "ลง",
    "แคบลง",
    "กว้างขึ้น",
    "สั้นลง",
    "สูงขึ้น",
    "หมุน",
    "รีเซ็ต",
    "ไม่พบเอนทิตีสวิตช์",
    "การทำงานล้มเหลว",
    "การตั้งค่าล้มเหลว",
    "เปิด",
    "ปิด",
    "พร้อมใช้งาน",
    "หยุดชั่วคราว",
    "กำลังชาร์จ",
    "กำลังตัดหญ้า",
    "กำลังกลับแท่นชาร์จ",
    "กำลังสร้างแผนที่",
    "กำลังระบุตำแหน่ง",
    "กำลังพัก",
    "ไม่ทราบ"
  ]),
  vi: complete("vi", [
    "Đang chờ thực thể bản đồ",
    "Cài đặt robot",
    "Cài đặt giao diện",
    "Nhấn để xem bản đồ lớn",
    "Đóng",
    "Phóng to",
    "Thu nhỏ",
    "BẮT ĐẦU",
    "DỪNG",
    "TRẠM SẠC",
    "Viền ngoài",
    "Cắt viền ngoài của bãi cỏ",
    "Khu vực trạm sạc",
    "Cắt quanh trạm sạc",
    "Làm mới dữ liệu và lệnh",
    "Hướng cắt tùy chỉnh",
    "Hiện vùng cấm",
    "Hiện nhãn vùng cấm",
    "Chỉ bản đồ",
    "Dùng giao diện Home Assistant",
    "Nền kính",
    "Nền trong suốt",
    "Tuổi thọ bộ phận cắt",
    "Tuổi thọ dây cắt",
    "Tuổi thọ tiếp điểm sạc",
    "Cập nhật lần cuối",
    "Căn chỉnh bản đồ",
    "Căn chỉnh robot",
    "Hướng robot",
    "Căn chỉnh ranh giới",
    "Lên",
    "Trái",
    "Phải",
    "Xuống",
    "Hẹp hơn",
    "Rộng hơn",
    "Ngắn hơn",
    "Cao hơn",
    "Xoay",
    "Đặt lại",
    "Không tìm thấy thực thể công tắc",
    "Thao tác thất bại",
    "Cài đặt thất bại",
    "bật",
    "tắt",
    "chờ",
    "tạm dừng",
    "đang sạc",
    "đang cắt",
    "đang về trạm sạc",
    "đang lập bản đồ",
    "đang định vị",
    "đang ngủ",
    "không xác định"
  ]),
  ko: complete("ko", [
    "지도 엔티티를 기다리는 중",
    "로봇 설정",
    "인터페이스 설정",
    "큰 화면으로 보려면 클릭",
    "닫기",
    "확대",
    "축소",
    "시작",
    "정지",
    "충전소",
    "외곽 가장자리",
    "잔디밭 외곽 경계 깎기",
    "충전소 주변",
    "충전소 주변 잔디 깎기",
    "데이터 및 명령 새로 고침",
    "사용자 지정 잔디 깎기 방향",
    "금지 구역 표시",
    "금지 구역 레이블 표시",
    "지도만",
    "Home Assistant 테마 사용",
    "유리 배경",
    "투명 배경",
    "절단 부품 수명",
    "절단선 수명",
    "충전 접점 수명",
    "마지막 업데이트",
    "지도 정렬",
    "로봇 정렬",
    "로봇 방향",
    "경계 정렬",
    "위",
    "왼쪽",
    "오른쪽",
    "아래",
    "더 좁게",
    "더 넓게",
    "더 짧게",
    "더 높게",
    "회전",
    "초기화",
    "스위치 엔티티를 찾을 수 없음",
    "작업 실패",
    "설정 실패",
    "켜짐",
    "꺼짐",
    "대기",
    "일시 정지",
    "충전 중",
    "잔디 깎는 중",
    "충전소로 복귀 중",
    "지도 작성 중",
    "위치 확인 중",
    "절전",
    "알 수 없음"
  ]),
  km: complete("km", [
    "កំពុងរង់ចាំធាតុផែនទី",
    "ការកំណត់រ៉ូបូត",
    "ការកំណត់ចំណុចប្រទាក់",
    "ចុចដើម្បីមើលទំហំធំ",
    "បិទ",
    "ពង្រីក",
    "បង្រួម",
    "ចាប់ផ្តើម",
    "បញ្ឈប់",
    "ស្ថានីយសាក",
    "គែមខាងក្រៅ",
    "កាត់ព្រំដែនខាងក្រៅនៃវាលស្មៅ",
    "ជុំវិញស្ថានីយសាក",
    "កាត់ស្មៅជុំវិញស្ថានីយសាក",
    "ផ្ទុកទិន្នន័យ និងពាក្យបញ្ជាឡើងវិញ",
    "ទិសដៅកាត់ស្មៅផ្ទាល់ខ្លួន",
    "បង្ហាញតំបន់ហាមឃាត់",
    "បង្ហាញស្លាកតំបន់ហាមឃាត់",
    "តែផែនទី",
    "ប្រើស្បែក Home Assistant",
    "ផ្ទៃខាងក្រោយកញ្ចក់",
    "ផ្ទៃខាងក្រោយថ្លា",
    "អាយុកាលសមាសធាតុកាត់",
    "អាយុកាលខ្សែកាត់",
    "អាយុកាលចំណុចប៉ះសាក",
    "ការធ្វើបច្ចុប្បន្នភាពចុងក្រោយ",
    "តម្រឹមផែនទី",
    "តម្រឹមរ៉ូបូត",
    "ទិសដៅរ៉ូបូត",
    "តម្រឹមព្រំដែន",
    "ឡើង",
    "ឆ្វេង",
    "ស្តាំ",
    "ចុះ",
    "តូចជាង",
    "ធំជាង",
    "ខ្លីជាង",
    "ខ្ពស់ជាង",
    "បង្វិល",
    "កំណត់ឡើងវិញ",
    "រកមិនឃើញធាតុកុងតាក់ទេ",
    "ប្រតិបត្តិការបរាជ័យ",
    "ការកំណត់បរាជ័យ",
    "បើក",
    "បិទ",
    "រង់ចាំ",
    "បានផ្អាក",
    "កំពុងសាក",
    "កំពុងកាត់ស្មៅ",
    "កំពុងត្រឡប់ទៅស្ថានីយសាក",
    "កំពុងបង្កើតផែនទី",
    "កំពុងកំណត់ទីតាំង",
    "កំពុងសម្រាក",
    "មិនស្គាល់"
  ])
};
var EXTRA_TERMS = {
  hu: { zone: "Zóna", firmware: "Belső vezérlőprogram", gpsLatitude: "GPS-szélesség", gpsLongitude: "GPS-hosszúság" },
  de: { zone: "Zone", firmware: "Firmware", gpsLatitude: "GPS-Breitengrad", gpsLongitude: "GPS-Längengrad" },
  fr: { zone: "Zone", firmware: "Micrologiciel", gpsLatitude: "Latitude GPS", gpsLongitude: "Longitude GPS" },
  es: { zone: "Zona", firmware: "Firmware", gpsLatitude: "Latitud GPS", gpsLongitude: "Longitud GPS" },
  it: { zone: "Zona", firmware: "Firmware", gpsLatitude: "Latitudine GPS", gpsLongitude: "Longitudine GPS" },
  pt: { zone: "Zona", firmware: "Firmware", gpsLatitude: "Latitude GPS", gpsLongitude: "Longitude GPS" },
  nl: { zone: "Zone", firmware: "Firmware", gpsLatitude: "GPS-breedtegraad", gpsLongitude: "GPS-lengtegraad" },
  pl: { zone: "Strefa", firmware: "Oprogramowanie układowe", gpsLatitude: "Szerokość GPS", gpsLongitude: "Długość GPS" },
  cs: { zone: "Zóna", firmware: "Firmware", gpsLatitude: "Zeměpisná šířka GPS", gpsLongitude: "Zeměpisná délka GPS" },
  sk: { zone: "Zóna", firmware: "Firmvér", gpsLatitude: "Zemepisná šírka GPS", gpsLongitude: "Zemepisná dĺžka GPS" },
  ro: { zone: "Zonă", firmware: "Firmware", gpsLatitude: "Latitudine GPS", gpsLongitude: "Longitudine GPS" },
  da: { zone: "Zone", firmware: "Firmware", gpsLatitude: "GPS-breddegrad", gpsLongitude: "GPS-længdegrad" },
  sv: { zone: "Zon", firmware: "Fast programvara", gpsLatitude: "GPS-latitud", gpsLongitude: "GPS-longitud" },
  no: { zone: "Sone", firmware: "Fastvare", gpsLatitude: "GPS-breddegrad", gpsLongitude: "GPS-lengdegrad" },
  fi: { zone: "Alue", firmware: "Laiteohjelmisto", gpsLatitude: "GPS-leveysaste", gpsLongitude: "GPS-pituusaste" },
  "zh-CN": { zone: "区域", firmware: "固件", gpsLatitude: "GPS 纬度", gpsLongitude: "GPS 经度" },
  "zh-TW": { zone: "區域", firmware: "韌體", gpsLatitude: "GPS 緯度", gpsLongitude: "GPS 經度" },
  tr: { zone: "Bölge", firmware: "Donanım yazılımı", gpsLatitude: "GPS enlemi", gpsLongitude: "GPS boylamı" },
  th: { zone: "โซน", firmware: "เฟิร์มแวร์", gpsLatitude: "ละติจูด GPS", gpsLongitude: "ลองจิจูด GPS" },
  vi: { zone: "Khu vực", firmware: "Phần sụn", gpsLatitude: "Vĩ độ GPS", gpsLongitude: "Kinh độ GPS" },
  ko: { zone: "구역", firmware: "펌웨어", gpsLatitude: "GPS 위도", gpsLongitude: "GPS 경도" },
  km: { zone: "តំបន់", firmware: "កម្មវិធីបង្កប់", gpsLatitude: "រយៈទទឹង GPS", gpsLongitude: "រយៈបណ្ដោយ GPS" }
};
for (const [language, terms] of Object.entries(EXTRA_TERMS)) {
  Object.assign(TRANSLATION_COMPLEMENTS[language] ||= {}, terms);
}

// garden-i18n.js?v=133
var LANGUAGES2 = [
  ["auto", "Automatic / Automatikus"],
  ["en", "English"],
  ["hu", "Magyar"],
  ["de", "Deutsch"],
  ["fr", "Français"],
  ["es", "Español"],
  ["it", "Italiano"],
  ["pt", "Português"],
  ["nl", "Nederlands"],
  ["pl", "Polski"],
  ["cs", "Čeština"],
  ["sk", "Slovenčina"],
  ["ro", "Română"],
  ["da", "Dansk"],
  ["sv", "Svenska"],
  ["no", "Norsk"],
  ["fi", "Suomi"],
  ["zh-CN", "简体中文"],
  ["zh-TW", "繁體中文"],
  ["tr", "Türkçe"],
  ["th", "ไทย"],
  ["vi", "Tiếng Việt"],
  ["ko", "한국어"],
  ["km", "ខ្មែរ"]
];
var en = {
  language: "Language",
  automatic: "Automatic",
  waiting: "Waiting for map entity",
  status: "Status",
  control: "Control",
  settings: "Settings",
  robotSettings: "Robot settings",
  interfaceSettings: "Interface settings",
  diagnostics: "Diagnostics",
  map: "Map",
  expand: "Click for large view",
  close: "Close",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  zones: "Zones",
  zone: "Zone",
  forbidden: "No-go",
  position: "Position",
  heading: "Direction",
  start: "START",
  startLabel: "Start",
  startSub: "Mow entire area",
  stop: "STOP",
  stopLabel: "Stop",
  stopSub: "Stop all tasks",
  home: "HOME",
  homeLabel: "Dock",
  homeSub: "Return to dock",
  zoneStart: "Start zone mowing",
  outerEdgeLabel: "Outer edge",
  outerEdgeSub: "Mow the outer lawn boundary",
  dockEdgeLabel: "Dock surroundings",
  dockEdgeSub: "Mow around the charging dock",
  cloud: "Cloud connection",
  cloudSub: "Refresh data and commands",
  customDirection: "Custom direction",
  rainDelay: "Delay after rain",
  volume: "Volume",
  rainDetection: "Rain detection",
  customCutDirection: "Custom mowing direction",
  showZones: "Show zones",
  showBoundary: "Show boundary",
  showNoGoZones: "Show no-go zones",
  showNoGoLabels: "Show no-go labels",
  mapOnly: "Map only",
  themeBackground: "Use Home Assistant theme",
  glassBackground: "Glass background",
  transparentBackground: "Transparent background",
  battery: "Battery",
  charging: "Charging",
  connection: "Connection",
  cutHeight: "Cutting height",
  mowedArea: "Mowed area",
  mowingTime: "Mowing time",
  totalArea: "Total area",
  error: "Error",
  bladeLife: "Cutting components life",
  lineLife: "Cutting line life",
  dockContact: "Dock contact life",
  lastUpdate: "Last update",
  firmware: "Firmware",
  gpsLatitude: "GPS latitude",
  gpsLongitude: "GPS longitude",
  calibration: "Calibration",
  mapFit: "Map alignment",
  robotFit: "Robot calibration",
  mowingPathFit: "Mowing path calibration",
  robotDirection: "Robot direction",
  boundaryFit: "Boundary alignment",
  yamlCopy: "Copy YAML",
  up: "Up",
  left: "Left",
  right: "Right",
  down: "Down",
  narrower: "Narrower",
  wider: "Wider",
  shorter: "Shorter",
  taller: "Taller",
  rotation: "Rotation",
  reset: "Reset",
  switchMissing: "Switch entity not found",
  operationFailed: "Operation failed",
  settingFailed: "Setting failed",
  status_on: "on",
  status_off: "off",
  status_standby: "standby",
  status_paused: "paused",
  status_charging: "charging",
  status_mowing: "mowing",
  status_returning_to_dock: "returning to dock",
  status_mapping: "mapping",
  status_positioning: "positioning",
  status_sleeping: "sleeping",
  status_unknown: "unknown",
  mowingHistoryEmpty: "No completed mowing sessions yet.",
  mowingHistoryTotalCount: "Total sessions",
  mowingHistoryTotalArea: "Total mowed area",
  mowingHistoryArea: "Mowed area",
  mowingHistoryProgress: "Mowing progress",
  mowingHistoryDuration: "Duration",
  mowingHistoryMode: "Mowing mode",
  mowingHistoryStartedBy: "Start reason",
  mowingHistoryRawFields: "Other fields",
  mowingHistoryUnknownTime: "Unknown time",
  mowingModeZones: "Zones",
  mowingModeGlobal: "Entire lawn",
  mowingModeEdge: "Outer edge",
  mowingModeDockEdge: "Dock surroundings",
  mowingSourceApp: "App",
  mowingSourceSchedule: "Schedule",
  mowingSourceButton: "Robot button",
  mowingSourceVoice: "Voice",
  mowingHistoryDetailLoading: "Loading…",
  mowingHistoryDetailUnavailable: "No visual data available for this session.",
  mowingHistory: "Previous mowing tasks",
  errorHistory: "Detailed error history"
};
var translations = {
  en,
  hu: {
    language: "Nyelv",
    automatic: "Automatikus",
    waiting: "Várakozás a térkép entitásra",
    status: "Állapot",
    control: "Vezérlés",
    settings: "Beállítások",
    robotSettings: "Robot beállítások",
    interfaceSettings: "Felület beállítások",
    diagnostics: "Diagnosztika",
    map: "Térkép",
    expand: "Kattints a nagy nézethez",
    close: "Bezárás",
    zoomIn: "Nagyítás",
    zoomOut: "Kicsinyítés",
    zones: "Zónák",
    forbidden: "Tiltott",
    position: "Pozíció",
    heading: "Irány",
    start: "INDÍTÁS",
    startLabel: "Indítás",
    startSub: "Teljes terület nyírása",
    stop: "LEÁLLÍTÁS",
    stopLabel: "Leállítás",
    stopSub: "Minden feladat leállítása",
    home: "TÖLTŐ",
    homeLabel: "Töltő",
    homeSub: "Vissza a töltőre",
    zoneStart: "Zónavágás indítása",
    outerEdgeLabel: "Külső szegély",
    outerEdgeSub: "A gyep külső határának körbevágása",
    dockEdgeLabel: "Töltő környéke",
    dockEdgeSub: "A töltőállomás körüli nyírás",
    cloud: "Felhőkapcsolat",
    cloudSub: "Adatok és parancsok frissítése",
    customDirection: "Egyedi irány",
    rainDelay: "Eső utáni várakozás",
    volume: "Hangerő",
    rainDetection: "Esőérzékelés",
    customCutDirection: "Egyedi vágási irány",
    showZones: "Zónák megjelenítése",
    showBoundary: "Határvonal megjelenítése",
    showNoGoZones: "Tiltott zónák megjelenítése",
    showNoGoLabels: "Tiltott zóna feliratok",
    mapOnly: "Csak térkép",
    themeBackground: "HA téma használata",
    glassBackground: "Üveg háttér",
    transparentBackground: "Átlátszó háttér",
    battery: "Akkumulátor",
    charging: "Töltés",
    connection: "Kapcsolat",
    cutHeight: "Vágási magasság",
    mowedArea: "Nyírt terület",
    mowingTime: "Nyírási idő",
    totalArea: "Összterület",
    error: "Hiba",
    bladeLife: "Vágókések élettartama",
    lineLife: "Damilszál élettartama",
    dockContact: "Töltőérintkező élettartama",
    lastUpdate: "Utolsó frissítés",
    calibration: "Kalibrálás",
    mapFit: "Térkép illesztése",
    robotFit: "Robot kalibráció",
    mowingPathFit: "Nyírási útvonal kalibráció",
    robotDirection: "Robot iránya",
    boundaryFit: "Határvonal illesztése",
    yamlCopy: "YAML másolása",
    up: "Fel",
    left: "Balra",
    right: "Jobbra",
    down: "Le",
    narrower: "Keskenyebb",
    wider: "Szélesebb",
    shorter: "Alacsonyabb",
    taller: "Magasabb",
    rotation: "Forgatás",
    reset: "Alaphelyzet",
    switchMissing: "Nem található kapcsoló entitás",
    operationFailed: "A művelet sikertelen",
    settingFailed: "A beállítás sikertelen",
    status_on: "be",
    status_off: "ki",
    status_standby: "készenlét",
    status_paused: "szünet",
    status_charging: "töltés",
    status_mowing: "nyírás",
    status_returning_to_dock: "vissza a töltőre",
    status_mapping: "térképezés",
    status_positioning: "pozicionálás",
    status_sleeping: "alvás",
    status_unknown: "ismeretlen",
    mowingHistoryEmpty: "Még nincs befejezett nyírás.",
    mowingHistoryTotalCount: "Összes alkalom",
    mowingHistoryTotalArea: "Összesen lenyírt terület",
    mowingHistoryArea: "Lenyírt terület",
    mowingHistoryProgress: "Nyírási folyamat",
    mowingHistoryDuration: "Időtartam",
    mowingHistoryMode: "Nyírási mód",
    mowingHistoryStartedBy: "Indítás indoka",
    mowingHistoryRawFields: "Egyéb mezők",
    mowingHistoryUnknownTime: "Ismeretlen időpont",
    mowingModeZones: "Zónák",
    mowingModeGlobal: "Teljes terület",
    mowingModeEdge: "Külső szegély",
    mowingModeDockEdge: "Töltő környéke",
    mowingSourceApp: "Alkalmazás",
    mowingSourceSchedule: "Ütemezés",
    mowingSourceButton: "Robot gomb",
    mowingSourceVoice: "Hang",
    mowingHistoryDetailLoading: "Betöltés…",
    mowingHistoryDetailUnavailable: "Ehhez a nyíráshoz nincs elérhető képi adat.",
    mowingHistory: "Korábbi nyírási feladatok",
    errorHistory: "Részletes hibakód-előzmények"
  },
  de: { language: "Sprache", automatic: "Automatisch", status: "Status", control: "Steuerung", settings: "Einstellungen", diagnostics: "Diagnose", map: "Karte", zones: "Zonen", forbidden: "Sperrgebiet", position: "Position", heading: "Richtung", startLabel: "Start", startSub: "Gesamte Fläche mähen", stopLabel: "Stopp", stopSub: "Alle Aufgaben stoppen", homeLabel: "Ladestation", homeSub: "Zur Ladestation", zoneStart: "Zonenmähen starten", cloud: "Cloud-Verbindung", customDirection: "Benutzerdefinierte Richtung", rainDelay: "Wartezeit nach Regen", volume: "Lautstärke", rainDetection: "Regenerkennung", showZones: "Zonen anzeigen", showBoundary: "Grenze anzeigen", battery: "Akku", charging: "Laden", connection: "Verbindung", cutHeight: "Schnitthöhe", mowedArea: "Gemähte Fläche", mowingTime: "Mähzeit", totalArea: "Gesamtfläche", error: "Fehler", calibration: "Kalibrierung", yamlCopy: "YAML kopieren" },
  fr: { language: "Langue", automatic: "Automatique", status: "État", control: "Commande", settings: "Réglages", diagnostics: "Diagnostic", map: "Carte", zones: "Zones", forbidden: "Zone interdite", position: "Position", heading: "Direction", startLabel: "Démarrer", startSub: "Tondre toute la zone", stopLabel: "Arrêter", stopSub: "Arrêter toutes les tâches", homeLabel: "Station", homeSub: "Retour à la station", zoneStart: "Démarrer la tonte de zone", cloud: "Connexion cloud", customDirection: "Direction personnalisée", rainDelay: "Délai après pluie", volume: "Volume", rainDetection: "Détection de pluie", showZones: "Afficher les zones", showBoundary: "Afficher la limite", battery: "Batterie", charging: "Charge", connection: "Connexion", cutHeight: "Hauteur de coupe", mowedArea: "Surface tondue", mowingTime: "Temps de tonte", totalArea: "Surface totale", error: "Erreur", calibration: "Étalonnage", yamlCopy: "Copier le YAML" },
  es: { language: "Idioma", automatic: "Automático", status: "Estado", control: "Control", settings: "Ajustes", diagnostics: "Diagnóstico", map: "Mapa", zones: "Zonas", forbidden: "Zona prohibida", position: "Posición", heading: "Dirección", startLabel: "Iniciar", startSub: "Cortar toda el área", stopLabel: "Detener", stopSub: "Detener todas las tareas", homeLabel: "Base", homeSub: "Volver a la base", zoneStart: "Iniciar corte de zona", cloud: "Conexión a la nube", customDirection: "Dirección personalizada", rainDelay: "Espera tras lluvia", volume: "Volumen", rainDetection: "Detección de lluvia", showZones: "Mostrar zonas", showBoundary: "Mostrar límite", battery: "Batería", charging: "Cargando", connection: "Conexión", cutHeight: "Altura de corte", mowedArea: "Área cortada", mowingTime: "Tiempo de corte", totalArea: "Área total", error: "Error", calibration: "Calibración", yamlCopy: "Copiar YAML" },
  it: { language: "Lingua", automatic: "Automatico", status: "Stato", control: "Controllo", settings: "Impostazioni", diagnostics: "Diagnostica", map: "Mappa", zones: "Zone", forbidden: "Zona vietata", position: "Posizione", heading: "Direzione", startLabel: "Avvia", startSub: "Taglia tutta l'area", stopLabel: "Stop", stopSub: "Ferma tutte le attività", homeLabel: "Base", homeSub: "Ritorna alla base", zoneStart: "Avvia taglio zona", cloud: "Connessione cloud", customDirection: "Direzione personalizzata", rainDelay: "Attesa dopo pioggia", volume: "Volume", rainDetection: "Rilevamento pioggia", showZones: "Mostra zone", showBoundary: "Mostra confine", battery: "Batteria", charging: "Ricarica", connection: "Connessione", cutHeight: "Altezza di taglio", mowedArea: "Area tagliata", mowingTime: "Tempo di taglio", totalArea: "Area totale", error: "Errore", calibration: "Calibrazione", yamlCopy: "Copia YAML" },
  pt: { language: "Idioma", automatic: "Automático", status: "Estado", control: "Controlo", settings: "Definições", diagnostics: "Diagnóstico", map: "Mapa", zones: "Zonas", forbidden: "Zona proibida", position: "Posição", heading: "Direção", startLabel: "Iniciar", startSub: "Cortar toda a área", stopLabel: "Parar", stopSub: "Parar todas as tarefas", homeLabel: "Base", homeSub: "Voltar à base", zoneStart: "Iniciar corte da zona", cloud: "Ligação à nuvem", customDirection: "Direção personalizada", rainDelay: "Espera após chuva", volume: "Volume", rainDetection: "Deteção de chuva", showZones: "Mostrar zonas", showBoundary: "Mostrar limite", battery: "Bateria", charging: "A carregar", connection: "Ligação", cutHeight: "Altura de corte", mowedArea: "Área cortada", mowingTime: "Tempo de corte", totalArea: "Área total", error: "Erro", calibration: "Calibração", yamlCopy: "Copiar YAML" },
  nl: { language: "Taal", automatic: "Automatisch", status: "Status", control: "Bediening", settings: "Instellingen", diagnostics: "Diagnose", map: "Kaart", zones: "Zones", forbidden: "Verboden zone", position: "Positie", heading: "Richting", startLabel: "Start", startSub: "Hele gebied maaien", stopLabel: "Stop", stopSub: "Alle taken stoppen", homeLabel: "Laadstation", homeSub: "Terug naar laadstation", zoneStart: "Zonemaaien starten", cloud: "Cloudverbinding", customDirection: "Aangepaste richting", rainDelay: "Wachttijd na regen", volume: "Volume", rainDetection: "Regendetectie", showZones: "Zones tonen", showBoundary: "Grens tonen", battery: "Accu", charging: "Laden", connection: "Verbinding", cutHeight: "Maaihoogte", mowedArea: "Gemaaid gebied", mowingTime: "Maaiduur", totalArea: "Totale oppervlakte", error: "Fout", calibration: "Kalibratie", yamlCopy: "YAML kopiëren" },
  pl: {
    language: "Język",
    automatic: "Automatycznie",
    waiting: "Oczekiwanie na encję mapy",
    status: "Stan",
    control: "Sterowanie",
    settings: "Ustawienia",
    robotSettings: "Ustawienia robota",
    interfaceSettings: "Ustawienia interfejsu",
    diagnostics: "Diagnostyka",
    map: "Mapa",
    expand: "Kliknij, aby powiększyć",
    close: "Zamknij",
    zoomIn: "Powiększ",
    zoomOut: "Pomniejsz",
    zones: "Strefy",
    forbidden: "Strefa zakazana",
    position: "Pozycja",
    heading: "Kierunek",
    start: "START",
    startLabel: "Start",
    startSub: "Koś cały obszar",
    stop: "STOP",
    stopLabel: "Stop",
    stopSub: "Zatrzymaj wszystkie zadania",
    home: "BAZA",
    homeLabel: "Stacja",
    homeSub: "Powrót do stacji",
    zoneStart: "Rozpocznij koszenie strefy",
    outerEdgeLabel: "Zewnętrzna krawędź",
    outerEdgeSub: "Koszenie zewnętrznej granicy trawnika",
    dockEdgeLabel: "Otoczenie stacji",
    dockEdgeSub: "Koszenie wokół stacji ładującej",
    cloud: "Połączenie z chmurą",
    cloudSub: "Odśwież dane i polecenia",
    customDirection: "Własny kierunek",
    rainDelay: "Opóźnienie po deszczu",
    volume: "Głośność",
    rainDetection: "Wykrywanie deszczu",
    customCutDirection: "Własny kierunek koszenia",
    showZones: "Pokaż strefy",
    showBoundary: "Pokaż granicę",
    showNoGoZones: "Pokaż strefy zakazane",
    showNoGoLabels: "Pokaż etykiety stref zakazanych",
    mapOnly: "Tylko mapa",
    themeBackground: "Użyj motywu Home Assistant",
    glassBackground: "Szklane tło",
    transparentBackground: "Przezroczyste tło",
    battery: "Bateria",
    charging: "Ładowanie",
    connection: "Połączenie",
    cutHeight: "Wysokość koszenia",
    mowedArea: "Skoszony obszar",
    mowingTime: "Czas koszenia",
    totalArea: "Całkowity obszar",
    error: "Błąd",
    bladeLife: "Zużycie elementów tnących",
    lineLife: "Zużycie żyłki tnącej",
    dockContact: "Zużycie styków stacji",
    lastUpdate: "Ostatnia aktualizacja",
    calibration: "Kalibracja",
    mapFit: "Dopasowanie mapy",
    robotFit: "Dopasowanie robota",
    robotDirection: "Kierunek robota",
    boundaryFit: "Dopasowanie granicy",
    yamlCopy: "Kopiuj YAML",
    up: "Góra",
    left: "Lewo",
    right: "Prawo",
    down: "Dół",
    narrower: "Węziej",
    wider: "Szerzej",
    shorter: "Niżej",
    taller: "Wyżej",
    rotation: "Obrót",
    reset: "Resetuj",
    switchMissing: "Nie znaleziono encji przełącznika",
    operationFailed: "Operacja nie powiodła się",
    settingFailed: "Nie udało się zmienić ustawienia",
    status_on: "włączony",
    status_off: "wyłączony",
    status_standby: "oczekiwanie",
    status_paused: "wstrzymany",
    status_charging: "ładowanie",
    status_mowing: "koszenie",
    status_returning_to_dock: "powrót do stacji",
    status_mapping: "mapowanie",
    status_positioning: "pozycjonowanie",
    status_sleeping: "uśpiony",
    status_unknown: "nieznany"
  },
  cs: { language: "Jazyk", automatic: "Automaticky", status: "Stav", control: "Ovládání", settings: "Nastavení", diagnostics: "Diagnostika", map: "Mapa", zones: "Zóny", forbidden: "Zakázaná zóna", position: "Poloha", heading: "Směr", startLabel: "Spustit", stopLabel: "Zastavit", homeLabel: "Stanice", homeSub: "Návrat do stanice", zoneStart: "Spustit sečení zóny", cloud: "Cloudové připojení", customDirection: "Vlastní směr", rainDelay: "Čekání po dešti", volume: "Hlasitost", rainDetection: "Detekce deště", showZones: "Zobrazit zóny", showBoundary: "Zobrazit hranici", battery: "Baterie", charging: "Nabíjení", connection: "Připojení", cutHeight: "Výška sečení", mowedArea: "Posečená plocha", mowingTime: "Doba sečení", totalArea: "Celková plocha", error: "Chyba", calibration: "Kalibrace", yamlCopy: "Kopírovat YAML" },
  sk: { language: "Jazyk", automatic: "Automaticky", status: "Stav", control: "Ovládanie", settings: "Nastavenia", diagnostics: "Diagnostika", map: "Mapa", zones: "Zóny", forbidden: "Zakázaná zóna", position: "Poloha", heading: "Smer", startLabel: "Spustiť", stopLabel: "Zastaviť", homeLabel: "Stanica", homeSub: "Návrat do stanice", zoneStart: "Spustiť kosenie zóny", cloud: "Cloudové pripojenie", customDirection: "Vlastný smer", rainDelay: "Čakanie po daždi", volume: "Hlasitosť", rainDetection: "Detekcia dažďa", showZones: "Zobraziť zóny", showBoundary: "Zobraziť hranicu", battery: "Batéria", charging: "Nabíjanie", connection: "Pripojenie", cutHeight: "Výška kosenia", mowedArea: "Pokosená plocha", mowingTime: "Čas kosenia", totalArea: "Celková plocha", error: "Chyba", calibration: "Kalibrácia", yamlCopy: "Kopírovať YAML" },
  ro: { language: "Limbă", automatic: "Automat", status: "Stare", control: "Control", settings: "Setări", diagnostics: "Diagnostic", map: "Hartă", zones: "Zone", forbidden: "Zonă interzisă", position: "Poziție", heading: "Direcție", startLabel: "Pornire", stopLabel: "Oprire", homeLabel: "Stație", homeSub: "Înapoi la stație", zoneStart: "Pornește tunderea zonei", cloud: "Conexiune cloud", customDirection: "Direcție personalizată", rainDelay: "Așteptare după ploaie", volume: "Volum", rainDetection: "Detectare ploaie", showZones: "Afișează zonele", showBoundary: "Afișează limita", battery: "Baterie", charging: "Încărcare", connection: "Conexiune", cutHeight: "Înălțime de tăiere", mowedArea: "Suprafață tunsă", mowingTime: "Timp de tundere", totalArea: "Suprafață totală", error: "Eroare", calibration: "Calibrare", yamlCopy: "Copiază YAML" },
  da: { language: "Sprog", automatic: "Automatisk", status: "Status", control: "Styring", settings: "Indstillinger", diagnostics: "Diagnostik", map: "Kort", zones: "Zoner", forbidden: "Forbudszone", position: "Position", heading: "Retning", startLabel: "Start", stopLabel: "Stop", homeLabel: "Ladestation", homeSub: "Tilbage til ladestation", zoneStart: "Start zoneklipning", cloud: "Cloudforbindelse", customDirection: "Tilpasset retning", rainDelay: "Ventetid efter regn", volume: "Lydstyrke", rainDetection: "Regnregistrering", showZones: "Vis zoner", showBoundary: "Vis grænse", battery: "Batteri", charging: "Opladning", connection: "Forbindelse", cutHeight: "Klippehøjde", mowedArea: "Klippet område", mowingTime: "Klippetid", totalArea: "Samlet område", error: "Fejl", calibration: "Kalibrering", yamlCopy: "Kopiér YAML" },
  sv: { language: "Språk", automatic: "Automatiskt", status: "Status", control: "Styrning", settings: "Inställningar", diagnostics: "Diagnostik", map: "Karta", zones: "Zoner", forbidden: "Förbjuden zon", position: "Position", heading: "Riktning", startLabel: "Start", stopLabel: "Stopp", homeLabel: "Laddstation", homeSub: "Tillbaka till laddstation", zoneStart: "Starta zonklippning", cloud: "Molnanslutning", customDirection: "Anpassad riktning", rainDelay: "Väntetid efter regn", volume: "Volym", rainDetection: "Regndetektering", showZones: "Visa zoner", showBoundary: "Visa gräns", battery: "Batteri", charging: "Laddning", connection: "Anslutning", cutHeight: "Klipphöjd", mowedArea: "Klippt område", mowingTime: "Klipptid", totalArea: "Total yta", error: "Fel", calibration: "Kalibrering", yamlCopy: "Kopiera YAML" },
  no: { language: "Språk", automatic: "Automatisk", status: "Status", control: "Styring", settings: "Innstillinger", diagnostics: "Diagnostikk", map: "Kart", zones: "Soner", forbidden: "Forbudssone", position: "Posisjon", heading: "Retning", startLabel: "Start", stopLabel: "Stopp", homeLabel: "Ladestasjon", homeSub: "Tilbake til ladestasjon", zoneStart: "Start soneklipping", cloud: "Skytilkobling", customDirection: "Tilpasset retning", rainDelay: "Ventetid etter regn", volume: "Volum", rainDetection: "Regndeteksjon", showZones: "Vis soner", showBoundary: "Vis grense", battery: "Batteri", charging: "Lading", connection: "Tilkobling", cutHeight: "Klippehøyde", mowedArea: "Klippet område", mowingTime: "Klippetid", totalArea: "Totalt område", error: "Feil", calibration: "Kalibrering", yamlCopy: "Kopier YAML" },
  fi: { language: "Kieli", automatic: "Automaattinen", status: "Tila", control: "Ohjaus", settings: "Asetukset", diagnostics: "Diagnostiikka", map: "Kartta", zones: "Alueet", forbidden: "Kielletty alue", position: "Sijainti", heading: "Suunta", startLabel: "Käynnistä", stopLabel: "Pysäytä", homeLabel: "Latausasema", homeSub: "Palaa latausasemalle", zoneStart: "Aloita alueen leikkuu", cloud: "Pilviyhteys", customDirection: "Mukautettu suunta", rainDelay: "Odotus sateen jälkeen", volume: "Äänenvoimakkuus", rainDetection: "Sateen tunnistus", showZones: "Näytä alueet", showBoundary: "Näytä raja", battery: "Akku", charging: "Lataus", connection: "Yhteys", cutHeight: "Leikkuukorkeus", mowedArea: "Leikattu alue", mowingTime: "Leikkuuaika", totalArea: "Kokonaisalue", error: "Virhe", calibration: "Kalibrointi", yamlCopy: "Kopioi YAML" },
  "zh-CN": { language: "语言", automatic: "自动", waiting: "等待地图实体", status: "状态", control: "控制", settings: "设置", diagnostics: "诊断", map: "地图", expand: "点击查看大图", close: "关闭", zoomIn: "放大", zoomOut: "缩小", zones: "区域", forbidden: "禁区", position: "位置", heading: "方向", startLabel: "开始", startSub: "修剪整个区域", stopLabel: "停止", stopSub: "停止所有任务", homeLabel: "充电座", homeSub: "返回充电座", zoneStart: "开始区域修剪", cloud: "云连接", cloudSub: "刷新数据和命令", customDirection: "自定义方向", rainDelay: "雨后等待", volume: "音量", rainDetection: "雨水检测", customCutDirection: "自定义修剪方向", showZones: "显示区域", showBoundary: "显示边界", battery: "电池", charging: "充电", connection: "连接", cutHeight: "割草高度", mowedArea: "已修剪面积", mowingTime: "修剪时间", totalArea: "总面积", error: "错误", bladeLife: "刀片寿命", lineLife: "割草线寿命", dockContact: "充电触点寿命", lastUpdate: "最后更新", calibration: "校准", mapFit: "地图校准", robotFit: "机器人校准", boundaryFit: "边界校准", yamlCopy: "复制 YAML", up: "上", left: "左", right: "右", down: "下", narrower: "变窄", wider: "变宽", shorter: "变短", taller: "变高", rotation: "旋转", reset: "重置", status_on: "开", status_off: "关", status_standby: "待机", status_paused: "暂停", status_charging: "充电中", status_mowing: "修剪中", status_returning_to_dock: "返回充电座", status_mapping: "建图中", status_positioning: "定位中", status_sleeping: "休眠", status_unknown: "未知" },
  "zh-TW": { language: "語言", automatic: "自動", waiting: "等待地圖實體", status: "狀態", control: "控制", settings: "設定", diagnostics: "診斷", map: "地圖", expand: "點擊查看大圖", close: "關閉", zoomIn: "放大", zoomOut: "縮小", zones: "區域", forbidden: "禁區", position: "位置", heading: "方向", startLabel: "開始", startSub: "修剪整個區域", stopLabel: "停止", stopSub: "停止所有任務", homeLabel: "充電座", homeSub: "返回充電座", zoneStart: "開始區域修剪", cloud: "雲端連線", cloudSub: "重新整理資料和命令", customDirection: "自訂方向", rainDelay: "雨後等待", volume: "音量", rainDetection: "雨水偵測", customCutDirection: "自訂修剪方向", showZones: "顯示區域", showBoundary: "顯示邊界", battery: "電池", charging: "充電", connection: "連線", cutHeight: "割草高度", mowedArea: "已修剪面積", mowingTime: "修剪時間", totalArea: "總面積", error: "錯誤", bladeLife: "刀片壽命", lineLife: "割草線壽命", dockContact: "充電接點壽命", lastUpdate: "最後更新", calibration: "校準", mapFit: "地圖校準", robotFit: "機器人校準", boundaryFit: "邊界校準", yamlCopy: "複製 YAML", up: "上", left: "左", right: "右", down: "下", narrower: "變窄", wider: "變寬", shorter: "變短", taller: "變高", rotation: "旋轉", reset: "重設", status_on: "開", status_off: "關", status_standby: "待機", status_paused: "暫停", status_charging: "充電中", status_mowing: "修剪中", status_returning_to_dock: "返回充電座", status_mapping: "建圖中", status_positioning: "定位中", status_sleeping: "休眠", status_unknown: "未知" },
  tr: { language: "Dil", automatic: "Otomatik", waiting: "Harita varlığı bekleniyor", status: "Durum", control: "Kontrol", settings: "Ayarlar", diagnostics: "Tanılama", map: "Harita", expand: "Büyük görünüm için tıklayın", close: "Kapat", zoomIn: "Yakınlaştır", zoomOut: "Uzaklaştır", zones: "Bölgeler", forbidden: "Yasak bölge", position: "Konum", heading: "Yön", startLabel: "Başlat", startSub: "Tüm alanı biç", stopLabel: "Durdur", stopSub: "Tüm görevleri durdur", homeLabel: "İstasyon", homeSub: "İstasyona dön", zoneStart: "Bölge biçmeyi başlat", cloud: "Bulut bağlantısı", customDirection: "Özel yön", rainDelay: "Yağmur sonrası bekleme", volume: "Ses", rainDetection: "Yağmur algılama", showZones: "Bölgeleri göster", showBoundary: "Sınırı göster", battery: "Pil", charging: "Şarj", connection: "Bağlantı", cutHeight: "Kesim yüksekliği", mowedArea: "Biçilen alan", mowingTime: "Biçme süresi", totalArea: "Toplam alan", error: "Hata", calibration: "Kalibrasyon", yamlCopy: "YAML kopyala", status_standby: "beklemede", status_paused: "duraklatıldı", status_charging: "şarj oluyor", status_mowing: "biçiyor", status_returning_to_dock: "istasyona dönüyor", status_unknown: "bilinmiyor" },
  th: { language: "ภาษา", automatic: "อัตโนมัติ", waiting: "กำลังรอเอนทิตีแผนที่", status: "สถานะ", control: "ควบคุม", settings: "การตั้งค่า", diagnostics: "การวินิจฉัย", map: "แผนที่", close: "ปิด", zoomIn: "ซูมเข้า", zoomOut: "ซูมออก", zones: "โซน", forbidden: "เขตห้ามเข้า", position: "ตำแหน่ง", heading: "ทิศทาง", startLabel: "เริ่ม", startSub: "ตัดหญ้าทั้งพื้นที่", stopLabel: "หยุด", stopSub: "หยุดงานทั้งหมด", homeLabel: "แท่นชาร์จ", homeSub: "กลับแท่นชาร์จ", zoneStart: "เริ่มตัดหญ้าในโซน", cloud: "การเชื่อมต่อคลาวด์", customDirection: "ทิศทางกำหนดเอง", rainDelay: "หน่วงเวลาหลังฝน", volume: "ระดับเสียง", rainDetection: "ตรวจจับฝน", showZones: "แสดงโซน", showBoundary: "แสดงขอบเขต", battery: "แบตเตอรี่", charging: "กำลังชาร์จ", connection: "การเชื่อมต่อ", cutHeight: "ความสูงการตัด", mowedArea: "พื้นที่ตัดแล้ว", mowingTime: "เวลาตัดหญ้า", totalArea: "พื้นที่ทั้งหมด", error: "ข้อผิดพลาด", calibration: "การปรับเทียบ", yamlCopy: "คัดลอก YAML", status_standby: "พร้อมใช้งาน", status_paused: "หยุดชั่วคราว", status_mowing: "กำลังตัดหญ้า", status_unknown: "ไม่ทราบ" },
  vi: { language: "Ngôn ngữ", automatic: "Tự động", waiting: "Đang chờ thực thể bản đồ", status: "Trạng thái", control: "Điều khiển", settings: "Cài đặt", diagnostics: "Chẩn đoán", map: "Bản đồ", close: "Đóng", zoomIn: "Phóng to", zoomOut: "Thu nhỏ", zones: "Khu vực", forbidden: "Vùng cấm", position: "Vị trí", heading: "Hướng", startLabel: "Bắt đầu", startSub: "Cắt toàn bộ khu vực", stopLabel: "Dừng", stopSub: "Dừng mọi tác vụ", homeLabel: "Trạm sạc", homeSub: "Trở về trạm sạc", zoneStart: "Bắt đầu cắt theo khu vực", cloud: "Kết nối đám mây", customDirection: "Hướng tùy chỉnh", rainDelay: "Chờ sau mưa", volume: "Âm lượng", rainDetection: "Phát hiện mưa", showZones: "Hiện khu vực", showBoundary: "Hiện ranh giới", battery: "Pin", charging: "Đang sạc", connection: "Kết nối", cutHeight: "Chiều cao cắt", mowedArea: "Diện tích đã cắt", mowingTime: "Thời gian cắt", totalArea: "Tổng diện tích", error: "Lỗi", calibration: "Hiệu chỉnh", yamlCopy: "Sao chép YAML", status_standby: "chờ", status_paused: "tạm dừng", status_mowing: "đang cắt", status_returning_to_dock: "đang về trạm", status_unknown: "không xác định" },
  ko: { language: "언어", automatic: "자동", waiting: "지도 엔티티를 기다리는 중", status: "상태", control: "제어", settings: "설정", diagnostics: "진단", map: "지도", close: "닫기", zoomIn: "확대", zoomOut: "축소", zones: "구역", forbidden: "금지 구역", position: "위치", heading: "방향", startLabel: "시작", startSub: "전체 구역 잔디 깎기", stopLabel: "정지", stopSub: "모든 작업 정지", homeLabel: "충전소", homeSub: "충전소로 복귀", zoneStart: "구역 잔디 깎기 시작", cloud: "클라우드 연결", customDirection: "사용자 지정 방향", rainDelay: "비 온 뒤 대기", volume: "음량", rainDetection: "비 감지", showZones: "구역 표시", showBoundary: "경계 표시", battery: "배터리", charging: "충전 중", connection: "연결", cutHeight: "절단 높이", mowedArea: "깎은 면적", mowingTime: "작업 시간", totalArea: "전체 면적", error: "오류", calibration: "보정", yamlCopy: "YAML 복사", status_standby: "대기", status_paused: "일시 정지", status_mowing: "잔디 깎는 중", status_returning_to_dock: "충전소로 복귀 중", status_unknown: "알 수 없음" },
  km: { language: "ភាសា", automatic: "ស្វ័យប្រវត្តិ", waiting: "កំពុងរង់ចាំធាតុផែនទី", status: "ស្ថានភាព", control: "ការគ្រប់គ្រង", settings: "ការកំណត់", diagnostics: "ការវិនិច្ឆ័យ", map: "ផែនទី", close: "បិទ", zoomIn: "ពង្រីក", zoomOut: "បង្រួម", zones: "តំបន់", forbidden: "តំបន់ហាមឃាត់", position: "ទីតាំង", heading: "ទិសដៅ", startLabel: "ចាប់ផ្តើម", startSub: "កាត់ស្មៅពេញតំបន់", stopLabel: "បញ្ឈប់", stopSub: "បញ្ឈប់កិច្ចការទាំងអស់", homeLabel: "ស្ថានីយសាក", homeSub: "ត្រឡប់ទៅស្ថានីយសាក", zoneStart: "ចាប់ផ្តើមកាត់ស្មៅតាមតំបន់", cloud: "ការតភ្ជាប់ក្លោដ", customDirection: "ទិសដៅផ្ទាល់ខ្លួន", rainDelay: "រង់ចាំក្រោយភ្លៀង", volume: "កម្រិតសំឡេង", rainDetection: "ការរកឃើញភ្លៀង", showZones: "បង្ហាញតំបន់", showBoundary: "បង្ហាញព្រំដែន", battery: "ថ្ម", charging: "កំពុងសាក", connection: "ការតភ្ជាប់", cutHeight: "កម្ពស់កាត់", mowedArea: "ផ្ទៃដែលបានកាត់", mowingTime: "ពេលវេលាកាត់", totalArea: "ផ្ទៃសរុប", error: "កំហុស", calibration: "ការក្រិត", yamlCopy: "ចម្លង YAML", status_standby: "រង់ចាំ", status_paused: "បានផ្អាក", status_mowing: "កំពុងកាត់ស្មៅ", status_unknown: "មិនស្គាល់" }
};
for (const [language, complement] of Object.entries(TRANSLATION_COMPLEMENTS)) {
  Object.assign(translations[language], complement);
}
var feedbackTranslations = {
  en: { cloudChecking: "☁ Cloud: checking…", cloudDisconnected: "☁ Cloud: disconnected", cloudRobotOnline: "☁ Cloud: active · Robot: online", cloudRobotNoResponse: "☁ Cloud: active · Robot: not responding", commandSentWaiting: "{command}: command sent, waiting for confirmation.", commandConfirmed: "{command}: confirmed by the robot.", commandNotConfirmed: "{command}: accepted by the cloud, but not confirmed by the robot.", commandFailed: "Operation failed: {command}" },
  hu: { cloudChecking: "☁ Felhő: ellenőrzés…", cloudDisconnected: "☁ Felhő: nincs kapcsolat", cloudRobotOnline: "☁ Felhő: aktív · Robot: online", cloudRobotNoResponse: "☁ Felhő: aktív · Robot: nem válaszol", commandSentWaiting: "{command}: parancs elküldve, visszaigazolásra vár.", commandConfirmed: "{command}: a robot visszaigazolta.", commandNotConfirmed: "{command}: a felhő elfogadta, de a robot nem igazolta vissza.", commandFailed: "A művelet sikertelen: {command}" },
  de: { cloudChecking: "☁ Cloud: wird geprüft…", cloudDisconnected: "☁ Cloud: keine Verbindung", cloudRobotOnline: "☁ Cloud: aktiv · Roboter: online", cloudRobotNoResponse: "☁ Cloud: aktiv · Roboter antwortet nicht", commandSentWaiting: "{command}: Befehl gesendet, Bestätigung wird erwartet.", commandConfirmed: "{command}: vom Roboter bestätigt.", commandNotConfirmed: "{command}: von der Cloud akzeptiert, aber nicht vom Roboter bestätigt.", commandFailed: "Vorgang fehlgeschlagen: {command}" },
  fr: { cloudChecking: "☁ Cloud : vérification…", cloudDisconnected: "☁ Cloud : déconnecté", cloudRobotOnline: "☁ Cloud : actif · Robot : en ligne", cloudRobotNoResponse: "☁ Cloud : actif · Robot sans réponse", commandSentWaiting: "{command} : commande envoyée, en attente de confirmation.", commandConfirmed: "{command} : confirmée par le robot.", commandNotConfirmed: "{command} : acceptée par le cloud, mais non confirmée par le robot.", commandFailed: "Échec de l’opération : {command}" },
  es: { cloudChecking: "☁ Nube: comprobando…", cloudDisconnected: "☁ Nube: sin conexión", cloudRobotOnline: "☁ Nube: activa · Robot: en línea", cloudRobotNoResponse: "☁ Nube: activa · Robot sin respuesta", commandSentWaiting: "{command}: comando enviado, esperando confirmación.", commandConfirmed: "{command}: confirmado por el robot.", commandNotConfirmed: "{command}: aceptado por la nube, pero no confirmado por el robot.", commandFailed: "Error en la operación: {command}" },
  it: { cloudChecking: "☁ Cloud: verifica…", cloudDisconnected: "☁ Cloud: disconnesso", cloudRobotOnline: "☁ Cloud: attivo · Robot: online", cloudRobotNoResponse: "☁ Cloud: attivo · Robot non risponde", commandSentWaiting: "{command}: comando inviato, in attesa di conferma.", commandConfirmed: "{command}: confermato dal robot.", commandNotConfirmed: "{command}: accettato dal cloud, ma non confermato dal robot.", commandFailed: "Operazione non riuscita: {command}" },
  pt: { cloudChecking: "☁ Nuvem: a verificar…", cloudDisconnected: "☁ Nuvem: sem ligação", cloudRobotOnline: "☁ Nuvem: ativa · Robô: online", cloudRobotNoResponse: "☁ Nuvem: ativa · Robô sem resposta", commandSentWaiting: "{command}: comando enviado, a aguardar confirmação.", commandConfirmed: "{command}: confirmado pelo robô.", commandNotConfirmed: "{command}: aceite pela nuvem, mas não confirmado pelo robô.", commandFailed: "Falha na operação: {command}" },
  nl: { cloudChecking: "☁ Cloud: controleren…", cloudDisconnected: "☁ Cloud: niet verbonden", cloudRobotOnline: "☁ Cloud: actief · Robot: online", cloudRobotNoResponse: "☁ Cloud: actief · Robot reageert niet", commandSentWaiting: "{command}: opdracht verzonden, wacht op bevestiging.", commandConfirmed: "{command}: bevestigd door de robot.", commandNotConfirmed: "{command}: geaccepteerd door de cloud, maar niet bevestigd door de robot.", commandFailed: "Bewerking mislukt: {command}" },
  pl: { cloudChecking: "☁ Chmura: sprawdzanie…", cloudDisconnected: "☁ Chmura: brak połączenia", cloudRobotOnline: "☁ Chmura: aktywna · Robot: online", cloudRobotNoResponse: "☁ Chmura: aktywna · Robot nie odpowiada", commandSentWaiting: "{command}: polecenie wysłane, oczekiwanie na potwierdzenie.", commandConfirmed: "{command}: potwierdzone przez robota.", commandNotConfirmed: "{command}: zaakceptowane przez chmurę, ale niepotwierdzone przez robota.", commandFailed: "Operacja nie powiodła się: {command}" },
  cs: { cloudChecking: "☁ Cloud: kontrola…", cloudDisconnected: "☁ Cloud: nepřipojeno", cloudRobotOnline: "☁ Cloud: aktivní · Robot: online", cloudRobotNoResponse: "☁ Cloud: aktivní · Robot neodpovídá", commandSentWaiting: "{command}: příkaz odeslán, čeká se na potvrzení.", commandConfirmed: "{command}: potvrzeno robotem.", commandNotConfirmed: "{command}: přijato cloudem, ale nepotvrzeno robotem.", commandFailed: "Operace se nezdařila: {command}" },
  sk: { cloudChecking: "☁ Cloud: kontrola…", cloudDisconnected: "☁ Cloud: nepripojené", cloudRobotOnline: "☁ Cloud: aktívny · Robot: online", cloudRobotNoResponse: "☁ Cloud: aktívny · Robot neodpovedá", commandSentWaiting: "{command}: príkaz odoslaný, čaká sa na potvrdenie.", commandConfirmed: "{command}: potvrdené robotom.", commandNotConfirmed: "{command}: prijaté cloudom, ale nepotvrdené robotom.", commandFailed: "Operácia zlyhala: {command}" },
  ro: { cloudChecking: "☁ Cloud: se verifică…", cloudDisconnected: "☁ Cloud: deconectat", cloudRobotOnline: "☁ Cloud: activ · Robot: online", cloudRobotNoResponse: "☁ Cloud: activ · Robotul nu răspunde", commandSentWaiting: "{command}: comandă trimisă, se așteaptă confirmarea.", commandConfirmed: "{command}: confirmată de robot.", commandNotConfirmed: "{command}: acceptată de cloud, dar neconfirmată de robot.", commandFailed: "Operațiunea a eșuat: {command}" },
  da: { cloudChecking: "☁ Cloud: kontrollerer…", cloudDisconnected: "☁ Cloud: ikke forbundet", cloudRobotOnline: "☁ Cloud: aktiv · Robot: online", cloudRobotNoResponse: "☁ Cloud: aktiv · Robot svarer ikke", commandSentWaiting: "{command}: kommando sendt, afventer bekræftelse.", commandConfirmed: "{command}: bekræftet af robotten.", commandNotConfirmed: "{command}: accepteret af cloud, men ikke bekræftet af robotten.", commandFailed: "Handlingen mislykkedes: {command}" },
  sv: { cloudChecking: "☁ Moln: kontrollerar…", cloudDisconnected: "☁ Moln: frånkopplat", cloudRobotOnline: "☁ Moln: aktivt · Robot: online", cloudRobotNoResponse: "☁ Moln: aktivt · Robot svarar inte", commandSentWaiting: "{command}: kommando skickat, väntar på bekräftelse.", commandConfirmed: "{command}: bekräftat av roboten.", commandNotConfirmed: "{command}: accepterat av molnet, men inte bekräftat av roboten.", commandFailed: "Åtgärden misslyckades: {command}" },
  no: { cloudChecking: "☁ Sky: kontrollerer…", cloudDisconnected: "☁ Sky: ikke tilkoblet", cloudRobotOnline: "☁ Sky: aktiv · Robot: online", cloudRobotNoResponse: "☁ Sky: aktiv · Robot svarer ikke", commandSentWaiting: "{command}: kommando sendt, venter på bekreftelse.", commandConfirmed: "{command}: bekreftet av roboten.", commandNotConfirmed: "{command}: godtatt av skyen, men ikke bekreftet av roboten.", commandFailed: "Handlingen mislyktes: {command}" },
  fi: { cloudChecking: "☁ Pilvi: tarkistetaan…", cloudDisconnected: "☁ Pilvi: ei yhteyttä", cloudRobotOnline: "☁ Pilvi: aktiivinen · Robotti: online", cloudRobotNoResponse: "☁ Pilvi: aktiivinen · Robotti ei vastaa", commandSentWaiting: "{command}: komento lähetetty, odotetaan vahvistusta.", commandConfirmed: "{command}: robotin vahvistama.", commandNotConfirmed: "{command}: pilvi hyväksyi, mutta robotti ei vahvistanut.", commandFailed: "Toiminto epäonnistui: {command}" },
  "zh-CN": { cloudChecking: "☁ 云端：正在检查…", cloudDisconnected: "☁ 云端：未连接", cloudRobotOnline: "☁ 云端：已连接 · 机器人：在线", cloudRobotNoResponse: "☁ 云端：已连接 · 机器人无响应", commandSentWaiting: "{command}：命令已发送，等待确认。", commandConfirmed: "{command}：机器人已确认。", commandNotConfirmed: "{command}：云端已接受，但机器人未确认。", commandFailed: "操作失败：{command}" },
  "zh-TW": { cloudChecking: "☁ 雲端：正在檢查…", cloudDisconnected: "☁ 雲端：未連線", cloudRobotOnline: "☁ 雲端：已連線 · 機器人：在線", cloudRobotNoResponse: "☁ 雲端：已連線 · 機器人無回應", commandSentWaiting: "{command}：指令已傳送，等待確認。", commandConfirmed: "{command}：機器人已確認。", commandNotConfirmed: "{command}：雲端已接受，但機器人未確認。", commandFailed: "操作失敗：{command}" },
  tr: { cloudChecking: "☁ Bulut: kontrol ediliyor…", cloudDisconnected: "☁ Bulut: bağlantı yok", cloudRobotOnline: "☁ Bulut: etkin · Robot: çevrimiçi", cloudRobotNoResponse: "☁ Bulut: etkin · Robot yanıt vermiyor", commandSentWaiting: "{command}: komut gönderildi, onay bekleniyor.", commandConfirmed: "{command}: robot tarafından onaylandı.", commandNotConfirmed: "{command}: bulut tarafından kabul edildi, ancak robot onaylamadı.", commandFailed: "İşlem başarısız: {command}" },
  th: { cloudChecking: "☁ คลาวด์: กำลังตรวจสอบ…", cloudDisconnected: "☁ คลาวด์: ไม่ได้เชื่อมต่อ", cloudRobotOnline: "☁ คลาวด์: ทำงาน · หุ่นยนต์: ออนไลน์", cloudRobotNoResponse: "☁ คลาวด์: ทำงาน · หุ่นยนต์ไม่ตอบสนอง", commandSentWaiting: "{command}: ส่งคำสั่งแล้ว กำลังรอการยืนยัน", commandConfirmed: "{command}: หุ่นยนต์ยืนยันแล้ว", commandNotConfirmed: "{command}: คลาวด์ยอมรับแล้ว แต่หุ่นยนต์ไม่ได้ยืนยัน", commandFailed: "การทำงานล้มเหลว: {command}" },
  vi: { cloudChecking: "☁ Đám mây: đang kiểm tra…", cloudDisconnected: "☁ Đám mây: mất kết nối", cloudRobotOnline: "☁ Đám mây: hoạt động · Robot: trực tuyến", cloudRobotNoResponse: "☁ Đám mây: hoạt động · Robot không phản hồi", commandSentWaiting: "{command}: đã gửi lệnh, đang chờ xác nhận.", commandConfirmed: "{command}: robot đã xác nhận.", commandNotConfirmed: "{command}: đám mây đã chấp nhận nhưng robot chưa xác nhận.", commandFailed: "Thao tác thất bại: {command}" },
  ko: { cloudChecking: "☁ 클라우드: 확인 중…", cloudDisconnected: "☁ 클라우드: 연결 끊김", cloudRobotOnline: "☁ 클라우드: 활성 · 로봇: 온라인", cloudRobotNoResponse: "☁ 클라우드: 활성 · 로봇 응답 없음", commandSentWaiting: "{command}: 명령을 전송했습니다. 확인 대기 중입니다.", commandConfirmed: "{command}: 로봇이 확인했습니다.", commandNotConfirmed: "{command}: 클라우드는 수락했지만 로봇이 확인하지 않았습니다.", commandFailed: "작업 실패: {command}" },
  km: { cloudChecking: "☁ ក្លោដ៖ កំពុងពិនិត្យ…", cloudDisconnected: "☁ ក្លោដ៖ មិនបានភ្ជាប់", cloudRobotOnline: "☁ ក្លោដ៖ សកម្ម · រ៉ូបូត៖ អនឡាញ", cloudRobotNoResponse: "☁ ក្លោដ៖ សកម្ម · រ៉ូបូតមិនឆ្លើយតប", commandSentWaiting: "{command}៖ បានផ្ញើពាក្យបញ្ជា កំពុងរង់ចាំការបញ្ជាក់។", commandConfirmed: "{command}៖ រ៉ូបូតបានបញ្ជាក់។", commandNotConfirmed: "{command}៖ ក្លោដបានទទួល ប៉ុន្តែរ៉ូបូតមិនបានបញ្ជាក់។", commandFailed: "ប្រតិបត្តិការបរាជ័យ៖ {command}" }
};
var commandStageTranslations = {
  en: { commandCloudAccepted: "Cloud accepted: {command}", commandCloudRejected: "Cloud rejected: {command}" },
  hu: { commandCloudAccepted: "A felhő elfogadta: {command}", commandCloudRejected: "A felhő elutasította: {command}" },
  de: { commandCloudAccepted: "Von der Cloud akzeptiert: {command}", commandCloudRejected: "Von der Cloud abgelehnt: {command}" },
  fr: { commandCloudAccepted: "Acceptée par le cloud : {command}", commandCloudRejected: "Rejetée par le cloud : {command}" },
  es: { commandCloudAccepted: "Aceptado por la nube: {command}", commandCloudRejected: "Rechazado por la nube: {command}" },
  it: { commandCloudAccepted: "Accettato dal cloud: {command}", commandCloudRejected: "Rifiutato dal cloud: {command}" },
  pt: { commandCloudAccepted: "Aceite pela nuvem: {command}", commandCloudRejected: "Rejeitado pela nuvem: {command}" },
  nl: { commandCloudAccepted: "Geaccepteerd door de cloud: {command}", commandCloudRejected: "Geweigerd door de cloud: {command}" },
  pl: { commandCloudAccepted: "Zaakceptowane przez chmurę: {command}", commandCloudRejected: "Odrzucone przez chmurę: {command}" },
  cs: { commandCloudAccepted: "Přijato cloudem: {command}", commandCloudRejected: "Odmítnuto cloudem: {command}" },
  sk: { commandCloudAccepted: "Prijaté cloudom: {command}", commandCloudRejected: "Odmietnuté cloudom: {command}" },
  ro: { commandCloudAccepted: "Acceptată de cloud: {command}", commandCloudRejected: "Respinsă de cloud: {command}" },
  da: { commandCloudAccepted: "Accepteret af cloud: {command}", commandCloudRejected: "Afvist af cloud: {command}" },
  sv: { commandCloudAccepted: "Accepterat av molnet: {command}", commandCloudRejected: "Avvisat av molnet: {command}" },
  no: { commandCloudAccepted: "Godtatt av skyen: {command}", commandCloudRejected: "Avvist av skyen: {command}" },
  fi: { commandCloudAccepted: "Pilvi hyväksyi: {command}", commandCloudRejected: "Pilvi hylkäsi: {command}" },
  "zh-CN": { commandCloudAccepted: "云端已接受：{command}", commandCloudRejected: "云端已拒绝：{command}" },
  "zh-TW": { commandCloudAccepted: "雲端已接受：{command}", commandCloudRejected: "雲端已拒絕：{command}" },
  tr: { commandCloudAccepted: "Bulut kabul etti: {command}", commandCloudRejected: "Bulut reddetti: {command}" },
  th: { commandCloudAccepted: "คลาวด์ยอมรับแล้ว: {command}", commandCloudRejected: "คลาวด์ปฏิเสธ: {command}" },
  vi: { commandCloudAccepted: "Đám mây đã chấp nhận: {command}", commandCloudRejected: "Đám mây đã từ chối: {command}" },
  ko: { commandCloudAccepted: "클라우드가 수락했습니다: {command}", commandCloudRejected: "클라우드가 거부했습니다: {command}" },
  km: { commandCloudAccepted: "ក្លោដបានទទួល៖ {command}", commandCloudRejected: "ក្លោដបានបដិសេធ៖ {command}" }
};
var commandTranslations = {
  en: { commandOuterEdge: "Outer edge mowing", commandDockEdge: "Dock surroundings mowing" },
  hu: { commandOuterEdge: "Külső szegélynyírás", commandDockEdge: "Töltő körüli nyírás" },
  de: { commandOuterEdge: "Außenkantenmähen", commandDockEdge: "Mähen um die Ladestation" },
  fr: { commandOuterEdge: "Tonte de la bordure extérieure", commandDockEdge: "Tonte autour de la station" },
  es: { commandOuterEdge: "Corte del borde exterior", commandDockEdge: "Corte alrededor de la base" },
  it: { commandOuterEdge: "Taglio del bordo esterno", commandDockEdge: "Taglio intorno alla base" },
  pt: { commandOuterEdge: "Corte da borda exterior", commandDockEdge: "Corte em redor da base" },
  nl: { commandOuterEdge: "Buitenrand maaien", commandDockEdge: "Rond het laadstation maaien" },
  pl: { commandOuterEdge: "Koszenie zewnętrznej krawędzi", commandDockEdge: "Koszenie wokół stacji" },
  cs: { commandOuterEdge: "Sečení vnějšího okraje", commandDockEdge: "Sečení kolem stanice" },
  sk: { commandOuterEdge: "Kosenie vonkajšieho okraja", commandDockEdge: "Kosenie okolo stanice" },
  ro: { commandOuterEdge: "Tunderea marginii exterioare", commandDockEdge: "Tunderea în jurul stației" },
  da: { commandOuterEdge: "Klipning af yderkant", commandDockEdge: "Klipning omkring ladestationen" },
  sv: { commandOuterEdge: "Klippning av ytterkant", commandDockEdge: "Klippning runt laddstationen" },
  no: { commandOuterEdge: "Klipping av ytterkant", commandDockEdge: "Klipping rundt ladestasjonen" },
  fi: { commandOuterEdge: "Ulkoreunan leikkuu", commandDockEdge: "Leikkuu latausaseman ympärillä" },
  "zh-CN": { commandOuterEdge: "外边界修剪", commandDockEdge: "充电座周边修剪" },
  "zh-TW": { commandOuterEdge: "外邊界修剪", commandDockEdge: "充電座周邊修剪" },
  tr: { commandOuterEdge: "Dış kenar biçme", commandDockEdge: "Şarj istasyonu çevresini biçme" },
  th: { commandOuterEdge: "ตัดขอบด้านนอก", commandDockEdge: "ตัดรอบแท่นชาร์จ" },
  vi: { commandOuterEdge: "Cắt viền ngoài", commandDockEdge: "Cắt quanh trạm sạc" },
  ko: { commandOuterEdge: "외곽 가장자리 잔디 깎기", commandDockEdge: "충전소 주변 잔디 깎기" },
  km: { commandOuterEdge: "កាត់គែមខាងក្រៅ", commandDockEdge: "កាត់ជុំវិញស្ថានីយសាក" }
};
var menuTranslations = {
  en: { menu: "Menu" },
  hu: { menu: "Menü" },
  de: { menu: "Menü" },
  fr: { menu: "Menu" },
  es: { menu: "Menú" },
  it: { menu: "Menu" },
  pt: { menu: "Menu" },
  nl: { menu: "Menu" },
  pl: { menu: "Menu" },
  cs: { menu: "Nabídka" },
  sk: { menu: "Ponuka" },
  ro: { menu: "Meniu" },
  da: { menu: "Menu" },
  sv: { menu: "Meny" },
  no: { menu: "Meny" },
  fi: { menu: "Valikko" },
  "zh-CN": { menu: "菜单" },
  "zh-TW": { menu: "選單" },
  tr: { menu: "Menü" },
  th: { menu: "เมนู" },
  vi: { menu: "Trình đơn" },
  ko: { menu: "메뉴" },
  km: { menu: "ម៉ឺនុយ" }
};
var gardenUiTranslations = {
  en: {
    irrigationSystem: "Irrigation",
    robotLog: "Robot log",
    irrigationLog: "Irrigation log",
    openLogHint: "Expand to load the log.",
    irrigationElements: "Irrigation elements",
    markElements: "Mark elements",
    markingDone: "Finish marking",
    sprinklerHead: "Sprinkler head",
    dripLine: "Drip line",
    selectSprinkler: "Select a sprinkler head on the map",
    save: "Save",
    delete: "Delete",
    sprayAngle: "Spray angle",
    sweepSpeed: "Sweep speed",
    sprayDistance: "Spray distance",
    selectZoneAndType: "Select a zone and an element type.",
    logLoading: "Loading log…",
    logLoadFailed: "Could not load the log: {error}",
    noIrrigationLog: "No irrigation events on this day.",
    logDate: "Log date",
    refresh: "Refresh",
    robotStatusMissing: "Robot status entity not found.",
    robotLogLoading: "Loading robot log…",
    robotLogLoadFailed: "Could not load the robot log: {error}",
    noRobotLog: "No robot status changes on this day.",
    robotLogDate: "Robot log date",
    errorPrefix: "Error: {error}",
    irrigationResourceMissing: "The irrigation-map-card resource is not loaded.",
    statusMowing: "Mowing in progress",
    statusPaused: "Mowing paused",
    statusReturning: "Returning to dock",
    statusCharging: "Charging",
    statusDocked: "Robot is docked",
    statusIdle: "Robot is idle",
    statusStandby: "Robot is on standby",
    statusStopped: "Robot stopped",
    statusError: "Robot stopped with an error",
    statusOffline: "Robot is offline",
    enableMarkingHint: "Enable marking, then select a zone and element type.",
    dripEndHint: "Now click the end point of the drip line.",
    dripStartHint: "Click the start point, then the end point. Click an existing line to delete it.",
    sprinklerEditHint: "Click an existing sprinkler head to edit it, or an empty spot to add one.",
    headLabel: "{id}. head",
    zoneLabel: "{id}. zone",
    sprinklerDeleted: "Sprinkler head deleted.",
    sprinklerSaved: "Sprinkler settings saved.",
    settingsSavedOnDevice: "Settings saved on this device.",
    dripDeleted: "Drip line deleted.",
    dripTooShort: "The drip line must be longer; mark the end point farther away.",
    dripAdded: "Drip line added."
  },
  hu: {
    irrigationSystem: "Locsolás",
    robotLog: "Robotnapló",
    irrigationLog: "Öntözési napló",
    openLogHint: "Nyisd le a napló betöltéséhez.",
    irrigationElements: "Öntözőelemek kijelölése",
    markElements: "Elemek jelölése",
    markingDone: "Jelölés kész",
    sprinklerHead: "Locsolófej",
    dripLine: "Csepegtető",
    selectSprinkler: "Válassz egy locsolófejet a térképen",
    save: "Mentés",
    delete: "Törlés",
    sprayAngle: "Locsolási szög",
    sweepSpeed: "Pásztázási sebesség",
    sprayDistance: "Locsolási távolság",
    selectZoneAndType: "Válassz zónát és elemtípust.",
    logLoading: "Napló betöltése…",
    logLoadFailed: "A napló nem tölthető be: {error}",
    noIrrigationLog: "Ezen a napon nincs öntözési bejegyzés.",
    logDate: "Napló dátuma",
    refresh: "Frissítés",
    robotStatusMissing: "Nem található robotállapot-entitás.",
    robotLogLoading: "Robotnapló betöltése…",
    robotLogLoadFailed: "A robotnapló nem tölthető be: {error}",
    noRobotLog: "Ezen a napon nincs robotállapot-változás.",
    robotLogDate: "Robotnapló dátuma",
    errorPrefix: "Hiba: {error}",
    irrigationResourceMissing: "Az irrigation-map-card erőforrás nincs betöltve.",
    statusMowing: "Fűnyírás folyamatban",
    statusPaused: "Fűnyírás szüneteltetve",
    statusReturning: "Visszatérés a töltőhöz",
    statusCharging: "Töltés folyamatban",
    statusDocked: "A robot a töltőn van",
    statusIdle: "A robot várakozik",
    statusStandby: "A robot készenlétben van",
    statusStopped: "A robot leállt",
    statusError: "A robot hibával leállt",
    statusOffline: "A robot kapcsolata megszakadt",
    enableMarkingHint: "Kapcsold be a jelölést, majd válassz zónát és elemtípust.",
    dripEndHint: "Most kattints a csepegtető végpontjára.",
    dripStartHint: "Kattints a csepegtető kezdőpontjára, majd a végpontjára. Meglévő vonalra kattintva törölheted.",
    sprinklerEditHint: "Kattints egy meglévő locsolófejre a beállításához, vagy üres helyre új fej hozzáadásához.",
    headLabel: "{id}. fej",
    zoneLabel: "{id}. zóna",
    sprinklerDeleted: "Locsolófej törölve.",
    sprinklerSaved: "A locsolófejek beállításai elmentve.",
    settingsSavedOnDevice: "A beállítás ezen az eszközön elmentve.",
    dripDeleted: "Csepegtető törölve.",
    dripTooShort: "A csepegtető legyen hosszabb; jelöld távolabb a végpontot.",
    dripAdded: "Csepegtető hozzáadva."
  },
  de: { robotLog: "Roboterprotokoll", irrigationLog: "Bewässerungsprotokoll", openLogHint: "Zum Laden des Protokolls aufklappen.", refresh: "Aktualisieren" },
  fr: { robotLog: "Journal du robot", irrigationLog: "Journal d’irrigation", openLogHint: "Développez pour charger le journal.", refresh: "Actualiser" },
  es: { robotLog: "Registro del robot", irrigationLog: "Registro de riego", openLogHint: "Expanda para cargar el registro.", refresh: "Actualizar" },
  it: { robotLog: "Registro del robot", irrigationLog: "Registro irrigazione", openLogHint: "Espandi per caricare il registro.", refresh: "Aggiorna" },
  pt: { robotLog: "Registo do robô", irrigationLog: "Registo de irrigação", openLogHint: "Expanda para carregar o registo.", refresh: "Atualizar" },
  nl: { robotLog: "Robotlogboek", irrigationLog: "Beregeningslogboek", openLogHint: "Uitklappen om het logboek te laden.", refresh: "Vernieuwen" },
  pl: { robotLog: "Dziennik robota", irrigationLog: "Dziennik nawadniania", openLogHint: "Rozwiń, aby wczytać dziennik.", refresh: "Odśwież" },
  cs: { robotLog: "Protokol robota", irrigationLog: "Protokol zavlažování", openLogHint: "Rozbalte pro načtení protokolu.", refresh: "Obnovit" },
  sk: { robotLog: "Denník robota", irrigationLog: "Denník zavlažovania", openLogHint: "Rozbaľte na načítanie denníka.", refresh: "Obnoviť" },
  ro: { robotLog: "Jurnal robot", irrigationLog: "Jurnal irigare", openLogHint: "Extindeți pentru a încărca jurnalul.", refresh: "Reîmprospătare" },
  da: { robotLog: "Robotlog", irrigationLog: "Vandingslog", openLogHint: "Udvid for at indlæse loggen.", refresh: "Opdater" },
  sv: { robotLog: "Robotlogg", irrigationLog: "Bevattningslogg", openLogHint: "Fäll ut för att läsa in loggen.", refresh: "Uppdatera" },
  no: { robotLog: "Robotlogg", irrigationLog: "Vanningslogg", openLogHint: "Utvid for å laste loggen.", refresh: "Oppdater" },
  fi: { robotLog: "Robottiloki", irrigationLog: "Kasteluloki", openLogHint: "Laajenna lokin lataamiseksi.", refresh: "Päivitä" },
  "zh-CN": { robotLog: "机器人日志", irrigationLog: "灌溉日志", openLogHint: "展开以加载日志。", refresh: "刷新" },
  "zh-TW": { robotLog: "機器人日誌", irrigationLog: "灌溉日誌", openLogHint: "展開以載入日誌。", refresh: "重新整理" },
  tr: { robotLog: "Robot günlüğü", irrigationLog: "Sulama günlüğü", openLogHint: "Günlüğü yüklemek için genişletin.", refresh: "Yenile" },
  th: { robotLog: "บันทึกหุ่นยนต์", irrigationLog: "บันทึกการให้น้ำ", openLogHint: "ขยายเพื่อโหลดบันทึก", refresh: "รีเฟรช" },
  vi: { robotLog: "Nhật ký robot", irrigationLog: "Nhật ký tưới", openLogHint: "Mở rộng để tải nhật ký.", refresh: "Làm mới" },
  ko: { robotLog: "로봇 로그", irrigationLog: "관개 로그", openLogHint: "로그를 불러오려면 펼치세요.", refresh: "새로 고침" },
  km: { robotLog: "កំណត់ហេតុរ៉ូបូត", irrigationLog: "កំណត់ហេតុស្រោចស្រព", openLogHint: "ពង្រីកដើម្បីផ្ទុកកំណត់ហេតុ។", refresh: "ផ្ទុកឡើងវិញ" }
};
function normalizeLanguage(value) {
  const raw = String(value || "en").replace("_", "-");
  const lower = raw.toLowerCase();
  if (lower.startsWith("zh")) return /tw|hk|hant/.test(lower) ? "zh-TW" : "zh-CN";
  const short = lower.split("-")[0];
  if (short === "nb" || short === "nn") return "no";
  return translations[short] ? short : "en";
}
function resolveLanguage(selection, hass) {
  if (selection && selection !== "auto") return normalizeLanguage(selection);
  return normalizeLanguage(hass?.locale?.language || hass?.language || navigator.language);
}
function translate(language, key) {
  return translations[language]?.[key] ?? feedbackTranslations[language]?.[key] ?? commandStageTranslations[language]?.[key] ?? commandTranslations[language]?.[key] ?? menuTranslations[language]?.[key] ?? gardenUiTranslations[language]?.[key] ?? en[key] ?? feedbackTranslations.en[key] ?? commandStageTranslations.en[key] ?? commandTranslations.en[key] ?? menuTranslations.en[key] ?? gardenUiTranslations.en[key] ?? key;
}

// garden-calibration.js?v=132
var DEFAULT_CALIBRATION = Object.freeze({
  offsetX: 0,
  offsetY: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0
});
function readCalibration(config = {}) {
  return {
    ...DEFAULT_CALIBRATION,
    ...config.calibration || {}
  };
}
function readRobotCalibration(config = {}) {
  return {
    ...DEFAULT_CALIBRATION,
    ...config.robotCalibration || {}
  };
}
function readMowingPathCalibration(config = {}) {
  const configured = config.mowingPathCalibration || config.mowing_path_calibration;
  if (configured && typeof configured === "object") {
    return {
      ...DEFAULT_CALIBRATION,
      ...configured
    };
  }
  const legacy = config.robotCalibration || {};
  return {
    ...DEFAULT_CALIBRATION,
    offsetX: Number(legacy.offsetX) || 0,
    offsetY: Number(legacy.offsetY) || 0
  };
}
function readDecodedBoundaryCalibration(config = {}) {
  return {
    ...DEFAULT_CALIBRATION,
    ...config.decodedBoundaryCalibration || config.decoded_boundary_calibration || {}
  };
}
function resetCalibration() {
  return { ...DEFAULT_CALIBRATION };
}
function adjustCalibration(calibration, action, amount = 1) {
  const next = { ...DEFAULT_CALIBRATION, ...calibration || {} };
  const move = 0.01 * amount;
  const scale = 0.02 * amount;
  const rotate = Math.PI / 180 * amount;
  const rotateLarge = Math.PI / 12 * amount;
  switch (action) {
    case "left":
      next.offsetX -= move;
      break;
    case "right":
      next.offsetX += move;
      break;
    case "up":
      next.offsetY -= move;
      break;
    case "down":
      next.offsetY += move;
      break;
    case "wider":
      next.scaleX += scale;
      break;
    case "narrower":
      next.scaleX = Math.max(0.1, next.scaleX - scale);
      break;
    case "taller":
      next.scaleY += scale;
      break;
    case "shorter":
      next.scaleY = Math.max(0.1, next.scaleY - scale);
      break;
    case "rotate-left":
      next.rotation -= rotate;
      break;
    case "rotate-right":
      next.rotation += rotate;
      break;
    case "rotate-left-large":
      next.rotation -= rotateLarge;
      break;
    case "rotate-right-large":
      next.rotation += rotateLarge;
      break;
    case "rotate-around":
      next.rotation += Math.PI;
      break;
    default:
      break;
  }
  return next;
}
function calibrationToYaml(calibration) {
  const next = { ...DEFAULT_CALIBRATION, ...calibration || {} };
  return [
    "calibration:",
    `  offsetX: ${formatNumber(next.offsetX)}`,
    `  offsetY: ${formatNumber(next.offsetY)}`,
    `  scaleX: ${formatNumber(next.scaleX)}`,
    `  scaleY: ${formatNumber(next.scaleY)}`,
    `  rotation: ${formatNumber(next.rotation)}`
  ].join("\n");
}
function robotCalibrationToYaml(robotCalibration) {
  const next = { ...DEFAULT_CALIBRATION, ...robotCalibration || {} };
  return [
    "robotCalibration:",
    `  offsetX: ${formatNumber(next.offsetX)}`,
    `  offsetY: ${formatNumber(next.offsetY)}`,
    `  scaleX: ${formatNumber(next.scaleX)}`,
    `  scaleY: ${formatNumber(next.scaleY)}`,
    `  rotation: ${formatNumber(next.rotation)}`
  ].join("\n");
}
function mowingPathCalibrationToYaml(mowingPathCalibration) {
  const next = { ...DEFAULT_CALIBRATION, ...mowingPathCalibration || {} };
  return [
    "mowingPathCalibration:",
    `  offsetX: ${formatNumber(next.offsetX)}`,
    `  offsetY: ${formatNumber(next.offsetY)}`,
    `  scaleX: ${formatNumber(next.scaleX)}`,
    `  scaleY: ${formatNumber(next.scaleY)}`,
    `  rotation: ${formatNumber(next.rotation)}`
  ].join("\n");
}
function decodedBoundaryCalibrationToYaml(decodedBoundaryCalibration) {
  const next = { ...DEFAULT_CALIBRATION, ...decodedBoundaryCalibration || {} };
  return [
    "decodedBoundaryCalibration:",
    `  offsetX: ${formatNumber(next.offsetX)}`,
    `  offsetY: ${formatNumber(next.offsetY)}`,
    `  scaleX: ${formatNumber(next.scaleX)}`,
    `  scaleY: ${formatNumber(next.scaleY)}`,
    `  rotation: ${formatNumber(next.rotation)}`
  ].join("\n");
}
function cardToYaml(config = {}, calibration, robotCalibration, decodedBoundaryCalibration, mowingPathCalibration) {
  const lines = [
    "type: custom:garden-map-card",
    `entity: ${config.entity || ""}`
  ];
  if (config.name) {
    lines.push(`name: ${quoteYaml(config.name)}`);
  }
  if (config.language) {
    lines.push(`language: ${quoteYaml(config.language)}`);
  }
  if (config.image) {
    lines.push(`image: ${quoteYaml(config.image)}`);
  }
  if (config.map_only === true || config.mapOnly === true) {
    lines.push("map_only: true");
  }
  if (config.transparent_background === true || config.transparentBackground === true) {
    lines.push("transparent_background: true");
  }
  if (config.robot_image || config.robotImage) {
    lines.push(`robot_image: ${quoteYaml(config.robot_image || config.robotImage)}`);
  }
  if (Number.isFinite(Number(config.robot_size || config.robotSize))) {
    lines.push(`robot_size: ${formatNumber(config.robot_size || config.robotSize)}`);
  }
  if (Number.isFinite(Number(config.robot_image_rotation ?? config.robotImageRotation))) {
    lines.push(`robot_image_rotation: ${formatNumber(config.robot_image_rotation ?? config.robotImageRotation)}`);
  }
  if (config.robot_heading_source || config.robotHeadingSource) {
    lines.push(`robot_heading_source: ${quoteYaml(config.robot_heading_source || config.robotHeadingSource)}`);
  }
  if (Number.isFinite(Number(config.robot_heading_offset ?? config.robotHeadingOffset))) {
    lines.push(`robot_heading_offset: ${formatNumber(config.robot_heading_offset ?? config.robotHeadingOffset)}`);
  }
  if (Number.isFinite(Number(config.robot_mowing_heading_offset ?? config.robotMowingHeadingOffset))) {
    lines.push(
      `robot_mowing_heading_offset: ${formatNumber(
        config.robot_mowing_heading_offset ?? config.robotMowingHeadingOffset
      )}`
    );
  }
  if (config.show_mowed_path === false) {
    lines.push("show_mowed_path: false");
  }
  if (config.show_decoded_boundary === false || config.showDecodedBoundary === false) {
    lines.push("show_decoded_boundary: false");
  }
  if (config.show_zones === false || config.showZones === false) {
    lines.push("show_zones: false");
  }
  if (config.show_no_go_zones === false || config.showNoGoZones === false) {
    lines.push("show_no_go_zones: false");
  }
  if (config.show_no_go_labels === false || config.showNoGoLabels === false) {
    lines.push("show_no_go_labels: false");
  }
  if (config.show_legacy_boundary === true || config.showLegacyBoundary === true) {
    lines.push("show_legacy_boundary: true");
  }
  if (config.mowed_path_color || config.mowedPathColor) {
    lines.push(`mowed_path_color: ${quoteYaml(config.mowed_path_color || config.mowedPathColor)}`);
  }
  if (config.mowed_path_source || config.mowedPathSource) {
    lines.push(`mowed_path_source: ${quoteYaml(config.mowed_path_source || config.mowedPathSource)}`);
  }
  if (Number.isFinite(Number(config.mowed_path_width ?? config.mowedPathWidth))) {
    lines.push(`mowed_path_width: ${formatNumber(config.mowed_path_width ?? config.mowedPathWidth)}`);
  }
  if (config.fit) {
    lines.push(`fit: ${quoteYaml(config.fit)}`);
  }
  if (Number.isFinite(Number(config.rotation)) && Number(config.rotation) !== 0) {
    lines.push(`rotation: ${formatNumber(config.rotation)}`);
  }
  if (Number.isFinite(Number(config.height))) {
    lines.push(`height: ${formatNumber(config.height)}`);
  }
  if (Number.isFinite(Number(config.refresh_interval ?? config.refreshInterval))) {
    lines.push(`refresh_interval: ${formatNumber(config.refresh_interval ?? config.refreshInterval)}`);
  }
  if (config.charger && Number.isFinite(Number(config.charger.x)) && Number.isFinite(Number(config.charger.y))) {
    lines.push("charger:");
    lines.push(`  x: ${formatNumber(config.charger.x)}`);
    lines.push(`  y: ${formatNumber(config.charger.y)}`);
  }
  if (config.entities && typeof config.entities === "object") {
    lines.push("entities:");
    for (const key of ["battery", "status", "charging"]) {
      if (config.entities[key]) {
        lines.push(`  ${key}: ${config.entities[key]}`);
      }
    }
  }
  if (config.controls && typeof config.controls === "object") {
    lines.push("controls:");
    for (const key of ["start", "stop", "dock"]) {
      if (config.controls[key]) {
        lines.push(`  ${key}: ${config.controls[key]}`);
      }
    }
  }
  if (config.button_actions && typeof config.button_actions === "object") {
    lines.push("button_actions:");
    for (const [command, action] of Object.entries(config.button_actions)) {
      if (typeof action === "string") {
        lines.push(`  ${command}: ${quoteYaml(action)}`);
        continue;
      }
      if (!action || typeof action !== "object" || !action.service) continue;
      lines.push(`  ${command}:`);
      lines.push(`    service: ${quoteYaml(action.service)}`);
      appendYamlObject(lines, "    target", action.target, 6);
      appendYamlObject(lines, "    data", action.data || action.service_data, 6);
    }
  }
  if (config.irrigation && typeof config.irrigation === "object") {
    lines.push("irrigation:");
    appendYamlValue(lines, config.irrigation, 2);
  }
  lines.push(calibrationToYaml(calibration));
  lines.push(robotCalibrationToYaml(robotCalibration));
  lines.push(mowingPathCalibrationToYaml(mowingPathCalibration));
  lines.push(decodedBoundaryCalibrationToYaml(decodedBoundaryCalibration));
  return lines.join("\n");
}
function formatNumber(value) {
  return Number(value).toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}
function appendYamlObject(lines, label, value, indent) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const entries = Object.entries(value);
  if (!entries.length) return;
  lines.push(`${label}:`);
  const prefix = " ".repeat(indent);
  for (const [key, item] of entries) {
    if (["string", "number", "boolean"].includes(typeof item)) {
      const rendered = typeof item === "string" ? quoteYaml(item) : String(item);
      lines.push(`${prefix}${key}: ${rendered}`);
    }
  }
}
function appendYamlValue(lines, value, indent) {
  const prefix = " ".repeat(indent);
  if (Array.isArray(value)) {
    for (const item of value) {
      if (item && typeof item === "object") {
        lines.push(`${prefix}-`);
        appendYamlValue(lines, item, indent + 2);
      } else {
        lines.push(`${prefix}- ${yamlScalar(item)}`);
      }
    }
    return;
  }
  for (const [key, item] of Object.entries(value || {})) {
    if (Array.isArray(item)) {
      if (!item.length) {
        lines.push(`${prefix}${key}: []`);
      } else {
        lines.push(`${prefix}${key}:`);
        appendYamlValue(lines, item, indent + 2);
      }
    } else if (item && typeof item === "object") {
      lines.push(`${prefix}${key}:`);
      appendYamlValue(lines, item, indent + 2);
    } else {
      lines.push(`${prefix}${key}: ${yamlScalar(item)}`);
    }
  }
}
function yamlScalar(value) {
  if (value === null || value === void 0) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return quoteYaml(value);
}
function quoteYaml(value) {
  return JSON.stringify(String(value));
}

// garden-styles.css
var garden_styles_default = ':host {\n  --anthbot-card-base: #111820;\n  --anthbot-card-background: var(--anthbot-card-base);\n  --anthbot-primary-background: var(--primary-background-color, #111820);\n  --anthbot-secondary-base: #141d27;\n  --anthbot-secondary-background: var(--anthbot-secondary-base);\n  --anthbot-primary-text: #ffffff;\n  --anthbot-secondary-text: rgba(255, 255, 255, 0.7);\n  --anthbot-divider: rgba(255, 255, 255, 0.1);\n  --anthbot-accent: #5ee083;\n  display: block;\n}\n\nha-card {\n  background: var(--anthbot-card-background);\n  border-radius: var(--ha-card-border-radius, 8px);\n  box-shadow: var(--ha-card-box-shadow, 0 12px 34px rgba(0, 0, 0, 0.28));\n  display: block;\n  overflow: hidden;\n}\n\nha-card.theme-background {\n  --anthbot-card-base: var(--card-background-color, var(--ha-card-background, #111820));\n  --anthbot-card-background: var(--anthbot-card-base);\n  --anthbot-secondary-base: var(--secondary-background-color, #141d27);\n  --anthbot-secondary-background: var(--anthbot-secondary-base);\n  --anthbot-primary-text: var(--primary-text-color, #ffffff);\n  --anthbot-secondary-text: var(--secondary-text-color, rgba(255, 255, 255, 0.7));\n  --anthbot-divider: var(--divider-color, rgba(255, 255, 255, 0.1));\n  --anthbot-accent: var(--primary-color, #5ee083);\n}\n\n.app-shell {\n  background: var(--anthbot-card-background);\n  color: var(--anthbot-primary-text);\n  padding: 14px;\n}\n\n.top-menu {\n  align-items: center;\n  display: flex;\n  gap: 14px;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.menu-title {\n  color: var(--anthbot-primary-text);\n  font-size: 22px;\n  font-weight: 800;\n  line-height: 1.2;\n}\n\n.menu-subtitle {\n  color: var(--anthbot-secondary-text);\n  font-size: 12px;\n  margin-top: 3px;\n}\n\n.mini-status {\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n  gap: 10px;\n}\n\n.canvas-wrap {\n  background: var(--anthbot-secondary-background);\n  cursor: pointer;\n  height: var(--anthbot-map-height, 720px);\n  min-height: 220px;\n  position: relative;\n}\n\n.canvas-wrap.auto-map-size {\n  aspect-ratio: var(--anthbot-map-aspect-ratio, 16 / 9);\n  height: auto;\n}\n\nha-card.map-expanded .canvas-wrap {\n  aspect-ratio: auto;\n  cursor: grab;\n  height: 92vh;\n  inset: 4vh 3vw auto 3vw;\n  min-height: 560px;\n  position: fixed;\n  width: 94vw;\n  z-index: 50;\n}\n\nha-card.map-expanded {\n  overflow: visible;\n}\n\nha-card.map-expanded .canvas-wrap::before {\n  background: rgba(0, 0, 0, 0.62);\n  content: "";\n  inset: -4vh -3vw;\n  position: fixed;\n  z-index: -1;\n}\n\ncanvas {\n  display: block;\n  height: 100%;\n  touch-action: none;\n  width: 100%;\n}\n\nha-card.map-only {\n  background: transparent;\n  border: 0;\n  box-shadow: none;\n  overflow: visible;\n}\n\nha-card.map-only .app-shell,\nha-card.map-only .map-overlay,\nha-card.map-only .app-panel,\nha-card.map-only .calibration {\n  display: none !important;\n}\n\nha-card.map-only .canvas-wrap {\n  background: transparent;\n  cursor: default;\n}\n\nha-card.glass-background {\n  --anthbot-card-background: color-mix(in srgb, var(--anthbot-card-base) 45%, transparent);\n  --anthbot-secondary-background: color-mix(in srgb, var(--anthbot-secondary-base) 55%, transparent);\n  backdrop-filter: var(--anthbot-backdrop-filter, blur(14px) saturate(120%));\n  -webkit-backdrop-filter: var(--anthbot-backdrop-filter, blur(14px) saturate(120%));\n}\n\nha-card.glass-background.map-expanded {\n  backdrop-filter: none;\n  overflow: visible;\n  -webkit-backdrop-filter: none;\n}\n\nha-card.transparent-background,\nha-card.transparent-background .app-shell,\nha-card.transparent-background .canvas-wrap,\nha-card.transparent-background .app-panel,\nha-card.transparent-background .calibration {\n  background: transparent;\n}\n\n.map-overlay {\n  position: absolute;\n  z-index: 2;\n}\n\n.map-title {\n  left: 22px;\n  top: 20px;\n}\n\nha-card:not(.map-expanded) .map-title,\nha-card:not(.map-expanded) .map-badges,\nha-card:not(.map-expanded) .command-dock,\nha-card:not(.map-expanded) .map-actions,\nha-card:not(.map-expanded) .map-close {\n  display: none;\n}\n\nha-card.map-expanded .map-title {\n  left: 76px;\n}\n\n.preview-hint {\n  backdrop-filter: blur(14px);\n  background: rgba(12, 18, 24, 0.74);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 16px;\n  bottom: 14px;\n  color: #ffffff;\n  display: grid;\n  gap: 2px;\n  left: 14px;\n  padding: 10px 12px;\n}\n\n.preview-hint strong {\n  font-size: 15px;\n}\n\n.preview-hint span {\n  color: rgba(255, 255, 255, 0.72);\n  font-size: 12px;\n}\n\nha-card.map-expanded .preview-hint {\n  display: none;\n}\n\n.name {\n  color: #ffffff;\n  font-size: 22px;\n  font-weight: 800;\n  line-height: 1.25;\n  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.72);\n}\n\n.state {\n  color: rgba(255, 255, 255, 0.78);\n  font-size: 12px;\n  line-height: 1.4;\n  margin-top: 3px;\n  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.72);\n}\n\n.status-panel {\n  align-items: center;\n  backdrop-filter: blur(14px);\n  background: rgba(12, 18, 24, 0.76);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 18px;\n  display: flex;\n  gap: 12px;\n  padding: 10px 12px;\n  right: 18px;\n  top: 18px;\n}\n\n.battery-ring {\n  --battery: 0deg;\n  align-items: center;\n  background:\n    radial-gradient(circle at center, rgba(12, 18, 24, 0.96) 0 58%, transparent 59%),\n    conic-gradient(#5ee083 var(--battery), rgba(255, 255, 255, 0.16) 0);\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  font-size: 13px;\n  font-weight: 800;\n  height: 54px;\n  justify-content: center;\n  width: 54px;\n}\n\n.battery-ring::after {\n  content: "%";\n  font-size: 9px;\n  margin-left: 1px;\n  opacity: 0.78;\n}\n\n.battery-ring.low {\n  background:\n    radial-gradient(circle at center, rgba(12, 18, 24, 0.96) 0 58%, transparent 59%),\n    conic-gradient(#ff6b6b var(--battery), rgba(255, 255, 255, 0.16) 0);\n}\n\n.battery-ring.charging {\n  box-shadow: 0 0 0 3px rgba(94, 224, 131, 0.2), 0 0 24px rgba(94, 224, 131, 0.34);\n}\n\n.status-copy {\n  color: #ffffff;\n  display: grid;\n  gap: 2px;\n  min-width: 118px;\n}\n\n.status-label {\n  color: rgba(255, 255, 255, 0.62);\n  font-size: 11px;\n  text-transform: uppercase;\n}\n\n.status-copy strong {\n  font-size: 15px;\n}\n\nbutton {\n  align-items: center;\n  background: var(--anthbot-secondary-background);\n  border: 1px solid var(--anthbot-divider);\n  border-radius: 8px;\n  color: var(--anthbot-primary-text);\n  cursor: pointer;\n  display: inline-flex;\n  font: inherit;\n  min-height: 32px;\n  padding: 0 10px;\n}\n\nbutton:hover {\n  background: var(--secondary-background-color, rgba(18, 24, 32, 0.94));\n}\n\n.map-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  right: 18px;\n  top: 112px;\n}\n\n.map-actions button {\n  border-radius: 999px;\n  font-size: 18px;\n  height: 42px;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0;\n  width: 42px;\n}\n\n.map-close {\n  border-radius: 999px;\n  font-size: 26px;\n  height: 42px;\n  justify-content: center;\n  left: 18px;\n  min-height: 42px;\n  padding: 0;\n  position: absolute;\n  top: 18px;\n  width: 42px;\n  z-index: 60;\n}\n\n.map-actions button.active {\n  background: rgba(68, 102, 255, 0.9);\n  border-color: rgba(210, 220, 255, 0.9);\n  color: #ffffff;\n}\n\n.map-badges {\n  bottom: auto;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  left: 22px;\n  top: 124px;\n}\n\n.map-badges span {\n  background: rgba(12, 18, 24, 0.72);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 999px;\n  color: #ffffff;\n  font-size: 12px;\n  padding: 6px 10px;\n}\n\n.command-dock {\n  backdrop-filter: blur(16px);\n  background: rgba(12, 18, 24, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 22px;\n  bottom: 18px;\n  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);\n  display: grid;\n  gap: 10px;\n  left: 50%;\n  max-width: calc(100% - 36px);\n  padding: 12px;\n  transform: translateX(-50%);\n  width: min(760px, calc(100% - 36px));\n}\n\n.mower-controls {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.command {\n  border-radius: 16px;\n  flex-direction: column;\n  font-weight: 800;\n  gap: 4px;\n  justify-content: center;\n  min-height: 54px;\n}\n\n.command-icon {\n  font-size: 20px;\n  line-height: 1;\n}\n\n.command.start {\n  background: linear-gradient(180deg, rgba(52, 199, 89, 0.96), rgba(36, 138, 70, 0.96));\n}\n\n.command.stop {\n  background: linear-gradient(180deg, rgba(255, 82, 82, 0.96), rgba(189, 36, 36, 0.96));\n}\n\n.command.dock {\n  background: linear-gradient(180deg, rgba(3, 169, 244, 0.96), rgba(2, 119, 189, 0.96));\n}\n\n.zone-strip {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 8px;\n  overflow-x: auto;\n  padding-bottom: 2px;\n  scrollbar-width: none;\n}\n\n.zone-strip::-webkit-scrollbar {\n  display: none;\n}\n\n.zone-strip:empty {\n  display: none;\n}\n\n.zone-strip button {\n  background: rgba(255, 255, 255, 0.12);\n  border-radius: 999px;\n  flex: 0 0 auto;\n  font-size: 12px;\n  min-height: 34px;\n  padding: 0 12px;\n  white-space: nowrap;\n}\n\n.app-panel {\n  background: var(--anthbot-card-background);\n  border-top: 1px solid var(--anthbot-divider);\n  color: var(--anthbot-primary-text);\n  padding: 14px;\n}\n\n.panel-tabs {\n  background: var(--anthbot-secondary-background);\n  border-radius: 999px;\n  display: grid;\n  gap: 4px;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  margin-bottom: 0;\n  padding: 4px;\n}\n\n.app-panel .panel-body {\n  margin-top: 0;\n}\n\n.panel-tabs button {\n  background: transparent;\n  border: 0;\n  border-radius: 999px;\n  justify-content: center;\n  min-height: 36px;\n}\n\n.panel-tabs button.active {\n  background: var(--anthbot-accent);\n  color: var(--text-primary-color, #ffffff);\n  font-weight: 800;\n}\n\n.panel-grid {\n  display: grid;\n  gap: 10px;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n}\n\n.panel-tile {\n  background: var(--anthbot-secondary-background);\n  border: 1px solid var(--anthbot-divider);\n  border-radius: 16px;\n  color: var(--anthbot-primary-text);\n  min-height: 76px;\n  padding: 12px;\n}\n\nbutton.panel-tile {\n  align-items: flex-start;\n  flex-direction: column;\n  justify-content: center;\n  text-align: left;\n}\n\n.panel-tile strong {\n  font-size: 16px;\n}\n\n.panel-tile span {\n  color: var(--anthbot-secondary-text);\n  font-size: 12px;\n}\n\n.garden-command-tile.start {\n  background: linear-gradient(180deg, rgba(52, 199, 89, 0.92), rgba(36, 138, 70, 0.92));\n  color: var(--text-primary-color, #ffffff);\n}\n\n.garden-command-tile.stop {\n  background: linear-gradient(180deg, rgba(255, 82, 82, 0.92), rgba(189, 36, 36, 0.92));\n  color: var(--text-primary-color, #ffffff);\n}\n\n.garden-command-tile.dock {\n  background: linear-gradient(180deg, rgba(3, 169, 244, 0.92), rgba(2, 119, 189, 0.92));\n  color: var(--text-primary-color, #ffffff);\n}\n\n.info-tile,\n.control-tile,\n.switch-tile,\n.language-tile {\n  display: grid;\n  gap: 8px;\n}\n\n.language-tile select {\n  background: var(--anthbot-secondary-background);\n  border: 1px solid var(--anthbot-divider);\n  border-radius: 9px;\n  color: var(--anthbot-primary-text);\n  font: inherit;\n  min-height: 36px;\n  padding: 6px 9px;\n  width: 100%;\n}\n\nha-card.theme-background .language-tile select {\n  background: var(--input-fill-color, var(--anthbot-secondary-background));\n}\n\n.language-tile select option {\n  background: var(--anthbot-card-base);\n  color: var(--anthbot-primary-text);\n}\n\n.info-tile strong {\n  overflow-wrap: anywhere;\n}\n\n.control-head {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n}\n\ninput[type="range"] {\n  accent-color: var(--anthbot-accent);\n  width: 100%;\n}\n\n.switch-tile {\n  align-items: center;\n  cursor: pointer;\n  grid-template-columns: 1fr auto;\n}\n\n.switch-tile input {\n  accent-color: var(--anthbot-accent);\n  height: 22px;\n  width: 42px;\n}\n\n.calibration {\n  background: var(--anthbot-card-background);\n  border-top: 1px solid var(--divider-color, #d9e2ec);\n  padding: 10px 14px 14px;\n}\n\nsummary {\n  color: var(--primary-text-color, #1f2933);\n  cursor: pointer;\n  font-weight: 700;\n  margin-bottom: 10px;\n}\n\n.calibration-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.calibration-grid button,\n.yaml-row button {\n  background: #535a64;\n  border-color: #535a64;\n}\n\n.calibration-title {\n  color: var(--primary-text-color, #1f2933);\n  font-size: 14px;\n  font-weight: 700;\n  margin: 12px 0 8px;\n}\n\n.yaml-row {\n  align-items: stretch;\n  display: grid;\n  gap: 8px;\n  grid-template-columns: 1fr auto;\n}\n\ntextarea {\n  background: var(--code-editor-background-color, var(--secondary-background-color, #f5f7fa));\n  border: 1px solid var(--divider-color, #d9e2ec);\n  border-radius: 6px;\n  color: var(--primary-text-color, #1f2933);\n  font-family: var(--code-font-family, monospace);\n  min-height: 96px;\n  padding: 8px;\n  resize: vertical;\n}\n\n@media (max-width: 640px) {\n  .canvas-wrap {\n    min-height: 220px;\n  }\n\n  ha-card.map-expanded .canvas-wrap {\n    height: 92vh;\n    inset: 4vh 12px auto 12px;\n    min-height: 0;\n    width: calc(100vw - 24px);\n  }\n\n  .top-menu {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .mini-status {\n    width: 100%;\n  }\n\n  .status-panel {\n    left: 18px;\n    right: auto;\n    top: 86px;\n  }\n\n  .map-actions {\n    flex-direction: row;\n    left: 18px;\n    right: auto;\n    top: 156px;\n  }\n\n  .map-badges {\n    bottom: auto;\n    top: 218px;\n  }\n\n  .mower-controls {\n    grid-template-columns: 1fr;\n  }\n\n  .yaml-row {\n    grid-template-columns: 1fr;\n  }\n\n  .panel-tabs {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\r\n.height-options {\r\n  display: grid;\r\n  gap: 6px;\r\n  grid-template-columns: repeat(5, minmax(0, 1fr));\r\n}\r\n\r\n.height-option {\r\n  justify-content: center;\r\n  min-height: 36px;\r\n  padding: 0 6px;\r\n}\r\n\r\n.height-option.active {\n  background: #5ee083;\n  border-color: rgba(255, 255, 255, 0.75);\n  color: #0b1411;\n  font-weight: 800;\n}\n\n.mowing-history-summary { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; }\n.mowing-history-summary-item { flex:1 1 140px; padding:10px 12px; border-radius:12px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); }\n.mowing-history-summary-item span { display:block; font-size:11px; color:#aeb7c2; margin-bottom:2px; }\n.mowing-history-summary-item strong { font-size:16px; }\n.mowing-history-empty { padding:14px 4px; color:#aeb7c2; font-size:13px; }\n.mowing-history-list { display:flex; flex-direction:column; gap:10px; }\n.mowing-history-card { padding:12px 14px; border-radius:14px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14); }\n.mowing-history-head { margin-bottom:8px; font-size:14px; }\n.mowing-history-stats { display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:8px; margin-bottom:8px; }\n.mowing-history-stat { display:flex; flex-direction:column; gap:2px; }\n.mowing-history-stat span { font-size:11px; color:#aeb7c2; }\n.mowing-history-stat strong { font-size:14px; }\n.mowing-history-zones { display:flex; flex-wrap:wrap; gap:6px; margin-top:4px; }\n.mowing-history-zone-chip { display:flex; flex-direction:column; gap:2px; padding:6px 10px; border-radius:10px; background:rgba(114,239,160,.10); border:1px solid rgba(114,239,160,.28); }\n.mowing-history-zone-chip strong { font-size:12px; }\n.mowing-history-zone-chip span { font-size:11px; color:#aeb7c2; }\n.mowing-history-raw { margin-top:8px; }\n.mowing-history-raw summary { font-size:11px; color:#aeb7c2; cursor:pointer; }\n.mowing-history-raw pre { margin:6px 0 0; max-height:220px; overflow:auto; font-size:11px; }\n.mowing-history-card.has-detail { cursor:pointer; transition:background .15s ease; }\n.mowing-history-card.has-detail:hover { background:rgba(255,255,255,.10); }\n\n.mowing-record-detail-overlay {\n  position:fixed; inset:0; background:rgba(0,0,0,.72); display:flex;\n  align-items:center; justify-content:center; z-index:10000; padding:16px;\n}\n.mowing-record-detail-dialog {\n  background:var(--anthbot-card-background, #101923); color:var(--anthbot-primary-text, #fff);\n  border-radius:12px; max-width:640px; width:100%; max-height:90vh; overflow-y:auto;\n  padding:16px; box-shadow:0 12px 40px rgba(0,0,0,.5);\n}\n.mowing-record-detail-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }\n.mowing-record-detail-title { font-weight:700; font-size:1.05em; }\n.mowing-record-detail-close { background:transparent; border:0; color:var(--anthbot-secondary-text, #aeb7c2); font-size:1.4em; line-height:1; cursor:pointer; padding:4px 8px; }\n.mowing-record-detail-close:hover { color:var(--anthbot-primary-text, #fff); }\n.mowing-record-detail-body { display:flex; flex-direction:column; gap:12px; }\n.mowing-record-detail-canvas-wrap { width:100%; background:var(--anthbot-secondary-background, #0b1118); border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; }\n.mowing-record-detail-canvas-wrap canvas,\n.mowing-record-detail-canvas-wrap svg { width:100%; height:auto; display:block; }\n.mowing-record-detail-status { padding:24px 8px; text-align:center; color:var(--anthbot-secondary-text, #aeb7c2); }\n.mowing-record-detail-error { color:#ff8a80; font-size:.9em; }\n.mowing-record-detail-zones { display:flex; flex-wrap:wrap; gap:6px; }\n.mowing-record-detail-debug { margin-top:10px; padding-top:8px; border-top:1px dashed var(--anthbot-border-color, rgba(255,255,255,.12)); font-size:.72em; font-family:monospace; color:var(--anthbot-secondary-text, #aeb7c2); opacity:.75; white-space:pre-wrap; word-break:break-word; }\n';

// robot.png
var robot_default = "data:image/png;base64,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";

// garden-map-card.source.js
var EDGE_I18N = {
  en: { edgeSettings: "Edge settings", edgeSettingsHint: "Cutting height and boundary overlap", cuttingHeightMm: "Cutting height (mm)", edgeOverlapCm: "Edge overlap (cm)", save: "Save", saving: "Saving…", edgeSaved: "Edge settings saved", edge: "Edge", overlapPreview: "Overlap preview" },
  hu: { edgeSettings: "Szegély beállításai", edgeSettingsHint: "Vágási magasság és szegélyátfedés", cuttingHeightMm: "Vágási magasság (mm)", edgeOverlapCm: "Szegélyátfedés (cm)", save: "Mentés", saving: "Mentés…", edgeSaved: "Szegélybeállítások elmentve", edge: "Szegély", overlapPreview: "Átfedés előnézete" },
  de: { edgeSettings: "Kanteneinstellungen", edgeSettingsHint: "Schnitthöhe und Kantenüberlappung", cuttingHeightMm: "Schnitthöhe (mm)", edgeOverlapCm: "Kantenüberlappung (cm)", save: "Speichern", saving: "Speichern…", edgeSaved: "Kanteneinstellungen gespeichert", edge: "Kante", overlapPreview: "Überlappungsvorschau" },
  fr: { edgeSettings: "Réglages de bordure", edgeSettingsHint: "Hauteur de coupe et chevauchement", cuttingHeightMm: "Hauteur de coupe (mm)", edgeOverlapCm: "Chevauchement de bordure (cm)", save: "Enregistrer", saving: "Enregistrement…", edgeSaved: "Réglages de bordure enregistrés", edge: "Bordure", overlapPreview: "Aperçu du chevauchement" },
  es: { edgeSettings: "Ajustes del borde", edgeSettingsHint: "Altura de corte y solapamiento", cuttingHeightMm: "Altura de corte (mm)", edgeOverlapCm: "Solapamiento del borde (cm)", save: "Guardar", saving: "Guardando…", edgeSaved: "Ajustes del borde guardados", edge: "Borde", overlapPreview: "Vista previa del solapamiento" },
  it: { edgeSettings: "Impostazioni bordo", edgeSettingsHint: "Altezza di taglio e sovrapposizione", cuttingHeightMm: "Altezza di taglio (mm)", edgeOverlapCm: "Sovrapposizione bordo (cm)", save: "Salva", saving: "Salvataggio…", edgeSaved: "Impostazioni bordo salvate", edge: "Bordo", overlapPreview: "Anteprima sovrapposizione" },
  pt: { edgeSettings: "Definições da borda", edgeSettingsHint: "Altura de corte e sobreposição", cuttingHeightMm: "Altura de corte (mm)", edgeOverlapCm: "Sobreposição da borda (cm)", save: "Guardar", saving: "A guardar…", edgeSaved: "Definições da borda guardadas", edge: "Borda", overlapPreview: "Pré-visualização da sobreposição" },
  nl: { edgeSettings: "Randinstellingen", edgeSettingsHint: "Maaihoogte en randoverlap", cuttingHeightMm: "Maaihoogte (mm)", edgeOverlapCm: "Randoverlap (cm)", save: "Opslaan", saving: "Opslaan…", edgeSaved: "Randinstellingen opgeslagen", edge: "Rand", overlapPreview: "Voorbeeld overlap" },
  pl: { edgeSettings: "Ustawienia krawędzi", edgeSettingsHint: "Wysokość koszenia i nakładanie", cuttingHeightMm: "Wysokość koszenia (mm)", edgeOverlapCm: "Nakładanie na krawędź (cm)", save: "Zapisz", saving: "Zapisywanie…", edgeSaved: "Zapisano ustawienia krawędzi", edge: "Krawędź", overlapPreview: "Podgląd nakładania" },
  cs: { edgeSettings: "Nastavení okraje", edgeSettingsHint: "Výška sečení a překrytí okraje", cuttingHeightMm: "Výška sečení (mm)", edgeOverlapCm: "Překrytí okraje (cm)", save: "Uložit", saving: "Ukládání…", edgeSaved: "Nastavení okraje uloženo", edge: "Okraj", overlapPreview: "Náhled překrytí" },
  sk: { edgeSettings: "Nastavenia okraja", edgeSettingsHint: "Výška kosenia a prekrytie okraja", cuttingHeightMm: "Výška kosenia (mm)", edgeOverlapCm: "Prekrytie okraja (cm)", save: "Uložiť", saving: "Ukladanie…", edgeSaved: "Nastavenia okraja uložené", edge: "Okraj", overlapPreview: "Náhľad prekrytia" },
  ro: { edgeSettings: "Setări margine", edgeSettingsHint: "Înălțime de tundere și suprapunere", cuttingHeightMm: "Înălțime de tundere (mm)", edgeOverlapCm: "Suprapunere margine (cm)", save: "Salvează", saving: "Se salvează…", edgeSaved: "Setările marginii au fost salvate", edge: "Margine", overlapPreview: "Previzualizare suprapunere" },
  da: { edgeSettings: "Kantindstillinger", edgeSettingsHint: "Klippehøjde og kantoverlap", cuttingHeightMm: "Klippehøjde (mm)", edgeOverlapCm: "Kantoverlap (cm)", save: "Gem", saving: "Gemmer…", edgeSaved: "Kantindstillinger gemt", edge: "Kant", overlapPreview: "Forhåndsvisning af overlap" },
  sv: { edgeSettings: "Kantinställningar", edgeSettingsHint: "Klipphöjd och kantöverlappning", cuttingHeightMm: "Klipphöjd (mm)", edgeOverlapCm: "Kantöverlappning (cm)", save: "Spara", saving: "Sparar…", edgeSaved: "Kantinställningar sparade", edge: "Kant", overlapPreview: "Förhandsvisning av överlappning" },
  no: { edgeSettings: "Kantinnstillinger", edgeSettingsHint: "Klippehøyde og kantoverlapping", cuttingHeightMm: "Klippehøyde (mm)", edgeOverlapCm: "Kantoverlapping (cm)", save: "Lagre", saving: "Lagrer…", edgeSaved: "Kantinnstillinger lagret", edge: "Kant", overlapPreview: "Forhåndsvisning av overlapping" },
  fi: { edgeSettings: "Reuna-asetukset", edgeSettingsHint: "Leikkuukorkeus ja reunan limitys", cuttingHeightMm: "Leikkuukorkeus (mm)", edgeOverlapCm: "Reunan limitys (cm)", save: "Tallenna", saving: "Tallennetaan…", edgeSaved: "Reuna-asetukset tallennettu", edge: "Reuna", overlapPreview: "Limityksen esikatselu" },
  "zh-CN": { edgeSettings: "边缘设置", edgeSettingsHint: "割草高度和边缘重叠", cuttingHeightMm: "割草高度（毫米）", edgeOverlapCm: "边缘重叠（厘米）", save: "保存", saving: "正在保存…", edgeSaved: "边缘设置已保存", edge: "边缘", overlapPreview: "重叠预览" },
  "zh-TW": { edgeSettings: "邊緣設定", edgeSettingsHint: "割草高度和邊緣重疊", cuttingHeightMm: "割草高度（毫米）", edgeOverlapCm: "邊緣重疊（公分）", save: "儲存", saving: "正在儲存…", edgeSaved: "邊緣設定已儲存", edge: "邊緣", overlapPreview: "重疊預覽" },
  tr: { edgeSettings: "Kenar ayarları", edgeSettingsHint: "Kesme yüksekliği ve kenar bindirmesi", cuttingHeightMm: "Kesme yüksekliği (mm)", edgeOverlapCm: "Kenar bindirmesi (cm)", save: "Kaydet", saving: "Kaydediliyor…", edgeSaved: "Kenar ayarları kaydedildi", edge: "Kenar", overlapPreview: "Bindirme önizlemesi" },
  th: { edgeSettings: "การตั้งค่าขอบ", edgeSettingsHint: "ความสูงการตัดและระยะซ้อนขอบ", cuttingHeightMm: "ความสูงการตัด (มม.)", edgeOverlapCm: "ระยะซ้อนขอบ (ซม.)", save: "บันทึก", saving: "กำลังบันทึก…", edgeSaved: "บันทึกการตั้งค่าขอบแล้ว", edge: "ขอบ", overlapPreview: "ตัวอย่างระยะซ้อน" },
  vi: { edgeSettings: "Cài đặt mép", edgeSettingsHint: "Chiều cao cắt và độ chồng mép", cuttingHeightMm: "Chiều cao cắt (mm)", edgeOverlapCm: "Độ chồng mép (cm)", save: "Lưu", saving: "Đang lưu…", edgeSaved: "Đã lưu cài đặt mép", edge: "Mép", overlapPreview: "Xem trước độ chồng" },
  ko: { edgeSettings: "가장자리 설정", edgeSettingsHint: "절단 높이 및 가장자리 겹침", cuttingHeightMm: "절단 높이 (mm)", edgeOverlapCm: "가장자리 겹침 (cm)", save: "저장", saving: "저장 중…", edgeSaved: "가장자리 설정 저장됨", edge: "가장자리", overlapPreview: "겹침 미리보기" },
  km: { edgeSettings: "ការកំណត់គែម", edgeSettingsHint: "កម្ពស់កាត់ និងការជាន់គែម", cuttingHeightMm: "កម្ពស់កាត់ (មម)", edgeOverlapCm: "ការជាន់គែម (សម)", save: "រក្សាទុក", saving: "កំពុងរក្សាទុក…", edgeSaved: "បានរក្សាទុកការកំណត់គែម", edge: "គែម", overlapPreview: "មើលការជាន់ជាមុន" }
};
var t = (card, key) => EDGE_I18N[card.language || "en"]?.[key] || EDGE_I18N.en[key] || translateAnthbot(card.language || "en", key);
var esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
function init(card) {
  card.selectedMowingTarget ||= { type: "full" };
  card.mowingZoneGroupsOpen ||= {};
  if (card.mowingZoneGroupsOpen["zone-set"] === void 0) card.mowingZoneGroupsOpen["zone-set"] = true;
  if (card.mowingZoneGroupsOpen["auto-zone-set"] === void 0) card.mowingZoneGroupsOpen["auto-zone-set"] = false;
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
  const states = card._hass?.states || {};
  const configuredId = card.config?.entity;
  const activeId = typeof card.activeEntityId === "function" ? card.activeEntityId() : card.activeMapEntityId;
  const sources = [card.entity, states[configuredId], states[activeId]];
  const configuredBase = String(configuredId || "").replace(/^sensor\./, "").replace(/_map(?:_\d+)?$/, "");
  for (const [entityId, state] of Object.entries(states)) if (entityId.startsWith(`sensor.${configuredBase}_map`) && state?.attributes?.ridable_areas) sources.push(state);
  for (const source of sources) {
    const attrs = source?.attributes || {};
    let edges = Array.isArray(attrs.ridable_areas) ? attrs.ridable_areas : [];
    const area = attrs.area_definition || {};
    if (!edges.length) {
      for (const key of ["ridable_areas", "ridableAreas"]) if (Array.isArray(area?.[key])) {
        edges = area[key];
        break;
      }
    }
    const valid = edges.filter((edge) => edge && Number.isFinite(Number(edge.id)));
    if (valid.length) return valid;
  }
  return [];
}
function choiceRow(values, selected, onSelect) {
  const row = document.createElement("div");
  row.className = "edge-choice-row";
  values.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(value).padStart(value < 10 ? 2 : 1, "0");
    button.className = value === selected ? "active" : "";
    button.addEventListener("click", () => {
      row.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
      onSelect(value);
    });
    row.appendChild(button);
  });
  return row;
}
function edgePreview(card, distance) {
  const preview = document.createElement("div");
  preview.className = "edge-visual";
  preview.setAttribute("aria-label", t(card, "overlapPreview"));
  preview.innerHTML = `<svg viewBox="0 0 720 330" role="img"><defs><linearGradient id="grass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#91b83d"/><stop offset="1" stop-color="#4c7d24"/></linearGradient><pattern id="paving" width="46" height="30" patternUnits="userSpaceOnUse"><rect width="46" height="30" fill="#d9dde2"/><path d="M0 29.5h46M23 0v30" stroke="#bbc1c8" stroke-width="1"/></pattern><filter id="robotShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-opacity=".38"/></filter><marker id="measureArrowStart" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M8 0 0 4 8 8z" fill="#fff"/></marker><marker id="measureArrowEnd" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="#fff"/></marker></defs><path d="M0 0h720v330H0z" fill="url(#paving)"/><path d="M150 0h570v330H330z" fill="url(#grass)"/><path class="edge-overlap-band" d="M150 0h80l180 330h-80z" fill="rgba(99,224,112,.44)"/><path d="M150 0l180 330" stroke="#fff" stroke-width="3"/><g class="edge-robot-art" filter="url(#robotShadow)"></g><g class="edge-measure"><line x1="261" y1="203" x2="240" y2="215" stroke="#fff" stroke-width="4" marker-start="url(#measureArrowStart)" marker-end="url(#measureArrowEnd)"/><text x="240" y="242" text-anchor="middle" fill="#d5ffad" font-size="25" font-weight="800">${distance} cm</text></g></svg>`;
  const robotGroup = preview.querySelector(".edge-robot-art");
  const robotUrl = card.config?.robot_image || card.config?.robotImage || card.rendererOptions?.()?.robotImage || card.renderer?.options?.robotImage || card.renderer?.robotImageUrl || card.renderer?.robotImage?.src;
  if (robotUrl) {
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("href", robotUrl);
    image.setAttribute("x", "250");
    image.setAttribute("y", "63");
    image.setAttribute("width", "145");
    image.setAttribute("height", "210");
    image.setAttribute("preserveAspectRatio", "xMidYMid meet");
    image.setAttribute("transform", "rotate(-29 322 168)");
    robotGroup.appendChild(image);
  } else {
    robotGroup.innerHTML = `<g transform="translate(257 98) rotate(-29 78 60)"><rect x="0" y="10" rx="28" width="155" height="108" fill="#f3f5f6" stroke="#252d35" stroke-width="6"/><rect x="45" y="0" rx="14" width="70" height="35" fill="#202832"/><rect x="62" y="45" rx="7" width="36" height="21" fill="#e76b35"/><circle cx="22" cy="110" r="21" fill="#232a31"/><circle cx="133" cy="110" r="21" fill="#232a31"/></g>`;
  }
  let robotX = 0, robotY = 0;
  const update = (value, animate = true) => {
    const pixelsPerCm = 4.8, outX = -0.877, outY = 0.48, measureX = 261, measureY = 203, length = value * pixelsPerCm, endX = measureX + outX * length, endY = measureY + outY * length;
    const line = preview.querySelector(".edge-measure line"), label = preview.querySelector(".edge-measure text");
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    label.textContent = `${value} cm`;
    label.setAttribute("x", endX);
    label.setAttribute("y", Math.min(318, endY + 27));
    const nextX = outX * length, nextY = outY * length;
    if (animate && robotGroup.animate) robotGroup.animate([{ transform: `translate(${robotX}px, ${robotY}px)` }, { transform: `translate(${nextX}px, ${nextY}px)` }], { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" });
    robotGroup.setAttribute("transform", `translate(${nextX} ${nextY})`);
    robotX = nextX;
    robotY = nextY;
  };
  update(distance, false);
  preview.updateDistance = update;
  return preview;
}
function openEdgeModal(card, edge) {
  card.shadowRoot.querySelector(".edge-settings-backdrop")?.remove();
  let height = [30, 40, 50, 60, 70].includes(Number(edge.cutter_height)) ? Number(edge.cutter_height) : 50;
  let distance = [5, 7, 10, 13, 15, 17, 20].includes(Number(edge.ride_distance)) ? Number(edge.ride_distance) : 10;
  const backdrop = document.createElement("div");
  backdrop.className = "edge-settings-backdrop";
  backdrop.dataset.edgeId = String(edge.id);
  const modal = document.createElement("div");
  modal.className = "edge-settings-modal";
  modal.innerHTML = `<div class="edge-modal-head"><strong>${esc(t(card, "edgeSettings"))}</strong><button type="button" class="edge-close" aria-label="${esc(t(card, "close"))}">×</button></div><label>${esc(t(card, "cuttingHeightMm"))}</label><div class="edge-height-slot"></div><label>${esc(t(card, "edgeOverlapCm"))}</label><div class="edge-preview-slot"></div><div class="edge-distance-slot"></div><button type="button" class="edge-save">${esc(t(card, "save"))}</button>`;
  const preview = edgePreview(card, distance);
  modal.querySelector(".edge-height-slot").appendChild(choiceRow([30, 40, 50, 60, 70], height, (value) => {
    height = value;
  }));
  modal.querySelector(".edge-preview-slot").appendChild(preview);
  modal.querySelector(".edge-distance-slot").appendChild(choiceRow([5, 7, 10, 13, 15, 17, 20], distance, (value) => {
    distance = value;
    preview.updateDistance(value);
  }));
  const close = () => backdrop.remove();
  modal.querySelector(".edge-close").addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  modal.querySelector(".edge-save").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = t(card, "saving");
    try {
      await card._hass.callService("anthbot_map", "set_edge_settings", { entity_id: card.config.entity, edge_id: Number(edge.id), mow_height: height, ride_distance: distance });
      card.notify(t(card, "edgeSaved"));
      close();
      card.scheduleRefresh();
    } catch (error) {
      button.disabled = false;
      button.textContent = t(card, "save");
      card.notify(`${t(card, "settingFailed")}: ${error?.message || error}`);
    }
  });
  backdrop.appendChild(modal);
  card.shadowRoot.appendChild(backdrop);
  modal.scrollTop = 0;
  requestAnimationFrame(() => {
    modal.scrollTop = 0;
  });
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
  details.addEventListener("toggle", () => {
    card.mowingZoneGroupsOpen[type] = details.open;
  });
  const content = details.querySelector(".settings-section-body");
  const grid = card.createPanelGrid();
  zones.forEach((zone) => {
    const tile = document.createElement("button");
    tile.type = "button";
    const active = selected.some((item) => String(item.id) === String(zone.id));
    tile.className = `panel-tile mowing-target-tile ${active ? "active" : ""}`;
    tile.innerHTML = `<strong>${esc(zone.name || `${type === "auto-zone-set" ? t(card, "autoZone") : t(card, "zone")} ${zone.id}`)}</strong><span>${t(card, "selectMowingTarget")}</span>`;
    tile.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const current = card.selectedMowingTarget?.type === type ? [...card.selectedMowingTarget.zones || []] : [];
      const index = current.findIndex((item) => String(item.id) === String(zone.id));
      if (index >= 0) current.splice(index, 1);
      else current.push(zone);
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
        button.type = "button";
        button.textContent = symbol;
        button.title = t(card, label);
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
  const keys = { blade: ["rc_pecent", "rc_percent"], camera: ["cl_pecent", "cl_percent"], contact: ["ccp_pecent", "ccp_percent"] }[kind];
  const value = keys.map((key) => raw[key]).find((item) => item != null && item !== "");
  return Number.isFinite(Number(value)) ? `${Math.round(Number(value))}%` : t(card, "maintenanceUnavailable");
}
function maintenanceTile(card, title, kind, reset, command) {
  const tile = document.createElement("div");
  tile.className = "panel-tile maintenance-tile";
  tile.innerHTML = `<strong>${title}</strong><span>${t(card, "remainingLife")}</span><span class="maintenance-value">${maintenanceValue(card, kind)}</span>`;
  const button = document.createElement("button");
  button.type = "button";
  button.className = `maintenance-reset ${command}`;
  button.textContent = reset;
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
function directNumber(card, label, entityId, min3, max3, step, unit) {
  const value = Number(entityId ? card._hass.states[entityId]?.state : NaN);
  const tile = document.createElement("div");
  tile.className = "panel-tile control-tile";
  tile.innerHTML = `<div class="control-head"><span>${label}</span><strong>${Number.isFinite(value) ? value : "-"} ${unit}</strong></div><input type="range" min="${min3}" max="${max3}" step="${step}" value="${Number.isFinite(value) ? value : min3}" ${entityId ? "" : "disabled"}>`;
  const input = tile.querySelector("input");
  input.addEventListener("input", () => tile.querySelector("strong").textContent = `${input.value} ${unit}`);
  input.addEventListener("change", async () => {
    await card._hass.callService("number", "set_value", { entity_id: entityId, value: Number(input.value) });
    card.scheduleRefresh();
  });
  return tile;
}
function directSwitch(card, label, entityId) {
  const checked = entityId && card._hass.states[entityId]?.state === "on";
  const tile = document.createElement("label");
  tile.className = "panel-tile switch-tile";
  tile.innerHTML = `<span>${label}</span><input type="checkbox" ${checked ? "checked" : ""} ${entityId ? "" : "disabled"}>`;
  const input = tile.querySelector("input");
  input.addEventListener("change", async () => {
    await card._hass.callService("switch", input.checked ? "turn_on" : "turn_off", { entity_id: entityId });
    card.scheduleRefresh();
  });
  return tile;
}
function obstacle(card, switchId, levelId) {
  const enabled = switchId && card._hass.states[switchId]?.state === "on";
  const tile = document.createElement("div");
  tile.className = `panel-tile obstacle-combined ${enabled ? "" : "disabled"}`;
  const row = document.createElement("label");
  row.className = "switch-tile";
  row.innerHTML = `<span>${t(card, "visualObstacle")}</span><input type="checkbox" ${enabled ? "checked" : ""} ${switchId ? "" : "disabled"}>`;
  const levels = document.createElement("div");
  levels.className = "obstacle-levels";
  levels.style.cssText = "display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:10px";
  const selected = Math.max(0, Math.min(2, Math.round(Number(levelId ? card._hass.states[levelId]?.state : 1))));
  ["low", "medium", "high"].forEach((key, index) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t(card, key);
    b.className = `height-option ${index === selected ? "active" : ""}`;
    b.disabled = !levelId;
    b.addEventListener("click", async () => {
      levels.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
      await card._hass.callService("number", "set_value", { entity_id: levelId, value: index });
      card.scheduleRefresh();
    });
    levels.appendChild(b);
  });
  const input = row.querySelector("input");
  input.addEventListener("change", async () => {
    await card._hass.callService("switch", input.checked ? "turn_on" : "turn_off", { entity_id: switchId });
    levels.style.display = input.checked ? "grid" : "none";
    card.scheduleRefresh();
  });
  levels.style.display = enabled ? "grid" : "none";
  tile.append(row, levels);
  return tile;
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
  p.findEntity = function(domain, suffixes) {
    const base = this.entityBase();
    for (const suffix of suffixes) {
      const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`^${domain}\\.${escapedBase}_${escapedSuffix}(?:_(\\d+))?$`);
      const matches = Object.entries(this._hass?.states || {}).map(([entityId, state]) => ({ entityId, state, match: entityId.match(pattern) })).filter(({ state, match }) => match && state.state !== "unavailable").sort((left, right) => Number(right.match?.[1] || 1) - Number(left.match?.[1] || 1));
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
    this.shadowRoot?.querySelector(".command-dock")?.remove();
    const tabs = this.shadowRoot?.querySelector(".panel-tabs");
    if (tabs && !tabs.querySelector('[data-panel="maintenance"]')) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.panel = "maintenance";
      button.textContent = t(this, "maintenance");
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
    body?.addEventListener("pointerdown", () => {
      this.panelInteractionUntil = Date.now() + 1200;
    }, true);
  };
  p.renderAppPanel = function() {
    init(this);
    const body = this.shadowRoot.querySelector('[data-role="panel-body"]');
    if (!body || !this._hass) return;
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
    init(this);
    body.innerHTML = "";
    const targets = this.createPanelGrid();
    const target = (type, title) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = `panel-tile mowing-target-tile ${this.selectedMowingTarget?.type === type ? "active" : ""}`;
      tile.innerHTML = `<strong>${title}</strong><span>${t(this, "selectMowingTarget")}</span>`;
      tile.addEventListener("click", () => {
        this.selectedMowingTarget = { type };
        this.renderControlPanel(body);
      });
      return tile;
    };
    targets.append(target("full", t(this, "fullArea")), target("edge", t(this, "commandOuterEdge")), target("dock-edge", t(this, "dockEdgeLabel")));
    body.appendChild(targets);
    const manual = this.currentZones();
    if (manual.length) body.appendChild(zoneGroup(this, "zone-set", t(this, "manualZones"), manual, body));
    const automatic = autoZones(this);
    if (automatic.length) body.appendChild(zoneGroup(this, "auto-zone-set", t(this, "autoZones"), automatic, body));
    const action = this.primaryMowingAction();
    const actions = this.createPanelGrid();
    actions.append(this.createPrimaryMowingTile(action), this.createCommandTile(t(this, "stopLabel"), t(this, "stopSub"), "stop"), this.createCommandTile(t(this, "homeLabel"), t(this, "homeSub"), "dock"));
    body.appendChild(actions);
  };
  p.primaryMowingAction = function() {
    const values = this.commandStatusValues();
    if (values.some((v) => ["paused", "pause", "szunetel", "szuneteltetve"].some((x) => v.includes(x)))) return this.entity?.attributes?.last_mowing_task?.type ? "resume" : "start";
    if (values.some((v) => ["mowing", "globalmowing", "zonemowing", "regionmowing", "working", "cutting", "nyiras", "funyiras"].some((x) => v.includes(x)))) return "pause";
    return "start";
  };
  p.createPrimaryMowingTile = function(action) {
    const labels = { start: [t(this, "startLabel"), t(this, "startSelectedTask")], pause: [t(this, "pauseTask"), t(this, "pauseTaskSub")], resume: [t(this, "resumeTask"), t(this, "resumeTaskSub")] };
    const tile = document.createElement("button");
    tile.type = "button";
    tile.dataset.primaryMowingAction = action;
    tile.className = `panel-tile task-action-tile ${action}`;
    tile.innerHTML = `<strong>${labels[action][0]}</strong><span>${labels[action][1]}</span>`;
    tile.addEventListener("click", () => this.handlePrimaryMowingAction(action));
    return tile;
  };
  p.handlePrimaryMowingAction = async function(action) {
    if (["pause", "resume"].includes(action)) return this.handleCommand(action);
    const selected = this.selectedMowingTarget;
    if (selected?.type === "zone-set" && selected.zones?.length) {
      if (selected.zones.length === 1) return this.startZone(selected.zones[0]);
      return this.startZones(selected.zones);
    }
    if (selected?.type === "auto-zone-set" && selected.zones?.length) {
      if (selected.zones.length === 1 && typeof this.startAutoZone === "function") return this.startAutoZone(selected.zones[0]);
      return this.startAutoZones(selected.zones);
    }
    if (selected?.type === "edge") return this.handleCommand("outer-edge");
    if (selected?.type === "dock-edge") return this.handleCommand("dock-edge");
    return this.handleCommand("start");
  };
  p.startZones = function(zones) {
    return this.callAnthbotService("start_zone_mow", { zones: zones.map((z) => z.id ?? z.name) });
  };
  p.startAutoZone = function(zone) {
    return this.callAnthbotService("start_auto_zone_mow", { auto_zones: String(zone.id ?? zone.name) });
  };
  p.startAutoZones = function(zones) {
    return this.callAnthbotService("start_auto_zone_mow", { auto_zones: zones.map((z) => z.id ?? z.name) });
  };
  p.getControlEntity = function(command) {
    const existing = originalGetControlEntity.call(this, command);
    if (existing) return existing;
    const suffixes = {
      pause: ["pause_mow"],
      resume: ["resume_mow"],
      "reset-blade": ["reset_blade_maintenance"],
      "reset-camera": ["reset_camera_maintenance"],
      "reset-contact": ["reset_dock_contact_maintenance"]
    }[command];
    return suffixes ? this.findEntity("button", suffixes) : null;
  };
  p.handleCommand = async function(command) {
    const services = { pause: "pause_mow", resume: "resume_mow", "reset-blade": "reset_blade_maintenance", "reset-camera": "reset_camera_maintenance", "reset-contact": "reset_dock_contact_maintenance" };
    if (!services[command]) return originalHandleCommand.call(this, command);
    if (command.startsWith("reset-") && !window.confirm(t(this, "resetCounterWarning"))) return;
    const customAction = this.config.button_actions?.[command] || this.config.buttonActions?.[command];
    if (customAction) return this.callCustomButtonAction(command, customAction);
    const buttonEntity = this.getControlEntity(command);
    if (buttonEntity) return this.executeAnthbotButton(buttonEntity, services[command], this.commandLabel(services[command]));
    return this.callAnthbotService(services[command]);
  };
  p.commandLabel = function(service) {
    const labels = {
      start_auto_zone_mow: t(this, "autoZones"),
      pause_mow: t(this, "pauseTask"),
      resume_mow: t(this, "resumeTask"),
      reset_blade_maintenance: t(this, "resetBlade"),
      reset_camera_maintenance: t(this, "resetCamera"),
      reset_dock_contact_maintenance: t(this, "resetDockContact")
    };
    return labels[service] || originalCommandLabel.call(this, service);
  };
  p.commandIsConfirmed = function(service) {
    const expected = {
      pause_mow: ["paused", "pause", "szunetel", "szunet"],
      resume_mow: ["mowing", "globalmowing", "zonemowing", "regionmowing", "working", "cutting", "nyiras", "funyiras"],
      start_auto_zone_mow: ["mowing", "zonemowing", "regionmowing", "working", "cutting", "nyiras", "funyiras"]
    }[service];
    if (expected) return this.commandStatusValues().some((status) => expected.some((value) => status.includes(value)));
    return originalCommandIsConfirmed.call(this, service);
  };
  p.renderMaintenancePanel = function(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    grid.append(maintenanceTile(this, t(this, "bladeMaintenance"), "blade", t(this, "resetBlade"), "reset-blade"), maintenanceTile(this, t(this, "cameraMaintenance"), "camera", t(this, "resetCamera"), "reset-camera"), maintenanceTile(this, t(this, "dockContactMaintenance"), "contact", t(this, "resetDockContact"), "reset-contact"));
    body.appendChild(grid);
  };
  p.renderSettingsPanel = function(body) {
    body.innerHTML = "";
    const global = section(this, t(this, "globalSettings"), "global", true);
    const grid = this.createPanelGrid();
    grid.append(this.createCommandTile(t(this, "cloud"), t(this, "cloudSub"), "connect"), this.createMowHeightControl(), this.createNumberControl(t(this, "mowCount"), "mowCount", 1, 3, 1, "×"), obstacle(this, this.getSwitchEntity("visualObstacle"), this.getNumberEntity("visualObstacleLevel")), this.createNumberControl(t(this, "customDirection"), "mowDirection", 0, 180, 1, "deg"), this.createNumberControl(t(this, "rainDelay"), "rainContinue", 0, 8, 1, "h"), this.createNumberControl(t(this, "volume"), "voiceVolume", 0, 100, 1, "%"), this.createSwitchControl(t(this, "rainDetection"), "rain"), this.createSwitchControl(t(this, "customCutDirection"), "customDirection"), this.createSwitchControl(t(this, "edgeReturn"), "edgeReturn"), this.createSwitchControl(t(this, "autoDockMow"), "autoDockMow"));
    global.querySelector(".settings-section-body").appendChild(grid);
    body.appendChild(global);
    const edges = ridableAreas(this);
    if (edges.length) {
      const edgeSection = section(this, t(this, "edgeSettings"), "edges");
      const edgeGrid = this.createPanelGrid();
      edges.forEach((edge, index) => {
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "panel-tile edge-settings-tile";
        const edgeName = edges.length === 1 ? t(this, "edge") : edge.name || `${t(this, "edge")} ${index + 1}`;
        tile.innerHTML = `<strong>${esc(edgeName)}</strong><span>${esc(t(this, "edgeSettingsHint"))}</span>`;
        tile.addEventListener("click", () => openEdgeModal(this, edge));
        edgeGrid.appendChild(tile);
      });
      edgeSection.querySelector(".settings-section-body").appendChild(edgeGrid);
      body.appendChild(edgeSection);
    }
    for (const [kind, title, zones] of [["manual", t(this, "manualZones"), this.currentZones()], ["auto", t(this, "autoZones"), autoZones(this)]]) {
      if (!zones.length) continue;
      const group = section(this, title, kind);
      const content = group.querySelector(".settings-section-body");
      zones.forEach((zone) => {
        const item = document.createElement("details");
        item.className = "settings-section";
        item.innerHTML = `<summary>${esc(zone.name || `${t(this, "zone")} ${zone.id}`)}</summary><div class="settings-section-body"></div>`;
        const zg = this.createPanelGrid();
        const number = (labels) => findZoneEntity(this, "number", kind, zone, labels), sw = (labels) => findZoneEntity(this, "switch", kind, zone, labels);
        zg.append(directNumber(this, t(this, "mowCount"), number(["mowing passes", "mow count"]), 1, 3, 1, "×"), directNumber(this, t(this, "cutHeight"), number(["cutting height", "mow height"]), 30, 70, 5, "mm"), obstacle(this, sw(["visual obstacle"]), number(["obstacle sensitivity", "visual obstacle level"])), directSwitch(this, t(this, "edgeCutting"), sw(["edge cutting", "edge cut"])), directSwitch(this, t(this, "customCutDirection"), sw(["custom mowing direction"])), directNumber(this, t(this, "customDirection"), number(["mowing direction"]), 0, 180, 1, "deg"));
        item.querySelector(".settings-section-body").appendChild(zg);
        content.appendChild(item);
      });
      body.appendChild(group);
    }
  };
  p.renderDiagnosticsPanel = function(body) {
    body.innerHTML = "";
    const grid = this.createPanelGrid();
    [[t(this, "bladeLife"), "cuttingComponentsLife"], [t(this, "cameraLife"), "cuttingLineLife"], [t(this, "dockContact"), "rechargeContactLife"], ["WiFi", "wifi"], ["Bluetooth", "bluetooth"], [t(this, "firmware"), "firmware"], [t(this, "gpsLatitude"), "gpsLatitude"], [t(this, "gpsLongitude"), "gpsLongitude"], [t(this, "lastUpdate"), "shadowUpdated"]].forEach(([label, key]) => grid.appendChild(this.createInfoTile(label, key)));
    body.appendChild(grid);
    const attrs = this.entity?.attributes || {};
    const recordsPayload = attrs.mowing_records || { data: [] };
    const recordsError = attrs.mowing_records_error;
    const history = this.createSettingsSection(t(this, "mowingHistory"), "mowing-history");
    this.renderMowingHistoryList(history.querySelector(".settings-section-body"), recordsPayload, recordsError);
    body.appendChild(history);
    const errors = this.createSettingsSection(t(this, "errorHistory"), "error-history");
    errors.querySelector(".settings-section-body").innerHTML = `<pre>${esc(JSON.stringify(attrs.error_history || [], null, 2))}</pre>`;
    body.appendChild(errors);
  };
  p.updateRenderer = function() {
    if (Date.now() < (this.panelInteractionUntil || 0)) return;
    this.gardenAnthbotBackgroundRefresh = true;
    let result;
    try {
      result = originalUpdateRenderer.call(this);
    } finally {
      this.gardenAnthbotBackgroundRefresh = false;
    }
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
      get: originalHassDescriptor.get || function() {
        return this._hass;
      },
      set: function(hass) {
        originalHassDescriptor.set.call(this, hass);
        const attrs = this._hass?.states?.[this.config?.entity]?.attributes || this.entity?.attributes || {};
        const signature = JSON.stringify([
          attrs.ridable_area_time ?? null,
          ridableAreas(this)
        ]);
        const previous = this.gardenEdgeStateSignature;
        this.gardenEdgeStateSignature = signature;
        if (previous === void 0 || previous === signature) return;
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
      }
    });
  }
}
var GARDEN_CARD_TAG = globalThis.__gardenMapCardRegistrationTag || "garden-map-card";
delete globalThis.__gardenMapCardRegistrationTag;
delete globalThis.__gardenMapCardBuildLabel;
var escapeHtml2 = esc;
var ENTITY_MAP = {
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
  shadowUpdated: ["sensor", ["shadow_last_updated"]]
};
var NUMBER_MAP = {
  mowHeight: ["mow_height", "mow_height_setting", "mow height"],
  mowDirection: ["custom_mowing_direction", "custom_mowing_direction_setting", "custom mowing direction"],
  rainContinue: ["rain_continue_time", "rain_continue_time_setting", "rain continue time"],
  voiceVolume: ["voice_volume", "voice_volume_setting", "voice volume"],
  mowCount: ["mow_count", "mow_count_setting", "mowing passes"],
  visualObstacleLevel: ["visual_obstacle_level", "visual_obstacle_level_setting", "visual obstacle sensitivity"]
};
var SWITCH_MAP = {
  rain: ["rain_perception", "rain_perception_enabled", "rain perception"],
  customDirection: ["custom_mowing_direction_enabled", "custom mowing direction"],
  visualObstacle: ["visual_obstacle_detection", "visual_obstacle_detection_enabled", "visual obstacle detection"],
  edgeReturn: ["edge_following_return_enabled", "edge-following return"],
  autoDockMow: ["automatic_dock_mowing_enabled", "automatic dock-area mowing"]
};
function mergeSavedIrrigationItems(configuredItems, savedItems) {
  const configured = Array.isArray(configuredItems) ? configuredItems : [];
  const saved = Array.isArray(savedItems) ? savedItems : [];
  const savedById = new Map(saved.map((item) => [String(item?.id), item]));
  const configuredIds = new Set(configured.map((item) => String(item?.id)));
  return [
    ...configured.map((item) => ({ ...item, ...savedById.get(String(item?.id)) || {} })),
    ...saved.filter((item) => !configuredIds.has(String(item?.id)))
  ];
}
function cloneIrrigationItems(items) {
  return Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
}
var GardenMapCard = class extends HTMLElement {
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
    this.optimisticSettings = /* @__PURE__ */ new Map();
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
    this.irrigationLogDate = this.localDateKey(/* @__PURE__ */ new Date());
    this.robotLogEntries = [];
    this.robotLogLoading = false;
    this.robotLogError = "";
    this.robotLogLoaded = false;
    this.robotLogDate = this.localDateKey(/* @__PURE__ */ new Date());
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
      drip_lines: cloneIrrigationItems(yamlIrrigation.drip_lines || yamlIrrigation.dripLines)
    };
    this.config = {
      ...config,
      irrigation: config.irrigation ? { ...this.yamlIrrigationConfig } : config.irrigation
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
              savedIrrigation.drip_lines || savedIrrigation.dripLines
            )
          }
        };
      }
    } catch (_error) {
    }
    const savedInterface = this.readInterfaceSettings(config.entity);
    this.mapOnly = typeof config.map_only === "boolean" ? config.map_only : typeof config.mapOnly === "boolean" ? config.mapOnly : Boolean(savedInterface.mapOnly);
    this.themeBackground = typeof config.theme_background === "boolean" ? config.theme_background : typeof config.themeBackground === "boolean" ? config.themeBackground : Boolean(savedInterface.themeBackground);
    this.transparentBackground = typeof config.transparent_background === "boolean" ? config.transparent_background : typeof config.transparentBackground === "boolean" ? config.transparentBackground : Boolean(savedInterface.transparentBackground);
    this.glassBackground = typeof config.glass_background === "boolean" ? config.glass_background : typeof config.glassBackground === "boolean" ? config.glassBackground : Boolean(savedInterface.glassBackground);
    this.languageOverride = savedInterface.languageOverride === true;
    this.selectedLanguage = this.languageOverride ? savedInterface.language || "auto" : config.language || savedInterface.language || window.localStorage.getItem("anthbot-map-language") || "auto";
    this.activeSystem = window.localStorage.getItem("anthbot-map-active-system") === "irrigation" ? "irrigation" : config.default_system === "irrigation" ? "irrigation" : "robot";
    this.stopRefreshTimer();
    window.clearTimeout(this.pendingRefreshTimer);
    this.calibration = readCalibration(config);
    this.robotCalibration = readRobotCalibration(config);
    this.mowingPathCalibration = readMowingPathCalibration(config);
    this.robotHeadingOffset = Number(config.robot_heading_offset ?? config.robotHeadingOffset) || 0;
    this.decodedBoundaryCalibration = readDecodedBoundaryCalibration(config);
    this.mapOverlayOverrides = savedInterface.mapOverlayOverrides && typeof savedInterface.mapOverlayOverrides === "object" ? { ...savedInterface.mapOverlayOverrides } : {};
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
    if (previousIrrigationStatus && previousIrrigationStatus !== this.lastIrrigationStatus && this.shadowRoot?.querySelector(".irrigation-log-box")?.open) {
      this.loadIrrigationLog(true);
    }
    if (previousRobotStatus && previousRobotStatus !== this.lastRobotStatus && this.shadowRoot?.querySelector(".robot-log-box")?.open) {
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
      transparentBackground ? "transparent-background" : ""
    ].filter(Boolean).join(" ");
    root.innerHTML = `
      <ha-card class="${cardClasses}">
        <style>${garden_styles_default}</style>
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
      root.querySelector(".irrigation-host")
    ].forEach((element) => {
      if (element) glassPanel?.appendChild(element);
    });
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
    const pointerStarts = /* @__PURE__ */ new Map();
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
      const start = /* @__PURE__ */ new Date(`${this.irrigationLogDate}T00:00:00`);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const path = `history/period/${encodeURIComponent(start.toISOString())}?filter_entity_id=input_text.irrigation_status&end_time=${encodeURIComponent(end.toISOString())}&no_attributes`;
      const response = await this._hass.callApi("GET", path);
      const states = Array.isArray(response?.[0]) ? response[0] : [];
      const entries = [];
      let previousState = null;
      states.forEach((item) => {
        const state = String(item?.state || "").trim();
        const changedAt = new Date(item.last_changed || item.last_updated || 0);
        if (!state || ["unknown", "unavailable"].includes(state) || state === previousState || !Number.isFinite(changedAt.getTime()) || changedAt < start || changedAt >= end) return;
        previousState = state;
        entries.push({
          state,
          time: changedAt.toISOString(),
          type: this.irrigationLogType(state)
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
    const maximumDate = this.localDateKey(/* @__PURE__ */ new Date());
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
          second: "2-digit"
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
      const start = /* @__PURE__ */ new Date(`${this.robotLogDate}T00:00:00`);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const path = `history/period/${encodeURIComponent(start.toISOString())}?filter_entity_id=${encodeURIComponent(entityIds.join(","))}&end_time=${encodeURIComponent(end.toISOString())}&no_attributes`;
      const response = await this._hass.callApi("GET", path);
      const previousByEntity = /* @__PURE__ */ new Map();
      const entries = (Array.isArray(response) ? response.flat() : []).map((item) => {
        const entityId = String(item?.entity_id || "");
        const state = String(item?.state || "").trim();
        const changedAt = new Date(item?.last_changed || item?.last_updated || 0);
        if (!entityId || !state || ["unknown", "unavailable"].includes(state.toLowerCase()) || !Number.isFinite(changedAt.getTime()) || changedAt < start || changedAt >= end || previousByEntity.get(entityId) === state) return null;
        previousByEntity.set(entityId, state);
        const isErrorEntity = entityId === errorEntity;
        if (isErrorEntity && this.robotLogErrorIsEmpty(state)) return null;
        return {
          state: isErrorEntity ? this.t("errorPrefix").replace("{error}", state) : this.robotLogStatusLabel(state),
          rawState: state,
          time: changedAt.toISOString(),
          type: isErrorEntity ? "error" : this.robotLogStatusType(state)
        };
      }).filter(Boolean).sort((a, b) => new Date(b.time) - new Date(a.time));
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
      mowing: this.t("statusMowing"),
      cutting: this.t("statusMowing"),
      working: this.t("statusMowing"),
      paused: this.t("statusPaused"),
      pause: this.t("statusPaused"),
      returning: this.t("statusReturning"),
      returning_to_dock: this.t("statusReturning"),
      going_home: this.t("statusReturning"),
      charging: this.t("statusCharging"),
      docked: this.t("statusDocked"),
      idle: this.t("statusIdle"),
      standby: this.t("statusStandby"),
      stopped: this.t("statusStopped"),
      error: this.t("statusError"),
      offline: this.t("statusOffline"),
      disconnected: this.t("statusOffline")
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
    const maximumDate = this.localDateKey(/* @__PURE__ */ new Date());
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
          second: "2-digit"
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
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
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
      card.heads
    );
    card.dripLines = mergeSavedIrrigationItems(
      this.yamlIrrigationConfig?.drip_lines,
      card.dripLines
    );
    card.config = {
      ...card.config,
      heads: card.heads,
      drip_lines: card.dripLines
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
      [".top", ".zones", ".pump-status", ".quick-controls", ".settings-box", ".schedule-box", ".yaml-box"].map((selector) => nestedPanel.querySelector(selector)).forEach((element) => {
        if (element) innerCard.appendChild(element);
      });
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
        hint.textContent = this.pendingDripStart ? this.t("dripEndHint") : this.t("dripStartHint");
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
    if (!heads.some((head2) => Number(head2.id) === Number(this.selectedIrrigationHeadId))) {
      this.selectedIrrigationHeadId = Number(heads[0].id);
    }
    if (panel) panel.hidden = false;
    const head = heads.find((item) => Number(item.id) === Number(this.selectedIrrigationHeadId));
    if (!head) return;
    const selectedLabel = this.shadowRoot?.querySelector("[data-selected-head-label]");
    if (selectedLabel) selectedLabel.textContent = `${head.name || this.t("headLabel").replace("{id}", head.id)} · ${this.t("zoneLabel").replace("{id}", Number(head.zone))}`;
    const fallbackDirection = (Math.atan2(0.5 - Number(head.y), 0.5 - Number(head.x)) * 180 / Math.PI + 360) % 360;
    const values = {
      direction_angle: Number.isFinite(Number(head.direction_angle)) ? Number(head.direction_angle) : Math.round(fallbackDirection),
      sweep_angle: Number.isFinite(Number(head.sweep_angle)) ? Number(head.sweep_angle) : 110,
      sweep_speed: Number.isFinite(Number(head.sweep_speed)) ? Number(head.sweep_speed) : 1,
      spray_distance: Number.isFinite(Number(head.spray_distance)) ? Number(head.spray_distance) : 6
    };
    this.shadowRoot?.querySelectorAll("[data-head-setting]").forEach((input) => {
      const key = input.dataset.headSetting;
      input.value = String(values[key]);
      const output = this.shadowRoot?.querySelector(`[data-head-value="${key}"]`);
      if (output) {
        output.textContent = key === "direction_angle" || key === "sweep_angle" ? `${Math.round(values[key])}°` : key === "sweep_speed" ? `${values[key].toFixed(1)}×` : `${values[key].toFixed(1)} m`;
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
    heads.forEach((head, headIndex) => {
      head.id = headIndex + 1;
      head.name = String(headIndex + 1);
    });
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
      drip_lines: Array.isArray(this.irrigationCard?.dripLines) ? this.irrigationCard.dripLines : []
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
          settings.drip_lines || settings.dripLines
        )
      };
      window.localStorage.setItem(key, JSON.stringify(mergedSettings));
      this.config = {
        ...this.config,
        irrigation: { ...configuredIrrigation, ...mergedSettings }
      };
      if (this.irrigationCard) {
        this.irrigationCard.heads = mergedSettings.heads;
        this.irrigationCard.dripLines = mergedSettings.drip_lines;
        this.syncIrrigationMapElements();
        this.updateIrrigationHeadEditor();
        this.renderer?.setOptions(this.rendererOptions());
      }
    } catch (_error) {
    }
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
      const manualTimer = Number.isFinite(id) ? this._hass?.states?.[`timer.irrigation_manual_zone_${id}`] : null;
      const programTimer = Number.isFinite(id) ? this._hass?.states?.[`timer.irrigation_program_zone_${id}`] : null;
      return {
        ...zone,
        active: this._hass?.states?.[zone.entity]?.state === "on" || manualTimer?.state === "active" || programTimer?.state === "active"
      };
    });
  }
  startIrrigationCountdownTimer() {
    if (this.irrigationCountdownTimer) return;
    this.irrigationCountdownTimer = window.setInterval(() => this.updateIrrigationCountdown(), 1e3);
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
    const programZoneTimer = Number.isFinite(zoneId) ? this._hass?.states?.[`timer.irrigation_program_zone_${zoneId}`] : null;
    const manualTimer = Number.isFinite(zoneId) ? this._hass?.states?.[`timer.irrigation_manual_zone_${zoneId}`] : null;
    const programTimer = this._hass?.states?.["timer.irrigation_zone"];
    const timer = programZoneTimer?.state === "active" ? programZoneTimer : manualTimer?.state === "active" ? manualTimer : programTimer?.state === "active" ? programTimer : null;
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
      const seconds = Math.max(0, Math.ceil((finishTime - Date.now()) / 1e3));
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
        const hit2 = dripLines.findIndex((line) => distanceToSegment(point, line) < 0.022);
        if (hit2 >= 0) {
          dripLines.splice(hit2, 1);
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
          y: Number(point.y.toFixed(4))
        };
        this.updateIrrigationHeadEditor();
        this.renderer.setOptions(this.rendererOptions());
        return;
      }
      const end = {
        x: Number(point.x.toFixed(4)),
        y: Number(point.y.toFixed(4))
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
        width: 5
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
      const direction = (Math.atan2(0.5 - point.y, 0.5 - point.x) * 180 / Math.PI + 360) % 360;
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
        spray_distance: 6
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
        ...this.config.irrigation || {},
        heads,
        drip_lines: dripLines
      }
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
        `${probe.naturalWidth} / ${probe.naturalHeight}`
      );
      this.renderer?.resize();
    };
    probe.src = imageUrl;
  }
  computeLivePose(attributes = this.entity?.attributes || {}) {
    const rawPose = attributes.pose && typeof attributes.pose === "object" ? attributes.pose : {};
    const coordinatePose = [rawPose, attributes.cur_pose, attributes.map_scan_pose].find(
      (candidate) => Number.isFinite(Number(candidate?.x)) && Number.isFinite(Number(candidate?.y))
    );
    const poseYawEntity = this.getRelatedEntity("poseYaw");
    const fallbackYaw = [
      coordinatePose?.yaw,
      coordinatePose?.heading,
      rawPose.yaw,
      rawPose.heading,
      poseYawEntity?.state
    ].find((value) => Number.isFinite(Number(value)));
    return coordinatePose ? { ...rawPose, ...coordinatePose, yaw: fallbackYaw } : { ...rawPose, yaw: fallbackYaw };
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
      area_definition: attributes.area_definition
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
    const customAreas = Array.isArray(attributes.area_definition?.custom_areas) ? attributes.area_definition.custom_areas.length : 0;
    const noGoAreas = (Array.isArray(attributes.area_definition?.forbid_areas) ? attributes.area_definition.forbid_areas.length : 0) + (Array.isArray(attributes.area_definition?.remote_forbid_areas) ? attributes.area_definition.remote_forbid_areas.length : 0);
    const zoneCount = this.shadowRoot.querySelector('[data-role="zone-count"]');
    if (zoneCount) {
      zoneCount.textContent = `${this.t("zones")}: ${customAreas} / ${this.t("forbidden")}: ${noGoAreas}`;
    }
    const poseBadge = this.shadowRoot.querySelector('[data-role="pose"]');
    if (poseBadge) {
      const x = Number(attributes.pose?.x);
      const y = Number(attributes.pose?.y);
      poseBadge.textContent = Number.isFinite(x) && Number.isFinite(y) ? `${this.t("position")}: ${Math.round(x)}, ${Math.round(y)}` : `${this.t("position")}: -`;
    }
    const headingBadge = this.shadowRoot.querySelector('[data-role="heading"]');
    if (headingBadge) {
      const headingValue = [
        attributes.cur_pose?.heading,
        attributes.map_scan_pose?.heading,
        attributes.pose?.heading
      ].find((value) => Number.isFinite(Number(value)));
      const yawValue = [
        attributes.cur_pose?.yaw,
        attributes.map_scan_pose?.yaw,
        attributes.pose?.yaw,
        this.getRelatedEntity("poseYaw")?.state
      ].find((value) => Number.isFinite(Number(value)));
      const heading = Number.isFinite(Number(headingValue)) ? normalizeHeadingDegrees2(headingValue) : Number.isFinite(Number(yawValue)) ? milliRadiansToDegrees2(yawValue) : null;
      headingBadge.textContent = Number.isFinite(heading) ? `${this.t("heading")}: ${Math.round(normalizeSignedDegrees(heading))}°` : `${this.t("heading")}: -`;
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
      this.createCommandTile(this.t("dockEdgeLabel"), this.t("dockEdgeSub"), "dock-edge")
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
      this.createSwitchControl(this.t("customCutDirection"), "customDirection")
    );
    body.appendChild(grid);
  }
  updateCloudStatus(attributes = {}) {
    const cloudConnected = attributes.cloud_connected;
    const robotOnline = attributes.robot_online;
    const mqttConnected = attributes.live_shadow_connected;
    const state = cloudConnected === false || mqttConnected === false ? "offline" : robotOnline === true ? "online" : "waiting";
    const baseText = cloudConnected === false ? this.t("cloudDisconnected") : robotOnline === true ? this.t("cloudRobotOnline") : cloudConnected === true ? this.t("cloudRobotNoResponse") : this.t("cloudChecking");
    const mqttText = typeof mqttConnected === "boolean" ? ` · MQTT: ${mqttConnected ? "online" : "offline"}` : "";
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
      this.createMapOverlaySwitch(this.t("showNoGoLabels"), "showNoGoLabels")
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
      [this.t("error"), "errorDescription"]
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
      [this.t("lastUpdate"), "shadowUpdated"]
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
      recordsError
    );
    body.appendChild(history);
    const errors = this.createSettingsSection(this.t("errorHistory"), "error-history");
    errors.querySelector(".settings-section-body").innerHTML = `<pre>${escapeHtml2(JSON.stringify(attrs.error_history || [], null, 2))}</pre>`;
    body.appendChild(errors);
  }
  renderMowingHistoryList(container, recordsPayload, recordsError) {
    container.innerHTML = "";
    const records = Array.isArray(recordsPayload?.data) ? recordsPayload.data : Array.isArray(recordsPayload) ? recordsPayload : [];
    const summary = this.buildMowingHistorySummary(recordsPayload);
    if (summary) container.appendChild(summary);
    if (!records.length) {
      const empty = document.createElement("div");
      empty.className = "mowing-history-empty";
      empty.textContent = recordsError ? `${this.t("mowingHistoryEmpty")} (${recordsError})` : this.t("mowingHistoryEmpty");
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
    if (total === void 0 && totalArea === void 0) return null;
    const summary = document.createElement("div");
    summary.className = "mowing-history-summary";
    const items = [];
    if (total !== void 0) items.push([this.t("mowingHistoryTotalCount"), String(total)]);
    if (totalArea !== void 0) items.push([this.t("mowingHistoryTotalArea"), formatRecordArea(totalArea)]);
    for (const [label, value] of items) {
      const item = document.createElement("div");
      item.className = "mowing-history-summary-item";
      item.innerHTML = `<span>${escapeHtml2(label)}</span><strong>${escapeHtml2(value)}</strong>`;
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
    head.innerHTML = `<strong>${escapeHtml2(this.formatMowingDateRange(start, end))}</strong>`;
    card.appendChild(head);
    let durationSeconds = null;
    if (start && end) {
      durationSeconds = (end.getTime() - start.getTime()) / 1e3;
    } else if (rawDuration !== void 0) {
      durationSeconds = normalizeRecordDurationSeconds(rawDuration, durationEntry?.key);
    }
    const statItems = [];
    if (area !== void 0) statItems.push([this.t("mowingHistoryArea"), formatRecordArea(area)]);
    if (percent !== void 0) {
      const pct = formatRecordPercent(percent);
      if (pct) statItems.push([this.t("mowingHistoryProgress"), pct]);
    }
    if (durationSeconds !== null) {
      statItems.push([this.t("mowingHistoryDuration"), formatRecordDurationSeconds(durationSeconds)]);
    }
    if (mode !== void 0) statItems.push([this.t("mowingHistoryMode"), this.formatRecordMode(mode)]);
    if (source !== void 0) statItems.push([this.t("mowingHistoryStartedBy"), this.formatRecordSource(source)]);
    if (statItems.length) {
      const stats = document.createElement("div");
      stats.className = "mowing-history-stats";
      for (const [label, value] of statItems) {
        const stat = document.createElement("div");
        stat.className = "mowing-history-stat";
        stat.innerHTML = `<span>${escapeHtml2(label)}</span><strong>${escapeHtml2(String(value))}</strong>`;
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
        if (width !== void 0 && height !== void 0) {
          dims = `${formatRecordNumber(width)}m × ${formatRecordNumber(height)}m`;
        } else if (zoneArea !== void 0) {
          dims = formatRecordArea(zoneArea);
        }
        const chip = document.createElement("div");
        chip.className = "mowing-history-zone-chip";
        chip.innerHTML = `<strong>${escapeHtml2(zoneName ? String(zoneName) : this.t("zone"))}</strong>${dims ? `<span>${escapeHtml2(dims)}</span>` : ""}`;
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
      details.innerHTML = `<summary>${this.t("mowingHistoryRawFields")}</summary><pre>${escapeHtml2(JSON.stringify(extra, null, 2))}</pre>`;
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
        <div class="mowing-record-detail-title">${escapeHtml2(titleText)}</div>
        <button type="button" class="mowing-record-detail-close" aria-label="${escapeHtml2(this.t("close"))}">×</button>
      </div>
      <div class="mowing-record-detail-body">
        <div class="mowing-record-detail-status">${escapeHtml2(this.t("mowingHistoryDetailLoading"))}</div>
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
      const result = await this._hass.connection.sendMessagePromise({
        type: "call_service",
        domain: "anthbot_map",
        service: "get_mowing_record_detail",
        service_data: serviceData,
        return_response: true
      });
      const detail = result?.response || {};
      const anchorMetersX = Number(pickRecordValue(record, MOWING_RECORD_START_X_KEYS));
      const anchorMetersY = Number(pickRecordValue(record, MOWING_RECORD_START_Y_KEYS));
      const anchor = {
        x: Number.isFinite(anchorMetersX) ? anchorMetersX * 1e3 : 0,
        y: Number.isFinite(anchorMetersY) ? anchorMetersY * 1e3 : 0
      };
      const backgroundImage = this.config?.image ? await loadImageElement(this.config.image) : null;
      const mobileViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;
      const mobileRotation = mobileViewport ? Number(this.config.mobile_map_rotation ?? this.config.mobileMapRotation ?? 90) || 0 : 0;
      const rotation = degreesToRadians2((Number(this.config.rotation) || 0) + mobileRotation);
      const liveAttributes = this.entity?.attributes || {};
      const liveMapSource = {
        ...liveAttributes.area_definition || {},
        map_raster: liveAttributes.map_raster,
        map_definition: liveAttributes.map_definition,
        path_definition: liveAttributes.path_definition,
        map_binary_paths: liveAttributes.map_binary_paths,
        path_binary_paths: liveAttributes.path_binary_paths
      };
      const livePose = this.computeLivePose(liveAttributes);
      const bounds = this.config?.bounds || getWorldBounds2(liveMapSource, livePose);
      const boundaryRaster = liveMapSource.map_raster;
      const boundaryPaths = getBoundaryPaths2(liveMapSource);
      const liveCanvas = this.renderer?.canvas;
      const liveDpr = this.renderer?.dpr || 1;
      const canvasSize = liveCanvas && liveCanvas.width > 0 && liveCanvas.height > 0 ? { width: liveCanvas.width / liveDpr, height: liveCanvas.height / liveDpr } : null;
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
        rotation
      });
    } catch (error) {
      body.innerHTML = `<div class="mowing-record-detail-status mowing-record-detail-error">${escapeHtml2(String(error?.message || error))}</div>`;
    }
  }
  renderMowingRecordDetailBody(body, detail, {
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
    rotation = 0
  } = {}) {
    body.innerHTML = "";
    let rendered = false;
    const pathPoints = extractDetailPathPoints(detail?.path, anchor);
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
        rotation
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
    const locale = this.language && this.language !== "auto" ? this.language : void 0;
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
    details.open = this.readOpenSettingsKey() === key || defaultOpen && !window.localStorage.getItem(this.settingsStorageKey());
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
    for (const [code, name] of LANGUAGES2) {
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
  createNumberControl(label, key, min3, max3, step, unit) {
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
      <input type="range" min="${min3}" max="${max3}" step="${step}" value="${Number.isFinite(value) ? value : min3}" ${entityId || this.hasSettingFallback(key) ? "" : "disabled"}>
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
    return zones.filter((zone) => zone?.id !== void 0 && zone?.id !== null);
  }
  rendererOptions() {
    const mobileViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;
    const mobileRotation = mobileViewport ? Number(this.config.mobile_map_rotation ?? this.config.mobileMapRotation ?? 90) || 0 : 0;
    return {
      image: this.config.image,
      bounds: this.config.bounds,
      fit: mobileViewport ? this.config.mobile_map_fit || this.config.mobileMapFit || "contain" : this.config.fit || "cover",
      rotation: degreesToRadians2((Number(this.config.rotation) || 0) + mobileRotation),
      irrigationDirectionRotationCorrection: degreesToRadians2(-2 * mobileRotation),
      calibration: this.calibration,
      robotCalibration: this.robotCalibration,
      mowingPathCalibration: this.mowingPathCalibration,
      decodedBoundaryCalibration: this.decodedBoundaryCalibration,
      robotImage: this.config.robot_image || this.config.robotImage || robot_default,
      noGoLabel: this.t("forbidden"),
      showNoGoZones: this.showNoGoZones,
      showNoGoLabels: this.showNoGoLabels,
      robotSize: mobileViewport ? this.config.mobile_robot_size ?? this.config.mobileRobotSize ?? 24 : this.config.robot_size ?? this.config.robotSize,
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
        this.irrigationCard?.heads
      ),
      irrigationDripLines: mergeSavedIrrigationItems(
        this.yamlIrrigationConfig?.drip_lines,
        this.irrigationCard?.dripLines
      ),
      irrigationZones: this.irrigationZones(),
      showIrrigationHeads: this.activeSystem === "irrigation" || this.irrigationZones().some((zone) => zone.active),
      irrigationEditMode: Boolean(this.irrigationCard?.editMode),
      irrigationSelectedHeadId: this.selectedIrrigationHeadId,
      irrigationEditType: this.irrigationEditType,
      irrigationActiveZone: Number(this.irrigationCard?.activeZone || 1),
      irrigationPendingDripStart: this.pendingDripStart
    };
  }
  startRefreshTimer() {
    if (!this._hass || this.refreshTimer || this.config.refresh_interval === 0) {
      return;
    }
    const interval = Math.max(1, Number(this.config.refresh_interval ?? this.config.refreshInterval ?? 2)) * 1e3;
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
        entity_id: this.refreshEntityIds()
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
      this.getRelatedEntity("poseYaw")?.entity_id
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
      const serviceByCommand2 = {
        start: "start_full_mow",
        stop: "stop_mow",
        dock: "return_to_dock",
        "outer-edge": "start_outer_edge_mow",
        "dock-edge": "start_dock_edge_mow"
      };
      await this.executeAnthbotButton(buttonEntity, serviceByCommand2[command]);
      return;
    }
    const serviceByCommand = {
      connect: "connect_cloud",
      start: "start_full_mow",
      stop: "stop_mow",
      dock: "return_to_dock",
      "outer-edge": "start_outer_edge_mow",
      "dock-edge": "start_dock_edge_mow"
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
        zone?.name || `${this.t("zone")} ${zone?.id || ""}`.trim()
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
      const domain = ["anthbot_map", "anthbot_genie_plus", "anthbot_ha"].find((candidate) => this._hass?.services?.[candidate]?.[service]) || "anthbot_genie_plus";
      await this._hass.callService(domain, service, {
        ...data,
        entity_id: this.activeEntityId()
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
      pointerEvents: "none"
    });
    document.body.appendChild(toast);
    window.setTimeout(() => {
      if (document.getElementById(id) === toast) toast.remove();
    }, 8e3);
  }
  commandLabel(service) {
    return {
      start_full_mow: this.t("startLabel"),
      start_zone_mow: this.t("zoneStart"),
      start_outer_edge_mow: this.t("commandOuterEdge"),
      start_dock_edge_mow: this.t("commandDockEdge"),
      stop_mow: this.t("stopLabel"),
      return_to_dock: this.t("homeLabel"),
      connect_cloud: this.t("cloud")
    }[service] || service;
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
      entity?.state
    ];
    for (const [entityId, state] of Object.entries(this._hass?.states || {})) {
      if (state?.state === "unavailable") continue;
      if (!(entityId.startsWith("lawn_mower.") || entityId.includes("mower_status") || entityId.includes("robot_status"))) continue;
      values.push(
        state.state,
        state.attributes?.mower_status,
        state.attributes?.robot_status_raw,
        state.attributes?.robot_sta?.value
      );
    }
    return values.map((value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, ""));
  }
  commandIsConfirmed(service) {
    const expected = {
      start_full_mow: ["mowing", "globalmowing", "working", "cutting", "nyiras", "funyiras"],
      start_zone_mow: ["mowing", "zonemowing", "regionmowing", "working", "cutting", "nyiras", "funyiras", "zonanyiras"],
      start_outer_edge_mow: ["mowing", "bordermowing", "edgemowing", "edgecutting", "working", "szegelynyiras"],
      start_dock_edge_mow: ["mowing", "nestmowing", "working", "tolto", "kornyekeneknyirasa"],
      stop_mow: ["paused", "pause", "standby", "idle", "charging", "charge", "docked", "szunetel", "keszenlet", "toltes", "dokkolva"],
      return_to_dock: ["returning", "backtodock", "returntodock", "docking", "charging", "charge", "docked", "visszaatoltore", "toltes", "dokkolva"]
    }[service];
    return Array.isArray(expected) && this.commandStatusValues().some(
      (status) => expected.some((value) => status.includes(value))
    );
  }
  async waitForCommandConfirmation(service, label = this.commandLabel(service), token = this.commandConfirmationToken) {
    if (service === "connect_cloud") return;
    const deadline = Date.now() + 2e4;
    while (token === this.commandConfirmationToken && Date.now() < deadline) {
      await new Promise((resolve) => window.setTimeout(resolve, 1e3));
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
      voiceVolume: ["set_voice_volume", { voice_volume: value }]
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
        enable_custom_direction: checked
      }]
    }[kind];
    if (!fallback) {
      throw new Error(`No fallback service for ${kind}`);
    }
    await this.callAnthbotService(fallback[0], fallback[1]);
    this.scheduleRefresh();
  }
  applyOptimisticNumber(kind, value, input) {
    if (Number.isFinite(value)) {
      this.optimisticSettings.set(kind, { value, until: Date.now() + 1e4 });
    }
    const tile = input?.closest(".control-tile");
    const valueLabel = tile?.querySelector(".control-head strong");
    const units = {
      mowHeight: "mm",
      mowDirection: "deg",
      rainContinue: "h",
      voiceVolume: "%"
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
        entity_id: this.activeEntityId()
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
      showNoGoLabels: this.showNoGoLabels
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
      mapOverlayOverrides: this.mapOverlayOverrides
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
      around: 180
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
        this.mowingPathCalibration
      );
    }
  }
  async copyYaml() {
    const yaml = cardToYaml(
      this.configForYaml(),
      this.calibration,
      this.robotCalibration,
      this.decodedBoundaryCalibration,
      this.mowingPathCalibration
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
      show_no_go_labels: this.showNoGoLabels
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
      dock: ["return_to_dock"]
    };
    return this.findEntity("button", suffixByCommand[command] || []);
  }
  getZoneButtonEntity(zone) {
    const configured = this.config.zoneButtons?.[zone.id] || this.config.zoneButtons?.[zone.name];
    if (this.isEntityAvailable(configured) && this.belongsToActiveRobot(configured)) {
      return configured;
    }
    const zoneId = zone.id === void 0 || zone.id === null ? null : String(zone.id);
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
      visibleNumber ? `zone_${visibleNumber}` : ""
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
        `${domain}.${base}_${suffix}_2`
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
    return String(this.activeEntityId() || this.config.entity || "").replace(/^sensor\./, "").replace(/_map(?:_\d+)?$/, "");
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
    const active = Object.entries(this._hass?.states || {}).map(([entityId, state]) => ({ entityId, state, match: entityId.match(pattern) })).filter(({ state, match }) => match && state.state !== "unavailable").sort((left, right) => Number(right.match?.[1] || 1) - Number(left.match?.[1] || 1));
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
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
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
      second: "2-digit"
    };
    const timeZone = this._hass?.config?.time_zone;
    if (timeZone) {
      options.timeZone = timeZone;
    }
    try {
      return new Intl.DateTimeFormat(this.language, options).format(date);
    } catch (_error) {
      delete options.timeZone;
      return new Intl.DateTimeFormat(void 0, options).format(date);
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
        composed: true
      })
    );
  }
};
var MOWING_RECORD_ID_KEYS = ["id", "record_id", "recordId", "task_id", "taskId", "_id"];
var MOWING_RECORD_START_KEYS = [
  "start_time",
  "startTime",
  "begin_time",
  "beginTime",
  "begin",
  "task_start_time",
  "taskStartTime",
  "create_time",
  "createTime",
  "started_at",
  "startedAt"
];
var MOWING_RECORD_END_KEYS = [
  "end_time",
  "endTime",
  "finish_time",
  "finishTime",
  "stop_time",
  "stopTime",
  "complete_time",
  "completeTime",
  "finished_at",
  "finishedAt"
];
var MOWING_RECORD_AREA_KEYS = [
  "area",
  "mow_area",
  "mowArea",
  "actual_area",
  "actualArea",
  "clean_area",
  "cleanArea",
  "cleaned_area",
  "cleanedArea",
  "real_area",
  "realArea",
  "task_area",
  "taskArea",
  "mowing_area",
  "mowingArea"
];
var MOWING_RECORD_PERCENT_KEYS = [
  "percent",
  "percentage",
  "progress",
  "complete_rate",
  "completeRate",
  "finish_rate",
  "finishRate",
  "mow_percent",
  "mowPercent",
  "task_percent",
  "taskPercent",
  "rate",
  "mowing_progress",
  "mowingProgress"
];
var MOWING_RECORD_DURATION_KEYS = [
  "duration_ms",
  "durationMs",
  "elapsed_ms",
  "elapsedMs",
  "mowing_time_ms",
  "mowingTimeMs",
  "task_time_ms",
  "taskTimeMs",
  "duration",
  "cost_time",
  "costTime",
  "time_len",
  "timeLen",
  "elapsed",
  "elapsed_time",
  "elapsedTime",
  "mowing_time",
  "mowingTime",
  "task_time",
  "taskTime",
  "work_time",
  "workTime",
  "mow_time",
  "mowTime"
];
var MOWING_RECORD_MODE_KEYS = [
  "mode",
  "mow_mode",
  "mowMode",
  "task_type",
  "taskType",
  "type",
  "task_mode",
  "taskMode"
];
var MOWING_RECORD_SOURCE_KEYS = [
  "source",
  "start_source",
  "startSource",
  "trigger",
  "task_source",
  "taskSource",
  "from",
  "start_type",
  "startType",
  "start_reason",
  "startReason",
  "start_cause",
  "startCause"
];
var MOWING_RECORD_AREA_URL_KEYS = ["area_url", "areaUrl"];
var MOWING_RECORD_MAP_URL_KEYS = ["map_url", "mapUrl"];
var MOWING_RECORD_PATH_URL_KEYS = ["path_url", "pathUrl"];
var MOWING_RECORD_START_X_KEYS = ["x", "X", "start_x", "startX"];
var MOWING_RECORD_START_Y_KEYS = ["y", "Y", "start_y", "startY"];
var MOWING_RECORD_ZONE_LIST_KEYS = [
  "zone_list",
  "zoneList",
  "zones",
  "region_list",
  "regionList",
  "area_list",
  "areaList",
  "task_zones",
  "taskZones",
  "zone_info",
  "zoneInfo"
];
var MOWING_RECORD_ZONE_NAME_KEYS = [
  "name",
  "zone_name",
  "zoneName",
  "region_name",
  "regionName",
  "area_name",
  "areaName",
  "title"
];
var MOWING_RECORD_ZONE_WIDTH_KEYS = ["width", "w", "zone_width", "zoneWidth"];
var MOWING_RECORD_ZONE_HEIGHT_KEYS = [
  "height",
  "h",
  "zone_height",
  "zoneHeight",
  "length",
  "zone_length",
  "zoneLength"
];
var MOWING_RECORD_ZONE_AREA_KEYS = ["area", "zone_area", "zoneArea", "actual_area", "actualArea", "size"];
var MOWING_RECORD_MAPPED_KEYS = [
  ...MOWING_RECORD_ID_KEYS,
  ...MOWING_RECORD_START_KEYS,
  ...MOWING_RECORD_END_KEYS,
  ...MOWING_RECORD_AREA_KEYS,
  ...MOWING_RECORD_PERCENT_KEYS,
  ...MOWING_RECORD_DURATION_KEYS,
  ...MOWING_RECORD_MODE_KEYS,
  ...MOWING_RECORD_SOURCE_KEYS,
  ...MOWING_RECORD_ZONE_LIST_KEYS
];
function mowedZoneInfoFromRecord(record) {
  const zoneListRaw = pickRecordValue(record, MOWING_RECORD_ZONE_LIST_KEYS);
  const zoneList = Array.isArray(zoneListRaw) ? zoneListRaw : [];
  const info = /* @__PURE__ */ new Map();
  for (const zone of zoneList) {
    const zoneName = pickRecordValue(zone, MOWING_RECORD_ZONE_NAME_KEYS);
    if (!zoneName) continue;
    const width = pickRecordValue(zone, MOWING_RECORD_ZONE_WIDTH_KEYS);
    const height = pickRecordValue(zone, MOWING_RECORD_ZONE_HEIGHT_KEYS);
    const zoneArea = pickRecordValue(zone, MOWING_RECORD_ZONE_AREA_KEYS);
    let dims = "";
    if (width !== void 0 && height !== void 0) {
      dims = `${formatRecordNumber(width)}m × ${formatRecordNumber(height)}m`;
    } else if (zoneArea !== void 0) {
      dims = formatRecordArea(zoneArea);
    }
    info.set(String(zoneName).trim().toLowerCase(), { name: String(zoneName), dims });
  }
  return info;
}
function pickRecordValue(record, keys) {
  if (!record || typeof record !== "object") return void 0;
  for (const key of keys) {
    const value = record[key];
    if (value !== void 0 && value !== null && value !== "") return value;
  }
  return void 0;
}
function pickRecordEntry(record, keys) {
  if (!record || typeof record !== "object") return null;
  for (const key of keys) {
    const value = record[key];
    if (value !== void 0 && value !== null && value !== "") return { key, value };
  }
  return null;
}
function collectUnmappedRecordKeys(record, mappedKeys) {
  if (!record || typeof record !== "object") return [];
  const mapped = new Set(mappedKeys);
  return Object.keys(record).filter((key) => !mapped.has(key));
}
function parseRecordTimestamp(value) {
  if (value === void 0 || value === null || value === "") return null;
  if (typeof value === "number") {
    const ms = value > 1e10 ? value : value * 1e3;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{14}$/.test(trimmed)) {
      const year = trimmed.slice(0, 4), month = trimmed.slice(4, 6), day = trimmed.slice(6, 8);
      const hour = trimmed.slice(8, 10), minute = trimmed.slice(10, 12), second = trimmed.slice(12, 14);
      const date2 = new Date(Date.UTC(+year, +month - 1, +day, +hour, +minute, +second));
      return Number.isNaN(date2.getTime()) ? null : date2;
    }
    if (/^\d+$/.test(trimmed)) return parseRecordTimestamp(Number(trimmed));
    let isoCandidate = trimmed.replace(" ", "T");
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(isoCandidate)) {
      isoCandidate += "Z";
    }
    const date = new Date(isoCandidate);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}
function rasterColorForRecordDetail(value) {
  if (value === 255) return [248, 250, 252, 255];
  if (value === 160) return [158, 166, 174, 255];
  if (value === 128) return [117, 125, 133, 255];
  if (value === 0) return [25, 32, 42, 255];
  const shade = Math.max(0, Math.min(255, Number(value) || 0));
  return [shade, shade, shade, 255];
}
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
var DETAIL_PATH_MOWED_TYPES = /* @__PURE__ */ new Set([1, 2, 5, 8]);
var DETAIL_PATH_JUMP_LIMIT_MM = 2500;
function isDetailPathMowedPoint(point, hasKnownMowedTypes) {
  return !hasKnownMowedTypes || DETAIL_PATH_MOWED_TYPES.has(Number(point?.type));
}
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
function buildDetailPathSegments(points, jumpLimit) {
  const segments = [];
  let segment = [];
  let previous = null;
  const hasKnownMowedTypes = points.some(
    (point) => DETAIL_PATH_MOWED_TYPES.has(Number(point?.type))
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
  const resolutionMm = resolution * 1e3;
  if (!Number.isFinite(resolutionMm) || resolutionMm <= 0) return null;
  const x = (point.x - minX) / resolutionMm;
  const y = height - 1 - (point.y - minY) / resolutionMm;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}
function drawDetailPathOnRasterCanvas(canvas, raster, pathPoints) {
  if (!canvas || !pathPoints.length) return false;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const segments = buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM).map((segment) => segment.map((point) => projectWorldPointToRasterPixel(point, raster)).filter(Boolean)).filter((segment) => segment.length >= 2);
  if (!segments.length) return false;
  const strokeWidth = Math.max(2, canvas.width * 0.012);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [color, width] of [
    ["rgba(82, 94, 245, 0.55)", strokeWidth],
    ["rgba(220, 226, 255, 0.7)", Math.max(1, strokeWidth * 0.35)]
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
function worldToScreenWithExtraCalibration(geometry, calibration, point) {
  const mapPoint = geometry.worldToMap(point);
  return geometry.mapToScreenWithLayerCalibration(mapPoint, calibration);
}
function renderMowingRecordZonesSvg(areaDefinition, pathPoints = [], mowedZoneInfo = null, {
  backgroundImage = null,
  calibration = null,
  decodedBoundaryCalibration = null,
  bounds: resolvedBounds = null,
  boundaryRaster = null,
  boundaryPaths = null,
  canvasSize = null,
  fit = "cover",
  rotation = 0
} = {}) {
  const zones = getZones2(areaDefinition, ["custom_areas", "zones", "customAreas", "ridable_areas"]);
  const zonePolygons = zones.map((zone) => ({ zone, points: getZonePoints2(zone) })).filter((entry) => entry.points.length >= 3);
  if (!zonePolygons.length) return null;
  const bounds = resolvedBounds || getWorldBounds2(areaDefinition, null);
  const sourceWidth = Number(backgroundImage?.naturalWidth || backgroundImage?.width) || 0;
  const sourceHeight = Number(backgroundImage?.naturalHeight || backgroundImage?.height) || 0;
  const hasImage = Boolean(backgroundImage && sourceWidth > 0 && sourceHeight > 0);
  const photoRatio = hasImage ? sourceWidth / sourceHeight : void 0;
  let size;
  let fitMode;
  if (canvasSize && canvasSize.width > 0 && canvasSize.height > 0) {
    size = { width: canvasSize.width, height: canvasSize.height };
    fitMode = fit || "cover";
  } else {
    const rawWorldRatio = (bounds.maxX - bounds.minX) / (bounds.maxY - bounds.minY);
    const worldRatio = Number.isFinite(rawWorldRatio) && rawWorldRatio > 0 ? rawWorldRatio : 1;
    const fitRatio = Number.isFinite(photoRatio) && photoRatio > 0 ? photoRatio : worldRatio;
    size = { width: 1e3, height: Math.max(1, 1e3 / fitRatio) };
    fitMode = "contain";
  }
  const view = { rotation: Number(rotation) || 0 };
  const geometryOptions = { bounds, width: size.width, height: size.height, view, aspectRatio: photoRatio, fit: fitMode };
  const baseGeometry = createGeometry2({ ...geometryOptions, calibration: {} });
  const geometry = createGeometry2({ ...geometryOptions, calibration });
  const project = (point) => geometry.worldToScreen(point);
  const MOWED_STROKE = "#4d4ed6";
  const NEUTRAL_FILL = "#8b8fdb";
  const NEUTRAL_STROKE = "#9598e0";
  const fontSize = Math.max(size.width, size.height) * 0.026;
  const dimsFontSize = Math.max(size.width, size.height) * 0.013;
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
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
  const defs = document.createElementNS(svgNs, "defs");
  svg.appendChild(defs);
  const coverageSegments = pathPoints.length ? buildDetailPathSegments(pathPoints, DETAIL_PATH_JUMP_LIMIT_MM) : [];
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
    poly.setAttribute("stroke-width", String(Math.max(size.width, size.height) * 4e-3));
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
          segment.map((p) => {
            const s = project(p);
            return `${s.x},${s.y}`;
          }).join(" ")
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
      for (const p of screenPoints) {
        cx += p.x;
        cy += p.y;
      }
      cx /= screenPoints.length;
      cy /= screenPoints.length;
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
          dims = `${((zMaxX - zMinX) / 1e3).toFixed(1)}m × ${((zMaxY - zMinY) / 1e3).toFixed(1)}m`;
        }
      }
      const textOutline = String(Math.max(size.width, size.height) * 25e-4);
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
  const noGoZones = getZones2(areaDefinition, [
    "forbid_areas",
    "forbidAreas",
    "remote_forbid_areas",
    "remoteForbidAreas",
    "no_go_areas",
    "noGoAreas"
  ]);
  const noGoPolygons = noGoZones.map((zone) => ({ zone, points: getZonePoints2(zone) })).filter((entry) => entry.points.length >= 3);
  const NO_GO_FILL = "rgba(244, 67, 54, 0.38)";
  const NO_GO_STROKE = "rgba(255, 82, 82, 1)";
  noGoPolygons.forEach(({ zone, points }) => {
    const screenPoints = points.map(project);
    const poly = document.createElementNS(svgNs, "polygon");
    poly.setAttribute("points", screenPoints.map((p) => `${p.x},${p.y}`).join(" "));
    poly.setAttribute("fill", NO_GO_FILL);
    poly.setAttribute("stroke", NO_GO_STROKE);
    poly.setAttribute("stroke-width", String(Math.max(size.width, size.height) * 4e-3));
    svg.appendChild(poly);
    const rawName = zone?.name || zone?.label;
    const label = rawName && !/^zone\s*\d+$/i.test(String(rawName)) ? String(rawName) : "No-go";
    let cx = 0, cy = 0;
    for (const p of screenPoints) {
      cx += p.x;
      cy += p.y;
    }
    cx /= screenPoints.length;
    cy /= screenPoints.length;
    const textOutline = String(Math.max(size.width, size.height) * 25e-4);
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
  const boundaryWidth = Math.max(size.width, size.height) * 6e-3;
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
  const rasterBoundaryD = boundaryRaster && boundaryRaster.bounds ? buildRasterBoundaryPathD(
    boundaryRaster,
    boundaryRaster.bounds,
    (point) => worldToScreenWithExtraCalibration(geometry, decodedBoundaryCalibration, point)
  ) : null;
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
  const minutes = Math.floor(total % 3600 / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;
}
function normalizeRecordDurationSeconds(rawDuration, sourceKey = "") {
  if (rawDuration === void 0 || rawDuration === null || rawDuration === "") return null;
  const rawNum = Number(rawDuration);
  if (Number.isNaN(rawNum)) return null;
  return /(?:_ms|Ms)$/.test(String(sourceKey)) ? rawNum / 1e3 : rawNum;
}
function resolveMowingRecordTimeRange(record) {
  const end = parseRecordTimestamp(pickRecordValue(record, MOWING_RECORD_END_KEYS));
  let start = parseRecordTimestamp(pickRecordValue(record, MOWING_RECORD_START_KEYS));
  if (!start && end) {
    const durationEntry = pickRecordEntry(record, MOWING_RECORD_DURATION_KEYS);
    const durationSeconds = normalizeRecordDurationSeconds(durationEntry?.value, durationEntry?.key);
    if (durationSeconds !== null && durationSeconds > 0) {
      start = new Date(end.getTime() - durationSeconds * 1e3);
    }
  }
  return { start, end };
}
function degreesToRadians2(degrees) {
  return degrees * Math.PI / 180;
}
function milliRadiansToDegrees2(value) {
  return Number(value) * 180 / (Math.PI * 1e3);
}
function normalizeHeadingDegrees2(value) {
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
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
enhanceGardenAnthbot(GardenMapCard);
if (!customElements.get(GARDEN_CARD_TAG)) {
  customElements.define(GARDEN_CARD_TAG, GardenMapCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: GARDEN_CARD_TAG,
  name: "Garden Map Card",
  description: "Közös Anthbot és locsolórendszer térképkártya – v166"
});
