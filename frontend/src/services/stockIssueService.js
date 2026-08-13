import api from "./api";

const stockIssueService = {
  getStockIssues: () => api.get("/stock-issues"),

  addStockIssue: (issue) =>
    api.post("/stock-issues", issue),

  updateStockIssue: (id, issue) =>
    api.put(`/stock-issues/${id}`, issue),

  deleteStockIssue: (id) =>
    api.delete(`/stock-issues/${id}`),
};

export default stockIssueService;