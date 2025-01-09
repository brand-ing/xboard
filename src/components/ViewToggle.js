import React from "react";
import "./ViewToggle.css";

const ViewToggle = ({ viewMode, onToggle }) => {
  return (
    <div className="view-toggle">
      <span className={viewMode === "list" ? "active" : ""}>List</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={viewMode === "board"}
          onChange={() => onToggle(viewMode === "list" ? "board" : "list")}
        />
        <span className="slider"></span>
      </label>
      <span className={viewMode === "board" ? "active" : ""}>Board</span>
    </div>
  );
};

export default ViewToggle;
