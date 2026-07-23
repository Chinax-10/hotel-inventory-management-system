const pool = require("../config/db");

// GET all inventory
const getAllInventory = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory ORDER BY id ASC"
    );

    res.status(200).json(result.rows);
 } catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Error adding inventory",
    error: error.message,
  });
}
};

// ADD inventory
const addInventory = async (req, res) => {
  try {
    const {
      item_name,
      category,
      quantity,
      unit,
      purchase_price,
      selling_price,
      supplier_name,
      reorder_level,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO inventory
      (item_name, category, quantity, unit, purchase_price, selling_price, supplier, reorder_level)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        item_name,
        category,
        quantity,
        unit,
        purchase_price,
        selling_price,
        supplier_name,
        reorder_level,
      ]
    );

    res.status(201).json({
      message: "Inventory added successfully",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding inventory",
      error: error.message,
    });
  }
};

module.exports = {
  getAllInventory,
  addInventory,
};