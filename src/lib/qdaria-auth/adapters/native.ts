import { createClient } from "@supabase/supabase-js";
import type { AuthProvider } from "../types";
import { SUPABASE_PROVIDER_MAP } from "../types";

export interface NativeAuthConfig {
  url: string;
  anonKey: string;
  redirectScheme: string;
}

export const createNativeClient = (config: NativeAuthConfig) =>
  createClient(config.url, config.anonKey, {
    auth: { flowType: "pkce", detectSessionInUrl: false, persistSession: true },
  });

export const buildOAuthUrl = async (
  client: ReturnType<typeof createNativeClient>,
  provider: Exclude<AuthProvider, "email">,
  redirectScheme: string,
): Promise<string> => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: SUPABASE_PROVIDER_MAP[provider],
    options: { redirectTo: `${redirectScheme}://auth/callback`, skipBrowserRedirect: true },
  });
  if (error) throw error;
  if (!data.url) throw new Error("Supabase did not return an OAuth URL");
  return data.url;
};

export const exchangeCodeForSession = async (
  client: ReturnType<typeof createNativeClient>,
  callbackUrl: string,
) => {
  const url = new URL(callbackUrl);
  const code = url.searchParams.get("code");
  if (!code) throw new Error("No `code` in callback URL");
  return client.auth.exchangeCodeForSession(code);
};
