// src/books.ts

export interface Book {
    id: string;
    title: string;
    subtitle: string;
    authors: string;
    image: string;
    url: string;
}

function isBook(value: unknown): value is Book {
    // Type Guard
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "string" &&
        "title" in value &&
        typeof value.title === "string" &&
        "subtitle" in value &&
        typeof value.subtitle === "string" &&
        "authors" in value &&
        typeof value.authors === "string" &&
        "image" in value &&
        typeof value.image === "string" &&
        "url" in value &&
        typeof value.url === "string"
    );
}

export async function fetchBooks(url: string): Promise<Book[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (typeof data !== "object" || data === null || !("books" in data)) {
        throw new Error("Expected an object with a 'books' property");
    }

    if (!Array.isArray(data.books)) {
        throw new Error("Expected 'books' to be a list");
    }

    return data.books.filter(isBook);
}
