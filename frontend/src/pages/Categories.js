import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import categoryService from "../services/categoryService";
function Categories() {
  const [categories, setCategories] = useState([]);

const [category_name, setCategoryName] = useState("");
const [description, setDescription] = useState("");

const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async () => {
  try {

    await categoryService.addCategory({
      category_name,
      description,
    });

    fetchCategories();
    clearForm();

  } catch (error) {
    console.log(error);
  }
};

  const editCategory = (category) => {
  setEditingId(category.id);

  setCategoryName(category.category_name);
  setDescription(category.description);
};

  const updateCategory = async () => {
  try {
    await categoryService.updateCategory(editingId, {
      category_name,
      description,
    });

    fetchCategories();
    clearForm();

  } catch (error) {
    console.log(error);
  }
};

 const deleteCategory = async (id) => {
  try {
    await categoryService.deleteCategory(id);

    fetchCategories();

  } catch (error) {
    console.log(error);
  }
};

  const clearForm = () => {
  setCategoryName("");
  setDescription("");
  setEditingId(null);
};

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">🏢 Category Management</h2>

          <p className="text-light mb-4">
           Manage all inventory categories.
          </p>

          <div className="row">

            <DashboardCard
              title="Total Categories"
              value={categories.length}
              bgColor="bg-primary"
            />

            <DashboardCard
              title="Category Types"
              value={categories.length}
              bgColor="bg-success"
            />

            <DashboardCard
             title="Available"
              value={categories.length}
              bgColor="bg-warning"
            />

            <DashboardCard
              title="Database"
              value="Active"
              bgColor="bg-danger"
            />

          </div>

          <CategoryForm
  category_name={category_name}
  setCategoryName={setCategoryName}
  description={description}
  setDescription={setDescription}
  addCategory={addCategory}
  editingId={editingId}
  updateCategory={updateCategory}
/>

          <CategoryTable
  categories={categories}
  editCategory={editCategory}
  deleteCategory={deleteCategory}
/>

        </div>

      </div>
    </div>
  );
}

export default Categories;