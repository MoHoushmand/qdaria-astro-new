-- ================================================================
-- FIX: Row Level Security Policy for Waitlist Table
-- ================================================================
-- Error: "new row violates row-level security policy"
-- Solution: Update RLS policy to allow anonymous inserts
-- ================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public submissions" ON waitlist;
DROP POLICY IF EXISTS "Service role full access" ON waitlist;

-- Recreate policy for anonymous inserts (PUBLIC role)
CREATE POLICY "Allow public waitlist submissions"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for authenticated users to view their own submissions
CREATE POLICY "Users can view own submissions"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

-- Service role gets full access
CREATE POLICY "Service role full access"
  ON waitlist
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Test the policy (should work)
-- INSERT INTO waitlist (full_name, company_name, email, industry, expected_volume, nda_consent)
-- VALUES ('Test User', 'Test Company', 'test@example.com', 'defense', '<10k', true);
