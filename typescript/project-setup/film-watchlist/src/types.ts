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

function starRating(rating: Rating) {
    let stars: string = "";
    if (rating === 1) {
        stars = "⭐";
    }
    if (rating === 2) {
        stars = "⭐⭐";
    }
    if (rating === 3) {
        stars = "⭐⭐⭐";
    }
    if (rating === 4) {
        stars = "⭐⭐⭐⭐";
    }
    if (rating === 5) {
        stars = "⭐⭐⭐⭐⭐";
    }
    return stars;
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
        // nur watched filme heraudsfiltern
        if (!film.watched) {
            unwatchedFilms.push(film);
        }
    }
    return unwatchedFilms;
}
