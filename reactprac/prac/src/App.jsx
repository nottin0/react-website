import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import "./App.css";
import TodoApp from "./components/TodoApp";
import { AuthProvider } from "./AuthContext";

function App() {
   return (
     <AuthProvider>
      <Router>
         <Routes>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<TodoApp/>} />
         </Routes>
      </Router>
      </AuthProvider>
   );
}

export default App;
