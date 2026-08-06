const DEFAULT_ZONES = [
  { id: 1, name: "Zona 1", entity: "switch.ontozovezerlo_zona_1", color: "#38bdf8" },
  { id: 2, name: "Zona 2", entity: "switch.ontozovezerlo_zona_2", color: "#22c55e" },
  { id: 3, name: "Zona 3", entity: "switch.ontozovezerlo_zona_3", color: "#f59e0b" },
  { id: 4, name: "Zona 4", entity: "switch.ontozovezerlo_zona_4", color: "#a855f7" },
  { id: 5, name: "Fenyő kapu", entity: "switch.kerticsap_kapu_fenyo", color: "#ef4444" },
];

const SCHEDULER_ENTITIES = {
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
  programs: Array.from({ length: 8 }, (_, index) => `input_text.irrigation_program_${index + 1}`),
};

const DEFAULT_PUMP_ENTITIES = {
  power: "sensor.szivattyu_szivattyu_teljesitmeny",
  current: "sensor.szivattyu_szivattyu_aramfelvetel",
  voltage: "sensor.szivattyu_feszultseg",
};

const LANGUAGES = [
  ["auto", "Automatic / Automatikus"], ["en", "English"], ["hu", "Magyar"],
  ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"], ["it", "Italiano"],
  ["pt", "Português"], ["nl", "Nederlands"], ["pl", "Polski"], ["cs", "Čeština"],
  ["sk", "Slovenčina"], ["ro", "Română"], ["da", "Dansk"], ["sv", "Svenska"],
  ["no", "Norsk"], ["fi", "Suomi"], ["zh-CN", "简体中文"], ["zh-TW", "繁體中文"],
  ["tr", "Türkçe"], ["th", "ไทย"], ["vi", "Tiếng Việt"], ["ko", "한국어"], ["km", "ខ្មែរ"],
];

const EN = {
  title:"Irrigation system", subtitle:"Map-based irrigation zone control", editHint:"Select a zone and click the map to add a sprinkler. Click an existing sprinkler to delete it.",
  markHeads:"Mark sprinklers", done:"Done", noIrrigation:"No irrigation in progress", save:"Save", startNow:"Start now", stop:"Stop",
  schedule:"Irrigation schedule", yamlExport:"YAML export", copyYaml:"Copy YAML", running:"running", off:"off", manualTime:"Manual time",
  minutes:"minutes", savedSchedules:"Saved schedules", newSchedule:"New schedule", noSchedules:"No saved schedules yet.", start:"Start",
  edit:"Edit", delete:"Delete", noDay:"No selected day", noZone:"No selected zone", back:"Back", editSchedule:"Edit schedule",
  name:"Name", enabled:"Schedule enabled", begins:"Start time", cycle:"Cycle", weekly:"Weekly cycle", odd:"Odd days", even:"Even days",
  zonesOrder:"Zones, duration and order", time:"Time", order:"Order", remaining:"remaining time", loading:"Loading image...",
  language:"Language", automatic:"Automatic", selectSchedule:"Select a schedule or create a new one.", chooseSchedule:"Select the schedule to start.",
  noEnabledSchedule:"No enabled schedule.", saved:"Schedule saved.", stopped:"Irrigation stopped.", copied:"YAML copied to clipboard.", settings:"Settings", settingsHelp:"Automatic follows the Home Assistant language. A manually selected language is remembered in this browser.",
  pump:"Pump", pumpRunning:"RUNNING", pumpStarting:"STARTING…", pumpStopping:"STOPPING…", pumpFailed:"FAILED TO START", pumpStopped:"STOPPED", power:"Power", current:"Current", voltage:"Voltage",
  rainSensor:"Rain sensor", rainNow:"Rain detected", noRain:"No rain", rainDelay:"Delay after rain", rainMinimum:"Minimum rain duration", rainDelayRemaining:"Irrigation lock remaining",
};
const HU = {
  title:"Locsolórendszer", subtitle:"Térképes locsolózóna-vezérlés", editHint:"Válassz zónát, majd kattints a térképre új fejhez. Egy meglévő fejre kattintva törölheted.",
  markHeads:"Fejek jelölése", done:"Jelölés kész", noIrrigation:"Nincs folyamatban öntözés", save:"Mentés", startNow:"Indítás most", stop:"Leállítás",
  schedule:"Öntözési időzítés", yamlExport:"YAML export", copyYaml:"YAML másolása", running:"megy", off:"kikapcsolva", manualTime:"Kézi idő",
  minutes:"perc", savedSchedules:"Elmentett időzítések", newSchedule:"Új időzítés", noSchedules:"Még nincs elmentett időzítés.", start:"Indítás",
  edit:"Szerkesztés", delete:"Törlés", noDay:"Nincs kiválasztott nap", noZone:"Nincs kiválasztott zóna", back:"Vissza", editSchedule:"Időzítés szerkesztése",
  name:"Név", enabled:"Időzítés engedélyezve", begins:"Kezdés", cycle:"Ciklus", weekly:"Heti ciklus", odd:"Páratlan nap", even:"Páros nap",
  zonesOrder:"Zónák, időtartam és sorrend", time:"Idő", order:"Sorrend", remaining:"hátralévő idő", loading:"Kép betöltése...",
  language:"Nyelv", automatic:"Automatikus", selectSchedule:"Válassz egy időzítést, vagy hozz létre újat.", chooseSchedule:"Válaszd ki az indítandó időzítést.",
  noEnabledSchedule:"Nincs engedélyezett időzítés.", saved:"Időzítés elmentve.", stopped:"Öntözés leállítva.", copied:"YAML a vágólapra másolva.", settings:"Beállítások", settingsHelp:"Az Automatikus beállítás a Home Assistant nyelvét követi. A kézzel kiválasztott nyelv ezen a böngészőn megmarad.",
  pump:"Szivattyú", pumpRunning:"MEGY", pumpStarting:"INDUL…", pumpStopping:"LEÁLL…", pumpFailed:"NEM INDULT", pumpStopped:"ÁLL", power:"Teljesítmény", current:"Áramfelvétel", voltage:"Feszültség",
  rainSensor:"Esőszenzor", rainNow:"Esőt érzékel", noRain:"Nem esik", rainDelay:"Eső utáni várakozás", rainMinimum:"Tiltáshoz szükséges esőidő", rainDelayRemaining:"Locsolási tiltás hátralévő ideje",
};
const CORE = {
  de:{title:"Bewässerungssystem",subtitle:"Kartenbasierte Zonensteuerung",save:"Speichern",startNow:"Jetzt starten",stop:"Stoppen",schedule:"Bewässerungsplan",running:"läuft",off:"aus",language:"Sprache"},
  fr:{title:"Système d’irrigation",subtitle:"Commande des zones sur carte",save:"Enregistrer",startNow:"Démarrer",stop:"Arrêter",schedule:"Programmation",running:"en cours",off:"arrêt",language:"Langue"},
  es:{title:"Sistema de riego",subtitle:"Control de zonas mediante mapa",save:"Guardar",startNow:"Iniciar ahora",stop:"Detener",schedule:"Programación",running:"activo",off:"apagado",language:"Idioma"},
  it:{title:"Sistema di irrigazione",subtitle:"Controllo zone su mappa",save:"Salva",startNow:"Avvia ora",stop:"Arresta",schedule:"Programmazione",running:"attivo",off:"spento",language:"Lingua"},
  pt:{title:"Sistema de irrigação",save:"Guardar",startNow:"Iniciar agora",stop:"Parar",schedule:"Programação",running:"ativo",off:"desligado",language:"Idioma"},
  nl:{title:"Irrigatiesysteem",save:"Opslaan",startNow:"Nu starten",stop:"Stoppen",schedule:"Planning",running:"actief",off:"uit",language:"Taal"},
  pl:{title:"System nawadniania",save:"Zapisz",startNow:"Uruchom teraz",stop:"Zatrzymaj",schedule:"Harmonogram",running:"działa",off:"wyłączone",language:"Język"},
  cs:{title:"Zavlažovací systém",save:"Uložit",startNow:"Spustit nyní",stop:"Zastavit",schedule:"Plánování",running:"běží",off:"vypnuto",language:"Jazyk"},
  sk:{title:"Zavlažovací systém",save:"Uložiť",startNow:"Spustiť teraz",stop:"Zastaviť",schedule:"Plánovanie",running:"beží",off:"vypnuté",language:"Jazyk"},
  ro:{title:"Sistem de irigații",save:"Salvează",startNow:"Pornește acum",stop:"Oprește",schedule:"Programare",running:"activ",off:"oprit",language:"Limbă"},
  da:{title:"Vandingssystem",save:"Gem",startNow:"Start nu",stop:"Stop",schedule:"Tidsplan",running:"kører",off:"slukket",language:"Sprog"},
  sv:{title:"Bevattningssystem",save:"Spara",startNow:"Starta nu",stop:"Stoppa",schedule:"Schema",running:"kör",off:"av",language:"Språk"},
  no:{title:"Vanningssystem",save:"Lagre",startNow:"Start nå",stop:"Stopp",schedule:"Tidsplan",running:"kjører",off:"av",language:"Språk"},
  fi:{title:"Kastelujärjestelmä",save:"Tallenna",startNow:"Käynnistä nyt",stop:"Pysäytä",schedule:"Ajastus",running:"käynnissä",off:"pois",language:"Kieli"},
  "zh-CN":{title:"灌溉系统",save:"保存",startNow:"立即启动",stop:"停止",schedule:"灌溉计划",running:"运行中",off:"关闭",language:"语言"},
  "zh-TW":{title:"灌溉系統",save:"儲存",startNow:"立即啟動",stop:"停止",schedule:"灌溉排程",running:"運行中",off:"關閉",language:"語言"},
  tr:{title:"Sulama sistemi",subtitle:"Harita tabanlı sulama bölgesi kontrolü",editHint:"Bir bölge seçin, ardından sprinklerin haritadaki konumuna tıklayın",markHeads:"Sprinklerleri işaretle",done:"İşaretleme tamam",noIrrigation:"Sulama işlemi yok",save:"Kaydet",startNow:"Şimdi başlat",stop:"Durdur",schedule:"Sulama programı",yamlExport:"YAML dışa aktar",copyYaml:"YAML'ı kopyala",running:"çalışıyor",off:"kapalı",manualTime:"Manuel süre",minutes:"dakika",savedSchedules:"Kayıtlı programlar",newSchedule:"Yeni program",noSchedules:"Henüz kayıtlı program yok.",start:"Başlat",edit:"Düzenle",delete:"Sil",noDay:"Gün seçilmedi",noZone:"Bölge seçilmedi",back:"Geri",editSchedule:"Programı düzenle",name:"Ad",enabled:"Program etkin",begins:"Başlangıç",cycle:"Döngü",weekly:"Haftalık döngü",odd:"Tek günler",even:"Çift günler",zonesOrder:"Bölgeler, süre ve sıra",time:"Süre",order:"Sıra",remaining:"kalan süre",loading:"Resim yükleniyor...",language:"Dil",automatic:"Otomatik",selectSchedule:"Bir program seçin veya yeni bir tane oluşturun.",chooseSchedule:"Başlatılacak programı seçin.",noEnabledSchedule:"Etkin program yok.",saved:"Program kaydedildi.",stopped:"Sulama durduruldu.",copied:"YAML panoya kopyalandı."},
  th:{title:"ระบบชลประทาน",save:"บันทึก",startNow:"เริ่มตอนนี้",stop:"หยุด",schedule:"ตารางรดน้ำ",running:"กำลังทำงาน",off:"ปิด",language:"ภาษา"},
  vi:{title:"Hệ thống tưới",save:"Lưu",startNow:"Bắt đầu ngay",stop:"Dừng",schedule:"Lịch tưới",running:"đang chạy",off:"tắt",language:"Ngôn ngữ"},
  ko:{title:"관개 시스템",save:"저장",startNow:"지금 시작",stop:"정지",schedule:"관개 일정",running:"작동 중",off:"꺼짐",language:"언어"},
  km:{title:"ប្រព័ន្ធស្រោចស្រព",save:"រក្សាទុក",startNow:"ចាប់ផ្តើមឥឡូវ",stop:"បញ្ឈប់",schedule:"កាលវិភាគស្រោចស្រព",running:"កំពុងដំណើរការ",off:"បិទ",language:"ភាសា"},
};

