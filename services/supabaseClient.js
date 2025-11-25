import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
// These should be set in your .env file (see .env.example)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock Supabase client if credentials are missing
let supabase;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn('Supabase credentials not configured. Using mock client for development.');
  // Create a mock client that won't crash
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithOAuth: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
