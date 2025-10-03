import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Middleware temporarily disabled to fix loading error
  // Authentication will be re-enabled after proper auth-astro configuration

  // const { pathname } = context.url;
  //
  // // Protected routes - all Invest pages
  // const protectedRoutes = [
  //   '/invest/investors',
  //   '/invest/business-plan',
  //   '/pitch',
  //   '/whitepaper',
  // ];
  //
  // // Check if current path matches any protected route
  // const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  //
  // if (isProtected) {
  //   try {
  //     const { getSession } = await import('auth-astro/server');
  //     const session = await getSession(context.request);
  //
  //     if (!session) {
  //       // Redirect to signin page with callback URL
  //       return context.redirect(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  //     }
  //   } catch (error) {
  //     console.error('Auth middleware error:', error);
  //   }
  // }

  return next();
});
