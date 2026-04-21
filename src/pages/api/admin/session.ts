import type { APIRoute } from "astro";
import { getAstroUser } from "@qdaria/auth/adapters/astro";
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
  const user = ctx.locals.user ?? (await getAstroUser(ctx).catch(() => null));
  if (!user) return json({ user: null });
  const email = user.email ?? "";
  const role =
    teamEmailRoles[email.toLowerCase()] ?? teamEmailRoles[email] ?? "investor";
  return json({
    user: {
      id: user.id,
      name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? email,
      email,
      image: user.user_metadata?.avatar_url ?? null,
      role,
    },
  });
};
