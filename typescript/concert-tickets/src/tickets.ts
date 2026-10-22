// Concert Tickets
// Erstellen einen neuen Ordner und installiere TypeScript
// Erstelle anschließend eine einzelne TypeScript-Datei mit dem Namen 'tickets.ts'. Baue dort ein Ticketsystem eines kleinen Konzertbesuchs

// 01 füge ein literal union type 'TicketTier' with the values "standing", "seated", and "vip"
type TicketTier = "standing" | "seated" | "vip";

// 02 erstelle 'Seat' als Tupeltype, der einen Reihenbuchstaben (Zeichenkette) und eine Sitzplatznummer (Zahl) enthält.
type Seat = [string, number]; // Sitz ["A", 1], ["A", 2], ["A", 3]

// 03 create A 'Ticket'  interface with a readonly id, a tier, and an optional seat
interface Ticket {
    readonly id: number;
    tier: TicketTier;
    seat?: Seat;
}

// 04 create VipTicket type that combines Ticket with { loungeAccess: boolean } using an intersection
type LoungeAccess = {
    loungeAccess: boolean;
};
type VipTicket = Ticket & LoungeAccess;

// 05 Erstelle eine Funktion 'function ticketPrice(tier: TicketTier): number', die  für jede Ticket-Stufe einen unterschiedlichen Preis zurückgibt.
function ticketPrice(tier: TicketTier): number {
    let price: number = 0;
    if (tier === "standing") {
        price = 19.9;
    }
    if (tier === "seated") {
        price = 49.9;
    }
    if (tier === "vip") {
        price = 99.9;
    }
    return price;
}
console.log(ticketPrice("standing"));

// 06 erstelle einen Funktion 'describeSeat(seat: Seat): string' Die einen Text wie "Row C, seat 12" zurückgibt.
function describeSeat(seat: Seat): string {
    // console.log("Row", seat[0], ", seat", seat[1]);
    let newSeat: string = "Row ";
    newSeat += seat[0].toString();
    newSeat += ", seat ";
    newSeat += seat[1].toString();
    return newSeat;
}
console.log(describeSeat(["C", 12]));

// 07 erstelle eine Funktion 'parseQuantity(input: unknown): number' die dein Eingabewert zurückgibt, wenn es sich um eine Zahl (number) handelt und sonst eine '0'
function parseQuantity(input: unknown): number {
    if (typeof input === "number") {
        return input;
    } else {
        return 0;
    }
}
console.log(parseQuantity("a"));

// 08 erstelle mindestens ein Ticket jeder Kategorie, erfasse die Preise und die Sitzplatzbeschreibung für jedes Ticket mit Sitzplatzangabe.
const basicTicket: Ticket = {
    id: 1,
    tier: "standing",
    seat: ["A", 5],
};
const standardTicket: Ticket = {
    id: 2,
    tier: "seated",
    seat: ["B", 11],
};
const vipTicket: VipTicket = {
    id: 3,
    tier: "vip",
    seat: ["C", 13],
    loungeAccess: true,
};

// 08 Rufe die Funktion 'parseQuantity' mit einer Nummer, einer Zeichenkette und einem JSON.parse("3") Komma auf und protokolliere die Ergebnisse.
console.log("parseQuantity Aufruf mit 'C'");
console.log(parseQuantity("C")); // -> 0
console.log("parseQuantity Aufruf mit '17'");
console.log(parseQuantity(17)); // -> 17
console.log("parseQuantity Aufruf mit 'JSON.parse(\"3\")'");
console.log(parseQuantity(JSON.parse("3"))); // -> 3
