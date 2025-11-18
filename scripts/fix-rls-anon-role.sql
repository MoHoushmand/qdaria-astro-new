-- ================================================================
-- FIX: Row Level Security Policy - Use ANON Role
-- ================================================================
-- The Supabase client uses SUPABASE_ANON_KEY which means the 'anon' role
-- We need to grant INSERT permission to 'anon' role specifically
-- ================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public submissions" ON waitlist;
DROP POLICY IF EXISTS "Allow public waitlist submissions" ON waitlist;
DROP POLICY IF EXISTS "Users can view own submissions" ON waitlist;
DROP POLICY IF EXISTS "Service role full access" ON waitlist;

-- Grant INSERT permission to anon role at table level
GRANT INSERT ON waitlist TO anon;
GRANT SELECT ON waitlist TO anon;

-- Create policy for anon role (used by API)
CREATE POLICY "Allow anonymous inserts"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for anon role to read (for future features)
CREATE POLICY "Allow anonymous reads"
  ON waitlist
  FOR SELECT
  TO anon
  USING (true);

-- Service role gets full access
CREATE POLICY "Service role full access"
  ON waitlist
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- VERIFICATION
-- ================================================================
-- After running this, check policies with:
-- SELECT * FROM pg_policies WHERE tablename = 'waitlist';
