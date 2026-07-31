const pool = require("../config/db");

// GET all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM suppliers ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching suppliers",
      error: error.message,
    });
  }
};

// ADD supplier
const addSupplier = async (req, res) => {
  try {
    const {
      company_name,
      contact_person,
      phone,
      email,
      address,
      notes,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers
      (company_name, contact_person, phone, email, address, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        company_name,
        contact_person,
        phone,
        email,
        address,
        notes,
      ]
    );

    res.status(201).json({
      message: "Supplier added successfully",
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding supplier",
      error: error.message,
    });
  }
};

// UPDATE supplier
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      contact_person,
      phone,
      email,
      address,
      notes,
    } = req.body;

    const result = await pool.query(
      `UPDATE suppliers
       SET
         company_name = $1,
         contact_person = $2,
         phone = $3,
         email = $4,
         address = $5,
         notes = $6
       WHERE id = $7
       RETURNING *`,
      [
        company_name,
        contact_person,
        phone,
        email,
        address,
        notes,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating supplier",
      error: error.message,
    });
  }
};

// DELETE supplier
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM suppliers
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      message: "Supplier deleted successfully",
      supplier: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting supplier",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};