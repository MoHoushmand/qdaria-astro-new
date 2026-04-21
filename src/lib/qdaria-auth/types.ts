import type { Session, User, Provider as SupabaseProvider } from "@supabase/supabase-js";

export type AuthProvider = "google" | "github" | "linkedin_oidc" | "apple" | "email";
export type AuthSession = Session;
export type AuthUser = User;

export interface AuthClientConfig {
  url: string;
  anonKey: string;
  cookieDomain?: string;
}

export interface OAuthSignInOptions {
  provider: AuthProvider;
  redirectTo?: string;
  scopes?: string;
}

export const SUPABASE_PROVIDER_MAP: Record<Exclude<AuthProvider, "email">, SupabaseProvider> = {
  google: "google",
  github: "github",
  linkedin_oidc: "linkedin_oidc",
  apple: "apple",
};
