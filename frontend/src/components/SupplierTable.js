function SupplierTable({
  suppliers,
  editSupplier,
  deleteSupplier,
  canEdit,
  canDelete,
}) {
  return (
    <table className="table table-dark table-striped">

      <thead>
        <tr>
          <th>ID</th>
          <th>Company</th>
          <th>Contact</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {suppliers.map((supplier) => (
          <tr key={supplier.id}>

            <td>{supplier.id}</td>
            <td>{supplier.company_name}</td>
            <td>{supplier.contact_person}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.email}</td>
            <td>{supplier.address}</td>

            <td>

              {canEdit && (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editSupplier(supplier)}
                >
                  Edit
                </button>
              )}

              {canDelete && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSupplier(supplier.id)}
                >
                  Delete
                </button>
              )}

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default SupplierTable;