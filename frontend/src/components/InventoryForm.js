function InventoryForm({
  item_name,
  setItemName,
  category,
  setCategory,
  quantity,
  setQuantity,
  unit,
  setUnit,
  purchase_price,
  setPurchasePrice,
  selling_price,
  setSellingPrice,
  supplier_name,
  setSupplierName,
  reorder_level,
  setReorderLevel,
  addInventory,
  editingId,
  updateInventory,
}) {
  return (
    <div className="card bg-secondary p-3 mt-3 mb-4">
      <div className="row g-2">

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Item Name"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="col-md-1">
          <input
            type="number"
            className="form-control"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Purchase Price"
            value={purchase_price}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Selling Price"
            value={selling_price}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>

        <div className="col-md-3 mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Supplier"
            value={supplier_name}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>

        <div className="col-md-2 mt-2">
          <input
            type="number"
            className="form-control"
            placeholder="Reorder Level"
            value={reorder_level}
            onChange={(e) => setReorderLevel(e.target.value)}
          />
        </div>

        <div className="col-md-2 mt-2">
          <button
  className="btn btn-success w-100"
  onClick={editingId ? updateInventory : addInventory}
>
  {editingId ? "Update Item" : "Add Item"}
</button>
        </div>

      </div>
    </div>
  );
}

export default InventoryForm;