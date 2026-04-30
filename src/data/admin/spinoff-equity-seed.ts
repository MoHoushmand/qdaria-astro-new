/**
 * Spin-off company equity structures for QDaria Holdings portfolio.
 * Each spin-off follows a 70/30 CEO/Investor split with milestone-based employee triggers.
 *
 * Updated 2026-04-28 — Holding restructure:
 *   - Removed: THQAI, QIoT, Lillian Research Center (8 spinoffs -> 6)
 *   - Added: QLillian (founder-support and portfolio operations entity)
 *   - Lillian Kristiansen promoted to "Founding Supporter" tier (5.00% total, 0.75% holding + 6 x 0.7083% spinoffs)
 *   - Other employee TOTALS unchanged; per-spinoff rates rebalanced upward to absorb 8->6 reduction
 *   - Contingent Reallocation: per-spinoff equity for unregistered subsidiaries (as of 2029-12-31)
 *     redistributes pro-rata across registered survivors. Holding allocation never affected.
 *     See `getEffectiveAllocations()` below.
 */

export interface FundingRound {
  name: string;
  investorPoolPct: number;
  employeePoolTriggerPct: number;
  /** Approximate funding target in EUR */
  fundingTargetEur: number;
}

export interface SpinoffEmployee {
  name: string;
  role: string;
  /** Equity % that vests upon funding milestone trigger */
  milestonePct: number;
  triggerRound: string;
}

export interface SpinoffCompany {
  id: string;
  name: string;
  description: string;
  ceoName: string;
  ceoPct: number;
  investorPoolPct: number;
  fundingRounds: FundingRound[];
  employees: SpinoffEmployee[];
  specialConditions?: string;
}

/** Standard funding round breakdown (of the 30% investor pool) */
export const standardFundingRounds: FundingRound[] = [
  {
    name: "Seed",
    investorPoolPct: 10,
    employeePoolTriggerPct: 2,
    fundingTargetEur: 12_000_000,
  },
  {
    name: "Series A",
    investorPoolPct: 8,
    employeePoolTriggerPct: 3,
    fundingTargetEur: 40_000_000,
  },
  {
    name: "Series B",
    investorPoolPct: 6,
    employeePoolTriggerPct: 2,
    fundingTargetEur: 120_000_000,
  },
  {
    name: "Series C",
    investorPoolPct: 4,
    employeePoolTriggerPct: 1.5,
    fundingTargetEur: 300_000_000,
  },
  {
    name: "IPO",
    investorPoolPct: 2,
    employeePoolTriggerPct: 1,
    fundingTargetEur: 1_000_000_000,
  },
];

/** Per-spinoff funding targets based on industry benchmarks (EUR) */
export const spinoffFundingTargets: Record<
  string,
  {
    seed: number;
    seriesA: number;
    seriesB: number;
    seriesC: number;
    ipo: number;
  }
> = {
  zipminator: {
    seed: 10_000_000,
    seriesA: 30_000_000,
    seriesB: 100_000_000,
    seriesC: 250_000_000,
    ipo: 750_000_000,
  },
  qm9: {
    seed: 12_000_000,
    seriesA: 40_000_000,
    seriesB: 120_000_000,
    seriesC: 300_000_000,
    ipo: 1_000_000_000,
  },
  qmikeai: {
    seed: 8_000_000,
    seriesA: 25_000_000,
    seriesB: 80_000_000,
    seriesC: 200_000_000,
    ipo: 600_000_000,
  },
  qnilaya: {
    seed: 10_000_000,
    seriesA: 35_000_000,
    seriesB: 100_000_000,
    seriesC: 250_000_000,
    ipo: 800_000_000,
  },
  qdiana: {
    seed: 5_000_000,
    seriesA: 15_000_000,
    seriesB: 40_000_000,
    seriesC: 100_000_000,
    ipo: 300_000_000,
  },
  qlillian: {
    seed: 5_000_000,
    seriesA: 15_000_000,
    seriesB: 50_000_000,
    seriesC: 120_000_000,
    ipo: 350_000_000,
  },
};

// =============================================================================
// Tier rates (post-rebalance, 6 spinoffs)
// Per-spinoff rates expressed as exact fractions to preserve precision.
// Total = holdingPct + 6 * perSpinoffPct
// =============================================================================

