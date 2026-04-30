/**
 * Salary progression tiers for QDaria team members across funding rounds.
 * All values in EUR (annual gross base salary).
 *
 * Compensation methodology: pre-seed base = Norwegian median (`norwegianMedianSalaries`)
 * multiplied by (1 + pctOverMedian / 100). Per-employee pctOverMedian:
 *   12%: Sharareh, Lillian (founding circle, multi-portfolio role weight)
 *    8%: John (network depth premium)
 *    5%: every other senior, mid, and junior employee (standard QDaria offer)
 *  null: Daniel (founder-set base, set independently of the formula)
 *
 * Seed through IPO values preserve the existing tier-level growth ratio from
 * the prior schedule: each round multiplier per tier is held constant and
 * applied to the new pre-seed base, then rounded to the nearest 500.
 *
 * Bonus policy: Additional performance bonuses of 0-15% based on individual KPI
 * achievement and milestone completion. Bonuses evaluated quarterly by CEO and board.
 */

export const fundingRounds = [
  "pre-seed",
  "seed",
  "round-a",
  "round-b",
  "round-c",
  "ipo",
] as const;

export type FundingRound = (typeof fundingRounds)[number];

export const currentRound: FundingRound = "pre-seed";

export const fundingRoundLabels: Record<FundingRound, string> = {
  "pre-seed": "Pre-Seed",
  seed: "Seed",
  "round-a": "Round A",
  "round-b": "Round B",
  "round-c": "Round C",
  ipo: "IPO",
};

export type SalaryTier = "ceo" | "coo" | "senior" | "mid" | "junior";

export interface SalaryEntry {
  name: string;
  tier: SalaryTier;
  salaries: Record<FundingRound, number>;
}

export const salaryProgression: SalaryEntry[] = [
  {
    name: "Daniel Mo Houshmand",
    tier: "ceo",
    salaries: {
      "pre-seed": 160_000,
      seed: 185_000,
      "round-a": 220_000,
      "round-b": 260_000,
      "round-c": 310_000,
      ipo: 400_000,
    },
  },
  {
    name: "Lillian Kristiansen",
    tier: "senior",
    salaries: {
      "pre-seed": 98_560,
      seed: 106_500,
      "round-a": 137_000,
      "round-b": 157_500,
      "round-c": 183_000,
      ipo: 223_500,
    },
  },
  {
    name: "John Kristiansen",
    tier: "senior",
    salaries: {
      "pre-seed": 95_040,
      seed: 103_000,
      "round-a": 132_500,
      "round-b": 152_000,
      "round-c": 176_500,
      ipo: 215_500,
    },
  },
  {
    name: "Sharareh M. Shariat Panahi",
    tier: "coo",
    salaries: {
      "pre-seed": 112_000,
      seed: 124_500,
      "round-a": 181_500,
      "round-b": 207_500,
      "round-c": 254_000,
      ipo: 311_000,
    },
  },
  {
    name: "Caroline Woie",
    tier: "senior",
    salaries: {
      "pre-seed": 92_400,
      seed: 100_000,
      "round-a": 128_500,
      "round-b": 147_500,
      "round-c": 171_500,
      ipo: 209_500,
    },
  },
  {
    name: "Rajesh Chavan",
    tier: "senior",
    salaries: {
      "pre-seed": 92_400,
      seed: 100_000,
      "round-a": 128_500,
      "round-b": 147_500,
      "round-c": 171_500,
      ipo: 209_500,
    },
  },
  {
    name: "Lindsay Sanner",
    tier: "senior",
    salaries: {
      "pre-seed": 92_400,
      seed: 100_000,
      "round-a": 128_500,
      "round-b": 147_500,
      "round-c": 171_500,
      ipo: 209_500,
    },
  },
  {
    name: "Fredrik Krey Stubberud",
    tier: "mid",
    salaries: {
      "pre-seed": 78_750,
      seed: 86_500,
      "round-a": 105_000,
      "round-b": 120_000,
      "round-c": 140_500,
      ipo: 170_500,
    },
  },
  {
    name: "Nick Saaf",
    tier: "mid",
    salaries: {
      "pre-seed": 78_750,
      seed: 86_500,
      "round-a": 105_000,
      "round-b": 120_000,
      "round-c": 140_500,
      ipo: 170_500,
    },
  },
  {
    name: "Gaspar Alvarado",
    tier: "mid",
    salaries: {
      "pre-seed": 78_750,
      seed: 86_500,
      "round-a": 105_000,
      "round-b": 120_000,
      "round-c": 140_500,
      ipo: 170_500,
    },
  },
  {
    name: "Yulia Ginzburg",
    tier: "mid",
    salaries: {
      "pre-seed": 78_750,
      seed: 86_500,
      "round-a": 105_000,
      "round-b": 120_000,
      "round-c": 140_500,
      ipo: 170_500,
    },
  },
  {
    name: "Nils Bjelland Gronvold",
    tier: "mid",
    salaries: {
      "pre-seed": 78_750,
      seed: 86_500,
      "round-a": 105_000,
      "round-b": 120_000,
      "round-c": 140_500,
      ipo: 170_500,
    },
  },
  {
    name: "Daria Houshmand",
    tier: "junior",
    salaries: {
      "pre-seed": 47_250,
      seed: 51_500,
      "round-a": 62_500,
      "round-b": 72_000,
      "round-c": 84_000,
      ipo: 103_000,
    },
  },
];

