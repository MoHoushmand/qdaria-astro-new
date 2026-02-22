import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Key,
  Globe,
  Save,
  Check,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface ProfileSettings {
  name: string;
  email: string;
  role: string;
  company: string;
  timezone: string;
}

interface NotificationSettings {
  contractUpdates: boolean;
  meetingReminders: boolean;
  teamChanges: boolean;
  equityAlerts: boolean;
  emailDigest: 'daily' | 'weekly' | 'none';
}

interface AppearanceSettings {
  theme: 'dark' | 'system';
  compactMode: boolean;
  showQuickActions: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper                                                           */
/* -------------------------------------------------------------------------- */

function SettingsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-cyan-400">{icon}</span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Toggle                                                                    */
/* -------------------------------------------------------------------------- */

function Toggle({
  enabled,
  onChange,
  label,
  description,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <p className="text-sm text-gray-200">{label}</p>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          enabled ? 'bg-cyan-600' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState<ProfileSettings>({
    name: 'Daniel Mo Houshmand',
    email: 'daniel@qdaria.com',
    role: 'CEO & Founder',
    company: 'QDaria Holdings AS',
    timezone: 'Europe/Oslo',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    contractUpdates: true,
    meetingReminders: true,
    teamChanges: true,
    equityAlerts: true,
    emailDigest: 'weekly',
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'dark',
    compactMode: false,
    showQuickActions: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Settings</h2>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            saved
              ? 'bg-green-500/20 text-green-400'
              : 'bg-cyan-600 text-white hover:bg-cyan-500'
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      {/* Profile */}
      <SettingsSection title="Profile" icon={<User size={18} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">Role</label>
            <input
              type="text"
              value={profile.role}
              readOnly
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">Company</label>
            <input
              type="text"
              value={profile.company}
              readOnly
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-400">Timezone</label>
            <select
              value={profile.timezone}
              onChange={(e) => setProfile((p) => ({ ...p, timezone: e.target.value }))}
              className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Europe/Oslo">Europe/Oslo (CET/CEST)</option>
              <option value="Europe/London">Europe/London (GMT/BST)</option>
              <option value="America/New_York">America/New York (EST/EDT)</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/Los_Angeles">America/Los Angeles (PST/PDT)</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={<Bell size={18} />}>
        <div className="space-y-1 divide-y divide-gray-800/50">
          <Toggle
            label="Contract updates"
            description="Get notified when contracts are signed or updated"
            enabled={notifications.contractUpdates}
            onChange={(v) => setNotifications((n) => ({ ...n, contractUpdates: v }))}
          />
          <Toggle
            label="Meeting reminders"
            description="Receive reminders before scheduled meetings"
            enabled={notifications.meetingReminders}
            onChange={(v) => setNotifications((n) => ({ ...n, meetingReminders: v }))}
          />
          <Toggle
            label="Team changes"
            description="Alerts when team members are added or removed"
            enabled={notifications.teamChanges}
            onChange={(v) => setNotifications((n) => ({ ...n, teamChanges: v }))}
          />
          <Toggle
            label="Equity alerts"
            description="Notifications for equity allocation changes"
            enabled={notifications.equityAlerts}
            onChange={(v) => setNotifications((n) => ({ ...n, equityAlerts: v }))}
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-gray-400">Email Digest</label>
          <select
            value={notifications.emailDigest}
            onChange={(e) =>
              setNotifications((n) => ({
                ...n,
                emailDigest: e.target.value as 'daily' | 'weekly' | 'none',
              }))
            }
            className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="none">None</option>
          </select>
        </div>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance" icon={<Palette size={18} />}>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-400">Theme</label>
          <div className="flex gap-3">
            {(['dark', 'system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setAppearance((a) => ({ ...a, theme: t }))}
                className={`rounded-lg border px-4 py-2 text-sm capitalize transition-colors ${
                  appearance.theme === t
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-gray-700 bg-[#0a0e1a] text-gray-400 hover:border-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1 divide-y divide-gray-800/50">
          <Toggle
            label="Compact mode"
            description="Reduce spacing in the dashboard layout"
            enabled={appearance.compactMode}
            onChange={(v) => setAppearance((a) => ({ ...a, compactMode: v }))}
          />
          <Toggle
            label="Show quick actions"
            description="Display quick action buttons on the dashboard"
            enabled={appearance.showQuickActions}
            onChange={(v) => setAppearance((a) => ({ ...a, showQuickActions: v }))}
          />
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="Security" icon={<Shield size={18} />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-[#0a0e1a] px-4 py-3">
            <div className="flex items-center gap-3">
              <Key size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-200">Contract Passwords</p>
                <p className="text-xs text-gray-500">14 unique passwords configured for employee contracts</p>
              </div>
            </div>
            <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-[#0a0e1a] px-4 py-3">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-200">Admin Bypass</p>
                <p className="text-xs text-gray-500">Admin users can download contracts without passwords</p>
              </div>
            </div>
            <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-[#0a0e1a] px-4 py-3">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-200">API Keys</p>
                <p className="text-xs text-gray-500">Gemini API key configured for AI Playground</p>
              </div>
            </div>
            <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs text-green-400">Configured</span>
          </div>
        </div>
      </SettingsSection>

      {/* Company Info */}
      <SettingsSection title="Company Information" icon={<Globe size={18} />}>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Legal Entity</dt>
            <dd className="text-gray-200">QDaria Holdings AS</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Org. Nr.</dt>
            <dd className="text-gray-200">932 163 378</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Subsidiaries</dt>
            <dd className="text-gray-200">8 companies</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Team Size</dt>
            <dd className="text-gray-200">14 employees</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Employment Start</dt>
            <dd className="text-gray-200">March 1, 2026</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Jurisdiction</dt>
            <dd className="text-gray-200">Norway (Arbeidsmiljoloven)</dd>
          </div>
        </dl>
      </SettingsSection>
    </div>
  );
}
