import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import {
  getAdminSupabase,
  uploadContract,
} from "../../../../lib/supabase/admin";
import type { Contract } from "../../../../types/admin";

export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);
    if (!session?.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const role = (session.user as { role?: string }).role || "investor";
    const sessionEmail = (session.user.email || "").toLowerCase();

    const url = new URL(request.url);
    const teamMemberIdParam = url.searchParams.get("team_member_id");

    const supabase = getAdminSupabase();
    if (!supabase) {
      return jsonResponse({ contracts: [] });
    }

    let scopeTeamMemberId: string | null = null;

    if (role !== "admin") {
      if (!sessionEmail) {
        return jsonResponse({ contracts: [] });
      }

      const { data: member, error: memberError } = await supabase
        .from("team_members")
        .select("id")
        .ilike("email", sessionEmail)
        .maybeSingle();

      if (memberError || !member) {
        return jsonResponse({ contracts: [] });
      }

      scopeTeamMemberId = member.id;
    }

    let query = supabase
      .from("contracts")
      .select("*, team_members(name)")
      .order("created_at", { ascending: false });

    if (scopeTeamMemberId) {
      query = query.eq("team_member_id", scopeTeamMemberId);
    } else if (teamMemberIdParam) {
      query = query.eq("team_member_id", teamMemberIdParam);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase contracts fetch error:", error.message);
      return jsonResponse({ contracts: [] });
    }

    const contracts: Contract[] = (data || []).map((row: any) => ({
      id: row.id,
      team_member_id: row.team_member_id,
      team_member_name: row.team_members?.name || null,
      title: row.title,
      type: row.type,
      file_path: row.file_path,
      file_name: row.file_name,
      file_size: row.file_size,
      status: row.status,
      signed_date: row.signed_date,
      expiry_date: row.expiry_date,
      created_at: row.created_at,
    }));

    return jsonResponse({ contracts });
  } catch (error) {
    console.error("Contracts API error:", error);
    return jsonResponse({ error: "Internal server error" }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);
    if (!session?.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const role = (session.user as { role?: string }).role || "investor";
    if (role !== "admin") {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const supabase = getAdminSupabase();
    if (!supabase) {
      return jsonResponse({ error: "Storage not configured" }, 503);
    }

    const formData = await request.formData();
    const teamMemberId = formData.get("team_member_id") as string;
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const file = formData.get("file") as File | null;

    if (!teamMemberId || !type || !title || !file) {
      return jsonResponse(
        { error: "Missing required fields: team_member_id, type, title, file" },
        400,
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return jsonResponse(
        { error: "Only PDF and DOCX files are accepted" },
        400,
      );
    }

    const filePath = await uploadContract(file, teamMemberId, type);

    const { data, error } = await supabase
      .from("contracts")
      .insert({
        team_member_id: teamMemberId,
        title,
        type,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: "draft",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Contract insert error:", error.message);
      return jsonResponse({ error: "Failed to save contract record" }, 500);
    }

    return jsonResponse({ contract: data }, 201);
  } catch (error) {
    console.error("Contract upload error:", error);
    return jsonResponse({ error: "Upload failed" }, 500);
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
