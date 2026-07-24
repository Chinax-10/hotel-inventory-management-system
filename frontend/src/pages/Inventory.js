import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Inventory() {
  const [items, setItems] = useState([]);

const [item_name, setItemName] = useState("");
const [category, setCategory] = useState("");
const [quantity, setQuantity] = useState("");
const [unit, setUnit] = useState("");
const [purchase_price, setPurchasePrice] = useState("");
const [selling_price, setSellingPrice] = useState("");
const [supplier_name, setSupplierName] = useState("");
const [reorder_level, setReorderLevel] = useState("");
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get("/inventory");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };
const addInventory = async () => {
    console.log("Button clicked");try {
        await api.post("/inventory", {
            item_name,
            category,
            quantity,
            unit,
            purchase_price,
            selling_price,
            supplier_name,
            reorder_level,
        });

        fetchInventory();

        setItemName("");
        setCategory("");
        setQuantity("");
        setUnit("");
        setPurchasePrice("");
        setSellingPrice("");
        setSupplierName("");
        setReorderLevel("");

    } catch (error) {
        console.log(error);
    }
};
  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">
          <h2>Inventory</h2>

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
        onClick={addInventory}
      >
        Add Item
      </button>
    </div>

  </div>
</div>

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
                  <td>{item.purchase_price}</td>
                  <td>{item.selling_price}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Inventory;