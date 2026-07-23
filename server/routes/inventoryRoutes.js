const express = require("express");
const router = express.Router();

const {
  getAllInventory,
  addInventory,
} = require("../controllers/inventoryController");

router.get("/", getAllInventory);
router.post("/", addInventory);

module.exports = router;