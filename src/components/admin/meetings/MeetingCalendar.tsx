import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon, List, Plus, Clock, MapPin,
  Users, ChevronLeft, ChevronRight, Video,
} from 'lucide-react';
import { useMeetings } from '../../../hooks/use-meetings';
import CreateMeetingForm from './CreateMeetingForm';
import type { Meeting } from '../../../types/admin';

const TYPE_COLORS: Record<Meeting['meeting_type'], { bg: string; text: string; label: string }> = {
  team:      { bg: 'bg-blue-500/10',   text: 'text-blue-400',   label: 'Team' },
  board:     { bg: 'bg-purple-500/10',  text: 'text-purple-400', label: 'Board' },
  one_on_one:{ bg: 'bg-emerald-500/10', text: 'text-emerald-400',label: '1:1' },
  standup:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',  label: 'Standup' },
  external:  { bg: 'bg-red-500/10',     text: 'text-red-400',    label: 'External' },
};

const STATUS_DOT: Record<Meeting['status'], string> = {
  scheduled:   'bg-blue-400',
  in_progress: 'bg-emerald-400 animate-pulse',
  completed:   'bg-gray-500',
  cancelled:   'bg-red-400',
};

type ViewMode = 'list' | 'calendar';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getWeekLabel(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const startOfWeek = (dt: Date) => {
    const day = dt.getDay();
    const diff = dt.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(dt.getFullYear(), dt.getMonth(), diff);
  };
  const mWeek = startOfWeek(d).getTime();
  const thisWeek = startOfWeek(now).getTime();
  if (mWeek === thisWeek) return 'This Week';
  if (mWeek === thisWeek + 7 * 86400000) return 'Next Week';
  return d.toLocaleDateString('en-GB', { month: 'long', day: 'numeric' }) + ' week';
}

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const tc = TYPE_COLORS[meeting.meeting_type];
  return (
    <div className="rounded-lg border border-gray-800 bg-[#111827] p-4 transition-colors hover:border-gray-700">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${STATUS_DOT[meeting.status]}`} />
          <h4 className="font-medium text-white">{meeting.title}</h4>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tc.bg} ${tc.text}`}>
          {tc.label}
        </span>
      </div>
      <div className="space-y-1 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDate(meeting.start_time)} {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}</span>
        </div>
        {meeting.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{meeting.location}</span>
          </div>
        )}
        {meeting.meeting_link && (
          <div className="flex items-center gap-2">
            <Video className="h-3.5 w-3.5" />
            <a
              href={meeting.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-cyan-400 hover:underline"
            >
              Join meeting
            </a>
          </div>
        )}
        {meeting.attendees && meeting.attendees.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            <span>{meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarGrid({ meetings, month, year }: {
  meetings: Meeting[]; month: number; year: number;
}) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon = 0
  const totalDays = lastDay.getDate();

  const meetingsByDay = useMemo(() => {
    const map = new Map<number, Meeting[]>();
    meetings.forEach(m => {
      const d = new Date(m.start_time);
      if (d.getMonth() === month && d.getFullYear() === year) {
        const day = d.getDate();
        if (!map.has(day)) map.set(day, []);
        map.get(day)!.push(m);
      }
    });
    return map;
  }, [meetings, month, year]);

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  const cells: React.ReactNode[] = [];
  // Empty cells before start
  for (let i = 0; i < startOffset; i++) {
    cells.push(<div key={`empty-${i}`} className="min-h-[80px] border border-gray-800/30 bg-gray-900/20 p-1" />);
  }
  for (let day = 1; day <= totalDays; day++) {
    const dayMeetings = meetingsByDay.get(day) || [];
    cells.push(
      <div
        key={day}
        className={`min-h-[80px] border border-gray-800/30 p-1 ${isToday(day) ? 'bg-cyan-500/5' : ''}`}
      >
        <span className={`mb-1 inline-block rounded-full px-1.5 text-xs font-medium ${
          isToday(day) ? 'bg-cyan-500 text-white' : 'text-gray-400'
        }`}>
          {day}
        </span>
        <div className="space-y-0.5">
          {dayMeetings.slice(0, 3).map(m => {
            const tc = TYPE_COLORS[m.meeting_type];
            return (
              <div
                key={m.id}
                className={`truncate rounded px-1 py-0.5 text-[10px] font-medium ${tc.bg} ${tc.text}`}
                title={m.title}
              >
                {formatTime(m.start_time)} {m.title}
              </div>
            );
          })}
          {dayMeetings.length > 3 && (
            <span className="text-[10px] text-gray-500">+{dayMeetings.length - 3} more</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-gray-800">
        {WEEKDAYS.map(d => (
          <div key={d} className="px-2 py-2 text-center text-xs font-medium text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">{cells}</div>
    </div>
  );
}

// Mock team members for CreateMeetingForm
const TEAM_MEMBERS = [
  { id: '1', name: 'Daniel Mo Houshmand' },
  { id: '2', name: 'Svein-Erik Nilsen' },
  { id: '3', name: 'Gaspar Alvarado' },
  { id: '4', name: 'Sharareh M. Shariat Panahi' },
  { id: '5', name: 'Caroline Woie' },
  { id: '6', name: 'Rajesh Chavan' },
  { id: '7', name: 'Nick Saaf' },
  { id: '8', name: 'Fredrik Krey Stubberud' },
  { id: '9', name: 'Yulia Ginzburg' },
  { id: '10', name: 'John Kristiansen' },
  { id: '11', name: 'Nils Bjelland Gronvold' },
  { id: '12', name: 'Lindsay Sanner' },
  { id: '13', name: 'Lillian Kristiansen' },
  { id: '14', name: 'Daria Houshmand' },
];

export default function MeetingCalendar() {
  const { meetings, isLoading, refresh } = useMeetings();
  const [view, setView] = useState<ViewMode>('list');
  const [showCreate, setShowCreate] = useState(false);
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());

  const upcomingMeetings = useMemo(() => {
    const now = new Date();
    return meetings
      .filter(m => new Date(m.start_time) >= now && m.status !== 'cancelled')
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [meetings]);

  const grouped = useMemo(() => {
    const groups: { label: string; items: Meeting[] }[] = [];
    let currentLabel = '';
    upcomingMeetings.forEach(m => {
      const label = getWeekLabel(m.start_time);
      if (label !== currentLabel) {
        groups.push({ label, items: [] });
        currentLabel = label;
      }
      groups[groups.length - 1].items.push(m);
    });
    return groups;
  }, [upcomingMeetings]);

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  }

  const monthLabel = new Date(calYear, calMonth).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric',
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('list')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              view === 'list'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="mr-1.5 inline h-4 w-4" />
            List
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="mr-1.5 inline h-4 w-4" />
            Calendar
          </button>
        </div>

        {view === 'calendar' && (
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[140px] text-center text-sm font-medium text-white">{monthLabel}</span>
            <button onClick={nextMonth} className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
        >
          <Plus className="h-4 w-4" />
          New Meeting
        </button>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div className="space-y-6">
          {grouped.length === 0 && (
            <div className="rounded-xl border border-gray-800 bg-[#111827] p-12 text-center">
              <CalendarIcon className="mx-auto mb-3 h-10 w-10 text-gray-600" />
              <p className="text-gray-400">No upcoming meetings</p>
              <p className="text-sm text-gray-600">Click "New Meeting" to schedule one.</p>
            </div>
          )}
          {grouped.map(g => (
            <div key={g.label}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {g.label}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {g.items.map(m => <MeetingCard key={m.id} meeting={m} />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-[#111827] overflow-hidden">
          <CalendarGrid meetings={meetings} month={calMonth} year={calYear} />
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <CreateMeetingForm
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); refresh(); }}
          teamMembers={TEAM_MEMBERS}
        />
      )}
    </div>
  );
}
