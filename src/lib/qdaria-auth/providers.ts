import type { AuthProvider } from "./types";

interface ProviderMeta {
  id: AuthProvider;
  label: string;
  enabled: boolean;
  scopes?: string;
}

const isEnabled = (envVar: string): boolean => {
  if (typeof process === "undefined") return true;
  const v = process.env[envVar];
  return v === undefined || v === "true" || v === "1";
};

export const providers: ProviderMeta[] = [
  { id: "google", label: "Continue with Google", enabled: true, scopes: "openid email profile" },
  { id: "github", label: "Continue with GitHub", enabled: true, scopes: "read:user user:email" },
  { id: "linkedin_oidc", label: "Continue with LinkedIn", enabled: true, scopes: "openid email profile" },
  { id: "apple", label: "Continue with Apple", enabled: isEnabled("AUTH_APPLE_ENABLED"), scopes: "name email" },
  { id: "email", label: "Continue with email", enabled: true },
];

export const enabledProviders = (): ProviderMeta[] => providers.filter((p) => p.enabled);
