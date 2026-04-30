import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { getAdminSupabase } from "../../../../../lib/supabase/admin";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const session = await getSession(request);
    if (!session?.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const contractId = params.id;
    if (!contractId) {
      return jsonResponse({ error: "Contract ID is required" }, 400);
    }

    const supabase = getAdminSupabase();
    if (!supabase) {
      return jsonResponse({ error: "Storage not configured" }, 503);
    }

    const { data: contract, error: fetchError } = await supabase
      .from("contracts")
      .select("file_path, file_name, team_members(email)")
      .eq("id", contractId)
      .single();

    if (fetchError || !contract) {
      return jsonResponse({ error: "Contract not found" }, 404);
    }

    const role = (session.user as { role?: string }).role || "investor";
    const sessionEmail = (session.user.email || "").toLowerCase();
    const ownerRecord = (contract as any).team_members;
    const ownerEmail =
      (Array.isArray(ownerRecord)
        ? ownerRecord[0]?.email
        : ownerRecord?.email) || "";
    const ownerEmailLower = ownerEmail.toLowerCase();

    if (role !== "admin" && sessionEmail !== ownerEmailLower) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const { data: signedData, error: signError } = await supabase.storage
      .from("contracts")
      .createSignedUrl((contract as any).file_path, 3600);

    if (signError || !signedData?.signedUrl) {
      console.error("Signed URL error:", signError?.message);
      return jsonResponse({ error: "Failed to generate download link" }, 500);
    }

    return jsonResponse({
      url: signedData.signedUrl,
      file_name: (contract as any).file_name,
    });
  } catch (error) {
    console.error("Contract download error:", error);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
