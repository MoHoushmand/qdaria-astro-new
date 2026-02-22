import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const { supabase } = await import('../../../../lib/supabase/client');
    if (!supabase) {
      return new Response(
        JSON.stringify({ meetings: [], source: 'seed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const filter = url.searchParams.get('filter'); // upcoming | past | type
    const meetingType = url.searchParams.get('type');

    let query = supabase
      .from('meetings')
      .select('*, attendees:meeting_attendees(*)')
      .order('start_time', { ascending: true });

    if (filter === 'upcoming') {
      query = query.gte('start_time', new Date().toISOString());
    } else if (filter === 'past') {
      query = query.lt('start_time', new Date().toISOString());
    }

    if (meetingType) {
      query = query.eq('meeting_type', meetingType);
    }

    const { data: meetings, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ meetings: meetings || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ meetings: [], source: 'seed' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      title,
      meeting_type,
      start_time,
      end_time,
      location,
      meeting_link,
      agenda,
      attendee_ids,
    } = body;

    if (!title || !meeting_type || !start_time || !end_time) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, meeting_type, start_time, end_time' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { supabase } = await import('../../../../lib/supabase/client');

    if (!supabase) {
      // Return a mock meeting in local mode
      const mockMeeting = {
        id: `mtg-local-${Date.now()}`,
        title,
        meeting_type,
        start_time,
        end_time,
        location: location || null,
        meeting_link: meeting_link || null,
        agenda: agenda || null,
        status: 'scheduled',
        attendees: (attendee_ids || []).map((id: string) => ({
          meeting_id: `mtg-local-${Date.now()}`,
          team_member_id: id,
          status: 'invited',
        })),
      };
      return new Response(
        JSON.stringify({ meeting: mockMeeting, source: 'local' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: meeting, error } = await supabase
      .from('meetings')
      .insert({
        title,
        meeting_type,
        start_time,
        end_time,
        location: location || null,
        meeting_link: meeting_link || null,
        agenda: agenda || null,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add attendees
    if (attendee_ids?.length && meeting) {
      const attendeeRows = attendee_ids.map((id: string) => ({
        meeting_id: meeting.id,
        team_member_id: id,
        status: 'invited',
      }));
      await supabase.from('meeting_attendees').insert(attendeeRows);
    }

    return new Response(
      JSON.stringify({ meeting }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
