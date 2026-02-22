import type { APIRoute } from 'astro';

const DEFAULT_CHANNELS = [
  {
    id: 'ch-general',
    name: 'general',
    description: 'General discussion for the team',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-engineering',
    name: 'engineering',
    description: 'Engineering and development topics',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-business',
    name: 'business',
    description: 'Business strategy and investor relations',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-random',
    name: 'random',
    description: 'Off-topic, fun, and random conversations',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const GET: APIRoute = async () => {
  try {
    const { supabase } = await import('../../../../lib/supabase/client');

    if (supabase) {
      const { data: channels, error } = await supabase
        .from('chat_channels')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && channels && channels.length > 0) {
        return new Response(
          JSON.stringify({ channels }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  } catch {
    // Fall through to defaults
  }

  return new Response(
    JSON.stringify({ channels: DEFAULT_CHANNELS }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, description, type, is_private } = body;

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Channel name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { supabase } = await import('../../../../lib/supabase/client');

    if (!supabase) {
      const mockChannel = {
        id: `ch-local-${Date.now()}`,
        name,
        description: description || null,
        type: type || 'group',
        is_private: is_private || false,
        unread_count: 0,
        created_at: new Date().toISOString(),
      };
      return new Response(
        JSON.stringify({ channel: mockChannel, source: 'local' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: channel, error } = await supabase
      .from('chat_channels')
      .insert({
        name,
        description: description || null,
        type: type || 'group',
        is_private: is_private || false,
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
      JSON.stringify({ channel }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
