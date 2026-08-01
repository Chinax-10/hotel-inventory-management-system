const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./config/db");
const inventoryRoutes = require("./routes/inventoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// console.log(inventoryRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

app.use("/inventory", inventoryRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/categories", categoryRoutes);
console.log("Inventory route registered");
console.log("Supplier route registered");
console.log("Category route registered");
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
  console.log("***** MY SERVER STARTED *****");
  console.log(`Server is running on port ${PORT}`);
});