# 🛠️ TypeScript Project Setup: Extended Configuration

Kleines Demo-Projekt zum Üben einer **erweiterten `tsconfig.json`** mit ES-Modulen (`nodenext`), JSON-Import und Live-Reload über zwei Terminals.

> **Kurz gesagt:** TypeScript in `src/` schreiben → `tsc` kompiliert nach `dist/` → `node` führt `dist/index.js` aus und startet bei jeder Änderung neu.

---

## 🚀 Schnellstart

### 0. Zuerst: Abhängigkeiten installieren

```bash
npm install
```

> ⚠️ **Nicht vergessen!** Ohne `npm install` fehlt der Ordner `node_modules/`. Dann gibt es keinen lokalen `tsc`, und `npx tsc` kann scheitern oder lädt ein falsches Paket.
> Das musst du nur einmal machen (und wieder, wenn sich die `package.json` ändert).

### 1. Zwei Terminals öffnen

Beide Terminals müssen im **Projektordner** (`extended-configuration/`) laufen.

| Terminal | Befehl | Aufgabe |
| :-: | --- | --- |
| **1️⃣ Compiler** | `npm run dev` | Startet `tsc --watch`. Kompiliert `src/*.ts` bei jeder Änderung neu nach `dist/`. |
| **2️⃣ Runner** | `npm run watch` | Startet `node --watch dist/index.js`. Führt das Ergebnis aus und startet bei jeder Änderung in `dist/` neu. |

```text
 src/index.ts  ──(tsc --watch)──▶  dist/index.js  ──(node --watch)──▶  Ausgabe im Terminal
   du editierst        Terminal 1        wird erzeugt        Terminal 2
```

**Reihenfolge:** Terminal 1 zuerst starten. Es muss erst eine `dist/index.js` geben, bevor Terminal 2 etwas ausführen kann.

### Einmalig bauen und starten (ohne Watch)

```bash
npm run build   # tsc: einmal kompilieren
npm start       # node dist/index.js
```

---

## 📁 Dateibaum

```text
extended-configuration/
├── 📂 src/                  ← Quellcode (hier arbeitest du)
│   ├── index.ts             ← Einstiegspunkt: importiert users.json + Typen, gibt Daten aus
│   ├── types.ts             ← Typ APIResponse
│   └── users.json           ← Beispieldaten (ein User)
│
├── 📂 dist/                 ← Build-Ergebnis von tsc (wird erzeugt, nicht von Hand ändern)
│   ├── index.js             ← kompiliertes JavaScript, wird von node ausgeführt
│   ├── index.js.map         ← Source Map (Fehler zeigen auf die .ts-Zeile)
│   ├── types.js
│   ├── types.js.map
│   └── users.json           ← von tsc hierher kopiert (wegen resolveJsonModule)
│
├── 📂 node_modules/         ← installierte Pakete (entsteht durch npm install)
├── package.json             ← Scripts und Abhängigkeiten
├── package-lock.json        ← exakte Versionen der installierten Pakete
├── tsconfig.json            ← TypeScript-Konfiguration
└── README.md                ← diese Datei
```

### Was machen die Dateien in `src/`?

| Datei | Inhalt |
| --- | --- |
| `index.ts` | Importiert `users.json` und den Typ `APIResponse`, baut ein `response`-Objekt und gibt es per `console.log` aus. |
| `types.ts` | Definiert den Typ `APIResponse` mit `page`, `result` (`id`, `text`) und `maxCount`. |
| `users.json` | Beispieldaten: `[{ "name": "user1", "age": 22, "id": 1 }]` |

---

## 📜 npm-Scripts

| Script | Befehl dahinter | Wofür |
| --- | --- | --- |
| `npm run build` | `tsc` | Einmal kompilieren |
| `npm start` | `node dist/index.js` | Einmal ausführen |
| `npm run dev` | `tsc --watch` | Compiler im Watch-Modus (Terminal 1) |
| `npm run watch` | `node --watch dist/index.js` | Runner im Watch-Modus (Terminal 2) |

---

## ⚙️ Die `tsconfig.json` erklärt

| Option | Wirkung |
| --- | --- |
| `rootDir: ./src` / `outDir: ./dist` | Quellcode liegt in `src/`, das Ergebnis landet in `dist/`. |
| `target: esnext` / `lib: ["esnext"]` | Es wird modernes JavaScript erzeugt, ohne Umschreiben für alte Umgebungen. |
| `types: ["node"]` | Lädt die Typen aus `@types/node` (z. B. für `console`, `process`). |
| `module: nodenext` | Passt zur Modulauflösung von Node. Zusammen mit `"type": "module"` in der `package.json` entsteht ESM. |
| `verbatimModuleSyntax` | `import type` und normales `import` müssen sauber getrennt sein. Typ-Imports werden komplett entfernt. |
| `esModuleInterop` | Erleichtert den Import von CommonJS-Paketen. |
| `resolveJsonModule` | Erlaubt `import users from "./users.json"`. |
| `sourceMap` | Erzeugt `.js.map`-Dateien für besseres Debugging. |
| `skipLibCheck` | Überspringt die Prüfung der `.d.ts`-Dateien in Bibliotheken. |
| `strict` | Schaltet alle strengen Typprüfungen ein. |
| `noUnusedLocals` / `noUnusedParameters` | Meldet ungenutzte Variablen und Parameter als Fehler. |
| `noFallthroughCasesInSwitch` | Meldet `case`-Zweige ohne `break`. |
| `forceConsistentCasingInFileNames` | Verhindert Importe mit falscher Groß- und Kleinschreibung. |
| `include` / `exclude` | Kompiliert `src/**/*` und ignoriert `node_modules`. |

---

## 🧠 Gut zu wissen

- **`.js`-Endung in Imports:** Bei `nodenext` schreibst du `import ... from "./types.js"`, obwohl die Datei `types.ts` heißt. Node sieht später nur die kompilierte `.js`.
- **`with { type: "json" }`:** ES-Module verlangen diese *import attribute* beim Import von JSON-Dateien.
- **`tsconfig.json`, nicht `.ts`:** Der Compiler findet die Konfiguration nur unter genau diesem Namen.
- **`node --watch index.js` im Projektordner funktioniert nicht**, weil die Datei in `dist/` liegt. Nimm `npm run watch`.

---

## 🩹 Troubleshooting

| Problem | Ursache und Lösung |
| --- | --- |
| `MODULE_NOT_FOUND` beim Start von Terminal 2 | `dist/index.js` existiert noch nicht. Terminal 1 (`npm run dev`) zuerst starten und warten, bis es kompiliert hat. |
| `dist/` bleibt leer | `tsconfig.json` fehlt oder heißt falsch. Prüfen, ob sie genau so heißt. |
| `tsc` nicht gefunden oder komisches Verhalten | `npm install` vergessen. |
| Änderungen kommen nicht an | Läuft Terminal 1 noch? Nach Tippfehlern im Code zeigt `tsc` Fehler an, die du dort lesen kannst. |
