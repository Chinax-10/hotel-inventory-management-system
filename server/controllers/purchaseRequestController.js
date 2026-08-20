const pool = require("../config/db");

// CREATE PURCHASE REQUEST
const createPurchaseRequest = async (req, res) => {
  try {
    const {
      item_id,
      supplier_id,
      quantity,
      purchase_price,
      purchase_date,
      notes,
    } = req.body;

    if (
      !item_id ||
      !supplier_id ||
      !quantity ||
      !purchase_price ||
      !purchase_date
    ) {
      return res.status(400).json({
        message: "Please complete all required fields.",
      });
    }

    const total_amount =
      Number(quantity) * Number(purchase_price);

    // Make sure inventory item exists
    const inventory = await pool.query(
      "SELECT id, item_name FROM inventory WHERE id = $1",
      [item_id]
    );

    if (inventory.rows.length === 0) {
      return res.status(404).json({
        message: "Inventory item not found.",
      });
    }

    // Make sure supplier exists
    const supplier = await pool.query(
      "SELECT id, company_name FROM suppliers WHERE id = $1",
      [supplier_id]
    );

    if (supplier.rows.length === 0) {
      return res.status(404).json({
        message: "Supplier not found.",
      });
    }

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
        status,
        notes
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,'pending',$8)
      RETURNING *`,
      [
        item_id,
        quantity,
        req.user.id,
        supplier_id,
        purchase_price,
        purchase_date,
        total_amount,
        notes || null,
      ]
    );

    res.status(201).json({
      message: "Purchase request submitted successfully.",
      request: result.rows[0],
    });

  } catch (error) {
    console.error("Create purchase request error:", error);

    res.status(500).json({
      message: "Unable to submit purchase request.",
      error: error.message,
    });
  }
};


// GET MY PURCHASE REQUESTS
const getMyPurchaseRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        pr.*,
        i.item_name,
        s.company_name
       FROM purchase_requests pr
       LEFT JOIN inventory i
         ON pr.item_id = i.id
       LEFT JOIN suppliers s
         ON pr.supplier_id = s.id
       WHERE pr.requested_by = $1
       ORDER BY pr.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Get purchase requests error:", error);

    res.status(500).json({
      message: "Unable to load purchase requests.",
      error: error.message,
    });
  }
};


module.exports = {
  createPurchaseRequest,
  getMyPurchaseRequests,
};