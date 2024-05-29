import React from "react";
import "./InputNav.css";
import SearchIcon from "@mui/icons-material/Search";

function InputNav() {
  return (
    <div className="main-nav-search">
      <input
        type="text"
        placeholder="Enter your search"
        className="main-nav-input"
      />
      <button className="main-nav-input-btn">
        <SearchIcon />
      </button>
    </div>
  );
}

export default InputNav;
