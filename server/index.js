const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const inventoryRoutes = require("./routes/inventoryRoutes");
// console.log(inventoryRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/inventory", inventoryRoutes);
// Test database connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Hotel Inventory Management API is running...",
      database: "Connected",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database connection failed",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});