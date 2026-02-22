import { createClient } from '@supabase/supabase-js';
import type { UserRole } from '../../types/admin';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Admin Supabase client using the service role key.
 * Bypasses RLS - use only in server-side code.
 */
export function getAdminSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Look up a user's role by email from user_profiles.
 * Falls back to 'investor' if not found.
 */
export async function checkUserRole(email: string): Promise<UserRole> {
  const supabase = getAdminSupabase();
  if (!supabase) return 'investor';

  const { data, error } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('email', email)
    .single();

  if (error || !data) return 'investor';
  return (data.role as UserRole) || 'investor';
}

/**
 * Upload a contract file to the contracts storage bucket.
 * Files are stored under {teamMemberId}/{type}/{filename}.
 */
export async function uploadContract(
  file: File,
  teamMemberId: string,
  type: string
): Promise<string> {
  const supabase = getAdminSupabase();
  if (!supabase) throw new Error('Supabase not configured');

  const filePath = `${teamMemberId}/${type}/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from('contracts')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;
  return filePath;
}

/**
 * Ensure a user_profile exists for the given email with the specified role.
 * Used during sign-in callback for whitelisted team emails.
 */
export async function ensureUserProfile(
  userId: string,
  email: string,
  name: string,
  role: UserRole
): Promise<void> {
  const supabase = getAdminSupabase();
  if (!supabase) return;

  const { data: existing } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    await supabase
      .from('user_profiles')
      .update({ role, full_name: name, updated_at: new Date().toISOString() })
      .eq('email', email);
  } else {
    await supabase.from('user_profiles').insert({
      id: userId,
      email,
      full_name: name,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
}
