import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BoltIcon from "@mui/icons-material/Bolt";
import { connect } from "react-redux";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PaidIcon from "@mui/icons-material/Paid";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import "./sidebar.css";
import { useNavigate } from "react-router-dom"; // Sửa thành useNavigate

const listCategories = [
  { name: "DashBoard", icon: DashboardIcon, url: "/admin/dashboard" },
  { name: "Table", icon: BackupTableIcon, url: "/" },
  { name: "Billing", icon: PaidIcon, url: "/admin/dashboard" },
  { name: "Products", icon: BoltIcon, url: "/admin/dashboard" },
  { name: "Permission", icon: WorkspacePremiumIcon, url: "/admin/dashboard" },
];

const listAccountPage = [
  { name: "Profile", icon: PersonPinCircleOutlinedIcon },
  { name: "Sign In", icon: VpnKeyOutlinedIcon },
  { name: "Sign Up", icon: RocketLaunchOutlinedIcon },
];

function SideBar({ activeTab }) {
  const navigate = useNavigate();

  return (
    <div className={activeTab ? "sidebar active" : "sidebar"}>
      <div className="title">Categories</div>
      <div className="list">
        {listCategories.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div
              className="item"
              key={index}
              onClick={() => navigate(value.url)}
            >
              <IconComponent sx={{ fontSize: "20px" }} />
              <div className="name">{value.name}</div>
              <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
            </div>
          );
        })}
      </div>
      <div className="title">Account Page</div>
      <div className="list">
        {listAccountPage.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div className="item" key={index}>
              <IconComponent sx={{ fontSize: "20px" }} />
              <div className="name">{value.name}</div>
              <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps)(SideBar);
