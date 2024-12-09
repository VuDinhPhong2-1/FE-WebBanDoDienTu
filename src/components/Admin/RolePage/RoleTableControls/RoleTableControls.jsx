import React, { useEffect, useRef, useState } from "react";
import "./RoleTableControls.css";
import fetchWithAuth from "../../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Dialog from "../../../Dialog/Dialog";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function RoleTableControls() {
  const [roles, setRoles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editRole, setEditRole] = useState(null); // For holding the role being edited
  const dialogRef = useRef(null);
  const editDialogRef = useRef(null); // New dialog ref for editing
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  function toggleDialog() {
    if (!dialogRef.current) return;

    // Đảm bảo không gọi getRangeAt khi mở modal
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
      setRoleName("");
      setDescription("");
    } else {
      dialogRef.current.showModal();
      // Tránh focus tự động vào input khi mở dialog
      // Tạo một setTimeout để đảm bảo không xảy ra sự kiện selection
      setTimeout(() => {
        const firstInput = document.getElementById("roleName");
        if (firstInput) {
          firstInput.blur(); // Đảm bảo không focus vào input khi mở dialog
        }
      }, 0);
    }
  }

  function toggleEditDialog() {
    if (!editDialogRef.current) return;
    if (editDialogRef.current.hasAttribute("open")) {
      editDialogRef.current.close();
      setRoleName("");
      setDescription("");
    } else {
      editDialogRef.current.showModal();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleName = document.getElementById("roleName").value;
    const description = document.getElementById("description").value;

    try {
      const token = localStorage.getItem("access_token");

      // Thực hiện axios request và đảm bảo truyền promise vào toast.promise
      await toast.promise(
        axios.post(
          "http://localhost:3001/roles",
          { roleName, description },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          pending: "Updating role...",
          success: "Role updated successfully!",
          error: {
            render({ data }) {
              const message =
                data.response?.data?.message || "Failed to update role.";
              return message;
            },
          },
        }
      );

      setInputValue("");
      setCurrentPage(1);
      fetchRoles();
      toggleDialog();
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to server.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const roleName = document.getElementById("editRoleName").value;
    const description = document.getElementById("editDescription").value;

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.patch(
        `http://localhost:3001/roles/${editRole.roleId}`,
        { roleName, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setInputValue("");
        setCurrentPage(1);
        fetchRoles();
        toggleEditDialog();
      } else {
        const errorData = await response.json();
        console.error("Error updating role:", errorData);
        setError(errorData.message || "Failed to update role.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to server.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      setCurrentPage(1);
    }
    fetchRoles();
  }, [debouncedValue, currentPage]);

  async function fetchRoles() {
    try {
      let url = "http://localhost:3001/roles/";
      const params = new URLSearchParams();
      params.append("page", currentPage);
      if (debouncedValue) {
        params.append("roleName", debouncedValue);
      }

      const fullUrl = `${url}?${params.toString()}`;
      const { data } = await fetchWithAuth("/login", fullUrl, {
        method: "GET",
      });
      if (data.result) {
        setRoles(data.result);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("Invalid role data.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError("Unable to fetch role data.");
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setRoleName(role.roleName);
    setDescription(role.description);
    toggleEditDialog();
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="role-table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search role name"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="button-add-new"
            onClick={() => {
              toggleDialog();
            }}
          >
            ADD NEW
          </button>

          {/* Add New Role Dialog */}
          <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
            <div
              style={{
                background: "#35354E",
                width: "500px",
                height: "fit-content",
                borderRadius: "5px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontWeight: "normal",
                  textAlign: "left",
                  color: "#eee",
                }}
              >
                Add New Role
              </h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="roleName">Role Name</label>
                <input
                  id="roleName"
                  type="text"
                  required
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  style={{ marginTop: "0", marginBottom: "10px" }}
                />
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ marginTop: "0", marginBottom: "10px" }}
                />
                <button
                  type="submit"
                  style={{
                    height: "40px",
                    padding: "0 20px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#5e61e5",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </Dialog>

          {/* Edit Role Dialog */}
          <Dialog toggleDialog={toggleEditDialog} ref={editDialogRef}>
            <div
              style={{
                background: "#35354E",
                width: "500px",
                height: "fit-content",
                borderRadius: "5px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontWeight: "normal",
                  textAlign: "left",
                  color: "#eee",
                }}
              >
                Edit Role
              </h2>
              {editRole && (
                <form onSubmit={handleEditSubmit}>
                  <label htmlFor="editRoleName">Role Name</label>
                  <input
                    id="editRoleName"
                    type="text"
                    required
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    style={{ marginTop: "0", marginBottom: "10px" }}
                  />
                  <label htmlFor="editDescription">Description</label>
                  <input
                    id="editDescription"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginTop: "0", marginBottom: "10px" }}
                  />
                  <button
                    type="submit"
                    style={{
                      height: "40px",
                      padding: "0 20px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#5e61e5",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </Dialog>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No roles available!
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.roleId}>
                  <td>{role.roleId}</td>
                  <td>{role.roleName}</td>
                  <td>{role.description}</td>
                  <td>{role.createdAt}</td>
                  <td>{role.updatedAt}</td>
                  <td>
                    <div
                      className="button"
                      onClick={() => handleEditRole(role)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default RoleTableControls;