// Complete UI translations. These replace the earlier compact starter tables.
CORE["de"] = {"title":"Bewässerungssystem","subtitle":"Kartenbasierte Bewässerungszonensteuerung","editHint":"Wählen Sie eine Zone aus und klicken Sie dann auf die Sprinklerposition auf der Karte.","markHeads":"Sprinkler markieren","done":"Fertig","noIrrigation":"Keine Bewässerung aktiv","save":"Speichern","startNow":"Jetzt starten","stop":"Stoppen","schedule":"Bewässerungsplan","yamlExport":"YAML-Export","copyYaml":"YAML kopieren","running":"Läuft","off":"Aus","manualTime":"Manuelle Zeit","minutes":"Minuten","savedSchedules":"Gespeicherte Zeitpläne","newSchedule":"Neuer Zeitplan","noSchedules":"Noch keine gespeicherten Zeitpläne.","start":"Start","edit":"Bearbeiten","delete":"Löschen","noDay":"Kein Tag ausgewählt","noZone":"Keine Zone ausgewählt","back":"Zurück","editSchedule":"Bewässerungsplan bearbeiten","name":"Name","enabled":"Bewässerungsplan aktiviert","begins":"Startzeit","cycle":"Zyklus","weekly":"Wochenzyklus","odd":"Ungerade Tage","even":"Gerade Tage","zonesOrder":"Zonen, Dauer und Reihenfolge","time":"Uhrzeit","order":"Reihenfolge","remaining":"Verbleibende Zeit","loading":"Bild wird geladen…","language":"Sprache","automatic":"Automatisch","selectSchedule":"Bewässerungsplan auswählen oder neuen erstellen.","chooseSchedule":"Zu startenden Bewässerungsplan auswählen.","noEnabledSchedule":"Kein Bewässerungsplan aktiviert.","saved":"Bewässerungsplan gespeichert.","stopped":"Bewässerung gestoppt.","copied":"YAML-Datei in die Zwischenablage kopiert.","settings":"Einstellungen","settingsHelp":"Die automatische Sprachauswahl passt sich der Sprache von Home Assistant an. Eine manuell ausgewählte Sprache wird in diesem Browser gespeichert.","pump":"Pumpe","pumpRunning":"LÄUFT","pumpStarting":"STARTET…","pumpStopping":"STOPPT…","pumpFailed":"START FEHLGESCHLAGEN","pumpStopped":"STOPPET","power":"Stromversorgung","current":"Stromstärke","voltage":"Spannung"};
CORE["fr"] = {"title":"Système d'irrigation","subtitle":"Contrôle des zones d'irrigation par carte","editHint":"Sélectionnez une zone, puis cliquez sur l'emplacement de l'arroseur sur la carte","markHeads":"Marquer les arroseurs","done":"Terminé","noIrrigation":"Aucune irrigation en cours","save":"Enregistrer","startNow":"Démarrer maintenant","stop":"Arrêter","schedule":"Programmation d'irrigation","yamlExport":"Exportation YAML","copyYaml":"Copier le fichier YAML","running":"En cours","off":"Arrêté","manualTime":"Durée manuelle","minutes":"Minutes","savedSchedules":"Programmations enregistrées","newSchedule":"Nouvelle programmation","noSchedules":"Aucune programmation enregistrée.","start":"Démarrer","edit":"Modifier","delete":"Supprimer","noDay":"Aucun jour sélectionné","noZone":"Aucune zone sélectionnée","back":"Retour","editSchedule":"Modifier la programmation","name":"Nom","enabled":"Programmation activée","begins":"Heure de début","cycle":"Cycle","weekly":"Cycle hebdomadaire","odd":"Jours impairs","even":"Jours pairs","zonesOrder":"Zones, durée et ordre","time":"Heure","order":"Ordre","remaining":"Temps restant","loading":"Chargement de l'image...","language":"Langue","automatic":"Automatique","selectSchedule":"Sélectionnez une programmation ou créez-en une nouvelle.","chooseSchedule":"Sélectionnez la programmation à démarrer.","noEnabledSchedule":"Aucune programmation activée.","saved":"Programmation enregistrée.","stopped":"Arrosage arrêté.","copied":"Fichier YAML copié dans le presse-papiers.","settings":"Paramètres","settingsHelp":"Automatique : utilise la langue de Home Assistant. La langue sélectionnée manuellement est mémorisée dans ce navigateur.","pump":"Pompe","pumpRunning":"EN MARCHE","pumpStarting":"DÉMARRAGE…","pumpStopping":"ARRÊT…","pumpFailed":"ÉCHEC DU DÉMARRAGE","pumpStopped":"ARRÊTÉ","power":"Alimentation","current":"Courant","voltage":"Tension"};
CORE["es"] = {"title":"Sistema de riego","subtitle":"Control de zonas de riego basado en mapa","editHint":"Seleccione una zona y haga clic en la posición del aspersor en el mapa","markHeads":"Marcar aspersores","done":"Listo","noIrrigation":"No hay riego en curso","save":"Guardar","startNow":"Iniciar ahora","stop":"Detener","schedule":"Programación de riego","yamlExport":"Exportar YAML","copyYaml":"Copiar YAML","running":"En funcionamiento","off":"Apagado","manualTime":"Tiempo manual","minutes":"Minutos","savedSchedules":"Programaciones guardadas","newSchedule":"Nueva programación","noSchedules":"Aún no hay programaciones guardadas.","start":"Inicio","edit":"Editar","delete":"Eliminar","noDay":"No se ha seleccionado ningún día","noZone":"No se ha seleccionado ninguna zona","back":"Atrás","editSchedule":"Editar horario","name":"Nombre","enabled":"Horario habilitado","begins":"Hora de inicio","cycle":"Ciclo","weekly":"Ciclo semanal","odd":"Días impares","even":"Días pares","zonesOrder":"Zonas, duración y orden","time":"Hora","order":"Orden","remaining":"Tiempo restante","loading":"Cargando imagen...","language":"Idioma","automatic":"Automático","selectSchedule":"Seleccione un horario o cree uno nuevo.","chooseSchedule":"Seleccione el horario que desea iniciar.","noEnabledSchedule":"No hay horarios habilitados.","saved":"Horario guardado.","stopped":"Riego detenido.","copied":"YAML copiado al portapapeles.","settings":"Ajustes","settingsHelp":"El modo automático sigue el idioma de Home Assistant. El idioma seleccionado manualmente se guarda en este navegador.","pump":"Bomba","pumpRunning":"EN FUNCIONAMIENTO","pumpStarting":"INICIANDO…","pumpStopping":"DETENIENDO…","pumpFailed":"ERROR AL INICIAR","pumpStopped":"DETENIDA","power":"Potencia","current":"Corriente","voltage":"Voltaje"};
CORE["it"] = {"title":"Sistema di irrigazione","subtitle":"Controllo delle zone di irrigazione tramite mappa","editHint":"Seleziona una zona, quindi fai clic sulla posizione dell'irrigatore sulla mappa","markHeads":"Contrassegna gli irrigatori","done":"Fatto","noIrrigation":"Nessuna irrigazione in corso","save":"Salva","startNow":"Avvia ora","stop":"Interrompi","schedule":"Programma di irrigazione","yamlExport":"Esportazione YAML","copyYaml":"Copia YAML","running":"in esecuzione","off":"spento","manualTime":"Tempo manuale","minutes":"minuti","savedSchedules":"Programmi salvati","newSchedule":"Nuovo programma","noSchedules":"Nessun programma salvato al momento.","start":"Avvia","edit":"Modifica","delete":"Elimina","noDay":"Nessun giorno selezionato","noZone":"Nessuna zona selezionata","back":"Indietro","editSchedule":"Modifica programma","name":"Nome","enabled":"Programma abilitato","begins":"Ora di inizio","cycle":"Ciclo","weekly":"Ciclo settimanale","odd":"Giorni dispari","even":"Giorni pari","zonesOrder":"Zone, durata e ordine","time":"Ora","order":"Ordine","remaining":"Tempo rimanente","loading":"Caricamento immagine...","language":"Lingua","automatic":"Automatico","selectSchedule":"Seleziona un programma o creane uno nuovo.","chooseSchedule":"Seleziona il programma da avviare.","noEnabledSchedule":"Nessun programma abilitato.","saved":"Programma salvato.","stopped":"Irrigazione interrotta.","copied":"YAML copiato negli appunti.","settings":"Impostazioni","settingsHelp":"Automatico: segue la lingua di Home Assistant. In questo browser viene memorizzata la lingua selezionata manualmente.","pump":"Pompa","pumpRunning":"IN FUNZIONE","pumpStarting":"AVVIO…","pumpStopping":"ARRESTO…","pumpFailed":"AVVIO NON RIUSCITO","pumpStopped":"ARRESTO","power":"Potenza","current":"Corrente","voltage":"Tensione"};
CORE["pt"] = {"title":"Sistema de irrigação","subtitle":"Controle de zona de irrigação baseado em mapa","editHint":"Selecione uma zona e clique na posição do aspersor no mapa","markHeads":"Marcar aspersores","done":"Concluído","noIrrigation":"Nenhuma irrigação em andamento","save":"Salvar","startNow":"Iniciar agora","stop":"Parar","schedule":"Programação de irrigação","yamlExport":"Exportar para YAML","copyYaml":"Copiar YAML","running":"em execução","off":"desligado","manualTime":"Tempo manual","minutes":"minutos","savedSchedules":"Programações salvas","newSchedule":"Nova programação","noSchedules":"Nenhuma programação salva ainda.","start":"Iniciar","edit":"Editar","delete":"Excluir","noDay":"Nenhum dia selecionado","noZone":"Nenhuma zona selecionada","back":"Voltar","editSchedule":"Editar programação","name":"Nome","enabled":"Programação ativada","begins":"Hora de início","cycle":"Ciclo","weekly":"Ciclo semanal","odd":"Dias ímpares","even":"Dias pares","zonesOrder":"Zonas, duração e ordem","time":"Hora","order":"Ordem","remaining":"Tempo restante","loading":"Carregando imagem...","language":"Idioma","automatic":"Automático","selectSchedule":"Selecione uma programação ou crie uma nova.","chooseSchedule":"Selecione a programação a ser iniciada.","noEnabledSchedule":"Nenhuma programação ativada.","saved":"Programação salva.","stopped":"Irrigação interrompida.","copied":"YAML copiado para a área de transferência.","settings":"Configurações","settingsHelp":"O modo automático segue o idioma do Home Assistant. O idioma selecionado manualmente é memorizado neste navegador.","pump":"Bomba","pumpRunning":"EM FUNCIONAMENTO","pumpStarting":"INICIANDO…","pumpStopping":"PARANDO…","pumpFailed":"FALHA AO INICIAR","pumpStopped":"PARADA","power":"Energia","current":"Corrente","voltage":"Voltagem"};
CORE["nl"] = {"title":"Irrigatiesysteem","subtitle":"Kaartgebaseerde irrigatiezonebesturing","editHint":"Selecteer een zone en klik vervolgens op de sproeierpositie op de kaart","markHeads":"Sproeiers markeren","done":"Klaar","noIrrigation":"Geen irrigatie bezig","save":"Opslaan","startNow":"Nu starten","stop":"Stoppen","schedule":"Irrigatieschema","yamlExport":"YAML exporteren","copyYaml":"YAML kopiëren","running":"actief","off":"uit","manualTime":"Handmatige tijd","minutes":"minuten","savedSchedules":"Opgeslagen schema's","newSchedule":"Nieuw schema","noSchedules":"Nog geen opgeslagen schema's.","start":"Start","edit":"Bewerken","delete":"Verwijderen","noDay":"Geen dag geselecteerd","noZone":"Geen zone geselecteerd","back":"Terug","editSchedule":"Schema bewerken","name":"Naam","enabled":"Schema ingeschakeld","begins":"Starttijd","cycle":"Cyclus","weekly":"Wekelijkse cyclus","odd":"Oneven dagen","even":"Even dagen","zonesOrder":"Zones, duur en volgorde","time":"Tijd","order":"Volgorde","remaining":"Resterende tijd","loading":"Afbeelding laden...","language":"Taal","automatic":"Automatisch","selectSchedule":"Selecteer een schema of maak een nieuw schema aan.","chooseSchedule":"Selecteer het schema dat u wilt starten.","noEnabledSchedule":"Geen ingeschakeld schema.","saved":"Schema opgeslagen.","stopped":"Irrigatie gestopt.","copied":"YAML naar klembord gekopieerd.","settings":"Instellingen","settingsHelp":"Automatisch volgt de taal van Home Assistant. Een handmatig geselecteerde taal wordt in deze browser onthouden.","pump":"Pomp","pumpRunning":"DRAAIT","pumpStarting":"START…","pumpStopping":"STOPT…","pumpFailed":"STARTEN MISLUKT","pumpStopped":"GESTOPT","power":"Stroom","current":"Stroomsterkte","voltage":"Spanning"};
CORE["pl"] = {"title":"System nawadniania","subtitle":"Sterowanie strefą nawadniania na podstawie mapy","editHint":"Wybierz strefę, a następnie kliknij pozycję zraszacza na mapie","markHeads":"Oznacz zraszacze","done":"Gotowe","noIrrigation":"Brak nawadniania w toku","save":"Zapisz","startNow":"Rozpocznij teraz","stop":"Zatrzymaj","schedule":"Harmonogram nawadniania","yamlExport":"Eksport YAML","copyYaml":"Kopiuj YAML","running":"uruchomione","off":"wyłączone","manualTime":"Czas ręczny","minutes":"minut","savedSchedules":"Zapisane harmonogramy","newSchedule":"Nowy harmonogram","noSchedules":"Brak zapisanych harmonogramów.","start":"Start","edit":"Edycja","delete":"Usuń","noDay":"Brak wybranego dnia","noZone":"Brak wybranej strefy","back":"Wstecz","editSchedule":"Edytuj harmonogram","name":"Nazwa","enabled":"Harmonogram włączony","begins":"Godzina rozpoczęcia","cycle":"Cykl","weekly":"Cykl tygodniowy","odd":"Dni nieparzyste","even":"Dni parzyste","zonesOrder":"Strefy, czas trwania i kolejność","time":"Godzina","order":"Kolejność","remaining":"Pozostały czas","loading":"Ładowanie obrazu...","language":"Język","automatic":"Automatyczny","selectSchedule":"Wybierz harmonogram lub utwórz nowy.","chooseSchedule":"Wybierz harmonogram do uruchomienia.","noEnabledSchedule":"Brak włączonego harmonogramu.","saved":"Harmonogram zapisany.","stopped":"Nawadnianie zatrzymane.","copied":"Plik YAML skopiowany do schowka.","settings":"Ustawienia","settingsHelp":"Automatycznie podąża za językiem Asystenta Domowego. Ręcznie wybrany język jest zapamiętywany w tej przeglądarce.","pump":"Pompa","pumpRunning":"DZIAŁA","pumpStarting":"URUCHAMIANIE…","pumpStopping":"ZATRZYMYWANIE…","pumpFailed":"NIEUDANE URUCHOMIENIE","pumpStopped":"ZATRZYMANE","power":"Moc","current":"Prąd","voltage":"Napięcie"};
CORE["cs"] = {"title":"Zavlažovací systém","subtitle":"Ovládání zavlažovací zóny na mapě","editHint":"Vyberte zónu a poté klikněte na pozici postřikovače na mapě","markHeads":"Označte postřikovače","done":"Hotovo","noIrrigation":"Neprobíhá žádné zavlažování","save":"Uložit","startNow":"Spustit nyní","stop":"Zastavit","schedule":"Plán zavlažování","yamlExport":"Export YAML","copyYaml":"Kopírovat YAML","running":"spuštěno","off":"vypnuto","manualTime":"Ruční čas","minutes":"minuty","savedSchedules":"Uložené plány","newSchedule":"Nový plán","noSchedules":"Zatím žádné uložené plány.","start":"Začátek","edit":"Upravit","delete":"Smazat","noDay":"Není vybrán žádný den","noZone":"Není vybrána žádná zóna","back":"Zpět","editSchedule":"Upravit plán","name":"Název","enabled":"Plán povolen","begins":"Čas zahájení","cycle":"Cyklus","weekly":"Týdenní cyklus","odd":"Liché dny","even":"Sudé dny","zonesOrder":"Zóny, trvání a pořadí","time":"Čas","order":"Pořadí","remaining":"zbývající čas","loading":"Načítání obrázku...","language":"Jazyk","automatic":"Automaticky","selectSchedule":"Vyberte plán nebo vytvořte nový.","chooseSchedule":"Vyberte plán, který chcete spustit.","noEnabledSchedule":"Není povolen žádný plán.","saved":"Plán uložen.","stopped":"Zavlažování zastaveno.","copied":"YAML zkopírován do schránky.","settings":"Nastavení","settingsHelp":"Automaticky se řídí jazykem Domácího asistenta. Ručně vybraný jazyk je v tomto prohlížeči zapamatován.","pump":"Čerpadlo","pumpRunning":"BĚŽÍ","pumpStarting":"SPUŠTĚNÍ…","pumpStopping":"ZASTAVENÍ…","pumpFailed":"SPUŠTĚNÍ SE NEZDAŘILO","pumpStopped":"ZASTAVENO","power":"Napájení","current":"Proud","voltage":"Napětí"};
CORE["sk"] = {"title":"Zavlažovací systém","subtitle":"Ovládanie zavlažovacej zóny na základe mapy","editHint":"Vyberte zónu a potom kliknite na polohu zavlažovača na mape","markHeads":"Označte zavlažovače","done":"Hotovo","noIrrigation":"Neprebieha žiadne zavlažovanie","save":"Uložiť","startNow":"Spustiť teraz","stop":"Zastaviť","schedule":"Plán zavlažovania","yamlExport":"Export YAML","copyYaml":"Kopírovať YAML","running":"spustené","off":"vypnuté","manualTime":"Manuálny čas","minutes":"minúty","savedSchedules":"Uložené plány","newSchedule":"Nový plán","noSchedules":"Zatiaľ žiadne uložené plány.","start":"Štart","edit":"Upraviť","delete":"Odstrániť","noDay":"Žiadny vybraný deň","noZone":"Žiadna vybraná zóna","back":"Späť","editSchedule":"Upraviť rozvrh","name":"Názov","enabled":"Rozvrh povolený","begins":"Čas začiatku","cycle":"Cyklus","weekly":"Týždenný cyklus","odd":"Nepárne dni","even":"Párne dni","zonesOrder":"Zóny, trvanie a poradie","time":"Čas","order":"Poradie","remaining":"zostávajúci čas","loading":"Načítava sa obrázok...","language":"Jazyk","automatic":"Automaticky","selectSchedule":"Vyberte rozvrh alebo vytvorte nový.","chooseSchedule":"Vyberte rozvrh, ktorý chcete spustiť.","noEnabledSchedule":"Žiadny povolený rozvrh.","saved":"Rozvrh uložený.","stopped":"Zavlažovanie zastavené.","copied":"YAML skopírovaný do schránky.","settings":"Nastavenia","settingsHelp":"Automaticky sa riadi jazykom Domáceho asistenta. Ručne vybraný jazyk sa v tomto prehliadači zapamätá.","pump":"Čerpadlo","pumpRunning":"V PREVÁDZKE","pumpStarting":"SPUSTENIE…","pumpStopping":"ZASTAVENIE…","pumpFailed":"SPUSTENIE NEPODARILO SA","pumpStopped":"ZASTAVENÉ","power":"Napájanie","current":"Prúd","voltage":"Napätie"};
CORE["ro"] = {"title":"Sistem de irigații","subtitle":"Controlul zonei de irigații bazat pe hartă","editHint":"Selectați o zonă, apoi faceți clic pe poziția sprinklerului pe hartă","markHeads":"Marcați sprinklerele","done":"Gata","noIrrigation":"Nicio irigare în curs","save":"Salvați","startNow":"Începeți acum","stop":"Opriți","schedule":"Program de irigare","yamlExport":"Export YAML","copyYaml":"Copiați YAML","running":"în funcțiune","off":"oprit","manualTime":"Timp manual","minutes":"minute","savedSchedules":"Programe salvate","newSchedule":"Program nou","noSchedules":"Niciun program salvat încă.","start":"Pornire","edit":"Editare","delete":"Ștergere","noDay":"Nicio zi selectată","noZone":"Nicio zonă selectată","back":"Înapoi","editSchedule":"Editare program","name":"Nume","enabled":"Program activat","begins":"Ora de începere","cycle":"Ciclu","weekly":"Ciclu săptămânal","odd":"Zile impare","even":"Zile pare","zonesOrder":"Zone, durată și ordine","time":"Timp","order":"Ordine","remaining":"timp rămas","loading":"Se încarcă imaginea...","language":"Limbă","automatic":"Automat","selectSchedule":"Selectați un program sau creați unul nou.","chooseSchedule":"Selectați programul de pornire.","noEnabledSchedule":"Niciun program activat.","saved":"Program salvat.","stopped":"Irigarea oprită.","copied":"YAML copiat în clipboard.","settings":"Setări","settingsHelp":"Automat respectă limba Home Assistant. O limbă selectată manual este memorată în acest browser.","pump":"Pompă","pumpRunning":"FUNCȚIONARE","pumpStarting":"PORNIRE…","pumpStopping":"OPRIRE…","pumpFailed":"PORNIRE NEREUSITĂ","pumpStopped":"OPRIT","power":"Alimentare","current":"Curent","voltage":"Tensiune"};
CORE["da"] = {"title":"Vandingssystem","subtitle":"Kortbaseret kontrol af vandingszone","editHint":"Vælg en zone, og klik derefter på sprinklerpositionen på kortet","markHeads":"Marker sprinklere","done":"Udført","noIrrigation":"Ingen vanding i gang","save":"Gem","startNow":"Start nu","stop":"Stop","schedule":"Vandingsplan","yamlExport":"YAML-eksport","copyYaml":"Kopiér YAML","running":"kører","off":"slukket","manualTime":"Manuel tid","minutes":"minutter","savedSchedules":"Gemte planer","newSchedule":"Ny plan","noSchedules":"Ingen gemte planer endnu.","start":"Start","edit":"Rediger","delete":"Slet","noDay":"Ingen valgt dag","noZone":"Ingen valgt zone","back":"Tilbage","editSchedule":"Rediger tidsplan","name":"Navn","enabled":"Tidsplan aktiveret","begins":"Starttidspunkt","cycle":"Cyklus","weekly":"Ugentlig cyklus","odd":"Ulige dage","even":"Lige dage","zonesOrder":"Zoner, varighed og rækkefølge","time":"Tid","order":"Rækkefølge","remaining":"resterende tid","loading":"Indlæser billede...","language":"Sprog","automatic":"Automatisk","selectSchedule":"Vælg en tidsplan eller opret en ny.","chooseSchedule":"Vælg den tidsplan, der skal startes.","noEnabledSchedule":"Ingen aktiveret tidsplan.","saved":"Tidsplan gemt.","stopped":"Vanding stoppet.","copied":"YAML kopieret til udklipsholder.","settings":"Indstillinger","settingsHelp":"Automatisk følger Home Assistants sprog. Et manuelt valgt sprog huskes i denne browser.","pump":"Pumpe","pumpRunning":"KØRER","pumpStarting":"STARTER…","pumpStopping":"STOPPER…","pumpFailed":"KUNNE IKKE STARTE","pumpStopped":"STOPPET","power":"Strøm","current":"Strøm","voltage":"Spænding"};
CORE["sv"] = {"title":"Bevattningssystem","subtitle":"Kartbaserad bevattningszonkontroll","editHint":"Välj en zon och klicka sedan på sprinklerpositionen på kartan","markHeads":"Markera sprinklers","done":"Klar","noIrrigation":"Ingen bevattning pågår","save":"Spara","startNow":"Starta nu","stop":"Stopp","schedule":"Bevattningsschema","yamlExport":"YAML-export","copyYaml":"Kopiera YAML","running":"körs","off":"avstängd","manualTime":"Manuell tid","minutes":"minuter","savedSchedules":"Sparade scheman","newSchedule":"Nytt schema","noSchedules":"Inga sparade scheman ännu.","start":"Start","edit":"Redigera","delete":"Radera","noDay":"Ingen vald dag","noZone":"Ingen vald zon","back":"Tillbaka","editSchedule":"Redigera schema","name":"Namn","enabled":"Schema aktiverat","begins":"Starttid","cycle":"Cykel","weekly":"Veckocykel","odd":"Udda dagar","even":"Jämna dagar","zonesOrder":"Zoner, varaktighet och ordning","time":"Tid","order":"Ordning","remaining":"återstående tid","loading":"Laddar bild...","language":"Språk","automatic":"Automatisk","selectSchedule":"Välj ett schema eller skapa ett nytt.","chooseSchedule":"Välj schemat som ska startas.","noEnabledSchedule":"Inget aktiverat schema.","saved":"Schema sparat.","stopped":"Bevattning stoppad.","copied":"YAML kopierad till urklipp.","settings":"Inställningar","settingsHelp":"Automatisk följer Home Assistants språk. Ett manuellt valt språk sparas i den här webbläsaren.","pump":"Pump","pumpRunning":"I KÖR","pumpStarting":"STARTAR…","pumpStopping":"STOPPAR…","pumpFailed":"MISSLYCKADES STARTA","pumpStopped":"STOPPAD","power":"Ström","current":"Ström","voltage":"Spänning"};
CORE["no"] = {"title":"Vanningssystem","subtitle":"Kartbasert kontroll av vanningssone","editHint":"Velg en sone, og klikk deretter på sprinklerposisjonen på kartet","markHeads":"Marker sprinkleranlegg","done":"Ferdig","noIrrigation":"Ingen vanning pågår","save":"Lagre","startNow":"Start nå","stop":"Stopp","schedule":"Vanningsplan","yamlExport":"YAML-eksport","copyYaml":"Kopier YAML","running":"kjører","off":"av","manualTime":"Manuell tid","minutes":"minutter","savedSchedules":"Lagrede planer","newSchedule":"Ny plan","noSchedules":"Ingen lagrede planer ennå.","start":"Start","edit":"Rediger","delete":"Slett","noDay":"Ingen valgt dag","noZone":"Ingen valgt sone","back":"Tilbake","editSchedule":"Rediger tidsplan","name":"Navn","enabled":"Tidsplan aktivert","begins":"Starttidspunkt","cycle":"Syklus","weekly":"Ukesyklus","odd":"Oddetallsdager","even":"Partallsdager","zonesOrder":"Soner, varighet og rekkefølge","time":"Tid","order":"Rekkefølge","remaining":"gjenværende tid","loading":"Laster inn bilde...","language":"Språk","automatic":"Automatisk","selectSchedule":"Velg en tidsplan eller opprett en ny.","chooseSchedule":"Velg tidsplanen som skal startes.","noEnabledSchedule":"Ingen aktivert tidsplan.","saved":"Tidsplan lagret.","stopped":"Vanning stoppet.","copied":"YAML kopiert til utklippstavlen.","settings":"Innstillinger","settingsHelp":"Automatisk følger Home Assistant-språket. Et manuelt valgt språk huskes i denne nettleseren.","pump":"Pumpe","pumpRunning":"KJØRER","pumpStarting":"STARTER…","pumpStopping":"STOPPING…","pumpFailed":"START IKKE","pumpStopped":"STOPPET","power":"Strøm","current":"Strøm","voltage":"Spenning"};
CORE["fi"] = {"title":"Kastelujärjestelmä","subtitle":"Karttapohjainen kasteluvyöhykkeen ohjaus","editHint":"Valitse vyöhyke ja napsauta sitten sprinklerin sijaintia kartalla","markHeads":"Merkitse sprinklerit","done":"Valmis","noIrrigation":"Ei kastelua käynnissä","save":"Tallenna","startNow":"Aloita nyt","stop":"Pysäytä","schedule":"Kasteluaikataulu","yamlExport":"YAML-vienti","copyYaml":"Kopioi YAML","running":"käynnissä","off":"pois päältä","manualTime":"Manuaalinen aika","minutes":"minuuttia","savedSchedules":"Tallennetut aikataulut","newSchedule":"Uusi aikataulu","noSchedules":"Ei vielä tallennettuja aikatauluja.","start":"Aloita","edit":"Muokkaa","delete":"Poista","noDay":"Ei valittua päivää","noZone":"Ei valittua vyöhykettä","back":"Takaisin","editSchedule":"Muokkaa aikataulua","name":"Nimi","enabled":"Aikataulu käytössä","begins":"Aloitusaika","cycle":"Sykli","weekly":"Viikkosykli","odd":"Parittomat päivät","even":"Parilliset päivät","zonesOrder":"Vyöhykkeet, kesto ja järjestys","time":"Aika","order":"Järjestys","remaining":"Jäljellä oleva aika","loading":"Ladataan kuvaa...","language":"Kieli","automatic":"Automaattinen","selectSchedule":"Valitse aikataulu tai luo uusi.","chooseSchedule":"Valitse aloitettava aikataulu.","noEnabledSchedule":"Ei käytössä olevaa aikataulua.","saved":"Aikataulu tallennettu.","stopped":"Kastelu pysäytetty.","copied":"YAML kopioitu leikepöydälle.","settings":"Asetukset","settingsHelp":"Automaattinen toiminto noudattaa Home Assistant -kielen asetusta. Manuaalisesti valittu kieli muistetaan tässä selaimessa.","pump":"Pumppu","pumpRunning":"KÄYNNISSÄ","pumpStarting":"KÄYNNISTYY…","pumpStopping":"PYSÄYTYKSESSÄ…","pumpFailed":"KÄYNNISTYMINEN EI EPÄONNISTUNUT","pumpStopped":"PYSÄYTETTY","power":"Virta","current":"Virta","voltage":"Jännite"};
CORE["zh-CN"] = {"title":"灌溉系统","subtitle":"基于地图的灌溉区域控制","editHint":"选择一个区域，然后在地图上点击喷头位置","markHeads":"标记喷头","done":"完成","noIrrigation":"当前无灌溉","save":"保存","startNow":"立即开始","stop":"停止","schedule":"灌溉计划","yamlExport":"YAML 导出","copyYaml":"复制 YAML","running":"运行中","off":"关闭","manualTime":"手动设置时间","minutes":"分钟","savedSchedules":"已保存的计划","newSchedule":"新建计划","noSchedules":"暂无已保存的计划。","start":"开始","edit":"编辑","delete":"删除","noDay":"未选择日期","noZone":"未选择区域","back":"返回","editSchedule":"编辑计划","name":"名称","enabled":"计划已启用","begins":"开始时间","cycle":"周期","weekly":"每周周期","odd":"单日","even":"双日","zonesOrder":"区域、持续时间和顺序","time":"时间","order":"顺序","remaining":"剩余时间","loading":"正在加载图像...","language":"语言","automatic":"自动","selectSchedule":"选择计划或创建新计划。","chooseSchedule":"选择要开始的计划。","noEnabledSchedule":"未启用计划。","saved":"计划已保存。","stopped":"灌溉已停止。","copied":"YAML 文件已复制到剪贴板。","settings":"设置","settingsHelp":"自动语言跟随 Home Assistant 的语言。 手动选择的语言会在此浏览器中保存。","pump":"水泵","pumpRunning":"运行中","pumpStarting":"启动中…","pumpStopping":"停止中…","pumpFailed":"启动失败","pumpStopped":"已停止","power":"功率","current":"电流","voltage":"电压"};
CORE["zh-TW"] = {"title":"灌溉系統","subtitle":"基於地圖的灌溉區域控制","editHint":"選擇一個區域，然後在地圖上點選噴頭位置","markHeads":"標記噴頭","done":"完成","noIrrigation":"目前無灌溉","save":"保存","startNow":"立即開始","stop":"停止","schedule":"灌溉計劃","yamlExport":"YAML 匯出","copyYaml":"複製 YAML","running":"運行中","off":"關閉","manualTime":"手動設定時間","minutes":"分鐘","savedSchedules":"已保存的計劃","newSchedule":"新建計劃","noSchedules":"暫無已保存的計劃。","start":"開始","edit":"編輯","delete":"刪除","noDay":"未選擇日期","noZone":"未選擇區域","back":"返回","editSchedule":"編輯計劃","name":"名稱","enabled":"計劃已啟用","begins":"開始時間","cycle":"週期","weekly":"每週週期","odd":"單日","even":"雙日","zonesOrder":"區域、持續時間和順序","time":"時間","order":"順序","remaining":"剩餘時間","loading":"正在載入圖片...","language":"語言","automatic":"自動","selectSchedule":"選擇計劃或建立新計劃。","chooseSchedule":"選擇要開始的計劃。","noEnabledSchedule":"未啟用計劃。","saved":"計劃已保存。","stopped":"灌溉已停止。","copied":"YAML 檔案已複製到剪貼簿。","settings":"設定","settingsHelp":"自動語言跟隨 Home Assistant 的語言。 手動選擇的語言會在此瀏覽器中儲存。","pump":"水泵","pumpRunning":"運行中","pumpStarting":"啟動中…","pumpStopping":"停止中…","pumpFailed":"啟動失敗","pumpStopped":"已停止","power":"功率","current":"電流","voltage":"電壓"};
CORE["th"] = {"title":"ระบบชลประทาน","subtitle":"การควบคุมโซนชลประทานบนแผนที่","editHint":"เลือกโซน จากนั้นคลิกตำแหน่งหัวฉีดน้ำบนแผนที่","markHeads":"ทำเครื่องหมายหัวฉีดน้ำ","done":"เสร็จสิ้น","noIrrigation":"ไม่มีระบบชลประทานกำลังทำงานอยู่","save":"บันทึก","startNow":"เริ่มทันที","stop":"หยุด","schedule":"ตารางการชลประทาน","yamlExport":"ส่งออก YAML","copyYaml":"คัดลอก YAML","running":"กำลังทำงาน","off":"ปิด","manualTime":"ตั้งเวลาด้วยตนเอง","minutes":"นาที","savedSchedules":"ตารางที่บันทึกไว้","newSchedule":"ตารางใหม่","noSchedules":"ยังไม่มีตารางที่บันทึกไว้","start":"เริ่ม","edit":"แก้ไข","delete":"ลบ","noDay":"ไม่ได้เลือกวัน","noZone":"ไม่ได้เลือกโซน","back":"ย้อนกลับ","editSchedule":"แก้ไขตารางเวลา","name":"ชื่อ","enabled":"เปิดใช้งานตารางเวลาแล้ว","begins":"เวลาเริ่มต้น","cycle":"รอบ","weekly":"รอบรายสัปดาห์","odd":"วันคี่","even":"วันคู่","zonesOrder":"โซน ระยะเวลา และลำดับ","time":"เวลา","order":"ลำดับ","remaining":"เวลาที่เหลือ","loading":"กำลังโหลดภาพ...","language":"ภาษา","automatic":"อัตโนมัติ","selectSchedule":"เลือกตารางเวลาหรือสร้างตารางเวลาใหม่","chooseSchedule":"เลือกตารางเวลาที่จะเริ่มต้น","noEnabledSchedule":"ไม่ได้เปิดใช้งานตารางเวลา","saved":"บันทึกตารางเวลาแล้ว","stopped":"หยุดการชลประทานแล้ว","copied":"คัดลอก YAML ไปยังคลิปบอร์ดแล้ว","settings":"การตั้งค่า","settingsHelp":"อัตโนมัติจะใช้ภาษาของ Home Assistant ภาษาที่เลือกด้วยตนเองจะถูกจดจำไว้ในเบราว์เซอร์นี้","pump":"ปั๊ม","pumpRunning":"กำลังทำงาน","pumpStarting":"กำลังเริ่มต้น…","pumpStopping":"กำลังหยุด…","pumpFailed":"เริ่มต้นไม่สำเร็จ","pumpStopped":"หยุดแล้ว","power":"พลังงาน","current":"กระแสไฟ","voltage":"แรงดันไฟฟ้า"};
CORE["vi"] = {"title":"Hệ thống tưới tiêu","subtitle":"Điều khiển vùng tưới dựa trên bản đồ","editHint":"Chọn một vùng, sau đó nhấp vào vị trí vòi phun trên bản đồ","markHeads":"Đánh dấu vòi phun","done":"Xong","noIrrigation":"Không có hoạt động tưới tiêu nào đang diễn ra","save":"Lưu","startNow":"Bắt đầu ngay","stop":"Dừng","schedule":"Lịch trình tưới tiêu","yamlExport":"Xuất YAML","copyYaml":"Sao chép YAML","running":"Đang chạy","off":"Tắt","manualTime":"Thời gian thủ công","minutes":"Phút","savedSchedules":"Lịch trình đã lưu","newSchedule":"Lịch trình mới","noSchedules":"Chưa có lịch trình nào được lưu.","start":"Bắt đầu","edit":"Chỉnh sửa","delete":"Xóa","noDay":"Chưa chọn ngày","noZone":"Chưa chọn khu vực","back":"Quay lại","editSchedule":"Chỉnh sửa lịch trình","name":"Tên","enabled":"Lịch trình đã được kích hoạt","begins":"Thời gian bắt đầu","cycle":"Chu kỳ","weekly":"Chu kỳ hàng tuần","odd":"Ngày lẻ","even":"Ngày chẵn","zonesOrder":"Khu vực, thời lượng và thứ tự","time":"Thời gian","order":"Thứ tự","remaining":"Thời gian còn lại","loading":"Đang tải hình ảnh...","language":"Ngôn ngữ","automatic":"Tự động","selectSchedule":"Chọn lịch trình hoặc tạo lịch trình mới.","chooseSchedule":"Chọn lịch trình để bắt đầu.","noEnabledSchedule":"Chưa có lịch trình nào được kích hoạt.","saved":"Lịch trình đã được lưu.","stopped":"Tưới tiêu đã dừng.","copied":"YAML đã được sao chép vào clipboard.","settings":"Cài đặt","settingsHelp":"Chế độ tự động tuân theo ngôn ngữ của Home Assistant. Ngôn ngữ được chọn thủ công sẽ được ghi nhớ trong trình duyệt này.","pump":"Bơm","pumpRunning":"ĐANG CHẠY","pumpStarting":"ĐANG KHỞI ĐỘNG…","pumpStopping":"ĐANG DỪNG…","pumpFailed":"KHÔNG KHỞI ĐỘNG ĐƯỢC","pumpStopped":"ĐÃ DỪNG","power":"Công suất","current":"Dòng điện","voltage":"Điện áp"};
CORE["ko"] = {"title":"관개 시스템","subtitle":"지도 기반 관개 구역 제어","editHint":"구역을 선택한 다음 지도에서 스프링클러 위치를 클릭합니다.","markHeads":"스프링클러 표시","done":"완료","noIrrigation":"현재 관개 중이 아닙니다.","save":"저장","startNow":"지금 시작","stop":"중지","schedule":"관개 일정","yamlExport":"YAML 내보내기","copyYaml":"YAML 복사","running":"실행 중","off":"꺼짐","manualTime":"수동 시간","minutes":"분","savedSchedules":"저장된 일정","newSchedule":"새 일정","noSchedules":"아직 저장된 일정이 없습니다.","start":"시작","edit":"편집","delete":"삭제","noDay":"선택된 날짜 없음","noZone":"선택된 구역 없음","back":"뒤로","editSchedule":"일정 편집","name":"이름","enabled":"일정 활성화됨","begins":"시작 시간","cycle":"주기","weekly":"주간 주기","odd":"홀수 날","even":"짝수 날","zonesOrder":"구역, 기간 및 순서","time":"시간","order":"순서","remaining":"남은 시간","loading":"이미지 불러오는 중...","language":"언어","automatic":"자동","selectSchedule":"일정을 선택하거나 새 일정을 만드세요.","chooseSchedule":"시작할 일정을 선택하세요.","noEnabledSchedule":"활성화된 일정이 없습니다.","saved":"일정이 저장되었습니다.","stopped":"관개가 중지되었습니다.","copied":"YAML 파일이 클립보드에 복사되었습니다.","settings":"설정","settingsHelp":"자동 설정은 Home Assistant의 언어 설정을 따릅니다. 수동으로 선택한 언어는 이 브라우저에 저장됩니다.","pump":"펌프","pumpRunning":"작동 중","pumpStarting":"시작 중…","pumpStopping":"정지 중…","pumpFailed":"시작 실패","pumpStopped":"정지됨","power":"전원","current":"전류","voltage":"전압"};
CORE["km"] = {"title":"ប្រព័ន្ធស្រោចស្រព","subtitle":"ការគ្រប់គ្រងតំបន់ស្រោចស្រពផ្អែកលើផែនទី","editHint":"ជ្រើសរើសតំបន់មួយ បន្ទាប់មកចុចលើទីតាំងប្រព័ន្ធស្រោចស្រពនៅលើផែនទី","markHeads":"សម្គាល់ប្រព័ន្ធស្រោចស្រព","done":"រួចរាល់","noIrrigation":"គ្មានប្រព័ន្ធស្រោចស្រពកំពុងដំណើរការទេ","save":"រក្សាទុក","startNow":"ចាប់ផ្តើមឥឡូវនេះ","stop":"បញ្ឈប់","schedule":"កាលវិភាគស្រោចស្រព","yamlExport":"នាំចេញ YAML","copyYaml":"ចម្លង YAML","running":"កំពុងដំណើរការ","off":"បិទ","manualTime":"ពេលវេលាដោយដៃ","minutes":"នាទី","savedSchedules":"កាលវិភាគដែលបានរក្សាទុក","newSchedule":"កាលវិភាគថ្មី","noSchedules":"មិនទាន់មានកាលវិភាគដែលបានរក្សាទុកនៅឡើយទេ។","start":"ចាប់ផ្តើម","edit":"កែសម្រួល","delete":"លុប","noDay":"គ្មានថ្ងៃដែលបានជ្រើសរើសទេ","noZone":"គ្មានតំបន់ដែលបានជ្រើសរើសទេ","back":"ថយក្រោយ","editSchedule":"កែសម្រួលកាលវិភាគ","name":"ឈ្មោះ","enabled":"កាលវិភាគត្រូវបានបើក","begins":"ពេលវេលាចាប់ផ្តើម","cycle":"វដ្ត","weekly":"វដ្តប្រចាំសប្តាហ៍","odd":"ថ្ងៃសេស","even":"ថ្ងៃគូ","zonesOrder":"តំបន់ រយៈពេល និងលំដាប់","time":"ពេលវេលា","order":"លំដាប់","remaining":"ពេលវេលាដែលនៅសល់","loading":"កំពុងផ្ទុករូបភាព...","language":"ភាសា","automatic":"ស្វ័យប្រវត្តិ","selectSchedule":"ជ្រើសរើសកាលវិភាគ ឬបង្កើតកាលវិភាគថ្មី។","chooseSchedule":"ជ្រើសរើសកាលវិភាគដើម្បីចាប់ផ្តើម។","noEnabledSchedule":"គ្មានកាលវិភាគត្រូវបានបើកទេ។","saved":"កាលវិភាគត្រូវបានរក្សាទុក។","stopped":"ប្រព័ន្ធធារាសាស្រ្តបានឈប់។","copied":"YAML ត្រូវបានចម្លងទៅក្ដារតម្បៀតខ្ទាស់។","settings":"ការកំណត់","settingsHelp":"ស្វ័យប្រវត្តិធ្វើតាមភាសា Home Assistant។ ភាសាដែលបានជ្រើសរើសដោយដៃត្រូវបានចងចាំនៅក្នុងកម្មវិធីរុករកនេះ។","pump":"ស្នប់","pumpRunning":"កំពុងដំណើរការ","pumpStarting":"កំពុងចាប់ផ្តើម…","pumpStopping":"កំពុងឈប់…","pumpFailed":"បរាជ័យក្នុងការចាប់ផ្តើម","pumpStopped":"បានឈប់","power":"ថាមពល","current":"ចរន្ត","voltage":"វ៉ុល"};
CORE["tr"] = {"title":"Sulama sistemi","subtitle":"Harita tabanlı sulama bölgesi kontrolü","editHint":"Bir bölge seçin, ardından haritadaki fıskiye konumuna tıklayın","markHeads":"Fıskiyeleri işaretle","done":"Tamamlandı","noIrrigation":"Devam eden sulama yok","save":"Kaydet","startNow":"Şimdi başlat","stop":"Durdur","schedule":"Sulama programı","yamlExport":"YAML dışa aktarma","copyYaml":"YAML kopyala","running":"çalışıyor","off":"kapalı","manualTime":"Manuel zaman","minutes":"dakika","savedSchedules":"Kaydedilen programlar","newSchedule":"Yeni program","noSchedules":"Henüz kaydedilmiş program yok.","start":"Başlat","edit":"Düzenle","delete":"Sil","noDay":"Seçili gün yok","noZone":"Seçili bölge yok","back":"Geri","editSchedule":"Programı düzenle","name":"Ad","enabled":"Program etkin","begins":"Başlangıç ​​saati","cycle":"Döngü","weekly":"Haftalık döngü","odd":"Tek günler","even":"Çift günler","zonesOrder":"Bölgeler, süre ve sıra","time":"Saat","order":"Sıra","remaining":"Kalan süre","loading":"Görüntü yükleniyor...","language":"Dil","automatic":"Otomatik","selectSchedule":"Bir program seçin veya yeni bir program oluşturun.","chooseSchedule":"Başlatılacak programı seçin.","noEnabledSchedule":"Etkinleştirilmiş program yok.","saved":"Program kaydedildi.","stopped":"Sulama durduruldu.","copied":"YAML panoya kopyalandı.","settings":"Ayarlar","settingsHelp":"Otomatik ayar, Home Assistant dilini takip eder. Manuel olarak seçilen bir dil bu tarayıcıda saklanır.","pump":"Pompa","pumpRunning":"ÇALIŞIYOR","pumpStarting":"BAŞLATILIYOR…","pumpStopping":"DURDURULUYOR…","pumpFailed":"BAŞLATILAMADI","pumpStopped":"DURDURULDU","power":"Güç","current":"Akım","voltage":"Voltaj"};

