import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protected routes - only specific Invest pages
  const protectedInvestRoutes = [
    '/invest/business-plan',
    '/invest/pitch',
    '/invest/whitepaper',
  ];

  // Admin routes (except the login page itself)
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isInvestProtected = protectedInvestRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute || isInvestProtected) {
    // No OAuth providers configured — skip auth entirely
    const hasOAuth =
      !!import.meta.env.GITHUB_ID ||
      !!import.meta.env.GOOGLE_ID ||
      !!import.meta.env.LINKEDIN_CLIENT_ID;

    if (!hasOAuth) {
      return next();
    }

    try {
      const { getSession } = await import('auth-astro/server');
      // Timeout: don't let getSession hang forever
      const session = await Promise.race([
        getSession(context.request),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
      ]);

      if (!session) {
        if (!import.meta.env.PROD && isAdminRoute) {
          return next();
        }
        const loginPath = isAdminRoute ? '/admin/login' : '/login';
        return context.redirect(`${loginPath}?callbackUrl=${encodeURIComponent(pathname)}`);
      }

      // For admin routes, verify the user has admin or employee role
      if (isAdminRoute) {
        const role = (session.user as any)?.role;
        if (role !== 'admin' && role !== 'employee') {
          return context.redirect('/admin/login?error=unauthorized');
        }
      }
    } catch {
      // Auth check failed — allow through in non-production
      if (!import.meta.env.PROD) {
        return next();
      }
    }
  }

  return next();
});
