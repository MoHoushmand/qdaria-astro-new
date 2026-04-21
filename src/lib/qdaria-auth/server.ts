import { createServerClient as createSSRServerClient, type CookieOptions } from "@supabase/ssr";
import type { AuthClientConfig } from "./types";

export interface CookieStore {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
  remove: (name: string, options: CookieOptions) => void;
}

export const createServerClient = (cookies: CookieStore, config?: Partial<AuthClientConfig>) => {
  const url = config?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.PUBLIC_SUPABASE_URL;
  const anonKey = config?.anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("@qdaria/auth: missing SUPABASE_URL or ANON_KEY");
  const domain = config?.cookieDomain ?? process.env.AUTH_COOKIE_DOMAIN;
  return createSSRServerClient(url, anonKey, {
    cookies: {
      get: (name: string) => cookies.get(name),
      set: (name: string, value: string, options: CookieOptions) =>
        cookies.set(name, value, { ...options, domain, sameSite: "lax", secure: true }),
      remove: (name: string, options: CookieOptions) => cookies.remove(name, { ...options, domain }),
    },
  });
};
