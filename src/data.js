// ─── OCCASIONS & VIBES ───────────────────────────────────────────────────────
export const OCCASIONS = [
  {id:'birthday',  icon:'🎂', label:{de:'Geburtstag',        en:'Birthday'}},
  {id:'celebrate', icon:'💍', label:{de:'Hochzeit & JGA',     en:'Wedding & Bachelor'}},
  {id:'outdoor',   icon:'🌿', label:{de:'Outdoor',            en:'Outdoor'}},
  {id:'team',      icon:'💼', label:{de:'Team & Work',        en:'Team & Work'}},
  {id:'together',  icon:'👥', label:{de:'Familie & Freunde',  en:'Family & Friends'}},
  {id:'party',     icon:'🎉', label:{de:'Party',              en:'Party'}},
]

export const VIBES = [
  {id:'family', icon:'🌸', label:{de:'Für alle',       en:'For Everyone'}, desc:{de:'Alle Altersgruppen, kein Risiko', en:'All ages, no risk'}},
  {id:'chill',  icon:'😎', label:{de:'Entspannt',      en:'Relaxed'},      desc:{de:'Locker und kreativ', en:'Easy going and creative'}},
  {id:'party',  icon:'🔥', label:{de:'Party',          en:'Party'},        desc:{de:'Ab hier wird\'s wild', en:'Things get wild'}},
  {id:'bold',   icon:'🌶️', label:{de:'Mutig',          en:'Bold'},         desc:{de:'Nur für Erwachsene · Freiwillig', en:'Adults only · Always optional'}},
]

export const COUNTS = [10, 15, 20, 30, 40, 50]

// ─── GOLDEN TASK POOL ─────────────────────────────────────────────────────────
// 12 per vibe, random pick each session
export const GOLDEN_POOL = {
  family: [
    {e:'⭐', t:{de:'Mach das eine Foto dieses Abends das in 20 Jahren noch alle zum Lächeln bringt', en:'Take the one photo of this evening that will still make everyone smile in 20 years'}},
    {e:'⭐', t:{de:'Gruppenumarmung mit allen die heute da sind — foto von außen, niemand schaut in die Kamera', en:'Group hug with everyone here — photo from outside, nobody looks at the camera'}},
    {e:'⭐', t:{de:'Capture den ehrlichsten Moment des Abends — ungeplant, ungestellt', en:'Capture the most honest moment of the evening — unplanned, unposed'}},
    {e:'⭐', t:{de:'Das Foto das zeigt warum genau diese Menschen zusammengehören', en:'The photo that shows exactly why these people belong together'}},
    {e:'⭐', t:{de:'Stelle alle Generationen die heute da sind in einer Reihe auf — foto von vorne', en:'Line up all generations present today — photo from the front'}},
    {e:'⭐', t:{de:'Mach ein Foto das in 10 Jahren als Profilbild einer dieser Personen landen könnte', en:'Take a photo that could be someone\'s profile picture in 10 years'}},
    {e:'⭐', t:{de:'Der Moment kurz bevor jemand anfängt zu lachen — capture ihn', en:'The moment just before someone starts laughing — capture it'}},
    {e:'⭐', t:{de:'Alle machen denselben Gesichtsausdruck — aber jeder interpretiert ihn anders', en:'Everyone makes the same expression — but everyone interprets it differently'}},
    {e:'⭐', t:{de:'Das schönste Foto ohne Menschen — nur der Abend selbst', en:'The most beautiful photo without people — just the evening itself'}},
    {e:'⭐', t:{de:'Ein Bild das erklärt ohne Worte warum heute ein guter Tag war', en:'A picture that explains without words why today was a good day'}},
    {e:'⭐', t:{de:'Mach ein Foto das du deiner zukünftigen Familie zeigen würdest', en:'Take a photo you would show to your future family'}},
    {e:'⭐', t:{de:'Capture den Moment der diesen Abend von allen anderen unterscheidet', en:'Capture the moment that sets this evening apart from all others'}},
  ],
  chill: [
    {e:'⭐', t:{de:'Das Foto das wie ein Filmstill aussieht — perfekte Komposition, echter Moment', en:'The photo that looks like a movie still — perfect composition, real moment'}},
    {e:'⭐', t:{de:'Capture die Stimmung dieses Abends in einem einzigen Bild', en:'Capture the mood of this evening in a single image'}},
    {e:'⭐', t:{de:'Das Licht, der Moment, die Person — alles gleichzeitig perfekt', en:'The light, the moment, the person — all perfect simultaneously'}},
    {e:'⭐', t:{de:'Finde den einen Winkel der diesen Ort unvergesslich macht', en:'Find the one angle that makes this place unforgettable'}},
    {e:'⭐', t:{de:'Das Foto das in 5 Jahren Heimweh nach diesem Abend auslöst', en:'The photo that will make you nostalgic for this evening in 5 years'}},
    {e:'⭐', t:{de:'Capture jemanden in dem Moment in dem er ganz er selbst ist', en:'Capture someone in the moment when they are completely themselves'}},
    {e:'⭐', t:{de:'Das beste Foto deines Lebens — du hast diesen Abend dafür', en:'The best photo of your life — you have this evening for it'}},
    {e:'⭐', t:{de:'Mach ein Foto das beweist dass gute Abende keine Planung brauchen', en:'Take a photo that proves great evenings need no planning'}},
    {e:'⭐', t:{de:'Ein Bild nur wegen des Lichts — Menschen optional', en:'A picture purely because of the light — people optional'}},
    {e:'⭐', t:{de:'Capture etwas das die meisten heute Abend nie bemerkt haben', en:'Capture something that most people never noticed this evening'}},
    {e:'⭐', t:{de:'Das Foto von dem du weißt — das ist dieser Abend', en:'The photo where you just know — that\'s this evening'}},
    {e:'⭐', t:{de:'Zwei Menschen, ein echter Moment — kein Posieren erlaubt', en:'Two people, one real moment — no posing allowed'}},
  ],
  party: [
    {e:'⭐', t:{de:'Initiiere den legendärsten Moment des Abends — alle müssen dabei sein', en:'Create the most legendary moment of the night — everyone must be there'}},
    {e:'⭐', t:{de:'Das Foto das morgen früh alle weckt weil es so gut ist', en:'The photo that wakes everyone up tomorrow because it\'s that good'}},
    {e:'⭐', t:{de:'Mach das wildeste Gruppenfoto das je an diesem Ort gemacht wurde', en:'Take the wildest group photo ever taken at this location'}},
    {e:'⭐', t:{de:'Organisiere in 5 Minuten etwas das in 10 Jahren noch erzählt wird', en:'Organize something in 5 minutes that will still be told in 10 years'}},
    {e:'⭐', t:{de:'Das Foto das beweist dass heute Nacht episch war', en:'The photo that proves tonight was epic'}},
    {e:'⭐', t:{de:'Bring alle gleichzeitig dazu dasselbe zu tun — egal was', en:'Get everyone to do the same thing simultaneously — anything goes'}},
    {e:'⭐', t:{de:'Der beste Moment des Abends — du hast exakt 10 Sekunden', en:'The best moment of the night — you have exactly 10 seconds'}},
    {e:'⭐', t:{de:'Beweis in einem Foto dass diese Gruppe die beste Party-Crew ist', en:'Prove in one photo that this group is the best party crew'}},
    {e:'⭐', t:{de:'Mach ein Foto das erklärt warum niemand heute früh nach Hause will', en:'Take a photo that explains why nobody wants to go home early tonight'}},
    {e:'⭐', t:{de:'Der Moment der in 10 Jahren noch im Gruppenchat auftaucht', en:'The moment that will still appear in the group chat in 10 years'}},
    {e:'⭐', t:{de:'Kreiere spontan den denkwürdigsten Moment des Abends', en:'Spontaneously create the most memorable moment of the evening'}},
    {e:'⭐', t:{de:'Die eine Aufnahme die den ganzen Abend zusammenfasst', en:'The one shot that summarizes the entire evening'}},
  ],
  bold: [
    {e:'⭐', t:{de:'Das mutigste Foto des Abends — du weißt es wenn es passiert', en:'The boldest photo of the evening — you\'ll know it when it happens'}},
    {e:'⭐', t:{de:'Capture den Moment der heute Abend am meisten Mut gebraucht hat', en:'Capture the moment tonight that required the most courage'}},
    {e:'⭐', t:{de:'Das Foto das niemand erwartet hat — deshalb unvergesslich', en:'The photo nobody expected — that\'s why it\'s unforgettable'}},
    {e:'⭐', t:{de:'Der ehrlichste Moment des Abends — ungeplant, ungestellt, echt', en:'The most honest moment of the evening — unplanned, unposed, real'}},
    {e:'⭐', t:{de:'Das Foto das ihr morgen früh als erstes teilt', en:'The photo you\'ll share first thing tomorrow morning'}},
    {e:'⭐', t:{de:'Der Moment in dem jemand etwas getan hat das er sonst nie tut', en:'The moment someone did something they never normally do'}},
    {e:'⭐', t:{de:'Capture die lauteste Reaktion des Abends', en:'Capture the loudest reaction of the evening'}},
    {e:'⭐', t:{de:'Das Foto das diese Gruppe in ihrem mutigsten Moment zeigt', en:'The photo that shows this group at their boldest'}},
    {e:'⭐', t:{de:'Der Moment kurz bevor jemand etwas Mutiges tut', en:'The moment just before someone does something bold'}},
    {e:'⭐', t:{de:'Capture jemanden genau dann wenn er aufgehört hat sich zu verstellen', en:'Capture someone exactly when they stopped pretending'}},
    {e:'⭐', t:{de:'Das Foto das in 10 Jahren immer noch für Gesprächsstoff sorgt', en:'The photo that will still spark conversation in 10 years'}},
    {e:'⭐', t:{de:'Der wildeste aber ehrlichste Moment des Abends', en:'The wildest but most honest moment of the evening'}},
  ],
}

// ─── OCCASION × VIBE TASK POOLS ───────────────────────────────────────────────
// 15+ tasks per combination = 18 pools = 270+ occasion-specific tasks
// trick:true tasks are secretly prank tasks — player doesn't know until album reveal

