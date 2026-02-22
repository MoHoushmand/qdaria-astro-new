import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, Users, ChevronRight } from 'lucide-react';
import type { TeamMember } from '../../../types/admin';
import { useTeamMembers } from '../../../hooks/use-team-members';

const DEPARTMENTS = [
  'All',
  'Executive',
  'Operations',
  'Finance',
  'Legal',
  'Content',
  'Strategy',
  'Sales',
  'Engineering',
  'Data',
  'Business Development',
  'Culture',
  'CSR',
  'Administration',
] as const;

const TIERS = ['All', 'Founder', 'C-Suite', 'Leadership', 'Specialist', 'Intern/Board'] as const;

const TIER_COLORS: Record<string, string> = {
  Founder: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'C-Suite': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Leadership: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Specialist: 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intern/Board': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  terminated: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface TeamDirectoryProps {
  onSelectMember?: (memberId: string) => void;
}

export default function TeamDirectory({ onSelectMember }: TeamDirectoryProps) {
  const { members, isLoading } = useTeamMembers();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [tier, setTier] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        (m.department || '').toLowerCase().includes(q);
      const matchDept = department === 'All' || m.department === department;
      const matchTier = tier === 'All' || m.tier === tier;
      return matchSearch && matchDept && matchTier;
    });
  }, [members, search, department, tier]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Team Directory</h2>
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
            {filtered.length} member{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, title, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-800 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-cyan-500/50"
          />
        </div>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50"
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d === 'All' ? 'All Departments' : d}
            </option>
          ))}
        </select>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50"
        >
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Tiers' : t}
            </option>
          ))}
        </select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => (
            <MemberCard key={m.id} member={m} onClick={() => onSelectMember?.(m.id)} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#111827]">
                <th className="px-4 py-3 font-medium text-gray-400">Name</th>
                <th className="px-4 py-3 font-medium text-gray-400">Title</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">Department</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">Tier</th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">Equity</th>
                <th className="px-4 py-3 font-medium text-gray-400">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => onSelectMember?.(m.id)}
                  className="cursor-pointer border-b border-gray-800/50 transition-colors hover:bg-[#111827]/70"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">
                        {getInitials(m.name)}
                      </div>
                      <span className="font-medium text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{m.title}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{m.department || '-'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span
                      className={`inline-block rounded-full border px-2 py-0.5 text-xs ${TIER_COLORS[m.tier] || 'text-gray-400'}`}
                    >
                      {m.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">
                    {m.equity_percentage != null ? `${m.equity_percentage}%` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full border px-2 py-0.5 text-xs ${STATUS_COLORS[m.contract_status] || 'text-gray-400'}`}
                    >
                      {m.contract_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-12 text-center text-gray-500">
          No team members match your filters.
        </div>
      )}
    </div>
  );
}

function MemberCard({ member: m, onClick }: { member: TeamMember; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-gray-800 bg-[#111827] p-5 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
          {getInitials(m.name)}
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs ${TIER_COLORS[m.tier] || 'text-gray-400'}`}
        >
          {m.tier}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {m.name}
        </h3>
        <p className="mt-0.5 text-sm text-gray-400">{m.title}</p>
        {m.department && <p className="mt-1 text-xs text-gray-500">{m.department}</p>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_COLORS[m.contract_status] || 'text-gray-400'}`}
        >
          {m.contract_status}
        </span>
        {m.equity_percentage != null && (
          <span className="text-xs text-gray-500">
            Equity: <span className="text-cyan-400">{m.equity_percentage}%</span>
          </span>
        )}
      </div>
    </div>
  );
}
