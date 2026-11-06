-- seeddb.sql

-- Alte Tabelle entfernen, falls es sie gibt (macht das Skript beliebig oft ausführbar)
DROP TABLE IF EXISTS blog_entries;

-- Tabelle neu anlegen
CREATE TABLE blog_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- wird automatisch hochgezählt: 1, 2, 3 ...
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  teaser TEXT NOT NULL,                 -- kurzer Anreißer für die Übersicht
  author TEXT NOT NULL,
  createdAt TEXT NOT NULL,              -- Datum als Text im Format JJJJ-MM-TT
  image TEXT NOT NULL,                  -- nur der Dateiname des Bildes
  content TEXT NOT NULL
);

-- Startdaten 
INSERT INTO blog_entries (title, teaser, author, createdAt, image, content) VALUES
  (
    'Mein erster Tag im Bootcamp',
    'Neue Leute, neue Tools und ein voller Kopf am Abend.',
    'Karsten',
    '2026-10-19',
    'bootcamp-start.jpg',
    'Heute ging es los. Wir haben das Team kennengelernt, die Entwicklungsumgebung eingerichtet und die ersten Aufgaben bekommen. Besonders gespannt bin ich auf TypeScript und das Backend.'
  ),
  (
    'TypeScript: Warum Typen helfen',
    'Fehler finden, bevor der Code überhaupt läuft.',
    'Karsten',
    '2026-10-27',
    'typescript.jpg',
    'Mit TypeScript sagt man dem Code, welche Form Daten haben müssen. Der Editor meldet sofort, wenn etwas nicht passt, zum Beispiel ein String statt einer Zahl. Das spart viel Suchen.'
  ),
  (
    'Express: Mein erster Server',
    'Ein paar Zeilen reichen, und der Browser bekommt eine Antwort.',
    'Anna',
    '2026-11-02',
    'express.jpg',
    'Mit Express legt man Routen an, etwa GET /, und schickt Daten als JSON zurück. Der Server lauscht auf einem Port, in meinem Fall 3009.'
  ),
  (
    'MVC einfach erklärt',
    'Model, View, Controller: Wer macht eigentlich was?',
    'Ben',
    '2026-11-04',
    'mvc.jpg',
    'Das Model holt die Daten, der Controller nimmt die Anfrage entgegen und entscheidet, was passiert, und die View zeigt das Ergebnis an. So bleibt jeder Teil klein und übersichtlich.'
  ),
  (
    'SQLite: Eine Datenbank in einer Datei',
    'Kein Server, keine Installation, nur eine .db-Datei.',
    'Karsten',
    '2026-11-06',
    'sqlite.jpg',
    'SQLite speichert alles in einer einzigen Datei. Mit SELECT lese ich Daten, mit einem Platzhalter wie ? übergebe ich Werte sicher an die Abfrage. Perfekt zum Lernen.'
  ),
  (
    'Seed-Dateien: Immer mit Daten starten',
    'Ein Befehl, und die Datenbank ist wieder im Ausgangszustand.',
    'Anna',
    '2026-11-09',
    'seed.jpg',
    'Eine Seed-Datei enthält Tabelle und Startdaten. Wenn beim Testen etwas kaputtgeht, führe ich sie einfach noch einmal aus und fange mit sauberen Daten neu an.'
  );
