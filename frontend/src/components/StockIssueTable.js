function StockIssueTable({ issues }) {
  return (
    <table className="table table-dark table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Department</th>
          <th>Issued To</th>
          <th>Quantity</th>
          <th>Issue Date</th>
          <th>Remarks</th>
        </tr>
      </thead>

      <tbody>
        {issues.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">
              No stock issues found
            </td>
          </tr>
        ) : (
          issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.item_name}</td>
              <td>{issue.department}</td>
              <td>{issue.issued_to}</td>
              <td>{issue.quantity}</td>
              <td>
                {new Date(issue.issue_date).toLocaleDateString("en-GB")}
              </td>
              <td>{issue.remarks}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default StockIssueTable;