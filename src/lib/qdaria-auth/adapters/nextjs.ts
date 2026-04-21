import "server-only";
import { cookies as nextCookies, headers as nextHeaders } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient as createSSR, type CookieOptions } from "@supabase/ssr";

const env = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const domain = process.env.AUTH_COOKIE_DOMAIN;
  if (!url || !anonKey) throw new Error("@qdaria/auth: missing Supabase env");
  return { url, anonKey, domain };
};

export const supabaseServer = async () => {
  const { url, anonKey, domain } = env();
  const store = await nextCookies();
  const h = await nextHeaders();
  const isHttps = h.get("x-forwarded-proto") === "https";
  const cookieDomain = isHttps ? domain : undefined;
  return createSSR(url, anonKey, {
    cookies: {
      get: (name: string) => store.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) =>
        store.set({ name, value, ...options, domain: cookieDomain, sameSite: "lax", secure: isHttps }),
      remove: (name: string, options: CookieOptions) =>
        store.set({ name, value: "", ...options, domain: cookieDomain, maxAge: 0 }),
    },
  });
};

export const getSession = async () => {
  const sb = await supabaseServer();
  const { data } = await sb.auth.getSession();
  return data.session;
};

export const getUser = async () => {
  const sb = await supabaseServer();
  const { data } = await sb.auth.getUser();
  return data.user;
};

export const updateSession = async (req: NextRequest) => {
  const { url, anonKey, domain } = env();
  const isHttps = req.nextUrl.protocol === "https:";
  const cookieDomain = isHttps ? domain : undefined;
  const response = NextResponse.next({ request: req });
  const sb = createSSR(url, anonKey, {
    cookies: {
      get: (name: string) => req.cookies.get(name)?.value,
      set: (name: string, value: string, options: CookieOptions) => {
        response.cookies.set({ name, value, ...options, domain: cookieDomain, sameSite: "lax", secure: isHttps });
      },
      remove: (name: string, options: CookieOptions) => {
        response.cookies.set({ name, value: "", ...options, domain: cookieDomain, maxAge: 0 });
      },
    },
  });
  await sb.auth.getUser();
  return response;
};
