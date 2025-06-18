// routes/medRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addMedication,
  getMedications,
  markAsTaken,
  deleteMedication,
} = require("../controllers/medController");

router.use(verifyToken); // protect all routes

router.post("/", addMedication);
router.get("/", getMedications);
router.put("/:id", markAsTaken);
router.delete("/:id", deleteMedication);

module.exports = router;
