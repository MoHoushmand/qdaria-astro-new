import { defineMiddleware } from "astro:middleware";

const AUTH_TIMEOUT_MS = 3000;

const withTimeout = <T>(p: Promise<T>, fallback: T): Promise<T> =>
  Promise.race([
    p,
    new Promise<T>((resolve) =>
      setTimeout(() => resolve(fallback), AUTH_TIMEOUT_MS),
    ),
  ]);

const hasAuthAstroCookie = (cookieHeader: string | null): boolean =>
  !!cookieHeader &&
  /(?:^|;\s*)(?:__Secure-)?authjs\.session-token/.test(cookieHeader);

const getAuthAstroSession = async (request: Request) => {
  try {
    const { getSession } = await import("auth-astro/server");
    return await withTimeout(getSession(request), null);
  } catch {
    return null;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const cookieHeader = context.request.headers.get("cookie");

  context.locals.user = null;

  const isAdminRoute =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !pathname.startsWith("/api/auth/");

  const protectedInvestRoutes = [
    "/invest/business-plan",
    "/invest/pitch",
    "/invest/whitepaper",
  ];
  const isInvestProtected = protectedInvestRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Populate locals.user on every page when a session cookie exists,
  // so Nav.astro can show username/Sign Out site-wide. Cheap: cookie sniff
  // gates the network call.
  if (!isAdminRoute && !isInvestProtected && hasAuthAstroCookie(cookieHeader)) {
    const session = await getAuthAstroSession(context.request);
    if (session?.user) {
      context.locals.user = session.user as unknown as App.Locals["user"];
    }
  }

  if (isAdminRoute) {
    const session = await getAuthAstroSession(context.request);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || (role !== "admin" && role !== "employee")) {
      const target = session?.user
        ? "/admin/login?error=unauthorized"
        : `/admin/login?callbackUrl=${encodeURIComponent(pathname)}`;
      return context.redirect(target);
    }
    context.locals.user = session.user as unknown as App.Locals["user"];
    return next();
  }

  if (isInvestProtected) {
    if (hasAuthAstroCookie(cookieHeader)) {
      const session = await getAuthAstroSession(context.request);
      if (session?.user) {
        context.locals.user = session.user as unknown as App.Locals["user"];
        return next();
      }
    }
    return context.redirect(
      `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`,
    );
  }

  return next();
});
