import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: { user_metadata} } = await supabase.auth.getUser();
      setUser({ ...session.user, displayName: user_metadata.displayName})
    }
  };

  getSession();
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const { data: user_metadata } = await supabase.auth.getUser();
      setUser({ ...session.user, displayName: user_metadata.displayName });
    } else {
      setUser(null);
    }
  });

  return () => {
    authListener?.subscription.unsubscribe();
  };
}, []);

return (
  <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};