const DAY_LABELS_BY_LANGUAGE = {
  en:["M","Tu","W","Th","F","Sa","Su"], hu:["H","K","Sze","Cs","P","Szo","V"],
  de:["Mo","Di","Mi","Do","Fr","Sa","So"], fr:["Lu","Ma","Me","Je","Ve","Sa","Di"], es:["Lu","Ma","Mi","Ju","Vi","Sá","Do"],
  it:["Lu","Ma","Me","Gi","Ve","Sa","Do"], pt:["Se","Te","Qu","Qu","Se","Sá","Do"], nl:["Ma","Di","Wo","Do","Vr","Za","Zo"],
  pl:["Pn","Wt","Śr","Cz","Pt","So","Nd"], cs:["Po","Út","St","Čt","Pá","So","Ne"], sk:["Po","Ut","St","Št","Pi","So","Ne"],
  ro:["Lu","Ma","Mi","Jo","Vi","Sâ","Du"], da:["Ma","Ti","On","To","Fr","Lø","Sø"], sv:["Må","Ti","On","To","Fr","Lö","Sö"],
  no:["Ma","Ti","On","To","Fr","Lø","Sø"], fi:["Ma","Ti","Ke","To","Pe","La","Su"],
  "zh-CN":["一","二","三","四","五","六","日"], "zh-TW":["一","二","三","四","五","六","日"],
  tr:["Pt","Sa","Ça","Pe","Cu","Ct","Pa"], th:["จ","อ","พ","พฤ","ศ","ส","อา"], vi:["T2","T3","T4","T5","T6","T7","CN"],
  ko:["월","화","수","목","금","토","일"], km:["ច","អ","ពុ","ព្រ","សុ","ស","អា"]
};

