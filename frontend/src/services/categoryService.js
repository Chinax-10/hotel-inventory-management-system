import api from "./api";

const categoryService = {
  getCategories: () => api.get("/categories"),

  addCategory: (category) =>
    api.post("/categories", category),

  updateCategory: (id, category) =>
    api.put(`/categories/${id}`, category),

  deleteCategory: (id) =>
    api.delete(`/categories/${id}`),
};

export default categoryService;