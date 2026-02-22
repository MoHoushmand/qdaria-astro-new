import React, { useState, useMemo, useCallback } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  User,
  FileText,
  ToggleLeft,
  Eye,
  Download,
  Check,
  Lock,
} from 'lucide-react';
import { teamMembersSeed } from '../../../data/admin/team-seed';
import {
  employmentContractTemplate,
  fillTemplatePlaceholders,
  formatNok,
  nokToEur,
  getShareTypeLabel,
  getSeveranceMonths,
  getRoleDuties,
} from '../../../data/admin/contract-templates';
import type { ContractClause } from '../../../data/admin/contract-templates';
import { spinoffCompanies, employeeEquityAllocations } from '../../../data/admin/spinoff-equity-seed';
import {
  salaryProgression,
  fundingRounds,
  fundingRoundLabels,
} from '../../../data/admin/salary-seed';

interface ContractGeneratorProps {
  onClose: () => void;
  onGenerated?: () => void;
}

interface EmployeeFormData {
  employeeName: string;
  title: string;
  department: string;
  employmentType: string;
  startDate: string;
  salaryNok: number;
  salaryEur: number;
  equityPercentage: number;
  shareType: string;
  cliffMonths: number;
  tier: string;
}

const STEPS = [
  { id: 1, label: 'Select Employee', icon: User },
  { id: 2, label: 'Review Details', icon: FileText },
  { id: 3, label: 'Toggle Clauses', icon: ToggleLeft },
  { id: 4, label: 'Preview & Download', icon: Eye },
];

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  flex: 'Flex',
  intern: 'Intern',
};

function getDefaultFormData(): EmployeeFormData {
  return {
    employeeName: '',
    title: '',
    department: '',
    employmentType: 'full-time',
    startDate: new Date().toISOString().split('T')[0],
    salaryNok: 0,
    salaryEur: 0,
    equityPercentage: 0,
    shareType: 'Common',
    cliffMonths: 12,
    tier: '',
  };
}

