function CategoryForm({
  category_name,
  setCategoryName,
  description,
  setDescription,
  addCategory,
  editingId,
  updateCategory,
}) {
  return (
    <div className="card bg-secondary p-3 mt-3 mb-4">
      <div className="row g-2">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-success w-100"
            onClick={editingId ? updateCategory : addCategory}
          >
            {editingId ? "Update Category" : "Add Category"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CategoryForm;