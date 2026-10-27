// src/main.ts

import { fetchBooks } from "./books.js";
import type { Book } from "./books.js";

const form = document.getElementById("search-form");
const list = document.getElementById("book-list");

if (!(form instanceof HTMLFormElement)) {
    throw new Error("Element #search-form not found");
}
if (!(list instanceof HTMLUListElement)) {
    throw new Error("Element #book-list not found");
}

const render = (results: Book[]): void => {
    list.replaceChildren(
        ...results.map((book) => {
            const item = document.createElement("li");
            item.append(` ${book.title} by ${book.authors}`);
            return item;
        }),
    );
};

function readQuery(form: HTMLFormElement): string {
    const query = new FormData(form).get("query");
    return typeof query === "string" ? query.trim().toLowerCase() : "";
}

const API_URL = "https://www.dbooks.org/api/search/";

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // reload verhindern
    const query = readQuery(form);

    if (query === "") {
        // wenn kein suchbegriff eingegeben wird
        list.replaceChildren();
        return;
    }
    try {
        const books = await fetchBooks(`${API_URL}${encodeURIComponent(query)}`);
        render(books);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        list.textContent = `Could not load books: ${message}`;
    }
});
