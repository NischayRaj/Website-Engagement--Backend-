const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors middleware
const metricsRouter = require("./routes/metricsRouter");
require("dotenv").config({ path: "src/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

  app.get("/", (req, res) => {
    res.send("Backend server is running!");
  });

// Middleware
app.use(express.json());
app.use(cors()); // Use cors middleware

// Routes
app.use("/api/metrics", metricsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
