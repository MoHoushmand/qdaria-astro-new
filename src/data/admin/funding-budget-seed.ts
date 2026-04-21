/**
 * Current-round funding budget allocation used by contract PDF generator.
 * Figures mirror the pitch deck (InvestorFAQSlide) and business plan (business-plan.mdx).
 * Variable names use "seed" historically; the active raise is Series A €15M / 24-month runway.
 */

export interface BudgetLine {
  label: string;
  totalEur: number;
  pctOfTotal: number;
}

export const seedFundingTarget = 15_000_000;

export const seedRunwayMonths = 24;

export const seedBudgetBreakdown: BudgetLine[] = [
  {
    label: "Engineering team expansion (4 to 17 headcount)",
    totalEur: 5_200_000,
    pctOfTotal: 34.67,
  },
  {
    label: "European market expansion (Germany, DACH, Benelux)",
    totalEur: 4_800_000,
    pctOfTotal: 32.0,
  },
  {
    label: "Novera QPU capacity scaling (256 to 512 qubits)",
    totalEur: 2_800_000,
    pctOfTotal: 18.67,
  },
  {
    label: "Sales and marketing infrastructure",
    totalEur: 1_200_000,
    pctOfTotal: 8.0,
  },
  { label: "Working capital", totalEur: 1_000_000, pctOfTotal: 6.67 },
];
