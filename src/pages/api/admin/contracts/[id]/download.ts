import type { APIRoute } from 'astro';
import { getAdminSupabase } from '../../../../../lib/supabase/admin';

/**
 * GET /api/admin/contracts/[id]/download
 * Generate a signed URL for downloading a contract file from Supabase Storage.
 */
export const GET: APIRoute = async ({ params }) => {
  try {
    const contractId = params.id;
    if (!contractId) {
      return jsonResponse({ error: 'Contract ID is required' }, 400);
    }

    const supabase = getAdminSupabase();
    if (!supabase) {
      return jsonResponse({ error: 'Storage not configured' }, 503);
    }

    // Fetch contract record to get file_path
    const { data: contract, error: fetchError } = await supabase
      .from('contracts')
      .select('file_path, file_name')
      .eq('id', contractId)
      .single();

    if (fetchError || !contract) {
      return jsonResponse({ error: 'Contract not found' }, 404);
    }

    // Generate signed URL (valid for 1 hour)
    const { data: signedData, error: signError } = await supabase.storage
      .from('contracts')
      .createSignedUrl(contract.file_path, 3600);

    if (signError || !signedData?.signedUrl) {
      console.error('Signed URL error:', signError?.message);
      return jsonResponse({ error: 'Failed to generate download link' }, 500);
    }

    return jsonResponse({
      url: signedData.signedUrl,
      file_name: contract.file_name,
    });
  } catch (error) {
    console.error('Contract download error:', error);
    return jsonResponse({ error: 'Internal server error' }, 500);
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
