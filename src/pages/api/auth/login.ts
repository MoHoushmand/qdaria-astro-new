import type { APIRoute } from 'astro';
import { loginUser } from '../../../lib/supabase/auth';
import { loginSchema } from '../../../lib/validation/auth';
import { isSupabaseConfigured } from '../../../lib/supabase/client';

/**
 * Rate limiting configuration
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 login attempts per minute

/**
 * Check rate limit for IP address
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Extract client IP from request headers
 */
function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

/**
 * Handle user login - POST /api/auth/login
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing login request`);

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

    // Check rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.log(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({
          error: 'Too many login attempts. Please try again in a minute.',
          code: 'RATE_LIMIT_EXCEEDED',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.error(`[${requestId}] Invalid JSON payload:`, error);
      return new Response(
        JSON.stringify({
          error: 'Invalid request format',
          code: 'INVALID_JSON',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate form data
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      console.log(`[${requestId}] Validation failed:`, validationResult.error.flatten());
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = validationResult.data;
    console.log(`[${requestId}] Authenticating user: ${data.email}`);

    // Attempt login
    const { user, session, error } = await loginUser(data.email, data.password);

    if (error || !user || !session) {
      console.error(`[${requestId}] Login error:`, error);
      return new Response(
        JSON.stringify({
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${requestId}] User logged in successfully: ${user.id}`);

    // Set session cookies
    const maxAge = data.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day

    cookies.set('sb-access-token', session.access_token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge,
    });

    cookies.set('sb-refresh-token', session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          emailConfirmed: user.email_confirmed_at !== null,
        },
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
        error: 'An unexpected error occurred. Please try again later.',
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
