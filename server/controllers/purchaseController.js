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

    const total_amount = quantity * purchase_price;

    const result = await pool.query(
      `INSERT INTO purchases
      (
        inventory_id,
        supplier_id,
        quantity,
        purchase_price,
        total_amount,
        purchase_date
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        inventory_id,
        supplier_id,
        quantity,
        purchase_price,
        total_amount,
        purchase_date,
      ]
    );

    // Automatically increase stock
    await pool.query(
      `UPDATE inventory
       SET quantity = quantity + $1
       WHERE id = $2`,
      [quantity, inventory_id]
    );

    res.status(201).json({
      message: "Purchase added successfully",
      purchase: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error adding purchase",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPurchases,
  addPurchase,
};