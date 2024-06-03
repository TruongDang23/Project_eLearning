import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";
function Header() {
  return (
    <nav className="navbar">
      <a className="brand">
        <img
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
          alt="Udemy Logo"
        />
      </a>
      <div className="nav-links">
        <a href="#" className="link">
          Categories
        </a>
        <div className="search-box">
          <input type="text" placeholder="Search for anything" />
          <a href="search">
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="Search Icon"
            />
          </a>
        </div>
        <a href="#" className="link">
          Teach on Udemy
        </a>
        <a href="#" className="link">
          My learning
        </a>
      </div>
      <div className="auth-buttons">
        <button className="login">Log in</button>
        <button className="signup">Sign up</button>
      </div>
    </nav>
  );
}

export default Header;
