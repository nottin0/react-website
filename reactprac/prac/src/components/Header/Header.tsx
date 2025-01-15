import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import githubLogoLight from "../../assets/github-mark.svg";
import githubLogoDark from "../../assets/github-mark-white.svg";
import "./Header.css";
import supabase from "../../supabaseClient";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <header className={`w-full py-4 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-900'} mb-8`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <nav className="flex gap-8 text-lg">
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Sign Up</Link>}
          {!user && <Link to="/login">Login</Link>}
          <a href="https://tinodev.vercel.app/blog">Blog</a>
          {user && <Link to="/todos">Todo App</Link>}
          {user && <span>hi, {user.user_metadata?.displayName}</span>}
          {user && <button onClick={handleLogout} className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg font-bold transition-colors hover:bg-teal-300">Logout</button>}
        </nav>
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="ml-4">
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-400" />}
          </button>
          <a href="https://github.com/tino-sv" className="ml-4">
            <img src={isDarkMode ? githubLogoDark : githubLogoLight} alt="github logo" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
