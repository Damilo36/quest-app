// ─── OCCASIONS & VIBES ───────────────────────────────────────────────────────
export const OCCASIONS = [
  {id:'birthday', icon:'🎂', label:'Geburtstag'},
  {id:'camping',  icon:'🏕️', label:'Camping'},
  {id:'team',     icon:'🤝', label:'Teambuilding'},
  {id:'family',   icon:'👨‍👩‍👧', label:'Familie'},
  {id:'festival', icon:'🎪', label:'Festival'},
  {id:'wedding',  icon:'💍', label:'Hochzeit'},
]

export const VIBES = [
  {id:'family', icon:'🌸', label:'Familienfreundlich', desc:'Für alle Altersgruppen'},
  {id:'chill',  icon:'😎', label:'Chill & Kreativ',    desc:'Entspannt, trotzdem lustig'},
  {id:'party',  icon:'🔥', label:'Party Modus',         desc:'Ab hier wird\'s wild'},
]

export const COUNTS = [10, 15, 20, 30, 40, 50]

// ─── GOLDEN TASKS (rotierend, 10 pro Vibe) ───────────────────────────────────
export const GOLDEN_POOL = {
  family: [
    {e:'⭐', t:'Mach ein Foto das alle Anwesenden in 10 Jahren noch zum Lachen bringt'},
    {e:'⭐', t:'Das beste Familienfoto des Abends — alle müssen drauf, alle müssen lächeln'},
    {e:'⭐', t:'Foto von dem Moment der diesen Abend unvergesslich macht'},
    {e:'⭐', t:'Mach ein Foto das zeigt warum diese Menschen zusammengehören'},
    {e:'⭐', t:'Das ehrlichste Foto des Abends — kein Posieren, echter Moment'},
    {e:'⭐', t:'Foto mit allen Generationen die heute da sind — in einer Reihe nach Alter'},
    {e:'⭐', t:'Der lustigste Moment des Abends — eingefangen bevor er vorbei ist'},
    {e:'⭐', t:'Mach ein Foto das wie eine Weihnachtskarte aussieht — alle müssen mitmachen'},
    {e:'⭐', t:'Das Foto das du in 20 Jahren noch auf deinem Handy haben willst'},
    {e:'⭐', t:'Gruppenumarmung — alle gleichzeitig, foto von außen'},
  ],
  chill: [
    {e:'⭐', t:'Capture den einen Moment der diesen Abend unvergesslich macht'},
    {e:'⭐', t:'Das Foto das wie ein Filmstill aussieht — perfekte Komposition'},
    {e:'⭐', t:'Der magischste Moment des Abends — du weißt ihn wenn du ihn siehst'},
    {e:'⭐', t:'Mach ein Foto das die Stimmung des Abends in einem Bild einfängt'},
    {e:'⭐', t:'Das ehrlichste Lachen des Abends — foto es bevor es aufhört'},
    {e:'⭐', t:'Ein Foto das ohne Worte erklärt was heute Abend passiert ist'},
    {e:'⭐', t:'Capture etwas Schönes das die meisten heute nicht bemerkt haben'},
    {e:'⭐', t:'Das Foto von dem du weißt — das ist der Abend'},
    {e:'⭐', t:'Mach das beste Foto deines Lebens — heute Nacht, mit diesen Menschen'},
    {e:'⭐', t:'Ein Bild das in 5 Jahren Heimweh auslöst'},
  ],
  party: [
    {e:'⭐', t:'Initiiere den legendärsten Moment des Abends — alle müssen dabei sein'},
    {e:'⭐', t:'Das Foto das morgen früh alle weckt weil es so gut ist'},
    {e:'⭐', t:'Der Moment der diesen Abend zur Legende macht — foto ihn'},
    {e:'⭐', t:'Mach das wildeste Gruppenfoto das je auf dieser Party gemacht wurde'},
    {e:'⭐', t:'Organisiere etwas das in 5 Jahren noch als Geschichte erzählt wird'},
    {e:'⭐', t:'Das Foto das beweist dass heute Nacht episch war'},
    {e:'⭐', t:'Bring alle dazu gleichzeitig dasselbe zu tun — foto das Ergebnis'},
    {e:'⭐', t:'Der beste Moment des Abends — du hast 10 Sekunden um ihn einzufangen'},
    {e:'⭐', t:'Mach ein Foto das erklärt warum heute Nacht niemand früh nach Hause will'},
    {e:'⭐', t:'Die eine Aufnahme die den ganzen Abend zusammenfasst'},
  ],
}

// ─── MAIN TASK POOL ───────────────────────────────────────────────────────────
// 🎭 = Streich-Aufgabe (heimlich im Pool, kein Label für Spieler sichtbar)

