import api from "./api";

const purchaseService = {
  // Get approved/recorded purchases
  getPurchases: () => api.get("/purchases"),

  // Storekeeper submits a purchase request
  addPurchase: (purchase) =>
    api.post("/purchase-requests", purchase),

  // Existing purchase management
  updatePurchase: (id, purchase) =>
    api.put(`/purchases/${id}`, purchase),

  deletePurchase: (id) =>
    api.delete(`/purchases/${id}`),
};

export default purchaseService;