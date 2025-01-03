import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import github from "../../assets/github-mark-white.svg";
import "./Header.css";
import supabase from "../../supabaseClient";
import { Sun, Moon } from "lucide-react"

const Header = () => {
  const { user, setUser }: { user: any; setUser: any } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false);
    }
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  }

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark';
    }
    setIsDarkMode(!isDarkMode);
  }



  return (
    <header className="w-full py-4 bg-gray-900 mb-8">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <nav className="flex gap-8 text-lg text-teal-400">
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Sign Up</Link>}
          {!user && <Link to="/login">Login</Link>}
          <Link to="/blog">Blog</Link>
          {user && <span>hi, {user.user_metadata?.displayName}</span>}
          {user && <button onClick={handleLogout} className="bg-teal-400 text-gray-900 px-4 py-2 rounded-lg font-bold transition-colors hover:bg-teal-300">Logout</button>}
        </nav>
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="ml-4">
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-400" />}
          </button>
          <a href="https://github.com/tino-sv" className="ml-4">
            <img src={github} alt="github logo" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
