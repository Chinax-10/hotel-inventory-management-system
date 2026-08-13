import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Reports() {
  const [inventory, setInventory] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [stockIssues, setStockIssues] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [inventoryRes, purchasesRes, issuesRes] = await Promise.all([
        api.get("/inventory"),
        api.get("/purchases"),
        api.get("/stock-issues"),
      ]);

      setInventory(inventoryRes.data);
      setPurchases(purchasesRes.data);
      setStockIssues(issuesRes.data);

    } catch (error) {
      console.error("Error loading reports:", error);
    }
  };

  const totalStock = inventory.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const totalStockValue = inventory.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) * Number(item.purchase_price || 0),
    0
  );

  const totalPurchased = purchases.reduce(
    (total, purchase) => total + Number(purchase.quantity || 0),
    0
  );

  const totalSpent = purchases.reduce(
    (total, purchase) => total + Number(purchase.total_amount || 0),
    0
  );

  const totalIssued = stockIssues.reduce(
    (total, issue) => total + Number(issue.quantity || 0),
    0
  );

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">📊 Inventory Reports</h2>

          <p className="text-light mb-4">
            View inventory, purchase and stock issue reports.
          </p>

          {/* SUMMARY CARDS */}
          <div className="row">

            <DashboardCard
              title="Inventory Items"
              value={inventory.length}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Current Stock"
              value={totalStock}
              bgColor="bg-success"
            />

            <DashboardCard
              title="Total Purchased"
              value={totalPurchased}
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Total Issued"
              value={totalIssued}
              bgColor="bg-danger"
            />

          </div>

          {/* STOCK SUMMARY */}
          <div className="card bg-secondary mt-4 p-3">

            <h4>📦 Current Inventory Summary</h4>

            <div className="table-responsive">

              <table className="table table-dark table-striped mt-3">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Purchase Price</th>
                    <th>Stock Value</th>
                  </tr>
                </thead>

                <tbody>

                  {inventory.length === 0 ? (

                    <tr>
                      <td colSpan="7" className="text-center">
                        No inventory data found
                      </td>
                    </tr>

                  ) : (

                    inventory.map((item) => (

                      <tr key={item.id}>

                        <td>{item.id}</td>

                        <td>{item.item_name}</td>

                        <td>{item.category}</td>

                        <td>{item.quantity}</td>

                        <td>{item.unit}</td>

                        <td>
                          ₦
                          {Number(
                            item.purchase_price || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          ₦
                          {(
                            Number(item.quantity || 0) *
                            Number(item.purchase_price || 0)
                          ).toLocaleString()}
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* PURCHASE SUMMARY */}
          <div className="card bg-secondary mt-4 p-3">

            <h4>🛒 Purchase Summary</h4>

            <div className="mb-3">
              <strong>Total Amount Spent:</strong>{" "}
              ₦{totalSpent.toLocaleString()}
            </div>

            <div className="table-responsive">

              <table className="table table-dark table-striped">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Purchase Price</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {purchases.length === 0 ? (

                    <tr>
                      <td colSpan="7" className="text-center">
                        No purchases found
                      </td>
                    </tr>

                  ) : (

                    purchases.map((purchase) => (

                      <tr key={purchase.id}>

                        <td>{purchase.id}</td>

                        <td>{purchase.item_name}</td>

                        <td>{purchase.company_name}</td>

                        <td>{purchase.quantity}</td>

                        <td>
                          ₦
                          {Number(
                            purchase.purchase_price || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          ₦
                          {Number(
                            purchase.total_amount || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          {purchase.purchase_date
                            ? new Date(
                                purchase.purchase_date
                              ).toLocaleDateString("en-GB")
                            : ""}
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* STOCK ISSUE SUMMARY */}
          <div className="card bg-secondary mt-4 p-3">

            <h4>📤 Stock Issue Summary</h4>

            <div className="table-responsive">

              <table className="table table-dark table-striped">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Department</th>
                    <th>Issued To</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>

                  {stockIssues.length === 0 ? (

                    <tr>
                      <td colSpan="7" className="text-center">
                        No stock issues found
                      </td>
                    </tr>

                  ) : (

                    stockIssues.map((issue) => (

                      <tr key={issue.id}>

                        <td>{issue.id}</td>

                        <td>{issue.item_name}</td>

                        <td>{issue.department}</td>

                        <td>{issue.issued_to}</td>

                        <td>{issue.quantity}</td>

                        <td>
                          {issue.issue_date
                            ? new Date(
                                issue.issue_date
                              ).toLocaleDateString("en-GB")
                            : ""}
                        </td>

                        <td>{issue.remarks}</td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* TOTAL STOCK VALUE */}
          <div className="card bg-warning text-dark mt-4 p-4">

            <h4>💰 Total Current Stock Value</h4>

            <h2>
              ₦{totalStockValue.toLocaleString()}
            </h2>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Reports;