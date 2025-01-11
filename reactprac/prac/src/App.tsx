import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import TodoApp from "./components/TodoApp/TodoApp";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Blog from "./components/Blog/Blog";
import GoBlog from "./components/Blog/GoBlog";
import WebDevBlog from "./components/Blog/WebDevBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import TermBlog from "./components/Blog/TermBlog";
import AI from "./components/Blog/AI";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/go" element={<GoBlog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/webdev" element={<WebDevBlog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/term" element={<TermBlog isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/ai" element={<AI isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/todos" element={
            <ProtectedRoute>
              <TodoApp isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;

