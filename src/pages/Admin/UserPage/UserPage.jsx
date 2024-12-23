import { useEffect, useState } from "react";
import "./UserPage.css";
import fetchWithAuth from "../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import UserTableControls from "../../../components/Admin/UserPage/UserTableControls/UserTableControls";

function UserPage() {
  return (
    <main className="user-page-container">
      <section className="title">
        <FontAwesomeIcon icon={faUsers} />
        <a href="/admin/users">Users List</a>
      </section>

      <div className="list-users">
        <UserTableControls />
      </div>
    </main>
  );
}

export default UserPage; 