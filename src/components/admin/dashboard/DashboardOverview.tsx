import React from 'react';
import { Users, FileText, Calendar, MessageSquare, Bot, BookOpen, Activity, ArrowUpRight } from 'lucide-react';
import { useAdminAuth } from '../../../hooks/use-admin-auth';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  href?: string;
}

function KpiCard({ label, value, icon, change, href }: KpiCardProps) {
  const content = (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6 transition-colors hover:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className="mt-1 text-xs text-cyan-400">{change}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
          {icon}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

export default function DashboardOverview() {
  const { user, isAdmin } = useAdminAuth();

  return (
    <div className="p-6">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Here is an overview of QDaria's internal operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          label="Team Members"
          value={14}
          icon={<Users size={20} />}
          change="All active"
          href="/admin/team"
        />
        <KpiCard
          label="Draft Contracts"
          value={14}
          icon={<FileText size={20} />}
          change="Ready for distribution"
          href="/admin/contracts"
        />
        <KpiCard
          label="Upcoming Meetings"
          value={0}
          icon={<Calendar size={20} />}
          change="None scheduled"
          href="/admin/meetings"
        />
        <KpiCard
          label="Messages"
          value={0}
          icon={<MessageSquare size={20} />}
          change="No channels yet"
          href="/admin/chat"
        />
        <KpiCard
          label="AI Playground"
          value={'--'}
          icon={<Bot size={20} />}
          change="Gemini 3.1 Pro available"
          href="/admin/playground"
        />
        <KpiCard
          label="Knowledge Docs"
          value={8}
          icon={<BookOpen size={20} />}
          change="Seed documents"
          href="/admin/knowledge"
        />
      </div>

      {/* Two-column layout: Recent Activity + Upcoming Meetings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Activity size={18} className="text-gray-500" />
          </div>
          <div className="space-y-4">
            {[
              {
                action: 'Contracts generated',
                detail: '14 employment contract PDFs created (Draft status)',
                time: 'Today',
              },
              {
                action: 'Equity allocations set',
                detail: 'CEO 70%, C-Suite 5%, Leadership 5%, Specialists 5%, Intern 5%',
                time: 'Today',
              },
              {
                action: 'Team roster finalized',
                detail: '14 team members across Holdings and 8 subsidiaries',
                time: 'This week',
              },
              {
                action: 'Start date confirmed',
                detail: 'All employment agreements effective March 1, 2026',
                time: 'This week',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-gray-800/50 pb-3 last:border-0 last:pb-0"
              >
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-gray-600">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Upcoming Meetings</h2>
            <a
              href="/admin/meetings"
              className="flex items-center gap-1 text-xs text-cyan-400 transition-colors hover:text-cyan-300"
            >
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-800/50 bg-[#0a0e1a] px-4 py-8 text-center">
              <Calendar size={28} className="text-gray-700" />
              <p className="text-sm text-gray-500">No meetings scheduled yet</p>
              <a
                href="/admin/meetings"
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                Schedule a meeting
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (admin only) */}
      {isAdmin && (
        <div className="mt-6 rounded-xl border border-gray-800 bg-[#111827] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Add Team Member', href: '/admin/team' },
              { label: 'Create Contract', href: '/admin/contracts' },
              { label: 'Schedule Meeting', href: '/admin/meetings' },
              { label: 'Manage Equity', href: '/admin/equity' },
              { label: 'AI Playground', href: '/admin/playground' },
              { label: 'Knowledge Base', href: '/admin/knowledge' },
              { label: 'Generate Contract', href: '/admin/contracts' },
              { label: 'Fine-tune Model', href: '/admin/finetuning' },
              { label: 'Admin Settings', href: '/admin/settings' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="rounded-lg border border-gray-700 bg-[#0a0e1a] px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
