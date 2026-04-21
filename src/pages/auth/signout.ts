import type { APIContext } from "astro";
import { supabaseAstro } from "../../lib/qdaria-auth/adapters/astro";

const signOutSafe = async (ctx: APIContext): Promise<Response> => {
  try {
    const sb = supabaseAstro(ctx);
    await sb.auth.signOut();
  } catch {
    // No active session, missing env, or Supabase unreachable; still redirect home.
  }
  return ctx.redirect("/", 303);
};

export const POST = (ctx: APIContext): Promise<Response> => signOutSafe(ctx);
export const GET = (ctx: APIContext): Promise<Response> => signOutSafe(ctx);
