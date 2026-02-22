import { useState, useEffect, useCallback } from 'react';
import type { TeamMember } from '../types/admin';
import { teamMembersSeed } from '../data/admin/team-seed';

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch('/api/admin/team')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMembers(data.members || []);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to seed data with generated IDs
        const now = new Date().toISOString();
        const seeded = teamMembersSeed.map((m, i) => ({
          ...m,
          id: `seed-${i}`,
          created_at: now,
          updated_at: now,
        })) as TeamMember[];
        setMembers(seeded);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, isLoading, error, refetch: fetchMembers };
}

export function useTeamMember(memberId: string | undefined) {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!memberId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`/api/admin/team?id=${memberId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMember(data.member || null);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to seed data
        const now = new Date().toISOString();
        const seeded = teamMembersSeed.map((m, i) => ({
          ...m,
          id: `seed-${i}`,
          created_at: now,
          updated_at: now,
        })) as TeamMember[];
        const found = seeded.find((m) => m.id === memberId) || null;
        setMember(found);
        setIsLoading(false);
      });
  }, [memberId]);

  return { member, isLoading, error };
}
