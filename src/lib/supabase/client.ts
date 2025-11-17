import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';

// Initialize Supabase client (graceful degradation if not configured)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Waitlist submission type
export interface WaitlistSubmission {
  id?: string;
  full_name: string;
  company_name: string;
  email: string;
  industry: string;
  use_case?: string;
  expected_volume: string;
  coupon_code?: string;
  nda_consent: boolean;
  status?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
