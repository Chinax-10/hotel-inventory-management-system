const pool = require("../config/db");

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// ADD category
const addCategory = async (req, res) => {
  try {

    const {
      category_name,
      description,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO categories
      (category_name, description)
      VALUES ($1, $2)
      RETURNING *`,
      [
        category_name,
        description,
      ]
    );

    res.status(201).json({
      message: "Category added successfully",
      category: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding category",
      error: error.message,
    });
  }
};

// UPDATE category
const updateCategory = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      category_name,
      description,
    } = req.body;

    const result = await pool.query(
      `UPDATE categories
       SET
         category_name = $1,
         description = $2
       WHERE id = $3
       RETURNING *`,
      [
        category_name,
        description,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating category",
      error: error.message,
    });
  }
};

// DELETE category
const deleteCategory = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM categories
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};