import { Link } from "react-router-dom";
// import DarkModeToggle from "react-dark-mode-toggle";
// import React, { useState } from "react";

const Navbar = () => {
  //   const [isDarkMode, setIsDarkMode] = useState(() => false);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MyBudget</h1>
        </Link>
        <Link to="/food">
          <p className="link">Food</p>
        </Link>
        <Link to="/subscriptions">
          <p className="link">Subscriptions</p>
        </Link>
        <Link to="/utilities">
          <p className="link">Utilities</p>
        </Link>
        <Link to="/vacation">
          <p className="link">Vacation</p>
        </Link>
        {/* <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
        /> */}
      </div>
    </header>
  );
};

export default Navbar;
