function StockIssueTable({ issues }) {
  return (
    <table className="table table-dark table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Requested By</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {issues.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              No stock issue requests found
            </td>
          </tr>
        ) : (
          issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>

              <td>{issue.item_name}</td>

              <td>{issue.quantity}</td>

              <td>
                <span
                  className={
                    issue.status === "approved"
                      ? "badge bg-success"
                      : issue.status === "rejected"
                      ? "badge bg-danger"
                      : "badge bg-warning text-dark"
                  }
                >
                  {issue.status}
                </span>
              </td>

              <td>{issue.requested_by || "N/A"}</td>

              <td>{issue.remarks || "N/A"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default StockIssueTable;