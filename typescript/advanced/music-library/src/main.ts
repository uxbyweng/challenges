// src/main.ts
import { formatId, describeFormat } from "./track.js";
import type { Format, Track, FeaturedTrack } from "./types.js";
import { readFileSync } from "node:fs";
import { ok, findById } from "./api.js";
import { addTrack, updateTrack, toPreview } from "./library.js";

const libraryName = "Late Night Listening";

function describeTrack(title: string, artist: string): string {
    return `${title} by ${artist}`;
}

const tracks: Track[] = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];

const pick: FeaturedTrack = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15",
};

// Namen der Music Library in der Console ausgeben
console.log(`Library: ${libraryName}`);

// den ersten Track der Music Library ausgeben
console.log(describeTrack(tracks[0].title, tracks[0].artist));

// alle Tracks der Music Library (mit formatierter ID) ausgeben
tracks.forEach((t) => console.log(formatId(t.id)));

// Featured Track formatieren und ausgeben
console.log(`Featured: ${pick.title}, added ${pick.addedDate}`);

// Datei 'notes.txt' importieren, lesen und ausgeben
const notes = readFileSync("notes.txt", "utf8");
console.log("\n", notes);

// Beschreibung ausgeben, die für Tracks mit dem Label 'digital' gespeichert ist
console.log("\n", describeFormat("digital"));

// Tabelle anlegen mit 'id' , 'title', 'artist' und 'liked'
const columns: (keyof Track)[] = ["id", "title", "artist", "liked"];
// mit einer for-Schleife die Tabelle in der Console ausgeben
for (const track of tracks) {
    console.log("\n", columns.map((column) => track[column]).join(" | "));
}

// Alle Tracks in der Variable 'allTracks' speichern, die eine API-Response 'o.k.' haben
const allTracks = ok(tracks);
// Alle Featured-Tracks in der Variable 'featured' speichern, die eine API-Response 'o.k.' haben
const featured = ok(pick);

// Formatierte Ausgabe aller Tracks und Featured-Tracks mit API-Response 'o.k.'
console.log(`${allTracks.data.length} tracks, featured: ${featured.data.title}, picked by ${featured.data.curatedBy}`);

console.log(findById(tracks, 2)?.title);

const ivy = addTrack({ title: "Ivy", artist: "Frank Ocean", liked: false });
updateTrack(ivy.id, { liked: true });
updateTrack(ivy.id, { artist: "Frank Oooooooooooooooooooooooooooooohhhh" });

console.log(toPreview(ivy), ivy.liked);

const formatCounts: Record<Format, number> = {
    vinyl: 12,
    cd: 30,
    digital: 214,
};

console.log(formatCounts);
