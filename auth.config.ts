import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import LinkedIn from "@auth/core/providers/linkedin";
import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { teamEmailRoles } from "./src/data/admin/team-seed";
import type { UserRole } from "./src/types/admin";

// Provide a fallback secret for build phase - this MUST be overridden in production
// by setting AUTH_SECRET environment variable
const AUTH_SECRET_FALLBACK =
  "build-time-placeholder-secret-do-not-use-in-production";

type StaffEntry = {
  passwordHash: string;
  name: string;
  email: string;
  role: "admin" | "employee";
};

let _staffCache: Record<string, StaffEntry> | null = null;

/**
 * Parse STAFF_CREDENTIALS_JSON once at first lookup.
 * The env var is a JSON object keyed by username; each value carries a
 * bcrypt hash plus display metadata. Fails loud if missing or malformed.
 */
function loadStaffCredentials(): Record<string, StaffEntry> {
  if (_staffCache) return _staffCache;
  const raw = process.env.STAFF_CREDENTIALS_JSON;
  if (!raw) {
    throw new Error(
      "STAFF_CREDENTIALS_JSON is not set; staff credentials provider cannot authorize logins.",
    );
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `STAFF_CREDENTIALS_JSON is not valid JSON: ${(err as Error).message}`,
    );
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("STAFF_CREDENTIALS_JSON must be a JSON object keyed by username.");
  }
  for (const [username, entry] of Object.entries(parsed as Record<string, unknown>)) {
    const e = entry as Partial<StaffEntry> | null;
    if (
      !e ||
      typeof e.passwordHash !== "string" ||
      typeof e.name !== "string" ||
      typeof e.email !== "string" ||
      (e.role !== "admin" && e.role !== "employee")
    ) {
      throw new Error(
        `STAFF_CREDENTIALS_JSON entry for ${username} is missing required fields (passwordHash, name, email, role).`,
      );
    }
  }
  _staffCache = parsed as Record<string, StaffEntry>;
  return _staffCache;
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getUserRole(email: string): Promise<UserRole> {
  // Check hardcoded team whitelist first (fast path)
  if (email in teamEmailRoles) return teamEmailRoles[email];

  // Then check database
  const supabase = getSupabaseAdmin();
  if (!supabase) return "investor";
  const { data } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("email", email)
    .single();
  return (data?.role as UserRole) || "investor";
}

// Build providers list — only include OAuth providers when env vars are set
const providers: any[] = [];

if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  );
}

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET) {
  providers.push(
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  );
}

// Credentials provider always available — this is the primary login method
providers.push(
  Credentials({
    name: "QDaria Staff",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const username = credentials?.username as string;
      const password = credentials?.password as string;
      if (!username || !password) return null;

      const staff = loadStaffCredentials()[username];
      if (!staff) return null;

      const ok = await bcrypt.compare(password, staff.passwordHash);
      if (!ok) return null;

      return {
        id: `staff-${username}`,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      };
    },
  }),
);

export default defineConfig({
  // Use env var if available, otherwise fallback for build
  secret: process.env.AUTH_SECRET || AUTH_SECRET_FALLBACK,
  providers,
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
            .from("user_profiles")
            .select("id")
            .eq("email", user.email)
            .single();

          if (!existing) {
            await supabase.from("user_profiles").insert({
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
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
