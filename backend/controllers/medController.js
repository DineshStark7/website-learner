// controllers/medController.js
const db = require("../db/db");

// Add medication
exports.addMedication = (req, res) => {
  const { name, dosage, frequency } = req.body;
  const userId = req.user.id;

  if (!name || !dosage || !frequency) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)`;
  db.run(sql, [userId, name, dosage, frequency], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });

    return res
      .status(201)
      .json({ id: this.lastID, name, dosage, frequency, taken: 0 });
  });
};

// Get all meds for user
exports.getMedications = (req, res) => {
  const userId = req.user.id;
  db.all(
    `SELECT * FROM medications WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch medications" });

      res.status(200).json(rows);
    }
  );
};

// Mark as taken
exports.markAsTaken = (req, res) => {
  const medId = req.params.id;
  db.run(
    `UPDATE medications SET taken = 1 WHERE id = ?`,
    [medId],
    function (err) {
      if (err) return res.status(500).json({ error: "Failed to update" });

      res.status(200).json({ message: "Medication marked as taken" });
    }
  );
};

// Delete medication
exports.deleteMedication = (req, res) => {
  const medId = req.params.id;
  db.run(`DELETE FROM medications WHERE id = ?`, [medId], function (err) {
    if (err) return res.status(500).json({ error: "Failed to delete" });

    res.status(200).json({ message: "Medication deleted" });
  });
};
