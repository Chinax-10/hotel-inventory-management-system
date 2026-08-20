import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  const [hotelName, setHotelName] = useState(
    localStorage.getItem("hotelName") || "Bromford Hotel"
  );

  const [systemName, setSystemName] = useState(
    localStorage.getItem("systemName") ||
      "Hotel Inventory Management System"
  );

  const [location, setLocation] = useState(
    localStorage.getItem("location") || "Owerri, Imo State"
  );

  const [reorderLevel, setReorderLevel] = useState(
    localStorage.getItem("reorderLevel") || "10"
  );

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "₦"
  );

  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    if (!isAdmin) return;

    localStorage.setItem("hotelName", hotelName);
    localStorage.setItem("systemName", systemName);
    localStorage.setItem("location", location);
    localStorage.setItem("reorderLevel", reorderLevel);
    localStorage.setItem("currency", currency);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">⚙️ Settings</h2>

          <p className="text-light mb-4">
            {isAdmin
              ? "Manage system information and hotel inventory settings."
              : "View system information and hotel inventory settings."}
          </p>

          {!isAdmin && (
            <div className="alert alert-warning">
              🔒 Only Administrators can modify system settings.
            </div>
          )}

          {/* HOTEL INFORMATION */}
          <div className="card bg-secondary p-4 mb-4">

            <h4 className="mb-3">🏨 Hotel Information</h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">
                  Hotel Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  readOnly={!isAdmin}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  System Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  readOnly={!isAdmin}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Location
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  readOnly={!isAdmin}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Database Status
                </label>

                <input
                  type="text"
                  className="form-control"
                  value="Connected"
                  readOnly
                />
              </div>

            </div>

          </div>

          {/* INVENTORY SETTINGS */}
          <div className="card bg-secondary p-4 mb-4">

            <h4 className="mb-3">📦 Inventory Settings</h4>

            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  Default Reorder Level
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(e.target.value)}
                  min="0"
                  readOnly={!isAdmin}
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Currency
                </label>

                <select
                  className="form-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={!isAdmin}
                >
                  <option value="₦">Nigerian Naira (₦)</option>
                  <option value="$">US Dollar ($)</option>
                  <option value="£">British Pound (£)</option>
                  <option value="€">Euro (€)</option>
                </select>

              </div>

            </div>

          </div>

          {/* SAVE BUTTON - ADMIN ONLY */}
          {isAdmin && (
            <div className="card bg-secondary p-4 mb-4">

              <button
                className="btn btn-success btn-lg"
                onClick={saveSettings}
              >
                💾 Save Settings
              </button>

              {saved && (
                <div className="alert alert-success mt-3 mb-0">
                  Settings saved successfully.
                </div>
              )}

            </div>
          )}

          {/* SYSTEM MODULES */}
          <div className="card bg-secondary p-4 mb-4">

            <h4 className="mb-3">🧩 System Modules</h4>

            <div className="list-group">

              <div className="list-group-item bg-dark text-white d-flex justify-content-between">
                Inventory Management
                <span className="badge bg-success">Active</span>
              </div>

              <div className="list-group-item bg-dark text-white d-flex justify-content-between">
                Supplier Management
                <span className="badge bg-success">Active</span>
              </div>

              <div className="list-group-item bg-dark text-white d-flex justify-content-between">
                Purchase Management
                <span className="badge bg-success">Active</span>
              </div>

              <div className="list-group-item bg-dark text-white d-flex justify-content-between">
                Stock Issues
                <span className="badge bg-success">Active</span>
              </div>

              <div className="list-group-item bg-dark text-white d-flex justify-content-between">
                Reports
                <span className="badge bg-success">Active</span>
              </div>

            </div>

          </div>

          {/* ABOUT */}
          <div className="card bg-secondary p-4">

            <h4 className="mb-3">ℹ️ About the System</h4>

            <p className="mb-1">
              <strong>Hotel Inventory Management System</strong>
            </p>

            <p className="mb-1">
              Developed for Bromford Hotel.
            </p>

            <p className="mb-0">
              This system helps manage hotel inventory,
              suppliers, purchases, stock issues and reports.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;