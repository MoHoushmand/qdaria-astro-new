import React from 'react';
import {
  ArrowLeft,
  Mail,
  Linkedin,
  Briefcase,
  Shield,
  Calendar,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import type { TeamMember, Contract } from '../../../types/admin';
import { useTeamMember } from '../../../hooks/use-team-members';
import { useContracts } from '../../../hooks/use-contracts';

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
  expired: 'bg-red-500/20 text-red-400 border-red-500/30',
  draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  superseded: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const TYPE_COLORS: Record<string, string> = {
  employment: 'bg-blue-500/20 text-blue-400',
  nda: 'bg-purple-500/20 text-purple-400',
  board_agreement: 'bg-cyan-500/20 text-cyan-400',
  consulting: 'bg-amber-500/20 text-amber-400',
  other: 'bg-gray-500/20 text-gray-400',
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface TeamMemberDetailProps {
  memberId?: string;
  onBack?: () => void;
}

export default function TeamMemberDetail({ memberId, onBack }: TeamMemberDetailProps) {
  const { member, isLoading } = useTeamMember(memberId);
  const { contracts, isLoading: contractsLoading } = useContracts(memberId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400">Team member not found.</p>
        {onBack && (
          <button onClick={onBack} className="mt-4 text-cyan-400 hover:underline">
            Back to directory
          </button>
        )}
      </div>
    );
  }

  const vestingProgress = getVestingProgress(member);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team Directory
        </button>
      )}

      {/* Header Card */}
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-2xl font-bold text-cyan-400">
            {getInitials(member.name)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{member.name}</h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${TIER_COLORS[member.tier]}`}
              >
                {member.tier}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[member.contract_status]}`}
              >
                {member.contract_status}
              </span>
            </div>
            <p className="mt-1 text-lg text-gray-400">{member.title}</p>
            {member.department && (
              <p className="mt-1 text-sm text-gray-500">{member.department}</p>
            )}

            {/* Contact Links */}
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bio */}
        {member.bio && (
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400">
              <Shield className="h-4 w-4" />
              Bio
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">{member.bio}</p>
          </div>
        )}

        {/* Employment Details */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400">
            <Briefcase className="h-4 w-4" />
            Employment
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Type</dt>
              <dd className="font-medium text-gray-200 capitalize">{member.employment_type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Status</dt>
              <dd>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_COLORS[member.contract_status]}`}
                >
                  {member.contract_status}
                </span>
              </dd>
            </div>
            {member.salary_nok != null && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Annual Salary</dt>
                <dd className="font-medium text-gray-200">{formatCurrency(member.salary_nok)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Board Member</dt>
              <dd className="font-medium text-gray-200">{member.is_board_member ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>

        {/* Equity & Vesting */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400">
            <Calendar className="h-4 w-4" />
            Equity & Vesting
          </h3>
          <dl className="space-y-3 text-sm">
            {member.equity_percentage != null && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Equity</dt>
                <dd className="text-lg font-bold text-cyan-400">{member.equity_percentage}%</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Cliff</dt>
              <dd className="font-medium text-gray-200">
                {member.vesting_cliff_months} month{member.vesting_cliff_months !== 1 ? 's' : ''}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Total Vesting</dt>
              <dd className="font-medium text-gray-200">
                {member.vesting_total_months} month{member.vesting_total_months !== 1 ? 's' : ''}
              </dd>
            </div>
            {member.vesting_start_date && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Vesting Start</dt>
                <dd className="font-medium text-gray-200">{formatDate(member.vesting_start_date)}</dd>
              </div>
            )}
          </dl>

          {/* Vesting Progress Bar */}
          {vestingProgress !== null && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Vesting Progress</span>
                <span>{Math.round(vestingProgress * 100)}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${Math.min(vestingProgress * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Contracts */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6 lg:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400">
            <FileText className="h-4 w-4" />
            Contracts
          </h3>
          {contractsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            </div>
          ) : contracts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="pb-2 font-medium text-gray-500">Title</th>
                    <th className="pb-2 font-medium text-gray-500">Type</th>
                    <th className="pb-2 font-medium text-gray-500">Status</th>
                    <th className="pb-2 font-medium text-gray-500">Signed</th>
                    <th className="pb-2 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((c) => (
                    <tr key={c.id} className="border-b border-gray-800/50">
                      <td className="py-2.5 text-gray-200">{c.title}</td>
                      <td className="py-2.5">
                        <span
                          className={`rounded px-2 py-0.5 text-xs ${TYPE_COLORS[c.type] || TYPE_COLORS.other}`}
                        >
                          {c.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_COLORS[c.status] || ''}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-gray-400">
                        {c.signed_date ? formatDate(c.signed_date) : '-'}
                      </td>
                      <td className="py-2.5">
                        <button
                          onClick={() => downloadContract(c.id)}
                          className="flex items-center gap-1 text-cyan-400 transition-colors hover:text-cyan-300"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-gray-500">
              No contracts on file for this team member.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function getVestingProgress(member: TeamMember): number | null {
  if (!member.vesting_start_date || member.vesting_total_months === 0) return null;
  const start = new Date(member.vesting_start_date).getTime();
  const now = Date.now();
  const totalMs = member.vesting_total_months * 30.44 * 24 * 60 * 60 * 1000;
  const elapsed = now - start;
  if (elapsed <= 0) return 0;
  return Math.min(elapsed / totalMs, 1);
}

async function downloadContract(contractId: string) {
  try {
    const res = await fetch(`/api/admin/contracts/${contractId}/download`);
    if (!res.ok) throw new Error('Download failed');
    const data = await res.json();
    if (data.url) {
      window.open(data.url, '_blank');
    }
  } catch {
    console.error('Failed to download contract');
  }
}
