import type { APIRoute } from 'astro';
import { getAdminSupabase } from '../../../../lib/supabase/admin';
import { teamMembersSeed } from '../../../../data/admin/team-seed';
import type { TeamMember } from '../../../../types/admin';

/**
 * GET /api/admin/team
 * Returns team members list. If ?id=<id> is provided, returns a single member.
 * Falls back to seed data when Supabase is not configured.
 */
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('id');

    const supabase = getAdminSupabase();

    if (supabase) {
      // --- Supabase available ---
      if (memberId) {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('id', memberId)
          .single();

        if (error || !data) {
          return jsonResponse({ member: null }, 404);
        }
        return jsonResponse({ member: data });
      }

      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase team fetch error:', error.message);
        return fallbackResponse(memberId);
      }

      return jsonResponse({ members: data || [] });
    }

    // --- Fallback to seed data ---
    return fallbackResponse(memberId);
  } catch (error) {
    console.error('Team API error:', error);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
};

function fallbackResponse(memberId: string | null) {
  const now = new Date().toISOString();
  const seeded: TeamMember[] = teamMembersSeed.map((m, i) => ({
    ...m,
    id: `seed-${i}`,
    created_at: now,
    updated_at: now,
  }));

  if (memberId) {
    const member = seeded.find((m) => m.id === memberId) || null;
    return jsonResponse({ member }, member ? 200 : 404);
  }

  return jsonResponse({ members: seeded });
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
