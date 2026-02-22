import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  PieChart,
  Calendar,
  MessageSquare,
  Bot,
  BookOpen,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPath?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Team', href: '/admin/team', icon: <Users size={20} /> },
  { label: 'Contracts', href: '/admin/contracts', icon: <FileText size={20} /> },
  { label: 'Equity', href: '/admin/equity', icon: <PieChart size={20} /> },
  { label: 'Meetings', href: '/admin/meetings', icon: <Calendar size={20} /> },
  { label: 'Chat', href: '/admin/chat', icon: <MessageSquare size={20} /> },
  { label: 'Playground', href: '/admin/playground', icon: <Bot size={20} /> },
  { label: 'Knowledge Base', href: '/admin/knowledge', icon: <BookOpen size={20} /> },
  { label: 'Fine-tuning', href: '/admin/finetuning', icon: <Cpu size={20} /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} />, adminOnly: true },
];

export default function AdminSidebar({ collapsed, onToggle, currentPath = '' }: AdminSidebarProps) {
  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return currentPath === '/admin/dashboard' || currentPath === '/admin' || currentPath === '/admin/';
    }
    return currentPath.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-gray-800 bg-[#070b14] transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center border-b border-gray-800 px-4">
        <a href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
            <span className="text-sm font-bold text-cyan-400">QD</span>
          </div>
          {!collapsed && (
            <span className="whitespace-nowrap text-lg font-semibold text-white">
              QDaria
            </span>
          )}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-gray-800 p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
