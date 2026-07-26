function InventoryTable({
  items,
  deleteInventory,
  editInventory,
}) {
  return (
    <table className="table table-dark table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Purchase</th>
          <th>Selling</th>
          <th>Supplier</th>
          <th>Reorder</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.item_name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
            <td>₦{item.purchase_price}</td>
            <td>₦{item.selling_price}</td>
            <td>{item.supplier}</td>
            <td>{item.reorder_level}</td>

            <td>
              <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => editInventory(item)}
>
  Edit
</button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteInventory(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;