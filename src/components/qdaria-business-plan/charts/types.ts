// Chart data type definitions for QDaria Business Plan

export interface CompetitorData {
  name: string;
  x: number; // Technology Maturity (0-100)
  y: number; // Market Share (0-10%)
  z: number; // Funding Raised ($M)
  revenue: number; // Annual Revenue ($M)
  stage: 'startup' | 'growth' | 'public';
  tech: string;
  country: string;
}

export interface CompanyProfile {
  name: string;
  description: string;
  patents: number;
  teamSize: number;
  founded: number;
}

export interface FundingNode {
  id: string;
  name: string;
  value: number;
  category: 'source' | 'use';
  color?: string;
}

export interface FundingLink {
  source: string;
  target: string;
  value: number;
}

export interface FundingData {
  nodes: FundingNode[];
  links: FundingLink[];
}

export interface TimelineRound {
  year: number;
  name: string;
  amount: number;
  data: FundingData;
}

export interface StrategicQuadrant {
  name: string;
  description: string;
  maturityRange: [number, number];
  shareRange: [number, number];
  color: string;
}

export interface TrajectoryPoint {
  year: number;
  maturity: number;
  share: number;
  funding: number;
}

export interface ROIMetric {
  category: string;
  expectedROI: number;
  timeframe: string;
  confidence: 'high' | 'medium' | 'low';
}

// User Growth Chart Types
export interface UserGrowthData {
  quarter: string;
  total: number;
  active: number;
  paying: number;
  enterprise: number;
  mrr: number;
  churnRate: number;
  activationRate: number;
  viralCoefficient: number;
  growthRate: number;
}

export interface Milestone {
  quarter: string;
  label: string;
  users: number;
  color: string;
}

export interface CohortRetentionData {
  cohort: string;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
  month24: number;
}

// Scenario Comparison Chart Types
export interface ScenarioData {
  year: string;
  conservative: number;
  base: number;
  optimistic: number;
}

export interface ScenarioAssumptions {
  cagr: number;
  churnRate: number;
  fundingAmount: number;
  marketShare: number;
}

export interface ScenarioProbabilities {
  conservative: number;
  base: number;
  optimistic: number;
}

export interface MonteCarloResults {
  mean: string;
  p5: string;
  p50: string;
  p95: string;
}

export interface NPVCalculation {
  scenario: 'conservative' | 'base' | 'optimistic';
  cashFlows: number[];
  discountRate: number;
  npv: number;
}

export interface RiskMetrics {
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  valueAtRisk: number;
}

export type ViewMode = 'cumulative' | 'net-adds';
export type ScenarioType = 'conservative' | 'base' | 'optimistic';

// Calculation utilities
export const calculateCAGR = (
  startValue: number,
  endValue: number,
  years: number
): number => {
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
};

export const calculateChurnRate = (
  customersLost: number,
  totalCustomers: number
): number => {
  return (customersLost / totalCustomers) * 100;
};

export const calculateMRR = (
  payingCustomers: number,
  averageRevenue: number
): number => {
  return payingCustomers * averageRevenue;
};

export const calculateLTV = (
  arpu: number,
  churnRate: number,
  grossMargin: number = 0.8
): number => {
  return (arpu * grossMargin) / (churnRate / 100);
};

export const calculateCAC = (
  marketingSpend: number,
  salesSpend: number,
  newCustomers: number
): number => {
  return (marketingSpend + salesSpend) / newCustomers;
};

export const calculateLTVCACRatio = (ltv: number, cac: number): number => {
  return ltv / cac;
};

export const calculatePaybackPeriod = (cac: number, mrr: number): number => {
  return cac / mrr;
};

// Statistical utilities for Monte Carlo
export const generateNormalDistribution = (
  mean: number,
  stdDev: number,
  count: number
): number[] => {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    results.push(mean + stdDev * num);
  }
  return results;
};

export const calculatePercentile = (
  data: number[],
  percentile: number
): number => {
  const sorted = [...data].sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * sorted.length);
  return sorted[index];
};

export const calculateVolatility = (data: number[]): number => {
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
};
