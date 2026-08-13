const express = require("express");
const router = express.Router();

const {
  getAllPurchases,
  addPurchase,
} = require("../controllers/purchaseController");

// GET all purchases
router.get("/", getAllPurchases);

// ADD purchase
router.post("/", addPurchase);

module.exports = router;