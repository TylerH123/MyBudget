import { Link } from "react-router-dom";
// import DarkModeToggle from "react-dark-mode-toggle";
// import React, { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleLogout = () => {
		logout();
	}

  //   const [isDarkMode, setIsDarkMode] = useState(() => false);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MyBudget</h1>
        </Link>
        {user && (
          <div className="nav">
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
          </div>
        )}
		<nav>
			{user && (
				<div>
					<span>{user.email}</span>
					<button onClick={handleLogout}>Log Out</button>
				</div>
			)}
			{!user && (
				<div>
					<Link to="/login">
						<p className="link">Login</p>
					</Link>
					<Link to="/signup">
						<p className="link">Sign Up</p>
					</Link>
				</div>
			)}
		</nav>
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
