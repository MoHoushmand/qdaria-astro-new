import type { APIRoute } from "astro";
import { supabaseAstro } from "@qdaria/auth/adapters/astro";

const safeNext = (raw: string | null): string => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

export const GET: APIRoute = async (ctx) => {
  const code = ctx.url.searchParams.get("code");
  const next = safeNext(ctx.url.searchParams.get("next"));
  if (!code) return ctx.redirect("/auth/error?reason=missing_code");
  const sb = supabaseAstro(ctx);
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error)
    return ctx.redirect(
      `/auth/error?reason=${encodeURIComponent(error.message)}`,
    );
  return ctx.redirect(next);
};
