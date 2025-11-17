import type { APIRoute } from 'astro';
import { registerUser } from '../../../lib/supabase/auth';
import { registerSchema } from '../../../lib/validation/auth';
import { isSupabaseConfigured } from '../../../lib/supabase/client';

/**
 * Rate limiting configuration
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 registration attempts per minute

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
 * Handle user registration - POST /api/auth/register
 */
export const POST: APIRoute = async ({ request }) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing registration request`);

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
          error: 'Too many registration attempts. Please try again in a minute.',
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
    const validationResult = registerSchema.safeParse(body);
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
    console.log(`[${requestId}] Registering user: ${data.email}`);

    // Register user
    const { user, session, error } = await registerUser(
      data.email,
      data.password,
      data.fullName
    );

    if (error) {
      console.error(`[${requestId}] Registration error:`, error);

      // Handle specific error cases
      if (error.message.includes('already registered')) {
        return new Response(
          JSON.stringify({
            error: 'This email is already registered. Please login instead.',
            code: 'USER_EXISTS',
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          error: error.message || 'Registration failed. Please try again.',
          code: 'REGISTRATION_ERROR',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!user) {
      console.error(`[${requestId}] No user returned from registration`);
      return new Response(
        JSON.stringify({
          error: 'Registration incomplete. Please try again.',
          code: 'REGISTRATION_INCOMPLETE',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${requestId}] User registered successfully: ${user.id}`);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        user: {
          id: user.id,
          email: user.email,
          emailConfirmed: user.email_confirmed_at !== null,
        },
        session: session ? {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresAt: session.expires_at,
        } : null,
      }),
      {
        status: 201,
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
