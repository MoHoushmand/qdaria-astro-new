import { defineMiddleware } from 'astro:middleware';
import { supabaseAstro } from '@qdaria/auth/adapters/astro';
import type { AuthUser } from '@qdaria/auth/types';

const AUTH_TIMEOUT_MS = 3000;

const withTimeout = <T>(p: Promise<T>, fallback: T): Promise<T> =>
  Promise.race([p, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), AUTH_TIMEOUT_MS))]);

const hasSupabaseCookie = (cookieHeader: string | null): boolean =>
  !!cookieHeader && /(?:^|;\s*)sb-[^=]+-auth-token/.test(cookieHeader);

const hasAuthAstroCookie = (cookieHeader: string | null): boolean =>
  !!cookieHeader && /(?:^|;\s*)(?:__Secure-)?authjs\.session-token/.test(cookieHeader);

const getSupabaseUser = async (context: Parameters<Parameters<typeof defineMiddleware>[0]>[0]): Promise<AuthUser | null> => {
  try {
    const sb = supabaseAstro(context);
    const { data } = await withTimeout(sb.auth.getUser(), { data: { user: null } } as Awaited<ReturnType<typeof sb.auth.getUser>>);
    return data.user ?? null;
  } catch {
    return null;
  }
};

const getAuthAstroSession = async (request: Request) => {
  try {
    const { getSession } = await import('auth-astro/server');
    return await withTimeout(getSession(request), null);
  } catch {
    return null;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const cookieHeader = context.request.headers.get('cookie');

  context.locals.user = null;
  if (hasSupabaseCookie(cookieHeader)) {
    context.locals.user = await getSupabaseUser(context);
  }

  const isAdminRoute =
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/auth/');
  const protectedInvestRoutes = ['/invest/business-plan', '/invest/pitch', '/invest/whitepaper'];
  const isInvestProtected = protectedInvestRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute) {
    const session = await getAuthAstroSession(context.request);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || (role !== 'admin' && role !== 'employee')) {
      const target = session?.user ? '/admin/login?error=unauthorized' : `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
      return context.redirect(target);
    }
    return next();
  }

  if (isInvestProtected) {
    if (context.locals.user) return next();
    if (hasAuthAstroCookie(cookieHeader)) {
      const session = await getAuthAstroSession(context.request);
      if (session?.user) return next();
    }
    return context.redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  }

  return next();
});
