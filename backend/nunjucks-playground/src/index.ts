import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";

const app = express();
const PORT = 3000;

// --- Nunjucks einrichten ("Configure Nunjucks") ---
// Erster Parameter: Ordner, in dem Nunjucks die Templates sucht.
// `express: app` verbindet die Engine mit Express -> danach geht res.render().
nunjucks.configure(path.join(import.meta.dir, "../views"), {
    autoescape: true, // HTML in Variablen wird entschärft (Schutz vor XSS)
    express: app,
    noCache: true, // Template-Änderungen sofort sehen, ohne Neustart
});
app.set("view engine", "njk"); // damit man res.render("pages/index") statt "index.njk" schreibt

// Statische Dateien (CSS) aus public/
app.use(express.static(path.join(import.meta.dir, "../public")));

// --- Routen ---
app.get("/pages/index", (req, res) => {
    res.render("pages/index", { title: "Startseite", name: "Karsten" });
});

app.get("/pages/tags", (req, res) => {
    res.render("pages/tags", {
        title: "Tags",
        fruits: ["Apfel", "Birne", "Kirsche"],
        loggedIn: true,
        user: { name: "Karsten", role: "student" },
        htmlText: "<b>fett?</b>", // zum Testen von autoescape vs. | safe
    });
});

app.get("/pages/books", (req, res) => {
    res.render("pages/books", {
        title: "Books",
        books: [
            { title: "Clean Code", author: "Robert C. Martin", year: 2008 },
            { title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
        ],
    });
});

app.listen(PORT, () => {
    console.log(`Läuft auf http://localhost:${PORT}`);
});
