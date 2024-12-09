import { useEffect, useState } from "react";
import "./RolePage.css";
import fetchWithAuth from "../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCriticalRole } from "@fortawesome/free-brands-svg-icons";
import RoleTableControls from "../../../components/Admin/RolePage/RoleTableControls/RoleTableControls";

function RolePage() {
  return (
    <main className="role-page-container">
      <section className="title">
        <FontAwesomeIcon icon={faCriticalRole} />
        <a href="/admin/roles">Roles List</a>
      </section>

      <div className="list-roles">
        <RoleTableControls />
      </div>
    </main>
  );
}

export default RolePage;
