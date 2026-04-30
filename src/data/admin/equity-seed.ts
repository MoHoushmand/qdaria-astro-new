import type { EquityDistribution } from "../../types/admin";

/**
 * Overall equity distribution for QDaria Holdings (pre-IPO cap table).
 * Updated 2026-04-30, equity restructure: 5% reserved for Founding Supporter inner circle
 * (Daria S. Houshmand, Sharareh M. Shariat Panahi, Lillian Kristiansen). All other tiers scaled
 * down toward industry medians. Total employee holding allocation = 5.60% (vs prior 8.50%).
 * Holding-level pool sizes UNCHANGED (ESOP 13%, Investor 12%, Advisory 3%, Reserve 2%).
 */
export const equityDistribution: EquityDistribution[] = [
  { category: "Founder (CEO)", percentage: 70.0, color: "#06b6d4" },
  { category: "Employee Option Pool", percentage: 13.0, color: "#10b981" }, // 5.60% allocated (current team) + 7.40% future hire reserve
  { category: "Investor Pool", percentage: 12.0, color: "#8b5cf6" },
  { category: "Advisory", percentage: 3.0, color: "#f59e0b" },
  { category: "Reserve", percentage: 2.0, color: "#ef4444" },
];

/**
 * Individual equity allocations by team member (HOLDING level only).
 * All on 4-year vesting with 1-year cliff (except founder).
 *
 * Tier totals across HOLDING + 6 spinoffs (post-2026-04-30 restructure):
 *   Founding Supporter 5.00%   (0.75 holding + 6 x 0.7083 spinoffs)  -- Daria, Sharareh, Lillian
 *   Senior             2.50%   (0.50 holding + 6 x 0.3333 spinoffs)
 *   Mid                1.50%   (0.30 holding + 6 x 0.2000 spinoffs)
 *   Performance-only   0.25%   (0.15 holding + 6 x 0.0167 spinoffs) -- Fredrik; further grants gated on Board
 *   Junior/Board       0.25%   (0.15 holding + 6 x 0.0167 spinoffs) -- tier currently empty
 */
export const individualEquity = [
  {
    name: "Daniel Mo Houshmand",
    shareType: "common" as const,
    percentage: 70.0,
    cliffMonths: 0,
    totalMonths: 48,
    notes: "Founder shares, no cliff",
  },
  {
    name: "Sharareh M. Shariat Panahi",
    shareType: "options" as const,
    percentage: 0.75,
    cliffMonths: 12,
    totalMonths: 48,
    notes:
      "Asst. CEO, Founding Supporter tier (5.00% total: 0.75% holding + 6 x 0.7083% spinoffs)",
  },
  {
    name: "Caroline Woie",
    shareType: "options" as const,
    percentage: 0.5,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Chief Content Officer, Senior tier (2.50% total)",
  },
  {
    name: "Rajesh Chavan",
    shareType: "options" as const,
    percentage: 0.5,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Chief Strategy & Growth Officer, Senior tier (2.50% total)",
  },
  {
    name: "Lillian Kristiansen",
    shareType: "options" as const,
    percentage: 0.75,
    cliffMonths: 12,
    totalMonths: 48,
    notes:
      "Chief Admin Officer, Founding Supporter tier (5.00% total: 0.75% holding + 6 x 0.7083% spinoffs)",
  },
  {
    name: "John Kristiansen",
    shareType: "options" as const,
    percentage: 0.5,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Head of Networking, Senior tier (2.50% total)",
  },
  {
    name: "Lindsay Sanner",
    shareType: "options" as const,
    percentage: 0.5,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Chief Social Responsibility Officer, Senior tier (2.50% total)",
  },
  {
    name: "Gaspar Alvarado",
    shareType: "options" as const,
    percentage: 0.3,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Finance Director, Mid tier (1.50% total)",
  },
  {
    name: "Nick Saaf",
    shareType: "options" as const,
    percentage: 0.3,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Sales Director, Mid tier (1.50% total)",
  },
  {
    name: "Fredrik Krey Stubberud",
    shareType: "options" as const,
    percentage: 0.15,
    cliffMonths: 12,
    totalMonths: 48,
    notes:
      "Test Engineer, Performance-only tier (0.25% total). Additional grants subject to Board approval upon verified contribution milestones.",
  },
  {
    name: "Yulia Ginzburg",
    shareType: "options" as const,
    percentage: 0.3,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Chief Data Officer, Mid tier (1.50% total)",
  },
  {
    name: "Nils Bjelland Gronvold",
    shareType: "options" as const,
    percentage: 0.3,
    cliffMonths: 12,
    totalMonths: 48,
    notes: "Head of Culture & Events, Mid tier (1.50% total)",
  },
  {
    name: "Daria S. Houshmand",
    shareType: "options" as const,
    percentage: 0.75,
    cliffMonths: 12,
    totalMonths: 48,
    notes:
      "Dev Intern & Board, Founding Supporter tier (5.00% total: 0.75% holding + 6 x 0.7083% spinoffs)",
  },
];

/**
 * Total allocated individual equity at HOLDING level (post-2026-04-30 restructure):
 * Founder 70% + Founding Supporter 3 x 0.75 = 2.25% + Senior 4 x 0.50 = 2.00% + Mid 4 x 0.30 = 1.20%
 *   + Performance-only 0.15% = 75.60% allocated.
 * Remaining 7.40% of ESOP pool (total ESOP 13%) is reserved for future key hires.
 */
export const totalIndividualEquity = individualEquity.reduce(
  (sum, e) => sum + e.percentage,
  0,
);
