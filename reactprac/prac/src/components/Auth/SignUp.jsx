import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();  

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { displayName } }});
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setMessage('Check your email for the confirmation link');
      navigate('/login');
    }
  };

  return (
   <div className='auth-container'>
    <form className="auth-form" onSubmit={handleSignUp}>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Username"
        />
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
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}

export default SignUp;