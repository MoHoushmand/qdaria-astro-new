import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, LogOut, User } from 'lucide-react';
import { useAdminAuth } from '../../hooks/use-admin-auth';

/**
 * Derives breadcrumb segments from the current window location.
 */
function useBreadcrumbs(): { label: string; href: string }[] {
  const [crumbs, setCrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '');
    const parts = path.split('/').filter(Boolean);
    const adminIndex = parts.indexOf('admin');
    const segments = adminIndex >= 0 ? parts.slice(adminIndex + 1) : parts;

    const result: { label: string; href: string }[] = [
      { label: 'Admin', href: '/admin/dashboard' },
    ];

    let href = '/admin';
    for (const segment of segments) {
      href += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      result.push({ label, href });
    }

    setCrumbs(result);
  }, []);

  return crumbs;
}

export default function AdminHeader() {
  const { user, isLoading } = useAdminAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const crumbs = useBreadcrumbs();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??';

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#070b14] px-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && <ChevronRight size={14} className="text-gray-600" />}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-white">{crumb.label}</span>
            ) : (
              <a
                href={crumb.href}
                className="text-gray-400 transition-colors hover:text-white"
              >
                {crumb.label}
              </a>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* User menu */}
      {!isLoading && user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-800/50"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'User avatar'}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-400">
                {initials}
              </div>
            )}
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-white">{user.name || 'Unknown'}</p>
              <p className="text-xs text-gray-500">{user.role || 'employee'}</p>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-gray-800 bg-[#111827] py-1 shadow-xl">
              <div className="border-b border-gray-800 px-4 py-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <a
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
              >
                <User size={16} />
                Profile Settings
              </a>
              <a
                href="/api/auth/signout"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-red-400"
              >
                <LogOut size={16} />
                Sign Out
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
