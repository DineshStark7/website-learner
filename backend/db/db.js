// db/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "medicare.db"), (err) => {
  if (err) console.error("DB Error:", err);
  else console.log("✅ SQLite DB connected");
});

module.exports = db;
