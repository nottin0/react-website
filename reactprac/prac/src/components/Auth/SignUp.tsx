import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className='auth-container'>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default SignUp;