function SupplierForm({
  company_name,
  setCompanyName,
  contact_person,
  setContactPerson,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  notes,
  setNotes,
  addSupplier,
  editingId,
  updateSupplier,
}) {
  return (
    <div className="card bg-secondary p-3 mt-3 mb-4">

      <div className="row g-2">

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Company Name"
            value={company_name}
            onChange={(e)=>setCompanyName(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Contact Person"
            value={contact_person}
            onChange={(e)=>setContactPerson(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>

        <div className="col-md-4 mt-2">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-4 mt-2">
          <input
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </div>

        <div className="col-md-4 mt-2">
          <input
            className="form-control"
            placeholder="Notes"
            value={notes}
            onChange={(e)=>setNotes(e.target.value)}
          />
        </div>

        <div className="col-md-3 mt-2">
          <button
            className="btn btn-success w-100"
            onClick={editingId ? updateSupplier : addSupplier}
          >
            {editingId ? "Update Supplier" : "Add Supplier"}
          </button>
        </div>

      </div>

    </div>
  );
}

export default SupplierForm;