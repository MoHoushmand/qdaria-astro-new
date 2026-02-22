import type { Contract } from '../../types/admin';

/**
 * Seed data for existing employment contracts.
 * Files located at /public/contracts/ (copied from /Users/mos/Downloads/kontraker/).
 * These serve as fallback when the Supabase API is unavailable.
 */

interface ContractSeedEntry {
  team_member_name: string;
  file_name: string;
  title: string;
  type: Contract['type'];
  status: Contract['status'];
  signed_date: string;
  file_size: number;
  start_date?: string;
}

const contractEntries: ContractSeedEntry[] = [
  { team_member_name: 'Daniel Mo Houshmand', file_name: 'QDaria_Employment_Agreement_Daniel_Mo_Houshmand.pdf', title: 'CEO & Founder Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Svein-Erik Nilsen', file_name: 'QDaria_Employment_Agreement_Svein-Erik_Nilsen.pdf', title: 'COO Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Gaspar Alvarado', file_name: 'QDaria_Employment_Agreement_Gaspar_Alvarado.pdf', title: 'Finance Director Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Sharareh M. Shariat Panahi', file_name: 'QDaria_Employment_Agreement_Sharareh_M._Shariat_Panahi.pdf', title: 'Asst. CEO Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Caroline Woie', file_name: 'QDaria_Employment_Agreement_Caroline_Woie.pdf', title: 'Chief Content Officer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Rajesh Chavan', file_name: 'QDaria_Employment_Agreement_Rajesh_Chavan.pdf', title: 'Chief Strategy & Growth Officer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Nick Saaf', file_name: 'QDaria_Employment_Agreement_Nick_Saaf.pdf', title: 'Sales Director Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Fredrik Krey Stubberud', file_name: 'QDaria_Employment_Agreement_Fredrik_Krey_Stubberud.pdf', title: 'Test Engineer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Yulia Ginzburg', file_name: 'QDaria_Employment_Agreement_Yulia_Ginzburg.pdf', title: 'Chief Data Officer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'John Kristiansen', file_name: 'QDaria_Employment_Agreement_John_Kristiansen.pdf', title: 'Head of Networking Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Nils Bjelland Gronvold', file_name: 'QDaria_Employment_Agreement_Nils_Bjelland_Gronvold.pdf', title: 'Head of Culture & Events Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Lindsay Sanner', file_name: 'QDaria_Employment_Agreement_Lindsay_Sanner.pdf', title: 'Chief Social Responsibility Officer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Lillian Kristiansen', file_name: 'QDaria_Employment_Agreement_Lillian_Kristiansen.pdf', title: 'Chief Admin Officer Employment Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
  { team_member_name: 'Daria Houshmand', file_name: 'QDaria_Employment_Agreement_Daria_Houshmand.pdf', title: 'Dev Intern & Board Member Agreement', type: 'employment', status: 'draft', signed_date: '', file_size: 0, start_date: '2026-03-01' },
];

const supplementaryDocs: ContractSeedEntry[] = [
  { team_member_name: '', file_name: 'implementeringsplan-48-month.docx', title: '48-Month Implementation Plan', type: 'other', status: 'draft', signed_date: '', file_size: 0 },
  { team_member_name: '', file_name: 'meeting-agenda-and-structure.docx', title: 'Meeting Agenda & Structure Template', type: 'other', status: 'draft', signed_date: '', file_size: 0 },
];

/**
 * Generate Contract objects with stable IDs from seed data.
 * Downloads served from /contracts/{file_name} via Astro's public directory.
 */
export function getContractsSeed(): Contract[] {
  const now = new Date().toISOString();
  const allEntries = [...contractEntries, ...supplementaryDocs];

  return allEntries.map((entry, i) => ({
    id: `contract-seed-${i}`,
    team_member_id: entry.team_member_name ? `seed-${contractEntries.findIndex(c => c.team_member_name === entry.team_member_name)}` : '',
    team_member_name: entry.team_member_name || undefined,
    title: entry.title,
    type: entry.type,
    file_path: `/contracts/${entry.file_name}`,
    file_name: entry.file_name,
    file_size: entry.file_size || undefined,
    status: entry.status,
    signed_date: entry.signed_date || undefined,
    start_date: entry.start_date || undefined,
    created_at: now,
  }));
}
