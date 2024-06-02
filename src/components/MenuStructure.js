import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from "./MenuStructure.module.css";

const MenuStructure = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const MouseGo = () => {
    if (!isNavOpen) {
      toggleNav();
    }
  };

  const MouseLeave = () => {
    if (isNavOpen) {
      toggleNav();
    }
  };

  return (
    <header
      className={isNavOpen ? classes.responsive_nav : ""}
      onMouseEnter={MouseGo}
      onMouseLeave={MouseLeave}
    >
      <h3>Logo</h3>
      {isNavOpen ? (
        <button className={`nav_btn ${classes.nav_close}`} onClick={toggleNav}>
          <FaTimes />
        </button>
      ) : (
        <button className="nav_btn" onClick={toggleNav}>
          <FaBars />
        </button>
      )}
      {isNavOpen && (
        <nav className={classes.nav}>
          <a href="/#">Profile</a>
          <a href="/#">Language</a>
          <a href="/#">Help</a>
          <a href="/#">Logout</a>
          <a href="/#">About us</a>
        </nav>
      )}
    </header>
  );
};

export default MenuStructure;
