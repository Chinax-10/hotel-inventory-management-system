const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// GET all categories
router.get("/", getAllCategories);

// ADD category
router.post("/", addCategory);

// UPDATE category
router.put("/:id", updateCategory);

// DELETE category
router.delete("/:id", deleteCategory);

module.exports = router;