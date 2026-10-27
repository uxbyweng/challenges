// ============================================================================
// src/tracks.ts
// Aufgabe der Datei: tracks.json vom Server holen und sicherstellen, dass nur
// gültige Songs ("Tracks") ans Hauptprogramm (main.ts) zurückgegeben werden.
// ============================================================================

export interface Track {
    id: number;
    title: string;
    artist: string;
    liked: boolean;
}

// isTrack ist ein "Type Guard" (Typ-Wächter): eine Funktion, die zur Laufzeit
// prüft, ob ein unbekannter Wert wirklich ein Track ist.
// - Parameter `value: unknown`: kann alles sein (z. B. frisch geladene JSON-Daten).
//   `unknown` zwingt uns, erst zu prüfen, bevor wir etwas damit machen.
// - Rückgabetyp `value is Track`: Bei `true` weiß TypeScript danach,
//   dass `value` ein Track ist. Das ist mehr als nur ein boolean.
function isTrack(value: unknown): value is Track {
    return (
        // Die Prüfungen sind mit && verkettet: Alle müssen true sein, und es
        // wird von links nach rechts geprüft. Sobald eine false ergibt, ist
        // das Ergebnis false. So sind die späteren Zugriffe sicher.

        // 1) Es muss ein Objekt sein ...
        typeof value === "object" &&
        // 2) ... aber nicht null (typeof null ist in JavaScript auch "object"!).
        value !== null &&
        // 3) Pro Feld: Gibt es die Property überhaupt? ("id" in value)
        //    Erst danach darf man value.id lesen, und dann prüfen wir den Typ.
        "id" in value &&
        typeof value.id === "number" &&
        "title" in value &&
        typeof value.title === "string" &&
        "artist" in value &&
        typeof value.artist === "string" &&
        "liked" in value &&
        typeof value.liked === "boolean"
    );
}

// fetchTracks: lädt die Songs von einer URL.
// - `export`: macht die Funktion für andere Dateien nutzbar (main.ts importiert sie).
// - `async`: Die Funktion arbeitet mit Wartezeiten (Netzwerk) und gibt deshalb
//   immer ein Promise zurück ("Versprechen auf ein späteres Ergebnis").
//   `Promise<Track[]>` heißt: Am Ende kommt ein Array von Tracks heraus.
export async function fetchTracks(url: string): Promise<Track[]> {
    // fetch schickt die Anfrage an den Server. `await` wartet auf die Antwort.
    const response = await fetch(url);

    // fetch wirft bei 404 oder 500 NICHT selbst einen Fehler.
    // Darum prüfen wir selbst: response.ok ist nur bei Status 200–299 true.
    // Mit `throw` lösen wir den Fehler aus, den main.ts im catch abfängt.
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // .json() liest den Antworttext und wandelt ihn in JavaScript-Daten um.
    // Wir typisieren bewusst als `unknown`: Wir wissen ja nicht sicher, was der
    // Server geschickt hat. (`any` würde jede Prüfung abschalten.)
    const data: unknown = await response.json();

    // Wir erwarten eine Liste. Array.isArray ist die passende Prüfung dafür.
    if (!Array.isArray(data)) {
        throw new Error("Expected a list of tracks");
    }

    // .filter(isTrack) geht jedes Element durch und behält nur die, bei denen
    // isTrack `true` liefert. Kaputte Einträge fliegen also still raus,
    // z. B. in tracks.json der Song mit "id": "6" (Text statt Zahl).
    // Dank des Type Guards ist das Ergebnis vom Typ Track[].
    return data.filter(isTrack);
}
