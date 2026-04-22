import type { APIRoute } from "astro";
import { supabaseAstro } from "../../lib/qdaria-auth/adapters/astro";

const safeNext = (raw: string | null): string => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

const errorRedirect = (ctx: Parameters<APIRoute>[0], reason: string) =>
  ctx.redirect(`/auth/error?reason=${encodeURIComponent(reason)}`);

export const GET: APIRoute = async (ctx) => {
  const code = ctx.url.searchParams.get("code");
  const cookieNext = ctx.cookies.get("sb-next-dest")?.value;
  const next = safeNext(cookieNext ?? ctx.url.searchParams.get("next"));
  const providerError = ctx.url.searchParams.get("error");
  const errorDescription = ctx.url.searchParams.get("error_description");

  if (providerError) {
    return errorRedirect(
      ctx,
      errorDescription
        ? `${providerError}: ${errorDescription}`
        : providerError,
    );
  }
  if (!code) return errorRedirect(ctx, "missing_code");

  try {
    const sb = supabaseAstro(ctx);
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] exchange failed:", error.message);
      return errorRedirect(ctx, error.message);
    }
    ctx.cookies.delete("sb-next-dest", { path: "/" });
    return ctx.redirect(next);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[auth/callback] uncaught:", message);
    return errorRedirect(ctx, `callback_crashed: ${message.slice(0, 180)}`);
  }
};
