# Backend-Vorlage (Bun + Express + TypeScript)

Basis-Projekt zum Kopieren für neue Backends. Läuft mit [Bun](https://bun.com), nutzt Express 5 und TypeScript.

## Einmalig: Voraussetzungen

1. **Bun installieren** (Windows, PowerShell):
    ```powershell
    powershell -c "irm bun.sh/install.ps1 | iex"
    ```
    Danach das Terminal neu öffnen und prüfen:
    ```bash
    bun --version
    ```
2. **Editor:** VS Code (oder ähnlich). Node.js wird nicht gebraucht, Bun bringt alles mit.

## Neues Projekt aus dieser Vorlage starten

1. Den Ordner kopieren, aber **ohne `node_modules`** (die werden neu installiert, kopierte Modules können kaputt sein, z. B. falsche CPU-Architektur).
2. In `package.json` den `"name"` ändern.
3. Im neuen Ordner Abhängigkeiten installieren:
    ```bash
    bun install
    ```
4. Server starten (siehe unten).
5. Optional Git einrichten: `git init`

## Befehle

| Befehl               | Was passiert                                                                         |
| -------------------- | ------------------------------------------------------------------------------------ |
| `bun install`        | Installiert alle Pakete aus `package.json` / `bun.lock`                              |
| `bun run dev`        | Startet den Server mit Neustart bei jeder Dateiänderung (zum Entwickeln)             |
| `bun run start`      | Startet den Server einmal ohne Auto-Neustart                                         |
| `bun run typecheck`  | Prüft nur die Typen (`bun check`), startet nichts                                    |
| `bun run build`      | Kompiliert nach `dist/` und kopiert `src/public/` dazu                               |
| `bun run serve`      | Baut zuerst (`build`) und startet danach den gebauten Server aus `dist/`             |
| `bun add <paket>`    | Fügt ein Paket hinzu (z. B. `bun add cors`)                                          |
| `bun add -d <paket>` | Fügt ein Paket nur für die Entwicklung hinzu (z. B. Typen: `bun add -d @types/cors`) |

`dev` und `start` prüfen vor dem Start die Typen (`--check`). Bei Typfehlern startet der Server nicht, die Fehler stehen dann im Terminal.

## Testen, ob es läuft

Nach `bun run dev` erscheint:

```
Server is running at http://localhost:4000
```

Im Browser `http://localhost:4000/` öffnen, dort erscheint die Startseite aus `src/public/index.html`. Oder im Terminal:

```bash
curl http://localhost:4000/
```

Beenden mit `Strg + C`.

## Build (dist-Ordner)

```bash
bun run build
```

Das macht zwei Dinge:

1. `bun --bun tsc` kompiliert `src/**/*.ts` nach `dist/` (Einstellungen `rootDir` / `outDir` in `tsconfig.json`).
2. `cp -R src/public dist/` kopiert die statischen Dateien dazu. (In der Bun-Shell heißt die Option `-R`, `-r` funktioniert dort nicht.)

Danach liegt in `dist/`:

```
dist/
├── index.js          kompilierter Server
└── public/
    ├── index.html    Startseite
    └── style.css     Styles
```

Den gebauten Server starten (ohne TypeScript, mit installierten `node_modules`):

```bash
bun dist/index.js
```

Oder Bauen und Starten in einem Schritt:

```bash
bun run serve
```

`serve` führt `bun run build && bun dist/index.js` aus. Schlägt der Build fehl, startet der Server nicht. Zum Entwickeln ist `bun run dev` besser, weil `serve` bei Dateiänderungen nicht neu startet. Ein noch laufender Dev-Server muss vorher mit `Strg + C` beendet werden, sonst ist Port 4000 belegt.

`dist/` steht in `.gitignore` und wird bei jedem Build neu erzeugt. Alte Dateien darin werden nicht gelöscht. Bei Umbenennungen den Ordner vorher löschen.

Neue statische Dateien (Bilder, weitere HTML-Seiten) müssen im `build`-Script bei `cp` ergänzt werden.

## Projektstruktur

```
backend/
├── src/index.ts     Einstiegspunkt: Express-App, Middleware, Routen
├── src/public/      Statische Dateien: index.html (Startseite unter "/"), style.css
├── dist/            Build-Ausgabe (wird erzeugt, nicht einchecken)
├── package.json     Abhängigkeiten und Scripts
├── tsconfig.json    TypeScript-Einstellungen (strict)
├── bun.lock         Fixierte Paketversionen (mit einchecken)
├── .gitignore       ignoriert u. a. node_modules, dist und .env
├── Bookmarks/       Leere Bruno-Collection (API-Client) für eigene Requests
└── BookMonkey/      Beispiel-Requests für eine andere API (Port 4730), beim Kopieren weglassen
```

## Typische Stolpersteine

- **Port 4000 belegt:** Das andere Programm beenden oder einen anderen Port über die Umgebungsvariable `PORT` setzen (Standard ist 4000):
    ```bash
    PORT=5000 bun run dev          # Git Bash
    ```
    ```powershell
    $env:PORT = 5000; bun run dev  # PowerShell
    ```
- **Middleware registrieren:** Eine Middleware-Fabrik muss aufgerufen werden: `app.use(Logger())`, nicht `app.use(Logger)`. Sonst bleibt jeder Request hängen.
- **Typen für `req`/`res`/`next`:** Mit `import type { Request, Response, NextFunction } from "express"` importieren. Wegen `verbatimModuleSyntax` muss es ein `import type` sein.
- **JSON-Body (`express.json()`):** Die Middleware steht schon in `src/index.ts`, vor den Routen. Trotzdem ist `req.body` in Express 5 **`undefined`**, wenn ein Request ohne Body oder ohne Header `Content-Type: application/json` kommt. `const { url, title } = req.body;` wirft dann einen Fehler (HTTP 500). Deshalb immer: `const { url, title } = req.body ?? {};`. Beim Testen mit Bruno/curl auf den JSON-Header achten.
- **Daten aus dem Request:** `req.params.id` kommt aus der URL (`/bookmarks/:id`) und ist immer ein `string`, für Zahlen `Number(req.params.id)`. `req.query.tag` kommt aus dem `?tag=...` und kann `undefined` sein. `req.body` ist der JSON-Body.
- **Fehler-Middleware:** Am Ende von `src/index.ts` (nach den Routen) steht eine Fehler-Middleware. Kaputtes JSON im Body ergibt dadurch `400` mit `{ "error": "..." }`, ein unerwarteter Fehler im Code `500` mit `{ "error": "Internal Server Error" }`. Die Details stehen nur im Server-Log. Neue Routen müssen **vor** ihr stehen.
- **Pakete ohne Typen:** Fehlt einem Paket die Typisierung, hilft meist `bun add -d @types/<paket>`.
- **Umgebungsvariablen:** Geheimnisse in eine `.env` schreiben. Bun lädt sie automatisch, und sie ist in `.gitignore` eingetragen.
- **`node_modules` nie kopieren oder einchecken:** Immer neu mit `bun install` erzeugen.
- **CORS:** Ruft ein Frontend im Browser die API von einem anderen Origin auf (z. B. Frontend `localhost:5173`, Backend `localhost:4000`), blockiert der Browser die Antwort mit einem „CORS error". Dann:
    ```bash
    bun add cors
    bun add -d @types/cors
    ```
    ```ts
    import cors from "cors";

    app.use(cors({ origin: "http://localhost:5173" })); // vor den Routen
    ```
    Nur nötig für Browser-Zugriffe von einem anderen Origin, nicht für `curl`, Bruno oder die Adressleiste. `cors()` ohne Optionen erlaubt jeden Origin, das nicht unbedacht im Produktivbetrieb lassen.
- **`tsc` startet nicht („Unable to resolve @typescript/typescript-win32-x64"):** Bun und Node laufen auf unterschiedlichen CPU-Architekturen (z. B. Bun als ARM64, Node als x64), und Bun installiert das TypeScript-Binary für seine eigene Architektur. Deshalb steht im Build-Script `bun --bun tsc`, das nutzt die Bun-Runtime statt Node. Prüfen mit `bun -e "console.log(process.arch)"` und `node -e "console.log(process.arch)"`.
- **Statische Dateien:** Alles in `src/public/` (HTML, CSS, Bilder, Frontend-Skripte) liefert Express über `express.static` aus, `index.html` unter `/`. `express.static` muss **vor** den Routen stehen, und eine eigene `app.get("/")` würde die `index.html` verdecken (bzw. von ihr verdeckt werden).
- **Kein `<script src="dist/index.js">` in der HTML:** `dist/index.js` ist der Server-Code (importiert `express`) und läuft nicht im Browser. Frontend-Skripte gehören in eine eigene Datei.

## Vorlage von Grund auf neu bauen

Falls die Vorlage mal verloren geht:

```bash
mkdir mein-projekt && cd mein-projekt
bun init                       # Vorlage "Blank" wählen
bun add express
bun add -d @types/express
```

Danach `src/index.ts` anlegen, in `package.json` den `dev`-Script (`bun --watch --check src/index.ts`) eintragen und `"module": "src/index.ts"` setzen.
