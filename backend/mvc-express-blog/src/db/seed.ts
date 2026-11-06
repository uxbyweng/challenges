import { db, closeDB } from "./database";

const sql = await Bun.file(import.meta.dir + "/seeddb.sql").text();

db.exec(sql);

console.log("Seed fertig:", db.query("SELECT COUNT(*) AS anzahl FROM blog_entries").get());
closeDB();
