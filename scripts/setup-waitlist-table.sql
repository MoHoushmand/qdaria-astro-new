-- ================================================================
-- ZIPMINATOR ENTERPRISE WAITLIST TABLE SETUP
-- ================================================================
-- Run this SQL in Supabase SQL Editor
-- https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new
--
-- This will create the waitlist table with all necessary:
-- - Fields for form data
-- - Indexes for performance
-- - Row Level Security policies
-- - Auto-updating timestamps
-- ================================================================

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Form fields
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  expected_volume TEXT NOT NULL,
  use_case TEXT,
  coupon_code VARCHAR(50),
  nda_consent BOOLEAN DEFAULT FALSE NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,

  -- Tracking metadata
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_industry ON waitlist(industry);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert (form submissions)
CREATE POLICY "Allow public submissions"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Service role has full access (for admin operations)
CREATE POLICY "Service role full access"
  ON waitlist
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on updates
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE waitlist IS 'Enterprise beta waitlist submissions for Zipminator quantum-safe encryption platform';
COMMENT ON COLUMN waitlist.coupon_code IS 'Optional promotional coupon code (e.g., BETA2026)';

-- ================================================================
-- VERIFICATION QUERIES (optional - run after table creation)
-- ================================================================

-- Check table structure
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'waitlist'
-- ORDER BY ordinal_position;

-- Check indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'waitlist';

-- Check policies
-- SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- ================================================================
-- TEST INSERTION (optional - run to verify everything works)
-- ================================================================

-- INSERT INTO waitlist (
--   full_name,
--   company_name,
--   email,
--   industry,
--   expected_volume,
--   use_case,
--   coupon_code,
--   nda_consent
-- ) VALUES (
--   'Test User',
--   'Test Company',
--   'test@example.com',
--   'defense',
--   '<10k',
--   'Testing the waitlist system',
--   'BETA2026',
--   true
-- );

-- View the test record
-- SELECT * FROM waitlist WHERE email = 'test@example.com';

-- Delete test record when done
-- DELETE FROM waitlist WHERE email = 'test@example.com';
