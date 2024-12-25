import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import github from "../../assets/github-mark-white.svg";
import "./Header.css";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <nav>
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Sign Up</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && <span>hi, {user.email}</span>}
        </nav>
        <div className="header-links">
          <a href="https://github.com/nottin0" className="github-link">
            <img src={github} alt="github logo" height="30px" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
