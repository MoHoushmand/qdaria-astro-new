import type { EquityDistribution } from '../../types/admin';

/**
 * Overall equity distribution for QDaria Holdings (pre-IPO cap table).
 * Updated Feb 2026 — reflects 70% founder allocation + flat 1% per employee.
 */
export const equityDistribution: EquityDistribution[] = [
  { category: 'Founder (CEO)', percentage: 70.0, color: '#06b6d4' },
  { category: 'Employee Option Pool', percentage: 13.0, color: '#10b981' }, // 8.5% allocated (current team) + 4.5% future hire reserve
  { category: 'Investor Pool', percentage: 12.0, color: '#8b5cf6' },
  { category: 'Advisory', percentage: 3.0, color: '#f59e0b' },
  { category: 'Reserve', percentage: 2.0, color: '#ef4444' },
];

/**
 * Individual equity allocations by team member (HOLDING level only).
 * All on 4-year vesting with 1-year cliff (except founder).
 * Flat 1.0% holding per employee (5.0% total across all companies).
 */
export const individualEquity = [
  { name: 'Daniel Mo Houshmand', shareType: 'common' as const, percentage: 70.0, cliffMonths: 0, totalMonths: 48, notes: 'Founder shares, no cliff' },
  { name: 'Sharareh M. Shariat Panahi', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Asst. CEO' },
  // Senior tier: 0.75% Holdings + 0.375% per spinoff = 3.75% total
  { name: 'Caroline Woie', shareType: 'options' as const, percentage: 0.75, cliffMonths: 12, totalMonths: 48, notes: 'Chief Content Officer — Senior tier' },
  { name: 'Rajesh Chavan', shareType: 'options' as const, percentage: 0.75, cliffMonths: 12, totalMonths: 48, notes: 'Chief Strategy & Growth Officer — Senior tier' },
  { name: 'Lillian Kristiansen', shareType: 'options' as const, percentage: 0.75, cliffMonths: 12, totalMonths: 48, notes: 'Chief Admin Officer — Senior tier (founding-stage supporter, see contract appendix)' },
  { name: 'John Kristiansen', shareType: 'options' as const, percentage: 0.75, cliffMonths: 12, totalMonths: 48, notes: 'Head of Networking — Senior tier' },
  { name: 'Lindsay Sanner', shareType: 'options' as const, percentage: 0.75, cliffMonths: 12, totalMonths: 48, notes: 'Chief Social Responsibility Officer — Senior tier' },
  // Mid tier: 0.5% Holdings + 0.25% per spinoff = 2.5% total
  { name: 'Gaspar Alvarado', shareType: 'options' as const, percentage: 0.5, cliffMonths: 12, totalMonths: 48, notes: 'Finance Director — Mid tier' },
  { name: 'Nick Saaf', shareType: 'options' as const, percentage: 0.5, cliffMonths: 12, totalMonths: 48, notes: 'Sales Director — Mid tier' },
  // Performance-only: 0.25% Holdings, no spinoffs. Milestone vesting requires Board approval.
  { name: 'Fredrik Krey Stubberud', shareType: 'options' as const, percentage: 0.25, cliffMonths: 12, totalMonths: 48, notes: 'Test Engineer — Performance-only. No spinoff equity. Additional grants subject to Board approval upon verified contribution milestones.' },
  { name: 'Yulia Ginzburg', shareType: 'options' as const, percentage: 0.5, cliffMonths: 12, totalMonths: 48, notes: 'Chief Data Officer — Mid tier' },
  { name: 'Nils Bjelland Gronvold', shareType: 'options' as const, percentage: 0.5, cliffMonths: 12, totalMonths: 48, notes: 'Head of Culture & Events — Mid tier' },
  // Junior/Board: 0.5% Holdings + 0.25% per spinoff = 2.5% total
  { name: 'Daria Houshmand', shareType: 'phantom' as const, percentage: 0.5, cliffMonths: 12, totalMonths: 48, notes: 'Dev Intern & Board — Junior/Board tier' },
];

/**
 * Total allocated individual equity:
 * CEO 70% + C-Suite 2% + Senior 3.75% + Mid 2% + Fredrik 0.25% + Junior 0.5% = 78.5% allocated
 * Remaining 4.5% of ESOP is future hire reserve (total ESOP remains 13%)
 */
export const totalIndividualEquity = individualEquity.reduce((sum, e) => sum + e.percentage, 0);
