import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faMailchimp } from "@fortawesome/free-brands-svg-icons";
import "./navbar.css";
import { activeToggleBarAdmin } from "../../../redux/action";
import { connect } from "react-redux";

const listIconHeader = [
  { icon: faBell },
  { icon: faMailchimp },
  { icon: faPerson },
];

function Navbar({ activeTab, activeToggleBarAdmin }) {
  const handleActiveToggle = () => {
    activeToggleBarAdmin(!activeTab);
  };

  const test = () => {
    console.log("123");
  };

  return (
    <header className="header">
      <div
        className="toggle"
        onClick={() => {
          handleActiveToggle();
          test();
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <nav>
        {listIconHeader.map((item, index) => (
          <div className="icon" key={index}>
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

export default connect(mapStateToProps, { activeToggleBarAdmin })(Navbar);
