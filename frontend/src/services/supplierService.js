import api from "./api";

const getSuppliers = () => api.get("/suppliers");

const addSupplier = (supplier) =>
  api.post("/suppliers", supplier);

const updateSupplier = (id, supplier) =>
  api.put(`/suppliers/${id}`, supplier);

const deleteSupplier = (id) =>
  api.delete(`/suppliers/${id}`);

export default {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};