// Code Along: Music Library
// Dieser Code erstellt Schritt für Schritt eine kleine Musikbibliothek-Anwendung von Grund auf.
// Jeder Teil ist direkt auf die Inhalte der Sitzung abgestimmt.
// Am Ende verfügen Sie über ein funktionierendes TypeScript-Projekt mit typisierten Daten, Union-Typen,
// Schnittstellen, Schnittmengen und Tupeln. In der Projekteinrichtungssitzung teilen Sie das Projekt in mehrere Module auf.

// Typannotationen und Aliase
// Annotierte Variablen und einen Typalias für das Kerndatenmodell hinzu
// Ein "Alias" ist nur ein anderer Name für einen bestehenden Typ.
// TrackId ist also ganz normal eine Zahl, aber der Name verrät uns, wofür die Zahl gedacht ist.
type TrackId = number;
type ArtistName = string;

// Das ist eine alte Variante (auskommentiert): ein Track als "type" statt als "interface".
// Wir nutzen unten stattdessen ein interface, weil man damit andere Typen erweitern kann.
// type Track = {
//     id: TrackId;
//     title: string;
//     artist: ArtistName;
//     liked: boolean;
// };

// Schnittstellen
// Ein "interface" beschreibt, wie ein Objekt aussehen muss (welche Eigenschaften und welche Typen).

// Media ist die Basis: Alles, was wir in der Bibliothek haben, hat eine ID und einen Titel.
interface Media {
    id: number;
    title: string;
}

// "extends" bedeutet: Track übernimmt alles von Media (id, title)
// und bekommt zusätzlich noch artist und liked dazu.
interface Track extends Media {
    artist: string;
    liked: boolean; // true = gefällt mir, false = gefällt mir nicht
}

// FeaturedTrack erweitert Track nochmal: ein besonders hervorgehobener Song.
interface FeaturedTrack extends Track {
    curatedBy: string;
    // "readonly" heißt: Der Wert darf nach dem Erstellen nicht mehr verändert werden.
    readonly addedDate: string;
}

// Eine Funktion, die einen Track bekommt (Parameter "track" vom Typ Track)
// und einen Text (string) zurückgibt, z. B. "Blue Light by Jorja Smith".
// Die Zeichenkette mit Backticks (`) nennt man Template-String: ${...} fügt Werte ein.
function describeTrack(track: Track): string {
    return `${track.title} by ${track.artist}`;
}

// Eine Liste (Array) von Tracks. "Track[]" heißt: viele Tracks in einer Liste.
// TypeScript prüft, dass jedes Objekt alle nötigen Eigenschaften hat.
const tracks: Track[] = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];

// tracks[0] ist das erste Element der Liste (gezählt wird ab 0).
console.log(describeTrack(tracks[0]));

// Union-Typen
// Format für jede Veröffentlichung und eine Tracklänge hinzufügen,
// das entweder in Sekunden oder als vorgefertigte "m:ss"Zeichenkette angegeben werden kann:

// Ein Union-Typ (|) bedeutet "entweder - oder".
// Format darf nur genau einer dieser drei Texte sein, alles andere gibt einen Fehler.
type Format = "vinyl" | "cd" | "digital";
// TrackLength darf entweder eine Zahl (Sekunden) oder ein Text (z. B. "3:12") sein.
type TrackLength = number | string;

function describeFormat(format: Format): string {
    return `Available on ${format}`;
}

// Diese Funktion macht aus einer Tracklänge immer einen Text im Format "m:ss".
function formatLength(length: TrackLength): string {
    // typeof prüft, welcher Typ gerade vorliegt. Innerhalb des if weiss TypeScript:
    // "length" ist hier garantiert eine Zahl.
    if (typeof length === "number") {
        // Math.floor rundet ab: 245 Sekunden / 60 = 4,08 -> 4 Minuten
        const minutes = Math.floor(length / 60);
        // % ist der Rest der Division: 245 % 60 = 5 Sekunden
        const seconds = length % 60;
        // padStart füllt vorne mit "0" auf, damit aus "5" ein "05" wird -> "4:05"
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
    // Wenn es keine Zahl war, ist es schon ein Text und wir geben ihn unverändert zurück.
    return length;
}

console.log(describeFormat("vinyl")); // vinyl
console.log(formatLength(245)); // gibt "4:05" aus
console.log(formatLength("3:12")); // gibt "3:12" aus

// "unknown" heisst: Wir wissen nicht, welchen Typ der Wert hat (z. B. weil er von aussen kommt).
// JSON.parse("198") wandelt den Text "198" in die Zahl 198 um.
const rawLength: unknown = JSON.parse("198");
// Bei "unknown" müssen wir den Typ erst prüfen, bevor wir den Wert benutzen dürfen.
if (typeof rawLength === "number") {
    console.log("rawLlength", formatLength(rawLength));
}

// Typeninferenz
// "Inferenz" = TypeScript erkennt den Typ selbst, wir müssen ihn nicht hinschreiben.

// label ist automatisch ein string, trackCount automatisch eine number.
const label = "My Library";
const trackCount = tracks.length; // length = Anzahl der Elemente in der Liste

// Macht aus einer Zahl eine Track-Nummer, z. B. 1 -> "TRK-1".
function formatId(id: number): string {
    return `TRK-${id}`;
}

// map geht jedes Element der Liste durch und baut daraus eine neue Liste.
// Hier: Für jeden Track (t) wird die ID formatiert -> ["TRK-1", "TRK-2"].
// TypeScript erkennt selbst, dass "ids" eine Liste von Texten ist (string[]).
const ids = tracks.map((t) => formatId(t.id));
console.log(ids, label, trackCount);

// Ein Track mit allen zusätzlichen Eigenschaften von FeaturedTrack.
// Würde hier z. B. curatedBy fehlen, gäbe TypeScript einen Fehler.
const pick: FeaturedTrack = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15",
};
// Hinweis: "pick.addedDate = ..." wäre ein Fehler, weil die Eigenschaft readonly ist.

console.log(`${pick.title} — featured since ${pick.addedDate}`);

// Schnittmengentypen und Tupel
// Kombination von Typen mit Hilfe von '&'

// HasRating beschreibt nur eine Bewertung. Erlaubt sind nur die Zahlen 1 bis 5.
type HasRating = {
    rating: 1 | 2 | 3 | 4 | 5;
};
// Mit & werden Typen zusammengesetzt: Ein RatedTrack ist ein Track UND hat ein Rating.
// Er braucht also alle Eigenschaften von beiden.
type RatedTrack = Track & HasRating;

const review: RatedTrack = {
    id: 4,
    title: "Ivy",
    artist: "Frank Ocean",
    liked: true,
    rating: 5, // würde hier 6 stehen, gäbe es einen Fehler
};

console.log(`${review.title}: ${review.rating}/5`);

// Ein Tupel ist eine Liste mit fester Länge und festen Typen je Position:
// an erster Stelle eine Zahl (Platzierung), an zweiter Stelle ein Text (Songtitel).
type ChartEntry = [number, string];

// Eine Liste aus mehreren solchen Tupeln = unsere Hitparade.
const chart: ChartEntry[] = [
    [1, "Nights"],
    [2, "Blue Light"],
];

// Destrukturierung: Wir packen jedes Tupel direkt in zwei Variablen aus,
// position (die Zahl) und title (der Text), und gehen so die ganze Hitparade durch.

for (const [position, title] of chart) {
    console.log(`#${position} ${title}`);
}
