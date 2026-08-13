import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [inventoryResponse, suppliersResponse] = await Promise.all([
        api.get("/inventory"),
        api.get("/suppliers"),
      ]);

      setInventory(
        Array.isArray(inventoryResponse.data)
          ? inventoryResponse.data
          : []
      );

      setSuppliers(
        Array.isArray(suppliersResponse.data)
          ? suppliersResponse.data
          : []
      );
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  // Total number of inventory items
  const totalItems = inventory.length;

  // Total quantity currently in stock
  const currentStock = inventory.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // Items at or below their reorder level
  const lowStock = inventory.filter(
    (item) =>
      Number(item.quantity || 0) <=
      Number(item.reorder_level || 0)
  ).length;

  // Total suppliers
  const totalSuppliers = suppliers.length;

  // Total current stock value based on purchase price
  const stockValue = inventory.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) *
        Number(item.purchase_price || 0),
    0
  );

  // Format money as Nigerian Naira
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h1 className="mb-3">
            🏨 Hotel Inventory Management System
          </h1>

          <p className="mb-4">
            Welcome to Bromford Hotel Inventory Management Dashboard
          </p>

          <div className="row">

            <DashboardCard
              title="Total Items"
              value={totalItems}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Current Stock"
              value={currentStock}
              bgColor="bg-success"
            />

            <DashboardCard
              title="Low Stock"
              value={lowStock}
              bgColor="bg-danger"
            />

            <DashboardCard
              title="Stock Value"
              value={formatCurrency(stockValue)}
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Suppliers"
              value={totalSuppliers}
              bgColor="bg-info"
            />

            <DashboardCard
              title="Departments"
              value="6"
              bgColor="bg-secondary"
            />

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;