import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AdminRoute from "./AdminRoute";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Purchases from "./pages/Purchases";
import StockIssues from "./pages/StockIssues";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Approvals from "./pages/Approvals";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/stock-issues" element={<StockIssues />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>
      </Route>
    </Routes>
  );
}

export default App;