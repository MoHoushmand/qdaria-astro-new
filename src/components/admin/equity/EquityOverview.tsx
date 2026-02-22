import { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  PieChart as PieChartIcon, Users, Briefcase,
  ArrowUpDown, ChevronUp, ChevronDown,
  Building2, Milestone, AlertCircle, Info,
} from 'lucide-react';
import { useEquity } from '../../../hooks/use-equity';
import { spinoffCompanies, employeeEquityAllocations } from '../../../data/admin/spinoff-equity-seed';
import type { SpinoffCompany } from '../../../data/admin/spinoff-equity-seed';
import type { EquityDistribution } from '../../../types/admin';

/* ---------- constants ---------- */

const SHARE_TYPE_COLORS: Record<string, string> = {
  common: '#06b6d4',
  preferred: '#8b5cf6',
  options: '#10b981',
  phantom: '#f59e0b',
};

const SHARE_TYPE_LABELS: Record<string, string> = {
  common: 'Common',
  preferred: 'Preferred',
  options: 'Options',
  phantom: 'Phantom',
};

const ROUND_COLORS: Record<string, string> = {
  Seed: '#8b5cf6',
  'Series A': '#06b6d4',
  'Series B': '#10b981',
  'Series C': '#f59e0b',
  IPO: '#ec4899',
};

type SortField = 'name' | 'shareType' | 'percentage' | 'cliffMonths' | 'totalMonths';
type SortDir = 'asc' | 'desc';

/* ---------- Cross-company equity grid constants ---------- */

const ALL_COMPANIES = [
  { id: 'qdaria-holding', shortName: 'QDaria Holding' },
  { id: 'zipminator', shortName: 'Zipminator' },
  { id: 'qm9', shortName: 'Qm9' },
  { id: 'qmikeai', shortName: 'QMikeAI' },
  { id: 'thqai', shortName: 'THQAI' },
  { id: 'qnilaya', shortName: 'QNilaya' },
  { id: 'qiot', shortName: 'QIoT' },
  { id: 'lillian-research', shortName: 'Lillian Research' },
  { id: 'qdiana', shortName: 'QDiana' },
] as const;

/** CEO row data for the cross-company grid */
const CEO_ROW = {
  name: 'Daniel Mo Houshmand',
  totalPct: 51 + spinoffCompanies.reduce((s, c) => s + c.ceoPct, 0),
  allocations: {
    'qdaria-holding': 51,
    ...Object.fromEntries(spinoffCompanies.map((c) => [c.id, c.ceoPct])),
  } as Record<string, number>,
};

/** Returns a Tailwind bg-color class based on equity value for heat-map coloring */
function equityCellBg(value: number): string {
  if (value >= 50) return 'bg-cyan-500/25';
  if (value >= 5) return 'bg-cyan-500/20';
  if (value >= 2) return 'bg-cyan-500/15';
  if (value >= 1) return 'bg-cyan-500/10';
  if (value > 0) return 'bg-cyan-500/5';
  return '';
}

/* ---------- CrossCompanyEquityGrid ---------- */

