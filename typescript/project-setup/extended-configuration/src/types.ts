// /src/types.ts
export type APIResponse = {
    page: number;
    result: {
        id: number;
        text: string;
    };
    maxCount: number;
};
