const express = require("express");
const router = express.Router();

const {
  getAllPurchases,
  addPurchase,
} = require("../controllers/purchaseController");

const {
  authenticateToken,
} = require("../middleware/authMiddleware");

// VIEW PURCHASES
// Staff, Manager and Admin
router.get("/", authenticateToken, getAllPurchases);

// CREATE PURCHASE
// Staff, Manager and Admin
router.post("/", authenticateToken, addPurchase);

module.exports = router;