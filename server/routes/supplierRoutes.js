const express = require("express");
const router = express.Router();

const {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

// GET all suppliers
router.get("/", getAllSuppliers);

// POST new supplier
router.post("/", addSupplier);

// PUT update supplier
router.put("/:id", updateSupplier);

// DELETE supplier
router.delete("/:id", deleteSupplier);

module.exports = router;