import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const channelId = url.searchParams.get('channel_id');
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const before = url.searchParams.get('before'); // cursor for pagination

    if (!channelId) {
      return new Response(
        JSON.stringify({ error: 'channel_id query parameter is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { supabase } = await import('../../../../lib/supabase/client');

    if (!supabase) {
      return new Response(
        JSON.stringify({ messages: [], source: 'seed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let query = supabase
      .from('chat_messages')
      .select('*')
      .eq('channel_id', channelId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (before) {
      query = query.lt('created_at', before);
    }

    const { data: messages, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ messages: messages || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ messages: [], source: 'seed' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { channel_id, content, message_type } = body;

    if (!channel_id || !content) {
      return new Response(
        JSON.stringify({ error: 'channel_id and content are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { supabase } = await import('../../../../lib/supabase/client');

    if (!supabase) {
      const mockMessage = {
        id: `msg-local-${Date.now()}`,
        channel_id,
        sender_id: '1',
        sender_name: 'You',
        content,
        message_type: message_type || 'text',
        is_edited: false,
        is_deleted: false,
        created_at: new Date().toISOString(),
      };
      return new Response(
        JSON.stringify({ message: mockMessage, source: 'local' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: message, error } = await supabase
      .from('chat_messages')
      .insert({
        channel_id,
        sender_id: '1', // In production, extract from auth session
        content,
        message_type: message_type || 'text',
        is_edited: false,
        is_deleted: false,
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