/** Helper: get salary for a given name at the current funding round */
export function getCurrentSalary(name: string): number | undefined {
  const entry = salaryProgression.find((e) => e.name === name);
  return entry?.salaries[currentRound];
}

/** Helper: get salary tier for a given name */
export function getSalaryTier(name: string): SalaryTier | undefined {
  return salaryProgression.find((e) => e.name === name)?.tier;
}

/** Norwegian median salaries by tier (2025 data, EUR) */
export const norwegianMedianSalaries: Record<SalaryTier, number> = {
  ceo: 145_000,
  coo: 100_000,
  senior: 88_000,
  mid: 75_000,
  junior: 45_000,
};

/** EU median salaries by tier (2025 data, EUR) */
export const euMedianSalaries: Record<SalaryTier, number> = {
  ceo: 120_000,
  coo: 85_000,
  senior: 72_000,
  mid: 60_000,
  junior: 35_000,
};

/** Helper: get percentage above Norwegian median for an employee */
export function getPctAboveNorwegianMedian(name: string): number | undefined {
  const entry = salaryProgression.find((e) => e.name === name);
  if (!entry) return undefined;
  const currentSalary = entry.salaries["pre-seed"];
  const median = norwegianMedianSalaries[entry.tier];
  return Math.round(((currentSalary - median) / median) * 100);
}

/**
 * Catalog of compensation factors used in QDaria offer letters and contracts.
 * Keys are stable identifiers consumed by `getCompensationPhilosophy`; values
 * are the human-readable phrases the contract template formats into prose.
 */
export const compensationFactors = {
  education: "Education and credentials",
  "education-in-progress": "Education in progress and continuing development",
  experience: "Prior professional experience",
  contribution: "Demonstrable contribution to QDaria to date",
  tenure: "Tenure with QDaria and date of joining",
  "tenure-founding": "Founding-era contributor (pre-funding)",
  "domain-expertise-quantum": "Domain expertise in quantum computing",
  "domain-expertise-legal-business":
    "Domain expertise in legal and business operations",
  "domain-expertise-administration":
    "Domain expertise in administration and people-ops",
  "domain-expertise-networking":
    "Domain expertise in professional networking and partnerships",
  "domain-expertise-content": "Domain expertise in content and communications",
  "domain-expertise-strategy": "Domain expertise in strategy and growth",
  "domain-expertise-csr": "Domain expertise in corporate social responsibility",
  "domain-expertise-finance": "Domain expertise in finance",
  "domain-expertise-sales": "Domain expertise in sales",
  "domain-expertise-data": "Domain expertise in data science",
  "domain-expertise-culture": "Domain expertise in culture and events",
  "domain-expertise-quality-engineering":
    "Domain expertise in quality engineering",
  "domain-expertise-development": "Domain expertise in software development",
  founder: "Founder of QDaria Holdings",
  "company-builder": "Sole company builder pre-funding",
  "fundraising-lead": "Lead on all fundraising activity",
  "founding-circle": "Member of the founding circle",
} as const;

