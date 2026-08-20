const express = require("express");
const router = express.Router();

const {
  login,
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/authController");

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

// Public login
router.post("/login", login);

// Admin user management
router.get("/users", authenticateToken, requireAdmin, getUsers);
router.post("/users", authenticateToken, requireAdmin, createUser);
router.delete("/users/:id", authenticateToken, requireAdmin, deleteUser);

module.exports = router;