const NEXT_IRRIGATION_TEXT = {
  en:["Next irrigation","No scheduled irrigation"], hu:["Következő locsolás","Nincs ütemezett locsolás"],
  de:["Nächste Bewässerung","Keine Bewässerung geplant"], fr:["Prochain arrosage","Aucun arrosage programmé"],
  es:["Próximo riego","No hay riego programado"], it:["Prossima irrigazione","Nessuna irrigazione programmata"],
  pt:["Próxima rega","Nenhuma rega programada"], nl:["Volgende irrigatie","Geen irrigatie gepland"],
  pl:["Następne nawadnianie","Brak zaplanowanego nawadniania"], cs:["Další zavlažování","Žádné zavlažování není naplánováno"],
  sk:["Ďalšie zavlažovanie","Nie je naplánované žiadne zavlažovanie"], ro:["Următoarea irigare","Nicio irigare programată"],
  da:["Næste vanding","Ingen planlagt vanding"], sv:["Nästa bevattning","Ingen bevattning planerad"],
  no:["Neste vanning","Ingen planlagt vanning"], fi:["Seuraava kastelu","Ei ajastettua kastelua"],
  "zh-CN":["下次灌溉","没有计划灌溉"], "zh-TW":["下次灌溉","沒有排定的灌溉"],
  tr:["Sonraki sulama","Planlanmış sulama yok"], th:["การรดน้ำครั้งถัดไป","ไม่มีการรดน้ำตามกำหนดเวลา"],
  vi:["Lần tưới tiếp theo","Không có lịch tưới"], ko:["다음 관개","예약된 관개 없음"],
  km:["ការស្រោចស្រពបន្ទាប់","មិនមានការស្រោចស្រពតាមកាលវិភាគទេ"]
};

