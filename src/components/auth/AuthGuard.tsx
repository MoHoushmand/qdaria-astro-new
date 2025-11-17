import * as React from 'react';
import { useAuth } from './AuthProvider';

/**
 * AuthGuard props
 */
export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  requireEmailVerification?: boolean;
}

/**
 * Default loading fallback
 */
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

/**
 * Default unauthorized fallback
 */
const DefaultUnauthorizedFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4 max-w-md px-4">
      <h1 className="text-2xl font-bold text-foreground">Authentication Required</h1>
      <p className="text-muted-foreground">
        You need to be logged in to access this page.
      </p>
      <div className="space-x-4">
        <a
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Sign In
        </a>
        <a
          href="/auth/register"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Create Account
        </a>
      </div>
    </div>
  </div>
);

/**
 * Email verification required fallback
 */
const EmailVerificationFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4 max-w-md px-4">
      <h1 className="text-2xl font-bold text-foreground">Email Verification Required</h1>
      <p className="text-muted-foreground">
        Please verify your email address to access this page. Check your inbox for a verification link.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        I've Verified My Email
      </button>
    </div>
  </div>
);

/**
 * AuthGuard component
 * Protects routes by checking authentication status
 * Redirects to login page if user is not authenticated
 */
export function AuthGuard({
  children,
  fallback,
  redirectTo = '/auth/login',
  requireEmailVerification = false,
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the intended destination
      const currentPath = window.location.pathname;
      if (currentPath !== redirectTo) {
        sessionStorage.setItem('redirectAfterLogin', currentPath);
      }

      // Set flag to redirect
      setShouldRedirect(true);
    }
  }, [isLoading, isAuthenticated, redirectTo]);

  // Redirect if needed
  React.useEffect(() => {
    if (shouldRedirect) {
      window.location.href = redirectTo;
    }
  }, [shouldRedirect, redirectTo]);

  // Show loading state
  if (isLoading) {
    return fallback || <DefaultLoadingFallback />;
  }

  // Show unauthorized state
  if (!isAuthenticated) {
    return fallback || <DefaultUnauthorizedFallback />;
  }

  // Check email verification if required
  if (requireEmailVerification && user && !user.emailConfirmed) {
    return <EmailVerificationFallback />;
  }

  // Render protected content
  return <>{children}</>;
}

/**
 * Hook to check if user is authenticated
 */
export function useRequireAuth(redirectTo = '/auth/login') {
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      if (currentPath !== redirectTo) {
        sessionStorage.setItem('redirectAfterLogin', currentPath);
      }
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return { isAuthenticated, isLoading };
}
