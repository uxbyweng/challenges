// wegen Windows arm64. habe ich "bun:sqlite" in Bun eingebaut
import { Database } from "bun:sqlite";
import path from "path";

// Datenbankpfad
const DB_FILE = path.join(import.meta.dir, "Blog.db");

console.log("Datenbankverbindung wird geöffnet...");

// erbindung EINMAL beim Start öffnen und überall wiederverwenden
export const db = new Database(DB_FILE, { create: true, strict: true });

// Tabelle anlegen, falls es sie noch nicht gibt.
db.run(`
    CREATE TABLE IF NOT EXISTS blog_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL,
        teaser TEXT NOT NULL,                
        author TEXT NOT NULL,
        createdAt TEXT NOT NULL,              
        image TEXT NOT NULL,                  
        content TEXT NOT NULL
    )
`);

// db schließen
export function closeDB() {
    console.log("Datenbankverbindung wird geschlossen...");
    db.close();
}
