const pool = require("../config/db");

// GET ALL PENDING APPROVALS
const getPendingApprovals = async (req, res) => {
  try {
    const purchases = await pool.query(`
  SELECT 
    pr.id,
    pr.item_id,
    i.item_name,
    pr.quantity,
    pr.supplier_id,
    s.company_name,
    pr.purchase_price,
    pr.total_amount,
    pr.purchase_date,
    pr.status,
    pr.notes,
    pr.created_at,
    u.username AS requested_by,
    'purchase' AS request_type
  FROM purchase_requests pr
  LEFT JOIN inventory i
    ON pr.item_id = i.id
  LEFT JOIN suppliers s
    ON pr.supplier_id = s.id
  LEFT JOIN users u
    ON pr.requested_by = u.id
  WHERE pr.status = 'pending'
  ORDER BY pr.created_at DESC
`);

    const stockIssues = await pool.query(`
      SELECT 
        sr.id,
        sr.item_id,
        i.item_name,
        sr.quantity,
        sr.status,
        sr.reason,
        sr.created_at,
        u.username AS requested_by,
        'stock_issue' AS request_type
      FROM stock_issue_requests sr
      LEFT JOIN inventory i ON sr.item_id = i.id
      LEFT JOIN users u ON sr.requested_by = u.id
      WHERE sr.status = 'pending'
      ORDER BY sr.created_at DESC
    `);

    res.json({
      purchases: purchases.rows,
      stockIssues: stockIssues.rows,
    });
  } catch (error) {
    console.error("Get approvals error:", error);

    res.status(500).json({
      message: "Unable to load approval requests.",
    });
  }
};


// APPROVE PURCHASE
const approvePurchase = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    // Get pending purchase request
    const requestResult = await client.query(
      `SELECT *
       FROM purchase_requests
       WHERE id = $1
       AND status = 'pending'
       FOR UPDATE`,
      [id]
    );

    if (requestResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Purchase request not found or already processed.",
      });
    }

    const request = requestResult.rows[0];

    // Calculate total amount
    const totalAmount =
      Number(request.quantity) *
      Number(request.purchase_price);

    // Create actual purchase record
    const purchaseResult = await client.query(
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
        request.item_id,
        request.supplier_id,
        request.quantity,
        request.purchase_price,
        totalAmount,
        request.purchase_date,
      ]
    );

    // Increase inventory stock
    await client.query(
      `UPDATE inventory
       SET quantity = quantity + $1
       WHERE id = $2`,
      [
        request.quantity,
        request.item_id,
      ]
    );

    // Mark request as approved
    await client.query(
      `UPDATE purchase_requests
       SET status = 'approved',
           approved_by = $1,
           approved_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [
        req.user.id,
        id,
      ]
    );

    await client.query("COMMIT");

    res.json({
      message: "Purchase approved successfully.",
      purchase: purchaseResult.rows[0],
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(
      "Approve purchase error:",
      error
    );

    res.status(500).json({
      message: "Unable to approve purchase.",
      error: error.message,
    });

  } finally {
    client.release();
  }
};

// REJECT PURCHASE
const rejectPurchase = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE purchase_requests
       SET status = 'rejected',
           approved_by = $1,
           approved_at = CURRENT_TIMESTAMP
       WHERE id = $2
       AND status = 'pending'
       RETURNING *`,
      [req.user.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Purchase request not found or already processed.",
      });
    }

    res.json({
      message: "Purchase request rejected.",
    });
  } catch (error) {
    console.error("Reject purchase error:", error);

    res.status(500).json({
      message: "Unable to reject purchase.",
    });
  }
};


// APPROVE STOCK ISSUE
const approveStockIssue = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    // Get pending stock issue request
    const requestResult = await client.query(
      `SELECT *
       FROM stock_issue_requests
       WHERE id = $1
       AND status = 'pending'
       FOR UPDATE`,
      [id]
    );

    if (requestResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Stock issue request not found or already processed.",
      });
    }

    const request = requestResult.rows[0];

    // Check available stock
    const inventoryResult = await client.query(
      `SELECT id, item_name, quantity
       FROM inventory
       WHERE id = $1
       FOR UPDATE`,
      [request.item_id]
    );

    if (inventoryResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Inventory item not found.",
      });
    }

    const currentQuantity = Number(
      inventoryResult.rows[0].quantity
    );

    const requestedQuantity = Number(request.quantity);

    if (currentQuantity < requestedQuantity) {
      await client.query("ROLLBACK");

      return res.status(400).json({
        message: `Insufficient stock. Available quantity: ${currentQuantity}.`,
      });
    }

    /*
      The request reason was stored as:

      Department - Issued to: Person - Remarks
    */

    let department = "General";
    let issued_to = "Unknown";
    let remarks = "";

    const reason = request.reason || "";

    if (reason.includes(" - Issued to: ")) {
      const parts = reason.split(" - Issued to: ");

      department = parts[0] || "General";

      const remaining = parts[1] || "";

      if (remaining.includes(" - ")) {
        const personParts = remaining.split(" - ");

        issued_to = personParts[0] || "Unknown";
        remarks = personParts.slice(1).join(" - ");
      } else {
        issued_to = remaining || "Unknown";
      }
    } else {
      remarks = reason;
    }

    // Create actual stock issue record
    await client.query(
      `INSERT INTO stock_issues
      (
        inventory_id,
        department,
        issued_to,
        quantity,
        issue_date,
        remarks
      )
      VALUES ($1, $2, $3, $4, CURRENT_DATE, $5)`,
      [
        request.item_id,
        department,
        issued_to,
        requestedQuantity,
        remarks || null,
      ]
    );

    // Reduce inventory only after approval
    await client.query(
      `UPDATE inventory
       SET quantity = quantity - $1
       WHERE id = $2`,
      [
        requestedQuantity,
        request.item_id,
      ]
    );

    // Mark request as approved
    await client.query(
      `UPDATE stock_issue_requests
       SET status = 'approved',
           approved_by = $1,
           approved_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [
        req.user.id,
        id,
      ]
    );

    await client.query("COMMIT");

    res.json({
      message: "Stock issue approved successfully.",
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(
      "Approve stock issue error:",
      error
    );

    res.status(500).json({
      message: "Unable to approve stock issue.",
      error: error.message,
    });

  } finally {
    client.release();
  }
};


// REJECT STOCK ISSUE
const rejectStockIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE stock_issue_requests
       SET status = 'rejected',
           approved_by = $1,
           approved_at = CURRENT_TIMESTAMP
       WHERE id = $2
       AND status = 'pending'
       RETURNING *`,
      [req.user.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Stock issue request not found or already processed.",
      });
    }

    res.json({
      message: "Stock issue request rejected.",
    });
  } catch (error) {
    console.error("Reject stock issue error:", error);

    res.status(500).json({
      message: "Unable to reject stock issue.",
    });
  }
};


module.exports = {
  getPendingApprovals,
  approvePurchase,
  rejectPurchase,
  approveStockIssue,
  rejectStockIssue,
};