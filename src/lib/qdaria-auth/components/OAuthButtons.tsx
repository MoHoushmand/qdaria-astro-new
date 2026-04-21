import { createBrowserClient } from "../client";
import { enabledProviders } from "../providers";
import { SUPABASE_PROVIDER_MAP, type AuthProvider } from "../types";

interface OAuthButtonsProps {
  redirectTo?: string;
  className?: string;
}

export const OAuthButtons = ({ redirectTo = "/dashboard", className }: OAuthButtonsProps) => {
  const sb = createBrowserClient();
  const handleClick = async (provider: AuthProvider) => {
    if (provider === "email") return;
    const supabaseProvider = SUPABASE_PROVIDER_MAP[provider as Exclude<AuthProvider, "email">];
    await sb.auth.signInWithOAuth({
      provider: supabaseProvider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
  };
  return (
    <div className={className}>
      {enabledProviders()
        .filter((p) => p.id !== "email")
        .map((p) => (
          <button key={p.id} type="button" onClick={() => handleClick(p.id)} data-provider={p.id}>
            {p.label}
          </button>
        ))}
    </div>
  );
};
