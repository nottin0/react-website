import React from "react";
import github from "../../assets/github-mark-white.svg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <header className="header">
         <div className="header-content">
            <nav>
               <Link to="/">Home</Link>
               <Link to="/signup">Sign Up</Link>
               <Link to="/login">Login</Link>
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