/** C-Suite: 1.0% holding + 6 x 0.6667% spinoffs = 5.00% total */
const C_SUITE_PER_SPINOFF = 4.0 / 6; // 0.6667%

/** Senior: 0.75% holding + 6 x 0.5000% spinoffs = 3.75% total */
const SENIOR_PER_SPINOFF = 3.0 / 6; // 0.5000%

/** Founding Supporter (Lillian only): 0.75% holding + 6 x 0.7083% spinoffs = 5.00% total */
const FOUNDING_SUPPORTER_PER_SPINOFF = 4.25 / 6; // 0.7083%

/** Mid: 0.5% holding + 6 x 0.3333% spinoffs = 2.50% total */
const MID_PER_SPINOFF = 2.0 / 6; // 0.3333%

/** Junior/Board: 0.5% holding + 6 x 0.3333% spinoffs = 2.50% total */
const JUNIOR_PER_SPINOFF = 2.0 / 6; // 0.3333%

// =============================================================================
// Per-spinoff seed-trigger employee lists (used inside spinoffCompanies)
// =============================================================================

const cSuiteEmployees: SpinoffEmployee[] = [
  {
    name: "Sharareh M. Shariat Panahi",
    role: "Asst. CEO",
    milestonePct: C_SUITE_PER_SPINOFF,
    triggerRound: "Seed",
  },
];

const seniorEmployees: SpinoffEmployee[] = [
  {
    name: "Caroline Woie",
    role: "Chief Content Officer",
    milestonePct: SENIOR_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "Rajesh Chavan",
    role: "Chief Strategy & Growth Officer",
    milestonePct: SENIOR_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "John Kristiansen",
    role: "Head of Networking",
    milestonePct: SENIOR_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "Lindsay Sanner",
    role: "Chief Social Responsibility Officer",
    milestonePct: SENIOR_PER_SPINOFF,
    triggerRound: "Seed",
  },
];

const foundingSupporterEmployees: SpinoffEmployee[] = [
  {
    name: "Lillian Kristiansen",
    role: "Chief Admin Officer (Founding Supporter)",
    milestonePct: FOUNDING_SUPPORTER_PER_SPINOFF,
    triggerRound: "Seed",
  },
];

const midEmployees: SpinoffEmployee[] = [
  {
    name: "Gaspar Alvarado",
    role: "Finance Director",
    milestonePct: MID_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "Nick Saaf",
    role: "Sales Director",
    milestonePct: MID_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "Yulia Ginzburg",
    role: "Chief Data Officer",
    milestonePct: MID_PER_SPINOFF,
    triggerRound: "Seed",
  },
  {
    name: "Nils Bjelland Gronvold",
    role: "Head of Culture & Events",
    milestonePct: MID_PER_SPINOFF,
    triggerRound: "Seed",
  },
];

const juniorBoardEmployees: SpinoffEmployee[] = [
  {
    name: "Daria Houshmand",
    role: "Dev Intern & Board",
    milestonePct: JUNIOR_PER_SPINOFF,
    triggerRound: "Seed",
  },
];

// Fredrik Krey Stubberud: NO spinoff equity — performance-only at Holdings level (0.25%).
// Future spinoff grants require verified milestones and Board approval.

const allEmployees: SpinoffEmployee[] = [
  ...cSuiteEmployees,
  ...seniorEmployees,
  ...foundingSupporterEmployees,
  ...midEmployees,
  ...juniorBoardEmployees,
];

// =============================================================================
// Spinoff company definitions (6 entities, post-restructure 2026-04-28)
// =============================================================================

