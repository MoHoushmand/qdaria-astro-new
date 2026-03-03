import type { APIRoute } from 'astro';
import { teamEmailRoles } from '../../../data/admin/team-seed';

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
 * Always tries auth-astro session (works with both OAuth and Credentials providers).
 * Never returns a demo/fake admin in production.
 */
export const GET: APIRoute = async ({ request }) => {
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

  // No session found — return null user
  return json({ user: null });
};
