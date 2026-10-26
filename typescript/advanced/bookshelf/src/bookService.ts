// src/bookService.ts

import type { ApiResponse, Book, BookCreatePayload, BookPreview, BookUpdatePayload, EntityId, IsbnParts } from "./types.js";

// Alle Bücher als Kurzfassung (id, title, author).
// 'async' macht aus dem Rückgabewert automatisch ein Promise.
export async function fetchBooks(): Promise<ApiResponse<BookPreview[]>> {
    return { status: 200, message: "Books fetched", data: [] };
}

// Ein einzelnes Buch anhand seiner id.
export async function fetchBook(_id: EntityId): Promise<ApiResponse<Book>> {
    throw new Error("fetchBook ist noch nicht implementiert");
}

// Neues Buch anlegen. Der Client schickt nur die Felder aus BookCreatePayload,
// id, createdAt und updatedAt setzt später der Server.
export async function createBook(_payload: BookCreatePayload): Promise<ApiResponse<Book>> {
    throw new Error("createBook ist noch nicht implementiert");
}

// Buch ändern. 'changes' enthält nur die Felder, die sich ändern sollen.
export async function updateBook(_id: EntityId, _changes: BookUpdatePayload): Promise<ApiResponse<Book>> {
    throw new Error("updateBook ist noch nicht implementiert");
}

// Zerlegt eine ISBN wie "3-78613-012" in ihre drei Teile.
// Das Ergebnis ist ein tuple: [Gruppe als number, Verlag als string, Titel als string].
export function parseIsbn(isbn: string): IsbnParts {
    const [group, publisher, title] = isbn.split("-");
    return [Number(group), publisher, title];
}
