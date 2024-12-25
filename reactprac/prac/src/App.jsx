import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import "./App.css";
import TodoApp from "./components/TodoApp";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<TodoApp/>} />
         </Routes>
      </Router>
   );
}

export default App;
