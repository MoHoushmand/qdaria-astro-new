import { supabase, isSupabaseConfigured } from './client';
import type { User, Session, AuthError } from '@supabase/supabase-js';

/**
 * Authentication result interface
 */
export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * User profile interface
 */
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Register a new user with email and password
 * @param email User email
 * @param password User password
 * @param fullName Optional full name
 * @returns Authentication result with user and session
 */
export async function registerUser(
  email: string,
  password: string,
  fullName?: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      user: null,
      session: null,
      error: {
        message: 'Supabase is not configured',
        name: 'ConfigurationError',
        status: 500,
      } as AuthError,
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${import.meta.env.SITE || 'http://localhost:4321'}/auth/callback`,
      },
    });

    if (error) {
      return { user: null, session: null, error };
    }

    // Create user profile if registration successful
    if (data.user) {
      await createUserProfile(data.user.id, email, fullName);
    }

    return {
      user: data.user,
      session: data.session,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
}

/**
 * Sign in user with email and password
 * @param email User email
 * @param password User password
 * @returns Authentication result with user and session
 */
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      user: null,
      session: null,
      error: {
        message: 'Supabase is not configured',
        name: 'ConfigurationError',
        status: 500,
      } as AuthError,
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      session: data.session,
      error,
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
}

/**
 * Sign out the current user
 * @returns Error if any
 */
export async function logoutUser(): Promise<{ error: AuthError | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      error: {
        message: 'Supabase is not configured',
        name: 'ConfigurationError',
        status: 500,
      } as AuthError,
    };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
}

/**
 * Get current user session
 * @returns Current session or null
 */
export async function getSession(): Promise<Session | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Get current user
 * @returns Current user or null
 */
export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Refresh the current session
 * @returns New session or null
 */
export async function refreshSession(): Promise<Session | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.refreshSession();
    return session;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
}

/**
 * Send password reset email
 * @param email User email
 * @returns Error if any
 */
export async function sendPasswordResetEmail(
  email: string
): Promise<{ error: AuthError | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      error: {
        message: 'Supabase is not configured',
        name: 'ConfigurationError',
        status: 500,
      } as AuthError,
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.SITE || 'http://localhost:4321'}/auth/reset-password`,
    });
    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
}

/**
 * Update user password
 * @param newPassword New password
 * @returns Error if any
 */
export async function updatePassword(
  newPassword: string
): Promise<{ error: AuthError | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      error: {
        message: 'Supabase is not configured',
        name: 'ConfigurationError',
        status: 500,
      } as AuthError,
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  } catch (error) {
    return { error: error as AuthError };
  }
}

/**
 * Create user profile in database
 * @param userId User ID
 * @param email User email
 * @param fullName Optional full name
 * @returns Error if any
 */
async function createUserProfile(
  userId: string,
  email: string,
  fullName?: string
): Promise<{ error: any | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: new Error('Supabase is not configured') };
  }

  try {
    const { error } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: userId,
          email,
          full_name: fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

    return { error };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { error };
  }
}

/**
 * Get user profile
 * @param userId User ID
 * @returns User profile or null
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Update user profile
 * @param userId User ID
 * @param updates Profile updates
 * @returns Error if any
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'email' | 'created_at'>>
): Promise<{ error: any | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: new Error('Supabase is not configured') };
  }

  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    return { error };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error };
  }
}

/**
 * Subscribe to authentication state changes
 * @param callback Callback function
 * @returns Unsubscribe function
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
): () => void {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);

  return () => {
    subscription.unsubscribe();
  };
}
