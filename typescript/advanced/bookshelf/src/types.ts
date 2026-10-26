// src/types.ts

// A type alias EntityId that accepts either a number or a string
export type EntityId = number | string;

// A type Timestamped with createdAt: Date and updatedAt: Date
export type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

// A type HasId with id: EntityId
export type HasId = {
    id: EntityId;
};

// A Book type that combines HasId, Timestamped, and book-specific fields (title, author, isbn, isAvailable) using intersection types
export type Book = HasId &
    Timestamped & {
        title: string;
        author: string;
        isbn13: string;
        isAvailable: boolean;
    };

// A tuple type IsbnParts representing the three components of an ISBN: group (number), publisher (string), and title identifier (string)
export type IsbnParts = [number, string, string];

// A generic ApiResponse<T> interface with status: number, message: string, and data: T
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}
