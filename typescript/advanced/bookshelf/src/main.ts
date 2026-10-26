// src/main.ts

// Imports
import type { EntityId, Timestamped, HasId, Book, IsbnParts } from "./types.js";
import { ok } from "./api.js";

// EntityId
const id: EntityId = 44;
console.log(id);

// Timestamped
const erstellungsdatum: Timestamped = {
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-10-26"),
};
console.log(erstellungsdatum);

// HasId
const HatEineId: HasId = {
    id: 13,
};
console.log(HatEineId.id);

// Book
const books: Book[] = [
    {
        id: 1,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Herr der Ringe",
        author: "J. R. R. Tolkien",
        isbn13: "978-3608964295",
        isAvailable: true,
    },
    {
        id: 2,
        createdAt: new Date("2026-05-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Der Struwelpeter",
        author: "Allekauf",
        isbn13: "978-5607964215",
        isAvailable: true,
    },
];
console.log(books, "\n");

// ISBNgParts
const ISBNgroup: IsbnParts = [
    3, // Registration Group   (number) - 1 to 5 digits (e.g. 3 for German-language)
    "78613", // Publisher Identifier (string) - 7 digits
    "012", // Title Identifier     (string) - Up to 6 digits
];
const isbnNumber: string = ISBNgroup[0] + "-" + ISBNgroup[1] + "-" + ISBNgroup[2];
console.log("ISBN Nummer: ", isbnNumber, "\n");

// Tabelle anlegen mit 'id' , 'title', 'author' und 'isbn13'
const columns: (keyof Book)[] = ["id", "title", "author", "isbn13"];
// mit einer for-Schleife die Tabelle in der Console ausgeben
for (const book of books) {
    console.log("-----------------------------------------------");
    console.log(columns.map((column) => book[column]).join(" | "));
    console.log("-----------------------------------------------");
}

// Alle Tracks in der Variable 'allTracks' speichern, die eine API-Response 'o.k.' haben
const allTracks = ok(books);

// Formatierte Ausgabe aller Tracks und Featured-Tracks mit API-Response 'o.k.'
console.log(`Gesamtanzahl Bücher: ${allTracks.data.length} books\n`);
