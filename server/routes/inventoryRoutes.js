const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const {
  authenticateToken,
  requireAdmin,
  requireManager,
} = require("../middleware/authMiddleware");

// VIEW INVENTORY
// Staff, Manager and Admin
router.get("/", authenticateToken, getAllInventory);

// ADD INVENTORY
// Staff, Manager and Admin
router.post("/", authenticateToken, addInventory);

// EDIT INVENTORY
// Manager and Admin
router.put("/:id", authenticateToken, requireManager, updateInventory);

// DELETE INVENTORY
// Admin ONLY
router.delete("/:id", authenticateToken, requireAdmin, deleteInventory);

module.exports = router;