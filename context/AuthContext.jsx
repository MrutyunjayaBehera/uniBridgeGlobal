import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Google OAuth for Students
  const signInWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      // Set role to 'student' in metadata
      await supabase.auth.updateUser({
        data: { role: 'student' }
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw new Error('Failed to sign in. Please check your configuration.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Email/Password signup for Universities
  const signUpWithEmail = async (email, password, role) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setAuthLoading(false);
    }
  };

  // Email/Password signin for Universities
  const signInWithEmail = async (email, password, role) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update metadata with role if not present
      if (data.user?.user_metadata?.role !== role) {
        await supabase.auth.updateUser({
          data: { role }
        });
      }
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const value = {
    session,
    user,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    loading,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
