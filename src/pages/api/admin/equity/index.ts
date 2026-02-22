import type { APIRoute } from 'astro';
import { equityDistribution, individualEquity, totalIndividualEquity } from '../../../../data/admin/equity-seed';

export const GET: APIRoute = async () => {
  try {
    // Try Supabase first
    const { supabase } = await import('../../../../lib/supabase/client');

    if (supabase) {
      const { data: records, error } = await supabase
        .from('equity_records')
        .select('*')
        .order('percentage', { ascending: false });

      if (!error && records && records.length > 0) {
        const { data: distData } = await supabase
          .from('equity_distribution')
          .select('*')
          .order('percentage', { ascending: false });

        const distribution = distData && distData.length > 0
          ? distData
          : equityDistribution;

        const individual = records.map((r: any) => ({
          name: r.team_member_name || r.name,
          shareType: r.share_type,
          percentage: r.percentage,
          cliffMonths: r.vesting_schedule?.cliff_months ?? r.cliff_months ?? 12,
          totalMonths: r.vesting_schedule?.total_months ?? r.total_months ?? 48,
          notes: r.notes || '',
          vestingStartDate: r.grant_date || undefined,
        }));

        const totalAllocated = individual.reduce((sum: number, e: any) => sum + e.percentage, 0);

        return new Response(
          JSON.stringify({ distribution, individual, totalAllocated }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  } catch {
    // Fall through to seed data
  }

  // Return seed data
  return new Response(
    JSON.stringify({
      distribution: equityDistribution,
      individual: individualEquity,
      totalAllocated: totalIndividualEquity,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
