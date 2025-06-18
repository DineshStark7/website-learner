// index.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const medRoutes = require("./routes/medRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/medications", medRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
