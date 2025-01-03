import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import supabase from '../../supabaseClient';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();  

  const handleSignUp = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: displayName,
        },
      },
    });
    if (error) {
      setError(error.message as any);
    } else {
      setError(null);
      setMessage('Check your email for the confirmation link' as any);
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <button type="submit" className="w-full p-2 bg-teal-400 text-gray-900 rounded font-bold transition-colors hover:bg-teal-300">Sign Up</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-teal-400 mt-4">{message}</p>}
      </form>
      <div className="flex gap-4 mt-4">
        <Link to="/login" className="text-teal-400 hover:underline">Login</Link>
        <Link to="/" className="text-teal-400 hover:underline">Home</Link>
      </div>
    </div>
  );
}

export default SignUp;