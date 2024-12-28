import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import github from "../../assets/github-mark-white.svg";
import "./Header.css";
import supabase from "../../supabaseClient";

const Header = () => {
  const { user, setUser }: { user: any; setUser: any } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-content">
        <nav>
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Sign Up</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && <span>hi, {user.user_metadata?.displayName}</span>}
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <div className="header-links">
          <a href="https://github.com/tino-sv" className="github-link">
            <img src={github} alt="github logo" height="20px" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