export const OCCASION_TASKS = {

  // ════════════════════════════════════════════════════════════════
  // 🎂 GEBURTSTAG
  // ════════════════════════════════════════════════════════════════
  birthday_family: [
    {e:'🎂', t:{de:'Foto des Geburtstagskuchens BEVOR die Kerzen angezündet werden — und dann direkt danach', en:'Photo of the birthday cake BEFORE the candles are lit — and then directly after'}},
    {e:'🕯️', t:{de:'Lass das Geburtstagskind eine einzelne Kerze auspusten — foto genau in dem Moment', en:'Let the birthday person blow out a single candle — photo at the exact moment'}},
    {e:'🎁', t:{de:'Wer hat das ungewöhnlichste Geschenk mitgebracht? Foto von Schenker und Beschenktem zusammen', en:'Who brought the most unusual gift? Photo of giver and recipient together'}},
    {e:'📸', t:{de:'Stellt ein altes Foto des Geburtstagskinds nach — findet ähnliche Pose und Gesichtsausdruck', en:'Recreate an old photo of the birthday person — find similar pose and expression'}},
    {e:'🥂', t:{de:'Organisiere einen Toast bei dem jeder sagt was er an der Geburtstagsperson mag — foto die Reaktion', en:'Organize a toast where everyone says what they love about the birthday person — photo the reaction'}},
    {e:'👶', t:{de:'Wer kennt das Geburtstagskind am längsten? Foto beider zusammen mit beweis der Freundschaft', en:'Who has known the birthday person the longest? Photo of both with proof of friendship'}},
    {e:'🎵', t:{de:'Bring 5 Personen dazu Happy Birthday zu singen — aber jede Person fängt mit einer anderen Strophe an', en:'Get 5 people to sing Happy Birthday — but each person starts with a different verse'}},
    {e:'🌟', t:{de:'Mach ein Foto mit genau so vielen Personen wie das Geburtstagskind Jahre alt wird', en:'Take a photo with exactly as many people as the birthday person is years old'}},
    {e:'💌', t:{de:'Sammle handgeschriebene Glückwünsche von 5 verschiedenen Personen auf einem Stück Papier — foto das Ergebnis', en:'Collect handwritten wishes from 5 different people on one piece of paper — photo the result'}},
    {e:'🎈', t:{de:'Bau aus vorhandenen Materialien eine Dekoration für das Geburtstagskind — foto beides zusammen', en:'Build a decoration for the birthday person from available materials — photo both together'}},
    {e:'👑', t:{de:'Kröne das Geburtstagskind mit allem was ihr finden könnt — je mehr desto besser', en:'Crown the birthday person with everything you can find — the more the better'}},
    {e:'🤫', t:{de:'STREICH: Sag dem Geburtstagskind es habe "Sahne im Gesicht" — foto seinen Gesichtsausdruck beim Prüfen', en:'PRANK: Tell the birthday person they have "cream on their face" — photo their expression while checking'}, trick:true},
    {e:'📷', t:{de:'STREICH: Überzeuge das Geburtstagskind es brauche ein "offizielles Foto" — knips es kurz bevor es fertig posiert', en:'PRANK: Convince the birthday person they need an "official photo" — snap it just before they finish posing'}, trick:true},
    {e:'🍰', t:{de:'Wer bekommt das erste Stück Torte? Foto der Übergabe mit den Gesichtsausdrücken beider', en:'Who gets the first slice of cake? Photo of the handover with both their expressions'}},
    {e:'🎀', t:{de:'Das Geburtstagskind und die Person die ihm heute am wichtigsten ist — ein echtes, ungestelltes Foto', en:'The birthday person and the person most important to them today — one genuine, unposed photo'}},
  ],

  birthday_chill: [
    {e:'🎂', t:{de:'Foto der Kerzen im Dunkeln kurz bevor sie ausgeblasen werden — nur das Licht', en:'Photo of the candles in the dark just before they\'re blown out — just the light'}},
    {e:'🌟', t:{de:'Capture die Reaktion des Geburtstagskinds wenn es sein Lieblingsgeschenk öffnet', en:'Capture the birthday person\'s reaction when they open their favorite gift'}},
    {e:'📝', t:{de:'Lass 3 Personen aufschreiben was sie dem Geburtstagskind für das nächste Jahr wünschen — foto alle Zettel', en:'Have 3 people write down what they wish for the birthday person this year — photo all notes'}},
    {e:'🕰️', t:{de:'Foto von dem Moment in dem das Geburtstagskind gerade nicht beobachtet wird — so wie es wirklich ist', en:'Photo of the moment when the birthday person is not being watched — as they really are'}},
    {e:'🌸', t:{de:'Finde den schönsten Ort an dem Geburtstagslocation und mach ein Porträt des Geburtstagskinds dort', en:'Find the most beautiful spot at the birthday location and take a portrait of the birthday person there'}},
    {e:'💭', t:{de:'Frage das Geburtstagskind was es sich noch vor einem Jahr für heute gewünscht hatte — foto den Gesichtsausdruck bei der Antwort', en:'Ask the birthday person what they had wished for today a year ago — photo their expression when answering'}},
    {e:'🎨', t:{de:'Zeichne das Geburtstagskind in 90 Sekunden auf einer Serviette — überreiche es ihm feierlich', en:'Draw the birthday person in 90 seconds on a napkin — present it ceremoniously'}},
    {e:'📸', t:{de:'STREICH: Frage das Geburtstagskind ob du ein "atmosphärisches Porträt" machen darfst — foto es 30 Sekunden später wenn es vergessen hat zu posieren', en:'PRANK: Ask the birthday person if you can take an "atmospheric portrait" — photo them 30 seconds later when they\'ve forgotten to pose'}, trick:true},
    {e:'🌙', t:{de:'Mach ein Foto das zeigt wie die Location in der besten Lichtstimmung des Abends aussieht', en:'Take a photo showing what the location looks like in the best lighting of the evening'}},
    {e:'💫', t:{de:'Zwei enge Freunde des Geburtstagskinds in einem echten Gespräch — kein Posieren', en:'Two close friends of the birthday person in a real conversation — no posing'}},
    {e:'🎭', t:{de:'Das Geburtstagskind spielt die Szene nach in der es sein bestes Geburtstagsgeschenk aller Zeiten bekommen hat', en:'The birthday person acts out the scene where they received the best birthday gift of all time'}},
    {e:'🌅', t:{de:'Finde das beste natürliche Licht hier und mach damit das schönste Geburtstagsfoto', en:'Find the best natural light here and use it to take the most beautiful birthday photo'}},
    {e:'🍰', t:{de:'Macro-Foto von einem Kuchenstück so nah wie dein Handy kann', en:'Macro photo of a slice of cake as close as your phone can get'}},
    {e:'🤍', t:{de:'Das Geburtstagskind und sein ältestes Familienmitglied — ein stilles echtes Bild', en:'The birthday person and their oldest family member — a quiet, real photo'}},
    {e:'✨', t:{de:'Capture genau den Moment wenn die Kerzen alle ausgepustet sind — das Gesicht des Geburtstagskinds', en:'Capture exactly the moment when all candles are blown out — the birthday person\'s face'}},
  ],

  birthday_party: [
    {e:'🎂', t:{de:'Überzeuge das Geburtstagskind 30 Sekunden lang einen Geburtstagssong nach eigenem Ermessen vorzusingen — laut', en:'Convince the birthday person to sing a birthday song of their choice for 30 seconds — loud'}},
    {e:'👑', t:{de:'Alle setzen dem Geburtstagskind gleichzeitig etwas auf den Kopf — wer findet das Lustigste', en:'Everyone puts something on the birthday person\'s head simultaneously — who finds the funniest thing'}},
    {e:'🎯', t:{de:'Das Geburtstagskind muss 3 Personen dazu bringen ihm zu applaudieren — mit echter Begründung', en:'The birthday person must get 3 people to applaud them — with a real justification'}},
    {e:'🕺', t:{de:'Geburtstags-Dance: Das Geburtstagskind tanzt vor, alle anderen machen exakt nach — 30 Sekunden', en:'Birthday dance: the birthday person dances first, everyone else copies exactly — 30 seconds'}},
    {e:'📞', t:{de:'Das Geburtstagskind ruft jemanden an der NICHT da ist und singt ihm kurz Happy Birthday — foto das Gesicht dabei', en:'The birthday person calls someone who is NOT there and briefly sings Happy Birthday — photo their face'}},
    {e:'🏆', t:{de:'Hält jemand eine 30-Sek-Laudatio auf das Geburtstagskind — je übertriebener desto besser — foto die Reaktion', en:'Someone gives a 30-sec speech about the birthday person — the more exaggerated the better — photo the reaction'}},
    {e:'🎁', t:{de:'Das skurrilste Geburtstagsgeschenk das man mit vorhandenen Dingen improvisieren kann — überreiche es feierlich', en:'The most bizarre birthday gift that can be improvised from available things — present it ceremoniously'}},
    {e:'🤫', t:{de:'STREICH: Alle tun 10 Sekunden lang so als hätten sie das Geburtstagskind vergessen — foto die Reaktion', en:'PRANK: Everyone acts for 10 seconds as if they\'ve forgotten the birthday person — photo the reaction'}, trick:true},
    {e:'🎪', t:{de:'Menschenpyramide zu Ehren des Geburtstagskinds — Versuch zählt, Foto des Versuchs', en:'Human pyramid in honor of the birthday person — attempt counts, photo of the attempt'}},
    {e:'🥂', t:{de:'Der verrückteste Toast des Abends auf das Geburtstagskind — wer hat den kuriosesten Wunsch', en:'The craziest toast of the evening for the birthday person — who has the most unusual wish'}},
    {e:'🎤', t:{de:'Freestyle Geburtstagsrapper: 8 Zeilen über das Geburtstagskind — auf der Stelle', en:'Freestyle birthday rapper: 8 lines about the birthday person — on the spot'}},
    {e:'👗', t:{de:'Das Geburtstagskind tauscht für genau 5 Minuten ein Kleidungsstück mit jemandem', en:'The birthday person swaps one clothing item with someone for exactly 5 minutes'}},
    {e:'📸', t:{de:'STREICH: Überzeuge das Geburtstagskind für ein "ernstes Jahrbuchfoto" zu posieren — mach aber das Foto wenn es noch überlegt welche Pose', en:'PRANK: Convince the birthday person to pose for a "serious yearbook photo" — but take the photo while they\'re still deciding on the pose'}, trick:true},
    {e:'🌟', t:{de:'Alle stehen in einer Reihe nach Länge der Freundschaft mit dem Geburtstagskind — foto der Reihe', en:'Everyone lines up by length of friendship with the birthday person — photo of the line'}},
    {e:'🎭', t:{de:'Das Geburtstagskind imitiert für 30 Sek eine anwesende Person — die Gruppe rät wen', en:'The birthday person imitates a person present for 30 sec — the group guesses who'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 🏕️ CAMPING
  // ════════════════════════════════════════════════════════════════
  camping_family: [
    {e:'🔥', t:{de:'Wer hat das Lagerfeuer entfacht? Foto beider — Feuermacher stolz, Feuer im Hintergrund', en:'Who lit the campfire? Photo of them — fire-starter proud, fire in background'}},
    {e:'⛺', t:{de:'Foto des aufgebauten Zelts VOR dem ersten Einschlafen — und morgen früh danach', en:'Photo of the pitched tent BEFORE the first night — and tomorrow morning after'}},
    {e:'🌲', t:{de:'Alle stellen sich hinter einen Baum — nur die Nasen schauen raus — Foto von vorne', en:'Everyone stands behind a tree — only the noses stick out — photo from the front'}},
    {e:'🌙', t:{de:'Familienfoto am Lagerfeuer — Handys weg, nur das Feuerlicht — warte auf den richtigen Moment', en:'Family photo by the campfire — phones away, only firelight — wait for the right moment'}},
    {e:'🍄', t:{de:'Findet gemeinsam 5 verschiedene Dinge in der Natur die man normal übersehen würde — foto alle auf einmal', en:'Find 5 different things in nature together that are normally overlooked — photo all at once'}},
    {e:'🎒', t:{de:'Wessen Rucksack ist am vollsten bepackt? Foto des Inhalts ausgebreitet auf dem Boden', en:'Whose backpack is most fully packed? Photo of contents spread out on the ground'}},
    {e:'☕', t:{de:'Das erste Getränk am Morgen — wer macht den Kaffee? Foto des Moments mit Dampf sichtbar', en:'The first drink in the morning — who makes the coffee? Photo of the moment with steam visible'}},
    {e:'🌅', t:{de:'Alle sitzen in einer Reihe und schauen in dieselbe Richtung — foto von der Seite', en:'Everyone sits in a row looking in the same direction — photo from the side'}},
    {e:'🦋', t:{de:'Welches Tier habt ihr heute entdeckt? Foto des Tieres ODER des Gesichtsausdrucks beim Entdecken', en:'Which animal did you discover today? Photo of the animal OR the expression when discovering it'}},
    {e:'🪵', t:{de:'Baut aus Ästen und Naturmaterial etwas zusammen — foto das Ergebnis mit allen Baumeistern', en:'Build something together from branches and natural materials — photo the result with all builders'}},
    {e:'🌿', t:{de:'Wer findet die ungewöhnlichste Pflanze in der Nähe? Foto der Pflanze UND der Person die sie findet', en:'Who finds the most unusual plant nearby? Photo of the plant AND the person who finds it'}},
    {e:'🌧️', t:{de:'STREICH: Überzeuge jemanden "es kommt Regen" — foto seinen Gesichtsausdruck wenn er in den klaren Himmel schaut', en:'PRANK: Convince someone "it\'s going to rain" — photo their expression when they look up at the clear sky'}, trick:true},
    {e:'🏞️', t:{de:'Das schönste Panorama das ihr heute gesehen habt — alle stehen mit dem Rücken dazu', en:'The most beautiful panorama you\'ve seen today — everyone stands with their back to it'}},
    {e:'🧦', t:{de:'Alle zeigen ihre Campingsocken gleichzeitig — foto der buntesten Sammlung', en:'Everyone shows their camping socks simultaneously — photo of the most colorful collection'}},
    {e:'🌠', t:{de:'Wer findet zuerst einen Stern der Milchstraße? Zeige per Finger — foto des Zeigens in den Himmel', en:'Who first finds a star of the Milky Way? Point with your finger — photo of the pointing at the sky'}},
  ],

  camping_chill: [
    {e:'🌅', t:{de:'Das Morgenlicht auf dem Zelt — warte auf den exakten Moment wenn die Sonne es trifft', en:'The morning light on the tent — wait for the exact moment when the sun hits it'}},
    {e:'🔥', t:{de:'Flammen in Bewegung — halte die Kamera ganz still und warte auf die schönste Flammenform', en:'Flames in motion — hold the camera perfectly still and wait for the most beautiful flame shape'}},
    {e:'🌲', t:{de:'Foto von unten nach oben durch die Baumkronen — lass den Himmel durchscheinen', en:'Photo from below upward through the tree canopy — let the sky shine through'}},
    {e:'☕', t:{de:'Eine dampfende Tasse mit Naturhintergrund — warte auf Moment wenn Dampf und Licht zusammenpassen', en:'A steaming cup with natural background — wait for the moment when steam and light align'}},
    {e:'🌙', t:{de:'Lagerfeuersilhouetten — stelle dich so dass du nur als Silhouette gegen das Feuer erkennbar bist', en:'Campfire silhouettes — position yourself so you\'re only recognizable as a silhouette against the fire'}},
    {e:'🦅', t:{de:'5 Minuten still sitzen und warten bis ein Tier in Sichtweite kommt — foto ohne Ton und Bewegung', en:'Sit still for 5 minutes and wait until an animal comes into sight — photo without sound or movement'}},
    {e:'💧', t:{de:'Wassertropfen, Tau oder ein Bach in Nahaufnahme — so nah wie möglich', en:'Water drops, dew, or a stream in close-up — as close as possible'}},
    {e:'🌿', t:{de:'Finde etwas in der Natur das so aussieht als wäre es aus einem Kunstbuch', en:'Find something in nature that looks like it\'s from an art book'}},
    {e:'🌄', t:{de:'Licht und Schatten im Wald — suche einen Moment wo beides dramatically zusammenkommt', en:'Light and shadow in the forest — find a moment where both come together dramatically'}},
    {e:'🏕️', t:{de:'Das Lager von außen betrachtet — gehe 50 Meter weg und schau zurück', en:'The camp viewed from outside — walk 50 meters away and look back'}},
    {e:'🪵', t:{de:'Die Maserung eines alten Baumstamms in extremer Nahaufnahme', en:'The grain of an old tree trunk in extreme close-up'}},
    {e:'📸', t:{de:'STREICH: Bitte jemanden 2 Minuten absolut still zu stehen für ein "Langzeitbelichtungsfoto" — foto ihn nach 10 Sekunden wenn er noch wartet', en:'PRANK: Ask someone to stand absolutely still for 2 minutes for a "long exposure photo" — photo them after 10 seconds while still waiting'}, trick:true},
    {e:'🌊', t:{de:'Das Geräusch des Abends in einem Foto — was hört man hier und wie sieht das aus', en:'The sound of the evening in a photo — what can you hear here and what does it look like'}},
    {e:'✨', t:{de:'Das erste Sternenbild das du erkennst — zeige es mit dem Finger und lass jemanden das Foto machen', en:'The first constellation you recognize — point at it and have someone take the photo'}},
    {e:'🍃', t:{de:'Finde ein Blatt das wie ein Miniatur-Baum aussieht — foto mit dem echten Baum im Hintergrund', en:'Find a leaf that looks like a miniature tree — photo with the real tree in the background'}},
  ],

  camping_party: [
    {e:'🔥', t:{de:'Wer springt zuerst über das Lagerfeuer — nein warte, wer TANZT am nächsten dran', en:'Who jumps over the campfire — no wait, who DANCES closest to it'}},
    {e:'🎸', t:{de:'Lagerfeuergitarre oder Luftgitarre — 30 Sekunden Solo vor der Gruppe, Lagerfeuer im Hintergrund', en:'Campfire guitar or air guitar — 30 second solo in front of the group, campfire in background'}},
    {e:'🌙', t:{de:'Mitternachts-Challenge: Alle schreien gleichzeitig so laut sie können in den Wald — foto der Gesichtsausdrücke danach', en:'Midnight challenge: Everyone screams as loud as they can into the forest simultaneously — photo of expressions after'}},
    {e:'🏕️', t:{de:'Wer kann am schnellsten ein Zelt aufbauen? Timer läuft — foto des Siegers mit Zelt im Hintergrund', en:'Who can pitch a tent the fastest? Timer running — photo of winner with tent in background'}},
    {e:'🤸', t:{de:'Yoga-Pose am Lagerfeuer — halte die schwierigste Pose 10 Sekunden — foto muss Feuer zeigen', en:'Yoga pose at the campfire — hold the most difficult pose for 10 seconds — photo must show the fire'}},
    {e:'🌲', t:{de:'Wer klettert am höchsten auf einen Baum — sicher und foto von unten nach oben', en:'Who climbs highest into a tree — safely and photo from below upward'}},
    {e:'🎪', t:{de:'Menschenpyramide im Freien — mindestens 3 Lagen — Lagerfeuer oder Natur im Hintergrund', en:'Human pyramid outdoors — at least 3 levels — campfire or nature in background'}},
    {e:'🏃', t:{de:'Sprint zwischen zwei Bäumen — 3 Teilnehmer gleichzeitig starten — foto im Ziel', en:'Sprint between two trees — 3 participants start simultaneously — photo at the finish'}},
    {e:'🍖', t:{de:'Wer grillt das ungewöhnlichste Ding? Foto des Gegrillten mit stolzem Grillmeister', en:'Who grills the most unusual thing? Photo of the grilled item with proud grill master'}},
    {e:'🌊', t:{de:'Wer geht als letztes ins Wasser oder traut sich am nächsten ran — foto der Mutigen', en:'Who goes last into the water or dares to get closest — photo of the brave one'}},
    {e:'🎭', t:{de:'Lagerfeuerpantomime: Stelle einen Wildtierfilm-Moment nach — die Gruppe rät was', en:'Campfire pantomime: Act out a wildlife documentary moment — the group guesses what'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden es gebe ein "seltenes Tier" hinter ihm — foto sein Gesicht wenn er umschaut', en:'PRANK: Convince someone there\'s a "rare animal" behind them — photo their face when they turn around'}, trick:true},
    {e:'🌠', t:{de:'Alle wünschen sich gleichzeitig etwas bei einer Sternschnuppe — egal ob eine da ist — foto der wünschenden Gesichter nach oben', en:'Everyone wishes simultaneously for something at a shooting star — whether there is one or not — photo of wishing faces looking up'}},
    {e:'🔦', t:{de:'Taschenlampen-Silhouettenshow: Einer wirft Schatten gegen eine helle Fläche — die anderen raten was', en:'Flashlight silhouette show: One person casts shadows against a light surface — others guess what'}},
    {e:'🪓', t:{de:'Wer kann den besten Holz-Hackerstreich machen — foto der Axt-Pose als wäre man ein Lumberjack', en:'Who can do the best lumberjack impression — photo of the axe pose as if you\'re a lumberjack'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 🤝 TEAMBUILDING
  // ════════════════════════════════════════════════════════════════
  team_family: [
    {e:'🤝', t:{de:'Finde die Person im Team mit der du am wenigsten zu tun hast — mach ein Foto mit ihr und lerne ihren Namen', en:'Find the person on the team you interact with least — take a photo with them and learn their name'}},
    {e:'🌟', t:{de:'Welches Talent hat ein Kollege das du noch nicht kanntest? Zeige es — foto des Moments', en:'What talent does a colleague have that you didn\'t know? Show it — photo of the moment'}},
    {e:'🎨', t:{de:'Zeichne in 60 Sek ein Porträt eines Kollegen — er bekommt es danach', en:'Draw a portrait of a colleague in 60 sec — they keep it afterward'}},
    {e:'🏆', t:{de:'Nominiere einen Kollegen für einen selbst erfundenen Award — überreiche ihn feierlich', en:'Nominate a colleague for a self-invented award — present it ceremoniously'}},
    {e:'📸', t:{de:'Das offiziellste Teamfoto das ihr hinbekommt — wie bei einer Behörde, alle ernst', en:'The most official team photo you can manage — like at a government office, everyone serious'}},
    {e:'🌍', t:{de:'Wer im Team war am weitesten weg? Zeige es auf einer improvisierten Karte', en:'Who on the team has been furthest away? Show it on an improvised map'}},
    {e:'💡', t:{de:'Was ist die verrückteste Idee die ihr gemeinsam umsetzen würdet wenn ihr könntet? Stellt sie dar', en:'What\'s the craziest idea you\'d implement together if you could? Act it out'}},
    {e:'🎭', t:{de:'Stelle ohne Worte dar was dein Job wirklich ist — Kollegen raten — foto der Darstellung', en:'Act out what your job really is without words — colleagues guess — photo of the act'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge einen Kollegen es gebe einen "wichtigen Anruf" für ihn — foto seinen Ausdruck wenn er merkt es ist keiner', en:'PRANK: Convince a colleague there\'s an "important call" for them — photo their expression when they realize there isn\'t'}, trick:true},
    {e:'🦸', t:{de:'Wählt zusammen euren Team-Superhelden — foto der Pose als Superheld', en:'Choose your team superhero together — photo of the superhero pose'}},
    {e:'🌱', t:{de:'Was hat jeder einzeln im letzten Jahr gelernt? Alle halten gleichzeitig einen Zettel hoch', en:'What has each person learned individually in the past year? Everyone holds up a note simultaneously'}},
    {e:'🎵', t:{de:'Das Team erfindet gemeinsam einen Firmenjingle in 3 Minuten — alle trällern ihn zusammen', en:'The team invents a company jingle together in 3 minutes — everyone hums it together'}},
    {e:'🤲', t:{de:'Alle legen eine Hand übereinander — foto von oben, nur Hände sichtbar', en:'Everyone stacks one hand on top — photo from above, only hands visible'}},
    {e:'🌈', t:{de:'Ordnet euch nach T-Shirt Farbe zu einem Regenbogen — foto des Ergebnisses', en:'Arrange yourselves by shirt color into a rainbow — photo of the result'}},
    {e:'📊', t:{de:'Wer hat die einzigartigste Fähigkeit im Team? Zeigt sie kurz — foto dabei', en:'Who has the most unique skill in the team? Show it briefly — photo while doing it'}},
  ],

  team_chill: [
    {e:'🌿', t:{de:'Finde einen ruhigen Moment in dem ein Kollege ganz entspannt ist — foto ohne dass er es merkt', en:'Find a quiet moment where a colleague is completely relaxed — photo without them noticing'}},
    {e:'☕', t:{de:'Das perfekte Pause-Foto: Zwei Kollegen, zwei Tassen, ein echtes Gespräch', en:'The perfect break photo: two colleagues, two cups, one real conversation'}},
    {e:'💭', t:{de:'Frage 3 Kollegen was ihnen an der Arbeit wirklich Spaß macht — foto jeden beim Antworten', en:'Ask 3 colleagues what they genuinely enjoy about work — photo each while answering'}},
    {e:'🎨', t:{de:'Findet gemeinsam den schönsten Ort an eurem Event-Ort und macht ein stilles Teamfoto dort', en:'Find the most beautiful spot at your event location together and take a quiet team photo there'}},
    {e:'🔍', t:{de:'Was übersehen die meisten in eurem Büroalltag? Findet es — foto es', en:'What do most people overlook in your daily office life? Find it — photo it'}},
    {e:'📸', t:{de:'STREICH: Bitte einen Kollegen für ein "professionelles LinkedIn-Foto" zu posieren — foto ihn beim ernsten Posieren kurz bevor er fertig ist', en:'PRANK: Ask a colleague to pose for a "professional LinkedIn photo" — photo them while seriously posing just before they\'re ready'}, trick:true},
    {e:'🌱', t:{de:'Macht ein Foto das euren Team-Spirit zeigt — ohne Worte, nur Bild', en:'Take a photo that shows your team spirit — without words, just the image'}},
    {e:'🦋', t:{de:'Welcher Kollege hat einen komplett anderen Hobby als du erwartet hättest? Lass ihn es kurz darstellen', en:'Which colleague has a completely different hobby than you would have expected? Let them briefly demonstrate'}},
    {e:'🌙', t:{de:'Das Team in seiner natürlichsten Form — wählt den Moment wenn niemand weiß dass ein Foto gemacht wird', en:'The team in its most natural form — choose the moment when nobody knows a photo is being taken'}},
    {e:'🎯', t:{de:'Stellt eure Abteilung/euer Team in einem Foto ohne Worte dar — jeder nimmt eine Rolle ein', en:'Represent your department/team in a photo without words — everyone takes on a role'}},
    {e:'🏞️', t:{de:'Findet den ungewöhnlichsten Ort zum Teamfoto — je überraschender der Hintergrund desto besser', en:'Find the most unusual location for a team photo — the more surprising the background the better'}},
    {e:'✍️', t:{de:'Jeder schreibt auf einen Zettel was er über den Kollegen links neben ihm denkt — ohne Namen — foto alle Zettel', en:'Everyone writes on a note what they think about the colleague to their left — without names — photo all notes'}},
    {e:'🌅', t:{de:'Das Event-Feeling in einem Bild — suche 5 Minuten und mach dann genau ein Foto', en:'The event feeling in one image — search for 5 minutes then take exactly one photo'}},
    {e:'💡', t:{de:'Findet gemeinsam eine Lösung für ein erfundenes Problem — stellt sie nach', en:'Find a solution together for a made-up problem — act it out'}},
    {e:'🎭', t:{de:'Wer im Team hat den besten "Chef-Gesichtsausdruck"? Alle versuchen ihn — foto des besten', en:'Who on the team has the best "boss expression"? Everyone tries it — photo of the best'}},
  ],

  team_party: [
    {e:'🕺', t:{de:'Büro-Dance-Battle: Zwei Kollegen, 30 Sekunden jeder — die Gruppe entscheidet per Applaus', en:'Office dance battle: two colleagues, 30 seconds each — the group decides by applause'}},
    {e:'🎤', t:{de:'Freestyle-Rap über den Arbeitsalltag — 8 Zeilen, auf der Stelle, Kollegen als Publikum', en:'Freestyle rap about work life — 8 lines, on the spot, colleagues as audience'}},
    {e:'🏆', t:{de:'Die "Mitarbeiter des Abends" Verleihung: Selbst erfundene Awards, je absurder desto besser', en:'The "Employee of the Evening" awards: self-invented trophies, the more absurd the better'}},
    {e:'🎭', t:{de:'Büro-Rollenspiel: Einer spielt den Chef, einer den Mitarbeiter in einem unmöglichen Meeting — 1 Minute', en:'Office roleplay: one plays the boss, one the employee in an impossible meeting — 1 minute'}},
    {e:'🤸', t:{de:'Wer macht die beste Imitation eines anderen Kollegen — ohne Namen zu nennen — die Gruppe rät', en:'Who does the best imitation of another colleague — without naming them — the group guesses'}},
    {e:'📱', t:{de:'Slack/Mail-Bingo: Wer findet zuerst eine E-Mail die sich rückblickend falsch priorisiert anfühlt — screenshot foto', en:'Slack/email bingo: who first finds an email that in hindsight feels wrongly prioritized — screenshot photo'}},
    {e:'🎯', t:{de:'Das wildeste Teamfoto das diese Gruppe je gemacht hat — kein Limit, keine Regeln', en:'The wildest team photo this group has ever taken — no limits, no rules'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge einen Kollegen es gebe eine "spontane Präsentation" die er halten müsse — foto seinen Gesichtsausdruck', en:'PRANK: Convince a colleague there\'s a "spontaneous presentation" they must give — photo their expression'}, trick:true},
    {e:'🥂', t:{de:'Toast auf die Firma — aber jeder sagt das Ehrlichste was er denkt — foto der Gesichtsausdrücke', en:'Toast to the company — but everyone says the most honest thing they think — photo of the expressions'}},
    {e:'🦸', t:{de:'Erstelle sofort einen Team-Superhelden-Comic mit vorhandenen Materialien — foto das Ergebnis', en:'Create an instant team superhero comic with available materials — photo the result'}},
    {e:'🎪', t:{de:'Bürozirkus: Wer hat den seltsamsten verborgenen Talent? Zeige es jetzt — foto der Reaktionen', en:'Office circus: who has the strangest hidden talent? Show it now — photo of the reactions'}},
    {e:'📸', t:{de:'STREICH: Alle tun 20 Sekunden so als würden sie den CEO erwarten — foto wenn der Kollege verwirrt reinschaut', en:'PRANK: Everyone acts for 20 seconds as if waiting for the CEO — photo when a colleague looks in confused'}, trick:true},
    {e:'🏃', t:{de:'Büro-Olympiade: Wer schafft es am elegantesten rückwärts zu laufen — foto im Ziel', en:'Office Olympics: who can walk backwards most elegantly — photo at the finish line'}},
    {e:'🎵', t:{de:'Der Firmenjingle den niemand kennt — erfindet ihn in 2 Minuten — alle singen ihn', en:'The company jingle nobody knows — invent it in 2 minutes — everyone sings it'}},
    {e:'🌟', t:{de:'Wer überredet wen zu was das er heute noch nicht machen wollte? Foto des Moments', en:'Who convinces whom to do what they didn\'t want to do today? Photo of the moment'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 👨‍👩‍👧 FAMILIE
  // ════════════════════════════════════════════════════════════════
  family_family: [
    {e:'👴', t:{de:'Foto von der ältesten und der jüngsten Person zusammen — beide halten denselben Gegenstand', en:'Photo of the oldest and youngest person together — both holding the same object'}},
    {e:'🌳', t:{de:'Aufgestellt nach Alter — älteste Person links, jüngste rechts — foto von vorne', en:'Lined up by age — oldest person on the left, youngest on the right — photo from the front'}},
    {e:'📸', t:{de:'Findet ein altes Familienfoto und stellt es nach — so nah wie möglich an Original', en:'Find an old family photo and recreate it — as close to the original as possible'}},
    {e:'🤗', t:{de:'Die längste Familienkette die ihr bilden könnt — alle halten sich an den Schultern', en:'The longest family chain you can form — everyone holds onto each other\'s shoulders'}},
    {e:'🍳', t:{de:'Wer ist der beste Koch der Familie? Foto von ihm bei der Arbeit — ohne dass er es weiß', en:'Who is the best cook in the family? Photo of them at work — without them knowing'}},
    {e:'📖', t:{de:'Frag das älteste Familienmitglied nach seiner liebsten Kindheitserinnerung — foto es beim Erzählen', en:'Ask the oldest family member their favorite childhood memory — photo them while telling it'}},
    {e:'🌺', t:{de:'Welche Eigenschaft hat jedes Familienmitglied von wem geerbt? Stellt es dar', en:'Which characteristic has each family member inherited from whom? Act it out'}},
    {e:'🎭', t:{de:'Mach eine Szene nach die in dieser Familie wirklich passiert ist — alle kennen sie', en:'Recreate a scene that really happened in this family — everyone knows it'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge das älteste Familienmitglied jemand anderes habe angerufen — foto den Gesichtsausdruck beim Abheben', en:'PRANK: Convince the oldest family member someone else called — photo their expression when answering'}, trick:true},
    {e:'🎵', t:{de:'Gibt es ein Familienlied das alle kennen? Alle summen es zusammen — foto der singenden Gesichter', en:'Is there a family song everyone knows? Everyone hums it together — photo of singing faces'}},
    {e:'🦋', t:{de:'Finde die Ähnlichkeiten: Wer hat dieselbe Nase? Dieselben Hände? Foto des besten Paares', en:'Find the similarities: who has the same nose? Same hands? Photo of the best matching pair'}},
    {e:'🏠', t:{de:'Was ist das älteste Objekt das jemand dabei hat? Foto des Objekts mit seiner Geschichte', en:'What is the oldest object someone has with them? Photo of the object with its story'}},
    {e:'🌙', t:{de:'Das Familienmitglied das am weitesten gereist ist um hierherzukommen — foto mit Kilometeranzahl', en:'The family member who traveled furthest to get here — photo with kilometer count'}},
    {e:'💌', t:{de:'Was würde jedes Familienmitglied dem 10-jährigen sich selbst sagen? Alle schreiben es auf — foto der Zettel', en:'What would each family member tell their 10-year-old self? Everyone writes it down — photo of the notes'}},
    {e:'🌈', t:{de:'Foto bei dem jedes Familienmitglied eine andere Farbe trägt — arrangiert nach Farben', en:'Photo where each family member wears a different color — arranged by color'}},
  ],

  family_chill: [
    {e:'🌅', t:{de:'Das schönste Licht auf einem Familienmitglied — warte geduldig auf den Moment', en:'The most beautiful light on a family member — wait patiently for the moment'}},
    {e:'💭', t:{de:'Foto eines Familienmitglieds das gerade in Gedanken versunken ist — nicht stören', en:'Photo of a family member lost in thought — don\'t disturb them'}},
    {e:'🤍', t:{de:'Hände übereinandergelegt: alle Familienmitglieder, foto von oben — nur Hände', en:'Hands stacked: all family members, photo from above — hands only'}},
    {e:'🎨', t:{de:'Zeichne ein anderes Familienmitglied in 2 Minuten — es bekommt das Porträt', en:'Draw another family member in 2 minutes — they get to keep the portrait'}},
    {e:'🌿', t:{de:'Finde etwas in der Umgebung das diese Familie perfekt symbolisiert', en:'Find something in the surroundings that perfectly symbolizes this family'}},
    {e:'📸', t:{de:'STREICH: Bitte ein Familienmitglied für ein "seriöses Porträt" zu posieren — foto es wenn es kurz die Pose lockert', en:'PRANK: Ask a family member to pose for a "serious portrait" — photo them when they briefly relax the pose'}, trick:true},
    {e:'🌙', t:{de:'Das älteste und das jüngste Familienmitglied in einem stillen Moment zusammen', en:'The oldest and youngest family member together in a quiet moment'}},
    {e:'☕', t:{de:'Wer trinkt was? Foto aller Getränke nebeneinander — jeder steht hinter seinem', en:'Who drinks what? Photo of all drinks next to each other — each person stands behind theirs'}},
    {e:'🦋', t:{de:'Das echte Lachen eines Familienmitglieds — nicht das Foto-Lachen — das echte', en:'The real laugh of a family member — not the photo smile — the real one'}},
    {e:'🌺', t:{de:'Was macht diesen Ort zu einem Ort für diese Familie? Capture es', en:'What makes this place a place for this family? Capture it'}},
    {e:'📖', t:{de:'Frage drei Familienmitglieder welche Erinnerung sie mit genau diesem Ort verbinden — foto beim Erzählen', en:'Ask three family members which memory they connect with this exact place — photo while telling'}},
    {e:'🏡', t:{de:'Wer macht das authentischste "zu Hause"-Gesicht? Nicht gestellt — echte Entspannung', en:'Who makes the most authentic "at home" face? Not posed — genuine relaxation'}},
    {e:'🌊', t:{de:'Finde den ruhigsten Moment des Tages und halte ihn fest', en:'Find the quietest moment of the day and capture it'}},
    {e:'💫', t:{de:'Zwei Familienmitglieder die sich nicht oft sehen — ein Foto genau jetzt', en:'Two family members who don\'t see each other often — one photo right now'}},
    {e:'✨', t:{de:'Das Familienfoto das kein Mensch je vergessen wird — du hast diesen Abend um es zu finden', en:'The family photo no one will ever forget — you have this evening to find it'}},
  ],

  family_party: [
    {e:'💃', t:{de:'Familien-Tanzwettbewerb: Jedes Familienmitglied zeigt seinen "Signature Move" — foto der Moves', en:'Family dance contest: every family member shows their "signature move" — photo of the moves'}},
    {e:'🎭', t:{de:'Imitationswettbewerb: Wer imitiert am besten ein anderes Familienmitglied? Gruppe rät', en:'Imitation contest: who best imitates another family member? Group guesses'}},
    {e:'🏆', t:{de:'Erfinde spontane Familienpreise: "Meiste Umarmungen", "Lautestes Lachen" — foto der Preisverleihung', en:'Invent spontaneous family prizes: "Most hugs", "Loudest laugh" — photo of the ceremony'}},
    {e:'🤸', t:{de:'Familienpyramide: Alle versuchen sich aufeinanderzustapeln — Versuch zählt auch wenn er scheitert', en:'Family pyramid: everyone tries to stack on each other — attempt counts even if it fails'}},
    {e:'🎵', t:{de:'Karaoke für die Familie: Alle singen gleichzeitig aber jeder singt ein anderes Lied', en:'Karaoke for the family: everyone sings simultaneously but each person sings a different song'}},
    {e:'👗', t:{de:'Kleidungstausch: Das älteste und das jüngste Familienmitglied tauschen je ein Accessoire', en:'Clothing swap: the oldest and youngest family member swap one accessory each'}},
    {e:'🤫', t:{de:'STREICH: Alle tun 15 Sekunden so als hätten sie das Familienmitglied vergessen das gerade rausgeht — foto seine Reaktion', en:'PRANK: Everyone acts for 15 seconds as if they\'ve forgotten the family member just leaving — photo their reaction'}, trick:true},
    {e:'🎯', t:{de:'Familien-Battle: Wer kann am längsten auf einem Bein stehen? Alle gleichzeitig — foto der Fallenden', en:'Family battle: who can stand on one leg longest? All simultaneously — photo of those falling'}},
    {e:'📞', t:{de:'Ruf ein Familienmitglied an das nicht da ist — alle sagen gleichzeitig dasselbe Wort — foto der Gesichter', en:'Call a family member who isn\'t there — everyone says the same word simultaneously — photo of faces'}},
    {e:'🌟', t:{de:'Welches Familienmitglied hat das ansteckendste Lachen? Provoziere es — foto wenn alle mitlachen', en:'Which family member has the most contagious laugh? Provoke it — photo when everyone else laughs'}},
    {e:'🎪', t:{de:'Familienshow: Jedes Mitglied hat 10 Sekunden um sich von seiner besten Seite zu zeigen', en:'Family show: each member has 10 seconds to show their best side'}},
    {e:'🏃', t:{de:'Familien-Sprint von einem Ende des Raums zum anderen — wer ist am schnellsten?', en:'Family sprint from one end of the room to the other — who is fastest?'}},
    {e:'📸', t:{de:'STREICH: Überzeuge das ruhigste Familienmitglied es müsse jetzt ein "Vortrag" halten — foto sein Gesicht', en:'PRANK: Convince the quietest family member they must give a "speech" right now — photo their face'}, trick:true},
    {e:'🥂', t:{de:'Jedes Familienmitglied sagt öffentlich das Ehrlichste was es über die Familie denkt — foto der Reaktionen', en:'Each family member publicly says the most honest thing they think about the family — photo of reactions'}},
    {e:'🎈', t:{de:'Spontaner Familien-Flashmob: Alle tanzen gleichzeitig denselben Tanz — niemand soll ihn kennen', en:'Spontaneous family flashmob: everyone dances the same dance simultaneously — nobody should know it'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 🎪 FESTIVAL
  // ════════════════════════════════════════════════════════════════
  festival_family: [
    {e:'🎪', t:{de:'Foto der ganzen Gruppe von hinten — alle schauen zur Bühne, niemand zur Kamera', en:'Photo of the whole group from behind — everyone looking at the stage, nobody at the camera'}},
    {e:'🎵', t:{de:'Welchen Song kennt ihr alle? Alle singen gleichzeitig laut die erste Strophe', en:'Which song do you all know? Everyone sings the first verse loudly simultaneously'}},
    {e:'🌈', t:{de:'Festival-Farben: Findet 5 verschiedene Festival-typische Farben an Personen — foto alle zusammen', en:'Festival colors: find 5 different festival-typical colors on people — photo all together'}},
    {e:'🎨', t:{de:'Macht euch gegenseitig Festival-Schminke aus dem was ihr habt — foto das Ergebnis', en:'Give each other festival face paint with what you have — photo the result'}},
    {e:'🤝', t:{de:'Macht Bekanntschaft mit einer anderen Gruppe — foto mit euren neuen Festival-Freunden', en:'Make friends with another group — photo with your new festival friends'}},
    {e:'🍔', t:{de:'Das seltsamste Festival-Food das ihr findet — foto mit dem mutigen Esser', en:'The strangest festival food you can find — photo with the brave eater'}},
    {e:'🎭', t:{de:'Mach eine Szene von einem eurer Lieblingslieder nach — alle spielen mit', en:'Act out a scene from one of your favorite songs — everyone plays along'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden aus der Gruppe die falsche Bühne ist die bessere — foto sein Gesicht wenn er merkt dass die andere besser ist', en:'PRANK: Convince someone from the group the wrong stage is the better one — photo their face when they realize the other is better'}, trick:true},
    {e:'🌟', t:{de:'Sucht den kreativsten Festival-Look anderer Besucher — foto mit Erlaubnis', en:'Find the most creative festival look of other visitors — photo with permission'}},
    {e:'⛺', t:{de:'Euer "Heimat" auf dem Festival — macht es erkennbar und foto davon', en:'Your "home" at the festival — make it recognizable and photo it'}},
    {e:'🎶', t:{de:'Macht einen Human Train durch die Menge — foto der Schlange von der Seite', en:'Make a human train through the crowd — photo of the chain from the side'}},
    {e:'🌙', t:{de:'Das Festival-Feeling wenn es dunkel wird — capture den Übergang Tag zu Nacht', en:'The festival feeling when it gets dark — capture the transition from day to night'}},
    {e:'💫', t:{de:'Wer hat das beste Festival-Outfit? Spontane Modenschau der Gruppe', en:'Who has the best festival outfit? Spontaneous fashion show of the group'}},
    {e:'🎯', t:{de:'Findet ein Muster oder eine Wiederholung die auf dem Festival überall auftaucht — foto', en:'Find a pattern or repetition that appears everywhere at the festival — photo'}},
    {e:'🏳️', t:{de:'Macht eine Festival-Flagge aus was ihr habt — tragt sie durch die Menge', en:'Make a festival flag from what you have — carry it through the crowd'}},
  ],

  festival_chill: [
    {e:'🎶', t:{de:'Foto eines Moments in dem die Musik spürbar ist — nicht hörbar, spürbar', en:'Photo of a moment where the music is palpable — not audible, palpable'}},
    {e:'🌅', t:{de:'Das goldene Stundenlicht am Festival — such den perfekten Moment und die perfekte Person darin', en:'The golden hour light at the festival — find the perfect moment and the perfect person in it'}},
    {e:'🎭', t:{de:'Ein Stranger Portrait: Bitte jemanden den du nicht kennst um ein Foto — zeige danach warum genau diese Person', en:'A stranger portrait: ask someone you don\'t know for a photo — show afterward why exactly this person'}},
    {e:'🌊', t:{de:'Die Masse in Bewegung — warte auf den Moment wenn alle gleichzeitig denselben Rhythmus haben', en:'The crowd in motion — wait for the moment when everyone has the same rhythm simultaneously'}},
    {e:'🔮', t:{de:'Finde den unbekanntesten Act und mache ein Foto von der aufmerksamsten Person im Publikum', en:'Find the least known act and take a photo of the most attentive person in the audience'}},
    {e:'🌿', t:{de:'Das Ruhigste am lautesten Ort — finde Stille mitten im Festival', en:'The quietest thing at the loudest place — find silence in the middle of the festival'}},
    {e:'💫', t:{de:'Zwei Fremde im Gespräch — capture den Moment in dem sie wirklich verbunden sind', en:'Two strangers in conversation — capture the moment when they\'re truly connected'}},
    {e:'📸', t:{de:'STREICH: Bitte jemanden für ein "Zeitschriften-Cover-Foto" zu posieren — foto wenn er mitten im Posieren switcht', en:'PRANK: Ask someone to pose for a "magazine cover photo" — photo when they switch mid-pose'}, trick:true},
    {e:'🎪', t:{de:'Das Beste am Festival das man nicht sehen kann — Geräusche, Gerüche, Stimmung — in einem Bild', en:'The best part of the festival you can\'t see — sounds, smells, atmosphere — in one image'}},
    {e:'🌙', t:{de:'Festival-Nacht: Capture einen Moment der nur in der Dunkelheit existiert', en:'Festival night: capture a moment that only exists in the darkness'}},
    {e:'🎨', t:{de:'Die schönste unbeabsichtigte Komposition die du heute siehst — Menschen, Licht, Raum', en:'The most beautiful unintended composition you see today — people, light, space'}},
    {e:'🦋', t:{de:'Warte am selben Platz 5 Minuten — und mache das beste Foto von dem was dir begegnet', en:'Wait at the same spot for 5 minutes — and take the best photo of what comes to you'}},
    {e:'🌸', t:{de:'Das Festival-Glück: Capture jemanden genau in dem Moment in dem er ganz glücklich ist', en:'Festival happiness: capture someone exactly in the moment when they\'re completely happy'}},
    {e:'🔦', t:{de:'Lichtspiele bei Dunkelheit — Bühnenlichter, Handytaschenlampen, Feuerzeuge — capture sie', en:'Light play in darkness — stage lights, phone flashlights, lighters — capture them'}},
    {e:'🌀', t:{de:'Wähle eine Farbe und photograph alles in dieser Farbe — ein Bild mit allem zusammen', en:'Choose one color and photograph everything in that color — one image with everything together'}},
  ],

  festival_party: [
    {e:'🕺', t:{de:'Battle-Dance mitten in der Menge — fordere eine fremde Person heraus — foto der Reaktion', en:'Battle dance in the middle of the crowd — challenge a stranger — photo of the reaction'}},
    {e:'🎤', t:{de:'Singe den Refrain des aktuellen Songs lauter als alle anderen in deiner Umgebung — foto der Nachbarn', en:'Sing the current song\'s chorus louder than everyone around you — photo of the neighbors'}},
    {e:'🌊', t:{de:'Crowd Surf — wer traut sich? Auch Versuch zählt — foto aus der Menge', en:'Crowd surf — who dares? Even attempt counts — photo from the crowd'}},
    {e:'🎪', t:{de:'Mache einen spontanen Flashmob in euerer Gruppe — choreografiert in 2 Minuten — führt ihn aus', en:'Do a spontaneous flashmob in your group — choreographed in 2 minutes — execute it'}},
    {e:'🏆', t:{de:'Wer hat das wildeste Festival-Accessoire? Trage es 10 Minuten sichtbar — foto dabei', en:'Who has the wildest festival accessory? Wear it visibly for 10 minutes — photo while doing so'}},
    {e:'📞', t:{de:'Ruf jemanden der nicht hier ist an — halte das Handy zur Bühne — lass ihn 30 Sek zuhören — foto beider Gesichter', en:'Call someone who isn\'t here — hold the phone to the stage — let them listen for 30 sec — photo both faces'}},
    {e:'🤸', t:{de:'Festival-Yoga: Mache die schwierigste Yoga-Pose die du kannst mitten in der Menge', en:'Festival yoga: do the most difficult yoga pose you can right in the middle of the crowd'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden aus der Gruppe er sei gerade auf der Videoleinwand der Bühne — foto wenn er winkt', en:'PRANK: Convince someone from the group they\'re currently on the stage\'s video screen — photo when they wave'}, trick:true},
    {e:'🌟', t:{de:'Sammle 5 Fremde für das wildeste Festival-Foto — du hast 5 Minuten sie zu überzeugen', en:'Gather 5 strangers for the wildest festival photo — you have 5 minutes to convince them'}},
    {e:'🎯', t:{de:'Wer kommt einer fremden Person am nächsten ohne erkannt zu werden — verkleidet mit Festival-Utensilien', en:'Who can get closest to a stranger without being recognized — disguised with festival props'}},
    {e:'🎭', t:{de:'Stellt den Headliner des Festivals nach — alle spielen Instrumente auf Luft — foto als wäre es real', en:'Recreate the festival headliner — everyone plays instruments in air — photo as if it\'s real'}},
    {e:'🌈', t:{de:'Mach das bunteste Foto das jemals auf einem Festival gemacht wurde', en:'Take the most colorful photo ever taken at a festival'}},
    {e:'📸', t:{de:'STREICH: Überzeuge jemanden den ihr kennt er solle jetzt "spontan auf die Bühne" — foto seinen Gesichtsausdruck', en:'PRANK: Convince someone you know they should "spontaneously go on stage" now — photo their expression'}, trick:true},
    {e:'🏄', t:{de:'Wer überredet die meisten Fremden in 3 Minuten zu einem Foto — Beweis: alle Fotos in einem', en:'Who convinces the most strangers to take a photo in 3 minutes — proof: all photos in one'}},
    {e:'🎵', t:{de:'Der längste Mitsing-Chor: Überzeuge so viele Menschen wie möglich denselben Song zu singen', en:'The longest sing-along choir: convince as many people as possible to sing the same song'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 💍 HOCHZEIT
  // ════════════════════════════════════════════════════════════════
  wedding_family: [
    {e:'💍', t:{de:'Foto von Braut und Bräutigam ohne dass sie wissen dass du fotografierst', en:'Photo of bride and groom without them knowing you\'re photographing'}},
    {e:'👰', t:{de:'Wer hat das Brautpaar schon am längsten gekannt? Foto beider mit Beweis der Freundschaft', en:'Who has known the couple the longest? Photo of both with proof of friendship'}},
    {e:'💌', t:{de:'Sammle Hochzeitswünsche von 5 verschiedenen Generationen auf einer Serviette', en:'Collect wedding wishes from 5 different generations on a napkin'}},
    {e:'🌺', t:{de:'Suche das schönste Blumenarrangement der Hochzeit und mache ein Foto mit dem ältesten Familienmitglied daran', en:'Find the most beautiful floral arrangement at the wedding and take a photo with the oldest family member at it'}},
    {e:'👗', t:{de:'Die Mutter der Braut und die Mutter des Bräutigams zusammen — ein echtes, herzliches Bild', en:'The mother of the bride and mother of the groom together — a genuine, warm image'}},
    {e:'🎵', t:{de:'Welches Lied spielt gerade als das Brautpaar zum ersten Mal als Ehepaar erscheint — capture den Moment', en:'What song plays as the couple first appears as a married couple — capture the moment'}},
    {e:'🤍', t:{de:'Alle Kinder bei der Hochzeit zusammen — wild und ungeplant — foto des Chaos', en:'All children at the wedding together — wild and unplanned — photo of the chaos'}},
    {e:'🌸', t:{de:'Foto der Hände des Brautpaares — beide Ringe sichtbar, foto von oben', en:'Photo of the couple\'s hands — both rings visible, photo from above'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden er sei für einen Hochzeitstanz auserwählt — foto sein Gesicht', en:'PRANK: Convince someone they\'ve been chosen for a wedding dance — photo their face'}, trick:true},
    {e:'📸', t:{de:'Stelle das Hochzeitsfoto der Eltern nach — mit denselben Personen oder ihren Kindern', en:'Recreate the parents\' wedding photo — with the same people or their children'}},
    {e:'🥂', t:{de:'Wer hält die rührendste kurze Rede? Foto der weinenden Gesichter im Publikum', en:'Who gives the most touching short speech? Photo of crying faces in the audience'}},
    {e:'🌙', t:{de:'Das Brautpaar von Hinten — Abend, Lichter, kein Posieren', en:'The couple from behind — evening, lights, no posing'}},
    {e:'👶', t:{de:'Das jüngste Kind bei der Hochzeit schaut das Brautpaar an — capture diesen Blick', en:'The youngest child at the wedding looking at the couple — capture that look'}},
    {e:'💫', t:{de:'Der Moment nach dem ersten Kuss — nicht der Kuss, sondern was danach kommt', en:'The moment after the first kiss — not the kiss, but what comes after'}},
    {e:'🎂', t:{de:'Das Anschneiden der Hochzeitstorte — beide Gesichter genau in dem Moment', en:'The cutting of the wedding cake — both faces at exactly that moment'}},
  ],

  wedding_chill: [
    {e:'💍', t:{de:'Die Ringe in Nahaufnahme — suche das schönste natürliche Licht dafür', en:'The rings in close-up — find the most beautiful natural light for it'}},
    {e:'🌸', t:{de:'Kleine Details die die meisten übersehen — Dekoration, Licht, Stoff', en:'Small details most people miss — decoration, light, fabric'}},
    {e:'💫', t:{de:'Der erste Tanz — nicht das Paar, sondern die Gesichter der Zuschauer', en:'The first dance — not the couple, but the faces of the spectators'}},
    {e:'🌙', t:{de:'Abendstimmung auf der Hochzeit — das Licht wenn sich Tag und Nacht treffen', en:'Evening atmosphere at the wedding — the light where day and night meet'}},
    {e:'🌺', t:{de:'Die Blumen wenn sie anfangen zu welken — das hat auch Schönheit', en:'The flowers as they begin to wilt — there\'s beauty in that too'}},
    {e:'📖', t:{de:'Jemand liest heimlich im Gästebuch — capture diesen privaten Moment', en:'Someone secretly reads the guest book — capture this private moment'}},
    {e:'🎵', t:{de:'Der Moment wenn ein Lied beginnt das alle kennen — die ersten 3 Sekunden der Reaktion', en:'The moment a song begins that everyone knows — the first 3 seconds of the reaction'}},
    {e:'📸', t:{de:'STREICH: Bitte die Braut für ein "kurzes offizielles Foto" — mache es genau wenn sie den Fotogesichtsausdruck aufsetzt', en:'PRANK: Ask the bride for a "short official photo" — take it exactly when she puts on the photo expression'}, trick:true},
    {e:'🤍', t:{de:'Zwei Menschen die sich lange nicht gesehen haben und sich gerade wieder begegnen', en:'Two people who haven\'t seen each other in a long time just meeting again'}},
    {e:'🥂', t:{de:'Gläser in Bewegung beim Toast — warte auf den Moment wenn alle gleichzeitig berühren', en:'Glasses in motion at the toast — wait for the moment when all touch simultaneously'}},
    {e:'🌅', t:{de:'Das schönste Licht der ganzen Hochzeit — du erkennst es wenn es da ist', en:'The most beautiful light of the entire wedding — you\'ll recognize it when it\'s there'}},
    {e:'💌', t:{de:'Jemand liest heimlich seinen eigenen Toast nach — capture den Moment der Vorbereitung', en:'Someone secretly reads their own toast again — capture the moment of preparation'}},
    {e:'🌊', t:{de:'Der erste ruhige Moment des Brautpaars wenn niemand sie anschaut', en:'The couple\'s first quiet moment when nobody is looking at them'}},
    {e:'👰', t:{de:'Die Braut von hinten — Kleid, Haare, Licht', en:'The bride from behind — dress, hair, light'}},
    {e:'✨', t:{de:'Das Foto von diesem Abend das noch in 50 Jahren schön sein wird', en:'The photo from this evening that will still be beautiful in 50 years'}},
  ],

  wedding_party: [
    {e:'🕺', t:{de:'Hochzeits-Dance-Battle: Zwei Onkel oder Tanten gegeneinander — Brautpaar als Jury', en:'Wedding dance battle: two uncles or aunts against each other — couple as jury'}},
    {e:'🎤', t:{de:'Spontaner Hochzeits-Rap: 8 Zeilen über das Brautpaar — auf der Stelle', en:'Spontaneous wedding rap: 8 lines about the couple — on the spot'}},
    {e:'🏆', t:{de:'Wer macht die beste Imitation des Bräutigams? Braut bewertet — foto der Reaktion', en:'Who does the best imitation of the groom? Bride rates it — photo of the reaction'}},
    {e:'🤸', t:{de:'Hochzeitspyramide: Alle Trauzeugen und Brautjungfern — Versuch zählt', en:'Wedding pyramid: all best men and bridesmaids — attempt counts'}},
    {e:'📸', t:{de:'STREICH: Alle tun gegenüber dem Bräutigam so als hätte die Braut etwas Wichtiges gesagt — foto sein Gesicht', en:'PRANK: Everyone acts toward the groom as if the bride said something important — photo his face'}, trick:true},
    {e:'🌟', t:{de:'Überzeuge das Brautpaar für ein wildes Foto das der Fotograf nicht machen würde', en:'Convince the couple to take a wild photo that the official photographer wouldn\'t take'}},
    {e:'🥂', t:{de:'Der verrückteste Toast der Hochzeit — wer wagt ihn? Foto der Gesichtsausdrücke', en:'The craziest toast of the wedding — who dares? Photo of the expressions'}},
    {e:'👗', t:{de:'Tausche mit der Braut oder dem Bräutigam für 5 Minuten ein Accessoire — foto beider', en:'Swap an accessory with the bride or groom for 5 minutes — photo of both'}},
    {e:'🎯', t:{de:'Wer schafft es den schüchternsten Gast dazu zu bringen zu tanzen? Foto des Moments', en:'Who manages to get the shyest guest to dance? Photo of the moment'}},
    {e:'🎭', t:{de:'Stelle die Geschichte des Brautpaars in 30 Sekunden pantomimisch nach — alle spielen mit', en:'Recreate the couple\'s story in 30 seconds through mime — everyone plays along'}},
    {e:'💃', t:{de:'Der wildeste Hochzeitstanz den die Location je gesehen hat — mach ihn unvergesslich', en:'The wildest wedding dance this location has ever seen — make it unforgettable'}},
    {e:'🌈', t:{de:'Sammle 5 Personen die noch nie miteinander getanzt haben — jetzt tun sie es', en:'Gather 5 people who have never danced together — now they do'}},
    {e:'📸', t:{de:'STREICH: Überzeuge die Braut es gebe einen "Überraschungsgast" — foto ihr Gesicht wenn sie hinschaut', en:'PRANK: Convince the bride there\'s a "surprise guest" — photo her face when she looks'}, trick:true},
    {e:'🎪', t:{de:'Hochzeits-Flashmob: 3 Minuten choreografieren, dann vor dem Brautpaar aufführen', en:'Wedding flashmob: 3 minutes to choreograph, then perform in front of the couple'}},
    {e:'🏅', t:{de:'Erfindet spontan Hochzeitspreise für die Gäste — je kreativer die Kategorie desto besser', en:'Spontaneously invent wedding prizes for the guests — the more creative the category the better'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 🕺 JGA / JGE
  // ════════════════════════════════════════════════════════════════
  jga_family: [
    {e:'💍', t:{de:'Foto des Hauptcharakters des Abends — die Person für die wir das alles machen — in einem echten Moment', en:'Photo of the main character of the evening — the person we\'re doing all this for — in a genuine moment'}},
    {e:'👫', t:{de:'Alle erzählen eine Erinnerung mit dem JGA-Kind — foto während des Erzählens', en:'Everyone tells a memory with the JGA person — photo while telling'}},
    {e:'🌟', t:{de:'Das Porträt des Abends: Der/Die Zukünftige wird dokumentiert wie er/sie wirklich ist — bevor das Leben anders wird', en:'The portrait of the evening: the soon-to-be-wed is documented as they truly are — before life changes'}},
    {e:'💌', t:{de:'Brief an das Brautpaar — jeder schreibt einen Satz auf — foto aller Sätze zusammen', en:'Letter to the couple — everyone writes one sentence — photo of all sentences together'}},
    {e:'🎭', t:{de:'Stellt die Geschichte nach wie das Paar sich kennengelernt hat — je dramatischer desto besser', en:'Recreate the story of how the couple met — the more dramatic the better'}},
    {e:'🏆', t:{de:'Wer kennt die meisten Details über den/die Zukünftigen? Quiz-Moment — foto der falschen Antworten', en:'Who knows the most details about the future spouse? Quiz moment — photo of the wrong answers'}},
    {e:'🎵', t:{de:'Was ist der Song des Paares? Alle summen ihn — Hauptperson muss raten', en:'What is the couple\'s song? Everyone hums it — main person must guess'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge die Hauptperson es gebe eine "Nachricht von dem/der Zukünftigen" — foto sein/ihr Gesicht', en:'PRANK: Convince the main person there\'s a "message from the future spouse" — photo their face'}, trick:true},
    {e:'🌺', t:{de:'Alle legen der Hauptperson gleichzeitig die Hand auf die Schulter — foto von hinten', en:'Everyone simultaneously places their hand on the main person\'s shoulder — photo from behind'}},
    {e:'🥂', t:{de:'Ernsthaftester Toast des Abends — wer sagt was er wirklich meint', en:'Most heartfelt toast of the evening — who says what they really mean'}},
    {e:'📸', t:{de:'Letztes offizielles Gruppenfoto als Unverheiratete/r — alle ernst', en:'Last official group photo as single person — everyone serious'}},
    {e:'💫', t:{de:'Alle wünschen der Hauptperson gleichzeitig etwas für die Ehe — flüsternd, auf einmal', en:'Everyone simultaneously wishes the main person something for marriage — whispering, all at once'}},
    {e:'🎀', t:{de:'Erstellt ein Hochzeitsüberlebenspäckchen aus dem was ihr findet — foto der Übergabe', en:'Create a wedding survival kit from what you find — photo of the handover'}},
    {e:'🌙', t:{de:'Die Stimmung des Abends — das letzte große Abenteuer vor dem neuen Kapitel', en:'The mood of the evening — the last great adventure before the new chapter'}},
    {e:'✨', t:{de:'Das Foto das beim nächsten Klassentreffen gezeigt wird', en:'The photo that will be shown at the next class reunion'}},
  ],

  jga_chill: [
    {e:'🌙', t:{de:'Capture die Stimmung kurz bevor der Abend wirklich losgeht', en:'Capture the mood just before the evening really begins'}},
    {e:'💭', t:{de:'Die Hauptperson in einem ruhigen Moment — so wie sie wirklich ist, ohne Performance', en:'The main person in a quiet moment — as they really are, without performance'}},
    {e:'🎨', t:{de:'Zeichne die Hauptperson in 90 Sekunden — sie bekommt das Bild als Erinnerung', en:'Draw the main person in 90 seconds — they keep the drawing as a memory'}},
    {e:'📖', t:{de:'Frag 3 verschiedene Personen was sie der Hauptperson für die Ehe wünschen — foto beim Antworten', en:'Ask 3 different people what they wish the main person for marriage — photo while answering'}},
    {e:'🌸', t:{de:'Foto der Hände aller Beteiligten übereinander — ein stilles Bild', en:'Photo of everyone\'s hands stacked — a quiet image'}},
    {e:'💫', t:{de:'Die beste Geschichte die eine der Anwesenden über die Hauptperson kennt — capture den Erzählmoment', en:'The best story one of those present knows about the main person — capture the telling moment'}},
    {e:'🌺', t:{de:'Finde den schönsten Ort des Abends für ein Porträt der Hauptperson', en:'Find the most beautiful spot of the evening for a portrait of the main person'}},
    {e:'📸', t:{de:'STREICH: Bitte die Hauptperson für ein "ernstes Erinnerungsfoto" — mach es wenn sie kurz lacht', en:'PRANK: Ask the main person for a "serious memory photo" — take it when they briefly laugh'}, trick:true},
    {e:'🎵', t:{de:'Welcher Song beschreibt die Hauptperson am besten? Alle nennen einen — foto der Gesichter beim Hören', en:'Which song best describes the main person? Everyone names one — photo of faces while listening'}},
    {e:'🌊', t:{de:'Ein stilles Gruppenfoto — alle denken an eine Erinnerung mit der Hauptperson', en:'A quiet group photo — everyone thinks of a memory with the main person'}},
    {e:'✨', t:{de:'Das Foto das die Hauptperson ihrer Partnerin/ihrem Partner zeigt wenn sie nach Hause kommt', en:'The photo the main person shows their partner when they come home'}},
    {e:'🦋', t:{de:'Capture den Moment wenn die Hauptperson wirklich glücklich ist — nicht das Kamera-Glück', en:'Capture the moment when the main person is genuinely happy — not the camera happiness'}},
    {e:'💌', t:{de:'Alle schreiben einen Ratschlag für die Ehe auf — foto alle Zettel', en:'Everyone writes a piece of advice for marriage — photo all the notes'}},
    {e:'🌙', t:{de:'Abends wenn die Energie ruhiger wird — capture diese weichere Stimmung', en:'In the evening when the energy becomes quieter — capture this softer mood'}},
    {e:'🎭', t:{de:'Pantomime: Stelle die Beziehung des Paares in 30 Sekunden dar — ohne Worte', en:'Pantomime: depict the couple\'s relationship in 30 seconds — without words'}},
  ],

  jga_party: [
    {e:'🕺', t:{de:'Die Hauptperson muss 30 Sekunden lang alleine tanzen während alle einen Kreis bilden', en:'The main person must dance alone for 30 seconds while everyone forms a circle'}},
    {e:'🎤', t:{de:'Karaoke-Pflicht: Die Hauptperson singt alleine — die Gruppe wählt den Song', en:'Karaoke duty: the main person sings alone — the group chooses the song'}},
    {e:'👗', t:{de:'Outfit-Challenge: Die Gruppe kleidet die Hauptperson für 10 Minuten um — mit was vorhanden ist', en:'Outfit challenge: the group redresses the main person for 10 minutes — with what\'s available'}},
    {e:'📞', t:{de:'Die Hauptperson ruft den/die Zukünftigen an — muss beweisen wo sie ist — foto beider Gesichter', en:'The main person calls their future spouse — must prove where they are — photo of both faces'}},
    {e:'🏆', t:{de:'Quiz über den/die Zukünftigen — wer verliert macht einen Auftritt — foto des Auftritts', en:'Quiz about the future spouse — who loses makes a performance — photo of the performance'}},
    {e:'🎯', t:{de:'Die Hauptperson muss 5 Fremde überzeugen ihr etwas für die Hochzeit zu wünschen — mit Beweis', en:'The main person must convince 5 strangers to wish them something for the wedding — with proof'}},
    {e:'🌟', t:{de:'Das wildeste Foto das existieren wird wenn jemand "alte Fotos" zeigt', en:'The wildest photo that will exist when someone shows "old photos"'}},
    {e:'🤫', t:{de:'STREICH: Alle tun gleichzeitig so als hätten sie den/die Zukünftigen gerade angerufen — foto das Gesicht der Hauptperson', en:'PRANK: Everyone simultaneously acts as if they just called the future spouse — photo the main person\'s face'}, trick:true},
    {e:'🎪', t:{de:'Spontane Show: Die Gruppe präsentiert die beste und die schlechteste Eigenschaft der Hauptperson — sie bewertet die Richtigkeit', en:'Spontaneous show: the group presents the best and worst quality of the main person — they rate the accuracy'}},
    {e:'💃', t:{de:'Hochzeits-Countdown-Tanz: Alle tanzen als ob der Countdown zur Hochzeit läuft — 10...9...8...', en:'Wedding countdown dance: everyone dances as if the countdown to the wedding is running — 10...9...8...'}},
    {e:'📸', t:{de:'STREICH: Überzeuge die Hauptperson es komme ein "professioneller Fotograf" — foto ihr Gesicht wenn sie posiert', en:'PRANK: Convince the main person a "professional photographer" is coming — photo their face while posing'}, trick:true},
    {e:'🎭', t:{de:'Rollenspiel: Eine Person spielt den/die Zukünftigen, die Hauptperson muss die Beziehung überzeugend verteidigen', en:'Roleplay: one person plays the future spouse, the main person must convincingly defend the relationship'}},
    {e:'🥂', t:{de:'Der ehrlichste Toast des Abends — wer traut sich was er wirklich denkt zu sagen', en:'The most honest toast of the evening — who dares to say what they really think'}},
    {e:'🏃', t:{de:'Sprint-Battle: Die Hauptperson gegen alle Anderen — wer verliert macht eine Aufgabe', en:'Sprint battle: the main person against everyone else — who loses does a forfeit'}},
    {e:'🌈', t:{de:'Crée le souvenir: erschafft gemeinsam die Erinnerung die in 20 Jahren noch erzählt wird', en:'Create the memory: together create the memory that will still be told in 20 years'}},
  ],

  // ════════════════════════════════════════════════════════════════
  // 🏢 BÜROPARTY
  // ════════════════════════════════════════════════════════════════
  office_family: [
    {e:'🤝', t:{de:'Finde die Person mit der du am seltensten redest — mach ein Foto und lerne etwas Neues über sie', en:'Find the person you talk to least — take a photo and learn something new about them'}},
    {e:'🌟', t:{de:'Was ist die verrückteste Sache die in diesem Büro je passiert ist? Stelle sie nach', en:'What\'s the craziest thing that ever happened in this office? Recreate it'}},
    {e:'🎨', t:{de:'Erstellt gemeinsam ein Firmenporträt — alle stellen ihre Rolle im Unternehmen dar', en:'Create a company portrait together — everyone represents their role in the company'}},
    {e:'📊', t:{de:'Das ehrlichste Bürofoto das es je gab — die ungefilterte Wahrheit des Arbeitsalltags in einem Bild', en:'The most honest office photo ever — the unfiltered truth of work life in one image'}},
    {e:'🏆', t:{de:'Wählt den unbesungenen Helden der Firma — foto der Preisverleihung', en:'Choose the unsung hero of the company — photo of the award ceremony'}},
    {e:'☕', t:{de:'Das Kaffeemaschinen-Ritual: Wer macht immer den ersten Kaffee? Foto dieser Person bei der Arbeit', en:'The coffee machine ritual: who always makes the first coffee? Photo of this person at work'}},
    {e:'💡', t:{de:'Die beste Idee die diese Gruppe gemeinsam hat — 3 Minuten Brainstorm — foto der Aufzeichnung', en:'The best idea this group has together — 3 minutes brainstorm — photo of the notes'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge einen Kollegen er habe eine "wichtige Präsentation vergessen" — foto seinen Ausdruck', en:'PRANK: Convince a colleague they\'ve "forgotten an important presentation" — photo their expression'}, trick:true},
    {e:'🎵', t:{de:'Erfindet einen Firmenjingle in 3 Minuten — alle singen ihn gemeinsam', en:'Invent a company jingle in 3 minutes — everyone sings it together'}},
    {e:'🌈', t:{de:'Ordnet euch nach der Länge der Betriebszugehörigkeit — foto der Reihe', en:'Arrange yourselves by length of employment — photo of the line'}},
    {e:'📸', t:{de:'Das Foto für den nächsten Firmenjahresbericht — aber ihr entscheidet wie es aussieht', en:'The photo for the next company annual report — but you decide how it looks'}},
    {e:'🌙', t:{de:'Wer war am längsten im Unternehmen? Foto mit einem Symbol das die Zeit darstellt', en:'Who has been with the company longest? Photo with a symbol representing the time'}},
    {e:'🤲', t:{de:'Alle legen eine Hand übereinander — neues Mitglied unten, ältestes oben', en:'Everyone stacks one hand — newest member at the bottom, longest-serving at the top'}},
    {e:'💌', t:{de:'Jeder schreibt auf was er am meisten von einem Kollegen gelernt hat — foto aller Zettel', en:'Everyone writes down what they\'ve learned most from a colleague — photo of all notes'}},
    {e:'🎭', t:{de:'Stellt in einem Standbild dar wie die Firma nach außen wirkt — und dann wie sie wirklich ist', en:'Depict in a freeze frame how the company appears externally — and then how it really is'}},
  ],

  office_chill: [
    {e:'☕', t:{de:'Das beste Büro-Porträt aller Zeiten: Kollegin oder Kollege in seinem natürlichsten Moment', en:'The best office portrait ever: colleague in their most natural moment'}},
    {e:'💭', t:{de:'Capture den Moment in dem ein Kollege gerade wirklich nachdenkt — nicht posiert', en:'Capture the moment when a colleague is genuinely thinking — not posed'}},
    {e:'🌿', t:{de:'Finde etwas im Büroalltag das du noch nie wirklich wahrgenommen hast — photo es', en:'Find something in the office routine you\'ve never really noticed — photograph it'}},
    {e:'🎨', t:{de:'Das kreativste "Out of Office"-Foto das existiert — stelle es nach', en:'The most creative "Out of Office" photo that exists — recreate it'}},
    {e:'📸', t:{de:'STREICH: Bitte einen Kollegen für sein "bestes LinkedIn-Foto" zu posieren — foto ihn beim ernsthaften Posieren', en:'PRANK: Ask a colleague to pose for their "best LinkedIn photo" — photo them while seriously posing'}, trick:true},
    {e:'💡', t:{de:'Welches Problem beschäftigt gerade jeden im Team? Stelle es ohne Worte dar', en:'What problem is currently on everyone\'s mind on the team? Represent it without words'}},
    {e:'🌙', t:{de:'Das Büro wenn die Arbeit aufhört — capture den Moment wenn alle entspannen', en:'The office when work stops — capture the moment when everyone relaxes'}},
    {e:'🦋', t:{de:'Wer hat heute Abend die überraschendste Seite gezeigt? Capture diesen Moment', en:'Who showed their most surprising side tonight? Capture this moment'}},
    {e:'🌸', t:{de:'Das ehrlichste Lachen des Abends — nicht das Foto-Lachen', en:'The most genuine laugh of the evening — not the photo smile'}},
    {e:'✍️', t:{de:'Jeder schreibt anonym auf was er gerne mal im Büro sagen würde — foto aller Zettel', en:'Everyone writes anonymously what they\'d like to say at the office — photo of all notes'}},
    {e:'🌊', t:{de:'Der Moment wenn ein Kollege vergisst dass er auf einer Firmenparty ist — capture ihn', en:'The moment when a colleague forgets they\'re at a company party — capture it'}},
    {e:'🎯', t:{de:'Was ist der unausgesprochene Witz im Büro den alle kennen? Stelle ihn dar', en:'What\'s the unspoken joke at the office that everyone knows? Act it out'}},
    {e:'🏞️', t:{de:'Finde den ungewöhnlichsten Ort für ein Büroparty-Foto', en:'Find the most unusual location for an office party photo'}},
    {e:'💫', t:{de:'Zwei Kollegen die ihr Potential füreinander noch nicht ausgeschöpft haben — ein erstes echtes Gespräch', en:'Two colleagues who haven\'t yet fully discovered their potential for each other — a first real conversation'}},
    {e:'🌅', t:{de:'Die beste Version dieses Abends in einem Bild — was macht ihn anders als jeden Arbeitstag', en:'The best version of this evening in one image — what makes it different from every work day'}},
  ],

  office_party: [
    {e:'🕺', t:{de:'Büro-Dance-Battle: Zwei Kollegen verschiedener Abteilungen — Publikum entscheidet', en:'Office dance battle: two colleagues from different departments — audience decides'}},
    {e:'🎤', t:{de:'Karaoke-Pflicht: Das Lied das niemand kennt aber alle mitsingen — wer bricht zuerst ab', en:'Karaoke duty: the song nobody knows but everyone sings along — who stops first'}},
    {e:'🏆', t:{de:'Die absurdesten Firmenpreise: "Schlechteste Ausrede für zu spät kommen", "Längste Meeting-Rede" — foto der Verleihung', en:'The most absurd company awards: "Worst excuse for being late", "Longest meeting speech" — photo of the ceremony'}},
    {e:'📱', t:{de:'Zeige deinen letzten beruflichen Slack oder E-Mail — wähle die peinlichste — foto aller Gesichter', en:'Show your last professional Slack or email — choose the most embarrassing — photo of all faces'}},
    {e:'🎭', t:{de:'Imitationswettbewerb: Wer imitiert am besten die Führungsebene? Gruppe bewertet', en:'Imitation contest: who best imitates management? Group rates it'}},
    {e:'🤸', t:{de:'Büro-Olympiade: Wer schafft die seltsamste Sport-Imitation mit Büro-Utensilien', en:'Office Olympics: who can do the strangest sports imitation with office utensils'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge einen Kollegen er sei für die "Rede des Abends" ausgewählt — foto sein Gesicht', en:'PRANK: Convince a colleague they\'ve been selected for the "speech of the evening" — photo their face'}, trick:true},
    {e:'🌟', t:{de:'Das wildeste Firmenfoto das die LinkedIn-Seite nie sehen wird — kein Limit', en:'The wildest company photo that the LinkedIn page will never see — no limits'}},
    {e:'🎯', t:{de:'Wer überredet den CEO oder Chef zu einem wilden Foto? Foto als Beweis', en:'Who convinces the CEO or boss to take a wild photo? Photo as proof'}},
    {e:'🍕', t:{de:'Wer hat das mutigste Essen bestellt? Foto des Muts mit dem Esser', en:'Who ordered the most daring food? Photo of the courage with the eater'}},
    {e:'📸', t:{de:'STREICH: Alle tun gleichzeitig so als würde die Firmen-PR gerade Fotos machen — foto wenn ein Kollege verwirrt posiert', en:'PRANK: Everyone simultaneously acts as if company PR is taking photos — photo when a colleague poses confused'}, trick:true},
    {e:'🎪', t:{de:'Bürozirkus: Wer hat den seltsamsten verborgenen Talent? Jetzt kommt er raus', en:'Office circus: who has the strangest hidden talent? Now it comes out'}},
    {e:'🏃', t:{de:'Sprint zur Kaffeemaschine: 3 Teilnehmer gleichzeitig — wer am langsamsten ist zahlt die Runde', en:'Sprint to the coffee machine: 3 participants simultaneously — slowest pays the round'}},
    {e:'🌈', t:{de:'Das foto mit dem höchsten Cringe-Faktor — wer kann es erzwingen ohne zu lachen', en:'The photo with the highest cringe factor — who can force it without laughing'}},
    {e:'🥂', t:{de:'Toast auf den schlimmsten gemeinsamen Arbeitstag — wer hat die beste Geschichte', en:'Toast to the worst shared work day — who has the best story'}},
  ],
}

// ─── GENERIC FALLBACK TASKS (used when occasion pool runs out) ────────────────
// These work for any occasion, sorted by vibe
export const GENERIC_TASKS = {
  family: [
    {e:'🤗', t:{de:'Umarme jemanden den du heute noch nicht umarmt hast — halte 5 Sekunden', en:'Hug someone you haven\'t hugged today — hold for 5 seconds'}},
    {e:'🌈', t:{de:'Finde 7 verschiedene Farben und foto sie alle in einem einzigen Bild', en:'Find 7 different colors and photograph them all in one single shot'}},
    {e:'🤝', t:{de:'Erfinde einen einzigartigen Handshake mit jemandem — zeigt ihn der Gruppe', en:'Invent a unique handshake with someone — show it to the group'}},
    {e:'🎨', t:{de:'Zeichne eine Person in 60 Sekunden auf eine Serviette — sie bekommt es', en:'Draw a person in 60 seconds on a napkin — they keep it'}},
    {e:'👁️', t:{de:'Finde jemanden der dieselbe Augenfarbe hat wie du — Beweis-Selfie', en:'Find someone with the same eye color as you — proof selfie'}},
    {e:'🌺', t:{de:'Schenke jemandem ein echtes Kompliment auf einer Serviette — foto beides', en:'Write someone a genuine compliment on a napkin — photo both'}},
    {e:'🦋', t:{de:'Foto von den Händen von 4 verschiedenen Personen übereinander', en:'Photo of 4 different people\'s hands stacked on top of each other'}},
    {e:'🎵', t:{de:'Bring 4 Leute dazu gleichzeitig denselben Song zu summen', en:'Get 4 people to hum the same song simultaneously'}},
    {e:'📸', t:{de:'STREICH: Sag jemandem er habe "etwas im Gesicht" — foto seinen Ausdruck beim Prüfen', en:'PRANK: Tell someone they have "something on their face" — photo their expression while checking'}, trick:true},
    {e:'🌿', t:{de:'Finde etwas Schönes das die meisten heute Abend nicht bemerkt haben', en:'Find something beautiful most people haven\'t noticed tonight'}},
    {e:'🥂', t:{de:'Organisiere einen spontanen Toast — alle heben gleichzeitig ihr Glas', en:'Organize a spontaneous toast — everyone raises their glass at once'}},
    {e:'🏆', t:{de:'Mach ein Siegerfoto mit jemandem — ohne Grund, einfach so', en:'Take a victory photo with someone — no reason needed'}},
    {e:'💫', t:{de:'Foto von zwei Menschen in einem echten ungestellten Gespräch', en:'Photo of two people in a genuine, unposed conversation'}},
    {e:'🌙', t:{de:'Finde den schönsten Spot hier und foto ihn wie ein Profifotograf', en:'Find the most beautiful spot here and photograph it like a professional'}},
    {e:'🧡', t:{de:'Foto von zwei Personen die sich gerade wirklich amüsieren', en:'Photo of two people genuinely having fun'}},
  ],
  chill: [
    {e:'🌅', t:{de:'Finde das beste Licht des Abends und mach damit ein Foto', en:'Find the best light of the evening and use it for a photo'}},
    {e:'✨', t:{de:'Capture den Moment der am meisten nach Film aussieht', en:'Capture the moment that looks most like a movie'}},
    {e:'🔮', t:{de:'Finde den geheimnisvollsten Winkel und foto die Atmosphäre', en:'Find the most mysterious corner and photograph the atmosphere'}},
    {e:'🌙', t:{de:'Das Foto das wie ein Albumcover aussieht', en:'The photo that looks like an album cover'}},
    {e:'💬', t:{de:'Lerne von 3 Personen je eine Sache die du nicht wusstest', en:'Learn one thing from 3 different people that you didn\'t know'}},
    {e:'🎯', t:{de:'Mach ein Foto das erst beim zweiten Hinsehen seinen wahren Inhalt zeigt', en:'Take a photo that only reveals its true content on second look'}},
    {e:'🕵️', t:{de:'Mach ein natürlich wirkendes Foto von jemandem ohne dass er es merkt', en:'Take a naturally-looking photo of someone without them noticing'}},
    {e:'🌊', t:{de:'Foto von jemandem der gerade in Gedanken versunken ist', en:'Photo of someone lost in thought'}},
    {e:'🦋', t:{de:'Mach ein Spiegelfoto das wie Kunst aussieht', en:'Take a mirror photo that looks like art'}},
    {e:'📸', t:{de:'STREICH: Bitte jemanden für ein "professionelles Foto" zu posieren — foto ihn kurz bevor er fertig ist', en:'PRANK: Ask someone to pose for a "professional photo" — snap it just before they\'re ready'}, trick:true},
    {e:'🌀', t:{de:'Mach ein Foto mit einer ungewöhnlichen Perspektive — von unten oder durch etwas', en:'Take a photo from an unusual angle — from below or through something'}},
    {e:'🍃', t:{de:'Finde etwas das du schön findest aber andere vielleicht nicht sehen', en:'Find something you find beautiful that others might not see'}},
    {e:'🎨', t:{de:'Bau aus gefundenen Gegenständen eine Mini-Kunstinstallation', en:'Build a mini art installation from found objects'}},
    {e:'💡', t:{de:'Finde etwas das deplatziert wirkt und foto es', en:'Find something that looks out of place and photograph it'}},
    {e:'🌸', t:{de:'Mach ein Porträt von jemandem das ihn so zeigt wie er wirklich ist', en:'Take a portrait that shows someone exactly as they really are'}},
  ],
  party: [
    {e:'🕺', t:{de:'Dance Battle: Fordere jemanden heraus — 30 Sek, die Gruppe entscheidet', en:'Dance Battle: challenge someone — 30 sec, the group decides'}},
    {e:'🗣️', t:{de:'Halte eine 30-Sek Lobrede auf Kartoffeln vor min. 3 Leuten', en:'Give a 30-sec speech praising potatoes in front of 3+ people'}},
    {e:'🃏', t:{de:'Erfinde auf der Stelle einen Zaubertrick und führe ihn sofort vor', en:'Invent a magic trick on the spot and perform it immediately'}},
    {e:'📞', t:{de:'Ruf jemanden an der nicht da ist — erkläre in 10 Sek warum er fehlt', en:'Call someone who isn\'t here — explain in 10 sec why they\'re missing out'}},
    {e:'🤸', t:{de:'Überzeuge jemanden gemeinsam mit dir einen Liegestütz zu machen', en:'Convince someone to do a push-up with you at the same time'}},
    {e:'🎤', t:{de:'Singe den Refrain des aktuellen Songs laut und bewusst falsch', en:'Sing the current song\'s chorus loud and deliberately wrong'}},
    {e:'🦩', t:{de:'Steh 30 Sek auf einem Bein — jemand anderes muss gleichzeitig auch', en:'Stand on one leg for 30 seconds — someone else must do it too'}},
    {e:'🌋', t:{de:'Überzeuge jemanden mit dir den schlechtesten Witz zu erzählen', en:'Convince someone to tell the worst joke with you'}},
    {e:'🎲', t:{de:'Lass eine Person die du kaum kennst dein nächstes Getränk bestellen', en:'Let someone you barely know order your next drink'}},
    {e:'🏆', t:{de:'Überzeuge die Gruppe dir spontan zu applaudieren — mit Begründung', en:'Get the group to spontaneously applaud you — with justification'}},
    {e:'👑', t:{de:'Lass dich von 3 Personen mit verschiedenen Accessoires krönen', en:'Get crowned by 3 people with different accessories'}},
    {e:'🎭', t:{de:'Spiele für 60 Sek eine komplett andere Person — jemand muss raten wer', en:'Play a completely different person for 60 sec — someone must guess who'}},
    {e:'🎪', t:{de:'Organisiere eine Menschenpyramide — Versuch zählt', en:'Organize a human pyramid — attempt counts'}},
    {e:'📸', t:{de:'STREICH: Sag jemandem er habe "etwas im Gesicht" — foto den Ausdruck beim Wischen', en:'PRANK: Tell someone they have "something on their face" — photo the expression while wiping'}, trick:true},
    {e:'🌟', t:{de:'Das wildeste Gruppenfoto des Abends — keine Regeln', en:'The wildest group photo of the evening — no rules'}},
  ],
}

// ─── INTERACTION TASKS (added to all pools via buildTaskList) ─────────────────
// 60 tasks that create genuine group interaction — always photo-provable
export const INTERACTION_TASKS = {
  family: [
    // 🏗️ BAUEN & ERSCHAFFEN
    {e:'🏗️', t:{de:'Baut den höchsten Turm nur aus Sachen die auf dem Tisch liegen — foto das Ergebnis neben dem Erbauer', en:'Build the tallest tower using only things on the table — photo it next to the builder'}},
    {e:'🍽️', t:{de:'Baut aus Besteck, Gläsern und Servietten eine Brücke — sie muss ein Handy tragen können', en:'Build a bridge from cutlery, glasses and napkins — it must hold a phone'}},
    {e:'🎨', t:{de:'Schreibt mit eurem Finger auf beschlagenen Fenstern oder Gläsern gemeinsam ein Wort — foto bevor es verschwindet', en:'Write a word together on a fogged window or glass with your fingers — photo before it disappears'}},
    {e:'🧩', t:{de:'Legt alle Schlüsselringe die ihr findet zu einer Kette zusammen — foto der längsten möglichen Kette', en:'Link all keyrings you can find into one chain — photo the longest possible chain'}},
    {e:'🗼', t:{de:'Stapelt Münzen so hoch wie möglich — einer hält die Hand daneben als Größenvergleich', en:'Stack coins as high as possible — one person holds their hand next to it for size comparison'}},
    {e:'🌀', t:{de:'Legt aus allem was ihr in euren Taschen habt ein Muster oder Bild auf dem Tisch', en:'Arrange everything from your pockets into a pattern or picture on the table'}},
    {e:'🃏', t:{de:'Baut ein Kartenhaus aus Bierdeckeln oder Visitenkarten — wie viele Stockwerke schafft ihr?', en:'Build a card house from coasters or business cards — how many floors can you build?'}},
    {e:'🍕', t:{de:'Formt aus Servietten gemeinsam ein Tier — foto des fertigen Tieres mit dem Entstehungsteam', en:'Fold napkins together into an animal — photo the finished animal with the creation team'}},
    // 📐 KÖRPER & GRUPPE
    {e:'🔤', t:{de:'Formt mit euren Körpern gemeinsam einen Buchstaben — foto von oben oder von der Seite', en:'Form a letter together with your bodies — photo from above or the side'}},
    {e:'🫂', t:{de:'Alle stehen in einer Reihe, jeder legt beide Hände auf die Schultern der Person vor ihm — foto der ganzen Kette von der Seite', en:'Everyone stands in a line, each places both hands on the shoulders of the person in front — photo the whole chain from the side'}},
    {e:'🦁', t:{de:'Alle machen gleichzeitig ihre wildeste Löwen-Pose — foto genau in dem Moment', en:'Everyone does their wildest lion pose simultaneously — photo at exactly that moment'}},
    {e:'🤸', t:{de:'Alle zeigen gleichzeitig ihr flexibelstes Körperteil — foto des chaotischen Ergebnisses', en:'Everyone simultaneously shows their most flexible body part — photo of the chaotic result'}},
    {e:'👣', t:{de:'Alle stellen einen Fuß in die Mitte — foto von oben — nur Schuhe sichtbar', en:'Everyone puts one foot in the center — photo from above — only shoes visible'}},
    {e:'🙌', t:{de:'Klatscht alle gleichzeitig — aber mit den Händen der Person neben euch — foto der Verwirrung', en:'Everyone claps simultaneously — but with the hands of the person next to them — photo of the confusion'}},
    // 🎭 NACHSTELLEN
    {e:'🖼️', t:{de:'Stellt ein bekanntes Gemälde nach — mit dem was ihr habt. Die Gruppe muss erraten welches', en:'Recreate a famous painting with what you have. The group must guess which one'}},
    {e:'📺', t:{de:'Stellt eine Werbung nach die jeder kennt — ihr habt 2 Minuten zum Üben', en:'Recreate an advertisement everyone knows — you have 2 minutes to practice'}},
    {e:'📰', t:{de:'Stellt das Titelbild einer Zeitung nach — findet eine dramatische Pose und einen passenden Aufmacher', en:'Recreate a newspaper front page — find a dramatic pose and a fitting headline'}},
    {e:'🎬', t:{de:'Friert eine Filmszene ein die alle kennen — komplett eingefroren — foto als wäre es ein Screenshot', en:'Freeze a movie scene everyone knows — completely frozen — photo as if it\'s a screenshot'}},
  ],
  chill: [
    // 🔍 FINDEN & ENTDECKEN
    {e:'🔍', t:{de:'Findet den kleinsten Gegenstand auf der Location — foto daneben mit einer Münze als Größenvergleich', en:'Find the smallest object at the location — photo next to a coin for size comparison'}},
    {e:'🌈', t:{de:'Sucht zusammen alle Farben des Regenbogens in der Umgebung — alles muss gleichzeitig ins Foto', en:'Find all rainbow colors in your surroundings together — everything must fit in one photo'}},
    {e:'🪞', t:{de:'Findet eine unerwartete Spiegelung — Glas, Wasser, Metall — und macht ein Foto nur der Spiegelung', en:'Find an unexpected reflection — glass, water, metal — and photograph only the reflection'}},
    {e:'🌿', t:{de:'Findet etwas das aussieht wie ein Gesicht — Wand, Gegenstand, Fleck — foto des zufälligen Gesichts', en:'Find something that looks like a face — wall, object, stain — photo of the accidental face'}},
    {e:'📐', t:{de:'Findet den perfektesten rechten Winkel in der Umgebung — wer findet den exaktesten 90°-Winkel?', en:'Find the most perfect right angle in your surroundings — who finds the most exact 90° angle?'}},
    {e:'🎯', t:{de:'Findet etwas das zufällig perfekt balanciert — foto vor dem es umfällt', en:'Find something that\'s accidentally perfectly balanced — photo before it falls'}},
    {e:'🌀', t:{de:'Findet ein Muster das sich wiederholt — Fliesen, Textur, Anordnung — so nah wie möglich fotografiert', en:'Find a repeating pattern — tiles, texture, arrangement — photographed as close as possible'}},
    {e:'🔭', t:{de:'Sucht den weitesten sichtbaren Punkt von hier — jemand zeigt mit dem Finger darauf — foto', en:'Find the furthest visible point from here — someone points at it — photo'}},
    // ⏱️ CHALLENGES MIT BEWEIS
    {e:'⚖️', t:{de:'Wer kann am längsten einen Gegenstand auf dem Kopf balancieren ohne die Hände? Foto auf dem Höhepunkt', en:'Who can balance an object on their head the longest without hands? Photo at the peak moment'}},
    {e:'🧲', t:{de:'Wer kann die meisten Gegenstände in 60 Sekunden auf einem Tablett stapeln ohne dass etwas fällt?', en:'Who can stack the most objects on a tray in 60 seconds without anything falling?'}},
    {e:'📏', t:{de:'Schätzt wie viele Schritte es bis zur Tür sind — alle gleichzeitig schätzen, dann messen — foto der Schätzer', en:'Guess how many steps to the door — everyone guesses simultaneously, then measure — photo of the guessers'}},
    {e:'🎪', t:{de:'Wer schafft es am längsten mit einem Löffel auf der Nase zu balancieren? Foto des Rekordhaltenden', en:'Who can balance a spoon on their nose the longest? Photo of the record holder'}},
    {e:'🌊', t:{de:'Alle atmen gleichzeitig ein und frieren ein — wer hält am längsten? Foto der roten Gesichter', en:'Everyone breathes in simultaneously and freezes — who holds longest? Photo of the red faces'}},
    // 🌀 KOMBINIEREN & VERBINDEN
    {e:'🤝', t:{de:'Verbindet alle Gürtel, Schals oder Kordeln zu einem Seil — wie lang wird es? Foto mit Maßstab', en:'Connect all belts, scarves or cords into a rope — how long does it get? Photo with scale'}},
    {e:'🪑', t:{de:'Baut aus Stühlen und allem was ihr findet den bequemsten möglichen Sitz — foto der Person die drin sitzt', en:'Build the most comfortable possible seat from chairs and whatever you find — photo of the person sitting in it'}},
    {e:'📱', t:{de:'Stapelt alle Handys der Gruppe aufeinander — wer hat das älteste? Wer das neueste? Foto des Stapels', en:'Stack all group phones on top of each other — who has the oldest? Newest? Photo of the stack'}},
    {e:'👟', t:{de:'Sortiert eure Schuhe nach Schuhgröße und fotografiert sie in einer Reihe — von klein nach groß', en:'Sort your shoes by size and photograph them in a row — smallest to largest'}},
    {e:'🔑', t:{de:'Legt alle Schlüssel aller Anwesenden nebeneinander — wer hat die meisten? Foto des Vergleichs', en:'Lay all keys from everyone present next to each other — who has the most? Photo of the comparison'}},
  ],
  party: [
    // 🏗️ BAUEN & ERSCHAFFEN
    {e:'🏆', t:{de:'Baut den größten Turm aus Bierflaschen/-dosen — benutzt nichts zum Stützen — foto des höchsten Moments kurz vor dem Einsturz', en:'Build the tallest tower from beer bottles/cans — use nothing to support — photo of the highest moment just before it falls'}},
    {e:'🎪', t:{de:'Baut eine Halfpipe oder Rampe aus allem was ihr findet — irgendwas muss drüber rollen können', en:'Build a halfpipe or ramp from everything you find — something must be able to roll over it'}},
    {e:'🗺️', t:{de:'Zeichnet zusammen aus dem Gedächtnis einen Stadtplan eurer Stadt auf einer Serviette — foto des chaotischen Ergebnisses', en:'Draw a map of your city from memory together on a napkin — photo of the chaotic result'}},
    {e:'🎨', t:{de:'Macht ein Gruppenkunstwerk: jeder zeichnet 10 Sekunden und gibt es weiter — foto des Endresultats', en:'Make a group artwork: everyone draws for 10 seconds and passes it on — photo of the final result'}},
    {e:'🧱', t:{de:'Baut aus Smarties, Salzstangen oder was sonst da ist ein essbares Kunstwerk — foto vor dem Angriff', en:'Build an edible piece of art from whatever food is available — photo before the attack'}},
    // ⚡ CHALLENGES
    {e:'🎯', t:{de:'Wer trifft einen Bierdeckel aus 2 Metern in ein leeres Glas? Jeder hat 3 Versuche — foto des Treffers', en:'Who can flick a coaster into an empty glass from 2 meters? Everyone gets 3 tries — photo of the hit'}},
    {e:'🌀', t:{de:'Alle drehen sich 10 mal im Kreis, dann müssen sie gerade stehen — foto exakt nach der letzten Drehung', en:'Everyone spins in circles 10 times, then must stand straight — photo exactly after the last spin'}},
    {e:'⚡', t:{de:'Wer kann am schnellsten sein Handy entsperren ohne hinzuschauen? Alle gleichzeitig — foto der Versuche', en:'Who can unlock their phone fastest without looking? All simultaneously — photo of the attempts'}},
    {e:'🏄', t:{de:'Wer kann am elegantesten auf einem Bein stehen und gleichzeitig telefonieren? Foto des Würdevollsten', en:'Who can stand most elegantly on one leg while pretending to phone? Photo of the most dignified'}},
    {e:'🎸', t:{de:'Air Guitar Battle: Jeder spielt 15 Sekunden — die Gruppe kürt den Gewinner — foto des Meisters', en:'Air guitar battle: everyone plays for 15 seconds — the group crowns the winner — photo of the master'}},
    {e:'🥊', t:{de:'Wer hat den schwächsten Händedruck? Wer den stärksten? Foto des dramatischen Kräftemessens', en:'Who has the weakest handshake? Who the strongest? Photo of the dramatic trial of strength'}},
    // 🎭 GRUPPENAKTIONEN
    {e:'📸', t:{de:'Alle springen gleichzeitig — aber verschiedene Sprünge — foto genau wenn alle in der Luft sind', en:'Everyone jumps simultaneously — but different jumps — photo exactly when all are in the air'}},
    {e:'🤯', t:{de:'Alle machen gleichzeitig das überraschteste Gesicht das sie können — einfrieren — foto', en:'Everyone makes the most surprised face they can simultaneously — freeze — photo'}},
    {e:'🌊', t:{de:'Mexican Wave: startet sie, macht sie dreimal durch die Gruppe, foto beim dritten Durchgang', en:'Mexican wave: start it, do it three times through the group, photo on the third pass'}},
    {e:'🎭', t:{de:'Alle stellen sich als dieselbe Person vor: "Hi ich bin [Name]" — findet den überzeugendsten — foto der "Person"', en:'Everyone introduces themselves as the same person: "Hi I\'m [Name]" — find the most convincing — photo'}},
    {e:'🔊', t:{de:'Alle flüstern gleichzeitig dasselbe Wort so laut wie möglich — foto der verzerrten Gesichter', en:'Everyone whispers the same word as loud as possible simultaneously — photo of the distorted faces'}},
    // 🌀 KOMBINIEREN & VERBINDEN
    {e:'💡', t:{de:'Alle Handytaschenlampen an, foto im Dunkeln — nur das Licht sichtbar', en:'All phone flashlights on, photo in the dark — only the light visible'}},
    {e:'🥂', t:{de:'Baut eine Champagnerpyramide mit Plastikbechern — wie viele Lagen schafft ihr? Foto auf dem Höchststand', en:'Build a champagne pyramid with plastic cups — how many layers? Photo at the maximum'}},
    {e:'🎪', t:{de:'Synchronisiert alle eure Handywecker auf genau dieselbe Zeit — alle klingeln gleichzeitig — foto der Reaktionen', en:'Sync all phone alarms to exactly the same time — all ring simultaneously — photo of the reactions'}},
    {e:'📸', t:{de:'STREICH: Überzeuge jemanden ihr braucht ein "offizielles Beweisfoto für eine Aufgabe" — er posiert steif — foto natürlich das posierte Gesicht', en:'PRANK: Convince someone you need an "official proof photo for a task" — they pose stiffly — naturally photo the posed face'}, trick:true},
    {e:'🏋️', t:{de:'Wer kann das schwerste Ding im Raum heben? Reihum — foto des Gesichtsausdrucks beim Versuch', en:'Who can lift the heaviest thing in the room? Everyone tries — photo of the expression during the attempt'}},
  ],
}

// ─── MUTIG TASKS (4th Vibe — bold) ───────────────────────────────────────────
// Adults only. Always optional. No forced physical contact. No sexual content.
// Each task: clear photo moment, clear who photographs, clear why it's funny.
export const MUTIG_TASKS = {
  // Works across all occasions — mutig is a vibe not a context
  any: [
    // REAKTIONS-FOTOS — das Gesicht ist der Witz
    {e:'😱', t:{de:'Sage jemandem neben dir mit todernster Miene: "Ich muss dir was gestehen." Foto seines Gesichts in den nächsten 3 Sekunden. Dann darfst du dir was ausdenken.', en:'Tell the person next to you with a dead serious face: "I need to confess something." Photo their face in the next 3 seconds. Then you can make something up.'}},
    {e:'👀', t:{de:'Alle schauen gleichzeitig ohne Vorwarnung dieselbe Person an und frieren ein. Foto der angeschauten Person.', en:'Everyone looks at the same person simultaneously without warning and freezes. Photo of the person being stared at.'}},
    {e:'🌟', t:{de:'Sage der Person rechts von dir das ehrlichste Kompliment das du über sie denkst. Kein Ausweichen. Foto ihrer Reaktion.', en:'Tell the person to your right the most honest compliment you think about them. No dodging. Photo of their reaction.'}},
    {e:'🫵', t:{de:'Zeige mit dem Finger auf jemanden und sage laut: "Der da." — dann schweige 5 Sekunden. Foto des angezeigten Gesichts.', en:'Point at someone and say out loud: "That one." — then stay silent for 5 seconds. Photo of their face.'}},
    {e:'🎭', t:{de:'Überzeuge jemanden du hättest ihn "früher schon mal getroffen" — beschreibe genau wann und wo (alles erfunden). Foto wenn er anfängt nachzudenken.', en:'Convince someone you\'ve "met them before" — describe exactly when and where (all made up). Photo when they start wondering.'}},
    {e:'🕵️', t:{de:'Beobachte jemanden 60 Sekunden lang intensiv ohne etwas zu sagen. Wenn er fragt was du machst sagst du nur: "Ich analysiere." Foto seines Gesichts nach 30 Sekunden.', en:'Observe someone intensely for 60 seconds without saying anything. If they ask what you\'re doing say only: "I\'m analyzing." Photo of their face after 30 seconds.'}},
    {e:'📢', t:{de:'Klatsche plötzlich und unerwartet einmal laut in die Hände — mitten in ein Gespräch. Foto aller Gesichter genau in dem Moment. Kamera muss vorher bereit sein.', en:'Suddenly and unexpectedly clap once loudly — in the middle of a conversation. Photo of all faces exactly at that moment. Camera must be ready beforehand.'}},
    {e:'🎯', t:{de:'Zeige auf einen zufälligen Gegenstand und sage jemandem mit völliger Überzeugung: "Das gehört dir." Foto wenn er anfängt nachzudenken ob es stimmt.', en:'Point at a random object and tell someone with complete conviction: "That belongs to you." Photo when they start wondering if it\'s true.'}},
    {e:'🔔', t:{de:'Sage jemandem mit absoluter Ernsthaftigkeit: "Ich habe heute schon dreimal an dich gedacht." Keine weiteren Erklärungen. Foto seines Gesichts.', en:'Tell someone with absolute seriousness: "I\'ve thought about you three times today already." No further explanation. Photo of their face.'}},
    {e:'⏸️', t:{de:'Sage laut "PAUSE" mitten in einem laufenden Gespräch — alle frieren ein wie ein Standbild. Wer zuerst bewegt verliert. Foto des eingefrorenen Moments.', en:'Say "PAUSE" loudly in the middle of an ongoing conversation — everyone freezes like a still image. First to move loses. Photo of the frozen moment.'}},
    {e:'🪞', t:{de:'Spiegele für 60 Sekunden lang jede Bewegung der Person neben dir — exakt und ohne zu lachen. Foto wenn sie es merkt.', en:'Mirror every movement of the person next to you for 60 seconds — exactly and without laughing. Photo when they notice.'}},
    {e:'🌡️', t:{de:'Lege einer Person ohne Vorwarnung die Hand auf die Stirn und sage: "Du hast Fieber." Foto ihr Gesicht genau in dem Moment.', en:'Place your hand on someone\'s forehead without warning and say: "You have a fever." Photo their face exactly at that moment.'}},

    // POSE & AUFTRITT — die Person im Rampenlicht
    {e:'🎲', t:{de:'Die Gruppe einigt sich in 30 Sekunden auf eine Pose für dich. Du hältst sie 10 Sekunden ohne Verhandlung. Foto.', en:'The group agrees on a pose for you in 30 seconds. You hold it for 10 seconds with no negotiation. Photo.'}},
    {e:'🦁', t:{de:'Steh auf, geh zur Mitte und mach für 5 Sekunden deine wildeste Tier-Pose. Alle anderen frieren ein. Foto.', en:'Stand up, go to the center and make your wildest animal pose for 5 seconds. Everyone else freezes. Photo.'}},
    {e:'🎨', t:{de:'Zeichne das Porträt der Person gegenüber von dir — 90 Sekunden, mit der falschen Hand. Foto: Zeichnung neben dem Original.', en:'Draw the portrait of the person across from you — 90 seconds, with the wrong hand. Photo: drawing next to the original.'}},
    {e:'👑', t:{de:'Du wirst von der Gruppe mit allem was sie finden kann dekoriert — Accessoires, Servietten, alles. 60 Sekunden. Foto danach.', en:'The group decorates you with everything they can find — accessories, napkins, anything. 60 seconds. Photo after.'}},
    {e:'🏆', t:{de:'Nimm die Siegerposen von Olympia, Fußball-WM und Grammy nacheinander ein — je 3 Sekunden. Gruppe wählt welche ins Album kommt.', en:'Do the victory poses of Olympics, Soccer World Cup and Grammy one after another — 3 seconds each. Group chooses which goes in the album.'}},
    {e:'📸', t:{de:'Du hast 3 Sekunden für dein bestes Modelpose-Foto. Keine Vorbereitung. Sofort auf Kommando. Foto.', en:'You have 3 seconds for your best model pose photo. No preparation. Immediately on command. Photo.'}},
    {e:'🧍', t:{de:'Stelle dich in die Mitte. Alle anderen positionieren dich wie eine Schaufensterpuppe — Arme, Kopf, Beine. Du machst alles mit. Foto des Ergebnisses.', en:'Stand in the center. Everyone else positions you like a mannequin — arms, head, legs. You comply with everything. Photo of the result.'}},
    {e:'🎪', t:{de:'Du hast 90 Sekunden um aus allem was auf dem Tisch liegt ein Kostüm für deinen Kopf zu basteln. Gruppe bewertet. Foto.', en:'You have 90 seconds to create a head costume from everything on the table. Group rates it. Photo.'}},
    {e:'🏛️', t:{de:'Stelle eine bekannte Statue nach — so genau wie möglich, 10 Sekunden einfrieren. Foto Seite an Seite mit der Statue auf einem Handy.', en:'Recreate a famous statue — as accurately as possible, freeze for 10 seconds. Photo side by side with the statue on a phone.'}},
    {e:'🦊', t:{de:'Stelle dich vor die Gruppe und sage drei Dinge über dich — zwei davon wahr, eines gelogen. Gruppe rät. Foto der rätenden Gesichter.', en:'Stand before the group and say three things about yourself — two true, one false. Group guesses. Photo of the guessing faces.'}},
    {e:'🎭', t:{de:'Die Gruppe wählt eine Emotion. Du stellst sie für 15 Sekunden mit dem ganzen Körper dar — übertrieben, ohne Worte. Foto auf dem Höhepunkt.', en:'The group chooses an emotion. You represent it with your whole body for 15 seconds — exaggerated, no words. Photo at the peak.'}},

    // SOZIALE MUTPROBEN — beweist dass es wirklich passiert ist
    {e:'👋', t:{de:'Geh zur nächsten fremden Person außerhalb eurer Gruppe und frag sie nach ihrer ehrlichen Meinung zu Ananas auf Pizza. Foto der Reaktion.', en:'Go to the nearest stranger outside your group and ask their honest opinion on pineapple on pizza. Photo of the reaction.'}},
    {e:'🤝', t:{de:'Erfinde sofort einen Beruf der nicht existiert und stelle dich damit der Gruppe vor. Erkläre was du machst. Foto der Gesichter.', en:'Immediately invent a profession that doesn\'t exist and introduce yourself with it to the group. Explain what you do. Photo of the faces.'}},
    {e:'🎤', t:{de:'Kündige laut an: "Ich habe eine Ansage." Warte bis alle schauen. Sage dann etwas völlig Banales mit totaler Ernsthaftigkeit. Foto der Reaktionen.', en:'Announce loudly: "I have an announcement." Wait until everyone looks. Then say something completely banal with total seriousness. Photo of reactions.'}},
    {e:'📣', t:{de:'Rufe so laut du kannst den Namen einer Person aus der Gruppe — egal wo ihr seid. Foto ihres Gesichts beim Erschrecken. Kamera vorher bereit halten.', en:'Call out someone\'s name from the group as loud as you can — wherever you are. Photo of their face when startled. Camera ready beforehand.'}},
    {e:'🎵', t:{de:'Summe einen Song aus deiner Kindheit — so lange bis jemand aus der Gruppe ihn erkennt. Foto der Person die ihn zuerst errät beim Erkennen.', en:'Hum a song from your childhood — until someone in the group recognizes it. Photo of the person who guesses it first when they realize.'}},
    {e:'🤲', t:{de:'Bitte jemanden aus der Gruppe dir etwas beizubringen das er gut kann — in 2 Minuten. Foto des Lehrers beim Erklären und des Schülers beim Versuchen.', en:'Ask someone from the group to teach you something they\'re good at — in 2 minutes. Photo of teacher explaining and student trying.'}},
    {e:'🎩', t:{de:'Stelle dich einer Person in der Gruppe vor als hättest du einen komplett erfundenen Beruf. Führe das Gespräch 1 Minute durch ohne zu lachen. Foto beider.', en:'Introduce yourself to someone with a completely made-up profession. Keep the conversation going for 1 minute without laughing. Photo of both.'}},

    // KREATIV & WITZIG — das Ergebnis ist der Witz
    {e:'🃏', t:{de:'Jeder schreibt anonym eine ehrliche Eigenschaft über die Person zu seiner Rechten auf einen Zettel. Einer liest alle vor. Foto der Gesichter beim Vorlesen.', en:'Everyone anonymously writes an honest trait about the person to their right. Someone reads all of them out. Photo of faces while listening.'}},
    {e:'🔮', t:{de:'Sage jemandem eine Prophezeiung für morgen voraus — so dramatisch und detailliert wie möglich. Foto der Person beim Zuhören.', en:'Predict tomorrow\'s events for someone — as dramatically and in detail as possible. Photo of the person while listening.'}},
    {e:'📰', t:{de:'Stellt euch so auf als wärt ihr das Titelbild einer Zeitung. Die Headline: "Lokale Gruppe macht Geschichte." Foto.', en:'Pose as if you\'re a newspaper front page. The headline: "Local group makes history." Photo.'}},
    {e:'🗺️', t:{de:'Alle zeichnen gleichzeitig auf einer Serviette die Umgebung aus dem Gedächtnis — 60 Sekunden. Foto aller Ergebnisse nebeneinander.', en:'Everyone draws their surroundings from memory on a napkin simultaneously — 60 seconds. Photo of all results side by side.'}},
    {e:'✏️', t:{de:'Alle zeichnen gleichzeitig dasselbe Tier auf einer Serviette — 45 Sekunden. Foto aller Ergebnisse nebeneinander.', en:'Everyone draws the same animal on a napkin simultaneously — 45 seconds. Photo of all results side by side.'}},
    {e:'📖', t:{de:'Jeder schreibt in 30 Sekunden den ersten Satz eines Romans über diesen Abend. Einer liest alle vor. Foto der Gesichter beim Lachen.', en:'Everyone writes the first sentence of a novel about this evening in 30 seconds. Someone reads all of them out. Photo of faces laughing.'}},
    {e:'🏷️', t:{de:'Jeder bekommt einen Post-it auf der Stirn mit einem Wort das die Person links aufgeschrieben hat. Alle sehen was die anderen haben — nicht sich selbst. Foto aller.', en:'Everyone gets a post-it on their forehead with a word written by the person to their left. Everyone sees what others have — not themselves. Photo of all.'}},
    {e:'🌀', t:{de:'Alle zeigen gleichzeitig ihr Handysperrbildschirm-Foto. Wer hat das interessanteste? Gruppe entscheidet. Foto der angehobenen Handys.', en:'Everyone shows their phone lock screen photo simultaneously. Who has the most interesting? Group decides. Photo of all raised phones.'}},
    {e:'🗣️', t:{de:'Die Gruppe erfindet gemeinsam in 2 Minuten einen Firmennamen, ein Produkt und einen Slogan für etwas völlig Sinnloses. Foto des aufgeschriebenen Ergebnisses.', en:'The group invents together in 2 minutes a company name, product and slogan for something completely pointless. Photo of the written result.'}},

    // VIDEO-AUFGABEN (max 2 in einer Session)
    {e:'🎬', t:{de:'Du hast 45 Sekunden um eine Szene aus einem Film nachzuspielen — allein, ohne Hilfsmittel. Die Gruppe rät welchen Film. VIDEO.', en:'You have 45 seconds to act out a movie scene — alone, without props. The group guesses which film. VIDEO.'}, isVideo:true},
    {e:'🎬', t:{de:'Erkläre wie man Schuhe bindet — aber so als wärst du ein Geheimagent der eine hochriskante Mission erklärt. 30 Sekunden. VIDEO.', en:'Explain how to tie shoelaces — but as if you\'re a secret agent explaining a high-risk mission. 30 seconds. VIDEO.'}, isVideo:true},

    // STREICH-AUFGABEN
    {e:'😱', t:{de:'STREICH: Sage jemandem mit ruhiger Stimme: "Wir müssen kurz reden." — Führe ihn zur Seite. Sage dann: "Du bist echt cool heute." Foto sein Gesicht beim Hinführen.', en:'PRANK: Tell someone calmly: "We need to talk for a second." — Lead them aside. Then say: "You\'re really cool today." Photo their face while being led aside.'}, trick:true},
    {e:'🤫', t:{de:'STREICH: Flüstere jemandem zu: "Ich glaube die reden gerade über dich" — zeige unauffällig auf eine zufällige Gruppe. Foto sein Gesicht beim Hinschauen.', en:'PRANK: Whisper to someone: "I think they\'re talking about you right now" — subtly point at a random group. Photo their face while looking over.'}, trick:true},
    {e:'📸', t:{de:'STREICH: Sage jemandem du brauchst dringend ein "ernstes Bewerbungsfoto" von ihm — jetzt, sofort. Foto wenn er anfängt ernsthaft zu posieren.', en:'PRANK: Tell someone you urgently need a "serious CV photo" of them — right now. Photo when they start seriously posing.'}, trick:true},
    {e:'🕐', t:{de:'STREICH: Überzeuge jemanden es sei bereits eine Stunde später als es ist. Foto wenn er auf sein Handy schaut um es zu prüfen.', en:'PRANK: Convince someone it\'s already an hour later than it is. Photo when they check their phone to verify.'}, trick:true},
    {e:'🏃', t:{de:'STREICH: Steh plötzlich auf und schau angestrengt in eine Richtung. Sage nichts. Foto aller die instinktiv auch hinschauen.', en:'PRANK: Suddenly stand up and stare intently in one direction. Say nothing. Photo of everyone who instinctively looks too.'}, trick:true},
  ]
}

// ─── OCCASION ALIASES for new 6-category structure ───────────────────────────
// Maps new occasion IDs to existing task pools
function getOccasionPool(occasion, vibe) {
  // Direct matches
  if (OCCASION_TASKS[`${occasion}_${vibe}`]) return [...OCCASION_TASKS[`${occasion}_${vibe}`]]
  // Aliases: new IDs → old pool combinations
  const aliases = {
    'celebrate': ['wedding', 'jga'],    // Hochzeit & JGA
    'outdoor':   ['camping', 'festival'], // Outdoor
    'team':      ['team', 'office'],     // Team & Work
    'together':  ['family', 'meet'],     // Familie & Freunde
    'party':     ['birthday', 'family'], // Party Wildcard — mixed
  }
  if (aliases[occasion]) {
    return aliases[occasion].flatMap(occ =>
      OCCASION_TASKS[`${occ}_${vibe}`] ? [...OCCASION_TASKS[`${occ}_${vibe}`]] : []
    )
  }
  return []
}

// ─── FLASH CHALLENGES ─────────────────────────────────────────────────────────
export const FLASH_CHALLENGES = {
  de: [
    {e:'⚡', t:'FLASH: Alle machen gleichzeitig das hässlichste Gesicht. Wer zuerst lacht verliert — foto das Ergebnis.', dur:45},
    {e:'⚡', t:'FLASH: Jeder zeigt in 10 Sekunden das letzte Foto in seiner Galerie — keine Ausrede.', dur:30},
    {e:'⚡', t:'FLASH: Alle stehen sofort auf und stellen sich nach Geburtstagsmonat in eine Reihe — ohne zu reden.', dur:60},
    {e:'⚡', t:'FLASH: Jeder sagt dem Nächsten neben ihm ein ehrliches Kompliment — laut vor allen.', dur:40},
    {e:'⚡', t:'FLASH: Alle zeigen gleichzeitig ihre beste Tanzpose — einfrieren — foto.', dur:20},
    {e:'⚡', t:'FLASH: Wer kann am längsten still stehen ohne zu lachen? Alle gleichzeitig starten.', dur:60},
    {e:'⚡', t:'FLASH: Jeder macht sofort sein bestes Tier-Geräusch — gleichzeitig.', dur:15},
    {e:'⚡', t:'FLASH: Alle bilden in 30 Sek einen Kreis und halten sich an den Schultern.', dur:30},
    {e:'⚡', t:'FLASH: Alle tippen gleichzeitig dieselbe Emoji-Antwort an jemanden der nicht da ist.', dur:20},
    {e:'⚡', t:'FLASH: Wer findet in 60 Sek die seltsamste Sache die er gerade bei sich hat?', dur:60},
  ],
  en: [
    {e:'⚡', t:'FLASH: Everyone makes the ugliest face simultaneously. First to laugh loses — photo the result.', dur:45},
    {e:'⚡', t:'FLASH: Everyone shows the last photo in their gallery in 10 seconds — no excuses.', dur:30},
    {e:'⚡', t:'FLASH: Everyone stands up immediately and lines up by birth month — without talking.', dur:60},
    {e:'⚡', t:'FLASH: Everyone tells the person next to them an honest compliment — out loud.', dur:40},
    {e:'⚡', t:'FLASH: Everyone shows their best dance pose simultaneously — freeze — photo.', dur:20},
    {e:'⚡', t:'FLASH: Who can stand still the longest without laughing? Everyone starts simultaneously.', dur:60},
    {e:'⚡', t:'FLASH: Everyone makes their best animal sound immediately — simultaneously.', dur:15},
    {e:'⚡', t:'FLASH: Form a circle in 30 seconds holding each other\'s shoulders.', dur:30},
    {e:'⚡', t:'FLASH: Everyone simultaneously texts the same emoji to someone who isn\'t here.', dur:20},
    {e:'⚡', t:'FLASH: Who can find the strangest thing they currently have with them in 60 seconds?', dur:60},
  ],
}

// ─── QUOTES ───────────────────────────────────────────────────────────────────
export const QUOTES = {
  de: [
    'Manchmal sind es die ungeplanten Momente die man am längsten behält.',
    'Gute Zeiten werden besser wenn man sie teilt.',
    'Das war kein Abend. Das war eine Geschichte.',
    'Hier entstand gerade eine Legende.',
    'Die besten Erinnerungen entstehen wenn niemand damit rechnet.',
    'Nicht das Perfekte — das Echte bleibt.',
    'Irgendwann erzählt jemand von diesem Abend.',
    'Fotos verblassen nicht. Erinnerungen schon.',
    'Der beste Abend ist der den du nicht geplant hast.',
    'Manche Nächte erklären alles.',
    'Was du heute fotografierst, wirst du in 10 Jahren suchen.',
    'Die Menschen in diesem Foto — das ist der wahre Reichtum.',
  ],
  en: [
    'Sometimes it\'s the unplanned moments you remember longest.',
    'Good times get better when you share them.',
    'That wasn\'t an evening. That was a story.',
    'A legend was just born here.',
    'The best memories happen when nobody expects them.',
    'Not the perfect — the real stays.',
    'Someday someone will tell this story.',
    'Photos don\'t fade. Memories do.',
    'The best evening is the one you didn\'t plan.',
    'Some nights explain everything.',
    'What you photograph today, you\'ll search for in 10 years.',
    'The people in this photo — that\'s the real wealth.',
  ],
}

// ─── BUILD TASK LIST ──────────────────────────────────────────────────────────
export function buildTaskList(vibe, count, customTasks = [], lang = 'de', occasion = 'birthday') {

  // 1. Get occasion-specific pool — handles both old and new category IDs
  const occasionPool = getOccasionPool(occasion, vibe === 'bold' ? 'party' : vibe)

  // 2. Generic + interaction pool
  const baseVibe = vibe === 'bold' ? 'party' : vibe
  const genericPool = [
    ...(GENERIC_TASKS[baseVibe] || GENERIC_TASKS.party),
    ...(INTERACTION_TASKS[baseVibe] || INTERACTION_TASKS.party),
  ]

  // 3. Get golden task
  const goldenPool = GOLDEN_POOL[vibe] || GOLDEN_POOL.party
  const goldenRaw = goldenPool[Math.floor(Math.random() * goldenPool.length)]
  const golden = {
    e: goldenRaw.e,
    t: typeof goldenRaw.t === 'object' ? (goldenRaw.t[lang] || goldenRaw.t.de) : goldenRaw.t,
    isGold: true,
    isTrick: false,
    isVideo: false,
  }

  // 4. Format custom tasks
  const customFormatted = customTasks
    .filter(t => t.trim())
    .map(t => ({e:'✏️', t: t.trim(), isCustom: true, isTrick: false, isVideo: false}))

  // 5. Bold vibe — use MUTIG_TASKS instead
  if (vibe === 'bold') {
    const mutPool = [...(MUTIG_TASKS.any || [])]
    const tricks = mutPool.filter(t => t.trick)
    const videos = mutPool.filter(t => t.isVideo)
    const normals = mutPool.filter(t => !t.trick && !t.isVideo)

    const totalNeeded = count - 1 - customFormatted.length
    const maxTricks = Math.max(1, Math.floor(totalNeeded * 0.18))
    const maxVideos = Math.min(2, Math.floor(totalNeeded * 0.1)) // max 2 videos
    const tricksToUse = tricks.sort(() => Math.random() - 0.5).slice(0, maxTricks)
    const videosToUse = videos.sort(() => Math.random() - 0.5).slice(0, maxVideos)
    const normalsToUse = normals.sort(() => Math.random() - 0.5).slice(0, totalNeeded - tricksToUse.length - videosToUse.length)

    const formatMutig = (t) => ({
      e: t.e,
      t: typeof t.t === 'object' ? (t.t[lang] || t.t.de) : t.t,
      isTrick: t.trick || false,
      isCustom: false,
      isGold: false,
      isVideo: t.isVideo || false,
    })

    const finalList = [...tricksToUse, ...videosToUse, ...normalsToUse]
      .map(formatMutig)
      .sort(() => Math.random() - 0.5)

    return [golden, ...customFormatted, ...finalList]
  }

  // 6. Standard vibes — shuffle pools
  const shuffledOccasion = occasionPool.sort(() => Math.random() - 0.5)
  const shuffledGeneric = genericPool.sort(() => Math.random() - 0.5)
  const combined = [...shuffledOccasion, ...shuffledGeneric]

  // 7. Separate tricks — max 15%
  const tricks = combined.filter(t => t.trick)
  const normals = combined.filter(t => !t.trick)
  const totalNeeded = count - 1 - customFormatted.length
  const maxTricks = Math.max(1, Math.floor(totalNeeded * 0.15))
  const tricksToUse = tricks.slice(0, maxTricks)
  const normalsToUse = normals.slice(0, totalNeeded - tricksToUse.length)

  // 8. Format and shuffle final list
  const formatTask = (t) => ({
    e: t.e,
    t: typeof t.t === 'object' ? (t.t[lang] || t.t.de) : t.t,
    isTrick: t.trick || false,
    isCustom: false,
    isGold: false,
    isVideo: false,
  })

  const finalList = [...tricksToUse.map(formatTask), ...normalsToUse.map(formatTask)]
    .sort(() => Math.random() - 0.5)

  return [golden, ...customFormatted, ...finalList]
}

export function getFlashChallenge(lang = 'de') {
  const pool = FLASH_CHALLENGES[lang] || FLASH_CHALLENGES.de
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getQuote(lang = 'de') {
  const pool = QUOTES[lang] || QUOTES.de
  return pool[Math.floor(Math.random() * pool.length)]
}

// ─── KENNENLERNEN TASKS (appended) ───────────────────────────────────────────
// Added to OCCASION_TASKS object — same structure
Object.assign(OCCASION_TASKS, {
  meet_family: [
    {e:'👋', t:{de:'Finde jemanden der denselben Lieblingsfilm hat wie du — Beweis-Selfie', en:'Find someone with the same favorite movie as you — proof selfie'}},
    {e:'🌍', t:{de:'Wer war am weitesten weg von hier? Zeigt es auf einer improvisierten Karte', en:'Who has been furthest from here? Show it on an improvised map'}},
    {e:'🎂', t:{de:'Finde jemanden der im selben Monat Geburtstag hat wie du — foto beider', en:'Find someone born in the same month as you — photo of both'}},
    {e:'🎵', t:{de:'Was ist der Song der dich am meisten an deine Kindheit erinnert? Sing 5 Sekunden — foto der Reaktion', en:'What song reminds you most of your childhood? Sing 5 seconds — photo of the reaction'}},
    {e:'🌱', t:{de:'Lerne von 3 verschiedenen Personen je einen Fakt über sie den du nicht wusstest', en:'Learn one fact from 3 different people that you didn\'t know about them'}},
    {e:'🍕', t:{de:'Finde jemanden mit demselben Lieblingsessen wie du — foto beider mit dem Essen', en:'Find someone with the same favorite food as you — photo of both with the food'}},
    {e:'🐾', t:{de:'Wer hat hier ein Haustier? Zeige ein Foto — und lass es dir erklären', en:'Who here has a pet? Show a photo — and let them explain it to you'}},
    {e:'🏡', t:{de:'Finde jemanden der aus derselben Stadt oder Region kommt — foto beider', en:'Find someone from the same city or region — photo of both'}},
    {e:'📚', t:{de:'Was ist das beste Buch das du je gelesen hast? Erkläre es in 20 Sekunden — foto der Zuhörer', en:'What\'s the best book you\'ve ever read? Explain it in 20 seconds — photo of the listeners'}},
    {e:'🌙', t:{de:'Finde jemanden der mehr Länder bereist hat als du — lass dir dein Lieblingsland erzählen', en:'Find someone who has traveled to more countries than you — let them tell you their favorite'}},
    {e:'🎯', t:{de:'Was ist dein verstecktes Talent? Zeige es — foto der überraschten Gesichter', en:'What is your hidden talent? Show it — photo of the surprised faces'}},
    {e:'💬', t:{de:'Führe mit jemandem den du nicht kennst ein 2-Minuten echtes Gespräch — foto danach', en:'Have a 2-minute genuine conversation with someone you don\'t know — photo after'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden ihr hättet "eine gemeinsame Bekannte" — foto sein Gesicht wenn er merkt dass du es erfunden hast', en:'PRANK: Convince someone you have "a mutual friend" — photo their face when they realize you made it up'}, trick:true},
    {e:'🌸', t:{de:'Was ist das Schönste das du je gesehen hast? Beschreibe es in Gesten — die anderen raten', en:'What\'s the most beautiful thing you\'ve ever seen? Describe it in gestures — others guess'}},
    {e:'✨', t:{de:'Finde die Person die du heute am interessantesten findest — mach ein Foto und erkläre warum', en:'Find the person you find most interesting today — take a photo and explain why'}},
  ],
  meet_chill: [
    {e:'💛', t:{de:'Capture den Moment wenn zwei Fremde zum ersten Mal wirklich lachen — ungeplant', en:'Capture the moment when two strangers first genuinely laugh — unplanned'}},
    {e:'🌊', t:{de:'Finde jemanden der gerade in einem echten Gespräch versunken ist — foto ohne zu stören', en:'Find someone genuinely absorbed in a real conversation — photo without disturbing'}},
    {e:'☕', t:{de:'Was trinkt jeder gerade? Foto aller Getränke — jeder steht dahinter', en:'What is everyone drinking right now? Photo of all drinks — everyone stands behind theirs'}},
    {e:'🎨', t:{de:'Zeichne in 60 Sekunden jemanden den du gerade erst kennengelernt hast', en:'Draw in 60 seconds someone you\'ve just met'}},
    {e:'🌙', t:{de:'Finde den ruhigsten Moment des Abends und halte ihn fest', en:'Find the quietest moment of the evening and capture it'}},
    {e:'💭', t:{de:'Stell jemand Neuem 3 Fragen die du immer stellen möchtest aber nie traust — foto beim Antworten', en:'Ask someone new 3 questions you always want to ask but never dare — photo while answering'}},
    {e:'🌺', t:{de:'Wer hat heute Abend die interessanteste Geschichte? Lass sie dir erzählen', en:'Who has the most interesting story tonight? Let them tell it to you'}},
    {e:'📸', t:{de:'STREICH: Bitte jemanden Neues für ein "Erinnerungsfoto" — mach es genau wenn er nicht bereit ist', en:'PRANK: Ask someone new for a "memory photo" — take it exactly when they\'re not ready'}, trick:true},
    {e:'🦋', t:{de:'Was hat die Person neben dir heute Besonderes erlebt? Frage sie — foto beim Erzählen', en:'What special thing did the person next to you experience today? Ask them — photo while telling'}},
    {e:'🎭', t:{de:'Finde jemanden der eine Leidenschaft hat die du noch nie ausprobiert hast — lass sie kurz darstellen', en:'Find someone with a passion you\'ve never tried — let them briefly demonstrate it'}},
    {e:'🌿', t:{de:'Capture einen echten ungestellten Moment zwischen zwei Menschen die sich gerade kennenlernen', en:'Capture a genuine unposed moment between two people just getting to know each other'}},
    {e:'✨', t:{de:'Das Foto das zeigt wie sich dieser Abend anfühlt', en:'The photo that shows how this evening feels'}},
    {e:'💌', t:{de:'Schreibe 3 Wörter die dich beschreiben auf einen Zettel — tausche mit jemandem — foto beider Zettel', en:'Write 3 words that describe you on a note — swap with someone — photo of both notes'}},
    {e:'🌅', t:{de:'Finde das beste Licht des Abends und mach damit ein Porträt von jemandem Neuen', en:'Find the best light of the evening and use it for a portrait of someone new'}},
    {e:'🎯', t:{de:'Was haben du und eine fremde Person unerwartet gemeinsam? Findet es heraus — foto des Moments', en:'What do you and a stranger unexpectedly have in common? Find out — photo of the moment'}},
  ],
  meet_party: [
    {e:'🎯', t:{de:'Überzeuge 3 Fremde je eine Sache über sich zu verraten die noch niemand hier weiß — foto ihre Gesichter', en:'Convince 3 strangers to each reveal one thing about themselves nobody here knows — photo their faces'}},
    {e:'🕺', t:{de:'Tanz-Challenge mit jemandem den du gerade erst kennengelernt hast — 20 Sekunden', en:'Dance challenge with someone you just met — 20 seconds'}},
    {e:'🎤', t:{de:'Freestyle-Intro: Stelle dich in 8 Zeilen Rap einem Fremden vor — foto seine Reaktion', en:'Freestyle intro: introduce yourself in 8 lines of rap to a stranger — photo their reaction'}},
    {e:'🏆', t:{de:'"Wer bin ich?": Alle schreiben einen Namen auf Papier und halten es an ihre Stirn — jeder rät', en:'"Who am I?": Everyone writes a name on paper and holds it to their forehead — everyone guesses'}},
    {e:'🤝', t:{de:'Erfinde mit jemandem den du gerade kennengelernt hast einen einzigartigen Handshake in 2 Minuten', en:'Invent a unique handshake in 2 minutes with someone you just met'}},
    {e:'📞', t:{de:'Überzeuge jemanden Neues dich bei einem gemeinsamen Freund als "besten Kumpel" vorzustellen', en:'Convince someone new to introduce you to a mutual friend as "best buddy"'}},
    {e:'🎭', t:{de:'Imitiere jemanden den du gerade erst kennengelernt hast — er muss sich selbst erkennen', en:'Imitate someone you just met — they must recognize themselves'}},
    {e:'🌟', t:{de:'Wer kann in 3 Minuten die meisten neuen Namen lernen? Beweis durch Aufsagen', en:'Who can learn the most new names in 3 minutes? Proof by reciting them'}},
    {e:'🤫', t:{de:'STREICH: Überzeuge jemanden Neues ihr kennt euch "schon von früher" — wie lange hält er das Spiel mit?', en:'PRANK: Convince someone new you "already know each other from before" — how long do they play along?'}, trick:true},
    {e:'🎲', t:{de:'Finde jemanden und wettet auf etwas — wer verliert macht eine Aufgabe der Anderen', en:'Find someone and make a bet on something — who loses does a task from the other'}},
    {e:'💃', t:{de:'Überzeuge die gesamte Gruppe einen spontanen Synchrontanz zu machen — alle gleichzeitig', en:'Convince the entire group to do a spontaneous synchronized dance — all simultaneously'}},
    {e:'🎪', t:{de:'Organisiere ein spontanes "Wer ist wer?" Spiel — alle imitieren jemanden — Gruppe rät', en:'Organize a spontaneous "who is who?" game — everyone imitates someone — group guesses'}},
    {e:'📸', t:{de:'STREICH: Überzeuge jemanden es gebe einen "Fotowettbewerb" für den er sofort posieren soll', en:'PRANK: Convince someone there\'s a "photo contest" they should pose for immediately'}, trick:true},
    {e:'🌈', t:{de:'Erstelle eine spontane "Kennenlern-Pyramide": Du überzeugst 2, die 2 überzeugen 4 — foto der Gruppe', en:'Create a spontaneous "meet and greet pyramid": you convince 2, they convince 4 — photo of the group'}},
    {e:'🥂', t:{de:'Toast auf alle Anwesenden — jeder sagt dabei etwas über die Person zu seiner Rechten die er gerade gelernt hat', en:'Toast to everyone present — each person says something about the person to their right they just learned'}},
  ],
})