export const spinoffCompanies: SpinoffCompany[] = [
  {
    id: "zipminator",
    name: "Zipminator",
    description:
      "Quantum-secure encryption platform for enterprise data protection",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: "qm9",
    name: "Qm9",
    description:
      "Quantum fintech — HFDT, portfolio optimisation, risk assessment, algorithmic day trading",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: "qmikeai",
    name: "QMikeAI",
    description:
      "Quantum-enhanced HPC research institution — weather forecasting, climate modelling, scientific computing",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: "qnilaya",
    name: "QNilaya",
    description:
      "Quantum health tech — precision medicine, drug discovery, genomics, and clinical AI",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
    specialConditions:
      "CEO candidate TBD. Conditional 20% equity at holding level subject to 5-6 year milestone vesting for securing large-scale topological quantum computer funding.",
  },
  {
    id: "qdiana",
    name: "QDiana",
    description:
      "Quantum-enhanced educational platform — adaptive learning, curriculum design, and knowledge assessment",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: "qlillian",
    name: "QLillian",
    description:
      "Founder-support and portfolio operations entity — admin, governance, people-ops, and cross-subsidiary coordination across QDaria Holdings.",
    ceoName: "Daniel Mo Houshmand",
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
];

/** All registered spinoff IDs in canonical order. Update this list as subsidiaries incorporate. */
export const ALL_SPINOFF_IDS = [
  "zipminator",
  "qm9",
  "qmikeai",
  "qnilaya",
  "qdiana",
  "qlillian",
] as const;
export type SpinoffId = (typeof ALL_SPINOFF_IDS)[number];

/** Helper: get company by ID */
export function getSpinoff(id: string): SpinoffCompany | undefined {
  return spinoffCompanies.find((c) => c.id === id);
}

/** Per-employee equity allocation across all companies */
export interface EmployeeEquityMap {
  name: string;
  /** Total equity across all companies including holding */
  totalPct: number;
  /** Per-company breakdown */
  allocations: Record<string, number>; // company id -> percentage
}

/**
 * Tiered equity allocations across all companies (post-rebalance).
 *
 *   C-Suite:            1.00% Holdings + 6 x 0.6667% spinoffs = 5.00%
 *   Senior:             0.75% Holdings + 6 x 0.5000% spinoffs = 3.75%
 *   Founding Supporter: 0.75% Holdings + 6 x 0.7083% spinoffs = 5.00%   (Lillian Kristiansen only)
 *   Mid:                0.50% Holdings + 6 x 0.3333% spinoffs = 2.50%
 *   Junior/Board:       0.50% Holdings + 6 x 0.3333% spinoffs = 2.50%
 *   Performance-only:   0.25% Holdings only                   = 0.25%   (Fredrik, no spinoffs)
 *
 * Totals match the prior 8-spinoff structure (except Lillian, who moves 3.75 -> 5.00).
 */
export const employeeEquityAllocations: EmployeeEquityMap[] = [
  // C-Suite
  {
    name: "Sharareh M. Shariat Panahi",
    totalPct: 1.0 + 6 * C_SUITE_PER_SPINOFF, // 5.00%
    allocations: {
      "qdaria-holding": 1.0,
      zipminator: C_SUITE_PER_SPINOFF,
      qm9: C_SUITE_PER_SPINOFF,
      qmikeai: C_SUITE_PER_SPINOFF,
      qnilaya: C_SUITE_PER_SPINOFF,
      qdiana: C_SUITE_PER_SPINOFF,
      qlillian: C_SUITE_PER_SPINOFF,
    },
  },
  // Senior
  {
    name: "Caroline Woie",
    totalPct: 0.75 + 6 * SENIOR_PER_SPINOFF, // 3.75%
    allocations: {
      "qdaria-holding": 0.75,
      zipminator: SENIOR_PER_SPINOFF,
      qm9: SENIOR_PER_SPINOFF,
      qmikeai: SENIOR_PER_SPINOFF,
      qnilaya: SENIOR_PER_SPINOFF,
      qdiana: SENIOR_PER_SPINOFF,
      qlillian: SENIOR_PER_SPINOFF,
    },
  },
  {
    name: "Rajesh Chavan",
    totalPct: 0.75 + 6 * SENIOR_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.75,
      zipminator: SENIOR_PER_SPINOFF,
      qm9: SENIOR_PER_SPINOFF,
      qmikeai: SENIOR_PER_SPINOFF,
      qnilaya: SENIOR_PER_SPINOFF,
      qdiana: SENIOR_PER_SPINOFF,
      qlillian: SENIOR_PER_SPINOFF,
    },
  },
  {
    name: "John Kristiansen",
    totalPct: 0.75 + 6 * SENIOR_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.75,
      zipminator: SENIOR_PER_SPINOFF,
      qm9: SENIOR_PER_SPINOFF,
      qmikeai: SENIOR_PER_SPINOFF,
      qnilaya: SENIOR_PER_SPINOFF,
      qdiana: SENIOR_PER_SPINOFF,
      qlillian: SENIOR_PER_SPINOFF,
    },
  },
  {
    name: "Lindsay Sanner",
    totalPct: 0.75 + 6 * SENIOR_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.75,
      zipminator: SENIOR_PER_SPINOFF,
      qm9: SENIOR_PER_SPINOFF,
      qmikeai: SENIOR_PER_SPINOFF,
      qnilaya: SENIOR_PER_SPINOFF,
      qdiana: SENIOR_PER_SPINOFF,
      qlillian: SENIOR_PER_SPINOFF,
    },
  },
  // Founding Supporter — Lillian only (5.00% total)
  {
    name: "Lillian Kristiansen",
    totalPct: 0.75 + 6 * FOUNDING_SUPPORTER_PER_SPINOFF, // 5.00%
    allocations: {
      "qdaria-holding": 0.75,
      zipminator: FOUNDING_SUPPORTER_PER_SPINOFF,
      qm9: FOUNDING_SUPPORTER_PER_SPINOFF,
      qmikeai: FOUNDING_SUPPORTER_PER_SPINOFF,
      qnilaya: FOUNDING_SUPPORTER_PER_SPINOFF,
      qdiana: FOUNDING_SUPPORTER_PER_SPINOFF,
      qlillian: FOUNDING_SUPPORTER_PER_SPINOFF,
    },
  },
  // Mid
  {
    name: "Gaspar Alvarado",
    totalPct: 0.5 + 6 * MID_PER_SPINOFF, // 2.50%
    allocations: {
      "qdaria-holding": 0.5,
      zipminator: MID_PER_SPINOFF,
      qm9: MID_PER_SPINOFF,
      qmikeai: MID_PER_SPINOFF,
      qnilaya: MID_PER_SPINOFF,
      qdiana: MID_PER_SPINOFF,
      qlillian: MID_PER_SPINOFF,
    },
  },
  {
    name: "Nick Saaf",
    totalPct: 0.5 + 6 * MID_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.5,
      zipminator: MID_PER_SPINOFF,
      qm9: MID_PER_SPINOFF,
      qmikeai: MID_PER_SPINOFF,
      qnilaya: MID_PER_SPINOFF,
      qdiana: MID_PER_SPINOFF,
      qlillian: MID_PER_SPINOFF,
    },
  },
  // Performance-only (Holdings only, no spinoffs)
  {
    name: "Fredrik Krey Stubberud",
    totalPct: 0.25,
    allocations: {
      "qdaria-holding": 0.25,
      // No spinoff equity. Future grants require verified milestones + Board approval.
    },
  },
  {
    name: "Yulia Ginzburg",
    totalPct: 0.5 + 6 * MID_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.5,
      zipminator: MID_PER_SPINOFF,
      qm9: MID_PER_SPINOFF,
      qmikeai: MID_PER_SPINOFF,
      qnilaya: MID_PER_SPINOFF,
      qdiana: MID_PER_SPINOFF,
      qlillian: MID_PER_SPINOFF,
    },
  },
  {
    name: "Nils Bjelland Gronvold",
    totalPct: 0.5 + 6 * MID_PER_SPINOFF,
    allocations: {
      "qdaria-holding": 0.5,
      zipminator: MID_PER_SPINOFF,
      qm9: MID_PER_SPINOFF,
      qmikeai: MID_PER_SPINOFF,
      qnilaya: MID_PER_SPINOFF,
      qdiana: MID_PER_SPINOFF,
      qlillian: MID_PER_SPINOFF,
    },
  },
  // Junior/Board
  {
    name: "Daria Houshmand",
    totalPct: 0.5 + 6 * JUNIOR_PER_SPINOFF, // 2.50%
    allocations: {
      "qdaria-holding": 0.5,
      zipminator: JUNIOR_PER_SPINOFF,
      qm9: JUNIOR_PER_SPINOFF,
      qmikeai: JUNIOR_PER_SPINOFF,
      qnilaya: JUNIOR_PER_SPINOFF,
      qdiana: JUNIOR_PER_SPINOFF,
      qlillian: JUNIOR_PER_SPINOFF,
    },
  },
];

