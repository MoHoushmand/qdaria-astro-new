import type { APIRoute } from "astro";
import { teamEmailRoles } from "../../../data/admin/team-seed";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

export const GET: APIRoute = async (ctx) => {
  try {
    const { getSession } = await import("auth-astro/server");
    const session = await getSession(ctx.request);
    if (session?.user) {
      const email = session.user.email ?? "";
      const role =
        (session.user as { role?: string }).role ??
        teamEmailRoles[email.toLowerCase()] ??
        teamEmailRoles[email] ??
        "investor";
      return json({
        user: {
          id: (session.user as { id?: string }).id ?? email,
          name: session.user.name ?? email,
          email,
          image: session.user.image ?? null,
          role,
        },
      });
    }
  } catch {
    // auth-astro unavailable; treat as unauthenticated
  }

  return json({ user: null });
};
