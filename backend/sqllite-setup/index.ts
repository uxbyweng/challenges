import { closeDB } from "./db/database"; // Import öffnet automatisch die Verbindung
import express from "express";
import { getAllBlogEntries, getBlogEntryById } from "./src/models";

const app = express();
app.use(express.json());
const router = express.Router();

// GET -> alle Einträge
router.get("/", async (_req, res) => {
    console.log("Fetching all blog entries...");
    const entries = await getAllBlogEntries();
    res.status(200).json(entries);
});

// GET /:id -> ein Eintrag
router.get("/:id", async (_req, res) => {
    const entry = await getBlogEntryById(_req.params.id);
    if (!entry) {
        res.status(404).json({ error: "Eintrag nicht gefunden" });
        return;
    }
    res.json(entry);
});

app.use("/", router);

app.listen(3009, () => {
    console.log("Server is running on port 3009");
});

// Datenbank schließen
process.on("SIGINT", () => {
    closeDB();
    process.exit(0);
});

process.on("SIGTERM", () => {
    closeDB();
    process.exit(0);
});