export default function ContractGenerator({
  onClose,
  onGenerated,
}: ContractGeneratorProps) {
  const [step, setStep] = useState(1);
  const [selectedEmployeeIdx, setSelectedEmployeeIdx] = useState<number>(-1);
  const [formData, setFormData] = useState<EmployeeFormData>(getDefaultFormData());
  const [enabledClauses, setEnabledClauses] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const clause of employmentContractTemplate.clauses) {
      initial[clause.id] = clause.enabled;
    }
    return initial;
  });

  /** EUR-to-NOK approximate rate (inverse of NOK_TO_EUR 0.085) */
  const EUR_TO_NOK = 11.76;

  const handleEmployeeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const idx = parseInt(e.target.value, 10);
      setSelectedEmployeeIdx(idx);
      if (idx >= 0) {
        const member = teamMembersSeed[idx];
        const salaryEur = member.salary_eur ?? 0;
        const salaryNok = Math.round(salaryEur * EUR_TO_NOK);
        setFormData({
          employeeName: member.name,
          title: member.title,
          department: member.department ?? '',
          employmentType: member.employment_type,
          startDate: new Date().toISOString().split('T')[0],
          salaryNok,
          salaryEur,
          equityPercentage: member.equity_percentage ?? 0,
          shareType: getShareTypeLabel(member.tier),
          cliffMonths: member.vesting_cliff_months,
          tier: member.tier,
        });
      } else {
        setFormData(getDefaultFormData());
      }
    },
    []
  );

  const handleFieldChange = useCallback(
    (field: keyof EmployeeFormData, value: string | number) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value };
        if (field === 'salaryEur') {
          updated.salaryNok = Math.round(Number(value) * EUR_TO_NOK);
        } else if (field === 'salaryNok') {
          updated.salaryEur = nokToEur(Number(value));
        }
        return updated;
      });
    },
    []
  );

  const toggleClause = useCallback((clauseId: string, required: boolean) => {
    if (required) return;
    setEnabledClauses((prev) => ({ ...prev, [clauseId]: !prev[clauseId] }));
  }, []);

  // Build equity distribution table using per-employee varied allocations
  const employeeEquityData = useMemo(() => {
    const name = formData.employeeName;
    const rows: { company: string; pct: number }[] = [];

    // Look up this employee in the detailed allocations table
    const alloc = employeeEquityAllocations.find((e) => e.name === name);

    if (alloc) {
      // Map company IDs to display names
      const companyIdToName: Record<string, string> = {
        'qdaria-holding': 'QDaria Holdings AS',
      };
      for (const spinoff of spinoffCompanies) {
        companyIdToName[spinoff.id] = spinoff.name;
      }

      // Iterate allocations in a stable order: holding first, then spinoffs
      const orderedIds = ['qdaria-holding', ...spinoffCompanies.map((s) => s.id)];
      for (const companyId of orderedIds) {
        const pct = alloc.allocations[companyId];
        if (pct !== undefined && pct > 0) {
          rows.push({
            company: companyIdToName[companyId] || companyId,
            pct,
          });
        }
      }
    } else {
      // Fallback: use formData.equityPercentage for holding only
      rows.push({ company: 'QDaria Holdings AS', pct: formData.equityPercentage });
    }

    const total = rows.reduce((sum, r) => sum + r.pct, 0);
    return { rows, total };
  }, [formData.employeeName, formData.equityPercentage]);

  // Build salary progression for the selected employee
  const employeeSalaryData = useMemo(() => {
    const entry = salaryProgression.find((e) => e.name === formData.employeeName);
    return entry;
  }, [formData.employeeName]);

  const templateValues = useMemo(
    () => {
      // Use actual salary data if available, otherwise approximate
      const salaryEntry = employeeSalaryData;
      const seedSalary = salaryEntry ? formatNok(salaryEntry.salaries['seed']) : formatNok(Math.round(formData.salaryEur * 1.25));
      const seriesASalary = salaryEntry ? formatNok(salaryEntry.salaries['round-a']) : formatNok(Math.round(formData.salaryEur * 1.6));
      const seriesBSalary = salaryEntry ? formatNok(salaryEntry.salaries['round-b']) : formatNok(Math.round(formData.salaryEur * 2.0));
      const seriesCSalary = salaryEntry ? formatNok(salaryEntry.salaries['round-c']) : formatNok(Math.round(formData.salaryEur * 2.5));
      const ipoSalary = salaryEntry ? formatNok(salaryEntry.salaries['ipo']) : formatNok(Math.round(formData.salaryEur * 3.0));

      // Build equity table text for template insertion
      const eqRows = employeeEquityData.rows;
      const maxNameLen = Math.max(...eqRows.map((r) => r.company.length), 'Company'.length);
      const equityTableLines: string[] = [];
      const headerLine = `  ${'Company'.padEnd(maxNameLen)}   Equity %`;
      const divider = `  ${'-'.repeat(maxNameLen)}   --------`;
      equityTableLines.push(headerLine);
      equityTableLines.push(divider);
      for (const row of eqRows) {
        equityTableLines.push(`  ${row.company.padEnd(maxNameLen)}   ${row.pct.toFixed(2)}%`);
      }
      equityTableLines.push(divider);
      equityTableLines.push(`  ${'TOTAL'.padEnd(maxNameLen)}   ${employeeEquityData.total.toFixed(2)}%`);

      return {
        employeeName: formData.employeeName,
        title: formData.title,
        department: formData.department,
        employmentType: EMPLOYMENT_TYPE_LABELS[formData.employmentType] || formData.employmentType,
        startDate: formData.startDate,
        salaryNok: formatNok(formData.salaryNok),
        salaryEur: formatNok(formData.salaryEur),
        equityPercentage: String(formData.equityPercentage),
        shareType: formData.shareType,
        cliffMonths: String(formData.cliffMonths),
        seedSalary,
        seriesASalary,
        seriesBSalary,
        seriesCSalary,
        ipoSalary,
        roleDuties: getRoleDuties(formData.title),
        equityTable: equityTableLines.join('\n'),
        totalEquityPct: employeeEquityData.total.toFixed(2),
      };
    },
    [formData, employeeEquityData, employeeSalaryData]
  );

  const activeClauses = useMemo(
    () =>
      employmentContractTemplate.clauses.filter(
        (c) => enabledClauses[c.id]
      ),
    [enabledClauses]
  );

  const filledClauses = useMemo(
    () =>
      activeClauses.map((c) => ({
        ...c,
        filledContent: fillTemplatePlaceholders(c.content, templateValues),
      })),
    [activeClauses, templateValues]
  );

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return formData.employeeName.trim().length > 0;
      case 2:
        return (
          formData.employeeName.trim().length > 0 &&
          formData.title.trim().length > 0 &&
          formData.salaryEur > 0
        );
      case 3:
        return activeClauses.length > 0;
      default:
        return true;
    }
  }, [step, formData, activeClauses]);

  const generatePdf = useCallback(async () => {
    const { generateContractPdfForEmployee } = await import('../../../utils/generate-contract-pdf');
    const enabledIds = new Set(
      employmentContractTemplate.clauses
        .filter((c) => enabledClauses[c.id])
        .map((c) => c.id),
    );
    await generateContractPdfForEmployee({
      employeeName: formData.employeeName,
      enabledClauseIds: enabledIds,
      overrides: {
        title: formData.title,
        department: formData.department,
        employmentType: formData.employmentType,
        startDate: formData.startDate,
        salaryEur: formData.salaryEur,
        equityPercentage: formData.equityPercentage,
        shareType: formData.shareType,
        cliffMonths: formData.cliffMonths,
        tier: formData.tier,
      },
    });
    if (onGenerated) onGenerated();
  }, [formData, enabledClauses, onGenerated]);

  // --- RENDER ---
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0e1a]/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#070b14] px-6 py-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Generate Employment Contract</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Step indicators */}
      <div className="border-b border-gray-800 bg-[#070b14]/50 px-6 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <React.Fragment key={s.id}>
                {i > 0 && (
                  <div
                    className={`mx-2 h-px flex-1 ${
                      isCompleted ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  />
                )}
                <button
                  onClick={() => {
                    if (isCompleted || isActive) setStep(s.id);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : isCompleted
                        ? 'text-cyan-400/70 hover:text-cyan-400'
                        : 'text-gray-500'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      isActive
                        ? 'bg-cyan-500 text-black'
                        : isCompleted
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : s.id}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                  <Icon className="h-4 w-4 sm:hidden" />
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-3xl">
          {/* STEP 1: Select Employee */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Select Team Member</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Choose an employee to pre-fill contract details, or enter manually.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Employee
                </label>
                <select
                  value={selectedEmployeeIdx}
                  onChange={handleEmployeeSelect}
                  className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50"
                >
                  <option value={-1}>Select a team member...</option>
                  {teamMembersSeed.map((m, i) => (
                    <option key={i} value={i}>
                      {m.name} -- {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEmployeeIdx >= 0 && (
                <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name</span>
                      <p className="font-medium text-white">{formData.employeeName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Title</span>
                      <p className="font-medium text-white">{formData.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Department</span>
                      <p className="font-medium text-white">{formData.department}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Employment Type</span>
                      <p className="font-medium text-white">
                        {EMPLOYMENT_TYPE_LABELS[formData.employmentType]}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Salary (EUR)</span>
                      <p className="font-medium text-white">
                        EUR {formatNok(formData.salaryEur)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Equity</span>
                      <p className="font-medium text-white">
                        {formData.equityPercentage}% ({formData.shareType})
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Cliff</span>
                      <p className="font-medium text-white">
                        {formData.cliffMonths} months
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Tier</span>
                      <p className="font-medium text-white">{formData.tier}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Review & Edit Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Review Contract Details</h3>
                <p className="mt-1 text-sm text-gray-400">
                  All fields are editable. Modify any value before generating.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldInput
                  label="Full Name"
                  value={formData.employeeName}
                  onChange={(v) => handleFieldChange('employeeName', v)}
                />
                <FieldInput
                  label="Position / Title"
                  value={formData.title}
                  onChange={(v) => handleFieldChange('title', v)}
                />
                <FieldInput
                  label="Department"
                  value={formData.department}
                  onChange={(v) => handleFieldChange('department', v)}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      handleFieldChange('employmentType', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="flex">Flex</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>
                <FieldInput
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(v) => handleFieldChange('startDate', v)}
                />
                <FieldInput
                  label="Salary (EUR)"
                  type="number"
                  value={String(formData.salaryEur)}
                  onChange={(v) => handleFieldChange('salaryEur', Number(v))}
                  suffix={`~ ${formatNok(formData.salaryNok)} NOK`}
                />
                <FieldInput
                  label="Equity (%)"
                  type="number"
                  value={String(formData.equityPercentage)}
                  onChange={(v) =>
                    handleFieldChange('equityPercentage', Number(v))
                  }
                  step="0.01"
                />
                <FieldInput
                  label="Share Type"
                  value={formData.shareType}
                  onChange={(v) => handleFieldChange('shareType', v)}
                />
                <FieldInput
                  label="Cliff (months)"
                  type="number"
                  value={String(formData.cliffMonths)}
                  onChange={(v) => handleFieldChange('cliffMonths', Number(v))}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    Severance
                  </label>
                  <div className="rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-400">
                    {getSeveranceMonths(formData.tier)} months (based on{' '}
                    {formData.tier || 'N/A'} tier)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Toggle Clauses */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Contract Clauses</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Enable or disable optional clauses. Required clauses cannot be removed.
                </p>
              </div>
              <div className="space-y-3">
                {employmentContractTemplate.clauses.map((clause) => (
                  <ClauseCard
                    key={clause.id}
                    clause={clause}
                    enabled={enabledClauses[clause.id]}
                    onToggle={() => toggleClause(clause.id, clause.required)}
                    previewText={fillTemplatePlaceholders(
                      clause.content,
                      templateValues
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Preview & Download */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Contract Preview</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Review the final contract before downloading.
                  </p>
                </div>
                <button
                  onClick={generatePdf}
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-400"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>

              {/* Contract Preview */}
              <div className="rounded-xl border border-gray-800 bg-[#0f1420] p-8">
                {/* Header */}
                <div className="mb-6 border-b border-gray-700 pb-6">
                  <h2 className="text-xl font-bold text-cyan-400">
                    QDARIA HOLDINGS AS
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Employment Agreement
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>Org. Nr. 932 163 378</span>
                    <span>
                      {new Date().toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Employee Details */}
                <div className="mb-6 rounded-lg border border-gray-700/50 bg-[#111827] p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Employee Details
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Name: </span>
                      <span className="text-white">{formData.employeeName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Position: </span>
                      <span className="text-white">{formData.title}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department: </span>
                      <span className="text-white">{formData.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type: </span>
                      <span className="text-white">
                        {EMPLOYMENT_TYPE_LABELS[formData.employmentType]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clauses */}
                <div className="space-y-6">
                  {filledClauses.map((clause) => (
                    <div key={clause.id}>
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-300">
                        {clause.filledContent}
                      </pre>
                    </div>
                  ))}
                </div>

                {/* Signatures */}
                <div className="mt-10 border-t border-gray-700 pt-8">
                  <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">
                    Signatures
                  </h4>
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <p className="mb-8 text-xs text-gray-500">Employee:</p>
                      <div className="border-b border-gray-600" />
                      <p className="mt-2 text-sm text-white">
                        {formData.employeeName}
                      </p>
                      <p className="text-xs text-gray-500">Date: _______________</p>
                    </div>
                    <div>
                      <p className="mb-8 text-xs text-gray-500">
                        For QDaria Holdings AS:
                      </p>
                      <div className="border-b border-gray-600" />
                      <p className="mt-2 text-sm text-white">
                        Daniel Mo Houshmand, CEO
                      </p>
                      <p className="text-xs text-gray-500">Date: _______________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between border-t border-gray-800 bg-[#070b14] px-6 py-4">
        <button
          onClick={() => (step === 1 ? onClose() : setStep(step - 1))}
          className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          {step === 1 ? 'Cancel' : 'Back'}
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={generatePdf}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-400"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}

// --- Sub-components ---

function FieldInput({
  label,
  value,
  onChange,
  type = 'text',
  suffix,
  step,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  suffix?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ClauseCard({
  clause,
  enabled,
  onToggle,
  previewText,
}: {
  clause: ContractClause;
  enabled: boolean;
  onToggle: () => void;
  previewText: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const categoryColors: Record<string, string> = {
    employment: 'bg-blue-500/20 text-blue-400',
    compensation: 'bg-emerald-500/20 text-emerald-400',
    equity: 'bg-purple-500/20 text-purple-400',
    nda: 'bg-red-500/20 text-red-400',
    non_compete: 'bg-amber-500/20 text-amber-400',
    conflict: 'bg-orange-500/20 text-orange-400',
    professional_dev: 'bg-cyan-500/20 text-cyan-400',
    termination: 'bg-rose-500/20 text-rose-400',
    severance: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div
      className={`rounded-xl border transition-colors ${
        enabled
          ? 'border-gray-700 bg-[#111827]'
          : 'border-gray-800/50 bg-[#111827]/50 opacity-60'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Toggle */}
        <button
          onClick={onToggle}
          className={`relative flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
            clause.required
              ? 'cursor-not-allowed bg-cyan-500/30'
              : enabled
                ? 'cursor-pointer bg-cyan-500'
                : 'cursor-pointer bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>

        {/* Info */}
        <div className="flex flex-1 items-center gap-2">
          <span className="text-sm font-medium text-white">{clause.title}</span>
          <span
            className={`rounded px-1.5 py-0.5 text-xs ${
              categoryColors[clause.category] || 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {clause.category.replace('_', ' ')}
          </span>
          {clause.required && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Lock className="h-3 w-3" />
              Required
            </span>
          )}
        </div>

        {/* Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded p-1 text-gray-500 transition-colors hover:text-gray-300"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* Preview */}
      {expanded && enabled && (
        <div className="border-t border-gray-800 px-4 py-3">
          <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-gray-400">
            {previewText}
          </pre>
        </div>
      )}
    </div>
  );
}
