import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const canApprove =
    currentUser.role === "admin" ||
    currentUser.role === "manager";

  const isAdmin =
    currentUser.role === "admin";

    const canAccessSettings =
  currentUser.role === "admin" ||
  currentUser.role === "manager";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="col-md-2 bg-black text-white p-4 min-vh-100">

      <h2 className="mb-4">
        Bromford Hotel
      </h2>

      <hr />

      <nav className="nav flex-column">

        <NavLink
          to="/dashboard"
          className="nav-link text-white"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/inventory"
          className="nav-link text-white"
        >
          Inventory
        </NavLink>

        <NavLink
          to="/categories"
          className="nav-link text-white"
        >
          Categories
        </NavLink>

        <NavLink
          to="/suppliers"
          className="nav-link text-white"
        >
          Suppliers
        </NavLink>

        <NavLink
          to="/purchases"
          className="nav-link text-white"
        >
          Purchases
        </NavLink>

        <NavLink
          to="/stock-issues"
          className="nav-link text-white"
        >
          Stock Issues
        </NavLink>

        <NavLink
          to="/reports"
          className="nav-link text-white"
        >
          Reports
        </NavLink>

        {canApprove && (
          <NavLink
            to="/approvals"
            className="nav-link text-white"
          >
            ✅ Approvals
          </NavLink>
        )}

        {canAccessSettings && (
  <NavLink
    to="/settings"
    className="nav-link text-white"
  >
    ⚙️ Settings
  </NavLink>
)}

        {isAdmin && (
          <NavLink
            to="/users"
            className="nav-link text-white"
          >
            User Management
          </NavLink>
        )}

        <hr className="border-secondary" />

        <div className="text-light small mb-2">
          Logged in as: <strong>{currentUser.username || "User"}</strong>
        </div>

        <button
          type="button"
          className="btn btn-danger w-100 mt-2"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;