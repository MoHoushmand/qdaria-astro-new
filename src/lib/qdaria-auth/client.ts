import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";
import type { AuthClientConfig } from "./types";

let cached: ReturnType<typeof createSSRBrowserClient> | null = null;

export const createBrowserClient = (config?: Partial<AuthClientConfig>) => {
  if (cached) return cached;
  const url =
    config?.url ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined) ??
    (typeof import.meta !== "undefined" ? (import.meta as unknown as { env?: Record<string, string> }).env?.PUBLIC_SUPABASE_URL : undefined);
  const anonKey =
    config?.anonKey ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ??
    (typeof import.meta !== "undefined" ? (import.meta as unknown as { env?: Record<string, string> }).env?.PUBLIC_SUPABASE_ANON_KEY : undefined);
  if (!url || !anonKey) throw new Error("@qdaria/auth: missing SUPABASE_URL or ANON_KEY");
  cached = createSSRBrowserClient(url, anonKey, {
    cookieOptions: {
      domain: config?.cookieDomain ?? (typeof process !== "undefined" ? process.env.AUTH_COOKIE_DOMAIN : undefined),
      sameSite: "lax",
      secure: typeof window !== "undefined" && window.location.protocol === "https:",
    },
  });
  return cached;
};

export const supabaseBrowser = createBrowserClient;
