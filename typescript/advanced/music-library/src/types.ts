// src/types.ts

export interface Media {
    id: number;
    title: string;
}

export interface Track extends Media {
    artist: string;
    liked: boolean;
}

export interface FeaturedTrack extends Track {
    curatedBy: string;
    readonly addedDate: string;
}

// Part 1: The keyof operator
// Your library shows a label for each release format. Add a type for the labels to src/types.ts and derive the format names from it with keyof:

export interface FormatLabels {
    vinyl: string;
    cd: string;
    digital: string;
}

export type Format = keyof FormatLabels;

// Part 2: Generics
// Add a generic response wrapper to src/types.ts:
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Part 3: Utility types
// The server stores more data per track than Track describes. Add LibraryTrack and three types derived from it to
// src/types.ts
export interface LibraryTrack extends Track {
    addedAt: Date;
    playCount: number;
}

export type TrackCreatePayload = Omit<LibraryTrack, "id" | "addedAt" | "playCount">;
export type TrackUpdatePayload = Partial<TrackCreatePayload>;
export type TrackPreview = Pick<LibraryTrack, "id" | "title" | "artist">;
