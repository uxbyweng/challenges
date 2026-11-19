// import { Module } from "@nestjs/common";
// import { Database } from "../database/database.js";
// import { MockDatabase } from "../database/mock.database.js";
// import { PostgresDatabase } from "../database/postgres.database.js";
// import { UsersController } from "./users.controller.js";
// import { UsersService } from "./users.service.js";

// // Feature module (vertical slice): everything for "users" in one place.
// //
// // DI swap: bind the abstract Database to ONE concrete class.
// // Change only this line — UsersService / UsersController stay untouched.
// //
// //   { provide: Database, useClass: MockDatabase }      ← demo / tests
// //   { provide: Database, useClass: PostgresDatabase }  ← "real" DB

// @Module({
//     controllers: [UsersController],
//     providers: [
//         UsersService,
//         { provide: Database, useClass: MockDatabase },
//         // { provide: Database, useClass: PostgresDatabase },
//     ],
// })
// export class UsersModule {}
