import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useAuth } from "../../AuthContext.jsx";
import "./Auth.css";
import { toast } from 'react-toastify';

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const { setUser } = useAuth();

   const handleLogin = async (e) => {
      e.preventDefault();
      const { error, user } = await supabase.auth.signInWithPassword({
         email,
         password,
      });
      if (error) {
         if (error.message === "email not confirmed") {
            setError("Please verify your email before logging in.");
         } else {
            setError(error.message);
         }
      } else {
         setError(null);
         setUser(user);
         toast.success("Logged in successfully!")
         navigate('/todos');
      }
   };

   return (
      <div className="auth-container">
         <form className="auth-form" onSubmit={handleLogin}>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Email"
            />
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
            />
            <button type="submit">
               Login
            </button>
            {error && <p>{error}</p>}
         </form>
         <div className="nav">
            <Link to="/signup">Sign Up</Link>
            <Link to="/">Home</Link>
         </div>
      </div>
   );
}

export default Login;
