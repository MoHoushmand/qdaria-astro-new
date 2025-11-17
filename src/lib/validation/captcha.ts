/**
 * Cloudflare Turnstile CAPTCHA verification utilities
 * @module lib/validation/captcha
 */

/**
 * Verify Turnstile token with Cloudflare API
 * @param token - The Turnstile token from the client
 * @param remoteIP - The client's IP address (optional but recommended)
 * @returns Promise resolving to verification result
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIP?: string
): Promise<{ success: boolean; error?: string; 'error-codes'?: string[] }> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return {
      success: false,
      error: 'CAPTCHA verification not configured',
    };
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIP) {
      formData.append('remoteip', remoteIP);
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      console.error('Turnstile API error:', response.status);
      return {
        success: false,
        error: 'CAPTCHA verification service unavailable',
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return {
      success: false,
      error: 'CAPTCHA verification failed',
    };
  }
}

/**
 * Check if Turnstile is configured
 */
export function isTurnstileConfigured(): boolean {
  return !!(
    import.meta.env.TURNSTILE_SECRET_KEY &&
    import.meta.env.PUBLIC_TURNSTILE_SITE_KEY
  );
}

/**
 * Get error message for Turnstile error codes
 */
export function getTurnstileErrorMessage(errorCodes?: string[]): string {
  if (!errorCodes || errorCodes.length === 0) {
    return 'CAPTCHA verification failed';
  }

  const errorMessages: Record<string, string> = {
    'missing-input-secret': 'CAPTCHA configuration error',
    'invalid-input-secret': 'CAPTCHA configuration error',
    'missing-input-response': 'Please complete the CAPTCHA',
    'invalid-input-response': 'Invalid CAPTCHA response',
    'bad-request': 'Invalid CAPTCHA request',
    'timeout-or-duplicate': 'CAPTCHA expired or already used',
  };

  const firstError = errorCodes[0];
  return errorMessages[firstError] || 'CAPTCHA verification failed';
}
