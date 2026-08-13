function PurchaseTable({ purchases }) {
  return (
    <table className="table table-dark table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Inventory Item</th>
          <th>Supplier</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
          <th>Total Amount</th>
          <th>Purchase Date</th>
        </tr>
      </thead>

      <tbody>
        {purchases.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">
              No purchases found
            </td>
          </tr>
        ) : (
          purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.item_name}</td>
              <td>{purchase.company_name}</td>
              <td>{purchase.quantity}</td>
              <td>₦{Number(purchase.purchase_price).toLocaleString()}</td>
              <td>₦{Number(purchase.total_amount).toLocaleString()}</td>
              <td>
  {new Date(purchase.purchase_date).toLocaleDateString("en-GB")}
</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default PurchaseTable;