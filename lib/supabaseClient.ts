import { createClient } from '@supabase/supabase-js';

// These are public-safe (anon/publishable) keys.
// Set them in .env.local — never put real secrets here.
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || '';

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
