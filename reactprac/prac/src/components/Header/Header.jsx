import React from "react";
import github from "../../assets/github-mark-white.svg";
import "./Header.css";

const Header = () => {
   return (
      <header className="header">
         <div className="header-content">
            <h1>todo list</h1>
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
