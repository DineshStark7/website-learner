// controllers/authController.js
const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_super_secret_key"; // change to env later

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, hashedPassword, role], function (err) {
    if (err)
      return res.status(500).json({ error: "User already exists or DB error" });

    return res.status(201).json({ id: this.lastID, name, email, role });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "2h",
    });

    return res
      .status(200)
      .json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
};
