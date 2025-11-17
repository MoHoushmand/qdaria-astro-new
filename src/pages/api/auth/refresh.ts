import type { APIRoute } from 'astro';
import { refreshSession } from '../../../lib/supabase/auth';
import { isSupabaseConfigured } from '../../../lib/supabase/client';

/**
 * Refresh authentication session - POST /api/auth/refresh
 */
export const POST: APIRoute = async ({ cookies }) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing session refresh request`);

  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn(`[${requestId}] Supabase not configured`);
      return new Response(
        JSON.stringify({
          error: 'Authentication service is not available',
          code: 'SERVICE_UNAVAILABLE',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Refresh session
    const session = await refreshSession();

    if (!session) {
      console.log(`[${requestId}] Session refresh failed`);

      // Clear invalid cookies
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });

      return new Response(
        JSON.stringify({
          error: 'Session refresh failed. Please login again.',
          code: 'REFRESH_FAILED',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${requestId}] Session refreshed successfully`);

    // Update session cookies
    cookies.set('sb-access-token', session.access_token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 1 day
    });

    cookies.set('sb-refresh-token', session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Session refreshed successfully',
        session: {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresAt: session.expires_at,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred during session refresh',
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
