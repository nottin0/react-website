import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message === 'email not confirmed') {
         setError('please verify your email before logging in');
      } else {
      setError(error.message);
      }
    } else {
      setError(null);
      // Redirect to dashboard or show success message
    }
  };

  return (
   <div className='auth-container'>
    <form className='auth-form' onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
}

export default Login;