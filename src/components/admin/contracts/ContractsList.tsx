import React, { useState, useMemo, useCallback } from 'react';
import {
  FileText,
  Download,
  Upload,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FilePlus,
} from 'lucide-react';
import type { Contract } from '../../../types/admin';
import { useContracts } from '../../../hooks/use-contracts';
import { useTeamMembers } from '../../../hooks/use-team-members';
import ContractUpload from './ContractUpload';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  expired: 'bg-red-500/20 text-red-400 border-red-500/30',
  draft: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  superseded: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const TYPE_COLORS: Record<string, string> = {
  employment: 'bg-blue-500/20 text-blue-400',
  nda: 'bg-purple-500/20 text-purple-400',
  board_agreement: 'bg-cyan-500/20 text-cyan-400',
  consulting: 'bg-amber-500/20 text-amber-400',
  other: 'bg-gray-500/20 text-gray-400',
};

const CONTRACT_TYPES = ['All', 'employment', 'nda', 'board_agreement', 'consulting', 'other'] as const;
const CONTRACT_STATUSES = ['All', 'draft', 'active', 'expired', 'superseded'] as const;

type SortKey = 'title' | 'team_member_name' | 'type' | 'status' | 'start_date';
type SortDir = 'asc' | 'desc';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ContractsListProps {
  isAdmin?: boolean;
  onGenerateClick?: () => void;
  onGenerateAllClick?: () => void;
  isBatchGenerating?: boolean;
  batchProgress?: string;
}

