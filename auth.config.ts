import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import LinkedIn from "@auth/core/providers/linkedin";
import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";
import { createClient } from "@supabase/supabase-js";
import { teamEmailRoles } from "./src/data/admin/team-seed";
import type { UserRole } from "./src/types/admin";

// Provide a fallback secret for build phase - this MUST be overridden in production
// by setting AUTH_SECRET environment variable
const AUTH_SECRET_FALLBACK =
  "build-time-placeholder-secret-do-not-use-in-production";

/**
 * Per-employee credentials for staff login.
 * Username = email prefix (before @qdaria.com). Password is unique per employee.
 */
const staffCredentials: Record<
  string,
  { password: string; name: string; email: string; role: "admin" | "employee" }
> = {
  "daniel.mo.houshmand": {
    password: "QD-ceo-Mh2026!",
    name: "Daniel Mo Houshmand",
    email: "daniel.mo.houshmand@qdaria.com",
    role: "admin",
  },
  "gaspar.alvarado": {
    password: "QD-fin-Ga2026!",
    name: "Gaspar Alvarado",
    email: "gaspar.alvarado@qdaria.com",
    role: "employee",
  },
  "sharareh.panahi": {
    password: "QD-legal-Sp2026!",
    name: "Sharareh M. Shariat Panahi",
    email: "sharareh.panahi@qdaria.com",
    role: "admin",
  },
  "caroline.woie": {
    password: "QD-content-Cw2026!",
    name: "Caroline Woie",
    email: "caroline.woie@qdaria.com",
    role: "employee",
  },
  "rajesh.chavan": {
    password: "QD-strat-Rc2026!",
    name: "Rajesh Chavan",
    email: "rajesh.chavan@qdaria.com",
    role: "employee",
  },
  "nick.saaf": {
    password: "QD-sales-Ns2026!",
    name: "Nick Saaf",
    email: "nick.saaf@qdaria.com",
    role: "employee",
  },
  "fredrik.stubberud": {
    password: "QD-eng-Fs2026!",
    name: "Fredrik Krey Stubberud",
    email: "fredrik.stubberud@qdaria.com",
    role: "employee",
  },
  "yulia.ginzburg": {
    password: "QD-data-Yg2026!",
    name: "Yulia Ginzburg",
    email: "yulia.ginzburg@qdaria.com",
    role: "employee",
  },
  "john.kristiansen": {
    password: "QD-biz-Jk2026!",
    name: "John Kristiansen",
    email: "john.kristiansen@qdaria.com",
    role: "employee",
  },
  "nils.gronvold": {
    password: "QD-culture-Ng2026!",
    name: "Nils Bjelland Gronvold",
    email: "nils.gronvold@qdaria.com",
    role: "employee",
  },
  "lindsay.sanner": {
    password: "QD-csr-Ls2026!",
    name: "Lindsay Sanner",
    email: "lindsay.sanner@qdaria.com",
    role: "employee",
  },
  "lillian.kristiansen": {
    password: "QD-cadmin-Lk2026!",
    name: "Lillian Kristiansen",
    email: "lillian.kristiansen@qdaria.com",
    role: "admin",
  },
  "daria.houshmand": {
    password: "QD-intern-Dh2026!",
    name: "Daria Houshmand",
    email: "daria.houshmand@qdaria.com",
    role: "employee",
  },
};

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

      const staff = staffCredentials[username];
      if (staff && staff.password === password) {
        return {
          id: `staff-${username}`,
          name: staff.name,
          email: staff.email,
          role: staff.role,
        };
      }

      return null;
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
