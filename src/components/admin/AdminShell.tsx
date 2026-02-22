import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAdminAuth } from '../../hooks/use-admin-auth';

interface AdminShellProps {
  children?: React.ReactNode;
  /** Allow Astro client:* directives to pass through without TS errors */
  [key: string]: unknown;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isLoading } = useAdminAuth();

  // Derive current path on the client side
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0e1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <p className="text-sm text-gray-400">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0e1a]">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        currentPath={currentPath}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader user={user || undefined} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
