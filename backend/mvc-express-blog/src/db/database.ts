// 'bun:sqlite' -> wegen Windows arm64
import { Database } from "bun:sqlite";
import path from "path";

// Datenbankpfad
const DB_FILE = path.join(import.meta.dir, "Blog.db");

// db bleibt solange undefindes bis db verbindung steht
let db: Database | undefined;

// db verbindung 'connectDB' muss nur einmal beim Start geöffnet werden
// und kann dann überall über getDB() verwenden werden
export function connectDB() {
    // Schon verbunden? Dann nichts doppelt öffnen.
    if (db) return db;

    console.log("Datenbankverbindung wird geöffnet...");
    db = new Database(DB_FILE, { create: true, strict: true });

    // Tabelle anlegen, falls es sie noch nicht gibt.
    db.run(`
        CREATE TABLE IF NOT EXISTS blog_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            image TEXT NOT NULL,
            author TEXT NOT NULL,
            createdAt INTEGER NOT NULL,
            teaser TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);

    return db;
}

// Verbindung holen. Fehler, wenn connectDB() vergessen wurde.
export function getDB() {
    if (!db) {
        throw new Error("Keine Datenbankverbindung. Erst connectDB() aufrufen.");
    }
    return db;
}

// db schließen
export function closeDB() {
    if (!db) return;
    console.log("Datenbankverbindung wird geschlossen...");
    db.close();
    db = undefined;
}
