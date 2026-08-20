import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const loadUsers = async () => {
    try {
      const response = await api.get("/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load users."
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/users", {
        username,
        password,
        role,
      });

      setUsername("");
      setPassword("");
      setRole("staff");
      setShowPassword(false);

      await loadUsers();

      alert("User created successfully.");
    } catch (error) {
      console.error("Create user error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to create user."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id, username) => {
    if (Number(id) === Number(currentUser.id)) {
      alert("You cannot delete your own account.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete user "${username}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/auth/users/${id}`);

      await loadUsers();

      alert("User deleted successfully.");
    } catch (error) {
      console.error("Delete user error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100">
      <div className="row">

        <Sidebar />

        <div className="col-md-10 p-4">

          <h2 className="mb-1">
            👥 User Management
          </h2>

          <p className="text-light mb-4">
            Create users and assign system roles.
          </p>

          {/* CREATE USER */}
          <div className="card mb-4">
            <div className="card-body">

              <h5 className="card-title">
                Create New User
              </h5>

              <form onSubmit={createUser}>

                <div className="row">

                  {/* USERNAME */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Username
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="Enter username"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Password
                    </label>

                    <div className="input-group">

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        className="form-control"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword
                          ? "🙈"
                          : "👁️"}
                      </button>

                    </div>
                  </div>

                  {/* ROLE */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Role
                    </label>

                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) =>
                        setRole(e.target.value)
                      }
                    >
                      <option value="staff">
                        Staff
                      </option>

                      <option value="manager">
                        Manager
                      </option>

                      <option value="admin">
                        Administrator
                      </option>
                    </select>
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create User"}
                </button>

              </form>

            </div>
          </div>

          {/* USERS TABLE */}
          <div className="card">

            <div className="card-body">

              <h5 className="card-title">
                System Users
              </h5>

              <div className="table-responsive">

                <table className="table table-striped table-hover">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {users.length === 0 ? (

                      <tr>
                        <td
                          colSpan="5"
                          className="text-center"
                        >
                          No users found.
                        </td>
                      </tr>

                    ) : (

                      users.map((user) => (

                        <tr key={user.id}>

                          <td>
                            {user.id}
                          </td>

                          <td>
                            {user.username}
                          </td>

                          <td>
                            <span className="badge bg-info text-dark">
                              {user.role}
                            </span>
                          </td>

                          <td>
                            {user.created_at
                              ? new Date(
                                  user.created_at
                                ).toLocaleDateString()
                              : "-"}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                deleteUser(
                                  user.id,
                                  user.username
                                )
                              }
                              disabled={
                                Number(user.id) ===
                                Number(currentUser.id)
                              }
                            >
                              Delete
                            </button>
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Users;