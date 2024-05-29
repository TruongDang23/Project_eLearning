import React from "react";
import "./Header.css";
import InputNav from "./InputNav";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import logo from "../assets/logo.png";
function Header() {
  return (
    <header className="header">
      <a href="#" className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="logo-text">Udemi</span>
      </a>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <a className="main-nav-link" href="#how">
              Categories
            </a>
          </li>
          <li>
            <InputNav />
          </li>
          <li>
            <a className="main-nav-link" href="#testimonials">
              Teach on Udemi
            </a>
          </li>
          <li>
            <a className="main-nav-link nav-cta" href="#pricing">
              Login
            </a>
          </li>
          <li>
            <a className="main-nav-link nav-cta" href="#pricing">
              Sign up
            </a>
          </li>
        </ul>
      </nav>

      <button className="btn-mobile-nav">
        <DensityMediumIcon
          className="icon-mobile-nav"
          name="menu-outline"
        ></DensityMediumIcon>
        <DensityMediumIcon
          className="icon-mobile-nav"
          name="close-outline"
        ></DensityMediumIcon>
      </button>
    </header>
  );
}

export default Header;
