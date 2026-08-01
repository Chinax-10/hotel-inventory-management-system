function CategoryTable({
  categories,
  editCategory,
  deleteCategory,
}) {
  return (
    <table className="table table-dark table-striped mt-4">

      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.category_name}</td>
            <td>{category.description}</td>

            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editCategory(category)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteCategory(category.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default CategoryTable;