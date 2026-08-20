const pool = require("../config/db");

console.log("🔥 NEW STOCK ISSUE CONTROLLER LOADED");

// GET ALL STOCK ISSUE REQUESTS
const getAllStockIssues = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sr.id,
        sr.item_id AS inventory_id,
        i.item_name,
        sr.quantity,
        sr.status,
        sr.reason AS remarks,
        sr.created_at AS issue_date,
        u.username AS requested_by
      FROM stock_issue_requests sr
      LEFT JOIN inventory i
        ON sr.item_id = i.id
      LEFT JOIN users u
        ON sr.requested_by = u.id
      ORDER BY sr.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error("Get stock issue requests error:", error);

    res.status(500).json({
      message: "Error fetching stock issue requests",
      error: error.message,
    });
  }
};


// CREATE STOCK ISSUE REQUEST
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

    // Validate required fields
    if (
      !inventory_id ||
      !quantity ||
      !department ||
      !issued_to ||
      !issue_date
    ) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    const requestedQuantity = Number(quantity);

    if (requestedQuantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero.",
      });
    }

    // Check inventory item
    const stock = await pool.query(
      `SELECT id, item_name, quantity
       FROM inventory
       WHERE id = $1`,
      [inventory_id]
    );

    if (stock.rows.length === 0) {
      return res.status(404).json({
        message: "Inventory item not found.",
      });
    }

    const availableStock = Number(stock.rows[0].quantity);

    // Don't allow request above available stock
    if (requestedQuantity > availableStock) {
      return res.status(400).json({
        message: `Insufficient stock. Available quantity: ${availableStock}.`,
      });
    }

    // CREATE PENDING REQUEST
    // IMPORTANT: inventory is NOT reduced here.
    const result = await pool.query(
      `
      INSERT INTO stock_issue_requests
      (
        item_id,
        quantity,
        requested_by,
        status,
        reason
      )
      VALUES ($1, $2, $3, 'pending', $4)
      RETURNING *
      `,
      [
        inventory_id,
        requestedQuantity,
        req.user.id,
        `Department: ${department} | Issued to: ${issued_to} | Date: ${issue_date}${remarks ? ` | Remarks: ${remarks}` : ""}`,
      ]
    );

    res.status(201).json({
      message: "Stock issue request submitted for approval.",
      request: result.rows[0],
      available_stock: availableStock,
    });

  } catch (error) {
    console.error("Add stock issue request error:", error);

    res.status(500).json({
      message: "Error submitting stock issue request.",
      error: error.message,
    });
  }
};


module.exports = {
  getAllStockIssues,
  addStockIssue,
};