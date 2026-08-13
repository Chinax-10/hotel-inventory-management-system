import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Purchases from "./pages/Purchases";
import StockIssues from "./pages/StockIssues";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/purchases" element={<Purchases />} />
      <Route path="/stock-issues" element={<StockIssues />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;