import type { APIRoute } from 'astro';
import { teamEmailRoles, teamMembersSeed } from '../../../data/admin/team-seed';

function demoAdminResponse() {
  const ceo = teamMembersSeed.find((m) => m.role === 'admin') || teamMembersSeed[0];
  return json({
    user: {
      id: 'dev-admin',
      name: ceo.name,
      email: ceo.email,
      image: null,
      role: 'admin',
    },
    dev: true,
  });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

/**
 * GET /api/admin/session
 *
 * If OAuth providers are configured, tries auth-astro session (with timeout).
 * Otherwise returns demo admin user so the dashboard is usable without OAuth.
 */
export const GET: APIRoute = async ({ request }) => {
  // Check if any OAuth provider is actually configured
  const hasOAuth =
    !!import.meta.env.GITHUB_ID ||
    !!import.meta.env.GOOGLE_ID ||
    !!import.meta.env.LINKEDIN_CLIENT_ID;

  if (!hasOAuth) {
    // No OAuth configured — return demo user immediately, no hanging
    return demoAdminResponse();
  }

  // OAuth is configured — try to get session with a safety timeout
  try {
    const { getSession } = await import('auth-astro/server');
    const session = await Promise.race([
      getSession(request),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);

    if (session?.user) {
      const email = session.user.email || '';
      const role = (session.user as any).role || teamEmailRoles[email] || 'investor';
      return json({
        user: {
          id: (session.user as any).id || email,
          name: session.user.name || email,
          email,
          image: session.user.image || null,
          role,
        },
      });
    }
  } catch {
    // getSession failed
  }

  // Fallback: no session found
  return import.meta.env.PROD ? json({ user: null }) : demoAdminResponse();
};
