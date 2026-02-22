/**
 * Spin-off company equity structures for QDaria Holdings portfolio.
 * Each spin-off follows a 70/30 CEO/Investor split with milestone-based employee triggers.
 * Updated Feb 2026 — flat 0.5% per employee per spinoff (5.0% total across all companies).
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
  { name: 'Seed', investorPoolPct: 10, employeePoolTriggerPct: 2, fundingTargetEur: 12_000_000 },
  { name: 'Series A', investorPoolPct: 8, employeePoolTriggerPct: 3, fundingTargetEur: 40_000_000 },
  { name: 'Series B', investorPoolPct: 6, employeePoolTriggerPct: 2, fundingTargetEur: 120_000_000 },
  { name: 'Series C', investorPoolPct: 4, employeePoolTriggerPct: 1.5, fundingTargetEur: 300_000_000 },
  { name: 'IPO', investorPoolPct: 2, employeePoolTriggerPct: 1, fundingTargetEur: 1_000_000_000 },
];

/** Per-spinoff funding targets based on industry benchmarks (EUR) */
export const spinoffFundingTargets: Record<string, { seed: number; seriesA: number; seriesB: number; seriesC: number; ipo: number }> = {
  'zipminator': { seed: 10_000_000, seriesA: 30_000_000, seriesB: 100_000_000, seriesC: 250_000_000, ipo: 750_000_000 },
  'qm9': { seed: 12_000_000, seriesA: 40_000_000, seriesB: 120_000_000, seriesC: 300_000_000, ipo: 1_000_000_000 },
  'qmikeai': { seed: 8_000_000, seriesA: 25_000_000, seriesB: 80_000_000, seriesC: 200_000_000, ipo: 600_000_000 },
  'thqai': { seed: 15_000_000, seriesA: 50_000_000, seriesB: 150_000_000, seriesC: 400_000_000, ipo: 1_500_000_000 },
  'qnilaya': { seed: 10_000_000, seriesA: 35_000_000, seriesB: 100_000_000, seriesC: 250_000_000, ipo: 800_000_000 },
  'qiot': { seed: 8_000_000, seriesA: 25_000_000, seriesB: 70_000_000, seriesC: 180_000_000, ipo: 500_000_000 },
  'lillian-research': { seed: 5_000_000, seriesA: 15_000_000, seriesB: 50_000_000, seriesC: 120_000_000, ipo: 350_000_000 },
  'qdiana': { seed: 5_000_000, seriesA: 15_000_000, seriesB: 40_000_000, seriesC: 100_000_000, ipo: 300_000_000 },
};

