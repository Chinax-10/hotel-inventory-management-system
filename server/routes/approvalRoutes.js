const express = require("express");
const router = express.Router();

const {
  getPendingApprovals,
  approvePurchase,
  rejectPurchase,
  approveStockIssue,
  rejectStockIssue,
} = require("../controllers/approvalController");

const {
  authenticateToken,
  requireManager,
} = require("../middleware/authMiddleware");


// VIEW PENDING APPROVALS
// Manager and Admin only
router.get(
  "/",
  authenticateToken,
  requireManager,
  getPendingApprovals
);


// APPROVE PURCHASE
// Manager and Admin only
router.put(
  "/purchases/:id/approve",
  authenticateToken,
  requireManager,
  approvePurchase
);


// REJECT PURCHASE
// Manager and Admin only
router.put(
  "/purchases/:id/reject",
  authenticateToken,
  requireManager,
  rejectPurchase
);


// APPROVE STOCK ISSUE
// Manager and Admin only
router.put(
  "/stock-issues/:id/approve",
  authenticateToken,
  requireManager,
  approveStockIssue
);


// REJECT STOCK ISSUE
// Manager and Admin only
router.put(
  "/stock-issues/:id/reject",
  authenticateToken,
  requireManager,
  rejectStockIssue
);


module.exports = router;