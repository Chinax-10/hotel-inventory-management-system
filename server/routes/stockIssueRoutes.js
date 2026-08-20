const express = require("express");
const router = express.Router();

const {
  getAllStockIssues,
  addStockIssue,
} = require("../controllers/stockIssueController");

const {
  authenticateToken,
} = require("../middleware/authMiddleware");

// VIEW STOCK ISSUES
// Staff, Manager and Admin
router.get("/", authenticateToken, getAllStockIssues);

// CREATE STOCK ISSUE
// Staff, Manager and Admin
router.post("/", authenticateToken, addStockIssue);

module.exports = router;