export const TASKS = {
  family: [
    // Normale Aufgaben
    {e:'🤗', t:'Umarme jemanden den du heute noch nicht umarmt hast — und halte es 5 Sekunden'},
    {e:'👴', t:'Mach ein Selfie mit der ältesten Person auf der Party'},
    {e:'👶', t:'Mach ein Selfie mit der jüngsten Person auf der Party'},
    {e:'🍕', t:'Bau aus dem vorhandenen Essen ein Kunstwerk und foto es'},
    {e:'🌟', t:'Organisiere ein Gruppenfoto mit min. 5 Leuten — alle gleicher Gesichtsausdruck'},
    {e:'🎨', t:'Zeichne eine Person in 60 Sekunden auf eine Serviette — sie bekommt das Bild'},
    {e:'💃', t:'Bring jemanden über 60 dazu mit dir zu tanzen — foto den Moment'},
    {e:'🌈', t:'Finde 7 verschiedene Farben und foto sie alle in einem einzigen Bild'},
    {e:'🤝', t:'Erfinde einen einzigartigen Handshake mit jemandem und zeigt ihn der Gruppe'},
    {e:'📖', t:'Lass dir von der ältesten Person die beste Geschichte aus ihrer Jugend erzählen — foto den Moment'},
    {e:'🎭', t:'Mach mit jemandem ein Foto als wärt ihr in einem alten Schwarz-Weiß-Film'},
    {e:'🌺', t:'Schenke jemandem ein aufrichtiges Kompliment auf einer Serviette — foto beides zusammen'},
    {e:'👁️', t:'Finde jemanden der dieselbe Augenfarbe hat wie du — Beweis-Selfie'},
    {e:'👟', t:'Foto von allen Schuhen am Tisch — niemand darf es merken bevor das Foto fertig ist'},
    {e:'🎁', t:'Mach ein Foto das wie ein Geschenkkartencover aussieht — mit echten Menschen'},
    {e:'🥂', t:'Organisiere einen spontanen Toast — alle heben gleichzeitig ihr Glas'},
    {e:'🌿', t:'Finde etwas in der Natur und mach es zum Star des Fotos'},
    {e:'🎵', t:'Bring 4 Leute dazu gleichzeitig denselben Song zu summen — foto den Moment'},
    {e:'🏆', t:'Mach ein Siegerfoto mit jemandem — ohne Grund, einfach so'},
    {e:'🦋', t:'Foto von den Händen von 4 verschiedenen Generationen übereinander'},
    // Streich-Aufgaben (heimlich)
    {e:'📸', t:'Sag jemandem du machst ein "offizielles Erinnerungsfoto" — lass ihn posieren — mach aber kurz vorher ein Foto während er sich noch in Position bringt. Das unvorbereitete Foto kommt ins Album.', trick:true},
    {e:'🎭', t:'Bitte jemanden dir bei einer "wichtigen Aufgabe" zu helfen — lass ihn dabei eine lustige Position einnehmen — foto ihn dabei ohne dass er weiß wofür das Foto ist.', trick:true},
    {e:'👑', t:'Setz jemandem heimlich etwas auf den Kopf — foto es bevor er es merkt. Titel im Album: "Hatte keine Ahnung"', trick:true},
    {e:'🪞', t:'Überzeuge jemanden für ein "Spiegelselfie" zu posieren — mach aber ein Foto von seinem Gesichtsausdruck während er überlegt wie er stehen soll.', trick:true},
  ],

  chill: [
    {e:'🌅', t:'Finde den schönsten Spot auf der Location — foto es wie ein Profifotograf'},
    {e:'🕵️', t:'Mach ein natürlich wirkendes Foto von jemandem ohne dass er es merkt'},
    {e:'🌿', t:'Bau aus gefundenen Gegenständen eine Mini-Kunstinstallation'},
    {e:'✨', t:'Capture den Moment der am meisten nach Film aussieht'},
    {e:'💬', t:'Lerne von 3 verschiedenen Personen je eine Sache die du noch nicht wusstest — foto jeden dabei'},
    {e:'🌙', t:'Mach ein Foto das wie ein Albumcover einer unbekannten Band aussieht'},
    {e:'🫧', t:'Überzeuge jemanden dir sein Lieblingsgetränk zu empfehlen — foto euch beide beim Anstoßen'},
    {e:'🔮', t:'Finde den geheimnisvollsten Winkel des Abends und foto die Atmosphäre'},
    {e:'🧩', t:'Finde zwei Dinge die eigentlich zusammengehören aber getrennt sind — foto sie vereint'},
    {e:'🍃', t:'Finde etwas Schönes das die meisten heute Abend noch nicht bemerkt haben'},
    {e:'🦋', t:'Mach ein Spiegelfoto das wie Kunst aussieht'},
    {e:'🎪', t:'Bau eine Szene nach aus deinem liebsten Film — nur mit anwesenden Leuten'},
    {e:'🌊', t:'Foto von jemandem der gerade in Gedanken versunken ist — ohne ihn zu stören'},
    {e:'🎯', t:'Mach ein Foto das erst beim zweiten Hinsehen seinen wahren Inhalt zeigt'},
    {e:'🍂', t:'Finde eine Textur die so schön ist dass sie als Wallpaper taugt — foto sie'},
    {e:'🌸', t:'Mach ein Porträtfoto von jemandem das ihn so zeigt wie er wirklich ist'},
    {e:'🎸', t:'Foto von jemandem in seiner natürlichsten, entspanntesten Pose des Abends'},
    {e:'🏞️', t:'Finde den besten Bildausschnitt des Abends — ohne Menschen, nur Atmosphäre'},
    {e:'🌀', t:'Mach ein Foto mit einer ungewöhnlichen Perspektive — von unten, von oben, durch etwas durch'},
    {e:'💫', t:'Foto von zwei Menschen in einem echten, ungestellten Gespräch'},
    // Streich-Aufgaben
    {e:'📸', t:'Bitte jemanden dir zu zeigen wie er "professionell posiert" — foto ihn beim Erklären und Vorzeigen. Das Foto kommt ins Album mit Titel: "Profi-Posing-Tutorial"', trick:true},
    {e:'🎭', t:'Überzeuge jemanden für ein "atmosphärisches Kunstfoto" still zu stehen und in die Ferne zu schauen — warte bis er anfängt zu blinzeln oder sich kratzt — dann foto.', trick:true},
    {e:'🪟', t:'Sag jemandem sein Outfit sieht "wirklich interessant aus heute" und foto seinen Gesichtsausdruck in den nächsten 3 Sekunden.', trick:true},
  ],

  party: [
    {e:'🕺', t:'Dance Battle: Fordere jemanden heraus — 30 Sek, foto den besten Moment'},
    {e:'🗣️', t:'Halte eine ERNST GEMEINTE 30-Sek Lobrede auf Kartoffeln vor min. 3 Leuten — foto die Reaktionen'},
    {e:'👗', t:'Tausche für genau 5 Minuten ein Kleidungsstück mit einer anderen Person — Beweis-Foto'},
    {e:'🤸', t:'Überzeuge jemanden gemeinsam mit dir gleichzeitig einen Liegestütz zu machen — foto den Moment'},
    {e:'🃏', t:'Erfinde auf der Stelle einen Zaubertrick und führe ihn sofort vor — foto die Reaktion des Publikums'},
    {e:'📞', t:'Ruf jemanden an der NICHT da ist — erkläre in 10 Sek warum er fehlt — foto dein Gesicht dabei'},
    {e:'🏆', t:'Überzeuge die ganze Gruppe dir spontan zu applaudieren — foto den Moment'},
    {e:'🫵', t:'Organisiere das wildeste Gruppenfoto des Abends — alle müssen mitziehen'},
    {e:'🤫', t:'Flüstere jemandem Unsinn ins Ohr — er gibt es weiter — foto das Gesicht des letzten in der Kette'},
    {e:'🦩', t:'Steh 30 Sek auf einem Bein — jemand anderes muss gleichzeitig auch — foto beide'},
    {e:'🌋', t:'Überzeuge jemanden mit dir den schlechtesten Witz des Abends zu erzählen — foto die Reaktion'},
    {e:'👑', t:'Lass dich von 3 Personen mit 3 verschiedenen Accessoires gleichzeitig krönen — Beweis-Foto'},
    {e:'🎪', t:'Organisiere in 2 Minuten eine spontane Menschenpyramide — Versuch zählt'},
    {e:'🎲', t:'Lass eine Person die du kaum kennst dein nächstes Getränk bestellen — foto dein Gesicht beim ersten Schluck'},
    {e:'🪄', t:'Überzeuge 5 Leute gleichzeitig denselben Ausdruck zu machen — foto das Ergebnis'},
    {e:'🎯', t:'Bring jemanden dazu mit dir einen Sprint zu laufen — egal wo — foto den Start'},
    {e:'🤙', t:'Lerne in 2 Minuten einen neuen Handshake von jemandem — foto den finalen Handshake'},
    {e:'🎤', t:'Singe laut den Refrain des aktuell laufenden Songs — foto die Reaktionen der anderen'},
    {e:'🧢', t:'Trage für 10 Minuten das Accessoire einer anderen Person — Beweis-Selfie'},
    {e:'🎊', t:'Organisiere einen spontanen Konfetti-Moment mit was auch immer du findest — foto den Moment'},
    {e:'🌮', t:'Überzeuge jemanden dir von seinem Teller etwas abzugeben das er eigentlich nicht teilen wollte'},
    {e:'🏄', t:'Bring 3 Leute dazu gleichzeitig eine Surfer-Pose zu machen'},
    {e:'🎭', t:'Spiele für 60 Sekunden eine komplett andere Person — jemand muss raten wer du bist'},
    {e:'🚀', t:'Organisiere einen spontanen Countdown zu nichts — alle zählen laut mit — foto den Moment bei Null'},
    {e:'💥', t:'Überzeuge jemanden mit dir gleichzeitig in die Kamera zu schauen und zu zwinkern — erster Versuch'},
    // Streich-Aufgaben
    {e:'📸', t:'Sag jemandem er hat "etwas im Gesicht" — foto seinen Gesichtsausdruck in dem Moment wo er anfängt daran rumzuwischen. Titel im Album: "Nichts war im Gesicht"', trick:true},
    {e:'🎭', t:'Überzeuge jemanden für ein "cooles Action-Shot" in die Luft zu springen — foto ihn aber kurz nach der Landung wenn er noch den Aufprall verarbeitet.', trick:true},
    {e:'👀', t:'Sag jemandem ruhig und ernst: "Warte mal kurz, ich muss kurz dein Gesicht analysieren" — schaue ihn 5 Sekunden intensiv an — foto seinen Gesichtsausdruck dabei.', trick:true},
    {e:'🪞', t:'Bitte jemanden "kurz mal so zu tun als wäre er ein Model" — foto ihn in dem Moment wo er anfängt sich in Pose zu werfen und noch nicht fertig ist.', trick:true},
    {e:'🎪', t:'Überzeuge jemanden dass ihr beide gleichzeitig "das gleiche Tier imitieren" müsst für eine Aufgabe — foto ihn beim Imitieren bevor er merkt dass du gar nichts machst.', trick:true},
  ],
}

