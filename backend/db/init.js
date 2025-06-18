// db/init.js
const db = require("./db");

db.serialize(() => {
  // Users table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('patient', 'caretaker')) NOT NULL
    )
  `,
    (err) => {
      if (err) console.error("❌ Users table error:", err);
      else console.log("✅ Users table created");
    }
  );

  // Medications table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      frequency TEXT NOT NULL,
      taken INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `,
    (err) => {
      if (err) console.error("❌ Medications table error:", err);
      else console.log("✅ Medications table created");
    }
  );
});
