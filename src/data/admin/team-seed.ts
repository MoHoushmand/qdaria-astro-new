import type { TeamMember } from '../../types/admin';

/**
 * Seed data for QDaria team members.
 * Updated Feb 2026 — EUR salaries (Pre-Seed), new equity allocations, salary tiers.
 * 14 team members across Founder, C-Suite, Leadership, Specialist, and Intern/Board tiers.
 */
export const teamMembersSeed: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Daniel Mo Houshmand',
    email: 'daniel.mo.houshmand@qdaria.com',
    title: 'CEO & Founder',
    department: 'Executive',
    tier: 'Founder',
    salary_eur: 160_000,
    salary_tier: 'ceo',
    equity_percentage: 70.0,
    vesting_cliff_months: 0,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'MSc Applied Math, BSc Civil Eng, BA Design. Certs: QHE, QML, ML. 10+ yrs experience. Founded QDaria (2013/2017/2019). Speaker IQT NYC 2024, Keynote Davos 2025.',
    linkedin: 'https://linkedin.com/in/mohoushmand',
  },
  {
    name: 'Svein-Erik Nilsen',
    email: 'svein-erik.nilsen@qdaria.com',
    title: 'COO',
    department: 'Operations',
    tier: 'C-Suite',
    salary_eur: 108_000,
    salary_tier: 'coo',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Infrastructure & Org Design. Senior / 15+ yrs experience. Operational KPIs focus.',
  },
  {
    name: 'Gaspar Alvarado',
    email: 'gaspar.alvarado@qdaria.com',
    title: 'Finance Director',
    department: 'Finance',
    tier: 'Specialist',
    salary_eur: 84_000,
    salary_tier: 'mid',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: false,
    bio: 'Finance & Procurement. Senior / 12+ yrs experience. Financial targets focus.',
  },
  {
    name: 'Sharareh M. Shariat Panahi',
    email: 'sharareh.panahi@qdaria.com',
    title: 'Asst. CEO',
    department: 'Legal',
    tier: 'C-Suite',
    salary_eur: 108_000,
    salary_tier: 'coo',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Legal / IP / Regulatory. Senior / 10+ yrs experience. Compliance milestones focus.',
  },
  {
    name: 'Caroline Woie',
    email: 'caroline.woie@qdaria.com',
    title: 'Chief Content Officer',
    department: 'Content',
    tier: 'Leadership',
    salary_eur: 97_000,
    salary_tier: 'senior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: '20+ yrs media experience (Emmy, Gullruten). Content KPIs focus.',
  },
  {
    name: 'Rajesh Chavan',
    email: 'rajesh.chavan@qdaria.com',
    title: 'Chief Strategy & Growth Officer',
    department: 'Strategy',
    tier: 'Leadership',
    salary_eur: 97_000,
    salary_tier: 'senior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Strategy & Partnerships. Senior / 10+ yrs experience. Growth targets focus.',
  },
  {
    name: 'Nick Saaf',
    email: 'nick.saaf@qdaria.com',
    title: 'Sales Director',
    department: 'Sales & Business Development',
    tier: 'Specialist',
    salary_eur: 84_000,
    salary_tier: 'mid',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: false,
    bio: 'Founder Alfresco Cookery. Senior / 10+ yrs experience. Revenue commission focus.',
  },
  {
    name: 'Fredrik Krey Stubberud',
    email: 'fredrik.stubberud@qdaria.com',
    title: 'Test Engineer',
    department: 'Engineering',
    tier: 'Specialist',
    salary_eur: 84_000,
    salary_tier: 'mid',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: false,
    bio: 'Neural-symbolic AI systems. Mid-Senior / 7+ yrs experience. Tech milestones focus.',
  },
  {
    name: 'Yulia Ginzburg',
    email: 'yulia.ginzburg@qdaria.com',
    title: 'Chief Data Officer',
    department: 'Data',
    tier: 'Specialist',
    salary_eur: 84_000,
    salary_tier: 'mid',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: false,
    bio: 'MSc Mathematics for Economics. Mid-Senior / 8+ yrs experience. Data KPIs focus.',
  },
  {
    name: 'John Kristiansen',
    email: 'john.kristiansen@qdaria.com',
    title: 'Head of Networking',
    department: 'Business Development',
    tier: 'Specialist',
    salary_eur: 97_000,
    salary_tier: 'senior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Property development. Senior / 15+ yrs experience. Partnership deals focus.',
  },
  {
    name: 'Nils Bjelland Gronvold',
    email: 'nils.gronvold@qdaria.com',
    title: 'Head of Culture & Events',
    department: 'Culture & Events',
    tier: 'Specialist',
    salary_eur: 84_000,
    salary_tier: 'mid',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: false,
    bio: 'Creative / Performer. Mid / 8+ yrs experience. Culture KPIs focus.',
  },
  {
    name: 'Lindsay Sanner',
    email: 'lindsay.sanner@qdaria.com',
    title: 'Chief Social Responsibility Officer',
    department: 'CSR',
    tier: 'Specialist',
    salary_eur: 97_000,
    salary_tier: 'senior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Founder Eco Moyo. 10+ yrs social enterprise. Impact metrics focus.',
  },
  {
    name: 'Lillian Kristiansen',
    email: 'lillian.kristiansen@qdaria.com',
    title: 'Chief Admin Officer',
    department: 'Administration',
    tier: 'Specialist',
    salary_eur: 97_000,
    salary_tier: 'senior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'full-time',
    is_board_member: true,
    bio: 'Payroll & HR (Compass Group). Mid-Senior / 10+ yrs experience. Operational efficiency focus.',
  },
  {
    name: 'Daria Houshmand',
    email: 'daria.houshmand@qdaria.com',
    title: 'Dev Intern & Board Member',
    department: 'Engineering',
    tier: 'Intern/Board',
    salary_eur: 55_000,
    salary_tier: 'junior',
    equity_percentage: 5.0,
    vesting_cliff_months: 12,
    vesting_total_months: 48,
    contract_status: 'pending',
    employment_type: 'intern',
    is_board_member: true,
    bio: 'AI & Quantum-AI synergy. Junior / Early career. Learning milestones focus.',
  },
];

