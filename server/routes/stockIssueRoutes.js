const express = require("express");
const router = express.Router();

const {
  getAllStockIssues,
  addStockIssue,
} = require("../controllers/stockIssueController");

// GET all stock issues
router.get("/", getAllStockIssues);

// ADD stock issue
router.post("/", addStockIssue);

module.exports = router;