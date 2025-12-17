import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protected routes - only specific Invest pages
  const protectedRoutes = [
    '/invest/business-plan',
    '/invest/pitch',
    '/invest/whitepaper',
  ];

  // Check if current path matches any protected route
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    // Skip auth check if AUTH_SECRET is not configured (e.g., during build)
    if (!import.meta.env.AUTH_SECRET) {
      console.warn('[Middleware] AUTH_SECRET not configured, skipping auth check');
      return next();
    }

    try {
      const session = await getSession(context.request);

      if (!session) {
        // Redirect to login page with callback URL
        return context.redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    } catch (e) {
      console.warn('[Middleware] Auth session check failed:', e instanceof Error ? e.message : 'Unknown error');
      // Allow access on auth failure to prevent build errors
      return next();
    }
  }

  return next();
});
