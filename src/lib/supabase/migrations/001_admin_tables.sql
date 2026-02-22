-- QDaria Admin Dashboard - Database Schema
-- Migration: 001_admin_tables
-- Description: Create all tables for the internal admin portal

-- =============================================================================
-- 1. User Profiles extension (adds role column)
-- =============================================================================
ALTER TABLE IF EXISTS user_profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'investor'
    CHECK (role IN ('admin', 'employee', 'investor'));

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- =============================================================================
-- 2. Team Members
-- =============================================================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  bio TEXT,
  linkedin TEXT,
  department TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('Founder', 'C-Suite', 'Leadership', 'Specialist', 'Intern/Board')),
  salary_nok INTEGER,
  equity_percentage NUMERIC(5,2),
  vesting_start_date DATE,
  vesting_cliff_months INTEGER NOT NULL DEFAULT 12,
  vesting_total_months INTEGER NOT NULL DEFAULT 48,
  contract_status TEXT NOT NULL DEFAULT 'pending' CHECK (contract_status IN ('active', 'pending', 'terminated')),
  employment_type TEXT NOT NULL DEFAULT 'full-time' CHECK (employment_type IN ('full-time', 'part-time', 'intern', 'flex')),
  is_board_member BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_team_members_email ON team_members(email);
CREATE INDEX idx_team_members_department ON team_members(department);
CREATE INDEX idx_team_members_contract_status ON team_members(contract_status);

-- =============================================================================
-- 3. Contracts
-- =============================================================================
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('employment', 'nda', 'board_agreement', 'consulting', 'other')),
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'expired', 'draft', 'superseded')),
  signed_date DATE,
  expiry_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contracts_team_member ON contracts(team_member_id);
CREATE INDEX idx_contracts_status ON contracts(status);

-- =============================================================================
-- 4. Equity Records
-- =============================================================================
CREATE TABLE IF NOT EXISTS equity_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  share_type TEXT NOT NULL CHECK (share_type IN ('common', 'preferred', 'options', 'phantom')),
  percentage NUMERIC(5,2) NOT NULL,
  cliff_months INTEGER NOT NULL DEFAULT 12,
  total_months INTEGER NOT NULL DEFAULT 48,
  accelerated BOOLEAN NOT NULL DEFAULT FALSE,
  grant_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_equity_records_team_member ON equity_records(team_member_id);

-- =============================================================================
-- 5. Meetings
-- =============================================================================
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  meeting_type TEXT NOT NULL CHECK (meeting_type IN ('team', 'board', 'one_on_one', 'standup', 'external')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  meeting_link TEXT,
  organizer_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  agenda TEXT,
  minutes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_meetings_start_time ON meetings(start_time);
CREATE INDEX idx_meetings_status ON meetings(status);
CREATE INDEX idx_meetings_type ON meetings(meeting_type);

-- =============================================================================
-- 6. Meeting Attendees
-- =============================================================================
CREATE TABLE IF NOT EXISTS meeting_attendees (
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined', 'tentative')),
  PRIMARY KEY (meeting_id, team_member_id)
);

-- =============================================================================
-- 7. Chat Channels
-- =============================================================================
CREATE TABLE IF NOT EXISTS chat_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'group' CHECK (type IN ('group', 'direct', 'announcement')),
  is_private BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 8. Chat Channel Members
-- =============================================================================
CREATE TABLE IF NOT EXISTS chat_channel_members (
  channel_id UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (channel_id, team_member_id)
);

-- =============================================================================
-- 9. Chat Messages
-- =============================================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  file_url TEXT,
  reply_to UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_channel ON chat_messages(channel_id, created_at DESC);
CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id);

-- =============================================================================
-- 10. Updated_at trigger function
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 11. Row Level Security Policies
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE equity_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Helper: get current user's role from user_profiles
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: get current user's team_member_id
CREATE OR REPLACE FUNCTION get_team_member_id()
RETURNS UUID AS $$
  SELECT id FROM team_members WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ADMIN: full access to all tables
CREATE POLICY admin_team_members ON team_members
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_contracts ON contracts
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_equity ON equity_records
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_meetings ON meetings
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_meeting_attendees ON meeting_attendees
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_chat_channels ON chat_channels
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_chat_members ON chat_channel_members
  FOR ALL USING (get_user_role() = 'admin');

CREATE POLICY admin_chat_messages ON chat_messages
  FOR ALL USING (get_user_role() = 'admin');

-- EMPLOYEE: read team members, own contracts, own equity, meetings they attend, chat
CREATE POLICY employee_read_team ON team_members
  FOR SELECT USING (get_user_role() = 'employee');

CREATE POLICY employee_own_contracts ON contracts
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND team_member_id = get_team_member_id()
  );

CREATE POLICY employee_own_equity ON equity_records
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND team_member_id = get_team_member_id()
  );

CREATE POLICY employee_read_meetings ON meetings
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND id IN (
      SELECT meeting_id FROM meeting_attendees
      WHERE team_member_id = get_team_member_id()
    )
  );

CREATE POLICY employee_read_meeting_attendees ON meeting_attendees
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND meeting_id IN (
      SELECT meeting_id FROM meeting_attendees
      WHERE team_member_id = get_team_member_id()
    )
  );

CREATE POLICY employee_read_channels ON chat_channels
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND (
      NOT is_private
      OR id IN (
        SELECT channel_id FROM chat_channel_members
        WHERE team_member_id = get_team_member_id()
      )
    )
  );

CREATE POLICY employee_read_channel_members ON chat_channel_members
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND channel_id IN (
      SELECT channel_id FROM chat_channel_members
      WHERE team_member_id = get_team_member_id()
    )
  );

CREATE POLICY employee_read_messages ON chat_messages
  FOR SELECT USING (
    get_user_role() = 'employee'
    AND channel_id IN (
      SELECT channel_id FROM chat_channel_members
      WHERE team_member_id = get_team_member_id()
    )
  );

CREATE POLICY employee_insert_messages ON chat_messages
  FOR INSERT WITH CHECK (
    get_user_role() = 'employee'
    AND sender_id = get_team_member_id()
    AND channel_id IN (
      SELECT channel_id FROM chat_channel_members
      WHERE team_member_id = get_team_member_id()
    )
  );

-- =============================================================================
-- 12. Storage bucket (run via Supabase dashboard or API)
-- =============================================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('contracts', 'contracts', false);
--
-- CREATE POLICY admin_contracts_storage ON storage.objects
--   FOR ALL USING (
--     bucket_id = 'contracts' AND get_user_role() = 'admin'
--   );
--
-- CREATE POLICY employee_own_contracts_storage ON storage.objects
--   FOR SELECT USING (
--     bucket_id = 'contracts'
--     AND get_user_role() = 'employee'
--     AND (storage.foldername(name))[1] = get_team_member_id()::text
--   );
