// express = der Webserver, nunjucks = die Template-Engine (macht aus den .html-Dateien fertige Seiten)
import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
// Die Router bündeln die Routes (URL -> Controller). Sie hängen wir unten an die App.
import blogpostRouter from "./routes/blogpostRoutes";
import adminRoutes from "./routes/adminRoutes";

// Die App selbst: hier hängen wir Middleware und Router ein
const app = express();

// In ES-Modulen ("type": "module" in package.json) gibt es __dirname nicht von allein.
// Wir bauen es aus der URL dieser Datei (import.meta.url) nach.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// projectRoot = der Projektordner (eine Ebene über src/). Von hier aus suchen wir Templates und Dateien.
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

// Nunjucks sucht Templates ab projectRoot (deshalb liegen index.html, admin.html usw. dort).
// autoescape: true wandelt <, >, " in Ausgaben wie {{ post.title }} in harmlose Zeichen um.
// express: app verbindet Nunjucks mit res.render(...).
nunjucks.configure(projectRoot, { autoescape: true, express: app });
// express.static liefert Dateien direkt aus: /assets/flowers.jpg -> src/assets/flowers.jpg
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

// Liest die Felder eines HTML-Formulars (POST) und legt sie in req.body ab.
// Ohne diese Zeile ist req.body in den Admin-Controllern leer.
app.use(express.urlencoded({ extended: true }));

// Die Router einhängen. Express prüft sie der Reihe nach, der erste passende gewinnt.
app.use("/", blogpostRouter); // öffentliche Seiten: /, /posts/:slug, /about, /contact
app.use("/", adminRoutes); // Admin-Bereich: /admin/...

// Port aus der Umgebungsvariable PORT, sonst der Standardwert dahinter
const port = Number(process.env.PORT) || 1234;

// Server starten und auf Anfragen warten
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
