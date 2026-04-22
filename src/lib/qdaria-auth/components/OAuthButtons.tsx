import { useState } from "react";
import { createBrowserClient } from "../client";
import { enabledProviders } from "../providers";
import { SUPABASE_PROVIDER_MAP, type AuthProvider } from "../types";

interface OAuthButtonsProps {
  redirectTo?: string;
  className?: string;
}

const Spinner = () => (
  <svg
    className="h-[18px] w-[18px] animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
    />
  </svg>
);

const ProviderIcon = ({ id }: { id: AuthProvider }) => {
  switch (id) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      );
    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.26 5.68.41.35.77 1.05.77 2.11 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
      );
    case "linkedin_oidc":
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          fill="#0A66C2"
        >
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z" />
        </svg>
      );
    case "apple":
      return (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M17.05 12.04c-.02-2.33 1.9-3.45 1.99-3.5-1.08-1.58-2.76-1.8-3.37-1.82-1.43-.15-2.8.84-3.53.84-.74 0-1.86-.82-3.06-.8-1.57.02-3.02.91-3.83 2.32-1.64 2.84-.42 7.04 1.17 9.35.78 1.13 1.71 2.4 2.91 2.36 1.17-.05 1.61-.76 3.03-.76 1.41 0 1.81.76 3.04.74 1.26-.02 2.06-1.15 2.83-2.29.89-1.32 1.26-2.6 1.28-2.66-.03-.01-2.45-.94-2.48-3.78zM14.77 5.15c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.73 1.4-.6.69-1.12 1.8-.98 2.86 1.04.08 2.11-.53 2.75-1.32z" />
        </svg>
      );
    default:
      return null;
  }
};

const PROVIDER_DISPLAY: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  linkedin_oidc: "LinkedIn",
  apple: "Apple",
};

const BASE_BUTTON =
  "w-full inline-flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

const NEUTRAL_BUTTON =
  "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700";

const APPLE_BUTTON =
  "border-black bg-black text-white hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100";

export const OAuthButtons = ({
  redirectTo = "/dashboard",
  className,
}: OAuthButtonsProps) => {
  const sb = createBrowserClient();
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(
    null,
  );

  const handleClick = async (provider: AuthProvider) => {
    if (provider === "email") return;
    if (loadingProvider) return;
    setLoadingProvider(provider);
    try {
      const supabaseProvider =
        SUPABASE_PROVIDER_MAP[provider as Exclude<AuthProvider, "email">];
      const isHttps = window.location.protocol === "https:";
      document.cookie = `sb-next-dest=${encodeURIComponent(redirectTo)}; path=/; max-age=600; SameSite=Lax${isHttps ? "; Secure" : ""}`;
      await sb.auth.signInWithOAuth({
        provider: supabaseProvider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      setLoadingProvider(null);
      throw err;
    }
  };

  return (
    <div className={className}>
      {enabledProviders()
        .filter((p) => p.id !== "email")
        .map((p) => {
          const name = PROVIDER_DISPLAY[p.id] ?? p.id;
          const isLoading = loadingProvider === p.id;
          const disabled = loadingProvider !== null;
          const style = p.id === "apple" ? APPLE_BUTTON : NEUTRAL_BUTTON;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleClick(p.id)}
              data-provider={p.id}
              aria-label={`Sign in with ${name}`}
              aria-busy={isLoading}
              disabled={disabled}
              className={`${BASE_BUTTON} ${style}`}
            >
              {isLoading ? <Spinner /> : <ProviderIcon id={p.id} />}
              <span>
                {isLoading
                  ? `Redirecting to ${name}...`
                  : `Continue with ${name}`}
              </span>
            </button>
          );
        })}
    </div>
  );
};
