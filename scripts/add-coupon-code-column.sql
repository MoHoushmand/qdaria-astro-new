-- ================================================================
-- MIGRATION: Add coupon_code column to existing waitlist table
-- ================================================================
-- Run this SQL in Supabase SQL Editor ONLY if table already exists
-- https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new
--
-- This adds the coupon_code column to an existing waitlist table
-- If you're creating the table for the first time, use setup-waitlist-table.sql instead
-- ================================================================

-- Add coupon_code column if it doesn't exist
ALTER TABLE waitlist
ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);

-- Add helpful comment
COMMENT ON COLUMN waitlist.coupon_code IS 'Optional promotional coupon code (e.g., BETA2026)';

-- ================================================================
-- VERIFICATION (optional - run to verify column was added)
-- ================================================================

-- Check if column exists
-- SELECT column_name, data_type, character_maximum_length
-- FROM information_schema.columns
-- WHERE table_name = 'waitlist' AND column_name = 'coupon_code';

-- Test insertion with coupon code
-- INSERT INTO waitlist (
--   full_name,
--   company_name,
--   email,
--   industry,
--   expected_volume,
--   coupon_code,
--   nda_consent
-- ) VALUES (
--   'Test User',
--   'Test Company',
--   'test-coupon@example.com',
--   'defense',
--   '<10k',
--   'BETA2026',
--   true
-- );

-- View the test record
-- SELECT id, email, coupon_code, created_at
-- FROM waitlist
-- WHERE email = 'test-coupon@example.com';

-- Delete test record when done
-- DELETE FROM waitlist WHERE email = 'test-coupon@example.com';
