const pool = require("../config/db");

// GET all purchases
const getAllPurchases = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        purchases.*,
        inventory.item_name,
        suppliers.company_name
      FROM purchases
      JOIN inventory
        ON purchases.inventory_id = inventory.id
      JOIN suppliers
        ON purchases.supplier_id = suppliers.id
      ORDER BY purchases.id ASC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching purchases",
      error: error.message,
    });
  }
};

// ADD purchase
const addPurchase = async (req, res) => {
  try {
    const {
      inventory_id,
      supplier_id,
      quantity,
      purchase_price,
      purchase_date,
    } = req.body;

    if (
      !inventory_id ||
      !supplier_id ||
      !quantity ||
      !purchase_price ||
      !purchase_date
    ) {
      return res.status(400).json({
        message: "All purchase fields are required.",
      });
    }

    const total_amount =
      Number(quantity) * Number(purchase_price);

    const result = await pool.query(
      `INSERT INTO purchase_requests
      (
        item_id,
        quantity,
        requested_by,
        supplier_id,
        purchase_price,
        purchase_date,
        total_amount,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,'pending')
      RETURNING *`,
      [
        inventory_id,
        quantity,
        req.user.id,
        supplier_id,
        purchase_price,
        purchase_date,
        total_amount,
      ]
    );

    res.status(201).json({
      message: "Purchase request submitted for approval.",
      request: result.rows[0],
    });

  } catch (error) {
    console.error("Purchase request error:", error);

    res.status(500).json({
      message: "Error submitting purchase request.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPurchases,
  addPurchase,
};