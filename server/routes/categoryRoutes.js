const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  authenticateToken,
  requireAdmin,
  requireManager,
} = require("../middleware/authMiddleware");

// VIEW CATEGORIES
// Staff, Manager and Admin
router.get("/", authenticateToken, getAllCategories);

// ADD CATEGORY
// Manager and Admin
router.post("/", authenticateToken, requireManager, addCategory);

// UPDATE CATEGORY
// Manager and Admin
router.put("/:id", authenticateToken, requireManager, updateCategory);

// DELETE CATEGORY
// Admin ONLY
router.delete("/:id", authenticateToken, requireAdmin, deleteCategory);

module.exports = router;