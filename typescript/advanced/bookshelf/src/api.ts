// src/api.ts

// A generic ApiResponse<T> interface with status: number, message: string, and data: T
import type { ApiResponse } from "./types.js";

export function ok<T>(data: T): ApiResponse<T> {
    return { status: 200, message: "OK", data };
}
