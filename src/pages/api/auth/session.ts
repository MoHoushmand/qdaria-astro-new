import type { APIRoute } from 'astro';
import { getSession, getCurrentUser } from '../../../lib/supabase/auth';
import { isSupabaseConfigured } from '../../../lib/supabase/client';

/**
 * Get current session - GET /api/auth/session
 */
export const GET: APIRoute = async () => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Checking session`);

  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn(`[${requestId}] Supabase not configured`);
      return new Response(
        JSON.stringify({
          authenticated: false,
          user: null,
          session: null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get current session
    const session = await getSession();
    const user = await getCurrentUser();

    if (!session || !user) {
      console.log(`[${requestId}] No active session`);
      return new Response(
        JSON.stringify({
          authenticated: false,
          user: null,
          session: null,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${requestId}] Active session for user: ${user.id}`);

    return new Response(
      JSON.stringify({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          emailConfirmed: user.email_confirmed_at !== null,
        },
        session: {
          expiresAt: session.expires_at,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

/**
 * Handle OPTIONS for CORS preflight
 */
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};
