import type { EquityDistribution } from '../../types/admin';

/**
 * Overall equity distribution for QDaria Holdings (pre-IPO cap table).
 * Updated Feb 2026 — reflects 70% founder allocation + flat 1% per employee.
 */
export const equityDistribution: EquityDistribution[] = [
  { category: 'Founder (CEO)', percentage: 70.0, color: '#06b6d4' },
  { category: 'Employee Option Pool', percentage: 13.0, color: '#10b981' },
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
  { name: 'Svein-Erik Nilsen', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'COO' },
  { name: 'Sharareh M. Shariat Panahi', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Asst. CEO' },
  { name: 'Caroline Woie', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Chief Content Officer' },
  { name: 'Rajesh Chavan', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Chief Strategy & Growth Officer' },
  { name: 'Lillian Kristiansen', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Chief Admin Officer' },
  { name: 'John Kristiansen', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Head of Networking' },
  { name: 'Lindsay Sanner', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Chief Social Responsibility Officer' },
  { name: 'Gaspar Alvarado', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Finance Director' },
  { name: 'Nick Saaf', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Sales Director' },
  { name: 'Fredrik Krey Stubberud', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Test Engineer' },
  { name: 'Yulia Ginzburg', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Chief Data Officer' },
  { name: 'Nils Bjelland Gronvold', shareType: 'options' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Head of Culture & Events' },
  { name: 'Daria Houshmand', shareType: 'phantom' as const, percentage: 1.0, cliffMonths: 12, totalMonths: 48, notes: 'Dev Intern & Board' },
];

/**
 * Total allocated individual equity (70% founder + 13% team = 83%)
 */
export const totalIndividualEquity = individualEquity.reduce((sum, e) => sum + e.percentage, 0);
