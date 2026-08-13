import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="col-md-2 bg-black text-white p-4 min-vh-100">
      <h2 className="mb-4">Bromford Hotel</h2>
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

        <NavLink
          to="/settings"
          className="nav-link text-white"
        >
          Settings
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;