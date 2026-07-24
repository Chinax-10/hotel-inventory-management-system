import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">
       <Sidebar />

        <div className="col-md-10 p-5">
          <h1>Hotel Inventory Management System</h1>

          <h3>Welcome to Bromford Hotel</h3>

          <div className="row mt-5">

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Total Items</h5>
                <h2>0</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Low Stock</h5>
                <h2>0</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Suppliers</h5>
                <h2>0</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Departments</h5>
                <h2>6</h2>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;