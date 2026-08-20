import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Approvals() {
  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [purchases, setPurchases] = useState([]);
  const [stockIssues, setStockIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApprovals = async () => {
    try {
      const response = await api.get("/approvals");

      setPurchases(response.data.purchases || []);
      setStockIssues(response.data.stockIssues || []);
    } catch (error) {
      console.error("Load approvals error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load approval requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovals();
  }, []);

  // Only Manager and Admin can access approvals
  if (
    currentUser.role !== "admin" &&
    currentUser.role !== "manager"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  const approvePurchase = async (id) => {
    try {
      await api.put(`/approvals/purchases/${id}/approve`);

      alert("Purchase approved successfully.");

      loadApprovals();
    } catch (error) {
      console.error("Approve purchase error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to approve purchase."
      );
    }
  };

  const rejectPurchase = async (id) => {
    if (!window.confirm("Reject this purchase request?")) {
      return;
    }

    try {
      await api.put(`/approvals/purchases/${id}/reject`);

      alert("Purchase request rejected.");

      loadApprovals();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to reject purchase."
      );
    }
  };

  const approveStockIssue = async (id) => {
    try {
      await api.put(`/approvals/stock-issues/${id}/approve`);

      alert("Stock issue approved successfully.");

      loadApprovals();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to approve stock issue."
      );
    }
  };

  const rejectStockIssue = async (id) => {
    if (!window.confirm("Reject this stock issue request?")) {
      return;
    }

    try {
      await api.put(`/approvals/stock-issues/${id}/reject`);

      alert("Stock issue request rejected.");

      loadApprovals();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to reject stock issue."
      );
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">
            ✅ Approval Center
          </h2>

          <p className="text-light mb-4">
            Review and approve inventory purchase and stock issue requests.
          </p>

          {loading ? (
            <p>Loading approval requests...</p>
          ) : (
            <>
              {/* PURCHASE APPROVALS */}

              <div className="card mb-4">
                <div className="card-body">

                  <h4 className="text-dark mb-3">
                    🛒 Pending Purchase Requests
                  </h4>

                  {purchases.length === 0 ? (
                    <p className="text-muted">
                      No pending purchase requests.
                    </p>
                  ) : (
                    <div className="table-responsive">

                      <table className="table table-striped">

                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Requested By</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>

                          {purchases.map((purchase) => (
                            <tr key={purchase.id}>

                              <td>{purchase.id}</td>

                              <td>
                                {purchase.item_name || "-"}
                              </td>

                              <td>
                                {purchase.quantity}
                              </td>

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
                                {purchase.requested_by || "-"}
                              </td>

                              <td>
                                {purchase.created_at
                                  ? new Date(
                                      purchase.created_at
                                    ).toLocaleDateString()
                                  : "-"}
                              </td>

                              <td>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() =>
                                    approvePurchase(purchase.id)
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    rejectPurchase(purchase.id)
                                  }
                                >
                                  Reject
                                </button>
                              </td>

                            </tr>
                          ))}

                        </tbody>

                      </table>

                    </div>
                  )}

                </div>
              </div>


              {/* STOCK ISSUE APPROVALS */}

              <div className="card">

                <div className="card-body">

                  <h4 className="text-dark mb-3">
                    📤 Pending Stock Issue Requests
                  </h4>

                  {stockIssues.length === 0 ? (
                    <p className="text-muted">
                      No pending stock issue requests.
                    </p>
                  ) : (
                    <div className="table-responsive">

                      <table className="table table-striped">

                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Reason</th>
                            <th>Requested By</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>

                          {stockIssues.map((issue) => (
                            <tr key={issue.id}>

                              <td>{issue.id}</td>

                              <td>
                                {issue.item_name || "-"}
                              </td>

                              <td>
                                {issue.quantity}
                              </td>

                              <td>
                                {issue.reason || "-"}
                              </td>

                              <td>
                                {issue.requested_by || "-"}
                              </td>

                              <td>
                                {issue.created_at
                                  ? new Date(
                                      issue.created_at
                                    ).toLocaleDateString()
                                  : "-"}
                              </td>

                              <td>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() =>
                                    approveStockIssue(issue.id)
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    rejectStockIssue(issue.id)
                                  }
                                >
                                  Reject
                                </button>
                              </td>

                            </tr>
                          ))}

                        </tbody>

                      </table>

                    </div>
                  )}

                </div>
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Approvals;