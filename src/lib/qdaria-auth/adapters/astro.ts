/// <reference types="astro/client" />
import { createServerClient as createSSR, type CookieOptions } from "@supabase/ssr";
import type { APIContext, MiddlewareHandler } from "astro";
import { SUPABASE_PROVIDER_MAP, type AuthProvider, type AuthUser } from "../types";

declare global {
  namespace App {
    interface Locals {
      user: AuthUser | null;
    }
  }
}

const readEnv = (locals?: Record<string, unknown>) => {
  const meta = import.meta as unknown as { env: Record<string, string | undefined> };
  const runtimeEnv = (locals?.runtime as { env?: Record<string, string> })?.env;
  const url = runtimeEnv?.PUBLIC_SUPABASE_URL ?? meta.env.PUBLIC_SUPABASE_URL;
  const anonKey = runtimeEnv?.PUBLIC_SUPABASE_ANON_KEY ?? meta.env.PUBLIC_SUPABASE_ANON_KEY;
  const domain = runtimeEnv?.AUTH_COOKIE_DOMAIN ?? meta.env.AUTH_COOKIE_DOMAIN;
  if (!url || !anonKey) throw new Error("@qdaria/auth: missing Supabase env (Astro)");
  return { url, anonKey, domain };
};

export const supabaseAstro = (ctx: APIContext) => {
  const { url, anonKey, domain } = readEnv(ctx.locals as unknown as Record<string, unknown>);
  const isHttps = ctx.url.protocol === "https:";
  const cookieDomain = isHttps ? domain : undefined;
  return createSSR(url, anonKey, {
    cookies: {
      get: (name: string) => ctx.cookies.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) =>
        ctx.cookies.set(name, value, {
          ...options,
          domain: cookieDomain,
          sameSite: "lax",
          secure: isHttps,
          path: options.path ?? "/",
        }),
      remove: (name: string, options: CookieOptions) =>
        ctx.cookies.delete(name, { ...options, domain: cookieDomain, path: options.path ?? "/" }),
    },
  });
};

export const getAstroUser = async (ctx: APIContext) => {
  const sb = supabaseAstro(ctx);
  const { data } = await sb.auth.getUser();
  return data.user;
};

export const getAstroSession = async (ctx: APIContext) => {
  const sb = supabaseAstro(ctx);
  const { data } = await sb.auth.getSession();
  return data.session;
};

const safeNext = (raw: string | null | undefined, fallback = "/"): string => {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
};

export const handleAstroCallback = async (ctx: APIContext): Promise<Response> => {
  const url = new URL(ctx.request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));
  const errorParam = url.searchParams.get("error");
  if (errorParam) return ctx.redirect(`/auth/error?reason=${encodeURIComponent(errorParam)}`);
  if (!code) return ctx.redirect("/auth/error?reason=missing_code");
  const sb = supabaseAstro(ctx);
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error) return ctx.redirect(`/auth/error?reason=${encodeURIComponent(error.message)}`);
  return ctx.redirect(next);
};

export const signOutAstro = async (ctx: APIContext, redirectTo = "/"): Promise<Response> => {
  const sb = supabaseAstro(ctx);
  await sb.auth.signOut();
  return ctx.redirect(redirectTo);
};

const originFromCtx = (ctx: APIContext): string => {
  const forwardedProto = ctx.request.headers.get("x-forwarded-proto");
  const forwardedHost = ctx.request.headers.get("x-forwarded-host");
  if (forwardedProto && forwardedHost) return `${forwardedProto}://${forwardedHost}`;
  return ctx.url.origin;
};

export const startAstroOAuth = async (
  ctx: APIContext,
  provider: Exclude<AuthProvider, "email">,
  redirectTo: string = "/",
): Promise<Response> => {
  const supabaseProvider = SUPABASE_PROVIDER_MAP[provider];
  if (!supabaseProvider) return ctx.redirect(`/auth/error?reason=unsupported_provider`);
  const sb = supabaseAstro(ctx);
  const origin = originFromCtx(ctx);
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(safeNext(redirectTo))}`;
  const { data, error } = await sb.auth.signInWithOAuth({
    provider: supabaseProvider,
    options: { redirectTo: emailRedirectTo },
  });
  if (error || !data?.url) return ctx.redirect(`/auth/error?reason=${encodeURIComponent(error?.message ?? "oauth_failed")}`);
  return ctx.redirect(data.url);
};

export const startAstroMagicLink = async (
  ctx: APIContext,
  email: string,
  redirectTo: string = "/",
): Promise<{ ok: true } | { ok: false; reason: string }> => {
  const sb = supabaseAstro(ctx);
  const origin = originFromCtx(ctx);
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(safeNext(redirectTo))}`;
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo, shouldCreateUser: true },
  });
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
};

export interface AstroAuthGuard {
  matches: (pathname: string) => boolean;
  requireRole?: (email: string | null) => boolean;
  loginPath?: string;
  unauthorizedPath?: string;
}

export const createAstroAuthMiddleware = (
  guards: AstroAuthGuard[],
  options: { timeoutMs?: number } = {},
): MiddlewareHandler => {
  const timeoutMs = options.timeoutMs ?? 3000;
  const withTimeout = <T>(p: Promise<T>, fallback: T): Promise<T> =>
    Promise.race([p, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs))]);
  return async (ctx, next) => {
    const { pathname } = ctx.url;
    ctx.locals.user = null;
    const cookieHeader = ctx.request.headers.get("cookie") ?? "";
    const hasSessionCookie = /(?:^|;\s*)sb-[^=]+-auth-token/.test(cookieHeader);
    if (hasSessionCookie) {
      try {
        const sb = supabaseAstro(ctx);
        const { data } = await withTimeout(
          sb.auth.getUser(),
          { data: { user: null } } as Awaited<ReturnType<typeof sb.auth.getUser>>,
        );
        ctx.locals.user = data.user ?? null;
      } catch {
        ctx.locals.user = null;
      }
    }
    for (const guard of guards) {
      if (!guard.matches(pathname)) continue;
      const email = ctx.locals.user?.email ?? null;
      if (!email) {
        const loginPath = guard.loginPath ?? "/auth/login";
        const cb = encodeURIComponent(pathname);
        return ctx.redirect(`${loginPath}?next=${cb}`);
      }
      if (guard.requireRole && !guard.requireRole(email)) {
        return ctx.redirect(guard.unauthorizedPath ?? "/auth/error?reason=unauthorized");
      }
    }
    return next();
  };
};
