const pool = require("../config/db");

// GET all stock issues
const getAllStockIssues = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        stock_issues.*,
        inventory.item_name
      FROM stock_issues
      JOIN inventory
        ON stock_issues.inventory_id = inventory.id
      ORDER BY stock_issues.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching stock issues",
      error: error.message,
    });
  }
};

// ADD stock issue
const addStockIssue = async (req, res) => {
  try {
    const {
      inventory_id,
      department,
      issued_to,
      quantity,
      issue_date,
      remarks,
    } = req.body;

    // Check available stock
    const stock = await pool.query(
      "SELECT quantity FROM inventory WHERE id = $1",
      [inventory_id]
    );

    if (stock.rows.length === 0) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    const available = Number(stock.rows[0].quantity);

    if (quantity > available) {
      return res.status(400).json({
        message: "Insufficient stock available",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO stock_issues
      (
        inventory_id,
        department,
        issued_to,
        quantity,
        issue_date,
        remarks
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        inventory_id,
        department,
        issued_to,
        quantity,
        issue_date,
        remarks,
      ]
    );

    // Reduce inventory quantity
    await pool.query(
      `
      UPDATE inventory
      SET quantity = quantity - $1
      WHERE id = $2
      `,
      [quantity, inventory_id]
    );

    res.status(201).json({
      message: "Stock issued successfully",
      issue: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error issuing stock",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStockIssues,
  addStockIssue,
};