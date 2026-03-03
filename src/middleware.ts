import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protected routes - only specific Invest pages
  const protectedInvestRoutes = [
    '/invest/business-plan',
    '/invest/pitch',
    '/invest/whitepaper',
  ];

  // Admin routes (except login page and auth API routes)
  const isAdminRoute =
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/auth/');
  const isInvestProtected = protectedInvestRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute || isInvestProtected) {
    try {
      const { getSession } = await import('auth-astro/server');
      // Timeout: don't let getSession hang forever
      const session = await Promise.race([
        getSession(context.request),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
      ]);

      if (!session?.user) {
        // No session — redirect to login (dev bypass removed for security)
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
      // Auth check failed — redirect to login
      const loginPath = isAdminRoute ? '/admin/login' : '/login';
      return context.redirect(`${loginPath}?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }

  return next();
});
