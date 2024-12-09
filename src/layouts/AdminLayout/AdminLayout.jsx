import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import "./AdminLayout.css";
import Navbar from "../../components/Admin/Navbar/Navbar";
import { connect } from "react-redux";
function AdminLayout({ children, activeTab }) {
  return (
    <div className="adminLayout">
      <Navbar />
      <SideBar />
      <div className={activeTab ?  "main" : "main active"}>{children}</div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});
export default connect(mapStateToProps)(AdminLayout);