// =============================================================================
// Contingent Reallocation (Section 6.X of every contract, deadline 2029-12-31)
// =============================================================================

/**
 * Recompute per-employee allocations using only the registered spinoffs.
 *
 * Rule (per Mo, 2026-04-28): if a named spinoff fails to incorporate by 2029-12-31,
 * its per-employee equity grant is redistributed pro-rata across the registered
 * survivors. Holding allocation is never affected. Each employee's TOTAL equity
 * stays constant across reallocation scenarios.
 *
 * @param registeredIds  Subset of ALL_SPINOFF_IDS that are registered.
 *                       Defaults to all 6 (no reallocation).
 * @returns              EmployeeEquityMap[] with allocations rebuilt for the survivor set.
 *
 * Example (Senior tier, QDiana + QMikeAI fail to incorporate):
 *   getEffectiveAllocations(['zipminator', 'qm9', 'qnilaya', 'qlillian'])
 *   -> Senior per-spinoff = 0.5 + (2 * 0.5) / 4 = 0.75% per surviving spinoff
 *   -> Total = 0.75 (holding) + 4 * 0.75 = 3.75% (unchanged)
 */
export function getEffectiveAllocations(
  registeredIds: ReadonlyArray<string> = ALL_SPINOFF_IDS,
): EmployeeEquityMap[] {
  const survivors = ALL_SPINOFF_IDS.filter((id) => registeredIds.includes(id));

  return employeeEquityAllocations.map((emp) => {
    const holdingPct = emp.allocations["qdaria-holding"] ?? 0;
    const lapsedTotal = ALL_SPINOFF_IDS.filter(
      (id) => !survivors.includes(id),
    ).reduce((sum, id) => sum + (emp.allocations[id] ?? 0), 0);

    if (survivors.length === 0) {
      return {
        ...emp,
        allocations: holdingPct > 0 ? { "qdaria-holding": holdingPct } : {},
        totalPct: holdingPct,
      };
    }

    const bonusPerSurvivor = lapsedTotal / survivors.length;
    const newAllocations: Record<string, number> = {};
    if (holdingPct > 0) newAllocations["qdaria-holding"] = holdingPct;

    let spinoffSum = 0;
    for (const id of survivors) {
      const original = emp.allocations[id] ?? 0;
      if (original > 0 || bonusPerSurvivor > 0) {
        const updated = original + bonusPerSurvivor;
        newAllocations[id] = updated;
        spinoffSum += updated;
      }
    }

    return {
      ...emp,
      allocations: newAllocations,
      totalPct: holdingPct + spinoffSum,
    };
  });
}

