import type { APIRoute } from 'astro';
import { getAdminSupabase, uploadContract } from '../../../../lib/supabase/admin';
import type { Contract } from '../../../../types/admin';

/**
 * GET /api/admin/contracts
 * List contracts, optionally filtered by ?team_member_id=<id>.
 */
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const teamMemberId = url.searchParams.get('team_member_id');

    const supabase = getAdminSupabase();
    if (!supabase) {
      // No Supabase configured - return empty list
      return jsonResponse({ contracts: [] });
    }

    let query = supabase
      .from('contracts')
      .select('*, team_members(name)')
      .order('created_at', { ascending: false });

    if (teamMemberId) {
      query = query.eq('team_member_id', teamMemberId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase contracts fetch error:', error.message);
      return jsonResponse({ contracts: [] });
    }

    // Map team_members join to flat team_member_name
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
    console.error('Contracts API error:', error);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
};

/**
 * POST /api/admin/contracts
 * Upload a new contract. Admin only.
 * Expects multipart/form-data with fields: team_member_id, type, title, file
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const supabase = getAdminSupabase();
    if (!supabase) {
      return jsonResponse({ error: 'Storage not configured' }, 503);
    }

    const formData = await request.formData();
    const teamMemberId = formData.get('team_member_id') as string;
    const type = formData.get('type') as string;
    const title = formData.get('title') as string;
    const file = formData.get('file') as File | null;

    if (!teamMemberId || !type || !title || !file) {
      return jsonResponse(
        { error: 'Missing required fields: team_member_id, type, title, file' },
        400
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      return jsonResponse({ error: 'Only PDF and DOCX files are accepted' }, 400);
    }

    // Upload file to storage
    const filePath = await uploadContract(file, teamMemberId, type);

    // Insert contract record
    const { data, error } = await supabase
      .from('contracts')
      .insert({
        team_member_id: teamMemberId,
        title,
        type,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        status: 'draft',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Contract insert error:', error.message);
      return jsonResponse({ error: 'Failed to save contract record' }, 500);
    }

    return jsonResponse({ contract: data }, 201);
  } catch (error) {
    console.error('Contract upload error:', error);
    return jsonResponse({ error: 'Upload failed' }, 500);
  }
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
