// src/index.ts

import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import path from "node:path";
import { bookmarks, type Bookmark } from "./bookmark";

const app = express();
const port = Number(process.env.PORT ?? 4000);

// Middleware - looggt alle Requests, Respones die über HTTP rein oder rausgehen
const Logger = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        // console.log(`${req.method} ${req.url}`);
        next();
    };
};
app.use(Logger());

// Helfer, um JSON-Body in Express 5 zu parsen.
// beim Auslesen: const { url, title } = req.body ?? {};
app.use(express.json());

// statische Dateien abzeigen lassen  (index.html, style.css, ...)
app.use(express.static(path.join(import.meta.dirname, "public")));

// ENDPONTS
// Route with full list of bookmarks
app.get("/bookmarks", (req, res) => {
    if (bookmarks) {
        res.status(200).json(bookmarks);
        // console.log(bookmarks);
    }
});

// Route with a single bookmark by its id
app.get("/bookmarks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Bad Request" });
        return;
    }

    // find liefert das Bookmark oder undefined
    const bookmark = bookmarks.find((b) => b.id === id);
    if (!bookmark) {
        res.status(404).json({ error: "Bookmark not found" });
        return;
    }
    res.status(200).json(bookmark);
});

// Route create new bookmark
app.post("/bookmarks", (req, res) => {
    // neue id = höchste vorhandene ID plus 1
    let newID = Math.max(0, ...bookmarks.map((b) => b.id)) + 1;

    const { url, title, tag } = req.body ?? {};

    if (!url || !title) {
        res.status(400).json({ error: "Error" });
        return;
    }

    const newBookmark: Bookmark = { id: newID, url, title, tag };

    bookmarks.push(newBookmark);
    res.status(201).json(newBookmark);
});

// Route delete last added bookmark
app.delete("/bookmarks/last", (req, res) => {
    let lastID = Math.max(0, ...bookmarks.map((b) => b.id));

    // finde id position mit 'findIndex' (bei no match kommt -1 zurück)
    const index = bookmarks.findIndex((b) => b.id === lastID);
    if (index === -1) {
        res.status(404).json({ error: "Kein Bookmark mehr vorhanden" });
        return;
    }

    // delete with splice an position 'index'
    const [deleted] = bookmarks.splice(index, 1);
    res.status(200).json(deleted);
});

// Route delete bookmark by id
app.delete("/bookmarks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Bad Request" });
        return;
    }

    // finde id position mit 'findIndex' (bei no match kommt -1 zurück)
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index === -1) {
        res.status(404).json({ error: "Bookmark not found" });
        return;
    }

    // delete with splice an position 'index'
    const [deleted] = bookmarks.splice(index, 1);
    res.status(200).json(deleted);
});

// Fehler-Middleware (muss nach den Routen stehen)
app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? "Internal Server Error" : err.message });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    //console.log(bookmarks);
});
