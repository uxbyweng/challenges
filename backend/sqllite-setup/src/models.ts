import { db } from "../db/database";

export interface BlogEntry {
    id: number;
    title: string;
    version: number | null; // darf leer sein
    created_at: string;
    updated_at: string;
    content: string | null; // darf leer sein
}

// Alle Einträge holen
export function getAllBlogEntries(): BlogEntry[] {
    return db.query<BlogEntry, []>("SELECT * FROM blog_entries").all(); // .all() -> alle Zeilen als Array
}

// Einen Eintrag per id holen
export function getBlogEntryById(id: string): BlogEntry | null {
    return db.query<BlogEntry, [string]>("SELECT * FROM blog_entries WHERE id = ?").get(id); // .get(id) -> 1. Zeile
}
