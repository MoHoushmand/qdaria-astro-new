import type { APIRoute } from 'astro';
import { logoutUser } from '../../../lib/supabase/auth';
import { isSupabaseConfigured } from '../../../lib/supabase/client';

/**
 * Handle user logout - POST /api/auth/logout
 */
export const POST: APIRoute = async ({ cookies }) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing logout request`);

  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn(`[${requestId}] Supabase not configured`);
      // Still clear cookies even if Supabase is not configured
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Logged out successfully',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Logout from Supabase
    const { error } = await logoutUser();

    if (error) {
      console.error(`[${requestId}] Logout error:`, error);
    }

    // Clear session cookies regardless of Supabase response
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });

    console.log(`[${requestId}] User logged out successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Logged out successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);

    // Clear cookies even on error
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });

    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred during logout',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};