function CrossCompanyEquityGrid({ highlightCompanyId }: { highlightCompanyId?: string }) {
  // Compute per-company totals (CEO + all employees)
  const companyTotals: Record<string, number> = {};
  ALL_COMPANIES.forEach((c) => {
    companyTotals[c.id] = CEO_ROW.allocations[c.id] ?? 0;
  });

  employeeEquityAllocations.forEach((emp) => {
    ALL_COMPANIES.forEach((c) => {
      companyTotals[c.id] += emp.allocations[c.id] ?? 0;
    });
  });

  function renderRow(
    emp: { name: string; totalPct: number; allocations: Record<string, number> },
    idx: number,
    isCeo?: boolean,
  ) {
    const total = ALL_COMPANIES.reduce((s, c) => s + (emp.allocations[c.id] ?? 0), 0);
    return (
      <tr
        key={emp.name}
        className={`border-b border-gray-800/50 transition-colors hover:bg-gray-800/30 ${
          isCeo ? 'bg-cyan-500/5' : idx % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20'
        }`}
      >
        {/* Sticky name column */}
        <td className="sticky left-0 z-10 whitespace-nowrap bg-[#111827] px-4 py-2.5 font-medium text-white">
          <div className="flex items-center gap-2">
            {isCeo && (
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                CEO
              </span>
            )}
            <span>{emp.name}</span>
          </div>
        </td>
        {/* Total column first — meaningful for employees (allocation budget), dash for CEO */}
        <td className="whitespace-nowrap px-3 py-2.5 text-center font-mono text-sm font-semibold text-cyan-400">
          {isCeo ? (
            <span className="text-xs text-gray-500" title="Independent stakes in separate entities">-</span>
          ) : (
            total > 0 ? `${total.toFixed(total % 1 === 0 ? 0 : 1)}%` : '-'
          )}
        </td>
        {/* Per-company columns */}
        {ALL_COMPANIES.map((c) => {
          const val = emp.allocations[c.id] ?? 0;
          const isHighlighted = c.id === highlightCompanyId;
          return (
            <td
              key={c.id}
              className={`whitespace-nowrap px-3 py-2.5 text-center font-mono text-sm ${equityCellBg(val)} ${
                isHighlighted ? 'font-bold text-cyan-300' : val > 0 ? 'text-white' : 'text-gray-600'
              } ${isHighlighted ? 'ring-1 ring-inset ring-cyan-500/30' : ''}`}
            >
              {val > 0 ? `${val.toFixed(val % 1 === 0 && val >= 1 ? 0 : val >= 0.1 ? 1 : 2)}%` : '-'}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827]">
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Cross-Company Equity Grid</h3>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
          {employeeEquityAllocations.length + 1} members &middot; {ALL_COMPANIES.length} companies
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-400">
              <th className="sticky left-0 z-20 bg-[#111827] px-4 py-3 font-medium">Name</th>
              <th className="whitespace-nowrap px-3 py-3 text-center font-medium text-cyan-400">Total</th>
              {ALL_COMPANIES.map((c) => (
                <th
                  key={c.id}
                  className={`whitespace-nowrap px-3 py-3 text-center font-medium ${
                    c.id === highlightCompanyId ? 'text-cyan-400' : ''
                  }`}
                >
                  {c.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* CEO row */}
            {renderRow(CEO_ROW, 0, true)}

            {/* All employees — everyone at 10% */}
            {employeeEquityAllocations.map((emp, i) => renderRow(emp, i))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-700 bg-gray-900/60">
              <td className="sticky left-0 z-10 bg-gray-900/60 px-4 py-3 font-bold text-white">Totals</td>
              <td className="px-3 py-3 text-center font-mono text-sm font-bold text-gray-500">-</td>
              {ALL_COMPANIES.map((c) => (
                <td
                  key={c.id}
                  className={`px-3 py-3 text-center font-mono text-sm font-bold ${
                    c.id === highlightCompanyId ? 'text-cyan-300' : 'text-gray-200'
                  }`}
                >
                  {companyTotals[c.id]?.toFixed(companyTotals[c.id] % 1 === 0 ? 0 : 1)}%
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

const TAB_IDS = ['qdaria', ...spinoffCompanies.map((c) => c.id)] as const;
type TabId = typeof TAB_IDS[number];

const TAB_LABELS: Record<TabId, string> = {
  qdaria: 'QDaria Holding',
  ...Object.fromEntries(spinoffCompanies.map((c) => [c.id, c.name])) as Record<string, string>,
};

/* ---------- shared sub-components ---------- */

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as EquityDistribution;
  return (
    <div className="rounded-lg border border-gray-700 bg-[#1a2033] px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-white">{d.category}</p>
      <p className="text-gray-300">{d.percentage.toFixed(2)}%</p>
    </div>
  );
}

function SpinoffTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-gray-700 bg-[#1a2033] px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-white">{d.name}</p>
      <p className="text-gray-300">{d.value.toFixed(1)}%</p>
    </div>
  );
}

function VestingBar({ cliffMonths, totalMonths, vestingStartDate }: {
  cliffMonths: number; totalMonths: number; vestingStartDate?: string;
}) {
  const now = new Date();
  let monthsElapsed = 0;
  let started = false;

  if (vestingStartDate) {
    const start = new Date(vestingStartDate);
    monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());
    started = monthsElapsed >= 0;
  }

  if (cliffMonths === 0 && totalMonths > 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 rounded-full bg-gray-700">
          <div className="h-2 rounded-full bg-cyan-500" style={{ width: '100%' }} />
        </div>
        <span className="text-xs text-cyan-400">Fully vested</span>
      </div>
    );
  }

  if (!started || !vestingStartDate) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 rounded-full bg-gray-700">
          <div className="h-2 rounded-full bg-gray-600" style={{ width: '0%' }} />
        </div>
        <span className="text-xs text-gray-500">Starting soon</span>
      </div>
    );
  }

  const pct = Math.min(100, Math.max(0, (monthsElapsed / totalMonths) * 100));
  const pastCliff = monthsElapsed >= cliffMonths;

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-2 w-24 rounded-full bg-gray-700">
        <div
          className={`h-2 rounded-full ${pastCliff ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 h-2 w-0.5 bg-gray-400"
          style={{ left: `${(cliffMonths / totalMonths) * 100}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">
        {Math.round(pct)}%
      </span>
    </div>
  );
}

/* ---------- Spinoff tab content ---------- */

function SpinoffTabContent({ company }: { company: SpinoffCompany }) {
  const donutData = [
    { name: `CEO (${company.ceoName.split(' ').pop()})`, value: company.ceoPct, color: '#06b6d4' },
    ...company.fundingRounds.map((r) => ({
      name: r.name,
      value: r.investorPoolPct,
      color: ROUND_COLORS[r.name] ?? '#6b7280',
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 p-2">
            <Building2 className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{company.name}</p>
            <p className="text-sm text-gray-400">{company.description}</p>
          </div>
        </div>
        {company.specialConditions && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <p className="text-sm text-amber-300">{company.specialConditions}</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <PieChartIcon className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">CEO Allocation</p>
              <p className="text-2xl font-bold text-white">{company.ceoPct}%</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Briefcase className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Investor Pool</p>
              <p className="text-2xl font-bold text-white">{company.investorPoolPct}%</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <Users className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Team Members</p>
              <p className="text-2xl font-bold text-white">{company.employees.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Equity Split</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
                stroke="none"
              >
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<SpinoffTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value: string) => (
                  <span className="text-sm text-gray-300">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investor Round Breakdown Table */}
      <div className="rounded-xl border border-gray-800 bg-[#111827]">
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Investor Round Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-gray-400">
                <th className="px-6 py-3 font-medium">Round</th>
                <th className="px-6 py-3 font-medium">Investor Pool %</th>
                <th className="px-6 py-3 font-medium">Employee Trigger %</th>
                <th className="px-6 py-3 font-medium">Funding Target (EUR)</th>
              </tr>
            </thead>
            <tbody>
              {company.fundingRounds.map((round, i) => (
                <tr
                  key={round.name}
                  className={`border-b border-gray-800/50 transition-colors hover:bg-gray-800/30 ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20'
                  }`}
                >
                  <td className="px-6 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${ROUND_COLORS[round.name] ?? '#6b7280'}20`,
                        color: ROUND_COLORS[round.name] ?? '#6b7280',
                      }}
                    >
                      {round.name}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-mono text-white">{round.investorPoolPct}%</td>
                  <td className="px-6 py-3 font-mono text-emerald-400">+{round.employeePoolTriggerPct}%</td>
                  <td className="px-6 py-3 text-gray-300">
                    {new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(round.fundingTargetEur)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Milestone Triggers */}
      <div className="rounded-xl border border-gray-800 bg-[#111827]">
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Employee Milestone Triggers</h3>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            {company.employees.length} employees
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-gray-400">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Milestone Equity %</th>
                <th className="px-6 py-3 font-medium">Trigger Round</th>
              </tr>
            </thead>
            <tbody>
              {company.employees.map((emp, i) => (
                <tr
                  key={`${emp.name}-${emp.triggerRound}`}
                  className={`border-b border-gray-800/50 transition-colors hover:bg-gray-800/30 ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20'
                  }`}
                >
                  <td className="px-6 py-3 font-medium text-white">{emp.name}</td>
                  <td className="px-6 py-3 text-gray-300">{emp.role}</td>
                  <td className="px-6 py-3 font-mono text-cyan-400">{emp.milestonePct}%</td>
                  <td className="px-6 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${ROUND_COLORS[emp.triggerRound] ?? '#6b7280'}20`,
                        color: ROUND_COLORS[emp.triggerRound] ?? '#6b7280',
                      }}
                    >
                      {emp.triggerRound}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross-Company Equity Grid (highlights this spinoff) */}
      <CrossCompanyEquityGrid highlightCompanyId={company.id} />

      {/* Funding Milestone Tracker */}
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Milestone className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Funding Milestone Tracker</h3>
        </div>
        <div className="space-y-4">
          {company.fundingRounds.map((round, idx) => {
            const isActive = idx === 0; // First round is current target
            return (
              <div key={round.name} className="flex items-center gap-4">
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-3 w-3 rounded-full border-2 ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-gray-600 bg-transparent'
                    }`}
                  />
                  {idx < company.fundingRounds.length - 1 && (
                    <div className="h-8 w-0.5 bg-gray-700" />
                  )}
                </div>
                {/* Content */}
                <div className={`flex-1 rounded-lg border px-4 py-3 ${
                  isActive
                    ? 'border-cyan-500/30 bg-cyan-500/5'
                    : 'border-gray-800 bg-gray-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-medium ${isActive ? 'text-cyan-400' : 'text-gray-400'}`}>
                        {round.name}
                      </span>
                      {isActive && (
                        <span className="ml-2 rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                          Current Target
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(round.fundingTargetEur)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Unlocks {round.investorPoolPct}% investor equity + {round.employeePoolTriggerPct}% employee pool
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export default function EquityOverview() {
  const { distribution, individual, totalAllocated, isLoading } = useEquity();
  const [activeTab, setActiveTab] = useState<TabId>('qdaria');
  const [sortField, setSortField] = useState<SortField>('percentage');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showRationale, setShowRationale] = useState<boolean>(false);

  const sorted = useMemo(() => {
    const copy = [...individual];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'shareType': cmp = a.shareType.localeCompare(b.shareType); break;
        case 'percentage': cmp = a.percentage - b.percentage; break;
        case 'cliffMonths': cmp = a.cliffMonths - b.cliffMonths; break;
        case 'totalMonths': cmp = a.totalMonths - b.totalMonths; break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [individual, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="ml-1 inline h-3 w-3 text-gray-600" />;
    return sortDir === 'asc'
      ? <ChevronUp className="ml-1 inline h-3 w-3 text-cyan-400" />
      : <ChevronDown className="ml-1 inline h-3 w-3 text-cyan-400" />;
  }

  const employeePool = distribution.find(d => d.category.includes('Employee'))?.percentage ?? 0;
  const investorAlloc = distribution.find(d => d.category.includes('Investor'))?.percentage ?? 0;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  const activeSpinoff = spinoffCompanies.find((c) => c.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Compensation & Equity Rationale */}
      <div className="rounded-xl border border-gray-800 bg-[#111827]">
        <button
          type="button"
          onClick={() => setShowRationale((v) => !v)}
          className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-800/30"
        >
          <Info className="h-5 w-5 shrink-0 text-cyan-400" />
          <span className="flex-1 text-sm font-semibold text-white">
            Compensation &amp; Equity Rationale
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              showRationale ? 'rotate-180' : ''
            }`}
          />
        </button>
        {showRationale && (
          <div className="border-t border-gray-800 px-5 pb-5 pt-2 text-gray-300">
            <h4 className="text-cyan-400 font-semibold text-sm mb-2 mt-4">Equity Structure</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
              <li>
                Founder holds 51% equity in QDaria Holdings with 35% reserved for
                investors and 14% employee option pool, maintaining founder control through all funding rounds
              </li>
              <li>
                Standard non-founder COO equity ranges 1&ndash;5% at seed stage (Hunt Club
                benchmark); the 2% allocation reflects market positioning
              </li>
              <li>
                Employee equity vests over 48 months with a 12-month cliff, following standard
                4-year vesting with 1-year cliff
              </li>
              <li>
                All team members receive equity in every subsidiary (not just the holding), with
                milestone-based acceleration triggers tied to funding rounds
              </li>
            </ul>

            <h4 className="text-cyan-400 font-semibold text-sm mb-2 mt-4">Salary Benchmarks</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
              <li>
                Pre-seed base salaries are benchmarked against XAnge/Coulter Partners 2024
                European Deep-Tech Compensation Survey
              </li>
              <li>
                European deep-tech COOs at seed/Series&nbsp;A stage earn median &euro;80,000; our
                &euro;100K reflects Norwegian cost-of-living premium (Numbeo index 69.0, highest
                in Nordics)
              </li>
              <li>
                Salary progression is tied to funding milestones: each round triggers a pre-agreed
                increase, with 0&ndash;15% bonus potential based on individual KPIs
              </li>
              <li>
                CEO-to-COO ratio of ~62% aligns with European early-stage norms (~83% CEO-relative
                for COOs at funded startups)
              </li>
            </ul>

            <h4 className="text-cyan-400 font-semibold text-sm mb-2 mt-4">
              Norwegian Legal Compliance
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
              <li>
                Non-compete clauses capped at 12 months per Arbeidsmilj&oslash;loven Chapter 14A,
                with mandatory 100% salary compensation up to 8G (NOK&nbsp;1,041,280) and 70%
                between 8G&ndash;12G
              </li>
              <li>
                NDA uses dual-duration structure: perpetual protection for trade secrets (Fibonacci
                anyon protocols, braiding algorithms, qubit architectures), 3&ndash;5 years for
                general confidential business information
              </li>
              <li>
                All employment contracts comply with Norwegian Working Environment Act requirements
              </li>
              <li>
                Professional development expectations (reading program, MBA opportunity) are framed
                as cultural expectations, not binding contractual terms with breach consequences
              </li>
            </ul>

            <h4 className="text-cyan-400 font-semibold text-sm mb-2 mt-4">Spin-off Structure</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-400">
              <li>
                QDaria operates as a holding company with 8 subsidiaries, each focused on a
                distinct quantum technology vertical
              </li>
              <li>
                70/30 CEO/investor split in each subsidiary protects founder control while
                reserving a 30% investor pool allocated across Seed through IPO rounds, with
                milestone-based employee equity triggers
              </li>
              <li>
                Employee equity in subsidiaries triggers upon specific funding milestones,
                incentivising contribution to portfolio-wide growth
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-1">
        <div className="flex gap-1 overflow-x-auto">
          {TAB_IDS.map((tabId) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tabId
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
              }`}
            >
              {TAB_LABELS[tabId]}
            </button>
          ))}
        </div>
      </div>

      {/* Spinoff tab content */}
      {activeSpinoff && <SpinoffTabContent company={activeSpinoff} />}

      {/* QDaria Holding tab content */}
      {activeTab === 'qdaria' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-2">
                  <PieChartIcon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Allocated</p>
                  <p className="text-2xl font-bold text-white">{totalAllocated.toFixed(2)}%</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Employee Pool</p>
                  <p className="text-2xl font-bold text-white">{employeePool.toFixed(2)}%</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/10 p-2">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Investor Allocation</p>
                  <p className="text-2xl font-bold text-white">{investorAlloc.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Cap Table Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {distribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value: string) => (
                      <span className="text-sm text-gray-300">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Individual Equity Table */}
          <div className="rounded-xl border border-gray-800 bg-[#111827]">
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Individual Equity Allocations</h3>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                {individual.length} members
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left text-gray-400">
                    <th className="cursor-pointer px-6 py-3 font-medium hover:text-white" onClick={() => toggleSort('name')}>
                      Name <SortIcon field="name" />
                    </th>
                    <th className="cursor-pointer px-6 py-3 font-medium hover:text-white" onClick={() => toggleSort('shareType')}>
                      Share Type <SortIcon field="shareType" />
                    </th>
                    <th className="cursor-pointer px-6 py-3 font-medium hover:text-white" onClick={() => toggleSort('percentage')}>
                      Equity % <SortIcon field="percentage" />
                    </th>
                    <th className="px-6 py-3 font-medium">Vesting</th>
                    <th className="cursor-pointer px-6 py-3 font-medium hover:text-white" onClick={() => toggleSort('cliffMonths')}>
                      Cliff <SortIcon field="cliffMonths" />
                    </th>
                    <th className="cursor-pointer px-6 py-3 font-medium hover:text-white" onClick={() => toggleSort('totalMonths')}>
                      Total <SortIcon field="totalMonths" />
                    </th>
                    <th className="px-6 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((row, i) => (
                    <tr
                      key={row.name}
                      className={`border-b border-gray-800/50 transition-colors hover:bg-gray-800/30 ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20'
                      }`}
                    >
                      <td className="px-6 py-3 font-medium text-white">{row.name}</td>
                      <td className="px-6 py-3">
                        <span
                          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: `${SHARE_TYPE_COLORS[row.shareType]}20`,
                            color: SHARE_TYPE_COLORS[row.shareType],
                          }}
                        >
                          {SHARE_TYPE_LABELS[row.shareType]}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-white">{row.percentage.toFixed(2)}%</td>
                      <td className="px-6 py-3">
                        <VestingBar
                          cliffMonths={row.cliffMonths}
                          totalMonths={row.totalMonths}
                        />
                      </td>
                      <td className="px-6 py-3 text-gray-400">
                        {row.cliffMonths === 0 ? '-' : `${row.cliffMonths}mo`}
                      </td>
                      <td className="px-6 py-3 text-gray-400">{row.totalMonths}mo</td>
                      <td className="max-w-[200px] truncate px-6 py-3 text-gray-500">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cross-Company Equity Grid (Holding tab — no column highlighted) */}
          <CrossCompanyEquityGrid highlightCompanyId="qdaria-holding" />
        </>
      )}
    </div>
  );
}
