import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from './supabaseClient';

const AuthContext = createContext<{
  user: (User & { displayName?: string }) | null;
  setUser: (user: (User & { displayName?: string }) | null) => void;
  isLoading: boolean;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setUser({ ...session.user, displayName: user.user_metadata.displayName });
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser({ ...session.user, displayName: user.user_metadata.displayName });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
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