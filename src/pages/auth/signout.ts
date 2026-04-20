import type { APIRoute } from 'astro';
import { supabaseAstro } from '@qdaria/auth/adapters/astro';

export const POST: APIRoute = async (ctx) => {
  const sb = supabaseAstro(ctx);
  await sb.auth.signOut();
  return ctx.redirect('/', 303);
};

export const GET: APIRoute = async (ctx) => {
  const sb = supabaseAstro(ctx);
  await sb.auth.signOut();
  return ctx.redirect('/', 303);
};
