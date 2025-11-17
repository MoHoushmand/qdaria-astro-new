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
    const session = await getSession(context.request);

    if (!session) {
      // Redirect to login page with callback URL
      return context.redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }

  return next();
});