const NEXT_COUNTDOWN_TEXT = {
  hu: "Indulásig",
  en: "Starts in",
};

class IrrigationMapCard extends HTMLElement {
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
      }, 1000);
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
    // Home Assistant frequently replaces the hass object. Rebuilding the zone
    // controls while a mobile number input is being edited destroys the input
    // element, so Android/iOS immediately closes the numeric keyboard.
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
    const raw = selected === "auto" ? (this.hassObj?.locale?.language || this.hassObj?.language || navigator.language || "en") : selected;
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
    const entities = { ...DEFAULT_PUMP_ENTITIES, ...(this.config.pump_entities || this.config.pumpEntities || {}) };
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
        active: this.hassObj?.states?.[entity]?.state === "on",
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
      direction_angle: Number.isFinite(Number(head.direction_angle ?? head.directionAngle))
        ? Number(head.direction_angle ?? head.directionAngle)
        : Math.round((((Math.atan2(.5 - Number(head.y), .5 - Number(head.x)) * 180 / Math.PI) + 360) % 360)),
      sweep_angle: Number(head.sweep_angle ?? head.sweepAngle ?? 110),
      sweep_speed: Number(head.sweep_speed ?? head.sweepSpeed ?? 1),
      spray_distance: Number(head.spray_distance ?? head.sprayDistance ?? 6),
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
    const rainDelayOptions = Array.isArray(rainDelayEntity?.attributes?.options)
      ? rainDelayEntity.attributes.options
      : ["0 óra", "6 óra", "12 óra", "24 óra", "48 óra"];
    const selectedRainDelay = rainDelayEntity?.state || "12 óra";
    const rainMinimumEntity = this.hassObj?.states?.[SCHEDULER_ENTITIES.rainMinimumSelect];
    const rainMinimumOptions = Array.isArray(rainMinimumEntity?.attributes?.options)
      ? rainMinimumEntity.attributes.options
      : ["0 perc", "15 perc", "30 perc", "60 perc"];
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
              <select data-action="language">${LANGUAGES.map(([code,name]) => `<option value="${code}" ${code === currentLanguage ? "selected" : ""}>${code === "auto" ? this.t("automatic") : name}</option>`).join("")}</select>
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
        option: event.target.value,
      });
      this.updateRainSettings();
    });
    this.shadowRoot.querySelector('[data-action="rain-minimum"]')?.addEventListener("change", async (event) => {
      if (!this.hassObj?.states?.[SCHEDULER_ENTITIES.rainMinimumSelect]) return;
      await this.hassObj.callService("input_select", "select_option", {
        entity_id: SCHEDULER_ENTITIES.rainMinimumSelect,
        option: event.target.value,
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
      const remaining = delayTimer?.state === "active"
        ? this.timerRemaining(delayTimer)
        : "";
      remainingElement.textContent = remaining
        ? `${this.t("rainDelayRemaining")}: ${remaining}`
        : "";
    }
  }

  timerRemaining(timer) {
    const finishesAt = Date.parse(timer?.attributes?.finishes_at || "");
    let seconds = Number.isFinite(finishesAt)
      ? Math.max(0, Math.ceil((finishesAt - Date.now()) / 1000))
      : 0;
    if (!seconds && timer?.attributes?.remaining) {
      const parts = String(timer.attributes.remaining).split(":").map(Number);
      if (parts.length === 3 && parts.every(Number.isFinite)) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
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
    const labels = { pump:this.t("pump"), on:this.t("pumpRunning"), starting:this.t("pumpStarting"), stopping:this.t("pumpStopping"), failed:this.t("pumpFailed"), off:this.t("pumpStopped"), power:this.t("power"), current:this.t("current"), voltage:this.t("voltage") };
    if (pump.zoneRequested && !this.pumpWasRequested) this.pumpStartAt = Date.now();
    if (!pump.zoneRequested) this.pumpStartAt = 0;
    this.pumpWasRequested = pump.zoneRequested;
    const timeoutSeconds = Math.max(1, Number(this.config.pump_start_timeout ?? 15));
    const timedOut = pump.zoneRequested && !pump.measuredRunning && this.pumpStartAt > 0 && Date.now() - this.pumpStartAt >= timeoutSeconds * 1000;
    const state = !pump.zoneRequested && pump.measuredRunning ? "stopping" : pump.measuredRunning ? "running" : timedOut ? "failed" : pump.zoneRequested ? "starting" : "stopped";
    const stateText = state === "running" ? labels.on : state === "stopping" ? labels.stopping : state === "failed" ? labels.failed : state === "starting" ? labels.starting : labels.off;
    container.innerHTML = `<div class="pump-head"><strong>${labels.pump}</strong><span class="pump-state ${state}">${stateText}</span></div>
      <div class="pump-values"><div><span>${labels.power}</span><strong>${value(pump.power)} W</strong></div><div><span>${labels.current}</span><strong>${value(pump.current,2)} A</strong></div><div><span>${labels.voltage}</span><strong>${value(pump.voltage)} V</strong></div></div>`;
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
      variables: { zone_id: zone.id, minutes },
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
      variables: { zone_id: zone.id },
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
    return SCHEDULER_ENTITIES.programs
      .map((entity, index) => decodeProgram(this.hassObj?.states?.[entity]?.state, index + 1, this.zones()))
      .filter(Boolean);
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
        order: index + 1,
      })),
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
    const days = program.cycleMode === "Heti ciklus"
      ? program.days.map((enabled, index) => enabled ? this.dayLabels()[index] : "").filter(Boolean).join(", ")
      : program.cycleMode;
    const zones = [...program.zones].filter((zone) => zone.enabled).sort((a, b) => a.order - b.order)
      .map((zone) => `${zone.order}. ${zone.name} (${zone.minutes} p)`).join(" · ");
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
          <span class="order-badge">${zone.order}.</span><strong>${escapeHtml(zone.name)}</strong>
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
          ${[["Heti ciklus","weekly"],["Páratlan nap","odd"],["Páros nap","even"]].map(([mode,key]) => `<option value="${mode}" ${mode === draft.cycleMode ? "selected" : ""}>${this.t(key)}</option>`).join("")}
        </select></label>
        <div class="day-picker ${weekly ? "" : "hidden"}">
          ${this.dayLabels().map((label, index) => `<button type="button" class="day ${draft.days[index] ? "active" : ""}" data-day="${index}">${label}</button>`).join("")}
        </div>
      </div>
      <div class="program-title">${this.t("zonesOrder")}</div>
      <div class="program-zones">${zoneRows}</div>
    `;
    container.querySelector('[data-field="program-name"]')?.addEventListener("input", (event) => { draft.name = event.target.value; });
    container.querySelector('[data-field="schedule-enabled"]')?.addEventListener("change", (event) => { draft.enabled = event.target.checked; });
    container.querySelector('[data-field="start-time"]')?.addEventListener("change", (event) => { draft.startTime = event.target.value || "06:00"; });
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
    const close = () => { this.editingProgram = null; this.renderScheduler(); };
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
      variables: { program_json: JSON.stringify(encodeProgram(program)) },
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
          remaining: timerRemaining(programTimer),
        });
      } else if (manualTimer?.state === "active") {
        activeRows.push({
          name: zone?.name || `${this.t("zone")} ${zoneId}`,
          source: this.t("manualTime"),
          remaining: timerRemaining(manualTimer),
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

  nextIrrigation(now = new Date()) {
    const programs = this.schedulePrograms.filter((program) =>
      program.enabled && program.zones.some((zone) => zone.enabled)
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
        const allowed = program.cycleMode === "Páratlan nap"
          ? date.getDate() % 2 === 1
          : program.cycleMode === "Páros nap"
            ? date.getDate() % 2 === 0
            : Boolean(program.days[mondayIndex]);
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
      month: "long", day: "numeric", weekday: "long", hour: "2-digit", minute: "2-digit"
    }).format(next.date);
    const countdown = this.nextIrrigationCountdown(next.date, language);
    element.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(date)}</strong><small>${escapeHtml(next.program.name)}</small><small class="next-countdown">${escapeHtml(countdown)}</small>`;
    element.classList.remove("empty");
  }

  nextIrrigationCountdown(date, language) {
    const totalSeconds = Math.max(0, Math.ceil((date.getTime() - Date.now()) / 1000));
    const label = NEXT_COUNTDOWN_TEXT[language] || NEXT_COUNTDOWN_TEXT.en;

    if (totalSeconds <= 300) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${label}: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const totalMinutes = Math.ceil(totalSeconds / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
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
    if (
      canvasX < imageRect.x ||
      canvasX > imageRect.x + imageRect.width ||
      canvasY < imageRect.y ||
      canvasY > imageRect.y + imageRect.height
    ) {
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
      direction_angle: Math.round((((Math.atan2(.5 - ((canvasY - imageRect.y) / imageRect.height), .5 - ((canvasX - imageRect.x) / imageRect.width)) * 180 / Math.PI) + 360) % 360)),
      sweep_angle: 110,
      sweep_speed: 1,
      spray_distance: 6,
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
        this.headAnimationPhase = timestamp / 1000;
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
      height: drawHeight,
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
          const end = sprayRadius * (0.72 + (ray % 2) * 0.12);
          ctx.globalAlpha = 0.48 + (ray % 2) * 0.22;
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
      "zones:",
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
      composed: true,
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
      .program-zone { align-items:center; background:#fff; border:1px solid #dbe2e8; border-left:5px solid #94a3b8; border-radius:11px; display:grid; gap:10px; grid-template-columns:minmax(150px,1fr) auto auto; opacity:.62; padding:10px; }
      .program-zone.enabled { border-left-color:#149ec2; opacity:1; }
      .zone-check { align-items:center; display:flex; gap:8px; }
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
}

function round(value) {
  return Math.round(value * 10000) / 10000;
}

function encodeProgram(program) {
  const modes = { "Heti ciklus": "w", "Páratlan nap": "o", "Páros nap": "e" };
  return {
    n: String(program.name || "Időzítés").slice(0, 32),
    e: program.enabled ? 1 : 0,
    t: program.startTime,
    c: modes[program.cycleMode] || "w",
    d: program.days.map((value) => value ? 1 : 0),
    z: program.zones.map((zone) => [zone.id, zone.enabled ? 1 : 0, zone.minutes, zone.order]),
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
          order: index + 1,
        };
      }
      return {
        id: Number(item[0] || fallback.id || index + 1),
        name: fallback.name || `Zóna ${index + 1}`,
        enabled: Number(item[1]) === 1,
        minutes: clampNumber(item[2], 1, 180, 15),
        order: clampNumber(item[3], 1, availableZones.length, index + 1),
      };
    }).slice(0, 5);
    return {
      slot,
      name: String(raw.n || `Időzítés ${slot}`),
      enabled: Number(raw.e) === 1,
      startTime: /^\d{2}:\d{2}$/.test(raw.t) ? raw.t : "06:00",
      cycleMode: modes[raw.c] || "Heti ciklus",
      days: Array.from({ length: 7 }, (_, index) => Number(raw.d?.[index]) === 1),
      zones,
    };
  } catch (error) {
    console.warn(`Invalid irrigation program in slot ${slot}.`, error);
    return null;
  }
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function timerRemaining(timer) {
  const finishesAt = timer?.attributes?.finishes_at;
  if (finishesAt) {
    const seconds = Math.max(0, Math.ceil((new Date(finishesAt).getTime() - Date.now()) / 1000));
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
  return `rgba(${(intValue >> 16) & 255}, ${(intValue >> 8) & 255}, ${intValue & 255}, ${alpha})`;
}

if (!customElements.get("garden-irrigation-map-card")) {
  customElements.define("garden-irrigation-map-card", IrrigationMapCard);
}

if (!customElements.get("irrigation-map-card")) {
  customElements.define("irrigation-map-card", class extends IrrigationMapCard {});
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "garden-irrigation-map-card",
  name: "Locsolorendszer terkep",
  description: "Terkepes locsolofej es zonavezerlo kartya – v149",
});
