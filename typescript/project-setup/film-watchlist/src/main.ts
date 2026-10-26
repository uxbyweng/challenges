// /src/main.ts

import type { Film, Playlist } from "./types.js";
import { formatFilm, getUnwatched, getProperty, pluck } from "./types.js";

const playlistName: string = "Karstens Top 5 Filmlist";
const films: Film[] = [
    { id: 1, title: "Nikita", year: 1990, watched: false, rating: 5 },
    { id: 2, title: "Dead Man", year: 1995, watched: true, rating: 2 },
    { id: 3, title: "Night On Earth", year: 1991, watched: true, rating: 4 },
    { id: 4, title: "Léon: The Professional", year: 1994, watched: true },
    { id: 5, title: "Le Grand Bleu)", year: 1988, watched: true, rating: 5 },
];

const playlist: Playlist = {
    name: playlistName,
    films: films,
};

// console.log(films);
// console.log(playlist);
// console.log(formatFilm(films[0]));

console.log("Alle Filme:");
// alle Filme in der Playlist formatieren und ausgeben.
for (const film of playlist.films) {
    console.log(formatFilm(film));
}

console.log("\nUngesehene Filme:");
// (watched: false) filmne finden und in Variable 'unwatched' speichern
const unwatched = getUnwatched(playlist);
// alle unwatched Filme formatieren und ausgeben.
for (const film of unwatched) {
    console.log(formatFilm(film));
}

const titles = pluck(playlist.films, "title");
// string[]: ["Nikita", "Dead Man", ...]

const years = pluck(playlist.films, "year");
// number[]: [1990, 1995, ...]

const oldest = Math.min(...years); // geht, weil TypeScript weiß: number[]

const title = getProperty(films[0], "title");
// title ist string

console.log("Alle Filmtitel: ", titles);
console.log("Ältester Film: ", oldest);
console.log("Titel des 1. Films: ", title);
