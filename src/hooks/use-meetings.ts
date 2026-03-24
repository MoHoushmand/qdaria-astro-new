import { useState, useEffect, useCallback } from 'react';
import type { Meeting } from '../types/admin';

// Seed meetings for fallback
const SEED_MEETINGS: Meeting[] = [
  {
    id: 'mtg-1',
    title: 'Weekly Team Standup',
    description: 'Review progress and blockers',
    meeting_type: 'standup',
    start_time: new Date(Date.now() + 1 * 86400000).toISOString().replace(/T.*/, 'T09:00:00Z'),
    end_time: new Date(Date.now() + 1 * 86400000).toISOString().replace(/T.*/, 'T09:30:00Z'),
    location: 'Oslo HQ, Room A',
    status: 'scheduled',
    organizer_name: 'Daniel Mo Houshmand',
    attendees: [
      { meeting_id: 'mtg-1', team_member_id: '1', team_member_name: 'Daniel Mo Houshmand', status: 'accepted' },
      { meeting_id: 'mtg-1', team_member_id: '3', team_member_name: 'Gaspar Alvarado', status: 'accepted' },
      { meeting_id: 'mtg-1', team_member_id: '7', team_member_name: 'Nick Saaf', status: 'tentative' },
    ],
  },
  {
    id: 'mtg-2',
    title: 'Board Meeting Q1 Review',
    description: 'Quarterly review with board members',
    meeting_type: 'board',
    start_time: new Date(Date.now() + 3 * 86400000).toISOString().replace(/T.*/, 'T14:00:00Z'),
    end_time: new Date(Date.now() + 3 * 86400000).toISOString().replace(/T.*/, 'T16:00:00Z'),
    meeting_link: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
    organizer_name: 'Daniel Mo Houshmand',
    attendees: [
      { meeting_id: 'mtg-2', team_member_id: '1', team_member_name: 'Daniel Mo Houshmand', status: 'accepted' },
      { meeting_id: 'mtg-2', team_member_id: '3', team_member_name: 'Gaspar Alvarado', status: 'accepted' },
      { meeting_id: 'mtg-2', team_member_id: '14', team_member_name: 'Daria Houshmand', status: 'invited' },
    ],
  },
  {
    id: 'mtg-3',
    title: 'Investor Pitch Rehearsal',
    description: 'Rehearse seed round pitch with team',
    meeting_type: 'external',
    start_time: new Date(Date.now() + 4 * 86400000).toISOString().replace(/T.*/, 'T10:00:00Z'),
    end_time: new Date(Date.now() + 4 * 86400000).toISOString().replace(/T.*/, 'T11:30:00Z'),
    location: 'Oslo HQ, Board Room',
    status: 'scheduled',
    organizer_name: 'Rajesh Chavan',
    attendees: [
      { meeting_id: 'mtg-3', team_member_id: '1', team_member_name: 'Daniel Mo Houshmand', status: 'accepted' },
      { meeting_id: 'mtg-3', team_member_id: '6', team_member_name: 'Rajesh Chavan', status: 'accepted' },
      { meeting_id: 'mtg-3', team_member_id: '5', team_member_name: 'Caroline Woie', status: 'accepted' },
    ],
  },
  {
    id: 'mtg-4',
    title: '1:1 with CFO',
    description: 'Monthly check-in with Gaspar on financials',
    meeting_type: 'one_on_one',
    start_time: new Date(Date.now() + 2 * 86400000).toISOString().replace(/T.*/, 'T11:00:00Z'),
    end_time: new Date(Date.now() + 2 * 86400000).toISOString().replace(/T.*/, 'T11:30:00Z'),
    meeting_link: 'https://meet.google.com/xyz-uvwx-rst',
    status: 'scheduled',
    organizer_name: 'Daniel Mo Houshmand',
    attendees: [
      { meeting_id: 'mtg-4', team_member_id: '1', team_member_name: 'Daniel Mo Houshmand', status: 'accepted' },
      { meeting_id: 'mtg-4', team_member_id: '3', team_member_name: 'Gaspar Alvarado', status: 'accepted' },
    ],
  },
  {
    id: 'mtg-5',
    title: 'Engineering Sprint Planning',
    description: 'Plan next sprint objectives and tasks',
    meeting_type: 'team',
    start_time: new Date(Date.now() + 5 * 86400000).toISOString().replace(/T.*/, 'T13:00:00Z'),
    end_time: new Date(Date.now() + 5 * 86400000).toISOString().replace(/T.*/, 'T14:00:00Z'),
    location: 'Oslo HQ, Dev Lab',
    status: 'scheduled',
    organizer_name: 'Fredrik Krey Stubberud',
    attendees: [
      { meeting_id: 'mtg-5', team_member_id: '7', team_member_name: 'Nick Saaf', status: 'accepted' },
      { meeting_id: 'mtg-5', team_member_id: '8', team_member_name: 'Fredrik Krey Stubberud', status: 'accepted' },
      { meeting_id: 'mtg-5', team_member_id: '9', team_member_name: 'Yulia Ginzburg', status: 'tentative' },
    ],
  },
  {
    id: 'mtg-6',
    title: 'Culture & Wellbeing Check-in',
    description: 'Monthly culture review and team pulse',
    meeting_type: 'team',
    start_time: new Date(Date.now() + 7 * 86400000).toISOString().replace(/T.*/, 'T15:00:00Z'),
    end_time: new Date(Date.now() + 7 * 86400000).toISOString().replace(/T.*/, 'T16:00:00Z'),
    meeting_link: 'https://meet.google.com/klm-nopq-rst',
    status: 'scheduled',
    organizer_name: 'Nils Bjelland Gronvold',
    attendees: [
      { meeting_id: 'mtg-6', team_member_id: '11', team_member_name: 'Nils Bjelland Gronvold', status: 'accepted' },
      { meeting_id: 'mtg-6', team_member_id: '12', team_member_name: 'Lindsay Sanner', status: 'accepted' },
    ],
  },
];

interface UseMeetingsReturn {
  meetings: Meeting[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  createMeeting: (data: Partial<Meeting> & { attendee_ids?: string[] }) => Promise<Meeting | null>;
}

export function useMeetings(): UseMeetingsReturn {
  const [meetings, setMeetings] = useState<Meeting[]>(SEED_MEETINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchMeetings() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/meetings');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.meetings?.length > 0) {
            setMeetings(data.meetings);
          }
        }
      } catch {
        // Silently fall back to seed data
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchMeetings();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const createMeeting = useCallback(async (data: Partial<Meeting> & { attendee_ids?: string[] }) => {
    try {
      const res = await fetch('/api/admin/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.meeting) {
          setMeetings(prev => [...prev, result.meeting]);
          return result.meeting;
        }
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  return { meetings, isLoading, error: null, refresh, createMeeting };
}
