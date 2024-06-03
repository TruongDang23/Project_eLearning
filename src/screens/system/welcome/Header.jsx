import React from "react";
import styles from "./Header.module.css";
function Header() {
  return (
    <nav className={styles.navbar}>
      <a className={styles.brand}>
        <img
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
          alt="Udemy Logo"
        />
      </a>
      <div className={styles.navLinks}>
        <a href="#" className={styles.link}>
          Categories
        </a>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search for anything" />
          <a href="search">
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="Search Icon"
            />
          </a>
        </div>
        <a href="#" className={styles.link}>
          Teach on Udemy
        </a>
        <a href="#" className={styles.link}>
          My learning
        </a>
      </div>
      <div className={styles.authButtons}>
        <button className={styles.login}>Log in</button>
        <button className={styles.signup}>Sign up</button>
      </div>
    </nav>
  );
}

export default Header;