// =============================================================================
// Funding milestone bonuses (unchanged — apply across all employees)
// =============================================================================

export interface FundingMilestoneBonus {
  round: string;
  salaryBonusPct: number;
  equityAccelerationPct: number;
  trigger: string;
  fundingTarget: string;
}

export const fundingMilestoneBonuses: FundingMilestoneBonus[] = [
  {
    round: "Seed",
    salaryBonusPct: 10,
    equityAccelerationPct: 5,
    trigger: "Round close date",
    fundingTarget: "12M",
  },
  {
    round: "Series A",
    salaryBonusPct: 15,
    equityAccelerationPct: 10,
    trigger: "Round close date",
    fundingTarget: "40M",
  },
  {
    round: "Series B",
    salaryBonusPct: 20,
    equityAccelerationPct: 10,
    trigger: "Round close date",
    fundingTarget: "120M",
  },
  {
    round: "Series C",
    salaryBonusPct: 25,
    equityAccelerationPct: 15,
    trigger: "Round close date",
    fundingTarget: "300M",
  },
  {
    round: "IPO",
    salaryBonusPct: 50,
    equityAccelerationPct: 100,
    trigger: "IPO date",
    fundingTarget: "1B+",
  },
];

/** Performance-based equity increases for employees who materially contribute to funding */
export interface PerformanceEquityIncrease {
  description: string;
  maxTotalPct: number;
  trigger: string;
}

export const performanceEquityPolicy: PerformanceEquityIncrease[] = [
  {
    description: "Material contribution to Seed round closure",
    maxTotalPct: 8,
    trigger: "Board approval upon round close",
  },
  {
    description: "Material contribution to Series A closure",
    maxTotalPct: 12,
    trigger: "Board approval upon round close",
  },
  {
    description: "Material contribution to Series B closure",
    maxTotalPct: 15,
    trigger: "Board approval upon round close",
  },
  {
    description: "Material contribution to Series C or later",
    maxTotalPct: 20,
    trigger: "Board approval upon round close",
  },
];
