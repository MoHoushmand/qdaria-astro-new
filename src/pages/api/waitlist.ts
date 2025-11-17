import type { APIRoute } from 'astro';
import { supabase, type WaitlistSubmission } from '../../lib/supabase/client';
import { waitlistSchema } from '../../lib/validation/waitlist';
import { sendUserConfirmation, sendSalesAlert, isEmailServiceReady, getEmailServiceStatus } from '../../lib/email/sendgrid';
import { z } from 'zod';

// Note: API routes work in dev mode and with server adapters (Netlify/Vercel)
// Static builds will prerender the GET endpoint for health checks

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 submissions per minute per IP

// Environment variable validation
const ENV_VALIDATED = {
  supabase: Boolean(import.meta.env.SUPABASE_URL && import.meta.env.SUPABASE_ANON_KEY),
  sendgrid: Boolean(import.meta.env.SENDGRID_API_KEY),
};

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
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') || // Cloudflare
         'unknown';
}

/**
 * Health check endpoint - GET /api/waitlist
 */
export const GET: APIRoute = async () => {
  const status = getEmailServiceStatus();

  return new Response(
    JSON.stringify({
      status: 'ok',
      service: 'waitlist-api',
      version: '1.0.0',
      environment: {
        supabase: ENV_VALIDATED.supabase ? 'configured' : 'not configured',
        email: status.configured ? 'configured' : 'not configured',
      },
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
};

/**
 * Handle waitlist form submission - POST /api/waitlist
 */
export const POST: APIRoute = async ({ request }) => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing waitlist submission`);

  try {
    // Check rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      console.log(`[${requestId}] Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again in a minute.',
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
    const validationResult = waitlistSchema.safeParse(body);
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
    console.log(`[${requestId}] Validated data for ${data.email}`);

    // Check if Supabase is configured
    if (!ENV_VALIDATED.supabase) {
      console.warn(`[${requestId}] Supabase not configured - returning mock success`);

      // Send emails if configured
      if (isEmailServiceReady()) {
        const emailData = {
          fullName: data.fullName,
          companyName: data.companyName,
          email: data.email,
          industry: data.industry,
          expectedVolume: data.expectedVolume,
          useCase: data.useCase,
          couponCode: data.couponCode,
          submissionId: requestId,
        };

        // Send emails asynchronously
        Promise.all([
          sendUserConfirmation(emailData),
          sendSalesAlert(emailData),
        ]).catch((error) => {
          console.error(`[${requestId}] Error sending emails:`, error);
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Successfully joined the waitlist! We will contact you within 48 hours.',
          submissionId: requestId,
          mode: 'demo',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract metadata
    const referrer = request.headers.get('referer') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    // Prepare data for database (exclude coupon_code if not in schema)
    const insertData: any = {
      full_name: data.fullName,
      company_name: data.companyName,
      email: data.email.toLowerCase(),
      industry: data.industry,
      expected_volume: data.expectedVolume,
      use_case: data.useCase || undefined,
      // coupon_code: data.couponCode || undefined, // TODO: Add column to database
      nda_consent: data.ndaConsent,
      status: 'pending',
      referrer: data.referrer || referrer,
      utm_source: data.utmSource,
      utm_medium: data.utmMedium,
      utm_campaign: data.utmCampaign,
      ip_address: clientIP !== 'unknown' ? clientIP : undefined,
      user_agent: userAgent,
    };

    // Insert into Supabase
    const { data: submission, error: dbError } = await supabase
      .from('waitlist')
      .insert([insertData])
      .select()
      .single();

    if (dbError) {
      // Handle duplicate email
      if (dbError.code === '23505') {
        console.log(`[${requestId}] Duplicate email submission: ${data.email}`);
        return new Response(
          JSON.stringify({
            error: 'This email has already been registered for the waitlist.',
            code: 'DUPLICATE_EMAIL',
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.error(`[${requestId}] Database error:`, dbError);
      return new Response(
        JSON.stringify({
          error: 'Failed to save your submission. Please try again or contact mo@qdaria.com',
          code: 'DATABASE_ERROR',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!submission) {
      console.error(`[${requestId}] No submission data returned from database`);
      return new Response(
        JSON.stringify({
          error: 'Submission incomplete. Please try again.',
          code: 'SUBMISSION_INCOMPLETE',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[${requestId}] Successfully saved submission ${submission.id}`);

    // Send emails (async, don't wait for completion)
    if (isEmailServiceReady()) {
      const emailData = {
        fullName: data.fullName,
        companyName: data.companyName,
        email: data.email,
        industry: data.industry,
        expectedVolume: data.expectedVolume,
        useCase: data.useCase,
        couponCode: data.couponCode,
        submissionId: submission.id,
      };

      Promise.all([
        sendUserConfirmation(emailData),
        sendSalesAlert(emailData),
      ]).catch((error) => {
        console.error(`[${requestId}] Error sending emails:`, error);
        // Don't fail the request if emails fail
      });
    } else {
      console.warn(`[${requestId}] Email service not configured - skipping emails`);
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully joined the waitlist! We will contact you within 48 hours.',
        submissionId: submission.id,
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
        error: 'An unexpected error occurred. Please try again later or contact sales@qdaria.com',
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
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};