import api from "./api";

const purchaseService = {
  getPurchases: () => api.get("/purchases"),

  addPurchase: (purchase) =>
    api.post("/purchases", purchase),

  updatePurchase: (id, purchase) =>
    api.put(`/purchases/${id}`, purchase),

  deletePurchase: (id) =>
    api.delete(`/purchases/${id}`),
};

export default purchaseService;