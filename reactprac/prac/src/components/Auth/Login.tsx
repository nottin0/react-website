import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useAuth } from "../../AuthContext";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth() as { setUser: (user: any) => void };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <button type="submit" className="w-full p-2 bg-teal-400 text-gray-900 rounded font-bold transition-colors hover:bg-teal-300">
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      <div className="flex gap-4 mt-4">
        <Link to="/signup" className="text-teal-400 hover:underline">Sign Up</Link>
        <Link to="/" className="text-teal-400 hover:underline">Home</Link>
      </div>
    </div>
  );
}

export default Login;
