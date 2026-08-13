import StockIssueTable from "../components/StockIssueTable";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import stockIssueService from "../services/stockIssueService";
import api from "../services/api";

function StockIssues() {
  const [issues, setIssues] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);

  const [inventory_id, setInventoryId] = useState("");
  const [department, setDepartment] = useState("");
  const [issued_to, setIssuedTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [issue_date, setIssueDate] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchIssues();
    loadInventory();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await stockIssueService.getStockIssues();
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadInventory = async () => {
    try {
      const res = await api.get("/inventory");
      setInventoryItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveIssue = async () => {
    try {
      await stockIssueService.addStockIssue({
        inventory_id,
        department,
        issued_to,
        quantity,
        issue_date,
        remarks,
      });

      alert("Stock issued successfully.");

      fetchIssues();

      setInventoryId("");
      setDepartment("");
      setIssuedTo("");
      setQuantity("");
      setIssueDate("");
      setRemarks("");

    } catch (err) {
      alert(err.response?.data?.message || "Error issuing stock");
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2>📦 Stock Issue Management</h2>

          <p>Issue inventory items to departments.</p>

          <div className="row">

            <DashboardCard
              title="Total Issues"
              value={issues.length}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Items Issued"
              value={issues.reduce((t, i) => t + Number(i.quantity), 0)}
              bgColor="bg-success"
            />

            <DashboardCard
              title="Departments"
              value="Hotel"
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Database"
              value="Active"
              bgColor="bg-danger"
            />

          </div>

          <div className="card bg-secondary p-4 mt-3">

            <div className="row g-3">

              <div className="col-md-4">
                <label>Inventory Item</label>

                <select
                  className="form-select"
                  value={inventory_id}
                  onChange={(e) => setInventoryId(e.target.value)}
                >
                  <option value="">Select Item</option>

                  {inventoryItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.item_name}
                    </option>
                  ))}

                </select>
              </div>

              <div className="col-md-4">
                <label>Department</label>

                <input
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label>Issued To</label>

                <input
                  className="form-control"
                  value={issued_to}
                  onChange={(e) => setIssuedTo(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label>Quantity</label>

                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label>Issue Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={issue_date}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label>Remarks</label>

                <input
                  className="form-control"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <button
                  className="btn btn-success w-100 mt-4"
                  onClick={saveIssue}
                >
                  Issue Stock
                </button>
              </div>

            </div>

          </div>

<StockIssueTable issues={issues} />

        </div>

      </div>
    </div>
  );
}

export default StockIssues;