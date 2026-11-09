import { connectDB, closeDB } from "./db/database";
import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import blogpostRouter from "./routes/blogpostRoutes";
import aboutRoute from "./routes/aboutRoute";
import contactRoute from "./routes/contactRoute";
import adminRoutes from "./routes/adminRoutes";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectViews = path.resolve(__dirname, "views");
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");

// global verwendbare Jahreszahl deklarieren -> {{ Jahreszahl}}
const env = nunjucks.configure(projectViews, { autoescape: true, express: app });
env.addGlobal("Jahreszahl", new Date().getFullYear());

// express.static liefert Dateien direkt aus: /assets/flowers.jpg -> src/assets/flowers.jpg
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

// title=Hallo&author=Karsten  -> { title: "Hallo", author: "Karsten" }
app.use(express.urlencoded({ extended: true }));

// routing
app.use("/", blogpostRouter); // blogpost
app.use("/", aboutRoute); // about
app.use("/", contactRoute); // contact
app.use("/", adminRoutes); // admin

// Datenbank verbinden, bevor der Server Anfragen annimmt
connectDB();

const port = Number(process.env.PORT) || 1234;

// Server starten und auf Anfragen warten
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Datenbank schließen
process.on("SIGINT", () => {
    closeDB();
    console.log(`Datenbank geschlossen `);
    process.exit(0);
});

process.on("SIGTERM", () => {
    closeDB();
    console.log(`Datenbank geschlossen `);
    process.exit(0);
});
