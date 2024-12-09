import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faClipboard,
  faKey,
  faUser,
  faRocket,
  faUsers,
  faCartShopping,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"; // Thêm các icon từ FontAwesome
import {
  faCriticalRole,
  faProductHunt,
} from "@fortawesome/free-brands-svg-icons"; // Biểu tượng thương hiệu
import "./sidebar.css";

const listCategories = [
  { name: "DashBoard", icon: faGauge, url: "/admin/dashboard" },
  { name: "Orders", icon: faClipboard, url: "/admin/orders" },
  { name: "Products", icon: faProductHunt, url: "/admin/products/" },
  { name: "Permission", icon: faUsers, url: "/admin/permissions" },
  { name: "Role", icon: faCriticalRole, url: "/admin/roles" },
];

const listAccountPage = [
  { name: "Profile", icon: faUser },
  { name: "Sign In", icon: faKey },
  { name: "Sign Up", icon: faRocket },
];

function SideBar({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div className={activeTab ? "sidebar active" : "sidebar"}>
      <div className="title">Categories</div>
      <div className="list">
        {listCategories.map((value, index) => (
          <div className="item" key={index} onClick={() => navigate(value.url)}>
            <FontAwesomeIcon icon={value.icon} style={{ fontSize: "20px" }} />
            <div className="name">{value.name}</div>
            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "12px" }} />
          </div>
        ))}
      </div>
      <div className="title">Account Page</div>
      <div className="list">
        {listAccountPage.map((value, index) => (
          <div className="item" key={index}>
            <FontAwesomeIcon icon={value.icon} style={{ fontSize: "20px" }} />
            <div className="name">{value.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps)(SideBar);
