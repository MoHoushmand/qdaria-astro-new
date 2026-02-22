import { useState, useEffect } from 'react';
import { equityDistribution, individualEquity, totalIndividualEquity } from '../data/admin/equity-seed';
import type { EquityDistribution } from '../types/admin';

interface IndividualEquity {
  name: string;
  shareType: 'common' | 'preferred' | 'options' | 'phantom';
  percentage: number;
  cliffMonths: number;
  totalMonths: number;
  notes: string;
  vestingStartDate?: string;
}

interface UseEquityReturn {
  distribution: EquityDistribution[];
  individual: IndividualEquity[];
  totalAllocated: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useEquity(): UseEquityReturn {
  const [distribution, setDistribution] = useState<EquityDistribution[]>(equityDistribution);
  const [individual, setIndividual] = useState<IndividualEquity[]>(individualEquity);
  const [totalAllocated, setTotalAllocated] = useState<number>(totalIndividualEquity);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchEquity() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/admin/equity');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            if (data.distribution?.length) setDistribution(data.distribution);
            if (data.individual?.length) setIndividual(data.individual);
            if (typeof data.totalAllocated === 'number') setTotalAllocated(data.totalAllocated);
          }
        }
      } catch {
        // Silently fall back to seed data
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    fetchEquity();
    return () => { cancelled = true; };
  }, [refreshKey]);

  function refresh() {
    setRefreshKey(k => k + 1);
  }

  return { distribution, individual, totalAllocated, isLoading, error: null, refresh };
}
