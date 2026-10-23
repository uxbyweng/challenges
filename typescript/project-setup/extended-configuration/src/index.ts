import users from "./users.json" with { type: "json" };
import type { APIResponse } from "./types.js";

const response: APIResponse = {
    page: 1,
    result: { id: users[0].id, text: users[0].name },
    maxCount: users.length,
};

console.log(users[0].age);
console.log(response);
