# Stundenplan und Lernstand

Der Plan kann sich ändern. Stand: Woche 1, Donnerstag 22.10.2026 (TypeScript Basics).

Legende: `[x]` erledigt, `[ ]` offen, `[~]` läuft gerade. Unter "Notizen" steht, was gut lief und was noch wackelt.

## Woche 1
- [x] Mo 19.10. Welcome / Learning Components
- [x] Di 20.10. Careers Intro / Intro to AI / Bootcamp Manifesto
- [x] Mi 21.10. Computer Setup / Coding Assessments
- [~] Do 22.10. TypeScript Basics
- [ ] Fr 23.10. TypeScript Project Setup

## Woche 2
- [ ] Mo 26.10. TypeScript Advanced
- [ ] Di 27.10. TypeScript Client Side
- [ ] Mi 28.10. Career / Guided-Learning
- [ ] Do 29.10. Recap Project 1
- [ ] Fr 30.10. Backend Express Basics

## Woche 3
- [ ] Mo 02.11. Backend Template Engines
- [ ] Di 03.11. Backend Express Advanced
- [ ] Mi 04.11. Career / Guided-Learning
- [ ] Do 05.11. Backend Express MVC
- [ ] Fr 06.11. Backend SQL Basics

## Woche 4
- [ ] Mo 09.11. Backend SQL Advanced
- [ ] Di 10.11. Recap Project 2
- [ ] Mi 11.11. Career / Guided-Learning
- [ ] Do 12.11. Recap Project 2
- [ ] Fr 13.11. Software Design Paradigms

## Woche 5
- [ ] Mo 16.11. Software Design CS Fundamentals
- [ ] Di 17.11. Software Design Principles
- [ ] Mi 18.11. Career / Guided-Learning
- [ ] Do 19.11. NestJS Basics 1
- [ ] Fr 20.11. NestJS Basics 2

## Woche 6
- [ ] Mo 23.11. NestJS TypeORM
- [ ] Di 24.11. NestJS Restful
- [ ] Mi 25.11. Career / Guided-Learning
- [ ] Do 26.11. NestJS Authentication
- [ ] Fr 27.11. NestJS Authentication

## Woche 7
- [ ] Mo 30.11. NestJS Swagger OpenAPI
- [ ] Di 01.12. Recap Project 3
- [ ] Mi 02.12. Career / Guided-Learning
- [ ] Do 03.12. Recap Project 3
- [ ] Fr 04.12. Recap Project 3

## Woche 8
- [ ] Mo 07.12. DevOps Testing
- [ ] Di 08.12. DevOps Docker Basics
- [ ] Mi 09.12. Career / Guided-Learning
- [ ] Do 10.12. DevOps Docker Advanced
- [ ] Fr 11.12. DevOps CI/CD

## Woche 9
- [ ] Mo 14.12. NextJS App Router
- [ ] Di 15.12. NextJS Server vs Client
- [ ] Mi 16.12. Career / Guided-Learning
- [ ] Do 17.12. NextJS Tailwind and Shadcn UI
- [ ] Fr 18.12. NextJS Ecosystem

## Woche 10 (nach der Weihnachtspause)
- [ ] Mo 04.01.2027 Recap Project 4
- [ ] Di 05.01. Recap Project 4
- [ ] Mi 06.01. Career / Guided-Learning
- [ ] Do 07.01. Real Time Communication: Polling and SSE
- [ ] Fr 08.01. Real Time Communication: WebSockets

## Woche 11
- [ ] Mo 11.01. Recap Project 5
- [ ] Di 12.01. Recap Project 5
- [ ] Mi 13.01. Career / Guided-Learning
- [ ] Do 14.01. AI: OpenAI API
- [ ] Fr 15.01. AI: OpenAI SDK

## Woche 12
- [ ] Mo 18.01. AI Workshop
- [ ] Di 19.01. AI Workshop
- [ ] Mi 20.01. Career / Guided-Learning
- [ ] Do 21.01. AI Workshop
- [ ] Fr 22.01. AI Workshop

## Woche 13
- [ ] Mo 25.01. Capstone Prep
- [ ] Di 26.01. Capstone Sprint Daily
- [ ] Mi 27.01. Capstone Sprint Daily
- [ ] Do 28.01. Capstone Sprint Daily
- [ ] Fr 29.01. Capstone Sprint Review 1

## Woche 14
- [ ] Mo 01.02. bis Do 04.02. Capstone Sprint Daily
- [ ] Fr 05.02. Capstone Sprint Review 2

## Woche 15
- [ ] Mo 08.02. bis Do 11.02. Capstone Sprint Daily
- [ ] Fr 12.02. Capstone Sprint Review 3

## Woche 16
- [ ] Mo 15.02. bis Do 18.02. Capstone Sprint Daily
- [ ] Fr 19.02. Graduation

## Notizen zum Lernstand
Hier trägst du nach jedem Thema ein, was sitzt und was noch wackelt.

- **TypeScript Basics (22.10.):**
  - Erledigt: `music-library` (Typ-Aliase, interface, union, Schnittmengen, Tupel), `rezeptbuch` (`Recipe`/`Ingredient`, `map` und `join`).
  - In Arbeit: `concert-tickets` (`src/tickets.ts`). Fertig: alle Typen (`TicketTier`, `Seat`, `Ticket`, `VipTicket`), `ticketPrice`, `describeSeat`, `parseQuantity` und die drei Tickets. Offen: Preise aller Tickets ausgeben und die Sitzbeschreibung für jedes Ticket mit Sitz ausgeben (Aufgabe 08), dann `npx tsc` und `node dist/tickets.js` zum Abschluss.
  - Sitzt: Literal-Union, Schnittmengentyp (`&`), optionales Feld (`?`), `unknown` mit `typeof`, Tupel als Typ und Zugriff per Index.
  - Wackelt noch: `map`/`join` mit Objekten (brauchte die Lösung), Destrukturierung von Tupeln (`const [a, b] = ...`), Typ und Wert nicht verwechseln (z. B. `recipe.pancakes` statt `pancakes`).
  - Beim Üben aufgefallen: Tupel und Objekttyp verwechselt (nach einem Hinweis korrigiert). Bei Daten auf inhaltliche Fehler achten (z. B. `vegetarian: true` bei Hackfleisch, `amountGrams: 4` bei Eiern).
