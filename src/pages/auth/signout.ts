import type { APIContext } from "astro";
import { supabaseAstro } from "@qdaria/auth/adapters/astro";

export const POST = async (ctx: APIContext): Promise<Response> => {
  const sb = supabaseAstro(ctx);
  await sb.auth.signOut();
  return ctx.redirect("/", 303);
};

export const GET = async (ctx: APIContext): Promise<Response> => {
  const sb = supabaseAstro(ctx);
  await sb.auth.signOut();
  return ctx.redirect("/", 303);
};
