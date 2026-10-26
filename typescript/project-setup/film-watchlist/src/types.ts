// /src/types.ts

export interface Watchable {
    readonly id: number;
    title: string;
    year: number;
}

// alias type für Rating, da an mehrern Stellen verwendet
type Rating = 1 | 2 | 3 | 4 | 5;

export interface Film extends Watchable {
    watched: boolean;
    rating?: Rating;
}

export interface Playlist {
    name: string;
    films: Film[];
}

// function starRating(rating: Rating) {
//     let stars: string = "";
//     if (rating === 1) {
//         stars = "⭐";
//     }
//     if (rating === 2) {
//         stars = "⭐⭐";
//     }
//     if (rating === 3) {
//         stars = "⭐⭐⭐";
//     }
//     if (rating === 4) {
//         stars = "⭐⭐⭐⭐";
//     }
//     if (rating === 5) {
//         stars = "⭐⭐⭐⭐⭐";
//     }
//     return stars;
// }

function starRating(rating: Rating): string {
    return "⭐".repeat(rating);
}

export function formatFilm(film: Film): string {
    if (film.rating !== undefined) {
        let stars = starRating(film.rating);
        return `${film.title} (${film.year}), ${stars}`;
    } else {
        return `${film.title} (${film.year}), unrated.`;
    }
}

export function getUnwatched(playlist: Playlist): Film[] {
    // leeres Array für Ergebnise
    const unwatchedFilms: Film[] = [];

    // mit for of alle filme aus playlist.films durchgehen
    for (const film of playlist.films) {
        // nur unwatched filme heraudsfiltern
        if (!film.watched) {
            unwatchedFilms.push(film);
        }
    }
    return unwatchedFilms;
}

// Item = Typ des Objekts (z. B. Film), Key = einer seiner Schlüssel (z. B. "title")
export function getProperty<Item, Key extends keyof Item>(item: Item, key: Key): Item[Key] {
    return item[key];
}

// Nimmt eine Liste von Objekten und gibt von jedem nur eine Eigenschaft zurück
export function pluck<Item, Key extends keyof Item>(items: Item[], key: Key): Item[Key][] {
    return items.map((item) => item[key]);
}

// Ein generic ist ein Platzhalter für einen Typ, der erst beim Aufruf feststeht. Hier bedeutet er:
// ┌────────────────────────┬──────────────────────────────────────────────┬────────────────────────┐
// │          Teil          │                  Bedeutung                   │   Beispiel mit Film    │
// ├────────────────────────┼──────────────────────────────────────────────┼────────────────────────┤
// │ Item                   │ der Typ des Objekts                          │ Film                   │
// ├────────────────────────┼──────────────────────────────────────────────┼────────────────────────┤
// │ Key extends keyof Item │ Key darf nur ein Schlüsselname von Item sein │ "title" | "year" | ... │
// ├────────────────────────┼──────────────────────────────────────────────┼────────────────────────┤
// │ Item[Key]              │ der Typ des Werts unter diesem Schlüssel     │ bei "year": number     │
// └────────────────────────┴──────────────────────────────────────────────┴────────────────────────┘
