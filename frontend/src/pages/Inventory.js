import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import InventoryForm from "../components/InventoryForm";
import InventoryTable from "../components/InventoryTable";
import DashboardCard from "../components/DashboardCard";
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
const [editingId, setEditingId] = useState(null);
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

const deleteInventory = async (id) => {
  try {
    await api.delete(`/inventory/${id}`);

    fetchInventory();

  } catch (error) {
    console.log(error);
  }
};

const editInventory = (item) => {
  setEditingId(item.id);

  setItemName(item.item_name);
  setCategory(item.category);
  setQuantity(item.quantity);
  setUnit(item.unit);
  setPurchasePrice(item.purchase_price);
  setSellingPrice(item.selling_price);
  setSupplierName(item.supplier);
  setReorderLevel(item.reorder_level);
  
};   // <-- THIS LINE MUST EXIST

const updateInventory = async () => {
  try {
    await api.put(`/inventory/${editingId}`, {
      item_name,
      category,
      quantity,
      unit,
      purchase_price,
      selling_price,
      supplier: supplier_name,
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
    setEditingId(null);

  } catch (error) {
    console.log(error);
  }
};

// Dashboard calculations
const totalItems = items.length;

const lowStockItems = items.filter(
  (item) => Number(item.quantity) <= Number(item.reorder_level)
).length;

const totalCategories = new Set(
  items.map((item) => item.category)
).size;

const totalStockValue = items.reduce(
  (total, item) =>
    total + Number(item.quantity) * Number(item.purchase_price),
  0
);

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">
          <h2 className="mb-1">📦 Inventory Management</h2>

<p className="text-light mb-4">
  Manage all hotel inventory items, suppliers and stock levels.
</p>

<div className="row">

  <DashboardCard
    title="Total Items"
    value={totalItems}
    bgColor="bg-primary"
  />

  <DashboardCard
    title="Low Stock"
    value={lowStockItems}
    bgColor="bg-danger"
  />

  <DashboardCard
    title="Categories"
    value={totalCategories}
    bgColor="bg-success"
  />

  <DashboardCard
    title="Stock Value"
    value={`₦${totalStockValue.toLocaleString()}`}
    bgColor="bg-warning"
  />

</div>

<InventoryForm
  item_name={item_name}
  setItemName={setItemName}
  category={category}
  setCategory={setCategory}
  quantity={quantity}
  setQuantity={setQuantity}
  unit={unit}
  setUnit={setUnit}
  purchase_price={purchase_price}
  setPurchasePrice={setPurchasePrice}
  selling_price={selling_price}
  setSellingPrice={setSellingPrice}
  supplier_name={supplier_name}
  setSupplierName={setSupplierName}
  reorder_level={reorder_level}
  setReorderLevel={setReorderLevel}
  addInventory={addInventory}

  editingId={editingId}
  updateInventory={updateInventory}
/>

<InventoryTable
  items={items}
  deleteInventory={deleteInventory}
  editInventory={editInventory}
/>
        </div>

      </div>
    </div>
  );
}

export default Inventory;