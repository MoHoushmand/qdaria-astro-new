/**
 * Salary progression tiers for QDaria team members across funding rounds.
 * All values in EUR (annual gross base salary).
 *
 * Bonus policy: Additional performance bonuses of 0-15% based on individual KPI
 * achievement and milestone completion. Bonuses evaluated quarterly by CEO and board.
 */

export const fundingRounds = ['pre-seed', 'seed', 'round-a', 'round-b', 'round-c', 'ipo'] as const;

export type FundingRound = typeof fundingRounds[number];

export const currentRound: FundingRound = 'pre-seed';

export const fundingRoundLabels: Record<FundingRound, string> = {
  'pre-seed': 'Pre-Seed',
  'seed': 'Seed',
  'round-a': 'Round A',
  'round-b': 'Round B',
  'round-c': 'Round C',
  'ipo': 'IPO',
};

export type SalaryTier = 'ceo' | 'coo' | 'senior' | 'mid' | 'junior';

export interface SalaryEntry {
  name: string;
  tier: SalaryTier;
  salaries: Record<FundingRound, number>;
}

export const salaryProgression: SalaryEntry[] = [
  {
    name: 'Daniel Mo Houshmand',
    tier: 'ceo',
    salaries: {
      'pre-seed': 160_000,
      'seed': 185_000,
      'round-a': 220_000,
      'round-b': 260_000,
      'round-c': 310_000,
      'ipo': 400_000,
    },
  },
  {
    name: 'Svein-Erik Nilsen',
    tier: 'coo',
    salaries: {
      'pre-seed': 108_000,
      'seed': 120_000,
      'round-a': 175_000,
      'round-b': 200_000,
      'round-c': 245_000,
      'ipo': 300_000,
    },
  },
  {
    name: 'Lillian Kristiansen',
    tier: 'senior',
    salaries: {
      'pre-seed': 97_000,
      'seed': 105_000,
      'round-a': 135_000,
      'round-b': 155_000,
      'round-c': 180_000,
      'ipo': 220_000,
    },
  },
  {
    name: 'John Kristiansen',
    tier: 'senior',
    salaries: {
      'pre-seed': 97_000,
      'seed': 105_000,
      'round-a': 135_000,
      'round-b': 155_000,
      'round-c': 180_000,
      'ipo': 220_000,
    },
  },
  {
    name: 'Sharareh M. Shariat Panahi',
    tier: 'coo',
    salaries: {
      'pre-seed': 108_000,
      'seed': 120_000,
      'round-a': 175_000,
      'round-b': 200_000,
      'round-c': 245_000,
      'ipo': 300_000,
    },
  },
  {
    name: 'Caroline Woie',
    tier: 'senior',
    salaries: {
      'pre-seed': 97_000,
      'seed': 105_000,
      'round-a': 135_000,
      'round-b': 155_000,
      'round-c': 180_000,
      'ipo': 220_000,
    },
  },
  {
    name: 'Rajesh Chavan',
    tier: 'senior',
    salaries: {
      'pre-seed': 97_000,
      'seed': 105_000,
      'round-a': 135_000,
      'round-b': 155_000,
      'round-c': 180_000,
      'ipo': 220_000,
    },
  },
  {
    name: 'Lindsay Sanner',
    tier: 'senior',
    salaries: {
      'pre-seed': 97_000,
      'seed': 105_000,
      'round-a': 135_000,
      'round-b': 155_000,
      'round-c': 180_000,
      'ipo': 220_000,
    },
  },
  {
    name: 'Fredrik Krey Stubberud',
    tier: 'mid',
    salaries: {
      'pre-seed': 84_000,
      'seed': 92_000,
      'round-a': 112_000,
      'round-b': 128_000,
      'round-c': 150_000,
      'ipo': 182_000,
    },
  },
  {
    name: 'Nick Saaf',
    tier: 'mid',
    salaries: {
      'pre-seed': 84_000,
      'seed': 92_000,
      'round-a': 112_000,
      'round-b': 128_000,
      'round-c': 150_000,
      'ipo': 182_000,
    },
  },
  {
    name: 'Gaspar Alvarado',
    tier: 'mid',
    salaries: {
      'pre-seed': 84_000,
      'seed': 92_000,
      'round-a': 112_000,
      'round-b': 128_000,
      'round-c': 150_000,
      'ipo': 182_000,
    },
  },
  {
    name: 'Yulia Ginzburg',
    tier: 'mid',
    salaries: {
      'pre-seed': 84_000,
      'seed': 92_000,
      'round-a': 112_000,
      'round-b': 128_000,
      'round-c': 150_000,
      'ipo': 182_000,
    },
  },
  {
    name: 'Nils Bjelland Gronvold',
    tier: 'mid',
    salaries: {
      'pre-seed': 84_000,
      'seed': 92_000,
      'round-a': 112_000,
      'round-b': 128_000,
      'round-c': 150_000,
      'ipo': 182_000,
    },
  },
  {
    name: 'Daria Houshmand',
    tier: 'junior',
    salaries: {
      'pre-seed': 55_000,
      'seed': 60_000,
      'round-a': 73_000,
      'round-b': 84_000,
      'round-c': 98_000,
      'ipo': 120_000,
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