export default function ContractsList({
  isAdmin = false,
  onGenerateClick,
  onGenerateAllClick,
  isBatchGenerating = false,
  batchProgress = '',
}: ContractsListProps) {
  const { contracts, isLoading, refetch } = useContracts();
  const { members } = useTeamMembers();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [memberFilter, setMemberFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('start_date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showUpload, setShowUpload] = useState(false);
  const [passwordModal, setPasswordModal] = useState<{ contract: Contract } | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);

  const handlePasswordSubmit = useCallback(() => {
    if (!passwordModal) return;
    const contract = passwordModal.contract;
    const memberName = contract.team_member_name || '';

    import('../../../data/admin/contract-passwords').then(({ verifyContractPassword }) => {
      if (verifyContractPassword(memberName, passwordInput)) {
        // Password correct - generate a full PDF contract on the fly
        setIsGenerating(true);
        import('../../../utils/generate-contract-pdf')
          .then(({ generateContractPdfForEmployee }) =>
            generateContractPdfForEmployee({ employeeName: memberName }),
          )
          .then(() => {
            setIsGenerating(false);
            setPasswordModal(null);
          })
          .catch((err) => {
            console.error('PDF generation failed:', err);
            setIsGenerating(false);
            // Fallback: try the static file
            if (contract.file_path) {
              window.open(contract.file_path, '_blank');
            }
            setPasswordModal(null);
          });
      } else {
        setPasswordError('Incorrect password. Contact CEO for access.');
      }
    });
  }, [passwordModal, passwordInput]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="h-3 w-3 text-gray-600" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3 w-3 text-cyan-400" />
    ) : (
      <ArrowDown className="h-3 w-3 text-cyan-400" />
    );
  };

  const filtered = useMemo(() => {
    let result = [...contracts];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.team_member_name || '').toLowerCase().includes(q) ||
          c.file_name.toLowerCase().includes(q)
      );
    }

    // Filters
    if (typeFilter !== 'All') result = result.filter((c) => c.type === typeFilter);
    if (statusFilter !== 'All') result = result.filter((c) => c.status === statusFilter);
    if (memberFilter !== 'All') result = result.filter((c) => c.team_member_id === memberFilter);

    // Sort
    result.sort((a, b) => {
      let aVal: string = '';
      let bVal: string = '';
      switch (sortKey) {
        case 'title':
          aVal = a.title;
          bVal = b.title;
          break;
        case 'team_member_name':
          aVal = a.team_member_name || '';
          bVal = b.team_member_name || '';
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'start_date':
          aVal = a.start_date || a.signed_date || '';
          bVal = b.start_date || b.signed_date || '';
          break;
      }
      const cmp = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [contracts, search, typeFilter, statusFilter, memberFilter, sortKey, sortDir]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  const teamMembersForUpload = members.map((m) => ({ id: m.id, name: m.name }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Contracts</h2>
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
            {filtered.length}
          </span>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2">
            {onGenerateAllClick && (
              <button
                onClick={onGenerateAllClick}
                disabled={isBatchGenerating}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-emerald-400 disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                {isBatchGenerating ? 'Generating...' : 'Download All PDFs'}
              </button>
            )}
            {onGenerateClick && (
              <button
                onClick={onGenerateClick}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-400"
              >
                <FilePlus className="h-4 w-4" />
                Generate Contract
              </button>
            )}
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
            >
              <Upload className="h-4 w-4" />
              Upload Contract
            </button>
          </div>
        )}
        {isBatchGenerating && batchProgress && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            {batchProgress}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search contracts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-800 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-cyan-500/50"
          />
        </div>
        <select
          value={memberFilter}
          onChange={(e) => setMemberFilter(e.target.value)}
          className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-cyan-500/50"
        >
          <option value="All">All Members</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-cyan-500/50"
        >
          {CONTRACT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Types' : t.replace('_', ' ')}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-cyan-500/50"
        >
          {CONTRACT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Statuses' : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-[#111827]">
                <th
                  className="cursor-pointer px-4 py-3 font-medium text-gray-400 hover:text-gray-200"
                  onClick={() => toggleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Title <SortIcon column="title" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 font-medium text-gray-400 hover:text-gray-200"
                  onClick={() => toggleSort('team_member_name')}
                >
                  <div className="flex items-center gap-1">
                    Team Member <SortIcon column="team_member_name" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 font-medium text-gray-400 hover:text-gray-200 hidden md:table-cell"
                  onClick={() => toggleSort('type')}
                >
                  <div className="flex items-center gap-1">
                    Type <SortIcon column="type" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 font-medium text-gray-400 hover:text-gray-200"
                  onClick={() => toggleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon column="status" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 font-medium text-gray-400 hover:text-gray-200 hidden lg:table-cell"
                  onClick={() => toggleSort('start_date')}
                >
                  <div className="flex items-center gap-1">
                    Start Date <SortIcon column="start_date" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">Format</th>
                <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-800/50 hover:bg-[#111827]/70">
                  <td className="px-4 py-3 font-medium text-gray-200">{c.title}</td>
                  <td className="px-4 py-3 text-gray-400">{c.team_member_name || '-'}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`rounded px-2 py-0.5 text-xs ${TYPE_COLORS[c.type] || TYPE_COLORS.other}`}>
                      {c.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_COLORS[c.status] || ''}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">
                    {c.start_date
                      ? formatDate(c.start_date)
                      : c.signed_date
                        ? formatDate(c.signed_date)
                        : '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
                    {c.file_size ? formatFileSize(c.file_size) : (
                      <span className="text-xs text-cyan-500">PDF</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {c.team_member_name ? (
                      <button
                        onClick={() => {
                          if (isAdmin) {
                            // Admin bypasses password — generate directly
                            setIsGenerating(true);
                            import('../../../utils/generate-contract-pdf')
                              .then(({ generateContractPdfForEmployee }) =>
                                generateContractPdfForEmployee({ employeeName: c.team_member_name! }),
                              )
                              .then(() => setIsGenerating(false))
                              .catch((err) => {
                                console.error('PDF generation failed:', err);
                                setIsGenerating(false);
                              });
                          } else {
                            setPasswordModal({ contract: c });
                            setPasswordInput('');
                            setPasswordError('');
                          }
                        }}
                        disabled={isGenerating}
                        className="flex items-center gap-1 text-cyan-400 transition-colors hover:text-cyan-300 disabled:opacity-50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
                      </button>
                    ) : c.file_path ? (
                      <a
                        href={c.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-300"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </a>
                    ) : (
                      <span className="text-xs text-gray-600">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    {contracts.length === 0
                      ? 'No contracts uploaded yet.'
                      : 'No contracts match your filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-gray-800 bg-[#111827] p-6">
            <h3 className="mb-1 text-lg font-semibold text-white">Generate Contract PDF</h3>
            <p className="mb-4 text-sm text-gray-400">
              Enter the password provided by CEO to generate and download this contract as a PDF.
            </p>
            <p className="mb-3 text-xs text-gray-500 truncate">
              {passwordModal.contract.title}
            </p>
            {isGenerating && (
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-xs text-cyan-400">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                Generating PDF contract...
              </div>
            )}
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
              placeholder="Enter contract password"
              className="mb-3 w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-cyan-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
                }
              }}
              autoFocus
            />
            {passwordError && (
              <p className="mb-3 text-xs text-red-400">{passwordError}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setPasswordModal(null)}
                className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                disabled={isGenerating}
                className="flex-1 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-black hover:bg-cyan-400 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Download'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <ContractUpload
          teamMembers={teamMembersForUpload}
          onClose={() => setShowUpload(false)}
          onUpload={() => {
            setShowUpload(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
