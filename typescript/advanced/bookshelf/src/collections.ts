// src/collections.ts

import type { Book } from "./types.js";
// import type { EntityId, Timestamped, HasId, Book, IsbnParts, BookCreatePayload, BookUpdatePayload, BookPreview } from "./types.js";

// 1. Leeres Ergebnis anlegen
// 2. Jedes Buch einzeln mit Schleife anschauen
// 3.  Wert der Eigenschaft (key = "author") holen
// 4. Gibt es das den author schon?
//    - Nein: leere Liste anlegen
//    - Ja: Es gibt schon eine Liste
// 5. Buch in die Liste pushen
// 6. Ergebnis zurückgeben

// Book
const books: Book[] = [
    {
        id: 1,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Herr der Ringe",
        author: "Tolkien",
        isbn13: "978-3608964295",
        isAvailable: true,
    },
    {
        id: 2,
        createdAt: new Date("2026-05-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Der Struwelpeter",
        author: "Hoffmann",
        isbn13: "978-5607964215",
        isAvailable: true,
    },
    {
        id: 3,
        createdAt: new Date("2026-05-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Schamane",
        author: "Tolkien",
        isbn13: "978-5607456215",
        isAvailable: true,
    },
    {
        id: 4,
        createdAt: new Date("2026-05-01"),
        updatedAt: new Date("2026-10-26"),
        title: "Name der Rose",
        author: "Hoffmann",
        isbn13: "978-5607456215",
        isAvailable: true,
    },
];
// console.log(books, "\n");

// 1. leeres Array/Fach
const GroupBooksByAuthor = [];
// console.log(GroupBooksByAuthor); // {}

// 2.
function getBooksFromASpecificAuthor(specificAuthor) {
    for (const book of books) {
        console.log(book.author);
        if (book.author === specificAuthor) {
            GroupBooksByAuthor.push(book.author);
        }
    }
}
console.log(getBooksFromASpecificAuthor("Tolkien"));