/**
 * Map personal OAuth emails → qdaria.com emails.
 * When an employee signs in via GitHub/Google/LinkedIn with a personal email,
 * we look up their qdaria identity here.
 *
 * ADD REAL EMAILS HERE for each team member — the email they use on
 * GitHub, Google, or LinkedIn. One person can have multiple aliases.
 */
export const oauthAliases: Record<string, string> = {
  // === EXAMPLE — replace with real emails ===
  // 'mo.houshmand@gmail.com': 'daniel.mo.houshmand@qdaria.com',
  // 'svein.erik.nilsen@gmail.com': 'svein-erik.nilsen@qdaria.com',
};

/**
 * Map of team member emails to their admin roles.
 * Includes both @qdaria.com addresses AND any personal OAuth aliases.
 * Daniel Mo Houshmand = admin, all others = employee.
 */
export const teamEmailRoles: Record<string, 'admin' | 'employee'> = (() => {
  const roles: Record<string, 'admin' | 'employee'> = {};

  // Add @qdaria.com emails
  for (const m of teamMembersSeed) {
    roles[m.email] = m.email === 'daniel.mo.houshmand@qdaria.com' ? 'admin' : 'employee';
  }

  // Add credentials-based staff login
  roles['staff@qdaria.com'] = 'employee';

  // Add personal OAuth aliases with the same role as the qdaria email
  for (const [personalEmail, qdariaEmail] of Object.entries(oauthAliases)) {
    roles[personalEmail] = roles[qdariaEmail] || 'employee';
  }

  return roles;
})();

/**
 * Resolve an OAuth email to the canonical @qdaria.com email.
 * Returns the input email if no alias exists.
 */
export function resolveEmail(email: string): string {
  return oauthAliases[email] || email;
}

/**
 * Whitelist of all team member emails for auto-provisioning during sign-in.
 */
export const teamEmails = [
  ...teamMembersSeed.map((m) => m.email),
  ...Object.keys(oauthAliases),
];
