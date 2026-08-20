function PurchaseForm({
  inventoryItems,
  suppliers,

  inventory_id,
  setInventoryId,

  supplier_id,
  setSupplierId,

  quantity,
  setQuantity,

  purchase_price,
  setPurchasePrice,

  purchase_date,
  setPurchaseDate,

  addPurchase,

  submitLabel = "Save Purchase",
}) {
  return (
    <div className="card bg-secondary p-4 mt-3 mb-4 shadow">

      <h5 className="mb-3 text-white">
        {submitLabel === "Request Purchase"
          ? "Request New Purchase"
          : "Add New Purchase"}
      </h5>

      <div className="row g-3">

        {/* Inventory */}

        <div className="col-md-4">
          <label className="form-label text-white">
            Inventory Item
          </label>

          <select
            className="form-select"
            value={inventory_id}
            onChange={(e) => setInventoryId(e.target.value)}
          >
            <option value="">
              Select Inventory Item
            </option>

            {inventoryItems.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.item_name}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}

        <div className="col-md-4">
          <label className="form-label text-white">
            Supplier
          </label>

          <select
            className="form-select"
            value={supplier_id}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.company_name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}

        <div className="col-md-2">
          <label className="form-label text-white">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Purchase Price */}

        <div className="col-md-2">
          <label className="form-label text-white">
            Unit Price
          </label>

          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="0"
            value={purchase_price}
            onChange={(e) =>
              setPurchasePrice(e.target.value)
            }
          />
        </div>

        {/* Date */}

        <div className="col-md-4">
          <label className="form-label text-white">
            Purchase Date
          </label>

          <input
            type="date"
            className="form-control"
            value={purchase_date}
            onChange={(e) =>
              setPurchaseDate(e.target.value)
            }
          />
        </div>

        {/* Button */}

        <div className="col-md-4 d-grid">
          <label className="form-label text-white">
            &nbsp;
          </label>

          <button
            type="button"
            className="btn btn-success"
            onClick={addPurchase}
          >
            {submitLabel}
          </button>
        </div>

      </div>

    </div>
  );
}

export default PurchaseForm;