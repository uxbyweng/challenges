// ============================================================================
// src/main.ts
// Aufgabe der Datei: Songs laden, als Liste anzeigen, per Formular durchsuchen
// und per Klick auf das Herz "liken".
// Wird von index.html geladen (als dist/main.js, siehe <script type="module">).
// ============================================================================

// Import = Code aus einer anderen Datei holen.
// fetchTracks ist eine Funktion (Wert), die wir später aufrufen.
// Die Endung ".js" steht hier absichtlich: Der Browser lädt später die
// kompilierte .js-Datei aus dist/, nicht die .ts-Datei.
import { fetchTracks } from "./tracks.js";
// "import type" holt nur den Typ `Track`. Der verschwindet beim Kompilieren
// komplett, denn Typen gibt es im fertigen JavaScript nicht mehr.
import type { Track } from "./tracks.js";

// Select the elements form and list, and instead of asserting their types, narrow them with instanceof.
// If an element is missing, stop with an error:

// getElementById liefert den Typ `HTMLElement | null`:
// Das Element kann existieren – oder auch nicht (dann null).
// TypeScript weiß hier noch nicht, ob es ein <form> bzw. <ul> ist.
const form = document.getElementById("search-form");
const list = document.getElementById("track-list");

// "Narrowing" (Eingrenzen): Mit `instanceof` prüfen wir zur Laufzeit, was das
// Element wirklich ist. Wenn die Prüfung bestanden ist, kennt TypeScript ab
// da den genaueren Typ (HTMLFormElement). Ist es etwas anderes (oder null),
// brechen wir mit `throw` ab – so spart man sich ein unsicheres `as`.
if (!(form instanceof HTMLFormElement)) {
    throw new Error("Element #search-form not found");
}
if (!(list instanceof HTMLUListElement)) {
    throw new Error("Element #track-list not found");
}
// Ab hier sind `form` und `list` garantiert nicht null und haben die
// richtigen Typen.

// render: zeichnet eine Liste von Tracks ins HTML.
// Parameter: `results` = Array von Tracks. Rückgabe `void` = gibt nichts zurück.
const render = (results: Track[]): void => {
    // replaceChildren löscht erst ALLE bisherigen <li> in der <ul>
    // und fügt dann die neuen ein. So steht die Liste nie doppelt da.
    list.replaceChildren(
        // `...` (spread) packt das Array aus .map() in einzelne Argumente aus,
        // denn replaceChildren erwartet viele Elemente, kein Array.
        // .map() baut aus jedem Track genau ein <li>-Element:
        ...results.map((track) => {
            // Neue HTML-Elemente erzeugen (noch nicht auf der Seite sichtbar).
            const item = document.createElement("li");
            const button = document.createElement("button");
            // data-id="…" am Button speichern. Beim Klick (weiter unten) lesen
            // wir die ID wieder aus, um zu wissen, welcher Song gemeint ist.
            // dataset kennt nur Strings, daher String(...).
            button.dataset.id = String(track.id);
            // Ternary (Kurzform von if/else): liked? dann volles, sonst leeres Herz.
            button.textContent = track.liked ? "♥" : "♡";
            // append hängt mehrere Dinge hinten an: erst den Button,
            // dann Text. Der Text steht als Template-String (Backticks) mit ${…}.
            // textContent/append mit Text ist sicher: HTML im Songtitel würde
            // nicht ausgeführt, sondern nur als Text angezeigt.
            item.append(button, ` ${track.title} by ${track.artist}`);
            // Das fertige <li> geht zurück an .map() und landet im neuen Array.
            return item;
        }),
    );
};

// Part 3: Read the search query
// Add a function that reads the query from the form, and a submit listener that logs it.
// Hover over event to see the type TypeScript inferred:

