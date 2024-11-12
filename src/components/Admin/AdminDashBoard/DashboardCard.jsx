import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import "./DashboardCard.css";

const DashboardCard = () => {
  return (
    <div className="dashboard-card">
      <div className="list">
        <div className="item">
          <div className="info">
            <FontAwesomeIcon icon={faChartSimple} />
            <div className="goal">
              <div className="name">Monthly Goal</div>
              <div className="money">$74,502</div>
            </div>
          </div>
          <span className="striped-progress-bar"></span>
        </div>
        <div className="item">
          <div className="info">
            <FontAwesomeIcon icon={faChartSimple} />
            <div className="goal">
              <div className="name">Monthly Goal</div>
              <div className="money">$74,502</div>
            </div>
          </div>
          <span className="striped-progress-bar"></span>
        </div>
        <div className="item">
          <div className="info">
            <FontAwesomeIcon icon={faChartSimple} />
            <div className="goal">
              <div className="name">Monthly Goal</div>
              <div className="money">$74,502</div>
            </div>
          </div>
          <span className="striped-progress-bar"></span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