export type CompensationFactor = keyof typeof compensationFactors;

export interface CompensationPhilosophy {
  factors: string[];
  rationale: string;
  pctOverMedian: number | null;
}

const compensationPhilosophyByName: Record<string, CompensationPhilosophy> = {
  "Daniel Mo Houshmand": {
    factors: [
      "founder",
      "company-builder",
      "fundraising-lead",
      "domain-expertise-quantum",
    ],
    pctOverMedian: null,
    rationale:
      "Base set independently as founder of QDaria Holdings. Compensation reflects 100% personal capital and time invested pre-funding, sole responsibility for company strategy, fundraising, and operations during the pre-seed period.",
  },
  "Sharareh M. Shariat Panahi": {
    factors: [
      "education",
      "experience",
      "contribution",
      "domain-expertise-legal-business",
      "tenure-founding",
    ],
    pctOverMedian: 12,
    rationale:
      "Twelve percent over Norwegian COO median reflects her credentials, the breadth of her remit covering legal, governance, and assistant CEO duties, and her status as a founding-era contributor before any external capital.",
  },
  "Lillian Kristiansen": {
    factors: [
      "education",
      "experience",
      "contribution",
      "tenure-founding",
      "domain-expertise-administration",
    ],
    pctOverMedian: 12,
    rationale:
      "Twelve percent over Norwegian senior median reflects her role as Chief Admin Officer at the holding level plus her cross-portfolio responsibilities at QLillian, and her status as a founding-era contributor.",
  },
  "John Kristiansen": {
    factors: [
      "experience",
      "contribution",
      "tenure",
      "domain-expertise-networking",
    ],
    pctOverMedian: 8,
    rationale:
      "Eight percent over Norwegian senior median reflects deep professional networks and the strategic value those bring during fundraising and partnership development.",
  },
  "Caroline Woie": {
    factors: ["experience", "contribution", "domain-expertise-content"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian senior median, the standard QDaria offer for senior tier.",
  },
  "Rajesh Chavan": {
    factors: ["experience", "contribution", "domain-expertise-strategy"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian senior median, standard senior offer.",
  },
  "Lindsay Sanner": {
    factors: ["experience", "contribution", "domain-expertise-csr"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian senior median, standard senior offer.",
  },
  "Gaspar Alvarado": {
    factors: ["experience", "domain-expertise-finance"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian mid-tier median, standard mid offer.",
  },
  "Nick Saaf": {
    factors: ["experience", "domain-expertise-sales"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian mid-tier median, standard mid offer.",
  },
  "Yulia Ginzburg": {
    factors: ["experience", "domain-expertise-data"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian mid-tier median, standard mid offer.",
  },
  "Nils Bjelland Gronvold": {
    factors: ["experience", "domain-expertise-culture"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian mid-tier median, standard mid offer.",
  },
  "Fredrik Krey Stubberud": {
    factors: ["experience", "domain-expertise-quality-engineering"],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian mid-tier median. Performance-only equity tier (0.25%) reflects test-engineering focus; additional equity gated on board-approved milestones.",
  },
  "Daria S. Houshmand": {
    factors: [
      "education-in-progress",
      "tenure-founding",
      "domain-expertise-development",
      "founding-circle",
    ],
    pctOverMedian: 5,
    rationale:
      "Five percent over Norwegian junior median for the salary base. Equity tier (Founding Supporter, 5%) reflects status as a founding-era contributor, not seniority; salary tier remains junior reflecting career stage.",
  },
};

compensationPhilosophyByName["Daria Houshmand"] =
  compensationPhilosophyByName["Daria S. Houshmand"];

/**
 * Returns the structured compensation philosophy for a given employee. Used by
 * the contract template to populate Section 2.5 (per-individual paragraph) and
 * by the admin compensation surface for tooltips and exports.
 */
export function getCompensationPhilosophy(
  name: string,
): CompensationPhilosophy | undefined {
  return compensationPhilosophyByName[name];
}
