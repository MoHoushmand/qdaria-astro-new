import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import LinkedIn from '@auth/core/providers/linkedin';
import { defineConfig } from 'auth-astro';

// Provide a fallback secret for build phase - this MUST be overridden in production
// by setting AUTH_SECRET environment variable
const AUTH_SECRET_FALLBACK = 'build-time-placeholder-secret-do-not-use-in-production';

export default defineConfig({
  // Use env var if available, otherwise fallback for build
  secret: import.meta.env.AUTH_SECRET || AUTH_SECRET_FALLBACK,
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET,
      // Dynamic callback URL - auth.js auto-detects from request when trustHost=true
      // Supports localhost:4321-4329 and production domain
    }),
    Google({
      clientId: import.meta.env.GOOGLE_ID,
      clientSecret: import.meta.env.GOOGLE_SECRET,
      // Dynamic callback URL - auth.js auto-detects from request when trustHost=true
      // Supports localhost:4321-4329 and production domain
    }),
    LinkedIn({
      clientId: import.meta.env.LINKEDIN_CLIENT_ID,
      clientSecret: import.meta.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  // Environment-aware secure cookies
  useSecureCookies: import.meta.env.PROD,
  // Trust host for OAuth redirects
  trustHost: true,
  callbacks: {
    session({ session, token }) {
      // Add user ID to session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    // Handle sign-in errors and CSRF issues
    async signIn({ user, account, profile }) {
      // Allow all sign-ins (add custom validation here if needed)
      return true;
    },
  },
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Simplified cookie configuration (auth-astro handles defaults well)
  // Removed custom cookie config to use auth.js defaults which handle CSRF better
});
