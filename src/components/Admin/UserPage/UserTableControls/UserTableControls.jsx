import React, { useEffect, useRef, useState } from "react";
import "./UserTableControls.css";
import fetchWithAuth from "../../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Dialog from "../../../Dialog/Dialog";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RoleDisplay = ({ roles }) => {
  if (!roles || roles.length === 0) return <span>No Role</span>;

  const displayRoles = roles.slice(0, 3);
  const hasMore = roles.length > 3;

  return (
    <div className="role-tags">
      {displayRoles.map((role, index) => (
        <span key={index} className="role-tag">
          {role.roleName || role}
        </span>
      ))}
      {hasMore && <span className="role-tag more">+{roles.length - 3}</span>}
    </div>
  );
};

function UserTableControls() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const editDialogRef = useRef(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleRoleChange = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSave = async () => {
    if (!editUser || selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }

    try {
      const roleIds = roles
        .filter((role) => selectedRoles.includes(role.roleName))
        .map((role) => role.roleId);

      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        `http://localhost:3001/users/${editUser.userId}/roles`,
        { roleIds: roleIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Roles updated successfully!");

      fetchUsers(); // Refresh user list
      toggleEditDialog(); // Close dialog
    } catch (error) {
      console.error("Error updating roles:", error);
      toast.error(error.response?.data?.message || "Failed to update roles.");
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
    fetchUsers();
    fetchRoles();
  }, [debouncedValue, currentPage]);

  const fetchUsers = async () => {
    try {
      let url = "http://localhost:3001/users/all-users";
      const params = new URLSearchParams();
      params.append("page", currentPage);
      if (debouncedValue) {
        params.append("username", debouncedValue);
      }

      const fullUrl = `${url}?${params.toString()}`;
      const { data } = await fetchWithAuth("/login", fullUrl, {
        method: "GET",
      });
      setUsers(data.users.usersWithRoles);
      setTotalPages(data.users.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Unable to fetch user data.");
    }
  };

  const fetchRoles = async () => {
    try {
      let url = "http://localhost:3001/roles/";

      const { data } = await fetchWithAuth("/login", url, {
        method: "GET",
      });
      setRoles(data.result);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError("Unable to fetch roles data.");
    }
  };

  function toggleEditDialog() {
    if (!editDialogRef.current) return;
    if (editDialogRef.current.hasAttribute("open")) {
      editDialogRef.current.close();
      resetForm();
    } else {
      editDialogRef.current.showModal();
    }
  }

  const resetForm = () => {
    setUsername("");
    setFullName("");
    setEmail("");
    setPhone("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setUsername(user.username);
    setFullName(user.fullName);
    setEmail(user.email);
    setPhone(user.phone);

    const userRoles = user.roles.map((role) => role.roleName || role);
    setSelectedRoles(userRoles);

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
      <div className="user-table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search username"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No users available!
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <RoleDisplay roles={user.roles} />
                  </td>
                  <td>
                    <span
                      className={`status ${
                        user.isActive ? "active" : "inactive"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div
                      className="button"
                      onClick={() => handleEditUser(user)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <Dialog toggleDialog={toggleEditDialog} ref={editDialogRef}>
                      <div className="container-dialog">
                        <h2 style={{ color: "#fff" }}>Edit User</h2>
                        <label htmlFor="UserName" style={{ color: "#fff" }}>
                          User Name
                        </label>
                        <input
                          type="text"
                          id="UserName"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="FullName" style={{ color: "#fff" }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="FullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="Roles" style={{ color: "#fff" }}>
                          Roles
                        </label>
                        <div id="Roles">
                          {roles.map((role) => (
                            <div
                              key={role.roleId}
                              style={{ marginBottom: "5px" }}
                              className="container-checkbox"
                            >
                              <span>{role.roleName}</span>
                              <input
                                type="checkbox"
                                id={role.roleId} // Make sure to use a unique ID
                                checked={selectedRoles.includes(role.roleName)} // Check if the role is in selectedRoles
                                onChange={() => handleRoleChange(role.roleName)} // Pass roleName to handleRoleChange
                              />
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={handleSave}
                          style={{ marginTop: "10px" }}
                        >
                          Save
                        </button>
                      </div>
                    </Dialog>
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

export default UserTableControls;
