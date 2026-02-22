import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import LinkedIn from '@auth/core/providers/linkedin';
import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import { createClient } from '@supabase/supabase-js';
import { teamEmailRoles } from './src/data/admin/team-seed';
import type { UserRole } from './src/types/admin';

// Provide a fallback secret for build phase - this MUST be overridden in production
// by setting AUTH_SECRET environment variable
const AUTH_SECRET_FALLBACK = 'build-time-placeholder-secret-do-not-use-in-production';

function getSupabaseAdmin() {
  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getUserRole(email: string): Promise<UserRole> {
  // Check hardcoded team whitelist first (fast path)
  if (email in teamEmailRoles) return teamEmailRoles[email];

  // Then check database
  const supabase = getSupabaseAdmin();
  if (!supabase) return 'investor';
  const { data } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('email', email)
    .single();
  return (data?.role as UserRole) || 'investor';
}

export default defineConfig({
  // Use env var if available, otherwise fallback for build
  secret: import.meta.env.AUTH_SECRET || AUTH_SECRET_FALLBACK,
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET,
    }),
    Google({
      clientId: import.meta.env.GOOGLE_ID,
      clientSecret: import.meta.env.GOOGLE_SECRET,
    }),
    LinkedIn({
      clientId: import.meta.env.LINKEDIN_CLIENT_ID,
      clientSecret: import.meta.env.LINKEDIN_CLIENT_SECRET,
    }),
    Credentials({
      name: 'QDaria Staff',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (username === 'admin' && password === 'qdaria-admin-2026') {
          return {
            id: 'admin-cred',
            name: 'Daniel Mo Houshmand',
            email: 'daniel.mo.houshmand@qdaria.com',
            role: 'admin',
          };
        }

        if (username === 'qdaria-staff' && password === 'qdaria-2026') {
          return {
            id: 'staff-cred',
            name: 'QDaria Staff',
            email: 'staff@qdaria.com',
            role: 'employee',
          };
        }

        return null;
      },
    }),
  ],
  // Environment-aware secure cookies
  useSecureCookies: import.meta.env.PROD,
  // Trust host for OAuth redirects
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        // Check if role was set by credentials provider
        if ((user as any).role) {
          token.role = (user as any).role;
        } else {
          token.role = await getUserRole(user.email);
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.role) {
        (session.user as any).role = token.role;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user?.email) return true;

      // Auto-create profile for whitelisted team emails
      if (user.email in teamEmailRoles) {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          const role = teamEmailRoles[user.email];
          const { data: existing } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('email', user.email)
            .single();

          if (!existing) {
            await supabase.from('user_profiles').insert({
              id: user.id,
              email: user.email,
              full_name: user.name || user.email,
              role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }
      }
      return true;
    },
  },
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
