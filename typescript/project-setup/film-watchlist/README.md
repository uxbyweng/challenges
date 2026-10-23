# TypeScript Project: Film Watchlist

Projekt im Rahmen einer Typescript challenge zum Üben.

> TypeScript in `src/` schreiben → `tsc` kompiliert nach `dist/` → `node` führt `dist/index.js` aus und startet bei jeder Änderung neu.

### 01. Abhängigkeiten installieren

```bash
npm install
```

> Hinweis: Ohne `npm install` fehlt der Ordner `node_modules/`. Dann gibt es keinen lokalen `tsc`, und `npx tsc` kann scheitern oder lädt ein falsches Paket.
> Das muss nur einmal gemacht werden (und erst wieder, wenn sich die `package.json` ändert).

### 02. Zwei Terminals öffnen

Beide Terminals müssen im **Projektordner** (`film-watchlist/`) laufen.

|   Terminal   | Befehl          | Aufgabe                                                                                                     |
| :----------: | --------------- | ----------------------------------------------------------------------------------------------------------- |
| 1 (Compiler) | `npm run dev`   | Startet `tsc --watch`. Kompiliert `src/*.ts` bei jeder Änderung neu nach `dist/`.                           |
|  2 (Runner)  | `npm run watch` | Startet `node --watch dist/index.js`. Führt das Ergebnis aus und startet bei jeder Änderung in `dist/` neu. |

**Reihenfolge:**

- Terminal 1 zuerst starten. Es muss erst eine `dist/index.js` geben, bevor Terminal 2 etwas ausführen kann.

### Einmalig bauen und starten (ohne Watch)

```bash
npm run build   # tsc: einmal kompilieren
npm start       # node dist/index.js
```

## Dateibaum

```text
film-watchlist/
├── src/
│   ├── main.ts
│   ├── types.ts
│
├── dist/
│   ├── main.js
│   ├── main.js.map
│   ├── types.js
│   ├── types.js.map
│   └── users.json
│
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Was machen die Dateien in `src/`?

| Datei      | Inhalt                                                 |
| ---------- | ------------------------------------------------------ |
| `main.ts`  | Importiert `types.js` und die darin enthaltenen Types. |
| `types.ts` | Definiert die Types                                    |

|

## npm-Scripts

| Script          | Befehl                       | Wofür                                |
| --------------- | ---------------------------- | ------------------------------------ |
| `npm run build` | `tsc`                        | Einmal kompilieren                   |
| `npm start`     | `node dist/index.js`         | Einmal ausführen                     |
| `npm run dev`   | `tsc --watch`                | Compiler im Watch-Modus (Terminal 1) |
| `npm run watch` | `node --watch dist/index.js` | Runner im Watch-Modus (Terminal 2)   |

---
