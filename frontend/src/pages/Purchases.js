import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseTable from "../components/PurchaseTable";
import purchaseService from "../services/purchaseService";
import api from "../services/api";

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  const [inventoryItems, setInventoryItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [inventory_id, setInventoryId] = useState("");
  const [supplier_id, setSupplierId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchase_price, setPurchasePrice] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isStorekeeper = currentUser.role === "staff";

  useEffect(() => {
    fetchPurchases();
    loadInventory();
    loadSuppliers();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await purchaseService.getPurchases();
      setPurchases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadInventory = async () => {
    try {
      const response = await api.get("/inventory");
      setInventoryItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSuppliers = async () => {
    try {
      const response = await api.get("/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setInventoryId("");
    setSupplierId("");
    setQuantity("");
    setPurchasePrice("");
    setPurchaseDate("");
  };

  // Storekeeper submits a purchase request
const requestPurchase = async () => {
  if (
    !inventory_id ||
    !supplier_id ||
    !quantity ||
    !purchase_price ||
    !purchase_date
  ) {
    alert("Please complete all fields.");
    return;
  }

  try {
    await api.post("/purchase-requests", {
      item_id: inventory_id,
      supplier_id,
      quantity,
      purchase_price,
      purchase_date,
    });

    clearForm();

    alert(
      "Purchase request submitted successfully. Waiting for Manager/Admin approval."
    );
  } catch (error) {
    console.error("PURCHASE REQUEST ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
        error.response?.data?.error ||
        `Request failed: ${error.message}`
    );
  }
};


// Manager/Admin can create a purchase directly
const addPurchase = async () => {
  if (
    !inventory_id ||
    !supplier_id ||
    !quantity ||
    !purchase_price ||
    !purchase_date
  ) {
    alert("Please complete all fields.");
    return;
  }

  try {
    await purchaseService.addPurchase({
      item_id: inventory_id,
      supplier_id,
      quantity,
      purchase_price,
      purchase_date,
    });

    clearForm();

    fetchPurchases();
    loadInventory();

    alert("Purchase added successfully.");
  } catch (error) {
    console.error("PURCHASE ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
        error.response?.data?.error ||
        `Request failed: ${error.message}`
    );
  }
};


// Decide what happens when the form is submitted
const handlePurchaseSubmit = () => {
  if (isStorekeeper) {
    requestPurchase();
  } else {
    addPurchase();
  }
};


const totalPurchases = purchases.length;

  const totalQuantity = purchases.reduce(
    (sum, purchase) =>
      sum + Number(purchase.quantity),
    0
  );

  const totalSpent = purchases.reduce(
    (sum, purchase) =>
      sum + Number(purchase.total_amount),
    0
  );

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">

      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">
            🛒 Purchase Management
          </h2>

          <p className="text-light mb-4">
            {isStorekeeper
              ? "Submit inventory purchase requests for Manager/Admin approval."
              : "Record inventory purchases and automatically update stock levels."}
          </p>

          <div className="row">

            <DashboardCard
              title="Total Purchases"
              value={totalPurchases}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Quantity Purchased"
              value={totalQuantity}
              bgColor="bg-success"
            />

            <DashboardCard
              title="Total Spent"
              value={`₦${totalSpent.toLocaleString()}`}
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Database"
              value="Active"
              bgColor="bg-danger"
            />

          </div>

          <PurchaseForm
            inventoryItems={inventoryItems}
            suppliers={suppliers}

            inventory_id={inventory_id}
            setInventoryId={setInventoryId}

            supplier_id={supplier_id}
            setSupplierId={setSupplierId}

            quantity={quantity}
            setQuantity={setQuantity}

            purchase_price={purchase_price}
            setPurchasePrice={setPurchasePrice}

            purchase_date={purchase_date}
            setPurchaseDate={setPurchaseDate}

            addPurchase={handlePurchaseSubmit}

            submitLabel={
              isStorekeeper
                ? "Request Purchase"
                : "Save Purchase"
            }
          />

          <PurchaseTable
            purchases={purchases}
          />

        </div>

      </div>

    </div>
  );
}

export default Purchases;