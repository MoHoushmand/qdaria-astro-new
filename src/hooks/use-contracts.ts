import { useState, useEffect, useCallback } from 'react';
import type { Contract } from '../types/admin';
import { getContractsSeed } from '../data/admin/contracts-seed';

function getSeed(teamMemberId?: string): Contract[] {
  let seed = getContractsSeed();
  if (teamMemberId) {
    seed = seed.filter((c) => c.team_member_id === teamMemberId);
  }
  return seed;
}

export function useContracts(teamMemberId?: string) {
  // Start with seed data so contracts are visible immediately
  const [contracts, setContracts] = useState<Contract[]>(() => getSeed(teamMemberId));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = useCallback(() => {
    setError(null);

    const params = new URLSearchParams();
    if (teamMemberId) params.set('team_member_id', teamMemberId);

    fetch(`/api/admin/contracts?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.contracts) && data.contracts.length > 0) {
          setContracts(data.contracts);
        }
        // If API returns empty, keep the seed data already in state
      })
      .catch(() => {
        // API not available — seed data already loaded, nothing to do
      });
  }, [teamMemberId]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return { contracts, isLoading, error, refetch: fetchContracts };
}
