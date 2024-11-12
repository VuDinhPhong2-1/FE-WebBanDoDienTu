import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import "./AdminLayout.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
function AdminLayout({ children }) {
  return (
    <div className="adminLayout">
      <Navbar />
      <SideBar />
      {children}
    </div>
  );
}

export default AdminLayout;
