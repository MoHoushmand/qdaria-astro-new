import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Meeting } from '../../../types/admin';

interface Props {
  onClose: () => void;
  onCreated: () => void;
  teamMembers: { id: string; name: string }[];
}

const MEETING_TYPES: { value: Meeting['meeting_type']; label: string }[] = [
  { value: 'team', label: 'Team Meeting' },
  { value: 'board', label: 'Board Meeting' },
  { value: 'one_on_one', label: '1:1 Meeting' },
  { value: 'standup', label: 'Standup' },
  { value: 'external', label: 'External' },
];

export default function CreateMeetingForm({ onClose, onCreated, teamMembers }: Props) {
  const [title, setTitle] = useState('');
  const [meetingType, setMeetingType] = useState<Meeting['meeting_type']>('team');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [agenda, setAgenda] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  function toggleAttendee(id: string) {
    setSelectedAttendees(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !startTime || !endTime) {
      setError('Please fill in title, start time, and end time.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const body = {
        title: title.trim(),
        meeting_type: meetingType,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        location: location.trim() || undefined,
        meeting_link: meetingLink.trim() || undefined,
        agenda: agenda.trim() || undefined,
        attendee_ids: Array.from(selectedAttendees),
      };

      const res = await fetch('/api/admin/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create meeting');
      }

      onCreated();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-gray-800 bg-[#111827] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Schedule Meeting</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Weekly Team Sync"
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Meeting Type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Type</label>
            <select
              value={meetingType}
              onChange={e => setMeetingType(e.target.value as Meeting['meeting_type'])}
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {MEETING_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Start / End */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Start *</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">End *</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Location / Link */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Oslo HQ, Room 3"
                className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">Meeting Link</label>
              <input
                type="url"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Agenda</label>
            <textarea
              value={agenda}
              onChange={e => setAgenda(e.target.value)}
              rows={3}
              placeholder="Meeting agenda and discussion points..."
              className="w-full resize-none rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Attendees */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Attendees ({selectedAttendees.size} selected)
            </label>
            <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-gray-700 bg-[#0a0e1a] p-2">
              {teamMembers.map(m => (
                <label
                  key={m.id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 transition-colors hover:bg-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={selectedAttendees.has(m.id)}
                    onChange={() => toggleAttendee(m.id)}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-300">{m.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