// readQuery: liest den Suchtext aus dem Formular und macht ihn "vergleichbar".
function readQuery(form: HTMLFormElement): string {
    // FormData sammelt alle Eingabefelder des Formulars. .get("query") holt den
    // Wert des Feldes mit name="query" (siehe index.html).
    // Typ davon: `FormDataEntryValue | null` = string, File oder null.
    const query = new FormData(form).get("query");
    // Wir akzeptieren nur einen string (kein File, kein null).
    // trim() entfernt Leerzeichen am Rand, toLowerCase() macht alles klein,
    // damit "GOLDEN" und "golden" gleich behandelt werden.
    // Sonst: leerer String "" (der findet später alle Songs).
    return typeof query === "string" ? query.trim().toLowerCase() : "";
}

// Wird ausgeführt, sobald das Formular abgeschickt wird
// (Klick auf "Search" oder Enter im Textfeld).
form.addEventListener("submit", (event) => {
    // Ohne preventDefault() würde der Browser die Seite neu laden,
    // wie es ein Formular standardmäßig tut. Das wollen wir nicht.
    event.preventDefault();
    const query = readQuery(form);
    // .filter() behält nur Tracks, bei denen der Test `true` ergibt.
    // Wir bauen aus Titel + Artist einen Text, machen ihn klein und prüfen mit
    // .includes(), ob der Suchbegriff darin vorkommt – so findet man beides.
    // Danach zeichnen wir nur die Treffer neu.
    render(tracks.filter((track) => `${track.title} ${track.artist}`.toLowerCase().includes(query)));
});

// Like-Button: Wir hängen EINEN Listener an die ganze <ul>, nicht an jeden
// Button einzeln ("event delegation"). Klicks auf die Buttons "blubbern" nach
// oben zur Liste. Vorteil: Das klappt auch für Buttons, die erst später durch
// render() neu erzeugt werden.
list.addEventListener("click", (event) => {
    // event.target = das Element, auf das wirklich geklickt wurde.
    // Das könnte ein Button sein, aber auch der Text im <li>.
    const button = event.target;
    // Narrowing wie oben: Wenn es kein Button ist, ignorieren wir den Klick.
    if (!(button instanceof HTMLButtonElement)) {
        return;
    }

    // ID aus data-id zurück in eine Zahl umwandeln (dataset liefert Text).
    const id = Number(button.dataset.id);
    // .find() liefert den ersten passenden Track oder `undefined`, wenn
    // keiner passt.
    const track = tracks.find((item) => item.id === id);
    // Der `if (track)` prüft, dass wirklich einer gefunden wurde.
    if (track) {
        // `!` dreht true <-> false um. Wir ändern das Objekt direkt im Array.
        track.liked = !track.liked;
        // Nur das Herz dieses einen Buttons aktualisieren, kein neues render().
        button.textContent = track.liked ? "♥" : "♡";
    }
});

// const tracks = await fetchTracks("tracks.json");
// render(tracks);

// Die Variable muss VOR dem Laden existieren, weil die Listener oben sie
// benutzen. `let`, weil wir sie gleich neu zuweisen. Der Startwert ist ein
// leeres Array, damit die Listener nie auf "nichts" zugreifen.
// (Die Listener laufen erst bei einem Klick/Submit, also nach dieser Zeile.)
let tracks: Track[] = [];

// try/catch: Wenn im try-Block etwas schiefgeht (z. B. Netzwerkfehler),
// springt das Programm in den catch-Block, statt komplett abzustürzen.
try {
    // `await` wartet, bis die Daten geladen sind. Es steht hier direkt auf
    // oberster Ebene ("top-level await"). Das geht nur in Modulen
    // (type="module" in index.html und "module": "ESNext" in tsconfig.json).
    tracks = await fetchTracks("tracks.json");
    // Erste Anzeige: alle Tracks.
    render(tracks);
} catch (error) {
    // In catch ist `error` vom Typ `unknown` (kann alles sein).
    // Mit instanceof Error prüfen wir, ob es ein echtes Fehlerobjekt mit
    // .message ist. Sonst nehmen wir einen Standardtext.
    const message = error instanceof Error ? error.message : "Unknown error";
    // Fehlermeldung statt der Songliste im Browser zeigen.
    list.textContent = `Could not load tracks: ${message}`;
}
