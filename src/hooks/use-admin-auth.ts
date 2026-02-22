import { useState, useEffect } from 'react';

interface AdminAuthState {
  user: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  } | null;
  isAdmin: boolean;
  isEmployee: boolean;
  isLoading: boolean;
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAdmin: false,
    isEmployee: false,
    isLoading: true,
  });

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const user = data?.user || null;
        const role = user?.role || 'investor';
        setState({
          user,
          isAdmin: role === 'admin',
          isEmployee: role === 'employee' || role === 'admin',
          isLoading: false,
        });
      })
      .catch(() => setState((prev) => ({ ...prev, isLoading: false })));
  }, []);

  return state;
}