/** All employees — flat 0.5% per spinoff (Seed trigger) */
const allEmployees: SpinoffEmployee[] = [
  { name: 'Svein-Erik Nilsen', role: 'COO', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Sharareh M. Shariat Panahi', role: 'Asst. CEO', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Caroline Woie', role: 'Chief Content Officer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Rajesh Chavan', role: 'Chief Strategy & Growth Officer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Lillian Kristiansen', role: 'Chief Admin Officer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'John Kristiansen', role: 'Head of Networking', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Lindsay Sanner', role: 'Chief Social Responsibility Officer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Gaspar Alvarado', role: 'Finance Director', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Nick Saaf', role: 'Sales Director', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Fredrik Krey Stubberud', role: 'Test Engineer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Yulia Ginzburg', role: 'Chief Data Officer', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Nils Bjelland Gronvold', role: 'Head of Culture & Events', milestonePct: 0.5, triggerRound: 'Seed' },
  { name: 'Daria Houshmand', role: 'Dev Intern & Board', milestonePct: 0.5, triggerRound: 'Seed' },
];

export const spinoffCompanies: SpinoffCompany[] = [
  {
    id: 'zipminator',
    name: 'Zipminator',
    description: 'Quantum-secure encryption platform for enterprise data protection',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'qm9',
    name: 'Qm9',
    description: 'Quantum fintech — HFDT, portfolio optimisation, risk assessment, algorithmic day trading',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'qmikeai',
    name: 'QMikeAI',
    description: 'Quantum-enhanced HPC research institution — weather forecasting, climate modelling, scientific computing',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'thqai',
    name: 'THQAI',
    description: 'Quantum-enhanced AI — large language models, reasoning engines, and intelligent systems',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'qnilaya',
    name: 'QNilaya',
    description: 'Quantum health tech — precision medicine, drug discovery, genomics, and clinical AI',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
    specialConditions: 'Svein-Erik Nilsen is CEO candidate. If he secures funding for large-scale topological quantum computer with Fibonacci anyons, conditional 20% equity at holding level subject to 5-6 year milestone vesting. Must resolve Naoris Protocol conflict of interest (cessation of all advisory, promotional, and financial interests in competing quantum cybersecurity ventures). Norwegian law: non-compete max 12 months with mandatory compensation per Arbeidsmiljoloven Chapter 14A.',
  },
  {
    id: 'qiot',
    name: 'QIoT',
    description: 'Quantum Internet of Things — secure quantum-enhanced IoT networking',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'lillian-research',
    name: 'Lillian Research Center',
    description: 'Fundamental quantum research — theoretical and experimental quantum physics',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
  {
    id: 'qdiana',
    name: 'QDiana',
    description: 'Quantum-enhanced educational platform — adaptive learning, curriculum design, and knowledge assessment',
    ceoName: 'Daniel Mo Houshmand',
    ceoPct: 70,
    investorPoolPct: 30,
    fundingRounds: [...standardFundingRounds],
    employees: allEmployees,
  },
];

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

/** Flat 5.0% per employee: 1.0% QDaria Holdings + 0.5% in each of 8 spinoffs */
export const employeeEquityAllocations: EmployeeEquityMap[] = [
  {
    name: 'Svein-Erik Nilsen',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Sharareh M. Shariat Panahi',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Caroline Woie',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Rajesh Chavan',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Lillian Kristiansen',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'John Kristiansen',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Lindsay Sanner',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Gaspar Alvarado',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Nick Saaf',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Fredrik Krey Stubberud',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Yulia Ginzburg',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Nils Bjelland Gronvold',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
  {
    name: 'Daria Houshmand',
    totalPct: 5.0,
    allocations: {
      'qdaria-holding': 1.0, 'zipminator': 0.5, 'qm9': 0.5, 'qmikeai': 0.5,
      'thqai': 0.5, 'qnilaya': 0.5, 'qdiana': 0.5, 'qiot': 0.5, 'lillian-research': 0.5,
    },
  },
];

/** Funding milestone bonuses applicable to ALL employees */
export interface FundingMilestoneBonus {
  round: string;
  salaryBonusPct: number;
  equityAccelerationPct: number;
  trigger: string;
  fundingTarget: string;
}

export const fundingMilestoneBonuses: FundingMilestoneBonus[] = [
  { round: 'Seed', salaryBonusPct: 10, equityAccelerationPct: 5, trigger: 'Round close date', fundingTarget: '12M' },
  { round: 'Series A', salaryBonusPct: 15, equityAccelerationPct: 10, trigger: 'Round close date', fundingTarget: '40M' },
  { round: 'Series B', salaryBonusPct: 20, equityAccelerationPct: 10, trigger: 'Round close date', fundingTarget: '120M' },
  { round: 'Series C', salaryBonusPct: 25, equityAccelerationPct: 15, trigger: 'Round close date', fundingTarget: '300M' },
  { round: 'IPO', salaryBonusPct: 50, equityAccelerationPct: 100, trigger: 'IPO date', fundingTarget: '1B+' },
];

/** Performance-based equity increases for employees who materially contribute to funding */
export interface PerformanceEquityIncrease {
  description: string;
  maxTotalPct: number;
  trigger: string;
}

export const performanceEquityPolicy: PerformanceEquityIncrease[] = [
  { description: 'Material contribution to Seed round closure', maxTotalPct: 8, trigger: 'Board approval upon round close' },
  { description: 'Material contribution to Series A closure', maxTotalPct: 12, trigger: 'Board approval upon round close' },
  { description: 'Material contribution to Series B closure', maxTotalPct: 15, trigger: 'Board approval upon round close' },
  { description: 'Material contribution to Series C or later', maxTotalPct: 20, trigger: 'Board approval upon round close' },
];
