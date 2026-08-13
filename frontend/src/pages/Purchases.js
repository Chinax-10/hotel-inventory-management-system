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
        inventory_id,
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
      console.log(error);
      alert("Unable to save purchase.");
    }
  };

  const totalPurchases = purchases.length;

  const totalQuantity = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.quantity),
    0
  );

  const totalSpent = purchases.reduce(
    (sum, purchase) => sum + Number(purchase.total_amount),
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
            Record inventory purchases and automatically update stock levels.
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

            addPurchase={addPurchase}
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