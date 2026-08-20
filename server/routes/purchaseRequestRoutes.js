const express = require("express");
const router = express.Router();

const {
  createPurchaseRequest,
  getMyPurchaseRequests,
} = require("../controllers/purchaseRequestController");

const {
  authenticateToken,
} = require("../middleware/authMiddleware");

// Submit purchase request
router.post(
  "/",
  authenticateToken,
  createPurchaseRequest
);

// View my purchase requests
router.get(
  "/my",
  authenticateToken,
  getMyPurchaseRequests
);

module.exports = router;