// ─── FLASH CHALLENGES ─────────────────────────────────────────────────────────
export const FLASH_CHALLENGES = [
  {e:'⚡', t:'FLASH: Alle machen gleichzeitig das hässlichste Gesicht. Wer zuerst lacht verliert — foto das Ergebnis.', dur:45},
  {e:'⚡', t:'FLASH: Jeder zeigt in 10 Sekunden das letzte Foto in seiner Galerie — keine Ausrede — Reaktionen fotografieren.', dur:30},
  {e:'⚡', t:'FLASH: Alle stehen sofort auf und stellen sich nach Geburtstagsmonat in eine Reihe — ohne zu reden.', dur:60},
  {e:'⚡', t:'FLASH: Jeder sagt dem Nächsten neben ihm ein ehrliches Kompliment — laut vor allen — foto die Reaktion.', dur:40},
  {e:'⚡', t:'FLASH: Alle zeigen gleichzeitig ihre beste Tanzpose — einfrieren — foto.', dur:20},
  {e:'⚡', t:'FLASH: Wer kann am längsten still stehen ohne zu lachen? Alle gleichzeitig starten.', dur:60},
]

// ─── QUOTES ───────────────────────────────────────────────────────────────────
export const QUOTES = [
  'Manchmal sind es die ungeplanten Momente die man am längsten behält.',
  'Gute Zeiten werden besser wenn man sie teilt.',
  'Das war kein Abend. Das war eine Geschichte.',
  'Hier entstand gerade eine Legende.',
  'Die besten Erinnerungen entstehen wenn niemand damit rechnet.',
  'Nicht das Perfekte — das Echte bleibt.',
  'Irgendwann erzählt jemand von diesem Abend.',
  'Fotos verblassen nicht. Erinnerungen schon.',
]

// ─── BUILD TASK LIST ──────────────────────────────────────────────────────────
export function buildTaskList(vibe, count, customTasks = []) {
  const pool = [...(TASKS[vibe] || TASKS.party)]
  const goldenPool = GOLDEN_POOL[vibe] || GOLDEN_POOL.party

  // Pick random golden task
  const golden = {
    ...goldenPool[Math.floor(Math.random() * goldenPool.length)],
    isGold: true,
    ty: 'Foto',
  }

  // Shuffle pool
  const shuffled = pool.sort(() => Math.random() - 0.5)

  // Add custom tasks at the front (they always appear)
  const customFormatted = customTasks
    .filter(t => t.trim())
    .map((t, i) => ({e:'✏️', t, ty:'Foto', isCustom:true}))

  // Fill remaining slots with pool tasks
  const remaining = count - 1 - customFormatted.length
  const poolTasks = shuffled.slice(0, Math.max(remaining, 0))

  return [golden, ...customFormatted, ...poolTasks]
}
