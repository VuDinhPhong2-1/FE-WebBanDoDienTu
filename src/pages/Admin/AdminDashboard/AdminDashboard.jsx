import React from "react";
import DashboardCard from "../../../components/Admin/AdminDashBoard/DashboardCard";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AdminDashboard.css";
import DoughnutChart from "../../../components/Admin/Charts/Doughnut/DoughnutChart";
import TableOrder from "../../../components/Admin/TableOrder/TableOrder";

function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <div className="title">
        <FontAwesomeIcon icon={faHome} />
        <a href="/admin/dashboard">Dashboard</a>
      </div>
      <DashboardCard />
      <DoughnutChart />
      <TableOrder />
    </section>
  );
}

export default AdminDashboard;