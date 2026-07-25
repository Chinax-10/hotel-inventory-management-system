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

// UPDATE inventory
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      item_name,
      category,
      quantity,
      unit,
      purchase_price,
      selling_price,
      supplier,
      reorder_level,
    } = req.body;

    const result = await pool.query(
      `UPDATE inventory
       SET
         item_name = $1,
         category = $2,
         quantity = $3,
         unit = $4,
         purchase_price = $5,
         selling_price = $6,
         supplier = $7,
         reorder_level = $8
       WHERE id = $9
       RETURNING *`,
      [
        item_name,
        category,
        quantity,
        unit,
        purchase_price,
        selling_price,
        supplier,
        reorder_level,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      item: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating inventory",
      error: error.message,
    });
  }
};

// DELETE inventory
const deleteInventory = async (req, res) => {
    try {
      
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM inventory
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Inventory item not found",
            });
        }

        res.status(200).json({
            message: "Inventory deleted successfully",
            item: result.rows[0],
        });

    } catch (error) {
        console.error("DELETE ERROR:", error);

        res.status(500).json({
            message: "Error deleting inventory",
            error: error.message,
        });
    }
};

module.exports = {
    getAllInventory,
    addInventory,
    updateInventory,
    deleteInventory,
};