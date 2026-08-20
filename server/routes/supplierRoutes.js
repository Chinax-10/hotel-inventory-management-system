const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const {
  authenticateToken,
  requireAdmin,
  requireManager,
} = require("../middleware/authMiddleware");

// VIEW SUPPLIERS
// Staff, Manager and Admin
router.get("/", authenticateToken, getAllSuppliers);

// ADD SUPPLIER
// Manager and Admin
router.post("/", authenticateToken, requireManager, addSupplier);

// UPDATE SUPPLIER
// Manager and Admin
router.put("/:id", authenticateToken, requireManager, updateSupplier);

// DELETE SUPPLIER
// Admin ONLY
router.delete("/:id", authenticateToken, requireAdmin, deleteSupplier);

module.exports = router;