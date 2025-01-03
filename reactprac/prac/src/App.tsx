import React from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/go" element={<GoBlog/>} />
          <Route path="/todos" element={
            <ProtectedRoute>
              <TodoApp/>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Home/>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
